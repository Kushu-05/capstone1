from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

# ---------------------------------------------------------
# Base Agent-to-Agent Message Envelope
# ---------------------------------------------------------
class A2AMessageEnvelope(BaseModel):
    message_id: str
    sender: str
    recipient: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    workflow_run_id: str
    document_id: str
    payload_type: str


# ---------------------------------------------------------
# Agent 1: Analysis Agent Schemas
# ---------------------------------------------------------
class FactItem(BaseModel):
    fact: str
    page: Optional[int] = 1
    section: Optional[str] = "General"
    evidence: Optional[str] = None

class RiskItem(BaseModel):
    risk: str
    severity: str = "Medium"  # Low, Medium, High, Critical
    page: Optional[int] = 1
    section: Optional[str] = "General"
    impact: Optional[str] = None

class DecisionItem(BaseModel):
    decision: str
    page: Optional[int] = 1
    section: Optional[str] = "General"
    rationale: Optional[str] = None

class RecommendationItem(BaseModel):
    recommendation: str
    page: Optional[int] = 1
    section: Optional[str] = "General"
    suggested_by: Optional[str] = None

class ActionItem(BaseModel):
    action: str
    owner: Optional[str] = "Unassigned"
    deadline: Optional[str] = "Not specified"
    page: Optional[int] = 1
    section: Optional[str] = "General"

class DocumentAnalysisResult(BaseModel):
    key_facts: List[FactItem] = Field(default_factory=list)
    risks: List[RiskItem] = Field(default_factory=list)
    decisions: List[DecisionItem] = Field(default_factory=list)
    recommendations: List[RecommendationItem] = Field(default_factory=list)
    action_items: List[ActionItem] = Field(default_factory=list)
    relevant_sections: List[str] = Field(default_factory=list)


# ---------------------------------------------------------
# Agent 2: Summarization Agent Schemas
# ---------------------------------------------------------
class SourceReference(BaseModel):
    page: int
    section: str
    chunk_id: str
    quote_or_topic: str

class KeyFinding(BaseModel):
    finding: str
    source_refs: List[SourceReference] = Field(default_factory=list)

class DraftSummaryResult(BaseModel):
    requested_focus: str
    executive_summary: str
    key_findings: List[KeyFinding] = Field(default_factory=list)
    source_references: List[SourceReference] = Field(default_factory=list)
    raw_draft: str


# ---------------------------------------------------------
# Agent 3: Validation Agent Schemas
# ---------------------------------------------------------
class UnsupportedClaim(BaseModel):
    claim: str
    reason: str
    action_taken: str  # e.g., "removed", "corrected", "flagged"

class ContradictionItem(BaseModel):
    claim: str
    contradicting_evidence: str
    source_chunk_id: Optional[str] = None

class ValidationResult(BaseModel):
    factual_consistency_score: float = Field(ge=0.0, le=1.0)
    groundedness_score: float = Field(ge=0.0, le=1.0)
    validation_accuracy_score: float = Field(ge=0.0, le=1.0)
    unsupported_claims: List[UnsupportedClaim] = Field(default_factory=list)
    contradictions: List[ContradictionItem] = Field(default_factory=list)
    missing_info: List[str] = Field(default_factory=list)
    final_validated_summary: str
    is_approved_for_tts: bool
    validation_method: str = "ai"  # "ai" or "deterministic_fallback"
    validation_details: Dict[str, Any] = Field(default_factory=dict)



# ---------------------------------------------------------
# Agent 4: Quality & Evaluation Agent Schemas
# ---------------------------------------------------------
class QualityMetrics(BaseModel):
    relevance_score: float = Field(ge=0.0, le=1.0)
    completeness_score: float = Field(ge=0.0, le=1.0)
    factual_consistency_score: float = Field(ge=0.0, le=1.0)
    groundedness_score: float = Field(ge=0.0, le=1.0)
    overall_quality_score: float = Field(ge=0.0, le=1.0)
    validation_accuracy_score: float = Field(ge=0.0, le=1.0)
    metrics_explanation: Dict[str, str] = Field(default_factory=dict)
    report_markdown: str


# ---------------------------------------------------------
# Agent 5: Audio Script Adaptation Agent Schemas
# ---------------------------------------------------------
class AudioScriptResult(BaseModel):
    broadcast_script: str
    tone_and_cadence: str = "Executive Briefing (Conversational & Crisp)"
    estimated_duration_seconds: int
    word_count: int
    spoken_anchors: List[str] = Field(default_factory=list)
    script_adaptation_notes: List[str] = Field(default_factory=list)


# ---------------------------------------------------------
# Text-to-Speech Payload (Strictly requires validated summary or audio script)
# ---------------------------------------------------------
class TTSRequestContract(BaseModel):
    workflow_run_id: str
    document_id: str
    final_validated_summary: str
    is_approved_for_tts: bool
    voice: Optional[str] = None
    language: Optional[str] = "en"
