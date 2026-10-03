import React from 'react';
import { FileQuestion, AlertCircle, Loader2 } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <div style={{
      padding: '3rem 2rem',
      textAlign: 'center',
      background: 'var(--bg-card)',
      borderRadius: '12px',
      border: '1px dashed var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        marginBottom: '0.5rem'
      }}>
        {icon || <FileQuestion size={28} />}
      </div>
      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p style={{ margin: 0, maxWidth: '440px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn btn-primary"
          style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading intelligence data...' }) => {
  return (
    <div style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      color: 'var(--text-muted)'
    }}>
      <Loader2 size={36} className="spin" color="var(--primary)" />
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{message}</p>
    </div>
  );
};

export const ErrorMessage: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => {
  return (
    <div style={{
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid var(--danger)',
      borderRadius: '8px',
      padding: '1rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      color: '#f87171'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <AlertCircle size={20} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.88rem' }}>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-secondary"
          style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', whiteSpace: 'nowrap' }}
        >
          Retry
        </button>
      )}
    </div>
  );
};
