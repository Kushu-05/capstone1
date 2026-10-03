from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from backend.schemas.agent_schemas import (
    DocumentAnalysisResult,
    DraftSummaryResult,
    ValidationResult,
    QualityMetrics,
    AudioScriptResult
)

class DocumentUploadResponse(BaseModel):
    document_id: str
    original_name: str
    file_type: str
    file_size_bytes: int
    page_count: int
    word_count: int
    char_count: int
    sections_count: int
    chunks_count: int
    message: str
    ocr_used: bool = False
    fallbacks_used: List[str] = []

class SectionResponse(BaseModel):
    id: int
    section_title: str
    page_number: int
    content: str
    order_index: int

class ChunkResponse(BaseModel):
    id: str
    chunk_index: int
    page_number: int
    section_title: str
    content: str
    token_estimate: int

class DocumentDetailResponse(BaseModel):
    id: str
    original_name: str
    file_type: str
    file_size: int
    page_count: int
    word_count: int
    char_count: int
    created_at: datetime
    sections: List[SectionResponse]
    chunks_preview: List[ChunkResponse]
    total_chunks: int

class WorkflowRunRequest(BaseModel):
    document_id: str
    requested_focus: Optional[str] = "Comprehensive Executive Briefing"
    language: Optional[str] = "en"
    auto_generate_audio: Optional[bool] = False
    voice: Optional[str] = None

class MultiWorkflowRunRequest(BaseModel):
    document_ids: List[str]
    requested_focus: Optional[str] = "Unified Master Cross-Document Briefing"
    language: Optional[str] = "en"
    auto_generate_audio: Optional[bool] = False
    voice: Optional[str] = None

class WorkflowRunResponse(BaseModel):
    workflow_run_id: str
    document_id: str
    status: str
    requested_focus: str
    language: str
    analysis: Optional[DocumentAnalysisResult] = None
    draft_summary: Optional[DraftSummaryResult] = None
    validation: Optional[ValidationResult] = None
    evaluation: Optional[QualityMetrics] = None
    audio_script: Optional[AudioScriptResult] = None
    audio_path: Optional[str] = None
    audio_id: Optional[str] = None
    error_message: Optional[str] = None
    fallbacks_used: List[str] = []
    llm_provider: str = "openai"
    model: str = ""
    validation_method: str = "ai"
    audio_status: str = "success"
    audio_error: Optional[str] = None
    are_unrelated: Optional[bool] = False
    relationship_disclaimer: Optional[str] = None
    relationship_classification: Optional[str] = "SINGLE"
    warning_message: Optional[str] = None
    summary_strategy: Optional[str] = None
    separate_summaries: Optional[List[Dict[str, Any]]] = None
    shared_themes: Optional[List[str]] = None
    distinct_aspects: Optional[List[str]] = None
    document_domains: Optional[Dict[str, str]] = None
    pairwise_scores: Optional[List[Dict[str, Any]]] = None


class AudioGenerateRequest(BaseModel):
    workflow_run_id: str
    voice: Optional[str] = None
    language: Optional[str] = "en"
    text: Optional[str] = None

class AudioResponse(BaseModel):
    audio_id: str
    workflow_run_id: str
    document_id: str
    audio_url: str
    voice: str
    language: str
    duration_seconds: float
    is_validated_source: bool

class SwitchLanguageRequest(BaseModel):
    workflow_run_id: str
    target_language: str
    auto_generate_audio: Optional[bool] = True
    voice: Optional[str] = None

class SwitchLanguageResponse(BaseModel):
    workflow_run_id: str
    language: str
    original_language: str
    canonical_summary: str
    translated_summary: str
    audio: Optional[AudioResponse] = None

class FeedbackCreateRequest(BaseModel):
    workflow_run_id: str
    rating: int  # 1 to 5
    is_helpful: bool
    feedback_text: Optional[str] = ""

class FeedbackResponse(BaseModel):
    id: int
    workflow_run_id: str
    rating: int
    is_helpful: bool
    feedback_text: Optional[str]
    created_at: datetime

class GovReportEvalResponse(BaseModel):
    dataset_name: str
    sample_id: str
    title: str
    agency: str
    relevance_score: float
    completeness_score: float
    factual_consistency_score: float
    groundedness_score: float
    overall_quality_score: float
    validation_accuracy_score: float
    reference_summary_length: int
    generated_summary_length: int
    evaluation_summary: str
    detailed_metrics: Dict[str, Any]

class TranslateRequest(BaseModel):
    text: str
    target_language: str = "kn"
    source_language: str = "en"

class TranslateResponse(BaseModel):
    translated_text: str
    target_language: str
    original_text: str
