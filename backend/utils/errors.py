"""
Custom Exception Hierarchy and Error Handling Utilities
Distinguishes recoverable errors (which trigger configured fallbacks)
from non-recoverable errors (which halt execution and inform the user).
"""
import re
from typing import Optional

class AppException(Exception):
    """Base application exception."""
    def __init__(self, message: str, technical_details: Optional[str] = None):
        super().__init__(message)
        self.message = message
        self.technical_details = technical_details

class RecoverableError(AppException):
    """
    Recoverable errors that warrant attempting a configured fallback
    (e.g., secondary model, alternative provider, or deterministic method).
    """
    pass

class LLMTimeoutError(RecoverableError):
    """Raised when an LLM provider request times out."""
    pass

class LLMRateLimitError(RecoverableError):
    """Raised when an LLM provider returns a 429 / rate limit or quota exceeded."""
    pass

class LLMServiceUnavailableError(RecoverableError):
    """Raised when an LLM provider returns a 502 / 503 / temporary server error."""
    pass

class MalformedJSONError(RecoverableError):
    """Raised when LLM returns content that fails strict and repaired JSON parsing."""
    pass

class TTSServiceError(RecoverableError):
    """Raised when a TTS provider experiences a temporary failure."""
    pass

class NonRecoverableError(AppException):
    """
    Non-recoverable errors that should halt the specific operation
    and return a clean, actionable message to the user.
    """
    pass

class InvalidDocumentFormatError(NonRecoverableError):
    """Raised when an uploaded document has an invalid or corrupted file format."""
    pass

class DocumentEmptyError(NonRecoverableError):
    """Raised when an uploaded document contains no readable text."""
    pass

class ScannedPDFWithoutOCRError(NonRecoverableError):
    """Raised when a PDF contains no text and OCR is not configured."""
    pass

class AuthenticationConfigError(NonRecoverableError):
    """Raised when required credentials are missing and no fallback provider is configured."""
    pass

def sanitize_log_message(msg: str) -> str:
    """
    Strips potential API keys, bearer tokens, or secrets from log messages.
    """
    if not msg:
        return ""
    # Mask OpenAI-style keys (sk-...)
    msg = re.sub(r'sk-[a-zA-Z0-9_\-]{20,}', 'sk-***[REDACTED]***', msg)
    # Mask Gemini-style keys (AIza...)
    msg = re.sub(r'AIza[a-zA-Z0-9_\-]{20,}', 'AIza***[REDACTED]***', msg)
    # Mask generic Bearer tokens
    msg = re.sub(r'Bearer\s+[a-zA-Z0-9_\-\.]{20,}', 'Bearer ***[REDACTED]***', msg)
    return msg
