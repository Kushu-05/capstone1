import React, { useState, useRef } from 'react';
import { UploadCloud, File, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { DocumentUploadResponse } from '../types/api';

interface FileUploaderProps {
  onUploadSuccess: (uploadData: DocumentUploadResponse) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setErrorMsg(null);
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'docx', 'txt', 'png', 'jpg', 'jpeg', 'webp', 'bmp', 'tiff', 'tif', 'mp3', 'wav', 'm4a', 'ogg'].includes(ext || '')) {
      setErrorMsg(`Unsupported file type '.${ext}'. Please upload a PDF, DOCX, TXT, Image (PNG, JPG, WEBP), or Audio file (.mp3, .wav, .m4a).`);
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('File exceeds the 25MB maximum upload limit.');
      return;
    }

    setSelectedFile(file);
    startUpload(file);
  };

  const startUpload = async (file: File) => {
    setIsUploading(true);
    setUploadPercent(0);
    setErrorMsg(null);

    try {
      const res = await api.uploadDocument(file, (percent) => {
        setUploadPercent(percent);
      });
      setIsUploading(false);
      onUploadSuccess(res);
    } catch (err: any) {
      setIsUploading(false);
      const message = err.response?.data?.detail || err.message || 'Upload failed.';
      setErrorMsg(message);
    }
  };

  return (
    <div className="card" style={{ padding: '2rem' }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,.webp,.bmp,.tiff,.mp3,.wav,.m4a,.ogg"
        style={{ display: 'none' }}
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--border-color)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem',
          textAlign: 'center',
          background: isDragging ? 'var(--primary-light)' : 'var(--bg-surface-secondary)',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: 'var(--radius-full)',
          background: isDragging ? 'var(--primary)' : 'white',
          color: isDragging ? 'white' : 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {isUploading ? (
            <Loader2 size={28} className="animate-spin" />
          ) : (
            <UploadCloud size={28} />
          )}
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
          {isUploading ? 'Ingesting & Indexing Content...' : 'Drag & Drop your document, image, or audio here'}
        </h3>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', maxWidth: '420px' }}>
          Upload documents (PDF, DOCX, TXT), images (PNG, JPG, WEBP), or voice recordings (.mp3, .wav, .m4a). The system will transcribe audio, run OCR on images, extract text, preserve structure, and build a local vector index.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <span className="badge badge-primary">PDF</span>
          <span className="badge badge-primary">DOCX</span>
          <span className="badge badge-primary">TXT</span>
          <span className="badge badge-primary">Images (PNG/JPG/WEBP)</span>
          <span className="badge badge-primary">Voice Audio (.mp3/.wav/.m4a)</span>
          <span className="badge badge-neutral">Max 25MB</span>
        </div>

        {!isUploading && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            <File size={16} />
            Browse Files from Computer
          </button>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div style={{ width: '100%', maxWidth: '380px', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              <span>Uploading & Parsing...</span>
              <span>{uploadPercent}%</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${uploadPercent}%`, background: 'var(--primary)' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--danger-light)',
          border: '1px solid var(--danger-border)',
          color: 'var(--danger-text)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.85rem'
        }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
