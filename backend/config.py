import os
from pathlib import Path
from typing import Union, List
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Powered Document Summarization & Voice Generation"
    PROJECT_VERSION: str = "2.0.0"

    # ==========================================
    # 1. LLM Provider & Model Fallback Settings
    # ==========================================
    LLM_PROVIDER: str = "gemini"                # Primary: "gemini" or "openai"
    FALLBACK_LLM_PROVIDER: str = "ollama"       # Fallback: "ollama", "openai", "gemini", or "none"

    # OpenAI Configuration
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    OPENAI_FALLBACK_MODEL: str = "gpt-3.5-turbo"

    # Gemini Configuration
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-3.6-flash"
    GEMINI_FALLBACK_MODEL: str = "gemini-3.1-flash-lite"

    # Ollama Local LLM Configuration (Local Fallback)
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "qwen2.5:3b"
    OLLAMA_TIMEOUT: int = 30

    # Retry and Timeout Limits
    MAX_RETRIES: int = 1
    LLM_TIMEOUT: int = 15

    # ==========================================
    # 2. Server Configuration
    # ==========================================
    BACKEND_HOST: str = "127.0.0.1"
    BACKEND_PORT: int = 8000
    FRONTEND_PORT: int = 5173
    BACKEND_API_URL: str = "http://127.0.0.1:8000"

    # ==========================================
    # 3. Storage Paths & Object Storage
    # ==========================================
    DATABASE_URL: str = f"sqlite:///{BASE_DIR / 'data' / 'app.db'}"
    UPLOAD_DIR: Path = BASE_DIR / "data" / "uploads"
    AUDIO_DIR: Path = BASE_DIR / "data" / "audio"
    GOVREPORT_DIR: Path = BASE_DIR / "data" / "govreport_samples"
    CHROMA_PERSIST_DIRECTORY: Path = BASE_DIR / "data" / "chroma_db"
    CHROMA_COLLECTION_NAME: str = "document_chunks"

    # S3 Object Storage Configuration
    STORAGE_PROVIDER: str = "local"             # "local" or "s3"
    S3_ENDPOINT_URL: Union[str, None] = None    # e.g. "http://localhost:9000" for MinIO or None for AWS S3
    S3_ACCESS_KEY_ID: str = ""
    S3_SECRET_ACCESS_KEY: str = ""
    S3_BUCKET_NAME: str = ""
    S3_REGION_NAME: str = "us-east-1"

    # ==========================================
    # 4. File Limits & Security
    # ==========================================
    MAX_UPLOAD_SIZE_MB: int = 25
    ALLOWED_EXTENSIONS: str = "pdf,docx,txt,png,jpg,jpeg,webp,bmp,tiff,tif,mp3,wav,m4a,ogg"

    @property
    def allowed_extensions_list(self) -> List[str]:
        if isinstance(self.ALLOWED_EXTENSIONS, list):
            return self.ALLOWED_EXTENSIONS
        return [x.strip().lower() for x in str(self.ALLOWED_EXTENSIONS).split(",") if x.strip()]

    # ==========================================
    # 5. Chunking, Vector Embeddings & Hybrid Retrieval Settings
    # ==========================================
    CHUNK_SIZE_CHARS: int = 1500
    CHUNK_OVERLAP_CHARS: int = 250
    FALLBACK_CHUNK_SIZE_CHARS: int = 750
    FALLBACK_CHUNK_OVERLAP_CHARS: int = 100
    MAX_CHUNK_TOKEN_CEILING: int = 900
    TOP_K_CHUNKS: int = 5

    # Semantic Embedding Model Settings
    EMBEDDING_MODEL_NAME: str = "intfloat/multilingual-e5-small"
    EMBEDDING_DEVICE: str = "cpu"

    # Hybrid Retrieval Settings
    RETRIEVAL_MODE: str = "hybrid"              # "hybrid", "dense", or "sparse"
    RRF_K: int = 60                             # Reciprocal Rank Fusion constant

    # Reranking Settings
    ENABLE_RERANKING: bool = True
    RERANKER_MODEL_NAME: str = "cross-encoder/ms-marco-MiniLM-L-6-v2"

    # ==========================================
    # 6. OCR & Document Layout Extraction Settings
    # ==========================================
    ENABLE_OCR_FALLBACK: bool = True
    ENABLE_DOCLING: bool = True

    # ==========================================
    # 7. Text-to-Speech & Voice Settings
    # ==========================================
    PRIMARY_TTS_PROVIDER: str = "edge_tts"       # "edge_tts" or "gtts"
    FALLBACK_TTS_PROVIDER: str = "gtts"          # "gtts" or "edge_tts"
    ENABLE_TTS_FALLBACK: bool = True

    # Default Voice Mappings
    DEFAULT_TTS_VOICE_EN: str = "en-US-JennyNeural"
    DEFAULT_TTS_VOICE_KN: str = "kn-IN-SapnaNeural"
    DEFAULT_TTS_VOICE_HI: str = "hi-IN-SwaraNeural"
    DEFAULT_TTS_VOICE_TE: str = "te-IN-ShrutiNeural"
    DEFAULT_TTS_VOICE_ES: str = "es-ES-ElviraNeural"
    DEFAULT_TTS_VOICE_FR: str = "fr-FR-DeniseNeural"
    DEFAULT_TTS_VOICE_DE: str = "de-DE-AmalaNeural"
    DEFAULT_TTS_VOICE_TA: str = "ta-IN-PallaviNeural"

    class Config:
        env_file = BASE_DIR / ".env"
        extra = "allow"

settings = Settings()

# Ensure critical directories exist
settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
settings.AUDIO_DIR.mkdir(parents=True, exist_ok=True)
settings.GOVREPORT_DIR.mkdir(parents=True, exist_ok=True)
settings.CHROMA_PERSIST_DIRECTORY.mkdir(parents=True, exist_ok=True)
