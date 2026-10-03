import os
import pytest
from pathlib import Path
from unittest.mock import MagicMock, patch
from backend.config import settings
from backend.services.llm_service import LLMService, safe_parse_json
from backend.services.chunking_service import chunk_document, chunk_document_with_fallback
from backend.services.ingestion_service import extract_from_pdf, IngestionResult
from backend.services.tts_service import generate_validated_speech_safe
from backend.agents.validation_agent import SummaryValidationAgent
from backend.schemas.agent_schemas import DraftSummaryResult, SourceReference, ValidationResult
from backend.utils.errors import (
    RecoverableError,
    LLMRateLimitError,
    sanitize_log_message
)

# ----------------------------------------------------
# 1. Error Sanitization Test
# ----------------------------------------------------
def test_log_sanitization():
    raw_msg_openai = "Failed request with Authorization: Bearer sk-proj-1234567890abcdef1234567890"
    sanitized = sanitize_log_message(raw_msg_openai)
    assert "sk-proj-1234567890abcdef1234567890" not in sanitized
    assert "REDACTED" in sanitized

    raw_msg_gemini = "Error contacting Gemini endpoint with key AIzaSyA1B2C3D4E5F6G7H8I9J0"
    sanitized_gemini = sanitize_log_message(raw_msg_gemini)
    assert "AIzaSyA1B2C3D4E5F6G7H8I9J0" not in sanitized_gemini
    assert "REDACTED" in sanitized_gemini


# ----------------------------------------------------
# 2. Structured JSON Parsing & Regex Repair Tests
# ----------------------------------------------------
def test_json_clean_parse():
    raw = '{"name": "DocVoice", "score": 95}'
    parsed, was_repaired = safe_parse_json(raw)
    assert parsed == {"name": "DocVoice", "score": 95}
    assert was_repaired is False


def test_json_markdown_block_repair():
    raw = "```json\n{\n  \"status\": \"approved\",\n  \"count\": 3\n}\n```"
    parsed, was_repaired = safe_parse_json(raw)
    assert parsed == {"status": "approved", "count": 3}
    assert was_repaired is True


def test_json_regex_extraction_from_prose():
    raw = "Here is the response you requested:\n\n{\"summary\": \"Grounding passed\", \"approved\": true}\n\nHope this helps!"
    parsed, was_repaired = safe_parse_json(raw)
    assert parsed == {"summary": "Grounding passed", "approved": True}
    assert was_repaired is True


def test_json_fallback_on_unrepairable_content():
    service = LLMService()
    service.openai_configured = False
    service.gemini_configured = False
    # If no LLM is configured or available, returns None without raising an unhandled exception
    res = service.generate_json_or_text("test prompt", as_json=True)
    assert res is None


# ----------------------------------------------------
# 3. LLM Provider Fallback (OpenAI -> Gemini)
# ----------------------------------------------------
def test_llm_provider_fallback(monkeypatch):
    service = LLMService()
    monkeypatch.setattr(settings, "LLM_PROVIDER", "openai")
    monkeypatch.setattr(settings, "FALLBACK_LLM_PROVIDER", "gemini")
    service.openai_configured = True
    service.gemini_configured = True

    # Mock OpenAI client execution to fail with recoverable error
    def mock_openai_fail(*args, **kwargs):
        raise LLMRateLimitError("OpenAI quota exceeded")

    # Mock Gemini client execution to succeed
    def mock_gemini_success(*args, **kwargs):
        return '{"result": "success_from_gemini"}', "gemini-1.5-flash", []

    monkeypatch.setattr(service, "_execute_openai_with_model_fallback", mock_openai_fail)
    monkeypatch.setattr(service, "_execute_gemini_with_model_fallback", mock_gemini_success)

    service.reset_tracking()
    res = service.generate_json_or_text("test prompt", as_json=False)
    assert "success_from_gemini" in res

    meta = service.get_last_execution_metadata()
    assert meta["llm_provider"] == "gemini"
    assert "llm_provider" in meta["fallbacks_used"]


# ----------------------------------------------------
# 4. Model Fallback within Provider
# ----------------------------------------------------
def test_model_fallback_within_openai(monkeypatch):
    service = LLMService()
    monkeypatch.setattr(settings, "LLM_PROVIDER", "openai")
    monkeypatch.setattr(settings, "OPENAI_MODEL", "gpt-4o")
    monkeypatch.setattr(settings, "OPENAI_FALLBACK_MODEL", "gpt-4o-mini")
    service.openai_configured = True

    mock_client = MagicMock()

    def mock_create(*args, **kwargs):
        model_used = kwargs.get("model")
        if model_used == "gpt-4o":
            raise LLMRateLimitError("Rate limit on gpt-4o")
        mock_choice = MagicMock()
        mock_choice.message.content = "Response from gpt-4o-mini fallback"
        mock_resp = MagicMock()
        mock_resp.choices = [mock_choice]
        return mock_resp

    mock_client.chat.completions.create.side_effect = mock_create
    service.openai_client = mock_client

    service.reset_tracking()
    raw, model_used, fallbacks = service._execute_openai_with_model_fallback("test prompt", "", as_json=False)
    assert raw == "Response from gpt-4o-mini fallback"
    assert model_used == "gpt-4o-mini"
    assert "llm_model" in fallbacks


# ----------------------------------------------------
# 5. Chunking Fallback (Token Ceiling & Invariants)
# ----------------------------------------------------
def test_chunking_fallback_on_oversized_content(monkeypatch):
    long_text = "This is a detailed analysis sentence explaining regulatory requirements. " * 80
    ingestion = IngestionResult(
        full_text=long_text,
        pages=[{"page_number": 1, "text": long_text}],
        sections=[{"title": "Section 1", "page": 1, "content": long_text, "order": 0}],
        page_count=1,
        word_count=len(long_text.split()),
        char_count=len(long_text)
    )

    # 1. Overlap >= chunk_size invariant is auto-adjusted safely
    chunks_adjusted = chunk_document("doc_test", ingestion, chunk_size=500, chunk_overlap=500)
    assert len(chunks_adjusted) > 0

    # 2. Token ceiling triggers fallback re-chunking
    monkeypatch.setattr(settings, "MAX_CHUNK_TOKEN_CEILING", 50)
    monkeypatch.setattr(settings, "FALLBACK_CHUNK_SIZE_CHARS", 300)
    monkeypatch.setattr(settings, "FALLBACK_CHUNK_OVERLAP_CHARS", 40)

    chunks, fallback_applied = chunk_document_with_fallback("doc_test", ingestion)
    assert fallback_applied is True
    assert len(chunks) > 0
    for c in chunks:
        assert len(c.content) <= 350


# ----------------------------------------------------
# 6. Validation Agent Deterministic Fallback
# ----------------------------------------------------
def test_validation_agent_deterministic_fallback(monkeypatch):
    agent = SummaryValidationAgent()
    context = {"requested_focus": "Executive Briefing", "language": "en"}

    draft = DraftSummaryResult(
        executive_summary="The foundation obligated $42 billion for scientific research projects.",
        key_findings=[],
        requested_focus="Executive Briefing",
        source_references=[SourceReference(page=1, section="Overview", chunk_id="c1", quote_or_topic="42 billion")],
        raw_draft="The foundation obligated $42 billion for scientific research projects."
    )
    chunks = [
        {"chunk_id": "c1", "page_number": 1, "section_title": "Overview", "content": "The foundation obligated $42 billion in scientific grants."}
    ]

    # Force AI validation to fail and trigger deterministic algorithmic validation fallback
    from backend.services.gemini_client import GeminiClient
    monkeypatch.setattr(GeminiClient, "is_configured", property(lambda self: True))
    monkeypatch.setattr(
        agent,
        "_validate_with_gemini",
        MagicMock(side_effect=RecoverableError("AI validator timeout"))
    )

    result: ValidationResult = agent.run({
        "draft": draft,
        "chunks": chunks,
        "full_text": "The foundation obligated $42 billion in scientific grants."
    }, context)

    assert isinstance(result, ValidationResult)
    assert result.validation_method == "deterministic_fallback"
    assert 0.0 <= result.factual_consistency_score <= 1.0
    assert 0.0 <= result.groundedness_score <= 1.0
    assert len(result.final_validated_summary) > 0


# ----------------------------------------------------
# 7. TTS Dual Engine Fallback (Edge-TTS -> gTTS)
# ----------------------------------------------------
@pytest.mark.asyncio
async def test_tts_dual_engine_fallback(monkeypatch, tmp_path):
    monkeypatch.setattr(settings, "PRIMARY_TTS_PROVIDER", "edge_tts")
    monkeypatch.setattr(settings, "FALLBACK_TTS_PROVIDER", "gtts")
    monkeypatch.setattr(settings, "ENABLE_TTS_FALLBACK", True)

    # Edge-TTS fails
    async def mock_edge_fail(*args, **kwargs):
        raise RecoverableError("Edge-TTS connection reset")

    # gTTS succeeds
    def mock_gtts_success(text, lang, output_path):
        with open(output_path, "wb") as f:
            f.write(b"ID3_MOCK_MP3_DATA")

    with patch("backend.services.tts_service._synthesize_edge_tts", side_effect=mock_edge_fail):
        with patch("backend.services.tts_service._synthesize_gtts", side_effect=mock_gtts_success):
            audio_id, audio_path, duration, status, audio_err, fallbacks = await generate_validated_speech_safe(
                workflow_run_id="run-1234",
                document_id="doc-1234",
                final_validated_summary="Executive briefing summary text.",
                is_approved_for_tts=True,
                language="en"
            )

    assert audio_id is not None
    assert status == "fallback_used"
    assert "tts_fallback" in fallbacks
    assert audio_err is None


# ----------------------------------------------------
# 8. TTS Total Failure Decoupling (Pipeline Stays Intact)
# ----------------------------------------------------
@pytest.mark.asyncio
async def test_tts_failure_safe_decoupling(monkeypatch):
    monkeypatch.setattr(settings, "PRIMARY_TTS_PROVIDER", "edge_tts")
    monkeypatch.setattr(settings, "FALLBACK_TTS_PROVIDER", "gtts")
    monkeypatch.setattr(settings, "ENABLE_TTS_FALLBACK", True)

    async def mock_edge_fail(*args, **kwargs):
        raise RecoverableError("Edge-TTS network error")

    def mock_gtts_fail(*args, **kwargs):
        raise RecoverableError("gTTS network error")

    with patch("backend.services.tts_service._synthesize_edge_tts", side_effect=mock_edge_fail):
        with patch("backend.services.tts_service._synthesize_gtts", side_effect=mock_gtts_fail):
            audio_id, audio_path, duration, status, audio_err, fallbacks = await generate_validated_speech_safe(
                workflow_run_id="run-1234",
                document_id="doc-1234",
                final_validated_summary="Valid summary text that must be preserved.",
                is_approved_for_tts=True,
                language="en"
            )

    assert audio_id is None
    assert audio_path is None
    assert duration == 0.0
    assert status == "failed"
    assert "TTS failed on primary" in audio_err


# ----------------------------------------------------
# 9. Scanned PDF Detection & Graceful Extraction
# ----------------------------------------------------
def test_scanned_pdf_detection_and_ocr_fallback(monkeypatch, tmp_path):
    import fitz
    doc = fitz.open()
    doc.new_page(width=595, height=842)
    pdf_path = tmp_path / "scanned_doc.pdf"
    doc.save(str(pdf_path))
    doc.close()

    # Case A: OCR enabled, pytesseract mocked to extract text
    monkeypatch.setattr(settings, "ENABLE_OCR_FALLBACK", True)

    def mock_image_to_string(img):
        return "EXTRACTED TEXT VIA PYTESSERACT OCR"

    with patch("backend.services.ingestion_service.PYTESSERACT_AVAILABLE", True):
        with patch("backend.services.ingestion_service.pytesseract.get_tesseract_version", return_value="5.0.0"):
            with patch("backend.services.ingestion_service.pytesseract.image_to_string", side_effect=mock_image_to_string):
                res = extract_from_pdf(pdf_path)
                assert res.ocr_used is True
                assert "EXTRACTED TEXT VIA PYTESSERACT OCR" in res.full_text
                assert any("ocr" in fb for fb in res.fallbacks_used)

    # Case B: Tesseract binary unavailable
    with patch("backend.services.ingestion_service.PYTESSERACT_AVAILABLE", True):
        with patch("backend.services.ingestion_service.pytesseract.get_tesseract_version", side_effect=Exception("not found")):
            res2 = extract_from_pdf(pdf_path)
            assert "OCR (Tesseract) is not installed" in res2.warning
            assert res2.is_scanned_or_empty is True
