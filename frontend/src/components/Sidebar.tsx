import React from 'react';
import {
  LayoutDashboard,
  UploadCloud,
  FileSearch,
  Sparkles,
  Layers,
  ShieldCheck,
  Award,
  Headphones,
  MessageSquareText,
  GitCompare,
  BookOpenCheck,
  Star
} from 'lucide-react';

export type NavTab =
  | 'dashboard'
  | 'upload'
  | 'workspace'
  | 'summary'
  | 'intelligence'
  | 'validation'
  | 'evaluation'
  | 'audio'
  | 'qa'
  | 'compare'
  | 'govreport'
  | 'feedback';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ReactNode;
  category?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'upload', label: 'Document Upload', icon: <UploadCloud size={18} /> },
    { id: 'workspace', label: 'Document Workspace', icon: <FileSearch size={18} /> },
    
    // Core Agent Workflow
    { id: 'summary', label: 'Multi-Agent Summary', icon: <Sparkles size={18} />, category: 'Agent Workflow' },
    { id: 'intelligence', label: 'Extracted Intelligence', icon: <Layers size={18} /> },
    { id: 'validation', label: 'Validation Gatekeeper', icon: <ShieldCheck size={18} /> },
    { id: 'evaluation', label: 'Quality Evaluation', icon: <Award size={18} /> },
    { id: 'audio', label: 'Audio Briefing (TTS)', icon: <Headphones size={18} /> },
    
    // Interactive & Academic
    { id: 'qa', label: 'Document Q&A', icon: <MessageSquareText size={18} />, category: 'Tools & Evaluation' },
    { id: 'compare', label: 'Document Compare', icon: <GitCompare size={18} /> },
    { id: 'govreport', label: 'GovReport Benchmark', icon: <BookOpenCheck size={18} /> },
    { id: 'feedback', label: 'User Feedback', icon: <Star size={18} /> }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div style={{
        padding: '1.5rem 1.5rem 1.25rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)'
        }}>
          <Sparkles size={20} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
            DocVoice AI
          </h1>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
            Document Intelligence
          </p>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
        {navItems.map((item, index) => {
          const isActive = activeTab === item.id;
          return (
            <React.Fragment key={item.id}>
              {item.category && (
                <div style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-light)',
                  padding: '1rem 0.75rem 0.4rem',
                  marginTop: index !== 0 ? '0.25rem' : 0
                }}>
                  {item.category}
                </div>
              )}
              <button
                onClick={() => onTabChange(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  marginBottom: '0.2rem',
                  textAlign: 'left'
                }}
              >
                <span style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div style={{
        padding: '1rem 1.25rem',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.75rem',
        color: 'var(--text-light)',
        background: 'var(--bg-surface)'
      }}>
        <div>AI Powered Multi-Agent System</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Gemini · PyMuPDF · Edge-TTS
        </div>
      </div>
    </aside>
  );
};
