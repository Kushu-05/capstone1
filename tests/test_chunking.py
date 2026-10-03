import pytest
from pathlib import Path
from backend.services.ingestion_service import extract_from_txt
from backend.services.chunking_service import chunk_document

def test_chunking_strategy(sample_txt_file: Path):
    ingestion = extract_from_txt(sample_txt_file)
    chunks = chunk_document(
        document_id="doc_test_123",
        ingestion=ingestion,
        chunk_size=100,
        chunk_overlap=20
    )

    assert len(chunks) >= 1
    first_chunk = chunks[0]
    assert first_chunk.document_id == "doc_test_123"
    assert first_chunk.chunk_index == 0
    assert first_chunk.page_number >= 1
    assert first_chunk.section_title is not None
    assert len(first_chunk.content) > 0
    assert first_chunk.token_estimate > 0
    assert first_chunk.char_end > first_chunk.char_start

def test_chunk_to_dict(sample_txt_file: Path):
    ingestion = extract_from_txt(sample_txt_file)
    chunks = chunk_document("doc_test_456", ingestion)
    d = chunks[0].to_dict()
    assert "chunk_id" in d
    assert "document_id" in d
    assert "page_number" in d
    assert "section_title" in d
    assert "content" in d
