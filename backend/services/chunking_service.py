from typing import List, Dict, Any, Tuple
from backend.config import settings
from backend.services.ingestion_service import IngestionResult
from backend.utils.logger import logger

class ChunkItem:
    def __init__(
        self,
        chunk_id: str,
        document_id: str,
        chunk_index: int,
        page_number: int,
        section_title: str,
        content: str,
        char_start: int,
        char_end: int,
        token_estimate: int
    ):
        self.chunk_id = chunk_id
        self.document_id = document_id
        self.chunk_index = chunk_index
        self.page_number = page_number
        self.section_title = section_title
        self.content = content
        self.char_start = char_start
        self.char_end = char_end
        self.token_estimate = token_estimate

    def to_dict(self) -> Dict[str, Any]:
        return {
            "chunk_id": self.chunk_id,
            "document_id": self.document_id,
            "chunk_index": self.chunk_index,
            "page_number": self.page_number,
            "section_title": self.section_title,
            "content": self.content,
            "char_start": self.char_start,
            "char_end": self.char_end,
            "token_estimate": self.token_estimate
        }

def chunk_document(
    document_id: str,
    ingestion: IngestionResult,
    chunk_size: int = None,
    chunk_overlap: int = None
) -> List[ChunkItem]:
    """
    Chunks the document using a section-aware and page-aware sliding window strategy.
    Preserves exact structural metadata (doc_id, page, section, char offsets).
    Strictly verifies that overlap is smaller than chunk size.
    """
    if chunk_size is None:
        chunk_size = settings.CHUNK_SIZE_CHARS
    if chunk_overlap is None:
        chunk_overlap = settings.CHUNK_OVERLAP_CHARS

    # Enforce Requirement 4: overlap must never exceed or equal chunk size
    if chunk_overlap >= chunk_size:
        logger.warning(f"Chunk overlap ({chunk_overlap}) >= chunk size ({chunk_size}). Auto-adjusting overlap to {chunk_size // 4}.")
        chunk_overlap = max(1, chunk_size // 4)

    chunks: List[ChunkItem] = []
    chunk_index = 0
    global_char_offset = 0

    # If structured sections exist, chunk within each section
    if ingestion.sections:
        for section in ingestion.sections:
            sec_title = section.get("title", "General")
            sec_page = section.get("page", 1)
            sec_text = section.get("content", "").strip()

            if not sec_text:
                continue

            sec_len = len(sec_text)
            start = 0

            while start < sec_len:
                end = min(start + chunk_size, sec_len)

                # Try to break on newline or space rather than mid-word
                if end < sec_len:
                    last_newline = sec_text.rfind("\n", start + chunk_size // 2, end)
                    if last_newline != -1:
                        end = last_newline + 1
                    else:
                        last_space = sec_text.rfind(" ", start + chunk_size // 2, end)
                        if last_space != -1:
                            end = last_space + 1

                chunk_content = sec_text[start:end].strip()
                if chunk_content:
                    words = chunk_content.split()
                    token_estimate = int(len(words) * 1.3)
                    chunk_id = f"{document_id}_chunk_{chunk_index:04d}"

                    chunk_item = ChunkItem(
                        chunk_id=chunk_id,
                        document_id=document_id,
                        chunk_index=chunk_index,
                        page_number=sec_page,
                        section_title=sec_title,
                        content=chunk_content,
                        char_start=global_char_offset + start,
                        char_end=global_char_offset + end,
                        token_estimate=token_estimate
                    )
                    chunks.append(chunk_item)
                    chunk_index += 1

                if end >= sec_len:
                    break
                start = max(end - chunk_overlap, start + 1)

            global_char_offset += sec_len + 2
    else:
        # Fallback to global sliding window over full text
        text = ingestion.full_text
        text_len = len(text)
        start = 0

        while start < text_len:
            end = min(start + chunk_size, text_len)
            if end < text_len:
                last_space = text.rfind(" ", start + chunk_size // 2, end)
                if last_space != -1:
                    end = last_space + 1

            chunk_content = text[start:end].strip()
            if chunk_content:
                words = chunk_content.split()
                chunk_id = f"{document_id}_chunk_{chunk_index:04d}"
                chunks.append(
                    ChunkItem(
                        chunk_id=chunk_id,
                        document_id=document_id,
                        chunk_index=chunk_index,
                        page_number=1,
                        section_title="General",
                        content=chunk_content,
                        char_start=start,
                        char_end=end,
                        token_estimate=int(len(words) * 1.3)
                    )
                )
                chunk_index += 1

            if end >= text_len:
                break
            start = max(end - chunk_overlap, start + 1)

    return chunks


def chunk_document_with_fallback(
    document_id: str,
    ingestion: IngestionResult,
    force_fallback: bool = False
) -> Tuple[List[ChunkItem], bool]:
    """
    Requirement 4: Chunking Fallback.
    If force_fallback is True, or if any generated chunk exceeds MAX_CHUNK_TOKEN_CEILING,
    triggers a controlled fallback to smaller configurable chunk sizes:
    (FALLBACK_CHUNK_SIZE_CHARS, FALLBACK_CHUNK_OVERLAP_CHARS).
    Returns: (chunks_list, fallback_was_applied_bool)
    """
    if force_fallback:
        logger.info(f"Controlled chunking fallback forced: {settings.FALLBACK_CHUNK_SIZE_CHARS} chars / {settings.FALLBACK_CHUNK_OVERLAP_CHARS} overlap.")
        chunks = chunk_document(
            document_id=document_id,
            ingestion=ingestion,
            chunk_size=settings.FALLBACK_CHUNK_SIZE_CHARS,
            chunk_overlap=settings.FALLBACK_CHUNK_OVERLAP_CHARS
        )
        return chunks, True

    # 1. Attempt primary chunking
    chunks = chunk_document(document_id, ingestion)

    # 2. Check if any chunk exceeds the token ceiling threshold
    needs_reduction = any(c.token_estimate > settings.MAX_CHUNK_TOKEN_CEILING for c in chunks)
    if needs_reduction:
        logger.warning(
            f"One or more chunks exceeded token ceiling ({settings.MAX_CHUNK_TOKEN_CEILING} tokens). "
            f"Executing controlled chunking fallback to {settings.FALLBACK_CHUNK_SIZE_CHARS} chars."
        )
        fallback_chunks = chunk_document(
            document_id=document_id,
            ingestion=ingestion,
            chunk_size=settings.FALLBACK_CHUNK_SIZE_CHARS,
            chunk_overlap=settings.FALLBACK_CHUNK_OVERLAP_CHARS
        )
        return fallback_chunks, True

    return chunks, False
