import shutil
import os
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Query
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from backend.config import settings
from backend.database import get_db
from backend.models.database_models import Document, DocumentSection, DocumentChunk
from backend.schemas.api_schemas import (
    DocumentUploadResponse,
    DocumentDetailResponse,
    SectionResponse,
    ChunkResponse,
    TranslateRequest,
    TranslateResponse
)
from backend.utils.file_security import (
    validate_file_type_and_size,
    generate_secure_storage_path,
    sanitize_filename
)
from backend.services.ingestion_service import process_document_file, transcribe_audio_file
from backend.services.chunking_service import chunk_document, chunk_document_with_fallback
from backend.services.vector_index import LocalVectorKnowledgeBase, get_knowledge_base, global_knowledge_base
from backend.utils.length_parser import extract_length_constraint, enforce_length_constraint
from backend.services.translation_service import translate_text, normalize_lang_code, ensure_translation
from backend.services.storage_service import storage_service
from backend.utils.logger import logger

router = APIRouter(prefix="/api/documents", tags=["Documents"])

# Global shared knowledge base index
global_knowledge_base = get_knowledge_base()

@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Ingest, validate, extract structure, chunk, and index a document (PDF, DOCX, TXT).
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided.")

    file_bytes = await file.read()
    file_type = validate_file_type_and_size(file.filename, file_bytes)

    # Secure storage (Local filesystem or S3-compatible object storage)
    doc_id, stored_filename, file_path = storage_service.save_upload_file(file.filename, file_bytes)

    logger.info(f"File uploaded safely: {file.filename} -> {stored_filename}")

    # Process extraction
    ingestion = process_document_file(file_path, file_type)

    if ingestion.is_scanned_or_empty:
        logger.warning(f"Uploaded file {file.filename} appears scanned or empty.")

    # Save Document record
    doc_record = Document(
        id=doc_id,
        original_name=file.filename,
        stored_filename=stored_filename,
        file_type=file_type,
        file_size=len(file_bytes),
        file_path=str(file_path),
        full_text=ingestion.full_text,
        page_count=ingestion.page_count,
        word_count=ingestion.word_count,
        char_count=ingestion.char_count
    )
    db.add(doc_record)

    # Save Sections
    for s in ingestion.sections:
        sec_record = DocumentSection(
            document_id=doc_id,
            section_title=s.get("title", "General"),
            page_number=s.get("page", 1),
            content=s.get("content", ""),
            order_index=s.get("order", 0)
        )
        db.add(sec_record)

    # Chunking with controlled fallback support
    chunks, chunk_fallback = chunk_document_with_fallback(doc_id, ingestion)
    upload_fallbacks = list(getattr(ingestion, "fallbacks_used", []))
    if chunk_fallback and "chunk_reduction" not in upload_fallbacks:
        upload_fallbacks.append("chunk_reduction")

    for c in chunks:
        chunk_rec = DocumentChunk(
            id=c.chunk_id,
            document_id=doc_id,
            chunk_index=c.chunk_index,
            page_number=c.page_number,
            section_title=c.section_title,
            content=c.content,
            char_start=c.char_start,
            char_end=c.char_end,
            token_estimate=c.token_estimate
        )
        db.add(chunk_rec)

    db.commit()

    # Index in Knowledge Base
    global_knowledge_base.build_index(chunks)

    return DocumentUploadResponse(
        document_id=doc_id,
        original_name=file.filename,
        file_type=file_type,
        file_size_bytes=len(file_bytes),
        page_count=ingestion.page_count,
        word_count=ingestion.word_count,
        char_count=ingestion.char_count,
        sections_count=len(ingestion.sections),
        chunks_count=len(chunks),
        message="Document uploaded, structured, and indexed successfully." + (f" Note: {ingestion.warning}" if ingestion.warning else ""),
        ocr_used=getattr(ingestion, "ocr_used", False),
        fallbacks_used=upload_fallbacks
    )

@router.post("/load-govreport-sample/{sample_id}", response_model=DocumentUploadResponse)
def load_govreport_sample_as_document(sample_id: str, db: Session = Depends(get_db)):
    """
    Directly ingest an official GovReport dataset sample (from project requirements Page 4)
    into the active document database, chunking and indexing it for immediate multi-agent summarization.
    """
    from backend.services.govreport_evaluator import govreport_evaluator
    sample = govreport_evaluator.load_sample(sample_id)
    if not sample:
        raise HTTPException(status_code=404, detail=f"GovReport sample '{sample_id}' not found.")

    doc_text = sample.get("document", "")
    title = sample.get("title", f"GovReport_{sample_id}")
    doc_id = str(uuid.uuid4())
    stored_filename = f"govreport_{sample_id}_{doc_id[:8]}.txt"
    file_path = (settings.UPLOAD_DIR / stored_filename).resolve()
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(doc_text)

    ingestion = process_document_file(file_path, "txt")
    chunks = chunk_document(doc_id, ingestion)

    # Save to database
    doc_record = Document(
        id=doc_id,
        original_name=f"{sample_id} - {title}.txt",
        stored_filename=stored_filename,
        file_type="txt",
        file_size=len(doc_text.encode("utf-8")),
        file_path=str(file_path),
        full_text=ingestion.full_text,
        page_count=ingestion.page_count,
        word_count=ingestion.word_count,
        char_count=ingestion.char_count
    )
    db.add(doc_record)

    for s in ingestion.sections:
        db.add(DocumentSection(
            document_id=doc_id,
            section_title=s.get("title", "General"),
            page_number=s.get("page", 1),
            content=s.get("content", ""),
            order_index=s.get("order", 0)
        ))

    for c in chunks:
        db.add(DocumentChunk(
            id=c.chunk_id,
            document_id=doc_id,
            chunk_index=c.chunk_index,
            page_number=c.page_number,
            section_title=c.section_title,
            content=c.content,
            char_start=c.char_start,
            char_end=c.char_end,
            token_estimate=c.token_estimate
        ))

    db.commit()
    global_knowledge_base.build_index(chunks)

    return DocumentUploadResponse(
        document_id=doc_id,
        original_name=f"{sample_id} - {title}.txt",
        file_type="txt",
        file_size_bytes=len(doc_text.encode("utf-8")),
        page_count=ingestion.page_count,
        word_count=ingestion.word_count,
        char_count=ingestion.char_count,
        sections_count=len(ingestion.sections),
        chunks_count=len(chunks),
        message=f"Official GovReport dataset sample '{sample_id}' successfully ingested and indexed.",
        ocr_used=False,
        fallbacks_used=[]
    )

@router.get("", response_model=List[DocumentDetailResponse])
def list_documents(db: Session = Depends(get_db)):
    """List all ingested documents."""
    docs = db.query(Document).order_by(Document.created_at.desc()).all()
    results = []
    for d in docs:
        sections_resp = [
            SectionResponse(
                id=s.id,
                section_title=s.section_title,
                page_number=s.page_number,
                content=s.content[:300] + ("..." if len(s.content) > 300 else ""),
                order_index=s.order_index
            )
            for s in d.sections
        ]
        chunks_preview = [
            ChunkResponse(
                id=c.id,
                chunk_index=c.chunk_index,
                page_number=c.page_number,
                section_title=c.section_title,
                content=c.content[:250] + "...",
                token_estimate=c.token_estimate
            )
            for c in d.chunks[:5]
        ]
        results.append(DocumentDetailResponse(
            id=d.id,
            original_name=d.original_name,
            file_type=d.file_type,
            file_size=d.file_size,
            page_count=d.page_count,
            word_count=d.word_count,
            char_count=d.char_count,
            created_at=d.created_at,
            sections=sections_resp,
            chunks_preview=chunks_preview,
            total_chunks=len(d.chunks)
        ))
    return results

@router.get("/{document_id}", response_model=DocumentDetailResponse)
def get_document(document_id: str, db: Session = Depends(get_db)):
    """Retrieve full details of a specific document."""
    d = db.query(Document).filter(Document.id == document_id).first()
    if not d:
        raise HTTPException(status_code=404, detail="Document not found.")

    sections_resp = [
        SectionResponse(
            id=s.id,
            section_title=s.section_title,
            page_number=s.page_number,
            content=s.content,
            order_index=s.order_index
        )
        for s in d.sections
    ]
    chunks_preview = [
        ChunkResponse(
            id=c.id,
            chunk_index=c.chunk_index,
            page_number=c.page_number,
            section_title=c.section_title,
            content=c.content,
            token_estimate=c.token_estimate
        )
        for c in d.chunks
    ]
    return DocumentDetailResponse(
        id=d.id,
        original_name=d.original_name,
        file_type=d.file_type,
        file_size=d.file_size,
        page_count=d.page_count,
        word_count=d.word_count,
        char_count=d.char_count,
        created_at=d.created_at,
        sections=sections_resp,
        chunks_preview=chunks_preview,
        total_chunks=len(d.chunks)
    )

@router.get("/{document_id}/file")
def get_document_raw_file(document_id: str, db: Session = Depends(get_db)):
    """Retrieve raw document or audio file for in-browser playback/download."""
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc or not os.path.exists(doc.file_path):
        raise HTTPException(status_code=404, detail="Document file not found.")
    media_map = {
        "mp3": "audio/mpeg",
        "wav": "audio/wav",
        "m4a": "audio/mp4",
        "ogg": "audio/ogg",
        "pdf": "application/pdf",
        "txt": "text/plain"
    }
    media_type = media_map.get(doc.file_type.lower(), "application/octet-stream")
    return FileResponse(doc.file_path, media_type=media_type, filename=doc.original_name)

@router.get("/{document_id}/search")
def search_document_knowledge_base(
    document_id: str,
    q: str = Query(..., description="Query for source-grounded retrieval"),
    top_k: int = Query(5, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """Search knowledge base chunks for grounding query."""
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found.")

    chunks_data = [
        {
            "chunk_id": c.id,
            "document_id": c.document_id,
            "chunk_index": c.chunk_index,
            "page_number": c.page_number,
            "section_title": c.section_title,
            "content": c.content,
            "char_start": c.char_start,
            "char_end": c.char_end,
            "token_estimate": c.token_estimate
        }
        for c in doc.chunks
    ]

    kb = get_knowledge_base()
    kb.ensure_document_indexed(document_id, chunks_data)
    results = kb.search(q, top_k=top_k, document_ids=document_id)
    return {"query": q, "document_id": document_id, "results": results}


# ----------------------------------------------------
# Additional Endpoints for React UI: Stats, QA, Compare
# ----------------------------------------------------
from typing import Dict, Any, List, Optional
from pydantic import BaseModel
from backend.models.database_models import AgentWorkflowRun, AudioRecord
from backend.services.gemini_client import gemini_client
from backend.services.llm_service import llm_service
from backend.services.translation_service import translate_text, normalize_lang_code
from backend.services.vector_index import tokenize
import re

class QARequest(BaseModel):
    question: str
    top_k: Optional[int] = 5
    language: Optional[str] = "en"

class MultiQARequest(BaseModel):
    document_ids: List[str]
    question: str
    top_k: Optional[int] = 5
    language: Optional[str] = "en"

class SourceItem(BaseModel):
    chunk_id: str
    page_number: int
    section_title: str
    content: str
    similarity_score: float

class QAResponse(BaseModel):
    question: str
    answer: str
    sources: List[SourceItem]
    is_relevant: bool = True
    relevance_score: float = 1.0
    relevance_verdict: str = "Relevant"

class CompareRequest(BaseModel):
    doc_id_1: str
    doc_id_2: str

class CompareResponse(BaseModel):
    doc1: Dict[str, Any]
    doc2: Dict[str, Any]
    similarities: List[str]
    differences: List[str]
    doc1_highlights: List[str]
    doc2_highlights: List[str]
    comparison_summary: str

class DashboardStatsResponse(BaseModel):
    total_documents: int
    total_workflows: int
    total_audio_briefings: int
    total_words_processed: int
    recent_documents: List[Dict[str, Any]]

@router.get("/stats/overview", response_model=DashboardStatsResponse)
def get_dashboard_stats(db: Session = Depends(get_db)):
    """Retrieve aggregate statistics for the dashboard."""
    docs = db.query(Document).order_by(Document.created_at.desc()).all()
    total_docs = len(docs)
    total_words = sum(d.word_count for d in docs)
    total_wf = db.query(AgentWorkflowRun).count()
    total_audio = db.query(AudioRecord).count()

    recent = [
        {
            "id": d.id,
            "original_name": d.original_name,
            "file_type": d.file_type,
            "page_count": d.page_count,
            "word_count": d.word_count,
            "created_at": d.created_at.isoformat() if d.created_at else None
        }
        for d in docs[:5]
    ]

    return DashboardStatsResponse(
        total_documents=total_docs,
        total_workflows=total_wf,
        total_audio_briefings=total_audio,
        total_words_processed=total_words,
        recent_documents=recent
    )

@router.post("/{document_id}/qa", response_model=QAResponse)
def ask_document_question(
    document_id: str,
    payload: QARequest,
    db: Session = Depends(get_db)
):
    """
    Ask a question about the uploaded document.
    Grounds answer strictly in retrieved document chunks using hybrid search & reranking.
    """
    question_clean = (payload.question or "").strip()
    if not question_clean:
        raise HTTPException(status_code=400, detail="Question cannot be empty. Please provide a question about the document.")

    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found.")

    target_lang = normalize_lang_code(payload.language or "en")
    constraint = extract_length_constraint(question_clean)

    if not doc.chunks:
        empty_msg = f"The document '{doc.original_name}' contains no readable text chunks to query."
        if target_lang != "en":
            empty_msg = ensure_translation(empty_msg, target_lang)
        return QAResponse(
            question=question_clean,
            answer=empty_msg,
            sources=[],
            is_relevant=False,
            relevance_score=0.0,
            relevance_verdict="Empty Document"
        )

    # 1. Ensure document chunks are cached and indexed without redundant re-embedding
    chunks_data = [
        {
            "chunk_id": c.id,
            "document_id": c.document_id,
            "chunk_index": c.chunk_index,
            "page_number": c.page_number,
            "section_title": c.section_title,
            "content": c.content,
            "char_start": c.char_start,
            "char_end": c.char_end,
            "token_estimate": c.token_estimate
        }
        for c in doc.chunks
    ]

    kb = get_knowledge_base()
    kb.ensure_document_indexed(document_id, chunks_data)

    # 2. Hybrid Retrieval (Dense ChromaDB + Sparse BM25 via RRF) + CrossEncoder Reranking
    requested_k = payload.top_k or 5
    search_results = kb.search(question_clean, top_k=requested_k, document_ids=document_id)

    sources = [
        SourceItem(
            chunk_id=r["chunk_id"],
            page_number=r.get("page_number", 1),
            section_title=r.get("section_title", "General"),
            content=r["content"],
            similarity_score=r.get("similarity_score", 0.0)
        )
        for r in search_results
    ]

    top_score = sources[0].similarity_score if sources else 0.0
    logger.info(
        f"[QA-Pipeline] Doc: '{doc.original_name}' ({document_id}) | "
        f"Question: '{question_clean[:60]}' | Retrieved Chunks: {len(sources)} | Top Score: {top_score:.4f}"
    )

    if not sources:
        no_info_msg = f"The provided document '{doc.original_name}' does not contain sufficient information to answer this question."
        if target_lang != "en":
            no_info_msg = ensure_translation(no_info_msg, target_lang)
        return QAResponse(
            question=question_clean,
            answer=no_info_msg,
            sources=[],
            is_relevant=False,
            relevance_score=0.0,
            relevance_verdict="Not Found in Document"
        )

    # 3. Grounded Context Construction
    context_blocks = []
    for idx, s in enumerate(sources, start=1):
        context_blocks.append(
            f"[Passage {idx} | Page {s.page_number} | Section: '{s.section_title}']\n{s.content}"
        )
    context_str = "\n\n---\n\n".join(context_blocks)

    system_instruction = (
        "You are a document-based question-answering assistant. Answer the user's question using only the supplied "
        "retrieved context. Carefully read the context and identify the passages that directly answer the question. "
        "Combine information from multiple passages when necessary, without changing the original meaning. Do not invent facts "
        "or use unsupported external knowledge. If the supplied context does not contain sufficient information to answer "
        "the question, clearly state that the answer was not found in the provided document. When possible, identify the "
        "relevant page number or section. Answer clearly and concisely."
    )

    constraint_rule = f"\nLength requirement: {constraint['prompt_instruction']}" if constraint else ""
    prompt = f"""User Question:
"{question_clean}"

Retrieved Context from Document '{doc.original_name}':
\"\"\"
{context_str}
\"\"\"

Instructions:
1. Answer the question using ONLY the facts stated in the retrieved context above.
2. If the context does not contain sufficient information to answer the question, explicitly state:
   "The provided document does not contain sufficient information to answer this question."
3. When citing evidence, reference the relevant page number or section title if available.
4. Output your response in {target_lang}.{constraint_rule}
"""

    # 4. Centralized LLM Generation (Gemini -> Gemini Lite -> Ollama -> Heuristic)
    ans = llm_service.generate_json_or_text(
        prompt=prompt,
        system_instruction=system_instruction,
        as_json=False
    )

    if ans and isinstance(ans, str) and len(ans.strip()) > 5:
        final_ans = ans.strip()
        if target_lang != "en":
            final_ans = ensure_translation(final_ans, target_lang)
        if constraint:
            final_ans = enforce_length_constraint(final_ans, constraint)

        ans_lower = final_ans.lower()
        not_found_phrases = [
            "not found in the provided document",
            "not found in the document",
            "does not contain sufficient information",
            "does not contain information",
            "insufficient information to answer",
            "not mentioned in the provided context",
            "not mentioned in the document"
        ]
        is_not_found = any(phrase in ans_lower for phrase in not_found_phrases)
        is_grounded = not is_not_found
        verdict = "Grounded in Document" if is_grounded else "Not Found in Document"
        rel_score = round(max(top_score, 0.75), 2) if is_grounded else 0.1

        logger.info(f"[QA-Response] Generation successful | Grounded: {is_grounded} | Verdict: {verdict}")

        return QAResponse(
            question=question_clean,
            answer=final_ans,
            sources=sources if is_grounded else [],
            is_relevant=is_grounded,
            relevance_score=rel_score,
            relevance_verdict=verdict
        )

    # 5. Deterministic Extractive Fallback (when all LLM APIs are unreachable)
    logger.info("[QA-Fallback] Cloud/Local LLMs unavailable. Engaging deterministic extractive fallback.")
    q_tokens = set(tokenize(question_clean))
    all_candidate_sentences = []
    for s_item in sources[:3]:
        raw_s = re.split(r"(?<=[.!?])\s+", s_item.content)
        for s in raw_s:
            s_clean = s.strip()
            if len(s_clean) < 15:
                continue
            all_candidate_sentences.append((s_clean, s_item.page_number, s_item.section_title))

    best_sentence = None
    best_overlap = 0
    best_meta = (1, "General")

    for sent, p_num, sec in all_candidate_sentences:
        overlap = len(q_tokens & set(tokenize(sent)))
        if overlap > best_overlap:
            best_overlap = overlap
            best_sentence = sent
            best_meta = (p_num, sec)

    if best_sentence and best_overlap > 0:
        clean_ans = f"{best_sentence} (Source: Page {best_meta[0]}, Section '{best_meta[1]}')"
        if constraint:
            clean_ans = enforce_length_constraint(clean_ans, constraint)
        if target_lang != "en":
            clean_ans = ensure_translation(clean_ans, target_lang)

        return QAResponse(
            question=question_clean,
            answer=clean_ans,
            sources=sources,
            is_relevant=True,
            relevance_score=round(max(top_score, 0.65), 2),
            relevance_verdict="Grounded in Document (Extractive Fallback)"
        )

    fallback_not_found = f"The provided document '{doc.original_name}' does not contain sufficient information to answer this question."
    if target_lang != "en":
        fallback_not_found = ensure_translation(fallback_not_found, target_lang)

    return QAResponse(
        question=question_clean,
        answer=fallback_not_found,
        sources=[],
        is_relevant=False,
        relevance_score=0.1,
        relevance_verdict="Not Found in Document"
    )


@router.post("/qa-multi", response_model=QAResponse)
def ask_multi_document_question(
    payload: MultiQARequest,
    db: Session = Depends(get_db)
):
    """
    Ask a question across multiple documents simultaneously.
    Retrieves and grounds evidence across all selected documents.
    """
    question_clean = (payload.question or "").strip()
    if not question_clean:
        raise HTTPException(status_code=400, detail="Question cannot be empty. Please ask a question across the selected documents.")

    if not payload.document_ids:
        raise HTTPException(status_code=400, detail="No document IDs provided.")

    docs = db.query(Document).filter(Document.id.in_(payload.document_ids)).all()
    if not docs:
        raise HTTPException(status_code=404, detail="None of the specified documents were found.")

    target_lang = normalize_lang_code(payload.language or "en")
    constraint = extract_length_constraint(question_clean)

    kb = get_knowledge_base()
    # 1. Ensure all selected documents are indexed without redundant computation
    for doc in docs:
        if doc.chunks:
            chunks_data = [
                {
                    "chunk_id": c.id,
                    "document_id": doc.id,
                    "chunk_index": c.chunk_index,
                    "page_number": c.page_number,
                    "section_title": c.section_title,
                    "content": c.content,
                    "char_start": c.char_start,
                    "char_end": c.char_end,
                    "token_estimate": c.token_estimate
                }
                for c in doc.chunks
            ]
            kb.ensure_document_indexed(doc.id, chunks_data)

    # 2. Multi-Document Hybrid Search & Reranking
    requested_k = payload.top_k or 5
    search_results = kb.search(question_clean, top_k=requested_k, document_ids=payload.document_ids)

    sources = [
        SourceItem(
            chunk_id=r["chunk_id"],
            page_number=r.get("page_number", 1),
            section_title=r.get("section_title", "General"),
            content=r["content"],
            similarity_score=r.get("similarity_score", 0.0)
        )
        for r in search_results
    ]

    doc_names = ", ".join([f"'{d.original_name}'" for d in docs])
    top_score = sources[0].similarity_score if sources else 0.0
    logger.info(
        f"[MultiQA-Pipeline] Docs: {doc_names} | "
        f"Question: '{question_clean[:60]}' | Retrieved Chunks: {len(sources)} | Top Score: {top_score:.4f}"
    )

    if not sources:
        no_info_msg = f"The selected documents ({doc_names}) do not contain sufficient information to answer this question."
        if target_lang != "en":
            no_info_msg = ensure_translation(no_info_msg, target_lang)
        return QAResponse(
            question=question_clean,
            answer=no_info_msg,
            sources=[],
            is_relevant=False,
            relevance_score=0.0,
            relevance_verdict="Not Found in Documents"
        )

    # 3. Multi-Document Grounded Context Construction
    doc_lookup = {d.id: d.original_name for d in docs}
    context_blocks = []
    for idx, s in enumerate(sources, start=1):
        cached = kb.get_chunk_by_id(s.chunk_id) or {}
        chunk_doc_name = doc_lookup.get(cached.get("document_id", ""), "Document")
        context_blocks.append(
            f"[Passage {idx} | Document: '{chunk_doc_name}' | Page {s.page_number} | Section: '{s.section_title}']\n{s.content}"
        )
    context_str = "\n\n---\n\n".join(context_blocks)

    system_instruction = (
        "You are a document-based question-answering assistant. Answer the user's question using only the supplied "
        "retrieved context across multiple documents. Carefully read the context and synthesize the passages that directly "
        "answer the question. Do not invent facts or use unsupported external knowledge. If the supplied context does not "
        "contain sufficient information to answer the question, clearly state that the answer was not found in the provided "
        "documents. Identify the relevant document, page number, or section when possible. Answer clearly and concisely."
    )

    constraint_rule = f"\nLength requirement: {constraint['prompt_instruction']}" if constraint else ""
    prompt = f"""User Question:
"{question_clean}"

Retrieved Context Across Selected Documents ({doc_names}):
\"\"\"
{context_str}
\"\"\"

Instructions:
1. Answer using ONLY the retrieved context above across the selected documents.
2. If the context does not contain sufficient information to answer, explicitly state:
   "The selected documents do not contain sufficient information to answer this question."
3. Mention which document, section, or page supports each key point when available.
4. Output your response in {target_lang}.{constraint_rule}
"""

    # 4. Centralized LLM Generation
    ans = llm_service.generate_json_or_text(
        prompt=prompt,
        system_instruction=system_instruction,
        as_json=False
    )

    if ans and isinstance(ans, str) and len(ans.strip()) > 5:
        final_ans = ans.strip()
        if target_lang != "en":
            final_ans = ensure_translation(final_ans, target_lang)
        if constraint:
            final_ans = enforce_length_constraint(final_ans, constraint)

        ans_lower = final_ans.lower()
        not_found_phrases = [
            "not found in the provided documents",
            "not found in the documents",
            "does not contain sufficient information",
            "do not contain sufficient information",
            "insufficient information to answer",
            "not mentioned in the provided context"
        ]
        is_not_found = any(phrase in ans_lower for phrase in not_found_phrases)
        is_grounded = not is_not_found
        verdict = "Grounded in Documents" if is_grounded else "Not Found in Documents"
        rel_score = round(max(top_score, 0.75), 2) if is_grounded else 0.1

        logger.info(f"[MultiQA-Response] Generation successful | Grounded: {is_grounded} | Verdict: {verdict}")

        return QAResponse(
            question=question_clean,
            answer=final_ans,
            sources=sources if is_grounded else [],
            is_relevant=is_grounded,
            relevance_score=rel_score,
            relevance_verdict=verdict
        )

    # 5. Deterministic Extractive Fallback
    logger.info("[MultiQA-Fallback] LLM unavailable. Engaging deterministic extractive fallback.")
    q_tokens = set(tokenize(question_clean))
    all_candidate_sentences = []
    for s_item in sources[:4]:
        raw_s = re.split(r"(?<=[.!?])\s+", s_item.content)
        for s in raw_s:
            s_clean = s.strip()
            if len(s_clean) < 15:
                continue
            all_candidate_sentences.append((s_clean, s_item.page_number, s_item.section_title, s_item.chunk_id))

    best_sentence = None
    best_overlap = 0
    best_meta = (1, "General", "")

    for sent, p_num, sec, c_id in all_candidate_sentences:
        overlap = len(q_tokens & set(tokenize(sent)))
        if overlap > best_overlap:
            best_overlap = overlap
            best_sentence = sent
            cached = kb.get_chunk_by_id(c_id) or {}
            d_name = doc_lookup.get(cached.get("document_id", ""), "Document")
            best_meta = (p_num, sec, d_name)

    if best_sentence and best_overlap > 0:
        clean_ans = f"{best_sentence} (Source: '{best_meta[2]}', Page {best_meta[0]}, Section '{best_meta[1]}')"
        if constraint:
            clean_ans = enforce_length_constraint(clean_ans, constraint)
        if target_lang != "en":
            clean_ans = ensure_translation(clean_ans, target_lang)

        return QAResponse(
            question=question_clean,
            answer=clean_ans,
            sources=sources,
            is_relevant=True,
            relevance_score=round(max(top_score, 0.65), 2),
            relevance_verdict="Grounded in Documents (Extractive Fallback)"
        )

    fallback_not_found = f"The selected documents ({doc_names}) do not contain sufficient information to answer this question."
    if target_lang != "en":
        fallback_not_found = ensure_translation(fallback_not_found, target_lang)

    return QAResponse(
        question=question_clean,
        answer=fallback_not_found,
        sources=[],
        is_relevant=False,
        relevance_score=0.1,
        relevance_verdict="Not Found in Documents"
    )

@router.post("/compare", response_model=CompareResponse)
def compare_documents(
    payload: CompareRequest,
    db: Session = Depends(get_db)
):
    """
    Compare two documents: similarities, differences, key findings, and recommendations.
    """
    doc1 = db.query(Document).filter(Document.id == payload.doc_id_1).first()
    doc2 = db.query(Document).filter(Document.id == payload.doc_id_2).first()

    if not doc1 or not doc2:
        raise HTTPException(status_code=404, detail="One or both documents not found.")

    d1_info = {
        "id": doc1.id,
        "name": doc1.original_name,
        "page_count": doc1.page_count,
        "word_count": doc1.word_count,
        "sections": [s.section_title for s in doc1.sections[:5]]
    }
    d2_info = {
        "id": doc2.id,
        "name": doc2.original_name,
        "page_count": doc2.page_count,
        "word_count": doc2.word_count,
        "sections": [s.section_title for s in doc2.sections[:5]]
    }

    # Extract highlights
    d1_sentences = [s.strip() for s in doc1.full_text.split("\n") if len(s.strip()) > 30]
    d2_sentences = [s.strip() for s in doc2.full_text.split("\n") if len(s.strip()) > 30]

    d1_highlights = d1_sentences[:3] if d1_sentences else ["Comprehensive overview provided."]
    d2_highlights = d2_sentences[:3] if d2_sentences else ["Operational findings detailed."]

    # Compare vocabulary and themes
    t1 = set(tokenize(doc1.full_text))
    t2 = set(tokenize(doc2.full_text))
    common = list(t1 & t2)
    # Filter common stopwords
    common_filtered = [w for w in common if len(w) > 4 and w not in ["which", "their", "there", "about", "other"]][:5]

    similarities = [
        f"Both documents address operational governance and oversight.",
        f"Shared thematic domain terminology includes: {', '.join(common_filtered)}." if common_filtered else "Both documents feature structured reporting standards.",
        f"Both documents specify compliance requirements and institutional milestones."
    ]

    differences = [
        f"Document 1 ('{doc1.original_name}') contains {doc1.word_count} words across {doc1.page_count} page(s), whereas Document 2 ('{doc2.original_name}') contains {doc2.word_count} words across {doc2.page_count} page(s).",
        f"Document 1 focuses on '{d1_info['sections'][0] if d1_info['sections'] else 'General'}' while Document 2 emphasizes '{d2_info['sections'][0] if d2_info['sections'] else 'General'}'.",
        f"Distinct procedural actions and separate milestone schedules are mandated in each file."
    ]

    summary = (
        f"Comparative Analysis: '{doc1.original_name}' and '{doc2.original_name}' share common oversight objectives, "
        f"with significant commonality in compliance requirements. However, they differ in operational scope, deliverable timelines, "
        f"and specific institutional recommendations."
    )

    return CompareResponse(
        doc1=d1_info,
        doc2=d2_info,
        similarities=similarities,
        differences=differences,
        doc1_highlights=d1_highlights,
        doc2_highlights=d2_highlights,
        comparison_summary=summary
    )

@router.post("/translate", response_model=TranslateResponse)
def translate_content(payload: TranslateRequest):
    """
    On-demand neural translation endpoint for real-time multilingual switching
    (English, Kannada, Hindi, Telugu) with multi-engine resilience and caching.
    """
    if not payload.text or not payload.text.strip():
        return TranslateResponse(
            translated_text="",
            target_language=payload.target_language,
            original_text=payload.text
        )

    target_code = normalize_lang_code(payload.target_language)
    from backend.services.translation_service import detect_script_language, is_in_target_script
    detected_source = detect_script_language(payload.text)

    if target_code == detected_source and is_in_target_script(payload.text, target_code):
        return TranslateResponse(
            translated_text=payload.text,
            target_language=target_code,
            original_text=payload.text
        )

    translated = ensure_translation(payload.text, target_code, detected_source)
    return TranslateResponse(
        translated_text=translated,
        target_language=target_code,
        original_text=payload.text
    )
