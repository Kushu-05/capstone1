import io
import re
import uuid
from pathlib import Path
from fastapi import HTTPException, UploadFile
from PIL import Image
from backend.config import settings
from backend.utils.logger import logger

PDF_MAGIC = b"%PDF"
DOCX_MAGIC = b"PK\x03\x04"

def sanitize_filename(filename: str) -> str:
    """Sanitize the uploaded filename to prevent directory traversal and invalid characters."""
    base_name = Path(filename).name
    # Strip dangerous characters
    cleaned = re.sub(r"[^\w\s\.-]", "", base_name).strip()
    if not cleaned:
        cleaned = f"document_{uuid.uuid4().hex[:8]}"
    return cleaned

def validate_file_type_and_size(filename: str, file_bytes: bytes) -> str:
    """
    Validate that the file has an allowed extension and valid header signature,
    and is within the size limit. Returns normalized extension ('pdf', 'docx', 'txt').
    """
    # 1. Size check
    max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
    if len(file_bytes) > max_bytes:
        raise HTTPException(
            status_code=400,
            detail=f"File exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_MB}MB."
        )

    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # 2. Extension check
    suffix = Path(filename).suffix.lower().lstrip(".")
    allowed = settings.allowed_extensions_list
    if suffix not in allowed:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '.{suffix}'. Supported: {', '.join(allowed)}"
        )

    # 3. Magic bytes / header check
    if suffix == "pdf":
        if not file_bytes.startswith(PDF_MAGIC):
            raise HTTPException(
                status_code=400,
                detail="Invalid PDF file format (corrupt or disguised file)."
            )
    elif suffix == "docx":
        if not file_bytes.startswith(DOCX_MAGIC):
            raise HTTPException(
                status_code=400,
                detail="Invalid DOCX file format (corrupt or disguised file)."
            )
    elif suffix == "txt":
        try:
            file_bytes[:4096].decode("utf-8")
        except UnicodeDecodeError:
            try:
                file_bytes[:4096].decode("latin-1")
            except Exception:
                raise HTTPException(
                    status_code=400,
                    detail="Text file is not valid UTF-8 or ASCII."
                )
    elif suffix in ["mp3", "wav", "m4a", "ogg"]:
        # Pre-recorded audio files allowed
        pass
    elif suffix in ["png", "jpg", "jpeg", "webp", "bmp", "tiff", "tif"]:
        try:
            with Image.open(io.BytesIO(file_bytes)) as img:
                img.verify()
        except Exception:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid image format for '.{suffix}' (corrupt or disguised image file)."
            )

    return suffix

def generate_secure_storage_path(original_filename: str) -> tuple[str, str, Path]:
    """
    Returns (document_id, stored_filename, full_path).
    Ensures safe location inside upload directory.
    """
    doc_id = str(uuid.uuid4())
    clean_name = sanitize_filename(original_filename)
    extension = Path(clean_name).suffix
    stored_filename = f"{doc_id}_{Path(clean_name).stem[:30]}{extension}"
    target_path = (settings.UPLOAD_DIR / stored_filename).resolve()

    # Guard against path traversal
    if not str(target_path).startswith(str(settings.UPLOAD_DIR.resolve())):
        raise HTTPException(status_code=400, detail="Unsafe file path detected.")

    return doc_id, stored_filename, target_path
