import React, { useState } from 'react';
import { Bookmark, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { SourceReferenceItem } from '../types/api';

interface SourceReferenceProps {
  references: SourceReferenceItem[];
}

export const SourceReference: React.FC<SourceReferenceProps> = ({ references }) => {
  const [expanded, setExpanded] = useState(false);

  if (!references || references.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '0.6rem' }}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--primary)',
          background: 'var(--primary-light)',
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--primary-border)'
        }}
      >
        <Bookmark size={12} />
        <span>{references.length} Grounded Source Citation{references.length > 1 ? 's' : ''}</span>
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {expanded && (
        <div style={{
          marginTop: '0.5rem',
          padding: '0.75rem 1rem',
          background: 'var(--bg-surface-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          fontSize: '0.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {references.map((ref, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <FileText size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                  Page {ref.page} · {ref.section || 'General'}:
                </span>{' '}
                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  "{ref.quote_or_topic}"
                </span>
                <span style={{ display: 'inline-block', marginLeft: '0.4rem', fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                  [{ref.chunk_id}]
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
