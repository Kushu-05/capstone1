import React from 'react';
import { CheckCircle2, Loader2, AlertCircle, Sparkles, ShieldCheck, FileSearch, Layers, Headphones, Award } from 'lucide-react';

export interface WorkflowStage {
  id: string;
  name: string;
  agentTitle: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

interface ProcessingStatusProps {
  stages?: WorkflowStage[];
  currentStep?: number;
  isProcessing?: boolean;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  stages,
  currentStep = 0,
  isProcessing = false
}) => {
  const defaultStages: WorkflowStage[] = [
    {
      id: 'ingestion',
      name: 'Structural Ingestion',
      agentTitle: 'PyMuPDF Document Ingestor',
      description: 'Preserving hierarchy, page breaks, sections and tokenized vector chunks',
      icon: <FileSearch size={18} />,
      status: currentStep > 0 ? 'completed' : isProcessing && currentStep === 0 ? 'running' : 'pending'
    },
    {
      id: 'analysis',
      name: 'Document Analysis Agent',
      agentTitle: 'Autonomous Analysis Agent',
      description: 'Deep-scanning chunks for key facts, severity-tagged risks, decisions, and action items',
      icon: <Layers size={18} />,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'running' : 'pending'
    },
    {
      id: 'draft',
      name: 'Summarization Agent',
      agentTitle: 'Grounded Summarizer',
      description: 'Synthesizing context-aware executive briefing with exact page & chunk citations',
      icon: <Sparkles size={18} />,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'running' : 'pending'
    },
    {
      id: 'validation',
      name: 'Validation Gatekeeper',
      agentTitle: 'Summary Validation Agent',
      description: 'Auditing claims against source chunks, scrubbing hallucinations, certifying TTS',
      icon: <ShieldCheck size={18} />,
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'running' : 'pending'
    },
    {
      id: 'evaluation',
      name: 'Quality Evaluation Agent',
      agentTitle: 'Academic Metric Evaluator',
      description: 'Scoring 6 dimensions: Relevance, Completeness, Consistency, Groundedness, Quality, Accuracy',
      icon: <Award size={18} />,
      status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'running' : 'pending'
    },
    {
      id: 'tts',
      name: 'Edge-TTS Voice Briefing',
      agentTitle: 'Neural Voice Engine',
      description: 'Compiling gatekeeper-certified validated text into executive speech',
      icon: <Headphones size={18} />,
      status: currentStep >= 5 ? 'completed' : currentStep === 5 ? 'running' : 'pending'
    }
  ];

  const activeStages = stages || defaultStages;

  return (
    <div className="card" style={{
      background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(24, 33, 58, 0.9) 100%)',
      border: '1px solid var(--border-glow)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Sparkles size={16} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Autonomous Multi-Agent Orchestration</h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Sequential A2A handoff protocol • Live execution monitor
            </p>
          </div>
        </div>

        {isProcessing && (
          <span className="badge badge-primary pulse-glow" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem' }}>
            <Loader2 size={13} className="spin" />
            <span>Agents Active</span>
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
        {activeStages.map((stage, idx) => {
          const isRunning = stage.status === 'running';
          const isCompleted = stage.status === 'completed';

          return (
            <div
              key={stage.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                padding: '0.9rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: isRunning 
                  ? 'rgba(99, 102, 241, 0.15)' 
                  : isCompleted 
                  ? 'rgba(16, 185, 129, 0.08)' 
                  : 'rgba(15, 23, 42, 0.6)',
                border: `1px solid ${
                  isRunning 
                    ? 'rgba(99, 102, 241, 0.5)' 
                    : isCompleted 
                    ? 'rgba(16, 185, 129, 0.3)' 
                    : 'var(--border-subtle)'
                }`,
                boxShadow: isRunning ? '0 0 15px rgba(99, 102, 241, 0.25)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                color: isRunning ? '#818CF8' : isCompleted ? '#34D399' : 'var(--text-light)',
                marginTop: '2px',
                flexShrink: 0
              }}>
                {isRunning ? <Loader2 size={18} className="spin" /> : isCompleted ? <CheckCircle2 size={18} /> : stage.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: isRunning ? '#C7D2FE' : isCompleted ? '#A7F3D0' : 'var(--text-secondary)'
                  }}>
                    {stage.name}
                  </span>
                  <span className={`badge ${
                    isCompleted ? 'badge-success' : isRunning ? 'badge-primary' : 'badge-neutral'
                  }`} style={{ fontSize: '0.65rem', padding: '0.12rem 0.45rem' }}>
                    {stage.status.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                  {stage.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
