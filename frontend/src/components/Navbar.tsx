import React from 'react';
import { 
  Sparkles, MessageSquareText, GitCompare, BookOpenCheck, 
  Star, UploadCloud, CheckCircle2, ShieldAlert, FileText 
} from 'lucide-react';
import { DocumentDetail } from '../types/api';

export type MainNavTab = 'studio' | 'qa' | 'compare' | 'benchmark' | 'feedback';

interface NavbarProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  activeDoc: DocumentDetail | null;
  backendHealthy: boolean;
  onUploadClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  activeDoc,
  backendHealthy,
  onUploadClick
}) => {
  const navTabs = [
    { id: 'studio' as MainNavTab, label: 'Studio', icon: <Sparkles size={16} /> },
    { id: 'qa' as MainNavTab, label: 'Document Q&A', icon: <MessageSquareText size={16} /> },
    { id: 'compare' as MainNavTab, label: 'Comparison', icon: <GitCompare size={16} /> },
    { id: 'benchmark' as MainNavTab, label: 'GovReport Benchmark', icon: <BookOpenCheck size={16} /> },
    { id: 'feedback' as MainNavTab, label: 'Feedback', icon: <Star size={16} /> },
  ];

  return (
    <header className="app-header">
      {/* Brand & Active Doc */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.45)'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              DocVoice AI
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Document Intelligence Studio
            </div>
          </div>
        </div>

        {/* Active Document Pill */}
        {activeDoc && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.75rem',
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            maxWidth: '300px'
          }}>
            <FileText size={14} color="#818CF8" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {activeDoc.original_name}
            </span>
          </div>
        )}
      </div>

      {/* Center Navigation Tabs */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        background: 'rgba(15, 23, 42, 0.8)',
        padding: '0.25rem',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-subtle)'
      }}>
        {navTabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'white' : 'var(--text-muted)',
                background: isActive ? 'var(--primary-gradient)' : 'transparent',
                boxShadow: isActive ? '0 2px 10px rgba(99, 102, 241, 0.4)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Upload & Health */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <button
          onClick={onUploadClick}
          className="btn btn-primary"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', borderRadius: 'var(--radius-full)' }}
        >
          <UploadCloud size={15} />
          <span>Upload</span>
        </button>

        {/* Backend Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.35rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          background: backendHealthy ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          border: `1px solid ${backendHealthy ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          fontSize: '0.74rem',
          fontWeight: 600,
          color: backendHealthy ? '#34D399' : '#F87171'
        }}>
          <div style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: backendHealthy ? '#10B981' : '#EF4444',
            boxShadow: backendHealthy ? '0 0 8px #10B981' : '0 0 8px #EF4444'
          }} />
          <span>{backendHealthy ? 'FastAPI 8000' : 'Offline'}</span>
        </div>
      </div>
    </header>
  );
};
