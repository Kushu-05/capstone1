import asyncio
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.database_models import AgentWorkflowRun, AudioRecord, ValidationReport
from backend.schemas.api_schemas import AudioGenerateRequest, AudioResponse
from backend.services.tts_service import generate_validated_speech, clean_text_for_tts, resolve_voice_for_language
from backend.services.translation_service import normalize_lang_code, ensure_translation
from backend.utils.logger import logger

router = APIRouter(prefix="/api/tts", tags=["Text-to-Speech"])

@router.post("/generate", response_model=AudioResponse)
async def generate_speech_for_workflow(
    payload: AudioGenerateRequest,
    db: Session = Depends(get_db)
):
    """
    Generate audio briefing STRICTLY from the final validated summary in the requested language.
    Blocks unvalidated draft summaries.
    Caches generated audio per (workflow_run_id, language).
    """
    run = db.query(AgentWorkflowRun).filter(AgentWorkflowRun.id == payload.workflow_run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Workflow run not found.")

    val_report: ValidationReport = run.validation_report
    if not val_report:
        raise HTTPException(
            status_code=403,
            detail="Security Block: This summary has not undergone verification by the Summary Validation Agent."
        )

    if not val_report.is_approved_for_tts:
        raise HTTPException(
            status_code=403,
            detail="Validation Gatekeeper: Summary was rejected by the validation agent due to unverified claims or contradictions."
        )

    target_lang = normalize_lang_code(payload.language or run.language or "en")

    # Check cache: If audio already exists for this workflow run and target language, return it immediately
    cached_audio = db.query(AudioRecord).filter(
        AudioRecord.workflow_run_id == run.id,
        AudioRecord.language == target_lang
    ).order_by(AudioRecord.created_at.desc()).first()

    if cached_audio and Path(cached_audio.audio_file_path).exists():
        logger.info(f"Returning cached audio for run={run.id}, language={target_lang}")
        return AudioResponse(
            audio_id=cached_audio.id,
            workflow_run_id=run.id,
            document_id=run.document_id,
            audio_url=f"/api/tts/audio/{cached_audio.id}",
            voice=cached_audio.voice,
            language=cached_audio.language,
            duration_seconds=cached_audio.duration_seconds,
            is_validated_source=True
        )

    try:
        # Determine base text to synthesize
        if payload.text and payload.text.strip():
            base_text = payload.text.strip()
        else:
            base_text = val_report.final_validated_summary or ""
            if not base_text and run.audio_script_draft and run.audio_script_draft.broadcast_script:
                base_text = run.audio_script_draft.broadcast_script

        # Translate text if needed to ensure target language matches
        try:
            base_text = await asyncio.to_thread(ensure_translation, base_text, target_lang)
        except Exception as te:
            logger.warning(f"Translation prior to TTS failed: {te}")

        speech_text = clean_text_for_tts(base_text)
        if not speech_text:
            speech_text = base_text.strip()

        audio_id, audio_path, duration = await generate_validated_speech(
            workflow_run_id=run.id,
            document_id=run.document_id,
            final_validated_summary=speech_text,
            is_approved_for_tts=val_report.is_approved_for_tts,
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

        return AudioResponse(
            audio_id=audio_id,
            workflow_run_id=run.id,
            document_id=run.document_id,
            audio_url=f"/api/tts/audio/{audio_id}",
            voice=audio_rec.voice,
            language=audio_rec.language,
            duration_seconds=duration,
            is_validated_source=True
        )

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"TTS generation error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"TTS generation failed: {str(e)}")

@router.get("/audio/{audio_id}")
def stream_audio(audio_id: str, db: Session = Depends(get_db)):
    """Stream or download generated MP3 audio file."""
    audio_rec = db.query(AudioRecord).filter(AudioRecord.id == audio_id).first()
    if not audio_rec:
        raise HTTPException(status_code=404, detail="Audio file record not found.")

    audio_path = Path(audio_rec.audio_file_path)
    if not audio_path.exists():
        raise HTTPException(status_code=404, detail="Audio file not found on disk.")

    return FileResponse(
        path=str(audio_path),
        media_type="audio/mpeg",
        filename=audio_path.name,
        content_disposition_type="inline",
        headers={
            "Accept-Ranges": "bytes",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
        }
    )
