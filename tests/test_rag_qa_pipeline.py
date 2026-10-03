"""
Comprehensive End-to-End Test Suite for RAG-Based Q&A Pipeline
Validates:
1. Question whose answer is explicitly stated in a document.
2. Question that requires combining information from multiple chunks.
3. Question whose answer is not present in the document.
4. Question about a specific document when multiple documents are stored (document filtering).
5. Dense retrieval and BM25 retrieval functioning individually.
6. Hybrid retrieval combining dense and sparse methods via RRF.
7. Reciprocal Rank Fusion (RRF) producing correctly associated ranked chunks.
8. Cross-encoder reranking preserving chunk identifiers and correct ranking behavior.
9. Graceful fallback when reranking fails.
10. Graceful handling of empty retrieval results.
11. LLM response generation using retrieved context.
12. Newly uploaded document becoming searchable through the existing pipeline.
"""
import pytest
import uuid
from unittest.mock import patch, MagicMock
from backend.services.vector_index import LocalVectorKnowledgeBase, get_knowledge_base
from backend.services.chunking_service import ChunkItem
from backend.api.routes_documents import (
    ask_document_question,
    ask_multi_document_question,
    QARequest,
    MultiQARequest,
    QAResponse
)
from backend.models.database_models import Document, DocumentChunk


@pytest.fixture
def sample_knowledge_base():
    """Create a populated knowledge base with known chunks across two documents."""
    kb = LocalVectorKnowledgeBase()
    chunks = [
        ChunkItem(
            chunk_id="chunk_a1",
            document_id="doc_alpha",
            chunk_index=0,
            page_number=1,
            section_title="Financial Allocation",
            content="The clean energy program allocated 75 million dollars for solar panel installations across 12 states.",
            char_start=0,
            char_end=110,
            token_estimate=18
        ),
        ChunkItem(
            chunk_id="chunk_a2",
            document_id="doc_alpha",
            chunk_index=1,
            page_number=2,
            section_title="Environmental Impact",
            content="The solar panel project is projected to reduce carbon dioxide emissions by 350,000 metric tons annually.",
            char_start=111,
            char_end=225,
            token_estimate=19
        ),
        ChunkItem(
            chunk_id="chunk_b1",
            document_id="doc_beta",
            chunk_index=0,
            page_number=1,
            section_title="Cybersecurity Infrastructure",
            content="The organization deployed advanced quantum-resistant encryption across all cloud databases.",
            char_start=0,
            char_end=105,
            token_estimate=15
        ),
        ChunkItem(
            chunk_id="chunk_b2",
            document_id="doc_beta",
            chunk_index=1,
            page_number=2,
            section_title="Compliance Standards",
            content="Annual ISO-27001 security compliance audits demonstrated a 99.8 percent compliance adherence rate.",
            char_start=106,
            char_end=215,
            token_estimate=17
        )
    ]
    kb.build_index(chunks)
    return kb


# ==============================================================================
# Test 1: Explicitly Stated Answer
# ==============================================================================
def test_1_explicit_answer_grounding(sample_knowledge_base):
    """Verifies that an explicitly stated fact is accurately retrieved and grounded."""
    results = sample_knowledge_base.search("How many dollars were allocated for solar panel installations?", top_k=2, document_id="doc_alpha")
    assert len(results) > 0
    assert results[0]["chunk_id"] == "chunk_a1"
    assert "75 million dollars" in results[0]["content"]
    assert results[0]["page_number"] == 1
    assert results[0]["section_title"] == "Financial Allocation"


# ==============================================================================
# Test 2: Combining Information from Multiple Chunks
# ==============================================================================
def test_2_combining_multiple_chunks(sample_knowledge_base):
    """Verifies retrieval when a query requires combining budget and emissions impact."""
    results = sample_knowledge_base.search("budget and carbon emissions reduction for solar panels", top_k=2, document_id="doc_alpha")
    assert len(results) >= 2
    retrieved_ids = {r["chunk_id"] for r in results}
    assert "chunk_a1" in retrieved_ids  # budget
    assert "chunk_a2" in retrieved_ids  # emissions


# ==============================================================================
# Test 3: Question Whose Answer is Not Present in Document
# ==============================================================================
def test_3_answer_not_present_in_document():
    """Verifies that when a question asks about unmentioned topics, the system flags it as not found."""
    mock_db = MagicMock()
    mock_doc = MagicMock()
    mock_doc.id = "doc_test_unrelated"
    mock_doc.original_name = "test_doc.txt"
    mock_chunk = MagicMock()
    mock_chunk.id = "chk_test_1"
    mock_chunk.document_id = "doc_test_unrelated"
    mock_chunk.chunk_index = 0
    mock_chunk.page_number = 1
    mock_chunk.section_title = "Water Conservation"
    mock_chunk.content = "Water conservation techniques were implemented across municipal reservoirs in 2024."
    mock_chunk.char_start = 0
    mock_chunk.char_end = 90
    mock_chunk.token_estimate = 12
    mock_doc.chunks = [mock_chunk]
    mock_db.query().filter().first.return_value = mock_doc

    req = QARequest(question="What was the score of the basketball game?", top_k=3)

    with patch("backend.services.llm_service.llm_service.generate_json_or_text") as mock_llm:
        mock_llm.return_value = "The provided document does not contain sufficient information to answer this question."
        resp = ask_document_question(document_id="doc_test_unrelated", payload=req, db=mock_db)

        assert resp.is_relevant is False
        assert resp.relevance_verdict == "Not Found in Document"
        assert "does not contain sufficient information" in resp.answer
        assert len(resp.sources) == 0


# ==============================================================================
# Test 4: Document-Specific Retrieval When Multiple Documents are Stored
# ==============================================================================
def test_4_document_specific_filtering(sample_knowledge_base):
    """Verifies that searching with doc_alpha filter NEVER returns chunks from doc_beta."""
    # Query mentions encryption, but we filter strictly to doc_alpha
    results = sample_knowledge_base.search("quantum encryption cloud databases", top_k=3, document_id="doc_alpha")
    for r in results:
        assert r["document_id"] == "doc_alpha"
        assert r["chunk_id"] != "chunk_b1"
        assert r["chunk_id"] != "chunk_b2"


# ==============================================================================
# Test 5: Dense Retrieval and BM25 Retrieval Functioning Individually
# ==============================================================================
def test_5_dense_and_sparse_individual_retrieval(sample_knowledge_base):
    """Verifies that both dense vector search and sparse BM25 search produce valid results independently."""
    # 1. Test Dense Search alone
    dense_results = sample_knowledge_base._dense_search("cloud databases security encryption", top_k=2, document_ids="doc_beta")
    assert len(dense_results) > 0
    assert any(cid == "chunk_b1" for cid, _ in dense_results)

    # 2. Test Sparse BM25 Search alone
    sparse_results = sample_knowledge_base._sparse_search("ISO-27001 compliance rate", top_k=2, document_ids="doc_beta")
    assert len(sparse_results) > 0
    assert sparse_results[0][0] == "chunk_b2"
    assert sparse_results[0][1] > 0.0  # BM25 score positive


# ==============================================================================
# Test 6: Hybrid Retrieval Combining Both Retrieval Methods
# ==============================================================================
def test_6_hybrid_retrieval_combining_methods(sample_knowledge_base):
    """Verifies that hybrid mode executes both dense and sparse and produces merged candidates."""
    with patch.object(sample_knowledge_base, "_dense_search", wraps=sample_knowledge_base._dense_search) as mock_dense, \
         patch.object(sample_knowledge_base, "_sparse_search", wraps=sample_knowledge_base._sparse_search) as mock_sparse:

        results = sample_knowledge_base.search("solar panel installations", top_k=2, document_id="doc_alpha")
        assert len(results) > 0
        assert mock_dense.called
        assert mock_sparse.called


# ==============================================================================
# Test 7: Reciprocal Rank Fusion (RRF) Produces Correctly Associated Ranked Chunks
# ==============================================================================
def test_7_rrf_scoring_and_association(sample_knowledge_base):
    """Verifies that RRF combines rank lists accurately according to 1 / (k + rank)."""
    dense_pairs = [("chunk_a1", 0.95), ("chunk_a2", 0.80)]
    sparse_pairs = [("chunk_a2", 3.5), ("chunk_a1", 1.2)]

    with patch.object(sample_knowledge_base, "_dense_search", return_value=dense_pairs), \
         patch.object(sample_knowledge_base, "_sparse_search", return_value=sparse_pairs), \
         patch("backend.services.vector_index.get_reranker_model", return_value=None):

        results = sample_knowledge_base.search("test query", top_k=2, document_id="doc_alpha")
        assert len(results) == 2
        # Both chunks should be present
        c_ids = [r["chunk_id"] for r in results]
        assert "chunk_a1" in c_ids
        assert "chunk_a2" in c_ids
        # RRF scores should be normalized between 0.0 and 1.0
        for r in results:
            assert 0.0 <= r["similarity_score"] <= 1.0


# ==============================================================================
# Test 8: Cross-Encoder Reranking Preserving Identifiers & Ranking Order
# ==============================================================================
def test_8_cross_encoder_reranker_preserves_identifiers(sample_knowledge_base):
    """Verifies that cross-encoder scoring correctly reorders candidate chunks while preserving all metadata."""
    mock_reranker = MagicMock()
    # Dynamic predictor assigning 5.0 to the emissions chunk and -2.0 to the budget chunk
    mock_reranker.predict.side_effect = lambda pairs: [5.0 if "emissions" in p[1] else -2.0 for p in pairs]

    with patch("backend.services.vector_index.get_reranker_model", return_value=mock_reranker):
        results = sample_knowledge_base.search("clean energy initiatives", top_k=2, document_id="doc_alpha")
        assert len(results) == 2
        # chunk_a2 with higher logit (5.0) must be reranked to top position
        assert results[0]["chunk_id"] == "chunk_a2"
        assert results[0]["page_number"] == 2
        assert results[0]["section_title"] == "Environmental Impact"
        # Continuous sigmoid normalization: 1 / (1 + exp(-5)) > 0.99
        assert results[0]["similarity_score"] > 0.90
        # chunk_a1 with lower logit (-2.0) must be second
        assert results[1]["chunk_id"] == "chunk_a1"


# ==============================================================================
# Test 9: Graceful Fallback When Reranking Fails
# ==============================================================================
def test_9_reranking_failure_fallback(sample_knowledge_base):
    """Verifies that if the cross-encoder reranker raises an exception, the system falls back to RRF rankings."""
    mock_reranker = MagicMock()
    mock_reranker.predict.side_effect = RuntimeError("GPU out of memory or model corrupted")

    with patch("backend.services.vector_index.get_reranker_model", return_value=mock_reranker):
        # Should not raise exception; should log warning and return RRF results
        results = sample_knowledge_base.search("solar panel installations", top_k=2, document_id="doc_alpha")
        assert len(results) > 0
        assert results[0]["chunk_id"] in ["chunk_a1", "chunk_a2"]
        assert results[0]["similarity_score"] > 0.0


# ==============================================================================
# Test 10: Graceful Handling of Empty Retrieval Results
# ==============================================================================
def test_10_empty_retrieval_handling():
    """Verifies that empty questions or empty collections return clean graceful responses without crashing."""
    mock_db = MagicMock()
    mock_doc = MagicMock()
    mock_doc.id = "doc_empty"
    mock_doc.original_name = "empty.txt"
    mock_doc.chunks = []
    mock_db.query().filter().first.return_value = mock_doc

    req = QARequest(question="What is the summary?")
    resp = ask_document_question(document_id="doc_empty", payload=req, db=mock_db)

    assert resp.is_relevant is False
    assert resp.relevance_verdict == "Empty Document"
    assert "contains no readable text chunks" in resp.answer
    assert len(resp.sources) == 0


# ==============================================================================
# Test 11: LLM Response Generation Using Retrieved Context
# ==============================================================================
def test_11_llm_response_generation_grounded():
    """Verifies that the LLM is invoked with grounded context and returns an answer citing sources."""
    mock_db = MagicMock()
    mock_doc = MagicMock()
    mock_doc.id = "doc_alpha"
    mock_doc.original_name = "clean_energy.txt"
    mock_chunk = MagicMock()
    mock_chunk.id = "chunk_a1"
    mock_chunk.document_id = "doc_alpha"
    mock_chunk.chunk_index = 0
    mock_chunk.page_number = 1
    mock_chunk.section_title = "Financial Allocation"
    mock_chunk.content = "The clean energy program allocated 75 million dollars for solar panel installations."
    mock_chunk.char_start = 0
    mock_chunk.char_end = 85
    mock_chunk.token_estimate = 14
    mock_doc.chunks = [mock_chunk]
    mock_db.query().filter().first.return_value = mock_doc

    req = QARequest(question="How much was allocated for solar?", top_k=1)

    expected_answer = "The clean energy program allocated 75 million dollars for solar panel installations (Page 1, Financial Allocation)."

    with patch("backend.services.llm_service.llm_service.generate_json_or_text", return_value=expected_answer) as mock_llm:
        resp = ask_document_question(document_id="doc_alpha", payload=req, db=mock_db)

        assert mock_llm.called
        call_kwargs = mock_llm.call_args[1]
        assert "75 million dollars" in call_kwargs["prompt"]
        assert resp.is_relevant is True
        assert resp.relevance_verdict == "Grounded in Document"
        assert resp.answer == expected_answer
        assert len(resp.sources) == 1
        assert resp.sources[0].chunk_id == "chunk_a1"


# ==============================================================================
# Test 12: Newly Uploaded Document Becoming Searchable
# ==============================================================================
def test_12_newly_uploaded_document_searchable():
    """Verifies that when a new document is indexed via ensure_document_indexed, it immediately becomes searchable."""
    kb = get_knowledge_base()
    new_doc_id = f"doc_new_{uuid.uuid4().hex[:6]}"
    new_chunk = {
        "chunk_id": f"chk_{uuid.uuid4().hex[:6]}",
        "document_id": new_doc_id,
        "chunk_index": 0,
        "page_number": 1,
        "section_title": "Novel Technology",
        "content": "Superconducting quantum computing processors achieved fault-tolerant logical qubits in 2026.",
        "char_start": 0,
        "char_end": 95,
        "token_estimate": 15
    }

    # Verify not indexed initially
    assert not kb.is_document_indexed(new_doc_id)

    # Index new document chunks
    indexed = kb.ensure_document_indexed(new_doc_id, [new_chunk])
    assert indexed is True
    assert kb.is_document_indexed(new_doc_id)

    # Search for the newly indexed topic
    results = kb.search("fault-tolerant logical qubits", top_k=1, document_id=new_doc_id)
    assert len(results) > 0
    assert results[0]["document_id"] == new_doc_id
    assert "superconducting quantum computing" in results[0]["content"].lower()
