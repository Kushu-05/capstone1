import pytest
from pathlib import Path
from backend.services.ingestion_service import (
    extract_from_pdf,
    extract_from_docx,
    extract_from_txt,
    process_document_file,
    clean_text
)

def test_clean_text():
    dirty = "Line 1 \r\n\r\n\r\n  Line 2   \t  Line 3  \n\n\n\n Line 4"
    cleaned = clean_text(dirty)
    assert "\r" not in cleaned
    assert "\n\n\n" not in cleaned
    assert "Line 1" in cleaned

def test_extract_txt(sample_txt_file: Path):
    result = extract_from_txt(sample_txt_file)
    assert result.page_count == 1
    assert result.word_count > 10
    assert len(result.sections) >= 3
    assert not result.is_scanned_or_empty
    assert "research expenditures" in result.full_text

def test_extract_pdf(sample_pdf_file: Path):
    result = extract_from_pdf(sample_pdf_file)
    assert result.page_count >= 1
    assert result.word_count > 10
    assert len(result.sections) >= 2
    assert "federal grant initiative" in result.full_text.lower()
    assert not result.is_scanned_or_empty

def test_extract_docx(sample_docx_file: Path):
    result = extract_from_docx(sample_docx_file)
    assert result.page_count >= 1
    assert result.word_count > 10
    assert len(result.sections) >= 2
    assert "cyber defense protocols" in result.full_text
    assert not result.is_scanned_or_empty

def test_process_document_unified(sample_txt_file: Path, sample_pdf_file: Path, sample_docx_file: Path):
    res_txt = process_document_file(sample_txt_file, "txt")
    res_pdf = process_document_file(sample_pdf_file, "pdf")
    res_docx = process_document_file(sample_docx_file, "docx")

    assert res_txt.word_count > 0
    assert res_pdf.word_count > 0
    assert res_docx.word_count > 0

def test_extract_audio(tmp_path: Path):
    from unittest.mock import MagicMock
    from backend.services.ingestion_service import extract_from_audio
    from backend.services.llm_service import llm_service

    fake_audio = tmp_path / "voice_note.mp3"
    fake_audio.write_bytes(b"ID3_FAKE_MP3_CONTENT")

    mock_client = MagicMock()
    mock_resp = MagicMock()
    mock_resp.text = "In this meeting, we decided to launch project Phoenix by Q3 2025. Budget is approved."
    mock_client.audio.transcriptions.create.return_value = mock_resp

    orig_client = llm_service.openai_client
    orig_configured = llm_service.openai_configured
    try:
        llm_service.openai_client = mock_client
        llm_service.openai_configured = True

        res = extract_from_audio(fake_audio)
        assert res.word_count > 5
        assert "project Phoenix" in res.full_text
        assert len(res.sections) >= 1
        assert not res.is_scanned_or_empty
    finally:
        llm_service.openai_client = orig_client
        llm_service.openai_configured = orig_configured


def test_extract_image_gemini_vision(tmp_path: Path):
    from PIL import Image
    from unittest.mock import MagicMock, PropertyMock, patch
    from backend.services.ingestion_service import extract_from_image, process_document_file
    from backend.services.gemini_client import GeminiClient

    img_path = tmp_path / "sample_chart.png"
    img = Image.new("RGB", (200, 100), color=(255, 255, 255))
    img.save(img_path)

    mock_resp = MagicMock()
    mock_resp.text = "SECTION 1: FINANCIAL OVERVIEW\nTotal Q4 revenue reached $42 million with 18% YoY growth."

    mock_model = MagicMock()
    mock_model.generate_content.return_value = mock_resp

    with patch("backend.services.ingestion_service.PYTESSERACT_AVAILABLE", False):
        with patch.object(GeminiClient, "is_configured", new_callable=PropertyMock, return_value=True):
            with patch("google.generativeai.GenerativeModel", return_value=mock_model):
                res = process_document_file(img_path, "png")
                assert res.ocr_used is True
                assert "gemini_vision_ocr" in res.fallbacks_used
                assert "Total Q4 revenue reached $42 million" in res.full_text
                assert len(res.sections) >= 1
                assert res.page_count == 1
                assert not res.is_scanned_or_empty


def test_image_file_security_validation():
    import io
    from PIL import Image
    from fastapi import HTTPException
    from backend.utils.file_security import validate_file_type_and_size

    # Valid PNG
    buf = io.BytesIO()
    Image.new("RGB", (50, 50), color=(0, 128, 255)).save(buf, format="PNG")
    valid_png_bytes = buf.getvalue()

    detected_ext = validate_file_type_and_size("receipt.png", valid_png_bytes)
    assert detected_ext == "png"

    # Valid JPEG
    buf_jpg = io.BytesIO()
    Image.new("RGB", (50, 50), color=(255, 255, 0)).save(buf_jpg, format="JPEG")
    valid_jpg_bytes = buf_jpg.getvalue()

    detected_jpg = validate_file_type_and_size("scan.jpg", valid_jpg_bytes)
    assert detected_jpg == "jpg"

    # Corrupt disguised file
    corrupt_bytes = b"NOT_A_REAL_IMAGE_DATA_12345"
    with pytest.raises(HTTPException) as exc_info:
        validate_file_type_and_size("fake.png", corrupt_bytes)
    assert exc_info.value.status_code == 400
    assert "Invalid image format" in exc_info.value.detail
