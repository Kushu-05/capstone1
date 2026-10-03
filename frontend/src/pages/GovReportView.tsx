import React, { useState, useEffect } from 'react';
import { BookOpenCheck, Award, Play, CheckCircle2, FileText, BarChart3, AlertCircle } from 'lucide-react';
import { GovReportSample, GovReportEvalResponse } from '../types/api';
import { api } from '../services/api';

export const GovReportView: React.FC = () => {
  const [samples, setSamples] = useState<GovReportSample[]>([]);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<GovReportEvalResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSamples();
  }, []);

  const loadSamples = async () => {
    try {
      const data = await api.getGovReportSamples();
      setSamples(data);
      if (data && data.length > 0) {
        setSelectedSampleId(data[0].id);
      }
    } catch (err) {
      console.error("Failed to load GovReport samples:", err);
      setError("Failed to load benchmark samples from backend.");
    }
  };

  const handleRunEval = async () => {
    if (!selectedSampleId) return;
    setIsRunning(true);
    setError(null);
    try {
      const data = await api.runGovReportEval(selectedSampleId);
      setResult(data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to execute GovReport benchmark evaluation.");
    } finally {
      setIsRunning(false);
    }
  };

  const selectedSample = samples.find(s => s.id === selectedSampleId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Benchmark Banner */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
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
            <BookOpenCheck size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>GovReport Academic Benchmark Suite</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Evaluate multi-agent summaries against standard GAO (Government Accountability Office) & CRS long-document reference datasets
            </p>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--danger)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            color: '#f87171',
            fontSize: '0.85rem'
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Select Benchmark Report:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {samples.map((s) => {
                const isSelected = selectedSampleId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSampleId(s.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: isSelected ? 'var(--primary-light)' : 'var(--bg-surface-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span className="badge badge-primary">{s.agency || 'Federal Agency'}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.id}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {s.word_count?.toLocaleString()} words • Published {s.publication_date || '2023'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button
              onClick={handleRunEval}
              disabled={isRunning || !selectedSampleId}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.5rem' }}
            >
              <Play size={16} />
              <span>{isRunning ? 'Evaluating Multi-Agent Pipeline on GovReport...' : 'Run Benchmark Evaluation'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Benchmark Results */}
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Top Result Banner */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(79,70,229,0.06), rgba(124,58,237,0.06))',
            border: '1px solid var(--primary-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                    GovReport Benchmark Score: {Math.round(result.overall_quality_score * 100)}%
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Dataset: {result.dataset_name} • Sample: {result.sample_id} ({result.agency})
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="badge badge-success">Factual: {Math.round(result.factual_consistency_score * 100)}%</span>
                <span className="badge badge-primary">Grounded: {Math.round(result.groundedness_score * 100)}%</span>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {result.evaluation_summary}
            </p>
          </div>

          {/* Academic Metric Grid */}
          <div className="grid-3">
            {[
              { label: 'Relevance', score: result.relevance_score, desc: 'Alignment with reference themes' },
              { label: 'Completeness', score: result.completeness_score, desc: 'Key finding and risk coverage' },
              { label: 'Factual Consistency', score: result.factual_consistency_score, desc: 'Zero hallucinated numbers/claims' },
              { label: 'Source Groundedness', score: result.groundedness_score, desc: 'Traceability to original text chunks' },
              { label: 'Validation Accuracy', score: result.validation_accuracy_score, desc: 'Post-gatekeeper verification score' },
              { label: 'Overall Quality Index', score: result.overall_quality_score, desc: 'Harmonic weighted performance' },
            ].map((m, idx) => {
              const percent = Math.round(m.score * 100);
              return (
                <div key={idx} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{m.label}</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{percent}%</span>
                  </div>
                  <div className="progress-bar-bg" style={{ marginBottom: '0.5rem' }}>
                    <div className="progress-bar-fill" style={{ width: `${percent}%`, background: 'var(--primary)' }} />
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Length & Details Table */}
          <div className="card">
            <h4 style={{ margin: '0 0 1rem', fontSize: '0.95rem', fontWeight: 700 }}>Summary Length & Compression Ratio</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              padding: '1rem',
              background: 'var(--bg-surface-secondary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Human Reference Length</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{result.reference_summary_length} words</div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>AI Generated Summary Length</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>{result.generated_summary_length} words</div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Length Fidelity</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--success)' }}>
                  {Math.round((result.generated_summary_length / (result.reference_summary_length || 1)) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
