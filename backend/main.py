import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.config import settings
from backend.database import init_db
from backend.api.routes_documents import router as documents_router
from backend.api.routes_pipeline import router as pipeline_router
from backend.api.routes_tts import router as tts_router
from backend.api.routes_evaluation import router as evaluation_router
from backend.api.routes_feedback import router as feedback_router
from backend.utils.logger import logger

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing database tables...")
    init_db()
    logger.info("AI Document Intelligence Backend ready.")
    yield

# Initialize FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Multi-Agent Document Intelligence System with Source Grounding, Validation, and Text-to-Speech.",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(documents_router)
app.include_router(pipeline_router)
app.include_router(tts_router)
app.include_router(evaluation_router)
app.include_router(feedback_router)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION,
        "llm_provider": settings.LLM_PROVIDER,
        "fallback_llm_provider": settings.FALLBACK_LLM_PROVIDER,
        "openai_configured": bool(settings.OPENAI_API_KEY and settings.OPENAI_API_KEY != "your_openai_api_key_here"),
        "gemini_configured": bool(settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here"),
        "primary_tts": settings.PRIMARY_TTS_PROVIDER,
        "fallback_tts": settings.FALLBACK_TTS_PROVIDER,
        "ocr_enabled": settings.ENABLE_OCR_FALLBACK
    }



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host=settings.BACKEND_HOST, port=settings.BACKEND_PORT, reload=True)
