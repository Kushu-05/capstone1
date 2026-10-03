from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.services.govreport_evaluator import govreport_evaluator
from backend.services.ingestion_service import clean_text
from backend.services.chunking_service import chunk_document
from backend.services.ingestion_service import IngestionResult
from backend.agents.analysis_agent import DocumentAnalysisAgent
from backend.agents.summarization_agent import SummarizationAgent
from backend.agents.validation_agent import SummaryValidationAgent
from backend.agents.evaluation_agent import QualityEvaluationAgent
from backend.schemas.api_schemas import GovReportEvalResponse
from backend.utils.logger import logger

router = APIRouter(prefix="/api/evaluation", tags=["GovReport Benchmark Evaluation"])

@router.get("/govreport/samples")
def list_govreport_samples():
    """List available sample documents from GovReport long document summarization dataset."""
    samples = govreport_evaluator.list_available_samples()
    return {"samples": samples, "dataset": "GovReport Long Document Summarization Dataset"}

@router.post("/govreport/run/{sample_id}", response_model=GovReportEvalResponse)
def evaluate_govreport_sample(sample_id: str):
    """
    Run full multi-agent workflow on a GovReport benchmark document and evaluate against ground truth.
    """
    sample = govreport_evaluator.load_sample(sample_id)
    if not sample:
        raise HTTPException(status_code=404, detail=f"GovReport sample '{sample_id}' not found.")

    doc_text = sample.get("document", "")
    ref_summary = sample.get("summary", "")

    # Ingestion representation
    ingestion = IngestionResult(
        full_text=clean_text(doc_text),
        pages=[{"page_number": 1, "text": doc_text}],
        sections=[],
        page_count=1,
        word_count=len(doc_text.split()),
        char_count=len(doc_text)
    )

    chunks = chunk_document(sample_id, ingestion)
    chunks_dict = [c.to_dict() for c in chunks]

    # Run agents
    context = {"workflow_run_id": f"benchmark_{sample_id}", "language": "en"}
    analysis_agent = DocumentAnalysisAgent()
    analysis = analysis_agent.run({"full_text": doc_text, "chunks": chunks_dict, "sections": []}, context)

    sum_agent = SummarizationAgent()
    draft = sum_agent.run({"analysis": analysis, "chunks": chunks_dict}, {"requested_focus": "Comprehensive Executive Briefing", "language": "en"})

    val_agent = SummaryValidationAgent()
    validation = val_agent.run({"draft": draft, "chunks": chunks_dict, "full_text": doc_text}, context)

    # Evaluate against GovReport reference summary
    eval_metrics = govreport_evaluator.evaluate_summary(
        source_document=doc_text,
        generated_summary=validation.final_validated_summary,
        reference_summary=ref_summary
    )

    return GovReportEvalResponse(
        dataset_name="GovReport Long Document Summarization Benchmark",
        sample_id=sample.get("id", sample_id),
        title=sample.get("title", "Federal Policy Report"),
        agency=sample.get("agency", "Federal Agency"),
        relevance_score=eval_metrics["relevance_score"],
        completeness_score=eval_metrics["completeness_score"],
        factual_consistency_score=eval_metrics["factual_consistency_score"],
        groundedness_score=eval_metrics["groundedness_score"],
        overall_quality_score=eval_metrics["overall_quality_score"],
        validation_accuracy_score=eval_metrics["validation_accuracy_score"],
        reference_summary_length=eval_metrics["reference_summary_word_count"],
        generated_summary_length=eval_metrics["generated_summary_word_count"],
        evaluation_summary=f"Evaluated on {sample.get('title')}. Achieved {int(eval_metrics['overall_quality_score']*100)}% overall quality with {int(eval_metrics['factual_consistency_score']*100)}% factual consistency.",
        detailed_metrics=eval_metrics["metrics_explanation"]
    )
