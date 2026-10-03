import React from 'react';
import { Award, CheckCircle, BarChart3, Info } from 'lucide-react';
import { QualityMetrics } from '../types/api';

interface EvaluationPanelProps {
  evaluation: QualityMetrics;
}

export const EvaluationPanel: React.FC<EvaluationPanelProps> = ({ evaluation }) => {
  const metrics = [
    {
      key: 'relevance',
      label: 'Relevance',
      score: evaluation.relevance_score,
      desc: evaluation.metrics_explanation?.relevance || 'Measures contextual alignment with source reference themes.',
      color: '#4F46E5'
    },
    {
      key: 'completeness',
      label: 'Completeness',
      score: evaluation.completeness_score,
      desc: evaluation.metrics_explanation?.completeness || 'Evaluates coverage of key findings, risks, and recommendations.',
      color: '#0ea5e9'
    },
    {
      key: 'factual_consistency',
      label: 'Factual Consistency',
      score: evaluation.factual_consistency_score,
      desc: evaluation.metrics_explanation?.factual_consistency || 'Verifies that claims do not contradict source evidence.',
      color: '#10B981'
    },
    {
      key: 'groundedness',
      label: 'Source Groundedness',
      score: evaluation.groundedness_score,
      desc: evaluation.metrics_explanation?.groundedness || 'Assesses citation and anchor traceability in document text.',
      color: '#8B5CF6'
    },
    {
      key: 'validation_accuracy',
      label: 'Validation Accuracy',
      score: evaluation.validation_accuracy_score,
      desc: evaluation.metrics_explanation?.validation_accuracy || 'Reflects verified accuracy after the validation agent filter.',
      color: '#F59E0B'
    },
    {
      key: 'overall_quality',
      label: 'Overall Quality Index',
      score: evaluation.overall_quality_score,
      desc: evaluation.metrics_explanation?.overall_quality || 'Weighted composite assessment across all standard criteria.',
      color: '#4338CA'
    }
  ];

  const overallPercent = Math.round((evaluation.overall_quality_score || 0) * 100);

  return (
    <div className="card" style={{ padding: '2rem' }}>
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem',
        borderRadius: 'var(--radius-md)',
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
        border: '1px solid var(--primary-border)',
        marginBottom: '1.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)'
          }}>
            <Award size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Academic Quality & Evaluation Audit
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Multi-dimensional evaluation modeled after academic long-document summarization benchmarks.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
            {overallPercent}%
          </span>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Composite Score
          </div>
        </div>
      </div>

      {/* 6 Metric Cards */}
      <div className="grid-3" style={{ marginBottom: '1.75rem' }}>
        {metrics.map((m) => {
          const percent = Math.round((m.score || 0) * 100);
          return (
            <div
              key={m.key}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {m.label}
                </span>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: m.color }}>
                  {percent}%
                </span>
              </div>

              <div className="progress-bar-bg" style={{ marginBottom: '0.75rem' }}>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${percent}%`, background: m.color }}
                />
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {m.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Markdown / Rubric Details */}
      {evaluation.report_markdown && (
        <div style={{
          background: 'var(--bg-surface-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          border: '1px solid var(--border-color)',
          fontSize: '0.85rem',
          lineHeight: 1.6
        }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Evaluation Report Breakdown
          </h4>
          <div style={{ whiteSpace: 'pre-line', color: 'var(--text-main)' }}>
            {evaluation.report_markdown}
          </div>
        </div>
      )}
    </div>
  );
};
