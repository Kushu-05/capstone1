"""
Unified Storage Service with S3-Compatible Object Storage & Local Filesystem Default.
Supports:
- Local filesystem (Default, zero setup required, 100% offline)
- AWS S3 / MinIO / S3-compatible APIs via boto3
- Transparent local caching for fast, in-memory/disk downstream processing (PyMuPDF, python-docx, OCR, TTS)
- Presigned URL generation for remote clients
"""
import os
from pathlib import Path
from typing import Tuple, Optional, Union
from backend.config import settings
from backend.utils.logger import logger
from backend.utils.file_security import generate_secure_storage_path

try:
    import boto3
    from botocore.exceptions import ClientError, BotoCoreError
    BOTO3_AVAILABLE = True
except ImportError:
    BOTO3_AVAILABLE = False


class StorageService:
    def __init__(self):
        self.provider = (settings.STORAGE_PROVIDER or "local").lower().strip()
        self.s3_client = None
        self.bucket_name = settings.S3_BUCKET_NAME
        self.is_s3_enabled = False

        # Ensure local directories exist regardless of provider
        settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        settings.AUDIO_DIR.mkdir(parents=True, exist_ok=True)

        if self.provider == "s3":
            if not BOTO3_AVAILABLE:
                logger.warning("STORAGE_PROVIDER='s3' is configured but 'boto3' is not installed. Defaulting to local storage.")
                self.provider = "local"
            else:
                try:
                    s3_kwargs = {
                        "service_name": "s3",
                        "region_name": settings.S3_REGION_NAME or "us-east-1"
                    }
                    if settings.S3_ENDPOINT_URL:
                        s3_kwargs["endpoint_url"] = settings.S3_ENDPOINT_URL
                    if settings.S3_ACCESS_KEY_ID and settings.S3_SECRET_ACCESS_KEY:
                        s3_kwargs["aws_access_key_id"] = settings.S3_ACCESS_KEY_ID
                        s3_kwargs["aws_secret_access_key"] = settings.S3_SECRET_ACCESS_KEY

                    self.s3_client = boto3.client(**s3_kwargs)
                    self.is_s3_enabled = True
                    logger.info(f"S3 Storage Client initialized (Endpoint: {settings.S3_ENDPOINT_URL or 'AWS S3'}, Bucket: {self.bucket_name})")
                except Exception as e:
                    logger.warning(f"Failed to initialize S3 client: {e}. Falling back to local storage.")
                    self.provider = "local"
                    self.is_s3_enabled = False
        else:
            logger.info("StorageService running in 'local' filesystem mode (default).")

    def save_upload_file(self, original_filename: str, file_bytes: bytes) -> Tuple[str, str, Path]:
        """
        Saves an uploaded document safely:
        1. Generates sanitized filename and secure local path
        2. Writes bytes to local storage (for PyMuPDF/Docling processing)
        3. If S3 enabled, uploads to S3 bucket under 'uploads/' prefix
        Returns: (doc_id, stored_filename, local_file_path)
        """
        doc_id, stored_filename, file_path = generate_secure_storage_path(original_filename)

        # 1. Local filesystem persistence (ensures zero latency for ingestion tools)
        with open(file_path, "wb") as f:
            f.write(file_bytes)

        # 2. S3-compatible cloud/object persistence
        if self.is_s3_enabled and self.s3_client and self.bucket_name:
            s3_key = f"uploads/{stored_filename}"
            try:
                self.s3_client.put_object(
                    Bucket=self.bucket_name,
                    Key=s3_key,
                    Body=file_bytes,
                    Metadata={"original_name": original_filename, "doc_id": doc_id}
                )
                logger.info(f"File uploaded to S3: s3://{self.bucket_name}/{s3_key}")
            except Exception as e:
                logger.error(f"Failed to upload file to S3 ({s3_key}): {e}. File remains safe in local storage.")

        return doc_id, stored_filename, file_path

    def save_audio_file(self, filename: str, file_bytes: bytes) -> Path:
        """
        Saves a generated audio file (.mp3) locally and syncs to S3 if configured.
        """
        local_path = (settings.AUDIO_DIR / filename).resolve()
        with open(local_path, "wb") as f:
            f.write(file_bytes)

        if self.is_s3_enabled and self.s3_client and self.bucket_name:
            s3_key = f"audio/{filename}"
            try:
                self.s3_client.put_object(
                    Bucket=self.bucket_name,
                    Key=s3_key,
                    Body=file_bytes,
                    ContentType="audio/mpeg"
                )
                logger.info(f"Audio synced to S3: s3://{self.bucket_name}/{s3_key}")
            except Exception as e:
                logger.warning(f"Failed to sync audio to S3: {e}")

        return local_path

    def get_file_path(self, stored_filename: str, subfolder: str = "uploads") -> Optional[Path]:
        """
        Resolves the local Path for a file.
        If missing locally but present in S3, downloads to local cache before returning.
        """
        base_dir = settings.UPLOAD_DIR if subfolder == "uploads" else settings.AUDIO_DIR
        local_path = (base_dir / stored_filename).resolve()

        if local_path.exists():
            return local_path

        # If missing locally, try downloading from S3
        if self.is_s3_enabled and self.s3_client and self.bucket_name:
            s3_key = f"{subfolder}/{stored_filename}"
            try:
                logger.info(f"Local file missing. Downloading from S3: s3://{self.bucket_name}/{s3_key}")
                self.s3_client.download_file(self.bucket_name, s3_key, str(local_path))
                if local_path.exists():
                    return local_path
            except Exception as e:
                logger.warning(f"Could not retrieve '{s3_key}' from S3: {e}")

        return None

    def get_presigned_url(self, stored_filename: str, subfolder: str = "uploads", expires_in: int = 3600) -> Optional[str]:
        """
        Generates a presigned GET URL for direct client access if S3 is enabled.
        """
        if not self.is_s3_enabled or not self.s3_client or not self.bucket_name:
            return None

        s3_key = f"{subfolder}/{stored_filename}"
        try:
            url = self.s3_client.generate_presigned_url(
                "get_object",
                Params={"Bucket": self.bucket_name, "Key": s3_key},
                ExpiresIn=expires_in
            )
            return url
        except Exception as e:
            logger.warning(f"Could not generate presigned URL for {s3_key}: {e}")
            return None

    def delete_file(self, stored_filename: str, subfolder: str = "uploads") -> bool:
        """
        Deletes file from both S3 and local storage.
        """
        success = True
        base_dir = settings.UPLOAD_DIR if subfolder == "uploads" else settings.AUDIO_DIR
        local_path = base_dir / stored_filename

        # Remove local
        if local_path.exists():
            try:
                local_path.unlink()
            except Exception as e:
                logger.warning(f"Failed to delete local file {local_path}: {e}")
                success = False

        # Remove S3
        if self.is_s3_enabled and self.s3_client and self.bucket_name:
            s3_key = f"{subfolder}/{stored_filename}"
            try:
                self.s3_client.delete_object(Bucket=self.bucket_name, Key=s3_key)
                logger.info(f"Deleted from S3: s3://{self.bucket_name}/{s3_key}")
            except Exception as e:
                logger.warning(f"Failed to delete {s3_key} from S3: {e}")
                success = False

        return success


# Global singleton
storage_service = StorageService()
