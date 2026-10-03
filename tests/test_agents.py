import pytest
from backend.agents.analysis_agent import DocumentAnalysisAgent
from backend.agents.summarization_agent import SummarizationAgent
from backend.agents.validation_agent import SummaryValidationAgent
from backend.agents.evaluation_agent import QualityEvaluationAgent
from backend.schemas.agent_schemas import (
    DocumentAnalysisResult,
    DraftSummaryResult,
    ValidationResult,
    QualityMetrics
)

@pytest.fixture
def mock_document_data():
    full_text = (
        "SECTION 1: OVERVIEW\n"
        "The national research foundation obligated $42 billion in scientific grants.\n"
        "A severe compliance risk was identified regarding late milestone filings.\n"
        "The committee decided to implement quarterly reporting.\n"
        "We recommend mandatory training for all program directors.\n"
        "Action item: Publish new guidelines by December 31, 2024."
    )
    chunks = [
        {"chunk_id": "c1", "page_number": 1, "section_title": "Overview", "content": full_text}
    ]
    sections = [
        {"title": "Overview", "page": 1, "content": full_text, "order": 0}
    ]
    return {"full_text": full_text, "chunks": chunks, "sections": sections}

def test_document_analysis_agent(mock_document_data):
    agent = DocumentAnalysisAgent()
    context = {"language": "en"}
    result: DocumentAnalysisResult = agent.run(mock_document_data, context)

    assert isinstance(result, DocumentAnalysisResult)
    assert len(result.key_facts) > 0 or len(result.risks) > 0
    assert len(result.relevant_sections) > 0

def test_summarization_agent(mock_document_data):
    analysis_agent = DocumentAnalysisAgent()
    sum_agent = SummarizationAgent()
    context = {"requested_focus": "Identify the major risks and decisions", "language": "en"}

    analysis = analysis_agent.run(mock_document_data, context)
    sum_input = {"analysis": analysis, "chunks": mock_document_data["chunks"]}

    draft: DraftSummaryResult = sum_agent.run(sum_input, context)

    assert isinstance(draft, DraftSummaryResult)
    assert len(draft.executive_summary) > 20
    assert draft.requested_focus == context["requested_focus"]
    assert len(draft.source_references) > 0

def test_summary_validation_agent(mock_document_data):
    analysis_agent = DocumentAnalysisAgent()
    sum_agent = SummarizationAgent()
    val_agent = SummaryValidationAgent()
    context = {"requested_focus": "Comprehensive Executive Briefing", "language": "en"}

    analysis = analysis_agent.run(mock_document_data, context)
    draft = sum_agent.run({"analysis": analysis, "chunks": mock_document_data["chunks"]}, context)

    val_input = {
        "draft": draft,
        "chunks": mock_document_data["chunks"],
        "full_text": mock_document_data["full_text"]
    }
    val_res: ValidationResult = val_agent.run(val_input, context)

    assert isinstance(val_res, ValidationResult)
    assert 0.0 <= val_res.factual_consistency_score <= 1.0
    assert 0.0 <= val_res.groundedness_score <= 1.0
    assert len(val_res.final_validated_summary) > 0
    assert val_res.is_approved_for_tts is True

def test_quality_evaluation_agent(mock_document_data):
    analysis_agent = DocumentAnalysisAgent()
    sum_agent = SummarizationAgent()
    val_agent = SummaryValidationAgent()
    eval_agent = QualityEvaluationAgent()
    context = {"requested_focus": "Comprehensive Executive Briefing", "language": "en"}

    analysis = analysis_agent.run(mock_document_data, context)
    draft = sum_agent.run({"analysis": analysis, "chunks": mock_document_data["chunks"]}, context)
    val_res = val_agent.run({
        "draft": draft,
        "chunks": mock_document_data["chunks"],
        "full_text": mock_document_data["full_text"]
    }, context)

    eval_input = {
        "validation": val_res,
        "draft": draft,
        "full_text": mock_document_data["full_text"]
    }
    eval_res: QualityMetrics = eval_agent.run(eval_input, context)

    assert isinstance(eval_res, QualityMetrics)
    assert 0.0 <= eval_res.relevance_score <= 1.0
    assert 0.0 <= eval_res.overall_quality_score <= 1.0
    assert "### Summary Quality & Evaluation Report" in eval_res.report_markdown
