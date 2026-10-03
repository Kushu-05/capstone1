import React, { useState } from 'react';
import { Download, Sparkles, ShieldCheck, Copy, Check, FileText } from 'lucide-react';
import { KeyFinding } from '../types/api';
import { KeyFindingCard } from './KeyFindingCard';

interface SummaryCardProps {
  summary?: string;
  executiveSummary?: string;
  keyFindings?: KeyFinding[];
  isValidated?: boolean;
  requestedFocus?: string;
  onLengthChange?: (length: 'short' | 'medium' | 'detailed') => void;
  currentLength?: 'short' | 'medium' | 'detailed';
  onRunWorkflow?: (focus: string, length: 'short' | 'medium' | 'detailed') => void;
  isRunningWorkflow?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  summary,
  executiveSummary,
  keyFindings,
  isValidated = true,
  requestedFocus = 'Comprehensive Executive Summary',
  onLengthChange,
  currentLength = 'medium',
  onRunWorkflow,
  isRunningWorkflow = false
}) => {
  const [copied, setCopied] = useState(false);
  const [customFocus, setCustomFocus] = useState(requestedFocus);

  const mainText = summary || executiveSummary || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(mainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([mainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'validated_executive_summary.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const wordCount = mainText.split(/\s+/).filter(Boolean).length;

  return (
    <div className="card" style={{ padding: '2rem' }}>
      {/* Header with Validation Badge & Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        paddingBottom: '1.25rem',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Validated Executive Summary
            </h2>
            {isValidated && (
              <span className="badge badge-success" style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}>
                <ShieldCheck size={14} />
                CERTIFIED SOURCE
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Synthesized by Summarization Agent & certified by Validation Agent • {wordCount} words
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {onLengthChange && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--bg-surface-secondary)', padding: '0.25rem 0.4rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginRight: '0.5rem' }}>
              {(['short', 'medium', 'detailed'] as const).map((len) => (
                <button
                  key={len}
                  type="button"
                  onClick={() => onLengthChange(len)}
                  style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: currentLength === len ? 700 : 400,
                    background: currentLength === len ? 'white' : 'transparent',
                    color: currentLength === len ? 'var(--primary)' : 'var(--text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: currentLength === len ? 'var(--shadow-sm)' : 'none',
                    textTransform: 'capitalize'
                  }}
                >
                  {len}
                </button>
              ))}
            </div>
          )}

          <button className="btn btn-secondary" onClick={handleCopy} title="Copy to clipboard">
            {copied ? <Check size={15} color="var(--success)" /> : <Copy size={15} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button className="btn btn-secondary" onClick={handleDownload} title="Download as text file">
            <Download size={15} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Focus Tag & Controls if onRunWorkflow is present */}
      {onRunWorkflow && (
        <div style={{
          background: 'var(--bg-surface-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Detail Level:</span>
              {(['short', 'medium', 'detailed'] as const).map((len) => (
                <button
                  key={len}
                  type="button"
                  onClick={() => onLengthChange ? onLengthChange(len) : null}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: currentLength === len ? 700 : 500,
                    background: currentLength === len ? 'white' : 'transparent',
                    color: currentLength === len ? 'var(--primary)' : 'var(--text-muted)',
                    boxShadow: currentLength === len ? 'var(--shadow-sm)' : 'none',
                    border: `1px solid ${currentLength === len ? 'var(--border-color)' : 'transparent'}`
                  }}
                >
                  {len === 'short' ? 'Small (200 words)' : len === 'medium' ? 'Medium (500 words)' : 'Detailed (1000 words)'}
                </button>
              ))}
            </div>

            <button
              className="btn btn-primary"
              disabled={isRunningWorkflow}
              onClick={() => onRunWorkflow(customFocus, currentLength)}
            >
              <Sparkles size={16} />
              <span>{isRunningWorkflow ? 'Synthesizing...' : 'Regenerate Summary'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Summary Content Body */}
      <div style={{
        fontSize: '0.94rem',
        lineHeight: 1.7,
        color: 'var(--text-main)',
        whiteSpace: 'pre-line',
        marginBottom: keyFindings && keyFindings.length > 0 ? '2rem' : 0,
        background: 'var(--bg-surface-secondary)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        borderLeft: '4px solid var(--primary)'
      }}>
        {mainText}
      </div>

      {/* Key Findings Section if provided */}
      {keyFindings && keyFindings.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Key Grounded Findings</span>
            <span className="badge badge-neutral">{keyFindings.length}</span>
          </h3>
          <div>
            {keyFindings.map((finding, idx) => (
              <KeyFindingCard key={idx} finding={finding} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
