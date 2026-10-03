import React, { useState } from 'react';
import { Layers, AlertTriangle, CheckSquare, Award, HelpCircle, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { WorkflowRunResponse, FactItem, RiskItem, DecisionItem, RecommendationItem, ActionItem } from '../types/api';
import { NavTab } from '../components/Sidebar';

interface IntelligenceViewProps {
  workflowRun: WorkflowRunResponse | null;
  onNavigate: (tab: NavTab) => void;
}

export const IntelligenceView: React.FC<IntelligenceViewProps> = ({ workflowRun, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'facts' | 'risks' | 'decisions' | 'recommendations' | 'actions'>('facts');

  const analysis = workflowRun?.analysis;

  if (!workflowRun || !analysis) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <Layers size={48} color="var(--primary)" style={{ opacity: 0.4, margin: '0 auto 1rem' }} />
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>No Extracted Intelligence Yet</h3>
        <p style={{ margin: '0 0 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Execute the Autonomous Multi-Agent Summarizer to trigger the Document Analysis Agent.
        </p>
        <button onClick={() => onNavigate('summary')} className="btn btn-primary">
          Run Multi-Agent Summarizer
        </button>
      </div>
    );
  }

  const factsCount = analysis.key_facts?.length || 0;
  const risksCount = analysis.risks?.length || 0;
  const decisionsCount = analysis.decisions?.length || 0;
  const recsCount = analysis.recommendations?.length || 0;
  const actionsCount = analysis.action_items?.length || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Layers size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Document Analysis Agent Intelligence</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Structured facts, risks, decisions, and action items extracted with exact page attribution
            </p>
          </div>
        </div>

        {/* Intelligence Category Switcher Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <button
            onClick={() => setActiveTab('facts')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'facts' ? 'var(--primary)' : 'var(--bg-surface-secondary)',
              color: activeTab === 'facts' ? 'white' : 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>Key Facts ({factsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('risks')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'risks' ? 'var(--primary)' : 'var(--bg-surface-secondary)',
              color: activeTab === 'risks' ? 'white' : 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>Risks & Vulnerabilities ({risksCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('decisions')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'decisions' ? 'var(--primary)' : 'var(--bg-surface-secondary)',
              color: activeTab === 'decisions' ? 'white' : 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>Decisions ({decisionsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'recommendations' ? 'var(--primary)' : 'var(--bg-surface-secondary)',
              color: activeTab === 'recommendations' ? 'white' : 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>Recommendations ({recsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('actions')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'actions' ? 'var(--primary)' : 'var(--bg-surface-secondary)',
              color: activeTab === 'actions' ? 'white' : 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>Action Items ({actionsCount})</span>
          </button>
        </div>
      </div>

      {/* Facts View */}
      {activeTab === 'facts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {analysis.key_facts?.map((fact: FactItem, idx: number) => (
            <div key={idx} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {fact.fact}
                </span>
                <span className="badge badge-primary" style={{ whiteSpace: 'nowrap' }}>
                  Page {fact.page ?? 'N/A'}
                </span>
              </div>
              {fact.evidence && (
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  background: 'var(--bg-surface-secondary)',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic'
                }}>
                  <strong>Evidence:</strong> "{fact.evidence}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Risks View */}
      {activeTab === 'risks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {analysis.risks?.map((risk: RiskItem, idx: number) => {
            const isHigh = risk.severity?.toLowerCase().includes('high');
            return (
              <div key={idx} className="card" style={{ borderLeft: `4px solid ${isHigh ? 'var(--danger)' : 'var(--warning)'}`, padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={16} color={isHigh ? 'var(--danger)' : 'var(--warning)'} />
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {risk.risk}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <span className={`badge ${isHigh ? 'badge-danger' : 'badge-warning'}`}>
                      Severity: {risk.severity}
                    </span>
                    <span className="badge badge-neutral">Page {risk.page ?? 'N/A'}</span>
                  </div>
                </div>
                {risk.impact && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                    <strong>Potential Impact:</strong> {risk.impact}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Decisions View */}
      {activeTab === 'decisions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {analysis.decisions?.map((d: DecisionItem, idx: number) => (
            <div key={idx} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>{d.decision}</span>
                <span className="badge badge-primary">Page {d.page ?? 'N/A'}</span>
              </div>
              {d.rationale && (
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                  <strong>Rationale:</strong> {d.rationale}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Recommendations View */}
      {activeTab === 'recommendations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {analysis.recommendations?.map((rec: RecommendationItem, idx: number) => (
            <div key={idx} className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>{rec.recommendation}</span>
                <span className="badge badge-primary">Page {rec.page ?? 'N/A'}</span>
              </div>
              {rec.suggested_by && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  <strong>Suggested By:</strong> {rec.suggested_by}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Action Items View */}
      {activeTab === 'actions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {analysis.action_items?.map((item: ActionItem, idx: number) => (
            <div key={idx} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckSquare size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>{item.action}</span>
                </div>
                <span className="badge badge-neutral">Page {item.page ?? 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {item.owner && <span><strong>Owner:</strong> {item.owner}</span>}
                {item.deadline && <span><strong>Deadline:</strong> {item.deadline}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
