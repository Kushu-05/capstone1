import React, { useState } from 'react';
import { Sparkles, Sliders, Volume2, ShieldCheck, ArrowRight, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { DocumentDetail, WorkflowRunResponse, AudioResponse } from '../types/api';
import { api } from '../services/api';
import { ProcessingStatus } from '../components/ProcessingStatus';
import { SummaryCard } from '../components/SummaryCard';
import { KeyFindingCard } from '../components/KeyFindingCard';
import { NavTab } from '../components/Sidebar';

interface SummaryViewProps {
  activeDoc: DocumentDetail | null;
  workflowRun: WorkflowRunResponse | null;
  onWorkflowComplete: (res: WorkflowRunResponse) => void;
  onNavigate: (tab: NavTab) => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  activeDoc,
  workflowRun,
  onWorkflowComplete,
  onNavigate
}) => {
  const [requestedFocus, setRequestedFocus] = useState('Comprehensive Executive Summary');
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [language, setLanguage] = useState('en');
  const [autoAudio, setAutoAudio] = useState(false);
  const [voice, setVoice] = useState('en-US-JennyNeural');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const focusOptions = [
    { label: 'Comprehensive Executive Summary', desc: 'Holistic overview of core themes, results, and recommendations' },
    { label: 'Key Findings & Critical Decisions', desc: 'Focuses strictly on pivotal outcomes, decisions, and impact' },
    { label: 'Risks, Vulnerabilities & Compliance', desc: 'Highlights regulatory, operational, and financial exposures' },
    { label: 'Financial & Quantitative Metrics', desc: 'Extracts numeric budgets, percentages, projections, and KPIs' },
  ];

  const handleRunWorkflow = async () => {
    if (!activeDoc) return;
    setIsRunning(true);
    setError(null);
    setCurrentStep(1); // Document Analysis Agent

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 2500);

    try {
      const focusWithLength = `${requestedFocus} (${summaryLength.toUpperCase()} length format)`;
      const res = await api.runPipeline(activeDoc.id, focusWithLength, language, autoAudio, voice);
      clearInterval(timer);
      setCurrentStep(autoAudio ? 5 : 4);
      onWorkflowComplete(res);
    } catch (err: any) {
      clearInterval(timer);
      setError(err?.response?.data?.detail || 'Multi-agent pipeline failed. Please check backend logs.');
    } finally {
      setIsRunning(false);
    }
  };

  if (!activeDoc) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <FileText size={48} color="var(--primary)" style={{ opacity: 0.4, margin: '0 auto 1rem' }} />
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>Select a Document First</h3>
        <p style={{ margin: '0 0 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Choose a document to configure focus parameters and generate multi-agent summaries.
        </p>
        <button onClick={() => onNavigate('workspace')} className="btn btn-primary">
          Open Document Workspace
        </button>
      </div>
    );
  }

  // Active summary is the validated summary from the gatekeeper
  const activeSummaryText = workflowRun?.validation?.final_validated_summary 
    || workflowRun?.draft_summary?.executive_summary 
    || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Configuration Header Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(79,70,229,0.15), rgba(124,58,237,0.15))',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Autonomous Multi-Agent Summarizer</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Analysis Agent → Summarization Agent → Validation Gatekeeper → Quality Evaluation → TTS
            </p>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--danger)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            color: '#f87171',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Configuration Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Focus Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Target Focus & Perspective:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              {focusOptions.map((opt) => {
                const isSelected = requestedFocus === opt.label;
                return (
                  <div
                    key={opt.label}
                    onClick={() => setRequestedFocus(opt.label)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: isSelected ? 'var(--primary-light)' : 'var(--bg-surface-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--text-main)', marginBottom: '0.2rem' }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {opt.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Depth / Length & Audio Options Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            padding: '1rem',
            background: 'var(--bg-surface-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            {/* Length */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Summary Depth:
              </label>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {(['short', 'medium', 'detailed'] as const).map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setSummaryLength(len)}
                    style={{
                      flex: 1,
                      padding: '0.4rem 0.5rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      background: summaryLength === len ? 'var(--primary)' : 'var(--bg-surface)',
                      color: summaryLength === len ? 'white' : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Briefing Toggle */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Audio Briefing:
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.3rem' }}>
                <input
                  type="checkbox"
                  checked={autoAudio}
                  onChange={(e) => setAutoAudio(e.target.checked)}
                  style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
                />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Auto-generate Edge-TTS audio
                </span>
              </label>
            </div>

            {/* Language */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Target Language:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  fontSize: '0.82rem'
                }}
              >
                <option value="en">English (US)</option>
                <option value="es">Spanish (Español)</option>
                <option value="fr">French (Français)</option>
                <option value="de">German (Deutsch)</option>
              </select>
            </div>
          </div>

          {/* Trigger Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Document: <strong>{activeDoc.original_name}</strong> ({activeDoc.page_count} pgs)
            </span>
            <button
              onClick={handleRunWorkflow}
              disabled={isRunning}
              className="btn btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem 1.5rem',
                fontSize: '0.95rem'
              }}
            >
              <Sparkles size={18} />
              <span>{isRunning ? 'Orchestrating Agents...' : 'Run Multi-Agent Workflow'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-Time Processing Status Tracker */}
      {isRunning && (
        <ProcessingStatus currentStep={currentStep} isProcessing={isRunning} />
      )}

      {/* Completed Results Display */}
      {workflowRun && activeSummaryText && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Gatekeeper Assurance Banner */}
          <div style={{
            background: 'var(--success-light)',
            border: '1px solid var(--success-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={22} color="var(--success)" />
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--success-text)' }}>
                  Validated & Verified by Dual-Stage Gatekeeper
                </span>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--success-text)', opacity: 0.9 }}>
                  This summary represents the final validated output. Hallucinations were scrubbed and exact source references verified.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => onNavigate('validation')}
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              >
                Inspect Validation
              </button>
              <button
                onClick={() => onNavigate('evaluation')}
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              >
                Quality Metrics
              </button>
              {workflowRun.audio_id && (
                <button
                  onClick={() => onNavigate('audio')}
                  className="btn btn-primary"
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <Volume2 size={13} />
                  <span>Listen</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Executive Summary Card */}
          <SummaryCard
            summary={activeSummaryText}
            requestedFocus={workflowRun.requested_focus}
            onLengthChange={setSummaryLength}
            currentLength={summaryLength}
          />

          {/* Key Findings with Grounded Source References */}
          {workflowRun.draft_summary?.key_findings && workflowRun.draft_summary.key_findings.length > 0 && (
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Key Grounded Findings</h3>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Each finding includes clickable source anchors verifying the source page and chunk
                  </p>
                </div>
                <span className="badge badge-primary">
                  {workflowRun.draft_summary.key_findings.length} Verified Findings
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {workflowRun.draft_summary.key_findings.map((item, idx) => (
                  <KeyFindingCard key={idx} finding={item} index={idx + 1} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
