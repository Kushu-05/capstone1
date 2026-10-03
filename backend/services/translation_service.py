from typing import Optional, List, Dict
import urllib.request
import urllib.parse
import json
import hashlib
from backend.utils.logger import logger

try:
    from deep_translator import MyMemoryTranslator, GoogleTranslator
    TRANSLATOR_AVAILABLE = True
except ImportError:
    TRANSLATOR_AVAILABLE = False

LANGUAGE_MAP: Dict[str, Dict[str, str]] = {
    "en": {"code": "en", "mymemory": "en-GB", "name": "English"},
    "kn": {"code": "kn", "mymemory": "kn-IN", "name": "Kannada"},
    "hi": {"code": "hi", "mymemory": "hi-IN", "name": "Hindi"},
    "te": {"code": "te", "mymemory": "te-IN", "name": "Telugu"},
    "ta": {"code": "ta", "mymemory": "ta-IN", "name": "Tamil"},
    "es": {"code": "es", "mymemory": "es-ES", "name": "Spanish"},
    "fr": {"code": "fr", "mymemory": "fr-FR", "name": "French"},
    "de": {"code": "de", "mymemory": "de-DE", "name": "German"},
}

SCRIPT_RANGES = {
    "hi": (0x0900, 0x097F),  # Devanagari
    "te": (0x0C00, 0x0C7F),  # Telugu
    "kn": (0x0C80, 0x0CFF),  # Kannada
    "ta": (0x0B80, 0x0BFF),  # Tamil
}

def normalize_lang_code(lang: Optional[str]) -> str:
    """Normalize language string to 2-letter standard code."""
    if not lang:
        return "en"
    clean = lang.lower().strip()
    if len(clean) >= 2:
        code = clean[:2]
        if code in LANGUAGE_MAP:
            return code
    # Check by name
    for k, v in LANGUAGE_MAP.items():
        if v["name"].lower() == clean:
            return k
    return "en"

def detect_script_language(text: str) -> str:
    """Detect whether text is predominantly English, Hindi, Kannada, Telugu, or Tamil."""
    if not text or not text.strip():
        return "en"
    counts = {
        "kn": 0,
        "hi": 0,
        "te": 0,
        "ta": 0,
        "en": 0
    }
    for ch in text:
        code = ord(ch)
        if 0x0C80 <= code <= 0x0CFF:
            counts["kn"] += 1
        elif 0x0900 <= code <= 0x097F:
            counts["hi"] += 1
        elif 0x0C00 <= code <= 0x0C7F:
            counts["te"] += 1
        elif 0x0B80 <= code <= 0x0BFF:
            counts["ta"] += 1
        elif ('a' <= ch <= 'z') or ('A' <= ch <= 'Z'):
            counts["en"] += 1

    dominant = max(counts, key=counts.get)
    if counts[dominant] >= 3:
        return dominant
    return "en"

def is_in_target_script(text: str, target_code: str) -> bool:
    """Check if text contains characters from the target script."""
    if not text or not text.strip():
        return False
    target_code = normalize_lang_code(target_code)

    if target_code in SCRIPT_RANGES:
        start, end = SCRIPT_RANGES[target_code]
        return any(start <= ord(ch) <= end for ch in text)

    if target_code == "en":
        has_latin = any(('a' <= ch <= 'z') or ('A' <= ch <= 'Z') for ch in text)
        indic_chars = sum(
            1 for ch in text
            if any(s <= ord(ch) <= e for s, e in SCRIPT_RANGES.values())
        )
        return has_latin and indic_chars < 10

    return bool(text and text.strip())

_TRANSLATION_CACHE: Dict[str, str] = {}

def _make_cache_key(source_code: str, target_code: str, text: str) -> str:
    digest = hashlib.md5(text.encode("utf-8")).hexdigest()
    return f"{source_code}:{target_code}:{digest}"

def _call_gtx_single(chunk: str, target_code: str, source_code: str = "auto") -> Optional[str]:
    """Execute single Google GTX API request."""
    try:
        encoded = urllib.parse.quote(chunk)
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl={source_code}&tl={target_code}&dt=t&q={encoded}"
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data and data[0]:
                translated = "".join(part[0] for part in data[0] if part and part[0])
                if translated and translated.strip():
                    return translated.strip()
    except Exception as e:
        logger.debug(f"GTX translation call failed: {e}")
    return None

def _translate_via_gtx(text: str, target_code: str, source_code: str = "auto") -> Optional[str]:
    """Primary Engine: Direct Google Client API (Fast, multi-sentence, highly reliable)."""
    if not text or not text.strip():
        return text

    paragraphs = text.split("\n\n")
    translated_paras = []

    for para in paragraphs:
        if not para.strip():
            translated_paras.append("")
            continue

        if len(para) > 1200:
            lines = para.split("\n")
            sub_translated = []
            for line in lines:
                if not line.strip():
                    sub_translated.append("")
                    continue
                sub_res = _call_gtx_single(line.strip(), target_code, source_code)
                sub_translated.append(sub_res if sub_res else line)
            translated_paras.append("\n".join(sub_translated))
        else:
            res = _call_gtx_single(para.strip(), target_code, source_code)
            if res:
                translated_paras.append(res)
            else:
                return None  # signal fallback

    full_result = "\n\n".join(translated_paras)
    if full_result and (target_code == "en" or is_in_target_script(full_result, target_code)):
        return full_result
    return None

def _translate_via_mymemory(text: str, target_code: str, source_code: str = "en") -> Optional[str]:
    """Secondary Engine: MyMemoryTranslator with sub-chunking."""
    if not TRANSLATOR_AVAILABLE:
        return None
    try:
        target_info = LANGUAGE_MAP.get(target_code, {})
        source_info = LANGUAGE_MAP.get(source_code, {})
        mymemory_target = target_info.get("mymemory", f"{target_code}-IN")
        mymemory_source = source_info.get("mymemory", "en-GB")

        lines = text.split("\n")
        translated_lines = []
        for line in lines:
            if not line.strip():
                translated_lines.append("")
                continue
            line_clean = line.strip()
            if len(line_clean) > 450:
                line_clean = line_clean[:450]
            res = MyMemoryTranslator(source=mymemory_source, target=mymemory_target).translate(line_clean)
            if res and not res.startswith("MYMEMORY WARNING"):
                translated_lines.append(res)
            else:
                translated_lines.append(line)
        result = "\n".join(translated_lines)
        if is_in_target_script(result, target_code):
            return result
    except Exception as e:
        logger.debug(f"MyMemory translation failed: {e}")
    return None

def _translate_via_llm(text: str, target_code: str, source_code: str = "en") -> Optional[str]:
    """Tertiary Engine: Cloud Gemini LLM (Only when explicitly configured with API key, never Ollama CPU)."""
    try:
        from backend.config import settings
        if settings.LLM_PROVIDER != "gemini" or not settings.GEMINI_API_KEY:
            return None

        from backend.services.gemini_client import gemini_client
        if not gemini_client.is_configured:
            return None

        target_info = LANGUAGE_MAP.get(target_code, {})
        target_name = target_info.get("name", target_code)
        source_info = LANGUAGE_MAP.get(source_code, {})
        source_name = source_info.get("name", source_code)

        prompt = (
            f"Translate the following text from {source_name} ({source_code}) into {target_name} ({target_code}).\n"
            f"Guidelines:\n"
            f"- Output ONLY the {target_name} translation.\n"
            f"- Preserve line breaks, bullet points, numbers, and layout.\n"
            f"- Do NOT add introductory or explanatory remarks.\n\n"
            f"Text:\n{text}"
        )
        res = gemini_client.generate_json_or_text(
            prompt,
            system_instruction=f"You are a professional {target_name} translator.",
            as_json=False
        )
        if res and isinstance(res, str):
            cleaned = res.strip().strip('"\'')
            if is_in_target_script(cleaned, target_code):
                return cleaned
    except Exception as e:
        logger.debug(f"LLM translation failed: {e}")
    return None

def translate_text(text: str, target_lang: str, source_lang: Optional[str] = None) -> str:
    """
    Translates text from source language to target language.
    Uses resilient multi-engine strategy:
    1. Direct Google Client API (Fast, multi-sentence, zero-key)
    2. MyMemoryTranslator (sentence-by-sentence)
    3. Deep-Translator GoogleTranslator
    4. Cloud Gemini LLM (if configured)
    """
    if not text or not text.strip():
        return text

    target_code = normalize_lang_code(target_lang)
    source_code = normalize_lang_code(source_lang) if source_lang else detect_script_language(text)

    if target_code == source_code:
        return text

    cache_key = _make_cache_key(source_code, target_code, text)
    if cache_key in _TRANSLATION_CACHE:
        return _TRANSLATION_CACHE[cache_key]

    # 1. Primary Engine: Direct Google Client API
    res = _translate_via_gtx(text, target_code, source_code)
    if res:
        _TRANSLATION_CACHE[cache_key] = res
        return res

    # 2. Secondary Engine: MyMemoryTranslator
    res = _translate_via_mymemory(text, target_code, source_code)
    if res:
        _TRANSLATION_CACHE[cache_key] = res
        return res

    # 3. Tertiary Engine: Deep-Translator Google
    if TRANSLATOR_AVAILABLE:
        try:
            gt_res = GoogleTranslator(source="auto", target=target_code).translate(text[:2000])
            if gt_res and is_in_target_script(gt_res, target_code):
                _TRANSLATION_CACHE[cache_key] = gt_res
                return gt_res
        except Exception:
            pass

    # 4. Quaternary Engine: Cloud Gemini LLM (if configured)
    res = _translate_via_llm(text, target_code, source_code)
    if res:
        _TRANSLATION_CACHE[cache_key] = res
        return res

    # Fallback to original text if all engines fail
    return text

def ensure_translation(text: str, target_lang: str, source_lang: Optional[str] = None) -> str:
    """Ensures text is translated into the target language, applying translation fallback if needed."""
    if not text or not text.strip():
        return text
    target_code = normalize_lang_code(target_lang)
    source_code = normalize_lang_code(source_lang) if source_lang else detect_script_language(text)

    # If target is Indian script and text already contains it
    if target_code in ("hi", "te", "kn", "ta") and is_in_target_script(text, target_code):
        return text

    # If target is English and text has no Indian script characters
    if target_code == "en" and source_code == "en" and is_in_target_script(text, "en"):
        return text

    return translate_text(text, target_lang=target_code, source_lang=source_code)

def translate_batch(items: List[str], target_lang: str, source_lang: Optional[str] = None) -> List[str]:
    """Translate a list of bullet points or findings."""
    return [translate_text(item, target_lang, source_lang) for item in items]
