import pytest
from backend.agents.validation_agent import SummaryValidationAgent
from backend.schemas.agent_schemas import DraftSummaryResult, KeyFinding, SourceReference

def test_validation_detects_unsupported_numbers():
    val_agent = SummaryValidationAgent()

    source_text = "The committee reviewed 15 projects with an allocated budget of $2 million."
    chunks = [{"chunk_id": "c1", "page_number": 1, "content": source_text}]

    # Draft contains a hallucinated number ($999 billion)
    hallucinated_draft = DraftSummaryResult(
        requested_focus="Executive Summary",
        executive_summary=(
            "The committee reviewed 15 projects with an allocated budget of $2 million. "
            "Additionally, an extra budget of $999 billion was illegally disbursed to foreign contractors."
        ),
        key_findings=[KeyFinding(finding="15 projects were reviewed", source_refs=[])],
        source_references=[],
        raw_draft=""
    )

    context = {"language": "en"}
    result = val_agent.run({
        "draft": hallucinated_draft,
        "chunks": chunks,
        "full_text": source_text
    }, context)

    # Must detect the unsupported $999 billion claim
    assert len(result.unsupported_claims) > 0
    flagged_reasons = " ".join([u.reason for u in result.unsupported_claims])
    assert "$999 billion" in flagged_reasons

    # Final validated summary must NOT contain the hallucinated claim
    assert "$999 billion" not in result.final_validated_summary
    assert "$2 million" in result.final_validated_summary
