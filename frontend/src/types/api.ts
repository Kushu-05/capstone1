export interface Section {
  id: number;
  section_title: string;
  page_number: number;
  content: string;
  order_index: number;
}

export interface Chunk {
  id: string;
  chunk_index: number;
  page_number: number;
  section_title: string;
  content: string;
  token_estimate: number;
}

export interface DocumentDetail {
  id: string;
  original_name: string;
  file_type: string;
  file_size: number;
  page_count: number;
  word_count: number;
  char_count: number;
  created_at: string;
  sections: Section[];
  chunks_preview: Chunk[];
  total_chunks: number;
}

export interface DocumentUploadResponse {
  document_id: string;
  original_name: string;
  file_type: string;
  file_size_bytes: number;
  page_count: number;
  word_count: number;
  char_count: number;
  sections_count: number;
  chunks_count: number;
  message: string;
}

export interface FactItem {
  fact: string;
  page?: number;
  section?: string;
  evidence?: string;
}

export interface RiskItem {
  risk: string;
  severity: 'High' | 'Medium' | 'Low' | string;
  page?: number;
  section?: string;
  impact?: string;
}

export interface DecisionItem {
  decision: string;
  page?: number;
  section?: string;
  rationale?: string;
}

export interface RecommendationItem {
  recommendation: string;
  page?: number;
  section?: string;
  suggested_by?: string;
}

export interface ActionItem {
  action: string;
  owner?: string;
  deadline?: string;
  page?: number;
  section?: string;
}

export interface DocumentAnalysisResult {
  key_facts: FactItem[];
  risks: RiskItem[];
  decisions: DecisionItem[];
  recommendations: RecommendationItem[];
  action_items: ActionItem[];
  relevant_sections: string[];
}

export interface SourceReferenceItem {
  page: number;
  section: string;
  chunk_id: string;
  quote_or_topic: string;
}

export interface KeyFinding {
  finding: string;
  source_refs: SourceReferenceItem[];
}

export interface DraftSummaryResult {
  requested_focus: string;
  executive_summary: string;
  key_findings: KeyFinding[];
  source_references: SourceReferenceItem[];
  raw_draft: string;
}

export interface UnsupportedClaim {
  claim: string;
  reason: string;
  action_taken: string;
}

export interface ContradictionItem {
  claim: string;
  contradicting_evidence: string;
  source_chunk_id?: string;
}

export interface ValidationResult {
  factual_consistency_score: number;
  groundedness_score: number;
  validation_accuracy_score: number;
  unsupported_claims: UnsupportedClaim[];
  contradictions: ContradictionItem[];
  missing_info: string[];
  final_validated_summary: string;
  is_approved_for_tts: boolean;
  validation_details: Record<string, any>;
}

export interface QualityMetrics {
  relevance_score: number;
  completeness_score: number;
  factual_consistency_score: number;
  groundedness_score: number;
  overall_quality_score: number;
  validation_accuracy_score: number;
  metrics_explanation: Record<string, string>;
  report_markdown: string;
}

export interface AudioScriptResponse {
  broadcast_script: string;
  tone_and_cadence: string;
  estimated_duration_seconds: number;
  word_count: number;
  spoken_anchors: string[];
  script_adaptation_notes: string[];
}

export interface WorkflowRunResponse {
  workflow_run_id: string;
  document_id: string;
  status: string;
  requested_focus: string;
  language: string;
  analysis?: DocumentAnalysisResult;
  draft_summary?: DraftSummaryResult;
  validation?: ValidationResult;
  evaluation?: QualityMetrics;
  audio_script?: AudioScriptResponse;
  audio_path?: string;
  audio_id?: string;
  error_message?: string;
  are_unrelated?: boolean;
  relationship_disclaimer?: string;
  relationship_classification?: 'RELATED' | 'PARTIALLY_RELATED' | 'UNRELATED' | 'SINGLE' | string;
  warning_message?: string;
  summary_strategy?: string;
  separate_summaries?: any[];
  shared_themes?: string[];
  distinct_aspects?: string[];
  document_domains?: Record<string, string>;
  pairwise_scores?: any[];
  fallbacks_used?: string[];
  llm_provider?: string;
  model?: string;
  validation_method?: string;
}

export interface AudioResponse {
  audio_id: string;
  workflow_run_id: string;
  document_id: string;
  audio_url: string;
  voice: string;
  language: string;
  duration_seconds: number;
  is_validated_source: boolean;
}

export interface DashboardStats {
  total_documents: number;
  total_workflows: number;
  total_audio_briefings: number;
  total_words_processed: number;
  recent_documents: {
    id: string;
    original_name: string;
    file_type: string;
    page_count: number;
    word_count: number;
    created_at: string;
  }[];
}

export interface QASource {
  chunk_id: string;
  page_number: number;
  section_title: string;
  content: string;
  similarity_score: number;
}

export interface QAResponse {
  question: string;
  answer: string;
  sources: QASource[];
  is_relevant?: boolean;
  relevance_score?: number;
  relevance_verdict?: string;
}

export interface CompareResponse {
  doc1: {
    id: string;
    name: string;
    page_count: number;
    word_count: number;
    sections: string[];
  };
  doc2: {
    id: string;
    name: string;
    page_count: number;
    word_count: number;
    sections: string[];
  };
  similarities: string[];
  differences: string[];
  doc1_highlights: string[];
  doc2_highlights: string[];
  comparison_summary: string;
}

export interface GovReportSample {
  id: string;
  title: string;
  agency: string;
  publication_date: string;
  word_count: number;
  has_reference_summary: boolean;
}

export interface GovReportEvalResponse {
  dataset_name: string;
  sample_id: string;
  title: string;
  agency: string;
  relevance_score: number;
  completeness_score: number;
  factual_consistency_score: number;
  groundedness_score: number;
  overall_quality_score: number;
  validation_accuracy_score: number;
  reference_summary_length: number;
  generated_summary_length: number;
  evaluation_summary: string;
  detailed_metrics: Record<string, string>;
}
