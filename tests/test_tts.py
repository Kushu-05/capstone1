import pytest
from backend.services.tts_service import generate_validated_speech

@pytest.mark.asyncio
async def test_tts_blocks_unapproved_summary():
    with pytest.raises(ValueError) as excinfo:
        await generate_validated_speech(
            workflow_run_id="run_test_unapproved",
            document_id="doc_test_1",
            final_validated_summary="Draft unvalidated text.",
            is_approved_for_tts=False  # Must fail
        )
    assert "Validation Gatekeeper Block" in str(excinfo.value)

@pytest.mark.asyncio
async def test_tts_blocks_empty_summary():
    with pytest.raises(ValueError) as excinfo:
        await generate_validated_speech(
            workflow_run_id="run_test_empty",
            document_id="doc_test_2",
            final_validated_summary="",
            is_approved_for_tts=True
        )
    assert "empty summary" in str(excinfo.value).lower()
