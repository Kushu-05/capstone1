import io
import re
from pathlib import Path
from typing import Dict, List, Any, Tuple, Optional
from fastapi import HTTPException
from backend.config import settings
from backend.utils.logger import logger

try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

try:
    import docx
except ImportError:
    docx = None

try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False

try:
    import pytesseract
    PYTESSERACT_AVAILABLE = True
except ImportError:
    PYTESSERACT_AVAILABLE = False

try:
    from rapidocr_onnxruntime import RapidOCR
    RAPIDOCR_AVAILABLE = True
    _rapidocr_engine = None
    def get_rapidocr():
        global _rapidocr_engine
        if _rapidocr_engine is None:
            _rapidocr_engine = RapidOCR()
        return _rapidocr_engine
except Exception:
    RAPIDOCR_AVAILABLE = False

try:
    from docling.document_converter import DocumentConverter
    DOCLING_AVAILABLE = True
    _docling_converter = None
    def get_docling_converter():
        global _docling_converter
        if _docling_converter is None:
            _docling_converter = DocumentConverter()
        return _docling_converter
except Exception:
    DOCLING_AVAILABLE = False

from backend.services.gemini_client import gemini_client


class IngestionResult:
    def __init__(
        self,
        full_text: str,
        pages: List[Dict[str, Any]],
        sections: List[Dict[str, Any]],
        page_count: int,
        word_count: int,
        char_count: int,
        is_scanned_or_empty: bool = False,
        warning: str = "",
        ocr_used: bool = False,
        fallbacks_used: Optional[List[str]] = None
    ):
        self.full_text = full_text
        self.pages = pages
        self.sections = sections
        self.page_count = page_count
        self.word_count = word_count
        self.char_count = char_count
        self.is_scanned_or_empty = is_scanned_or_empty
        self.warning = warning
        self.ocr_used = ocr_used
        self.fallbacks_used = fallbacks_used or []


def clean_text(text: str) -> str:
    """Normalize whitespace and strip unprintable characters."""
    if not text:
        return ""
    # Replace multiple blank lines with double newline
    text = re.sub(r"\r\n|\r", "\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def detect_sections_from_text(text: str, default_page: int = 1) -> List[Dict[str, Any]]:
    """Detect section headings from text based on headers and patterns."""
    sections = []
    lines = text.split("\n")
    current_title = "Introduction / Overview"
    current_content = []
    current_page = default_page
    order = 0

    section_pattern = re.compile(
        r"^(SECTION\s+\d+:?|CHAPTER\s+\d+:?|[0-9]+\.[0-9]*\s+[A-Z]|[A-Z\s]{4,}:|#{1,3}\s+)",
        re.IGNORECASE
    )

    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue

        # Check if line looks like a section header
        if (section_pattern.match(stripped) or (len(stripped) < 70 and stripped.isupper() and len(stripped) > 3)):
            if current_content:
                sections.append({
                    "title": current_title,
                    "page": current_page,
                    "content": "\n".join(current_content).strip(),
                    "order": order
                })
                order += 1
                current_content = []
            current_title = re.sub(r"^#{1,3}\s*", "", stripped).strip(" :")
        else:
            current_content.append(line)

    if current_content:
        sections.append({
            "title": current_title,
            "page": current_page,
            "content": "\n".join(current_content).strip(),
            "order": order
        })

    if not sections:
        sections.append({
            "title": "Main Content",
            "page": default_page,
            "content": text.strip(),
            "order": 0
        })

    return sections


def ocr_pil_image(img: Any) -> Tuple[str, str, str]:
    """
    Unified multi-tier OCR extractor:
    Tier 1: RapidOCR (Fast, local ONNX neural OCR, runs offline, zero cloud cost, no system binary required)
    Tier 2: Tesseract OCR (Local system binary if installed)
    Tier 3: Gemini Multimodal Vision API with multi-model fallback (gemini-3.1-flash-lite, 2.5-flash, 1.5-flash, 3.6-flash)
    Tier 4: OpenAI Vision API (if OPENAI_API_KEY is configured)
    Returns: (extracted_text, engine_name, info_or_warning)
    """
    if not PIL_AVAILABLE or img is None:
        return "", "none", "Pillow (PIL) is not available."

    try:
        rgb_img = img.convert("RGB")
    except Exception as conv_err:
        return "", "none", f"Failed to convert image to RGB: {conv_err}"

    # Tier 1: RapidOCR (Local ONNX Neural Engine - fastest, zero cloud cost, 100% offline)
    if RAPIDOCR_AVAILABLE and settings.ENABLE_OCR_FALLBACK:
        try:
            import numpy as np
            engine = get_rapidocr()
            res, _ = engine(np.array(rgb_img))
            if res:
                lines = [line[1] for line in res if line and len(line) > 1 and line[1]]
                ocr_text = clean_text("\n".join(lines))
                if len(ocr_text) >= 10:
                    return ocr_text, "rapidocr", "Extracted text using local RapidOCR neural engine."
        except Exception as r_err:
            logger.warning(f"RapidOCR engine failed: {r_err}")

    # Tier 2: Tesseract OCR (Local System Binary)
    if PYTESSERACT_AVAILABLE and settings.ENABLE_OCR_FALLBACK:
        try:
            pytesseract.get_tesseract_version()
            t_text = clean_text(pytesseract.image_to_string(rgb_img))
            if len(t_text) >= 10:
                return t_text, "tesseract_ocr", "Extracted text using local Tesseract OCR."
        except Exception as t_err:
            logger.debug(f"Local Tesseract OCR unavailable or failed: {t_err}")

    # Tier 3: Gemini Multimodal Vision API (with multi-model fallback)
    if gemini_client.is_configured:
        try:
            import io
            import google.generativeai as genai
            buf = io.BytesIO()
            rgb_img.save(buf, format="PNG")
            img_bytes = buf.getvalue()

            models_to_try = [
                settings.GEMINI_FALLBACK_MODEL,
                "gemini-3.1-flash-lite",
                "gemini-2.5-flash",
                "gemini-1.5-flash",
                settings.GEMINI_MODEL
            ]
            seen = set()
            unique_models = [m for m in models_to_try if m and not (m in seen or seen.add(m))]

            for m_name in unique_models:
                try:
                    vision_model = genai.GenerativeModel(model_name=m_name)
                    resp = vision_model.generate_content([
                        "Please transcribe all visible text, headings, bullet points, numbers, and tabular data in this image verbatim. "
                        "Preserve section titles, paragraph breaks, and lists clearly. Output only the transcribed text without commentary or preamble.",
                        {"mime_type": "image/png", "data": img_bytes}
                    ], request_options={"timeout": settings.LLM_TIMEOUT, "retry": None})
                    if resp and hasattr(resp, "text") and resp.text.strip():
                        gv_text = clean_text(resp.text.strip())
                        if len(gv_text) >= 10:
                            return gv_text, f"gemini_vision_{m_name}", f"Extracted text using Gemini Vision ({m_name})."
                except Exception as m_err:
                    logger.warning(f"Gemini Vision model '{m_name}' failed: {m_err}")
        except Exception as gv_err:
            logger.warning(f"Gemini Vision pipeline failed: {gv_err}")

    # Tier 4: OpenAI Vision API Fallback
    try:
        from backend.services.llm_service import llm_service
        if llm_service.openai_configured and llm_service.openai_client:
            import io
            import base64
            buf = io.BytesIO()
            rgb_img.save(buf, format="PNG")
            b64 = base64.b64encode(buf.getvalue()).decode("utf-8")
            resp = llm_service.openai_client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[{
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Please transcribe all visible text, headings, bullet points, numbers, and tabular data in this image verbatim without commentary."},
                        {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}}
                    ]
                }],
                max_tokens=2000,
                timeout=settings.LLM_TIMEOUT
            )
            oai_text = clean_text(resp.choices[0].message.content or "")
            if len(oai_text) >= 10:
                return oai_text, "openai_vision", "Extracted text using OpenAI Vision."
    except Exception as oai_err:
        logger.warning(f"OpenAI Vision failed: {oai_err}")

    return "", "none", "Image does not appear to contain readable text or OCR engines failed."


def extract_with_docling(file_path: Path) -> Optional[IngestionResult]:
    """
    Layout-aware document extraction using Docling.
    Preserves structural headers, paragraphs, markdown tables, lists, and hierarchical sections.
    Safely returns None if Docling is disabled, unavailable, or encounters an issue.
    """
    if not DOCLING_AVAILABLE or not getattr(settings, "ENABLE_DOCLING", True):
        return None

    try:
        logger.info(f"Attempting layout-aware extraction with Docling for: {file_path.name}")
        converter = get_docling_converter()
        conv_res = converter.convert(str(file_path))
        doc = conv_res.document

        # Export structured markdown (preserves tables as markdown, lists, and headings)
        md_text = doc.export_to_markdown()
        cleaned_md = clean_text(md_text)

        if not cleaned_md or len(cleaned_md) < 20:
            logger.info("Docling returned empty or minimal text, falling back to standard extraction.")
            return None

        # Build structured sections from headings & tables
        sections = detect_sections_from_text(cleaned_md, default_page=1)

        # Estimate pages from Docling document if available
        page_count = 1
        pages = []
        if hasattr(doc, "pages") and doc.pages:
            page_count = len(doc.pages)
            for p_num in range(1, page_count + 1):
                pages.append({"page_number": p_num, "text": f"Page {p_num} content from structured layout."})
        else:
            pages = [{"page_number": 1, "text": cleaned_md}]

        word_count = len(cleaned_md.split())
        char_count = len(cleaned_md)

        logger.info(f"Docling layout extraction succeeded ({char_count} chars, {len(sections)} sections, {page_count} pages).")
        return IngestionResult(
            full_text=cleaned_md,
            pages=pages,
            sections=sections,
            page_count=page_count,
            word_count=word_count,
            char_count=char_count,
            is_scanned_or_empty=False,
            warning="",
            ocr_used=False,
            fallbacks_used=["docling_layout_aware"]
        )
    except Exception as e:
        logger.warning(f"Docling layout extraction bypassed for '{file_path.name}': {e}. Falling back to standard pipeline.")
        return None


def extract_from_pdf(file_path: Path) -> IngestionResult:
    """
    Extract text, pages, and sections from a PDF document.
    Tier 1: Docling Layout-Aware Extractor (headings, markdown tables, sections).
    Tier 2: PyMuPDF structural extractor.
    Tier 3: Multi-tier OCR fallback for scanned or image-based PDFs (RapidOCR, Tesseract, Gemini Vision, OpenAI Vision).
    """
    # 1. Attempt Layout-Aware Docling Extraction first
    docling_res = extract_with_docling(file_path)
    if docling_res and not docling_res.is_scanned_or_empty:
        return docling_res

    # 2. PyMuPDF Standard Extractor Fallback
    if not fitz:
        raise HTTPException(status_code=500, detail="PyMuPDF (fitz) is not installed.")

    try:
        doc = fitz.open(str(file_path))
    except Exception as e:
        logger.error(f"Failed to open PDF: {e}")
        raise HTTPException(status_code=400, detail=f"Corrupt or unreadable PDF: {str(e)}")

    page_count = len(doc)
    pages = []
    sections = []
    full_text_parts = []
    order = 0

    for page_idx in range(page_count):
        page = doc[page_idx]
        page_num = page_idx + 1
        page_text = clean_text(page.get_text())

        pages.append({
            "page_number": page_num,
            "text": page_text
        })
        if page_text:
            full_text_parts.append(page_text)

        page_sections = detect_sections_from_text(page_text, default_page=page_num)
        for s in page_sections:
            s["order"] = order
            sections.append(s)
            order += 1

    full_text = clean_text("\n\n".join(full_text_parts))
    char_count = len(full_text)
    word_count = len(full_text.split()) if full_text else 0

    is_scanned = char_count < 30
    ocr_used = False
    fallbacks_used = []
    warning = ""

    # =========================================================================
    # Requirement 3: OCR Fallback for Scanned PDFs
    # =========================================================================
    if is_scanned:
        if settings.ENABLE_OCR_FALLBACK:
            logger.info(f"PDF contains little or no text ({char_count} chars). Attempting multi-tier OCR fallback.")
            ocr_text_parts = []
            engines_used = set()
            for page_idx in range(min(page_count, 15)):
                page = doc[page_idx]
                pix = page.get_pixmap(dpi=150)
                page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                page_text, eng, _ = ocr_pil_image(page_img)
                if page_text:
                    ocr_text_parts.append(page_text)
                    pages[page_idx]["text"] = page_text
                    engines_used.add(eng)

            if ocr_text_parts:
                full_text = clean_text("\n\n".join(ocr_text_parts))
                char_count = len(full_text)
                word_count = len(full_text.split()) if full_text else 0
                is_scanned = char_count < 30
                ocr_used = True
                for eng in engines_used:
                    fallbacks_used.append(eng)
                warning = f"Extracted text using OCR fallback ({', '.join(engines_used)})."
                sections = detect_sections_from_text(full_text, default_page=1)
            else:
                warning = "Document appears to be scanned or image-based, and OCR could not extract text."
        else:
            warning = "Document appears to be scanned or image-based, and OCR fallback is disabled."

    doc.close()

    return IngestionResult(
        full_text=full_text,
        pages=pages,
        sections=sections,
        page_count=page_count,
        word_count=word_count,
        char_count=char_count,
        is_scanned_or_empty=is_scanned,
        warning=warning,
        ocr_used=ocr_used,
        fallbacks_used=fallbacks_used
    )


def extract_from_docx(file_path: Path) -> IngestionResult:
    """
    Extract text and heading-based sections from a DOCX file.
    Tier 1: Docling Layout-Aware Extractor.
    Tier 2: python-docx structural extractor.
    """
    # 1. Attempt Layout-Aware Docling Extraction first
    docling_res = extract_with_docling(file_path)
    if docling_res and not docling_res.is_scanned_or_empty:
        return docling_res

    # 2. python-docx fallback
    if not docx:
        raise HTTPException(status_code=500, detail="python-docx is not installed.")

    try:
        doc = docx.Document(str(file_path))
    except Exception as e:
        logger.error(f"Failed to open DOCX: {e}")
        raise HTTPException(status_code=400, detail=f"Corrupt or unreadable DOCX: {str(e)}")

    sections = []
    full_text_parts = []
    current_title = "Document Overview"
    current_content = []
    order = 0

    for para in doc.paragraphs:
        p_text = clean_text(para.text)
        if not p_text:
            continue

        if para.style.name.startswith("Heading"):
            if current_content:
                sections.append({
                    "title": current_title,
                    "page": 1,
                    "content": "\n".join(current_content).strip(),
                    "order": order
                })
                order += 1
                current_content = []
            current_title = p_text
        else:
            current_content.append(p_text)
            full_text_parts.append(p_text)

    # Tables extraction
    for table in doc.tables:
        table_rows = []
        for row in table.rows:
            row_data = [cell.text.strip() for cell in row.cells if cell.text.strip()]
            if row_data:
                table_rows.append(" | ".join(row_data))
        if table_rows:
            table_text = "\n".join(table_rows)
            current_content.append(f"[Table]\n{table_text}")
            full_text_parts.append(table_text)

    if current_content:
        sections.append({
            "title": current_title,
            "page": 1,
            "content": "\n".join(current_content).strip(),
            "order": order
        })

    full_text = clean_text("\n\n".join(full_text_parts))
    char_count = len(full_text)
    word_count = len(full_text.split()) if full_text else 0
    is_empty = char_count < 10

    pages = [{"page_number": 1, "text": full_text}]

    return IngestionResult(
        full_text=full_text,
        pages=pages,
        sections=sections if sections else [{"title": "Main Content", "page": 1, "content": full_text, "order": 0}],
        page_count=1,
        word_count=word_count,
        char_count=char_count,
        is_scanned_or_empty=is_empty,
        warning="Document has very little text content." if is_empty else "",
        ocr_used=False,
        fallbacks_used=[]
    )


def extract_from_txt(file_path: Path) -> IngestionResult:
    """Extract text from TXT with encoding fallback and section detection."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            raw = f.read()
    except UnicodeDecodeError:
        with open(file_path, "r", encoding="latin-1") as f:
            raw = f.read()

    full_text = clean_text(raw)
    char_count = len(full_text)
    word_count = len(full_text.split()) if full_text else 0
    is_empty = char_count < 10

    sections = detect_sections_from_text(full_text, default_page=1)
    pages = [{"page_number": 1, "text": full_text}]

    return IngestionResult(
        full_text=full_text,
        pages=pages,
        sections=sections,
        page_count=1,
        word_count=word_count,
        char_count=char_count,
        is_scanned_or_empty=is_empty,
        warning="Text file is empty or contains no readable characters." if is_empty else "",
        ocr_used=False,
        fallbacks_used=[]
    )


def transcribe_audio_file(file_path: Path, language: str = "en") -> str:
    """
    Transcribe recorded audio file (.mp3, .wav, .m4a, .ogg, .flac) into text.
    Tier 1: OpenAI Whisper (if configured).
    Tier 2: SpeechRecognition (Google STT) with miniaudio PCM decoding (no key required!).
    Tier 3: Gemini Multimodal Audio (if configured).
    """
    from backend.services.llm_service import llm_service
    from backend.config import settings

    raw_text = ""

    # Tier 1: Try OpenAI Whisper if configured
    if llm_service.openai_configured and llm_service.openai_client:
        try:
            logger.info(f"Transcribing audio file '{file_path.name}' using OpenAI Whisper...")
            with open(file_path, "rb") as audio_file:
                transcription = llm_service.openai_client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file
                )
                raw_text = transcription.text.strip()
                if raw_text:
                    logger.info(f"OpenAI Whisper transcription succeeded ({len(raw_text)} chars).")
                    return raw_text
        except Exception as e:
            logger.warning(f"OpenAI Whisper transcription failed: {e}")

    # Tier 2: Free Google STT via SpeechRecognition + miniaudio decoding
    try:
        import io
        import wave
        import miniaudio
        import speech_recognition as sr

        lang_map = {
            "en": "en-US",
            "kn": "kn-IN",
            "hi": "hi-IN",
            "te": "te-IN",
            "ta": "ta-IN"
        }
        target_lang = lang_map.get(language.lower(), "en-US")

        decoded = miniaudio.decode_file(str(file_path))
        wav_buf = io.BytesIO()
        with wave.open(wav_buf, "wb") as wav_file:
            wav_file.setnchannels(decoded.nchannels)
            wav_file.setsampwidth(decoded.sample_width)
            wav_file.setframerate(decoded.sample_rate)
            wav_file.writeframes(decoded.samples)

        wav_buf.seek(0)
        r = sr.Recognizer()
        with sr.AudioFile(wav_buf) as source:
            audio = r.record(source)

        text = r.recognize_google(audio, language=target_lang)
        if text and len(text.strip()) > 0:
            logger.info(f"SpeechRecognition STT succeeded ({len(text)} chars).")
            return text.strip()
    except Exception as sr_err:
        logger.warning(f"SpeechRecognition STT failed: {sr_err}")

    # Tier 3: Gemini Multimodal Audio fallback
    if llm_service.gemini_configured:
        try:
            import google.generativeai as genai
            logger.info(f"Attempting Gemini Audio transcription for '{file_path.name}'...")
            with open(file_path, "rb") as af:
                audio_bytes = af.read()
            mime = "audio/mp3" if file_path.suffix.lower() == ".mp3" else "audio/wav"
            model = genai.GenerativeModel(model_name=settings.GEMINI_MODEL)
            resp = model.generate_content([
                "Please transcribe all spoken dialogue and speech in this audio file completely and accurately. Provide only the verbatim transcript without summarizing or commenting.",
                {"mime_type": mime, "data": audio_bytes}
            ])
            if resp and hasattr(resp, "text") and resp.text.strip():
                return resp.text.strip()
        except Exception as ge:
            logger.warning(f"Gemini Audio transcription failed: {ge}")

    if not raw_text:
        raise HTTPException(
            status_code=422,
            detail="Unable to transcribe speech from audio recording. Please verify the audio is clear and audible."
        )

    return raw_text


def extract_from_audio(file_path: Path) -> IngestionResult:
    """
    Extract spoken text from pre-recorded audio files (.mp3, .wav, .m4a, .ogg)
    using multi-tier STT engine.
    """
    raw_text = ""
    fallbacks_used = []
    warning = ""

    try:
        raw_text = transcribe_audio_file(file_path)
    except Exception as e:
        warning = f"Automatic transcription failed ({e}). Audio recording indexed."
        raw_text = (
            f"[Voice Audio Recording: {file_path.name}]\n"
            f"Voice recording file '{file_path.name}' has been uploaded and indexed. "
            f"To enable automatic speech transcription, ensure OPENAI_API_KEY (for Whisper) or Internet connectivity for STT is active."
        )
        fallbacks_used.append("offline_audio_placeholder")

    full_text = clean_text(raw_text)
    char_count = len(full_text)
    word_count = len(full_text.split()) if full_text else 0
    is_empty = char_count < 10

    # Auto-detect sections from transcript
    sections = detect_sections_from_text(full_text, default_page=1)
    if not sections:
        sections = [{"title": "Audio Transcript", "page": 1, "content": full_text, "order": 0}]

    pages = [{"page_number": 1, "text": full_text}]

    return IngestionResult(
        full_text=full_text,
        pages=pages,
        sections=sections,
        page_count=1,
        word_count=word_count,
        char_count=char_count,
        is_scanned_or_empty=is_empty,
        warning=warning,
        ocr_used=False,
        fallbacks_used=fallbacks_used
    )


def extract_from_image(file_path: Path) -> IngestionResult:
    """
    Extract text from standalone image files (.png, .jpg, .jpeg, .webp, .bmp, .tiff)
    using multi-tier OCR (RapidOCR local ONNX neural engine + Tesseract + Gemini Vision fallback + OpenAI Vision).
    """
    if not PIL_AVAILABLE:
        raise HTTPException(
            status_code=500,
            detail="Pillow (PIL) is required for image ingestion but is not installed."
        )

    # Open and prepare image
    try:
        pil_img = Image.open(file_path)
    except Exception as img_err:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to open or decode image file: {img_err}"
        )

    full_text, engine_used, engine_msg = ocr_pil_image(pil_img)
    ocr_used = engine_used != "none" and len(full_text) >= 10
    fallbacks_used = [engine_used] if ocr_used else []
    warning = ""
    if not ocr_used:
        warning = "Image does not appear to contain readable text or OCR engines failed."
    elif "failed" in engine_msg.lower():
        warning = engine_msg

    char_count = len(full_text)
    word_count = len(full_text.split()) if full_text else 0
    is_empty = char_count < 10

    # Detect sections from extracted text
    sections = detect_sections_from_text(full_text, default_page=1)
    if not sections or (len(sections) == 1 and (sections[0].get("title") in ["General", "Introduction / Overview"] and not sections[0].get("content"))):
        doc_title = Path(file_path).stem.replace("_", " ").title()
        sections = [{
            "title": f"Image Content: {doc_title}",
            "page": 1,
            "content": full_text,
            "order": 1
        }]

    pages = [{"page_number": 1, "text": full_text}]

    return IngestionResult(
        full_text=full_text,
        pages=pages,
        sections=sections,
        page_count=1,
        word_count=word_count,
        char_count=char_count,
        is_scanned_or_empty=is_empty,
        warning=warning,
        ocr_used=ocr_used,
        fallbacks_used=fallbacks_used
    )


def process_document_file(file_path: Path, file_type: str) -> IngestionResult:
    """Unified entry point for document ingestion (PDF, DOCX, TXT, Images, Audio)."""
    ft = file_type.lower().lstrip(".")
    if ft == "pdf":
        return extract_from_pdf(file_path)
    elif ft == "docx":
        return extract_from_docx(file_path)
    elif ft == "txt":
        return extract_from_txt(file_path)
    elif ft in ["png", "jpg", "jpeg", "webp", "bmp", "tiff", "tif"]:
        return extract_from_image(file_path)
    elif ft in ["mp3", "wav", "m4a", "ogg"]:
        return extract_from_audio(file_path)
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {file_type}")
