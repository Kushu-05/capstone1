import pytest
from sqlalchemy.orm import Session
from backend.agents.agent_orchestrator import orchestrator
from backend.models.database_models import Document, DocumentChunk, DocumentSection

@pytest.mark.asyncio
async def test_full_agent_handoff_pipeline(db_session: Session):
    doc_id = "test_doc_handoff_1"
    doc = Document(
        id=doc_id,
        original_name="audit_report.txt",
        stored_filename="audit_report.txt",
        file_type="txt",
        file_size=1024,
        file_path="/tmp/fake_path",
        full_text=(
            "Federal agencies allocated $42 billion to research programs in 2021. "
            "A critical risk of timeline delay was observed in 34 percent of grants. "
            "The committee decided to implement quarterly reporting. "
            "We recommend establishing enterprise milestone alerts. "
            "Action Item: Deploy phase 1 compliance tool by January 2022."
        ),
        page_count=1,
        word_count=50,
        char_count=300
    )
    db_session.add(doc)

    chunk = DocumentChunk(
        id=f"{doc_id}_chunk_0",
        document_id=doc_id,
        chunk_index=0,
        page_number=1,
        section_title="Executive Findings",
        content=doc.full_text,
        char_start=0,
        char_end=len(doc.full_text),
        token_estimate=55
    )
    db_session.add(chunk)

    section = DocumentSection(
        document_id=doc_id,
        section_title="Executive Findings",
        page_number=1,
        content=doc.full_text,
        order_index=0
    )
    db_session.add(section)
    db_session.commit()

    # Execute orchestrator pipeline
    result = await orchestrator.execute_full_pipeline(
        db=db_session,
        document_id=doc_id,
        requested_focus="Identify the major risks and decisions",
        language="en",
        auto_generate_audio=False
    )

    assert result["status"] == "COMPLETED"
    assert result["document_id"] == doc_id
    assert result["analysis"] is not None
    assert result["draft_summary"] is not None
    assert result["validation"] is not None
    assert result["evaluation"] is not None
    assert result["validation"].is_approved_for_tts is True
