import pytest
from backend.services.govreport_evaluator import govreport_evaluator
from evaluation.evaluate_govreport import (
    load_govreport_local_subset,
    run_pipeline_on_document,
    evaluate_benchmark
)

def test_govreport_evaluator_metrics_with_rouge():
    """Verify GovReport evaluator computes quality scores and ROUGE metrics."""
    source_doc = (
        "In fiscal year 2020, federal agencies allocated $42 billion across 45,000 research grants. "
        "Audits revealed 34 percent of files lacked required 90-day progress reports, causing compliance risk."
    )
    gen_sum = (
        "Federal agencies allocated $42 billion in research grants during fiscal year 2020. "
        "Audits found 34 percent lacked 90-day progress reports."
    )
    ref_sum = (
        "Federal agencies obligated $42 billion for research grants in 2020, but 34 percent lacked timely progress reviews."
    )

    metrics = govreport_evaluator.evaluate_summary(
        source_document=source_doc,
        generated_summary=gen_sum,
        reference_summary=ref_sum
    )

    assert "overall_quality_score" in metrics
    assert "factual_consistency_score" in metrics
    assert "relevance_score" in metrics
    assert "completeness_score" in metrics
    assert "groundedness_score" in metrics
    assert "validation_accuracy_score" in metrics

    # Check ROUGE metrics
    assert "rouge_scores" in metrics
    rouge = metrics["rouge_scores"]
    assert "rouge_1" in rouge
    assert "rouge_2" in rouge
    assert "rouge_l" in rouge

    assert rouge["rouge_1"]["f1"] > 0.3
    assert rouge["rouge_l"]["f1"] > 0.3

def test_govreport_local_samples_load():
    """Verify local GovReport samples can be retrieved."""
    samples = load_govreport_local_subset(limit=2)
    assert len(samples) > 0
    first = samples[0]
    assert "id" in first
    assert "document" in first
    assert "summary" in first
    assert len(first["document"]) > 100

def test_benchmark_pipeline_execution():
    """Verify running the multi-agent pipeline on a sample text returns valid outputs."""
    sample_text = (
        "SECTION 1: OVERVIEW\n"
        "The Department of Energy reviewed 50 active solar research projects valued at $120 million. "
        "Program managers confirmed all 50 projects met quarterly milestones without schedule slippage.\n"
        "SECTION 2: RISKS & DECISIONS\n"
        "Potential supply chain delays pose minor risk for photovoltaic sensors. "
        "Leadership approved establishing regional parts warehouses by Q3 2022."
    )

    analysis, draft, validation = run_pipeline_on_document(
        doc_id="test_doc_001",
        doc_text=sample_text,
        requested_focus="Executive Summary"
    )

    assert len(draft.executive_summary) > 30
    assert validation is not None
    assert isinstance(validation.is_approved_for_tts, bool)
    assert validation.factual_consistency_score > 0.5
