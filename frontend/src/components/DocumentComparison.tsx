import React, { useState } from 'react';
import { GitCompare, CheckCircle2, AlertTriangle, Sparkles, BookOpen, Layers } from 'lucide-react';
import { DocumentDetail, CompareResponse } from '../types/api';
import { api } from '../services/api';

interface DocumentComparisonProps {
  documents: DocumentDetail[];
}

export const DocumentComparison: React.FC<DocumentComparisonProps> = ({ documents }) => {
  const [doc1Id, setDoc1Id] = useState<string>(documents[0]?.id || '');
  const [doc2Id, setDoc2Id] = useState<string>(documents[1]?.id || documents[0]?.id || '');
  const [isComparing, setIsComparing] = useState(false);
  const [result, setResult] = useState<CompareResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    if (!doc1Id || !doc2Id) {
      setError('Please select two documents to compare.');
      return;
    }
    if (doc1Id === doc2Id) {
      setError('Please select two distinct documents to perform comparative analysis.');
      return;
    }

    setIsComparing(true);
    setError(null);
    try {
      const data = await api.compareDocuments(doc1Id, doc2Id);
      setResult(data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Failed to compare documents. Please try again.');
    } finally {
      setIsComparing(false);
    }
  };

  const doc1 = documents.find(d => d.id === doc1Id);
  const doc2 = documents.find(d => d.id === doc2Id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Selector Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.15))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <GitCompare size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 600 }}>Cross-Document Comparison</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Compare two reports side-by-side for overlapping themes, contrasting findings, and key divergences
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
            fontSize: '0.85rem'
          }}>
            {error}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          alignItems: 'center'
        }}>
          {/* Doc 1 Select */}
          <div style={{
            background: 'var(--bg-surface-secondary)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Base Document (A)
            </label>
            <select
              value={doc1Id}
              onChange={(e) => setDoc1Id(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '6px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                fontSize: '0.85rem'
              }}
            >
              {documents.map(d => (
                <option key={d.id} value={d.id}>
                  {d.original_name} ({d.page_count} pgs · {d.word_count} wds)
                </option>
              ))}
            </select>
            {doc1 && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Type: {doc1.file_type.toUpperCase()} · {doc1.total_chunks} chunks indexed
              </div>
            )}
          </div>

          {/* Doc 2 Select */}
          <div style={{
            background: 'var(--bg-surface-secondary)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Target Document (B)
            </label>
            <select
              value={doc2Id}
              onChange={(e) => setDoc2Id(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '6px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                fontSize: '0.85rem'
              }}
            >
              {documents.map(d => (
                <option key={d.id} value={d.id}>
                  {d.original_name} ({d.page_count} pgs · {d.word_count} wds)
                </option>
              ))}
            </select>
            {doc2 && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Type: {doc2.file_type.toUpperCase()} · {doc2.total_chunks} chunks indexed
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleCompare}
            disabled={isComparing || documents.length < 2}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.5rem' }}
          >
            <Sparkles size={16} />
            <span>{isComparing ? 'Analyzing Comparative Divergences...' : 'Run Comparative Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Comparison Results */}
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Executive Comparative Takeaway */}
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.05), rgba(124,58,237,0.05))' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Comparative Executive Synthesis
              </span>
              <span className="badge badge-primary">
                {result.doc1.name} ↔ {result.doc2.name}
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {result.comparison_summary}
            </p>
          </div>

          {/* Similarities vs Differences Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}>
            {/* Similarities Column */}
            <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <CheckCircle2 size={18} color="var(--success)" />
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  Common Ground & Overlapping Points
                </h4>
              </div>

              {result.similarities && result.similarities.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {result.similarities.map((item, idx) => (
                    <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>No strong direct similarities detected.</p>
              )}
            </div>

            {/* Differences Column */}
            <div className="card" style={{ borderLeft: '4px solid var(--warning)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <AlertTriangle size={18} color="var(--warning)" />
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  Contrasts & Key Differences
                </h4>
              </div>

              {result.differences && result.differences.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {result.differences.map((item, idx) => (
                    <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>No significant contradictions or divergences found.</p>
              )}
            </div>
          </div>

          {/* Highlights for each document */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <BookOpen size={16} color="var(--primary)" />
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>Unique Highlights: {result.doc1.name}</h4>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {result.doc1_highlights?.map((h, i) => (
                  <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <BookOpen size={16} color="var(--secondary)" />
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>Unique Highlights: {result.doc2.name}</h4>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {result.doc2_highlights?.map((h, i) => (
                  <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
