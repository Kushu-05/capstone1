import React from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, AlertCircle, Info, FileCheck, Check } from 'lucide-react';
import { ValidationResult } from '../types/api';

interface ValidationPanelProps {
  validation: ValidationResult;
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({ validation }) => {
  const consistencyPercent = Math.round((validation.factual_consistency_score || 0) * 100);
  const groundednessPercent = Math.round((validation.groundedness_score || 0) * 100);
  const accuracyPercent = Math.round((validation.validation_accuracy_score || 0) * 100);
  const isApproved = validation.is_approved_for_tts;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Gatekeeper Status Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        background: isApproved 
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.08) 100%)' 
          : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.08) 100%)',
        border: `1px solid ${isApproved ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
        boxShadow: isApproved ? '0 0 25px rgba(16, 185, 129, 0.15)' : '0 0 25px rgba(239, 68, 68, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-full)',
            background: isApproved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            color: isApproved ? '#34D399' : '#F87171',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: `1px solid ${isApproved ? '#34D399' : '#F87171'}`
          }}>
            {isApproved ? <ShieldCheck size={26} /> : <ShieldAlert size={26} />}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: isApproved ? '#6EE7B7' : '#FCA5A5' }}>
                {isApproved ? 'GATEKEEPER APPROVED • TTS SPEECH AUTHORIZED' : 'GATEKEEPER REJECTED • BLOCKED FROM AUDIO'}
              </h3>
            </div>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {isApproved
                ? 'All factual assertions, figures, and dates are corroborated by source document chunks. Zero critical hallucinations detected.'
                : 'Factual consistency threshold was not met. Draft summary was quarantined to protect audio output integrity.'}
            </p>
          </div>
        </div>

        <span className={`badge ${isApproved ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
          {isApproved ? 'PASSED AUDIT' : 'FAILED AUDIT'}
        </span>
      </div>

      {/* 3 Metric Score Gauges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {/* Metric 1 */}
        <div style={{
          background: 'rgba(8, 11, 17, 0.65)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Factual Consistency</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: consistencyPercent >= 80 ? '#34D399' : '#FBBF24' }}>
              {consistencyPercent}%
            </span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${consistencyPercent}%`,
              background: consistencyPercent >= 80 ? 'linear-gradient(90deg, #10B981, #34D399)' : 'linear-gradient(90deg, #F59E0B, #FBBF24)',
              borderRadius: '3px'
            }} />
          </div>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.6rem', lineHeight: 1.4 }}>
            Verifies that zero dates, amounts, or statements contradict original source text.
          </p>
        </div>

        {/* Metric 2 */}
        <div style={{
          background: 'rgba(8, 11, 17, 0.65)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Source Groundedness</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#818CF8' }}>
              {groundednessPercent}%
            </span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${groundednessPercent}%`,
              background: 'linear-gradient(90deg, #6366F1, #818CF8)',
              borderRadius: '3px'
            }} />
          </div>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.6rem', lineHeight: 1.4 }}>
            Direct alignment with verified document chunks, sections, and page references.
          </p>
        </div>

        {/* Metric 3 */}
        <div style={{
          background: 'rgba(8, 11, 17, 0.65)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Validation Accuracy</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: accuracyPercent >= 80 ? '#34D399' : '#FBBF24' }}>
              {accuracyPercent}%
            </span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${accuracyPercent}%`,
              background: accuracyPercent >= 80 ? 'linear-gradient(90deg, #10B981, #34D399)' : 'linear-gradient(90deg, #F59E0B, #FBBF24)',
              borderRadius: '3px'
            }} />
          </div>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.6rem', lineHeight: 1.4 }}>
            Composite safety audit score calculated by the Summary Validation Agent.
          </p>
        </div>
      </div>

      {/* Scrubbed Hallucinations & Claims Audit Log */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Scrubbed / Flagged Claims Audit Log</span>
            <span className="badge badge-neutral">{validation.unsupported_claims?.length || 0}</span>
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Unverified statements automatically modified or removed
          </span>
        </div>

        {validation.unsupported_claims && validation.unsupported_claims.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {validation.unsupported_claims.map((claim, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <AlertTriangle size={16} color="#FBBF24" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FDE68A' }}>
                    "{claim.claim}"
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '1.6rem' }}>
                  <strong style={{ color: 'var(--text-secondary)' }}>Audit Reason:</strong> {claim.reason}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#818CF8', marginLeft: '1.6rem', marginTop: '0.25rem', fontWeight: 600 }}>
                  <strong>Gatekeeper Action:</strong> {claim.action_taken}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#6EE7B7',
            fontSize: '0.88rem'
          }}>
            <CheckCircle2 size={20} color="#34D399" />
            <span>
              <strong>Zero Unsupported Claims:</strong> 100% of factual statements in the summary are traceable to verified document chunks.
            </span>
          </div>
        )}
      </div>

      {/* Contradictions Detected */}
      {validation.contradictions && validation.contradictions.length > 0 && (
        <div>
          <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', fontWeight: 700, color: '#F87171' }}>
            Contradictions Detected & Corrected
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {validation.contradictions.map((c, i) => (
              <div key={i} style={{ padding: '0.85rem 1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.3)', fontSize: '0.82rem' }}>
                <div style={{ color: '#FCA5A5', fontWeight: 600 }}>Claim: {c.claim}</div>
                <div style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>Counter-evidence: {c.contradicting_evidence}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
