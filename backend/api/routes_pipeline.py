import asyncio
from pathlib import Path
from typing import Dict, Tuple
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.agents.agent_orchestrator import orchestrator
from backend.models.database_models import AgentWorkflowRun, AudioRecord
from backend.schemas.api_schemas import (
    WorkflowRunRequest,
    MultiWorkflowRunRequest,
    WorkflowRunResponse,
    SwitchLanguageRequest,
    SwitchLanguageResponse,
    AudioResponse
)
from backend.schemas.agent_schemas import (
    DocumentAnalysisResult,
    DraftSummaryResult,
    ValidationResult,
    QualityMetrics,
    AudioScriptResult
)
from backend.services.tts_service import (
    generate_validated_speech,
    clean_text_for_tts,
    resolve_voice_for_language
)
from backend.services.translation_service import (
    normalize_lang_code,
    ensure_translation,
    detect_script_language,
    is_in_target_script
)
from backend.config import settings
from backend.utils.logger import logger

router = APIRouter(prefix="/api/pipeline", tags=["Agent Workflow Pipeline"])

@router.post("/run-multi", response_model=WorkflowRunResponse)
async def run_multi_document_pipeline(
    payload: MultiWorkflowRunRequest,
    db: Session = Depends(get_db)
):
    """
    Executes cross-document synthesis across multiple selected documents:
    Multiple Documents -> Combined Extraction -> Cross-Document Synthesis -> Multi-Doc Validation -> Evaluation -> Master TTS
    """
    try:
        result = await orchestrator.execute_multi_document_pipeline(
            db=db,
            document_ids=payload.document_ids,
            requested_focus=payload.requested_focus or "Unified Master Cross-Document Briefing",
            language=payload.language or "en",
            auto_generate_audio=payload.auto_generate_audio or False,
            voice=payload.voice
        )
        return WorkflowRunResponse(
            workflow_run_id=result["workflow_run_id"],
            document_id=result["document_id"],
            status=result["status"],
            requested_focus=result["requested_focus"],
            language=result["language"],
            analysis=result["analysis"],
            draft_summary=result["draft_summary"],
            validation=result["validation"],
            evaluation=result["evaluation"],
            audio_script=result.get("audio_script"),
            audio_path=result["audio_path"],
            audio_id=result["audio_id"],
            fallbacks_used=result.get("fallbacks_used", []),
            llm_provider=result.get("llm_provider", "gemini"),
            model=result.get("model", settings.GEMINI_MODEL),
            validation_method=result.get("validation_method", "ai"),
            audio_status=result.get("audio_status", "success"),
            are_unrelated=result.get("are_unrelated", False),
            relationship_disclaimer=result.get("relationship_disclaimer"),
            relationship_classification=result.get("relationship_classification", "RELATED"),
            warning_message=result.get("warning_message"),
            summary_strategy=result.get("summary_strategy"),
            separate_summaries=result.get("separate_summaries"),
            shared_themes=result.get("shared_themes"),
            distinct_aspects=result.get("distinct_aspects"),
            document_domains=result.get("document_domains"),
            pairwise_scores=result.get("pairwise_scores")
        )
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        logger.error(f"Error executing multi-document pipeline: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Pipeline execution error: {str(e)}")

@router.post("/run", response_model=WorkflowRunResponse)
async def run_multi_agent_pipeline(
    payload: WorkflowRunRequest,
    db: Session = Depends(get_db)
):
    """
    Executes the multi-stage document intelligence workflow:
    Document -> Analysis Agent (1) -> Summarization Agent (2) -> Validation Gatekeeper (3) 
             -> Evaluation Agent (4) -> Audio Script Adaptation Agent (5) -> TTS (6)
    """
    try:
        result = await orchestrator.execute_full_pipeline(
            db=db,
            document_id=payload.document_id,
            requested_focus=payload.requested_focus or "Comprehensive Executive Briefing",
            language=payload.language or "en",
            auto_generate_audio=payload.auto_generate_audio or False,
            voice=payload.voice
        )
        return WorkflowRunResponse(
            workflow_run_id=result["workflow_run_id"],
            document_id=result["document_id"],
            status=result["status"],
            requested_focus=result["requested_focus"],
            language=result["language"],
            analysis=result["analysis"],
            draft_summary=result["draft_summary"],
            validation=result["validation"],
            evaluation=result["evaluation"],
            audio_script=result.get("audio_script"),
            audio_path=result["audio_path"],
            audio_id=result["audio_id"],
            fallbacks_used=result.get("fallbacks_used", []),
            llm_provider=result.get("llm_provider", "gemini"),
            model=result.get("model", settings.GEMINI_MODEL),
            validation_method=result.get("validation_method", "ai"),
            audio_status=result.get("audio_status", "success"),
            audio_error=result.get("audio_error")
        )
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        logger.error(f"Error executing agent pipeline: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Pipeline execution error: {str(e)}")

def _build_workflow_response(run: AgentWorkflowRun) -> WorkflowRunResponse:
    analysis_res = None
    if run.analysis_result:
        analysis_res = DocumentAnalysisResult(
            key_facts=run.analysis_result.key_facts or [],
            risks=run.analysis_result.risks or [],
            decisions=run.analysis_result.decisions or [],
            recommendations=run.analysis_result.recommendations or [],
            action_items=run.analysis_result.action_items or [],
            relevant_sections=run.analysis_result.relevant_sections or []
        )

    draft_res = None
    if run.summary_draft:
        draft_res = DraftSummaryResult(
            requested_focus=run.requested_focus,
            executive_summary=run.summary_draft.executive_summary,
            key_findings=run.summary_draft.key_findings or [],
            source_references=run.summary_draft.source_references or [],
            raw_draft=run.summary_draft.raw_draft
        )

    val_res = None
    if run.validation_report:
        val_res = ValidationResult(
            factual_consistency_score=run.validation_report.factual_consistency_score,
            groundedness_score=run.validation_report.groundedness_score,
            validation_accuracy_score=run.validation_report.validation_accuracy_score,
            unsupported_claims=run.validation_report.unsupported_claims or [],
            contradictions=run.validation_report.contradictions or [],
            missing_info=run.validation_report.missing_info or [],
            final_validated_summary=run.validation_report.final_validated_summary,
            is_approved_for_tts=run.validation_report.is_approved_for_tts,
            validation_details=run.validation_report.validation_details or {}
        )

    eval_res = None
    if run.evaluation_report:
        eval_res = QualityMetrics(
            relevance_score=run.evaluation_report.relevance_score,
            completeness_score=run.evaluation_report.completeness_score,
            factual_consistency_score=run.evaluation_report.factual_consistency_score,
            groundedness_score=run.evaluation_report.groundedness_score,
            overall_quality_score=run.evaluation_report.overall_quality_score,
            validation_accuracy_score=run.evaluation_report.validation_accuracy_score,
            metrics_explanation=run.evaluation_report.metrics_explanation or {},
            report_markdown=run.evaluation_report.report_markdown or ""
        )

    audio_script_res = None
    if run.audio_script_draft:
        audio_script_res = AudioScriptResult(
            broadcast_script=run.audio_script_draft.broadcast_script,
            tone_and_cadence=run.audio_script_draft.tone_and_cadence,
            estimated_duration_seconds=run.audio_script_draft.estimated_duration_seconds,
            word_count=run.audio_script_draft.word_count,
            spoken_anchors=run.audio_script_draft.spoken_anchors or [],
            script_adaptation_notes=run.audio_script_draft.script_adaptation_notes or []
        )

    audio_rec = run.audio_records[0] if run.audio_records else None
    val_method = getattr(val_res, "validation_method", "ai") if val_res else "ai"

    return WorkflowRunResponse(
        workflow_run_id=run.id,
        document_id=run.document_id,
        status=run.status,
        requested_focus=run.requested_focus,
        language=run.language,
        analysis=analysis_res,
        draft_summary=draft_res,
        validation=val_res,
        evaluation=eval_res,
        audio_script=audio_script_res,
        audio_path=audio_rec.audio_file_path if audio_rec else None,
        audio_id=audio_rec.id if audio_rec else None,
        error_message=run.error_message,
        fallbacks_used=[],
        llm_provider=settings.LLM_PROVIDER,
        model=settings.GEMINI_MODEL,
        validation_method=val_method,
        audio_status="success" if audio_rec else "disabled",
        audio_error=None
    )

@router.get("/runs/{workflow_run_id}", response_model=WorkflowRunResponse)
def get_workflow_run(workflow_run_id: str, db: Session = Depends(get_db)):
    """Retrieve full results of an existing workflow run."""
    run = db.query(AgentWorkflowRun).filter(AgentWorkflowRun.id == workflow_run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Workflow run not found.")
    return _build_workflow_response(run)

@router.get("/document/{document_id}/latest")
def get_latest_workflow_run_for_document(document_id: str, db: Session = Depends(get_db)):
    """Retrieve the most recent workflow run for a given document."""
    run = db.query(AgentWorkflowRun).filter(
        AgentWorkflowRun.document_id == document_id
    ).order_by(AgentWorkflowRun.started_at.desc()).first()
    if not run:
        return None
    return _build_workflow_response(run)

_WORKFLOW_TRANSLATION_CACHE: Dict[Tuple[str, str], str] = {}

@router.post("/switch-language", response_model=SwitchLanguageResponse)
async def switch_language_for_workflow(
    payload: SwitchLanguageRequest,
    db: Session = Depends(get_db)
):
    """
    Switches language for an existing generated summary without re-running document ingestion or chunking:
    1. Preserves canonical validated summary and source grounding intact.
    2. Translates summary representation into target language with structured formatting preserved.
    3. Caches translated representation.
    4. Generates (or returns cached) matching Edge-TTS neural audio briefing for that exact language.
    5. Returns translated text and matching audio object.
    """
    run = db.query(AgentWorkflowRun).filter(AgentWorkflowRun.id == payload.workflow_run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Workflow run not found.")

    val_report = run.validation_report
    canonical_summary = None
    if val_report and val_report.final_validated_summary:
        canonical_summary = val_report.final_validated_summary
    elif run.summary_draft and run.summary_draft.executive_summary:
        canonical_summary = run.summary_draft.executive_summary
    elif run.summary_draft and run.summary_draft.raw_draft:
        canonical_summary = run.summary_draft.raw_draft

    if not canonical_summary:
        raise HTTPException(
            status_code=400,
            detail="Cannot switch language: No summary found for this workflow run."
        )

    target_lang = normalize_lang_code(payload.target_language)
    detected_source = detect_script_language(canonical_summary)
    original_lang = normalize_lang_code(run.language or detected_source)

    # Step 1: Resolve translated summary text (preserving canonical summary)
    if target_lang == detected_source and is_in_target_script(canonical_summary, target_lang):
        translated_summary = canonical_summary
    else:
        cache_key = (run.id, target_lang)
        if cache_key in _WORKFLOW_TRANSLATION_CACHE and (target_lang == "en" or is_in_target_script(_WORKFLOW_TRANSLATION_CACHE[cache_key], target_lang)):
            translated_summary = _WORKFLOW_TRANSLATION_CACHE[cache_key]
        else:
            translated_summary = await asyncio.to_thread(ensure_translation, canonical_summary, target_lang, detected_source)
            if is_in_target_script(translated_summary, target_lang) or target_lang == "en":
                _WORKFLOW_TRANSLATION_CACHE[cache_key] = translated_summary


    # Step 2: Handle audio for the target language if requested
    audio_response = None
    if payload.auto_generate_audio and len(canonical_summary) > 30:
        # Check if an audio record already exists for this workflow run and target language
        cached_audio = db.query(AudioRecord).filter(
            AudioRecord.workflow_run_id == run.id,
            AudioRecord.language == target_lang
        ).order_by(AudioRecord.created_at.desc()).first()

        if cached_audio and Path(cached_audio.audio_file_path).exists() and Path(cached_audio.audio_file_path).stat().st_size > 1000:
            audio_response = AudioResponse(
                audio_id=cached_audio.id,
                workflow_run_id=run.id,
                document_id=run.document_id,
                audio_url=f"/api/tts/audio/{cached_audio.id}",
                voice=cached_audio.voice,
                language=cached_audio.language,
                duration_seconds=cached_audio.duration_seconds,
                is_validated_source=True
            )
        else:
            # Generate new audio using clean translated text and target language voice
            spoken_text = clean_text_for_tts(translated_summary)
            if not spoken_text:
                spoken_text = translated_summary.strip()

            try:
                approved_flag = True
                audio_id, audio_path, duration = await generate_validated_speech(
                    workflow_run_id=run.id,
                    document_id=run.document_id,
                    final_validated_summary=spoken_text,
                    is_approved_for_tts=approved_flag,
                    language=target_lang,
                    voice=payload.voice
                )
                resolved_voice = resolve_voice_for_language(target_lang, payload.voice)

                audio_rec = AudioRecord(
                    id=audio_id,
                    workflow_run_id=run.id,
                    document_id=run.document_id,
                    voice=resolved_voice,
                    language=target_lang,
                    audio_file_path=audio_path,
                    duration_seconds=duration,
                    is_validated_source=True
                )
                db.add(audio_rec)
                db.commit()

                audio_response = AudioResponse(
                    audio_id=audio_id,
                    workflow_run_id=run.id,
                    document_id=run.document_id,
                    audio_url=f"/api/tts/audio/{audio_id}",
                    voice=resolved_voice,
                    language=target_lang,
                    duration_seconds=duration,
                    is_validated_source=True
                )
            except Exception as e:
                logger.error(f"Audio generation failed during language switch to '{target_lang}': {e}")
                audio_response = None

    return SwitchLanguageResponse(
        workflow_run_id=run.id,
        language=target_lang,
        original_language=original_lang,
        canonical_summary=canonical_summary,
        translated_summary=translated_summary,
        audio=audio_response
    )

