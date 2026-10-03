import React, { useState } from 'react';
import { Send, Bot, User, BookOpen, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';
import { QAResponse, QASource } from '../types/api';
import { api } from '../services/api';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: QASource[];
}

interface ChatInterfaceProps {
  documentId: string;
  documentTitle?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  documentId,
  documentTitle = 'Current Document'
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am your Document Intelligence Assistant. You can ask me any question regarding "${documentTitle}". Every answer is strictly grounded in verified source chunks with exact citations.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState<{ [key: string]: boolean }>({});

  const sampleQuestions = [
    'What are the core findings and conclusions?',
    'What recommendations or next steps are outlined?',
    'Are there any compliance or regulatory risks noted?',
    'What key numbers or metrics are reported?'
  ];

  const handleSend = async (queryToSend?: string) => {
    const q = (queryToSend || inputQuery).trim();
    if (!q || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response: QAResponse = await api.askQuestion(documentId, q);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: err?.response?.data?.detail || 'Error retrieving grounded answer from knowledge base.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSourceExpand = (msgId: string) => {
    setExpandedSources(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '720px', padding: 0, overflow: 'hidden' }}>
      {/* Chat Header */}
      <div style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(8, 11, 17, 0.7)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)'
          }}>
            <Bot size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Grounded Document Q&A</h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Source citations embedded • Zero external hallucinations
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="btn btn-secondary"
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
        >
          Clear History
        </button>
      </div>

      {/* Chat Messages Body */}
      <div style={{
        flex: 1,
        padding: '1.5rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
              {msg.sender === 'user' ? (
                <>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{msg.timestamp}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>You</span>
                  <User size={13} color="var(--primary)" />
                </>
              ) : (
                <>
                  <Bot size={13} color="#818CF8" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#818CF8' }}>DocVoice AI</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{msg.timestamp}</span>
                </>
              )}
            </div>

            <div
              style={{
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: msg.sender === 'user' ? 'var(--primary-gradient)' : 'rgba(15, 23, 42, 0.75)',
                color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-main)',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                boxShadow: 'var(--shadow-sm)',
                whiteSpace: 'pre-wrap'
              }}
            >
              {msg.text}

              {/* Source References */}
              {msg.sources && msg.sources.length > 0 && (
                <div style={{
                  marginTop: '0.85rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  <button
                    onClick={() => toggleSourceExpand(msg.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#818CF8',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    <BookOpen size={13} />
                    <span>{expandedSources[msg.id] ? 'Hide' : 'Inspect'} {msg.sources.length} Grounded Source Chunks</span>
                    <ChevronRight size={13} style={{ transform: expandedSources[msg.id] ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>

                  {expandedSources[msg.id] && (
                    <div style={{ marginTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {msg.sources.map((src, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            background: 'rgba(8, 11, 17, 0.75)',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '6px',
                            border: '1px solid var(--border-subtle)',
                            fontSize: '0.78rem'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                              Chunk #{src.chunk_id.substring(0, 8)}... (Page {src.page_number ?? 'N/A'})
                            </span>
                            <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>
                              {src.section_title || 'General'}
                            </span>
                          </div>
                          <p style={{ margin: 0, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.45 }}>
                            "{src.content}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <div className="spin" style={{ width: '16px', height: '16px', border: '2px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%' }} />
            <span>Retrieving verified document chunks...</span>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      <div style={{
        padding: '0.6rem 1.25rem',
        background: 'rgba(8, 11, 17, 0.5)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto'
      }}>
        <HelpCircle size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={isLoading}
            style={{
              whiteSpace: 'nowrap',
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              padding: '0.3rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'background 0.15s'
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div style={{
        padding: '1.25rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: '0.75rem',
        background: 'rgba(8, 11, 17, 0.8)'
      }}>
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask any question about "${documentTitle}"...`}
          disabled={isLoading}
          style={{ flex: 1, padding: '0.75rem 1.15rem' }}
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !inputQuery.trim()}
          className="btn btn-primary"
          style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }}
        >
          <Send size={16} />
          <span>Ask</span>
        </button>
      </div>
    </div>
  );
};
