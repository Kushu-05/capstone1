import React from 'react';
import { FileText, Sparkles, Headphones, Layers, UploadCloud, ArrowRight, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DashboardStats, DocumentDetail } from '../types/api';
import { DashboardCard } from '../components/DashboardCard';
import { NavTab } from '../components/Sidebar';

interface DashboardViewProps {
  stats: DashboardStats | null;
  onNavigate: (tab: NavTab) => void;
  onSelectDoc: (docId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ stats, onNavigate, onSelectDoc }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(124,58,237,0.08) 100%)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-primary">Enterprise Grade</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Grounding & Verification Engine</span>
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem' }}>
            AI-Powered Document Intelligence & Voice Assistant
          </h2>
          <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Upload PDFs, DOCX, TXT documents, or images (PNG, JPG, WEBP). Extract grounded intelligence, generate verifiable multi-agent summaries, audit factual consistency, and convert approved summaries into neural voice briefings.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('upload')}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem' }}
          >
            <UploadCloud size={18} />
            <span>Upload Document</span>
          </button>
          <button
            onClick={() => onNavigate('workspace')}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem' }}
          >
            <Layers size={18} />
            <span>Open Workspace</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid-4">
        <DashboardCard
          title="Indexed Documents"
          value={stats ? stats.total_documents : 0}
          icon={<FileText size={22} />}
          description="Processed in local vector store"
        />
        <DashboardCard
          title="Multi-Agent Workflows"
          value={stats ? stats.total_workflows : 0}
          icon={<Sparkles size={22} />}
          description="Analysis & synthesis cycles"
        />
        <DashboardCard
          title="Validated Audio Briefings"
          value={stats ? stats.total_audio_briefings : 0}
          icon={<Headphones size={22} />}
          description="Edge-TTS neural voice files"
        />
        <DashboardCard
          title="Total Words Indexed"
          value={stats ? stats.total_words_processed.toLocaleString() : '0'}
          icon={<Layers size={22} />}
          description="Preserving pages & sections"
        />
      </div>

      {/* Architecture Highlights & Safety Gatekeeper */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <ShieldCheck size={20} color="var(--success)" />
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Dual-Stage Validation Gatekeeper</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 1rem' }}>
            Summaries must pass the <strong>Summary Validation Agent</strong> before being eligible for Text-to-Speech synthesis. Any hallucinated claims, missing conditions, or numerical discrepancies are scrubbed and logged.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-success"><CheckCircle2 size={12} style={{ marginRight: '4px' }} /> Factual Consistency Check</span>
            <span className="badge badge-primary">Exact Citation Anchors</span>
            <span className="badge badge-neutral">Scrubbed Hallucinations Audit</span>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Sparkles size={20} color="var(--primary)" />
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Autonomous Multi-Agent Pipeline</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 1rem' }}>
            Engineered with strict A2A protocol: Document Analysis Agent extracts facts/risks/decisions → Summarization Agent crafts grounded draft → Validation Agent checks claims → Quality Agent computes academic metrics.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-neutral">Analysis Agent</span>
            <span className="badge badge-neutral">Draft Agent</span>
            <span className="badge badge-neutral">Validation Agent</span>
            <span className="badge badge-neutral">Evaluation Agent</span>
          </div>
        </div>
      </div>

      {/* Recent Documents Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Recently Ingested Documents</h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Select a document to inspect sections, run summarization, or chat
            </p>
          </div>
          <button
            onClick={() => onNavigate('workspace')}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {stats && stats.recent_documents && stats.recent_documents.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem 1.5rem' }}>Document Name</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Type</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Pages</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Words</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Uploaded</th>
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_documents.map((doc) => (
                  <tr
                    key={doc.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background 0.15s'
                    }}
                  >
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <FileText size={16} color="var(--primary)" />
                        <span>{doc.original_name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1rem' }}>
                      <span className="badge badge-neutral" style={{ textTransform: 'uppercase', fontSize: '0.72rem' }}>
                        {doc.file_type}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1rem', color: 'var(--text-secondary)' }}>
                      {doc.page_count}
                    </td>
                    <td style={{ padding: '1rem 1rem', color: 'var(--text-secondary)' }}>
                      {doc.word_count.toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem 1rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : 'Recent'}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <button
                        onClick={() => {
                          onSelectDoc(doc.id);
                          onNavigate('summary');
                        }}
                        className="btn btn-primary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <Sparkles size={12} />
                        <span>Summarize</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <FileText size={32} style={{ opacity: 0.4, margin: '0 auto 0.5rem' }} />
            <p style={{ margin: 0, fontSize: '0.9rem' }}>No documents uploaded yet.</p>
            <button
              onClick={() => onNavigate('upload')}
              className="btn btn-primary"
              style={{ marginTop: '1rem', fontSize: '0.82rem' }}
            >
              Upload Your First Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
