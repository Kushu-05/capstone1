import React from 'react';
import { X, UploadCloud } from 'lucide-react';
import { FileUploader } from './FileUploader';
import { DocumentUploadResponse } from '../types/api';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (uploadData: DocumentUploadResponse) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUploadSuccess }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '680px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-glow)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(99, 102, 241, 0.2)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(8, 11, 17, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <UploadCloud size={20} color="var(--primary)" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Ingest New Document</h3>
          </div>

          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: '0.4rem', borderRadius: 'var(--radius-md)' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          <FileUploader
            onUploadSuccess={(data) => {
              onUploadSuccess(data);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};
