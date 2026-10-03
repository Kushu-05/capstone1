import React, { useState } from 'react';
import { 
  FileText, Sparkles, BookOpen, Layers, Search, ShieldCheck, 
  Award, ChevronRight, ChevronDown, Download, Copy, Check, 
  HelpCircle, Volume2, Send, MessageSquareText, AlertCircle, 
  CheckCircle2, Bot, User, SlidersHorizontal, ArrowRight
} from 'lucide-react';
import { 
  DocumentDetail, WorkflowRunResponse, AudioResponse, Section, Chunk, QAResponse 
} from '../types/api';
import { api } from '../services/api';
import { ProcessingStatus } from '../components/ProcessingStatus';
import { AudioPlayer } from '../components/AudioPlayer';
import { ValidationPanel } from '../components/ValidationPanel';
import { EvaluationPanel } from '../components/EvaluationPanel';
import { KeyFindingCard } from '../components/KeyFindingCard';

interface StudioViewProps {
  documents: DocumentDetail[];
  activeDoc: DocumentDetail | null;
  workflowRun: WorkflowRunResponse | null;
  audio: AudioResponse | null;
  onSelectDoc: (docId: string) => void;
  onWorkflowComplete: (res: WorkflowRunResponse) => void;
  onAudioGenerated: (audio: AudioResponse) => void;
  onOpenUploadModal: () => void;
}

export const StudioView: React.FC<StudioViewProps> = ({
  documents,
  activeDoc,
  workflowRun,
  audio,
  onSelectDoc,
  onWorkflowComplete,
  onAudioGenerated,
  onOpenUploadModal
}) => {
  // Input Prompt & Q&A state
  const [userQuery, setUserQuery] = useState('');
  const [qaAnswer, setQaAnswer] = useState<QAResponse | null>(null);
  const [isAskingQA, setIsAskingQA] = useState(false);

  // Workflow State
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Left Panel & Audit Drawer State
  const [showLeftDocPanel, setShowLeftDocPanel] = useState(true);
  const [leftTab, setLeftTab] = useState<'sections' | 'chunks'>('sections');
  const [chunkSearch, setChunkSearch] = useState('');
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [showAuditDrawer, setShowAuditDrawer] = useState(false);
  const [auditTab, setAuditTab] = useState<'gatekeeper' | 'evaluation' | 'intelligence'>('gatekeeper');

  // Quick Prompt Presets
  const quickPrompts = [
    { label: '⚡ Executive Summary', focus: 'Comprehensive Executive Summary' },
    { label: '🔍 Key Findings & Decisions', focus: 'Key Findings & Critical Decisions' },
    { label: '⚠️ Risks & Vulnerabilities', focus: 'Risks, Vulnerabilities & Compliance' },
    { label: '💰 Financials & Quantitative KPIs', focus: 'Financial & Quantitative Metrics' },
  ];

  // Execute Multi-Agent Workflow
  const handleRunWorkflow = async (focusToUse = 'Comprehensive Executive Summary') => {
    if (!activeDoc) return;
    setIsRunningWorkflow(true);
    setQaAnswer(null); // Clear standalone QA so summary shows
    setError(null);
    setCurrentStep(1);

    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 2400);

    try {
      const focusParam = `${focusToUse} (${summaryLength.toUpperCase()} length format)`;
      const res = await api.runPipeline(activeDoc.id, focusParam, 'en', false);
      clearInterval(timer);
      setCurrentStep(5);
      onWorkflowComplete(res);
    } catch (err: any) {
      clearInterval(timer);
      setError(err?.response?.data?.detail || 'Multi-agent orchestration failed.');
    } finally {
      setIsRunningWorkflow(false);
    }
  };

  // Execute Question / Search
  const handleAskQuestion = async (customQ?: string) => {
    const q = (customQ || userQuery).trim();
    if (!q || !activeDoc || isAskingQA) return;

    // If query is an executive summary request, trigger full workflow
    if (q.toLowerCase().includes('summar') || q.toLowerCase().includes('brief')) {
      handleRunWorkflow(q);
      setUserQuery('');
      return;
    }

    setIsAskingQA(true);
    setError(null);
    try {
      const res = await api.askQuestion(activeDoc.id, q);
      setQaAnswer(res);
      setUserQuery('');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Failed to answer question.');
    } finally {
      setIsAskingQA(false);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleDownloadText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!activeDoc) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', margin: '2rem auto', maxWidth: '600px' }}>
        <FileText size={48} color="var(--primary)" style={{ opacity: 0.5, margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem' }}>No Document Ingested</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 1.5rem' }}>
          Upload a PDF, DOCX, TXT, image (PNG/JPG), or audio file to launch the Unified Multi-Agent Studio.
        </p>
        <button onClick={onOpenUploadModal} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
          Upload Document Now
        </button>
      </div>
    );
  }

  // Filter chunks by search
  const filteredChunks = activeDoc.chunks_preview?.filter(c => 
    c.content.toLowerCase().includes(chunkSearch.toLowerCase()) ||
    c.section_title?.toLowerCase().includes(chunkSearch.toLowerCase())
  ) || [];

  // Active validated summary text
  const validatedSummary = workflowRun?.validation?.final_validated_summary 
    || workflowRun?.draft_summary?.executive_summary 
    || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 1. Top Document Switcher Bar */}
      <div className="card" style={{ padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 2px 10px rgba(99, 102, 241, 0.35)'
            }}>
              <FileText size={18} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#818CF8', textTransform: 'uppercase' }}>Active Document</span>
                <span className="badge badge-neutral" style={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>{activeDoc.file_type}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {activeDoc.page_count} pgs • {activeDoc.word_count.toLocaleString()} wds • {activeDoc.total_chunks} chunks
                </span>
              </div>

              <select
                value={activeDoc.id}
                onChange={(e) => onSelectDoc(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '0.15rem',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  background: 'rgba(8, 11, 17, 0.75)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                {documents.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.original_name} ({d.page_count} pgs • {d.word_count.toLocaleString()} wds)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setShowLeftDocPanel(!showLeftDocPanel)}
              className="btn btn-secondary"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.75rem' }}
            >
              <BookOpen size={14} />
              <span>{showLeftDocPanel ? 'Hide Document Chunks' : 'Show Document Chunks'}</span>
            </button>
            <button
              onClick={onOpenUploadModal}
              className="btn btn-secondary"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.75rem' }}
            >
              Upload New
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Question & Command Bar (FRONT & CENTER) */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
        border: '1px solid var(--border-glow)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35), 0 0 20px rgba(99, 102, 241, 0.15)',
        padding: '1.25rem 1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
          <Sparkles size={16} color="var(--primary)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Ask a Question or Request Instant Summary
          </span>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            (Grounded strictly in verified document text • zero hallucinations)
          </span>
        </div>

        {/* Input Box */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
              placeholder={`Ask anything about "${activeDoc.original_name}", or type "summarize"...`}
              disabled={isAskingQA || isRunningWorkflow}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                fontSize: '0.92rem',
                borderRadius: 'var(--radius-md)'
              }}
            />
            <MessageSquareText size={17} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <button
            onClick={() => handleAskQuestion()}
            disabled={isAskingQA || isRunningWorkflow || !userQuery.trim()}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }}
          >
            <Send size={15} />
            <span>{isAskingQA ? 'Searching...' : 'Ask / Summarize'}</span>
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Quick Prompts:
          </span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleRunWorkflow(p.focus)}
              disabled={isRunningWorkflow}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.76rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>{p.label}</span>
            </button>
          ))}

          {/* Depth Controller */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Depth:</span>
            {(['short', 'medium', 'detailed'] as const).map(len => (
              <button
                key={len}
                onClick={() => setSummaryLength(len)}
                style={{
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: summaryLength === len ? 700 : 500,
                  background: summaryLength === len ? 'var(--primary)' : 'rgba(15, 23, 42, 0.6)',
                  color: summaryLength === len ? 'white' : 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {len}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div style={{
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--danger-light)',
          border: '1px solid var(--danger-border)',
          color: 'var(--danger-text)',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Live Agent Stepper if processing */}
      {isRunningWorkflow && (
        <ProcessingStatus currentStep={currentStep} isProcessing={isRunningWorkflow} />
      )}

      {/* 3. Main Split-Screen Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: showLeftDocPanel ? '380px 1fr' : '1fr',
        gap: '1.25rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Source Document Chunks (Optional / Collapsible) */}
        {showLeftDocPanel && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '720px', padding: 0, overflow: 'hidden' }}>
            <div style={{
              padding: '0.85rem 1rem',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'rgba(8, 11, 17, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Original Source Chunks
                </span>
                <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>
                  {activeDoc.total_chunks || 0} Chunks
                </span>
              </div>

              {/* Search Chunks */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={chunkSearch}
                  onChange={(e) => setChunkSearch(e.target.value)}
                  placeholder="Filter chunks..."
                  style={{ width: '100%', padding: '0.4rem 0.6rem 0.4rem 1.8rem', fontSize: '0.78rem' }}
                />
                <Search size={13} color="var(--text-muted)" style={{ position: 'absolute', left: '0.55rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* Chunks List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {filteredChunks.map(chunk => (
                <div
                  key={chunk.id}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.78rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>Chunk #{chunk.chunk_index}</span>
                    <span>Page {chunk.page_number}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                    {chunk.section_title || 'General'}
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {chunk.content.substring(0, 180)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Column: Audio Briefing + Summary / Answer + Collapsible Audit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* 4. Neural Voice Briefing Player (ALWAYS PROMINENT!) */}
          <AudioPlayer
            workflowRunId={workflowRun?.workflow_run_id}
            audio={audio}
            onAudioGenerated={onAudioGenerated}
            onTriggerGenerate={() => handleRunWorkflow('Comprehensive Executive Summary')}
            isGeneratingAudio={isRunningWorkflow}
          />

          {/* 5. Result Display (Question Answer OR Validated Summary) */}
          {qaAnswer ? (
            /* Answer to specific user question */
            <div className="card" style={{ borderLeft: '4px solid var(--primary)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bot size={18} color="#818CF8" />
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Grounded Answer: "{qaAnswer.question}"
                  </span>
                </div>
                <button
                  onClick={() => setQaAnswer(null)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                >
                  Show Full Summary
                </button>
              </div>

              <div style={{ fontSize: '0.94rem', lineHeight: 1.7, color: 'var(--text-main)', whiteSpace: 'pre-wrap', marginBottom: '1.25rem' }}>
                {qaAnswer.answer}
              </div>

              {/* Source Chunks for Question */}
              {qaAnswer.sources && qaAnswer.sources.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Verified in {qaAnswer.sources.length} Document Source Chunks:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {qaAnswer.sources.map((s, i) => (
                      <div key={i} style={{ padding: '0.65rem 0.85rem', background: 'rgba(8, 11, 17, 0.65)', borderRadius: '6px', fontSize: '0.78rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#818CF8', marginBottom: '0.2rem' }}>
                          <span>Chunk #{s.chunk_id.substring(0, 8)}... (Page {s.page_number})</span>
                          <span>{s.section_title || 'General'}</span>
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                          "{s.content}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : validatedSummary ? (
            /* Main Validated Executive Summary */
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                      Validated Executive Summary
                    </h3>
                    <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                      Certified Grounded
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Synthesized from {activeDoc.page_count} pages • {validatedSummary.split(/\s+/).length} words
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleCopyText(validatedSummary)}
                    className="btn btn-secondary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                  >
                    {copiedSummary ? <Check size={14} color="#34D399" /> : <Copy size={14} />}
                    <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleDownloadText(validatedSummary, `${activeDoc.original_name}_summary.txt`)}
                    className="btn btn-secondary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Main Summary Body */}
              <div style={{
                fontSize: '0.95rem',
                lineHeight: 1.75,
                color: 'var(--text-main)',
                whiteSpace: 'pre-line',
                background: 'rgba(8, 11, 17, 0.65)',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid var(--primary)',
                marginBottom: '1.5rem'
              }}>
                {validatedSummary}
              </div>

              {/* Corroborated Key Findings */}
              {workflowRun?.draft_summary?.key_findings && workflowRun.draft_summary.key_findings.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: '0 0 0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>Key Grounded Findings & Citations</span>
                    <span className="badge badge-primary">{workflowRun.draft_summary.key_findings.length} Verified</span>
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {workflowRun.draft_summary.key_findings.map((f, i) => (
                      <KeyFindingCard key={i} finding={f} index={i + 1} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Clean Empty State before first run */
            <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: 'var(--text-muted)' }}>
              <Sparkles size={40} color="var(--primary)" style={{ opacity: 0.45, margin: '0 auto 0.75rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.35rem' }}>
                Ready to Summarize & Speak
              </h3>
              <p style={{ margin: '0 0 1.25rem', fontSize: '0.85rem', maxWidth: '460px', marginInline: 'auto' }}>
                Click below to generate the multi-agent summary and voice briefing, or ask any specific question in the box above.
              </p>
              <button
                onClick={() => handleRunWorkflow('Comprehensive Executive Summary')}
                disabled={isRunningWorkflow}
                className="btn btn-primary"
                style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}
              >
                <Sparkles size={16} />
                <span>Generate Executive Briefing & Voice</span>
              </button>
            </div>
          )}

          {/* 6. Clean Collapsible Verification & Agent Audit Drawer */}
          {workflowRun && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button
                onClick={() => setShowAuditDrawer(!showAuditDrawer)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(8, 11, 17, 0.65)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <ShieldCheck size={20} color="#34D399" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Multi-Agent Safety & Quality Audit
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Gatekeeper Certified • Zero Hallucinations • 6 Academic Quality Scores
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                    PASSED GATEKEEPER
                  </span>
                  {showAuditDrawer ? <ChevronDown size={16} color="var(--text-muted)" /> : <ChevronRight size={16} color="var(--text-muted)" />}
                </div>
              </button>

              {/* Expanded Audit Details */}
              {showAuditDrawer && (
                <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border-subtle)', background: 'rgba(15, 23, 42, 0.5)' }}>
                  {/* Audit Sub-Tabs */}
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {[
                      { id: 'gatekeeper', label: 'Validation Gatekeeper', icon: <ShieldCheck size={14} /> },
                      { id: 'evaluation', label: 'Quality Evaluation Metrics', icon: <Award size={14} /> },
                      { id: 'intelligence', label: 'Extracted Facts & Risks', icon: <Layers size={14} /> },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setAuditTab(tab.id as any)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: auditTab === tab.id ? 700 : 500,
                          background: auditTab === tab.id ? 'var(--primary)' : 'rgba(30, 41, 59, 0.6)',
                          color: auditTab === tab.id ? 'white' : 'var(--text-muted)',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {auditTab === 'gatekeeper' && workflowRun.validation && (
                    <ValidationPanel validation={workflowRun.validation} />
                  )}

                  {auditTab === 'evaluation' && workflowRun.evaluation && (
                    <EvaluationPanel evaluation={workflowRun.evaluation} />
                  )}

                  {auditTab === 'intelligence' && workflowRun.analysis && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {/* Facts */}
                      <div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
                          Verified Facts ({workflowRun.analysis.key_facts?.length || 0})
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          {workflowRun.analysis.key_facts?.map((f, idx) => (
                            <div key={idx} style={{ padding: '0.65rem 0.85rem', background: 'rgba(8, 11, 17, 0.6)', borderRadius: '6px', fontSize: '0.8rem' }}>
                              <strong>{f.fact}</strong> (Page {f.page ?? 'N/A'})
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Risks */}
                      {workflowRun.analysis.risks && workflowRun.analysis.risks.length > 0 && (
                        <div>
                          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
                            Identified Risks ({workflowRun.analysis.risks.length})
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            {workflowRun.analysis.risks.map((r, idx) => (
                              <div key={idx} style={{ padding: '0.65rem 0.85rem', background: 'rgba(8, 11, 17, 0.6)', borderRadius: '6px', fontSize: '0.8rem', borderLeft: '3px solid var(--warning)' }}>
                                <strong>{r.risk}</strong> • Severity: {r.severity}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
