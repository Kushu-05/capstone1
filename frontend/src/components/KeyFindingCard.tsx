import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { KeyFinding } from '../types/api';
import { SourceReference } from './SourceReference';

interface KeyFindingCardProps {
  finding: KeyFinding;
  index: number;
}

export const KeyFindingCard: React.FC<KeyFindingCardProps> = ({ finding, index }) => {
  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '1rem 1.25rem',
      marginBottom: '0.75rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: 700,
          flexShrink: 0,
          marginTop: '2px'
        }}>
          {index + 1}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.4 }}>
            {finding.finding}
          </div>
          <SourceReference references={finding.source_refs} />
        </div>
      </div>
    </div>
  );
};
