from typing import Dict, Any
from backend.agents.base_agent import BaseAgent
from backend.schemas.agent_schemas import (
    ValidationResult,
    DraftSummaryResult,
    QualityMetrics
)
from backend.services.govreport_evaluator import govreport_evaluator
from backend.utils.logger import logger

class QualityEvaluationAgent(BaseAgent):
    """
    Agent 4: QUALITY / EVALUATION AGENT
    Evaluates the final validated summary across six core standard dimensions:
    - Relevance
    - Completeness
    - Factual Consistency
    - Groundedness
    - Overall Summary Quality
    - Validation Accuracy
    Returns understandable numerical scores and qualitative rationale.
    """

    def __init__(self):
        super().__init__(
            agent_id="agent_04_evaluator",
            name="Quality / Evaluation Agent",
            role="Independent multi-dimensional quality assessment and reporting"
        )

    def run(self, input_data: Dict[str, Any], context: Dict[str, Any]) -> QualityMetrics:
        validation: ValidationResult = input_data.get("validation")
        draft: DraftSummaryResult = input_data.get("draft")
        full_text: str = input_data.get("full_text", "")

        logger.info(f"[{self.name}] Scoring summary quality across all metrics")

        language = context.get("language", "en")
        requested_focus = context.get("requested_focus", "")

        # Use benchmark evaluator to compute standard metrics
        eval_dict = govreport_evaluator.evaluate_summary(
            source_document=full_text,
            generated_summary=validation.final_validated_summary,
            reference_summary=draft.raw_draft,
            language=language,
            requested_focus=requested_focus
        )

        relevance = eval_dict["relevance_score"]
        completeness = eval_dict["completeness_score"]
        factual_consistency = min(validation.factual_consistency_score, eval_dict["factual_consistency_score"])
        groundedness = validation.groundedness_score
        val_acc = validation.validation_accuracy_score
        overall = eval_dict["overall_quality_score"]

        # Generate markdown report
        report_md = f"""### Summary Quality & Evaluation Report

| Metric | Score | Performance Tier | Rationale |
| :--- | :---: | :---: | :--- |
| **Relevance** | **{int(relevance*100)}%** | {'Excellent' if relevance >= 0.85 else ('Good' if relevance >= 0.65 else 'Low / Out-of-Scope')} | {'High alignment with document objectives.' if relevance >= 0.65 else f"⚠️ Query '{requested_focus}' has poor alignment with document content."} |
| **Completeness** | **{int(completeness*100)}%** | {'Excellent' if completeness >= 0.85 else ('Good' if completeness >= 0.60 else 'Deficient')} | {'Covers required findings, risks, and roadmap.' if completeness >= 0.60 else 'Insufficient evidence to satisfy query.'} |
| **Factual Consistency** | **{int(factual_consistency*100)}%** | {'Verified' if factual_consistency >= 0.90 else ('Acceptable' if factual_consistency >= 0.70 else 'Unverified')} | Grounded in primary source text with no unverified claims. |
| **Groundedness** | **{int(groundedness*100)}%** | {'High' if groundedness >= 0.85 else 'Moderate'} | Direct references to sections, statistics, and citations. |
| **Validation Accuracy** | **{int(val_acc*100)}%** | {'Certified' if val_acc >= 0.85 else 'Reviewed'} | Filtered through the Summary Validation Agent. |
| **Overall Quality** | **{int(overall*100)}%** | **{'Production Grade' if overall >= 0.85 else ('Meets Standard' if overall >= 0.60 else 'Degraded / Irrelevant')}** | **Composite weighted performance index.** |

**Validation Verdict:**
- Focus/Question: "{requested_focus or 'General Executive Briefing'}"
- Unsupported Claims Removed: {len(validation.unsupported_claims)}
- Contradictions Detected: {len(validation.contradictions)}
- TTS Safety Approval: **{'GRANTED' if validation.is_approved_for_tts else 'DENIED'}**
"""

        return QualityMetrics(
            relevance_score=relevance,
            completeness_score=completeness,
            factual_consistency_score=factual_consistency,
            groundedness_score=groundedness,
            overall_quality_score=overall,
            validation_accuracy_score=val_acc,
            metrics_explanation=eval_dict["metrics_explanation"],
            report_markdown=report_md
        )
