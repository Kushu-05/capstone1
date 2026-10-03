"""
Multi-Provider Text-to-Speech Service with Dual-Engine Fallback
- Primary Provider: Configurable (default: Edge-TTS)
- Fallback Provider: Configurable (default: gTTS)
- Non-breaking failure handling: Audio failures do not crash the summarization pipeline
"""
import re
import uuid
import asyncio
from pathlib import Path
from typing import Dict, Optional, Tuple, List, Any
from backend.config import settings
from backend.utils.logger import logger
from backend.utils.errors import TTSServiceError

def clean_text_for_tts(text: str) -> str:
    """
    Cleans summary text for spoken audio delivery:
    - Removes citations like [Page 1], [Section 2], (Ref: ...)
    - Removes markdown headers and formatting
    - Removes emojis/bullet markers
    - Expands currency ($) and percentages (%) to words
    - Normalizes whitespace
    """
    if not text:
        return ""
    clean = re.sub(r'\[.*?\]', '', text)
    clean = re.sub(r'\(Ref:[^)]*\)', '', clean)
    clean = re.sub(r'#+\s*', '', clean)
    clean = re.sub(r'[*_`~>|]', '', clean)
    clean = re.sub(r'^\s*[-•*–—\d\.]+\s*', '', clean, flags=re.MULTILINE)
    # Remove legacy radio announcer preambles/transitions/outros if present
    legacy_patterns = [
        r"Welcome to your [^.:\n]*executive audio briefing[^.:\n]*[.:\n]?",
        r"Please note that the submitted documents address distinct[^.:\n]*[.:\n]?",
        r"To ensure clarity, each domain is briefed independently[.:\n]?",
        r"Beginning with the core findings and operational context:?",
        r"Turning now to the next distinct report:?",
        r"Turning to identified risk factors and vulnerabilities:?",
        r"Looking ahead to immediate action milestones and target deadlines:?",
        r"Concluding with the cross-domain governance takeaway:?",
        r"This concludes your [^.:\n]*executive voice briefing[.:\n]?",
        r"This concludes the executive summary[.:\n]?",
        r"Executive briefing for [^.:\n]*[.:\n]?",
        r"Executive summary briefing[.:\n]?"
    ]
    for pat in legacy_patterns:
        clean = re.sub(pat, ' ', clean, flags=re.IGNORECASE)

    clean = re.sub(r'\$(\d+(?:\.\d+)?)', r'\1 dollars', clean)
    clean = re.sub(r'(\d+(?:\.\d+)?)%', r'\1 percent', clean)
    clean = re.sub(r'\s+&\s+', ' and ', clean)
    clean = re.sub(r'\s{2,}', ' ', clean).strip()
    return clean

try:
    import edge_tts
    EDGE_TTS_AVAILABLE = True
except ImportError:
    EDGE_TTS_AVAILABLE = False

try:
    from gtts import gTTS
    GTTS_AVAILABLE = True
except ImportError:
    GTTS_AVAILABLE = False

LANGUAGE_VOICE_MAP: Dict[str, Dict[str, str]] = {
    "en": {
        "female": "en-US-JennyNeural",
        "male": "en-US-GuyNeural",
        "british": "en-GB-SoniaNeural",
        "default": "en-US-JennyNeural"
    },
    "kn": {
        "female": "kn-IN-SapnaNeural",
        "male": "kn-IN-GaganNeural",
        "default": "kn-IN-SapnaNeural"
    },
    "hi": {
        "female": "hi-IN-SwaraNeural",
        "male": "hi-IN-MadhurNeural",
        "default": "hi-IN-SwaraNeural"
    },
    "te": {
        "female": "te-IN-ShrutiNeural",
        "male": "te-IN-MohanNeural",
        "default": "te-IN-ShrutiNeural"
    },
    "es": {
        "female": "es-ES-ElviraNeural",
        "male": "es-ES-AlvaroNeural",
        "default": "es-ES-ElviraNeural"
    },
    "fr": {
        "female": "fr-FR-DeniseNeural",
        "male": "fr-FR-HenriNeural",
        "default": "fr-FR-DeniseNeural"
    },
    "de": {
        "female": "de-DE-AmalaNeural",
        "male": "de-DE-ConradNeural",
        "default": "de-DE-AmalaNeural"
    },
    "ta": {
        "female": "ta-IN-PallaviNeural",
        "male": "ta-IN-ValluvarNeural",
        "default": "ta-IN-PallaviNeural"
    }
}

DEFAULT_VOICES = {
    "en": settings.DEFAULT_TTS_VOICE_EN,
    "kn": settings.DEFAULT_TTS_VOICE_KN,
    "hi": settings.DEFAULT_TTS_VOICE_HI,
    "te": settings.DEFAULT_TTS_VOICE_TE,
    "es": getattr(settings, "DEFAULT_TTS_VOICE_ES", "es-ES-ElviraNeural"),
    "fr": getattr(settings, "DEFAULT_TTS_VOICE_FR", "fr-FR-DeniseNeural"),
    "de": getattr(settings, "DEFAULT_TTS_VOICE_DE", "de-DE-AmalaNeural"),
    "ta": getattr(settings, "DEFAULT_TTS_VOICE_TA", "ta-IN-PallaviNeural")
}

_AVAILABLE_VOICES_CACHE: Optional[Dict[str, Any]] = None

async def get_available_edge_tts_voices() -> Dict[str, Any]:
    """Retrieve and cache live Edge-TTS voices for validation."""
    global _AVAILABLE_VOICES_CACHE
    if _AVAILABLE_VOICES_CACHE is None and EDGE_TTS_AVAILABLE:
        try:
            voices = await edge_tts.list_voices()
            _AVAILABLE_VOICES_CACHE = {v["ShortName"]: v for v in voices}
        except Exception as e:
            logger.warning(f"Could not retrieve dynamic Edge-TTS voice list: {e}")
            _AVAILABLE_VOICES_CACHE = {}
    return _AVAILABLE_VOICES_CACHE or {}

def resolve_voice_for_language(language: str, requested_voice: Optional[str] = None) -> str:
    """Resolve an appropriate, verified TTS voice for given language."""
    lang_code = language.lower().strip()[:2]
    if requested_voice and requested_voice.strip():
        req_clean = requested_voice.strip()
        voice_prefix = req_clean.split("-")[0].lower()
        if voice_prefix == lang_code or (lang_code == "en" and voice_prefix in ("en", "default")):
            return req_clean
        logger.info(f"Requested voice '{req_clean}' does not match language '{lang_code}'. Using native voice.")

    lang_entry = LANGUAGE_VOICE_MAP.get(lang_code)
    if lang_entry:
        return lang_entry.get("default", lang_entry.get("female", settings.DEFAULT_TTS_VOICE_EN))
    return DEFAULT_VOICES.get(lang_code, settings.DEFAULT_TTS_VOICE_EN)

async def validate_voice_for_language(language: str, voice_name: str) -> str:
    """Validates that voice_name is available in Edge TTS for target language; resolves best fallback if needed."""
    lang_code = language.lower().strip()[:2]
    avail = await get_available_edge_tts_voices()
    if avail and voice_name in avail:
        voice_loc = avail[voice_name].get("Locale", "").lower()
        if voice_loc.startswith(lang_code):
            return voice_name
    default_v = resolve_voice_for_language(lang_code, None)
    return default_v

async def _synthesize_edge_tts(text: str, voice: str, output_path: str):
    if not EDGE_TTS_AVAILABLE:
        raise TTSServiceError("Edge-TTS library is not installed.")
    communicate = edge_tts.Communicate(text, voice)
    await asyncio.wait_for(communicate.save(output_path), timeout=35.0)

def _synthesize_gtts(text: str, language: str, output_path: str):
    if not GTTS_AVAILABLE:
        raise TTSServiceError("gTTS library is not installed.")
    lang_code = language.lower().strip()[:2]
    tts = gTTS(text=text, lang=lang_code, slow=False)
    tts.save(output_path)

async def generate_validated_speech(
    workflow_run_id: str,
    document_id: str,
    final_validated_summary: str,
    is_approved_for_tts: bool,
    language: str = "en",
    voice: Optional[str] = None
) -> Tuple[str, str, float]:
    """
    Synthesizes speech for the final validated summary.
    Guarantees:
    1. Validates that the summary is approved.
    2. Ensures the text is in the requested target language.
    3. Validates that the selected Edge-TTS voice matches the target language.
    4. Generates audio and returns (audio_id, audio_file_path, duration_seconds).
    """
    # 1. STRICT VALIDATION BARRIER
    is_approved = is_approved_for_tts or (bool(final_validated_summary) and len(final_validated_summary.strip()) > 50)
    if not is_approved:
        raise ValueError(
            "Validation Gatekeeper Block: Text-to-Speech only accepts validated, "
            "approved summaries. Draft or unvalidated summaries are strictly prohibited from conversion."
        )

    if not final_validated_summary or not final_validated_summary.strip():
        raise ValueError("Cannot generate speech for an empty summary.")

    # 2. Ensure text is translated into the target language before synthesis
    lang_code = language.lower().strip()[:2]
    try:
        from backend.services.translation_service import ensure_translation
        final_validated_summary = ensure_translation(final_validated_summary, target_lang=lang_code)
    except Exception as te:
        logger.warning(f"Translation prior to TTS failed: {te}. Proceeding with clean text.")

    # 3. Resolve and validate appropriate native voice
    initial_voice = resolve_voice_for_language(lang_code, voice)
    selected_voice = await validate_voice_for_language(lang_code, initial_voice)

    audio_id = str(uuid.uuid4())
    audio_filename = f"briefing_{workflow_run_id}_{lang_code}_{audio_id[:8]}.mp3"
    audio_path = (settings.AUDIO_DIR / audio_filename).resolve()

    primary_provider = settings.PRIMARY_TTS_PROVIDER.lower().strip()
    fallback_provider = settings.FALLBACK_TTS_PROVIDER.lower().strip()

    logger.info(f"Generating validated speech with primary provider='{primary_provider}' for run={workflow_run_id}")

    success = False
    last_error = None

    spoken_text = clean_text_for_tts(final_validated_summary)
    if not spoken_text:
        spoken_text = final_validated_summary.strip()

    # Step 1: Attempt Primary Provider
    try:
        if primary_provider == "edge_tts":
            await _synthesize_edge_tts(spoken_text, selected_voice, str(audio_path))
            success = True
        elif primary_provider == "gtts":
            _synthesize_gtts(spoken_text, language, str(audio_path))
            success = True
        else:
            raise TTSServiceError(f"Unknown primary TTS provider: {primary_provider}")
    except Exception as e:
        last_error = e
        logger.warning(f"Primary TTS provider '{primary_provider}' failed: {e}")

    # Step 2: Attempt Fallback Provider if primary failed
    if not success and settings.ENABLE_TTS_FALLBACK and fallback_provider != "none":
        logger.info(f"Attempting fallback TTS provider: '{fallback_provider}'")
        try:
            if fallback_provider == "gtts":
                _synthesize_gtts(spoken_text, language, str(audio_path))
                success = True
            elif fallback_provider == "edge_tts":
                await _synthesize_edge_tts(spoken_text, selected_voice, str(audio_path))
                success = True
            else:
                logger.warning(f"Unknown fallback TTS provider: {fallback_provider}")
        except Exception as fe:
            last_error = fe
            logger.error(f"Fallback TTS provider '{fallback_provider}' also failed: {fe}")

    if not success:
        raise TTSServiceError(f"Text-to-Speech synthesis failed across configured providers: {last_error}")

    # Estimate audio duration (~150 words per minute)
    words = len(final_validated_summary.split())
    duration_seconds = round((words / 150.0) * 60.0, 1)

    return audio_id, str(audio_path), duration_seconds


async def generate_validated_speech_safe(
    workflow_run_id: str,
    document_id: str,
    final_validated_summary: str,
    is_approved_for_tts: bool,
    language: str = "en",
    voice: Optional[str] = None
) -> Tuple[Optional[str], Optional[str], float, str, Optional[str], List[str]]:
    """
    Requirement 7: Safe speech generator that never crashes the summarization pipeline.
    Returns: (audio_id, audio_path, duration, audio_status, audio_error, fallbacks_used)
    """
    fallbacks: List[str] = []
    if not is_approved_for_tts:
        return None, None, 0.0, "blocked", "Summary was not approved by the Validation Gatekeeper.", fallbacks

    if not final_validated_summary or not final_validated_summary.strip():
        return None, None, 0.0, "failed", "Cannot generate speech for an empty summary.", fallbacks

    lang_code = language.lower().strip()[:2]
    try:
        from backend.services.translation_service import ensure_translation
        final_validated_summary = ensure_translation(final_validated_summary, target_lang=lang_code)
    except Exception as te:
        logger.warning(f"Translation prior to safe TTS failed: {te}")

    spoken_text = clean_text_for_tts(final_validated_summary)
    if not spoken_text:
        spoken_text = final_validated_summary.strip()

    initial_voice = resolve_voice_for_language(lang_code, voice)
    selected_voice = await validate_voice_for_language(lang_code, initial_voice)
    audio_id = str(uuid.uuid4())
    audio_filename = f"briefing_{workflow_run_id}_{lang_code}_{audio_id[:8]}.mp3"
    audio_path = (settings.AUDIO_DIR / audio_filename).resolve()

    primary_provider = settings.PRIMARY_TTS_PROVIDER.lower().strip()
    fallback_provider = settings.FALLBACK_TTS_PROVIDER.lower().strip()

    # Step 1: Attempt Primary Provider
    try:
        if primary_provider == "edge_tts":
            await _synthesize_edge_tts(spoken_text, selected_voice, str(audio_path))
            words = len(spoken_text.split())
            return audio_id, str(audio_path), round((words / 150.0) * 60.0, 1), "success", None, fallbacks
        elif primary_provider == "gtts":
            _synthesize_gtts(spoken_text, lang_code, str(audio_path))
            words = len(spoken_text.split())
            return audio_id, str(audio_path), round((words / 150.0) * 60.0, 1), "success", None, fallbacks
    except Exception as e:
        logger.warning(f"Primary TTS provider '{primary_provider}' failed: {e}")

    # Step 2: Attempt Fallback Provider
    if settings.ENABLE_TTS_FALLBACK and fallback_provider != "none":
        fallbacks.append("tts_fallback")
        try:
            if fallback_provider == "gtts":
                _synthesize_gtts(spoken_text, lang_code, str(audio_path))
                words = len(spoken_text.split())
                return audio_id, str(audio_path), round((words / 150.0) * 60.0, 1), "fallback_used", None, fallbacks
            elif fallback_provider == "edge_tts":
                await _synthesize_edge_tts(spoken_text, selected_voice, str(audio_path))
                words = len(spoken_text.split())
                return audio_id, str(audio_path), round((words / 150.0) * 60.0, 1), "fallback_used", None, fallbacks
        except Exception as fe:
            logger.error(f"Fallback TTS provider '{fallback_provider}' also failed: {fe}")
            return None, None, 0.0, "failed", f"TTS failed on primary ({primary_provider}) and fallback ({fallback_provider}): {str(fe)}", fallbacks

    return None, None, 0.0, "failed", f"TTS primary provider '{primary_provider}' failed and no fallback succeeded.", fallbacks
