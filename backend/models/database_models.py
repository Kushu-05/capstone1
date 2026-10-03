import datetime
from sqlalchemy import Column, String, Integer, Float, Text, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from backend.database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(String(36), primary_key=True)
    original_name = Column(String(255), nullable=False)
    stored_filename = Column(String(255), nullable=False)
    file_type = Column(String(10), nullable=False)
    file_size = Column(Integer, nullable=False)
    file_path = Column(String(500), nullable=False)
    full_text = Column(Text, nullable=False)
    page_count = Column(Integer, default=1)
    word_count = Column(Integer, default=0)
    char_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    sections = relationship("DocumentSection", back_populates="document", cascade="all, delete-orphan")
    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")
    workflow_runs = relationship("AgentWorkflowRun", back_populates="document", cascade="all, delete-orphan")
    audio_records = relationship("AudioRecord", back_populates="document", cascade="all, delete-orphan")


class DocumentSection(Base):
    __tablename__ = "document_sections"

    id = Column(Integer, primary_key=True, autoincrement=True)
    document_id = Column(String(36), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    section_title = Column(String(255), nullable=False)
    page_number = Column(Integer, default=1)
    content = Column(Text, nullable=False)
    order_index = Column(Integer, default=0)

    document = relationship("Document", back_populates="sections")


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(String(64), primary_key=True)
    document_id = Column(String(36), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    chunk_index = Column(Integer, nullable=False)
    page_number = Column(Integer, default=1)
    section_title = Column(String(255), default="General")
    content = Column(Text, nullable=False)
    char_start = Column(Integer, default=0)
    char_end = Column(Integer, default=0)
    token_estimate = Column(Integer, default=0)

    document = relationship("Document", back_populates="chunks")


class AgentWorkflowRun(Base):
    __tablename__ = "agent_workflow_runs"

    id = Column(String(36), primary_key=True)
    document_id = Column(String(36), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    requested_focus = Column(String(100), default="Comprehensive Executive Briefing")
    language = Column(String(20), default="en")
    status = Column(String(50), default="PENDING")
    error_message = Column(Text, nullable=True)
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    document = relationship("Document", back_populates="workflow_runs")
    analysis_result = relationship("AnalysisResult", back_populates="workflow_run", uselist=False, cascade="all, delete-orphan")
    summary_draft = relationship("SummaryDraft", back_populates="workflow_run", uselist=False, cascade="all, delete-orphan")
    validation_report = relationship("ValidationReport", back_populates="workflow_run", uselist=False, cascade="all, delete-orphan")
    evaluation_report = relationship("EvaluationReport", back_populates="workflow_run", uselist=False, cascade="all, delete-orphan")
    audio_script_draft = relationship("AudioScriptDraft", back_populates="workflow_run", uselist=False, cascade="all, delete-orphan")
    audio_records = relationship("AudioRecord", back_populates="workflow_run", cascade="all, delete-orphan")
    feedbacks = relationship("UserFeedback", back_populates="workflow_run", cascade="all, delete-orphan")


class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, autoincrement=True)
    workflow_run_id = Column(String(36), ForeignKey("agent_workflow_runs.id", ondelete="CASCADE"), nullable=False)
    key_facts = Column(JSON, default=list)
    risks = Column(JSON, default=list)
    decisions = Column(JSON, default=list)
    recommendations = Column(JSON, default=list)
    action_items = Column(JSON, default=list)
    relevant_sections = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    workflow_run = relationship("AgentWorkflowRun", back_populates="analysis_result")


class SummaryDraft(Base):
    __tablename__ = "summary_drafts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    workflow_run_id = Column(String(36), ForeignKey("agent_workflow_runs.id", ondelete="CASCADE"), nullable=False)
    executive_summary = Column(Text, nullable=False)
    key_findings = Column(JSON, default=list)
    source_references = Column(JSON, default=list)
    raw_draft = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    workflow_run = relationship("AgentWorkflowRun", back_populates="summary_draft")


class ValidationReport(Base):
    __tablename__ = "validation_reports"

    id = Column(Integer, primary_key=True, autoincrement=True)
    workflow_run_id = Column(String(36), ForeignKey("agent_workflow_runs.id", ondelete="CASCADE"), nullable=False)
    factual_consistency_score = Column(Float, default=1.0)
    groundedness_score = Column(Float, default=1.0)
    validation_accuracy_score = Column(Float, default=1.0)
    unsupported_claims = Column(JSON, default=list)
    contradictions = Column(JSON, default=list)
    missing_info = Column(JSON, default=list)
    final_validated_summary = Column(Text, nullable=False)
    is_approved_for_tts = Column(Boolean, default=False)
    validation_details = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    workflow_run = relationship("AgentWorkflowRun", back_populates="validation_report")


class EvaluationReport(Base):
    __tablename__ = "evaluation_reports"

    id = Column(Integer, primary_key=True, autoincrement=True)
    workflow_run_id = Column(String(36), ForeignKey("agent_workflow_runs.id", ondelete="CASCADE"), nullable=False)
    relevance_score = Column(Float, default=0.0)
    completeness_score = Column(Float, default=0.0)
    factual_consistency_score = Column(Float, default=0.0)
    groundedness_score = Column(Float, default=0.0)
    overall_quality_score = Column(Float, default=0.0)
    validation_accuracy_score = Column(Float, default=0.0)
    metrics_explanation = Column(JSON, default=dict)
    report_markdown = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    workflow_run = relationship("AgentWorkflowRun", back_populates="evaluation_report")


class AudioScriptDraft(Base):
    __tablename__ = "audio_script_drafts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    workflow_run_id = Column(String(36), ForeignKey("agent_workflow_runs.id", ondelete="CASCADE"), nullable=False)
    broadcast_script = Column(Text, nullable=False)
    tone_and_cadence = Column(String(100), default="Executive Briefing (Conversational & Crisp)")
    estimated_duration_seconds = Column(Integer, default=60)
    word_count = Column(Integer, default=0)
    spoken_anchors = Column(JSON, default=list)
    script_adaptation_notes = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    workflow_run = relationship("AgentWorkflowRun", back_populates="audio_script_draft")


class AudioRecord(Base):
    __tablename__ = "audio_records"

    id = Column(String(36), primary_key=True)
    workflow_run_id = Column(String(36), ForeignKey("agent_workflow_runs.id", ondelete="CASCADE"), nullable=False)
    document_id = Column(String(36), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    voice = Column(String(50), nullable=False)
    language = Column(String(20), default="en")
    audio_file_path = Column(String(500), nullable=False)
    duration_seconds = Column(Float, default=0.0)
    is_validated_source = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    workflow_run = relationship("AgentWorkflowRun", back_populates="audio_records")
    document = relationship("Document", back_populates="audio_records")


class UserFeedback(Base):
    __tablename__ = "user_feedbacks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    workflow_run_id = Column(String(36), ForeignKey("agent_workflow_runs.id", ondelete="CASCADE"), nullable=False)
    rating = Column(Integer, nullable=False)
    is_helpful = Column(Boolean, default=True)
    feedback_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    workflow_run = relationship("AgentWorkflowRun", back_populates="feedbacks")
