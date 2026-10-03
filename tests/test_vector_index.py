import pytest
from backend.services.vector_index import LocalVectorKnowledgeBase
from backend.services.chunking_service import ChunkItem

def test_knowledge_base_retrieval():
    kb = LocalVectorKnowledgeBase()

    chunks = [
        ChunkItem(
            chunk_id="chunk_1",
            document_id="doc_1",
            chunk_index=0,
            page_number=1,
            section_title="Budget",
            content="The cybersecurity program was awarded a grant of 15 million dollars for network defense.",
            char_start=0,
            char_end=90,
            token_estimate=15
        ),
        ChunkItem(
            chunk_id="chunk_2",
            document_id="doc_1",
            chunk_index=1,
            page_number=2,
            section_title="Personnel",
            content="The human resources department reported an attrition rate of 12 percent among data engineers.",
            char_start=91,
            char_end=180,
            token_estimate=16
        )
    ]

    kb.build_index(chunks)

    # Search for cybersecurity
    results = kb.search("cybersecurity grant program", top_k=2)
    assert len(results) > 0
    assert results[0]["chunk_id"] == "chunk_1"
    assert "cybersecurity" in results[0]["content"].lower()
    assert results[0]["similarity_score"] > 0.1

    # Search for attrition
    results_hr = kb.search("human resources engineers attrition", top_k=2)
    assert len(results_hr) > 0
    assert results_hr[0]["chunk_id"] == "chunk_2"
