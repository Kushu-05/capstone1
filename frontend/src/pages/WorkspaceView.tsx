import React, { useState } from 'react';
import { FileText, Layers, Search, Sparkles, MessageSquareText, ChevronDown, ChevronRight, Hash, Database, BookOpen } from 'lucide-react';
import { DocumentDetail, Chunk, Section } from '../types/api';
import { api } from '../services/api';
import { NavTab } from '../components/Sidebar';

interface WorkspaceViewProps {
  documents: DocumentDetail[];
  activeDoc: DocumentDetail | null;
  onSelectDoc: (docId: string) => void;
  onNavigate: (tab: NavTab) => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  documents,
  activeDoc,
  onSelectDoc,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'sections' | 'chunks' | 'search'>('sections');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDoc || !searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await api.searchChunks(activeDoc.id, searchQuery.trim(), 5);
      setSearchResults(res.results || []);
    } catch (err) {
      console.error("Vector search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  if (!activeDoc) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <FileText size={48} color="var(--primary)" style={{ opacity: 0.4, margin: '0 auto 1rem' }} />
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>No Document Selected</h3>
        <p style={{ margin: '0 0 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Please upload a document or select one from the dashboard to inspect its sections and chunks.
        </p>
        <button onClick={() => onNavigate('upload')} className="btn btn-primary">
          Upload Document
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Document Selector & Action Header */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '300px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Active Document</span>
                <span className="badge badge-neutral" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>{activeDoc.file_type}</span>
              </div>
              <select
                value={activeDoc.id}
                onChange={(e) => onSelectDoc(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.92rem'
                }}
              >
                {documents.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.original_name} ({d.page_count} pgs · {d.word_count.toLocaleString()} wds)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => onNavigate('summary')}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
            >
              <Sparkles size={15} />
              <span>Summarize</span>
            </button>
            <button
              onClick={() => onNavigate('qa')}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
            >
              <MessageSquareText size={15} />
              <span>Ask Questions</span>
            </button>
          </div>
        </div>

        {/* Metadata Details Pill Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.75rem',
          padding: '1rem',
          background: 'var(--bg-surface-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Pages</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{activeDoc.page_count}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Words</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{activeDoc.word_count.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Characters</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{activeDoc.char_count.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Sections</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{activeDoc.sections?.length || 0}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Chunks</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{activeDoc.total_chunks || 0}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>File Size</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{(activeDoc.file_size / 1024).toFixed(1)} KB</div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('sections')}
          style={{
            background: activeTab === 'sections' ? 'var(--primary-light)' : 'transparent',
            color: activeTab === 'sections' ? 'var(--primary)' : 'var(--text-muted)',
            border: 'none',
            padding: '0.6rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: activeTab === 'sections' ? 700 : 500,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <BookOpen size={16} />
          <span>Extracted Sections ({activeDoc.sections?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('chunks')}
          style={{
            background: activeTab === 'chunks' ? 'var(--primary-light)' : 'transparent',
            color: activeTab === 'chunks' ? 'var(--primary)' : 'var(--text-muted)',
            border: 'none',
            padding: '0.6rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: activeTab === 'chunks' ? 700 : 500,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Layers size={16} />
          <span>Indexed Chunks ({activeDoc.chunks_preview?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          style={{
            background: activeTab === 'search' ? 'var(--primary-light)' : 'transparent',
            color: activeTab === 'search' ? 'var(--primary)' : 'var(--text-muted)',
            border: 'none',
            padding: '0.6rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: activeTab === 'search' ? 700 : 500,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Database size={16} />
          <span>Live Vector Retrieval</span>
        </button>
      </div>

      {/* Tab 1: Sections Accordion */}
      {activeTab === 'sections' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {activeDoc.sections && activeDoc.sections.length > 0 ? (
            activeDoc.sections.map((section: Section, idx: number) => {
              const isExpanded = expandedSection === idx;
              return (
                <div
                  key={section.id || idx}
                  className="card"
                  style={{ padding: 0, overflow: 'hidden' }}
                >
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      background: isExpanded ? 'var(--bg-surface-secondary)' : 'var(--bg-surface)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                        Page {section.page_number}
                      </span>
                      <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {section.section_title || `Section ${idx + 1}`}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {section.content?.split(/\s+/).length || 0} words
                      </span>
                      {isExpanded ? <ChevronDown size={16} color="var(--text-muted)" /> : <ChevronRight size={16} color="var(--text-muted)" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div style={{
                      padding: '1.25rem',
                      borderTop: '1px solid var(--border-color)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                      whiteSpace: 'pre-wrap',
                      background: 'var(--bg-surface)'
                    }}>
                      {section.content}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              No explicit sections discovered. Content is indexed directly via page chunks.
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Chunks Preview */}
      {activeTab === 'chunks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {activeDoc.chunks_preview && activeDoc.chunks_preview.length > 0 ? (
            activeDoc.chunks_preview.map((chunk: Chunk) => (
              <div key={chunk.id} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-primary">Chunk #{chunk.chunk_index}</span>
                    <span className="badge badge-neutral">Page {chunk.page_number}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {chunk.section_title || 'General'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    ~{chunk.token_estimate} tokens • ID: {chunk.id.substring(0, 8)}...
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                  {chunk.content}
                </p>
              </div>
            ))
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              No chunks indexed.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Live Vector Retrieval */}
      {activeTab === 'search' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <form onSubmit={handleSearch} className="card" style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter query to retrieve source chunks (e.g., 'financial audit findings' or 'compliance risks')..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-surface-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem'
                }}
              />
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.25rem' }}
            >
              <Database size={16} />
              <span>{isSearching ? 'Searching...' : 'Search KB'}</span>
            </button>
          </form>

          {searchResults.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Retrieved {searchResults.length} source chunks for "{searchQuery}":
              </div>
              {searchResults.map((res, i) => (
                <div key={i} className="card" style={{ borderLeft: '4px solid var(--primary)', padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-primary">Rank #{i + 1}</span>
                      <span className="badge badge-neutral">Page {res.page_number}</span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{res.section_title || 'General'}</span>
                    </div>
                    <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                      Score: {res.similarity_score ? (res.similarity_score * 100).toFixed(1) : (100 - i * 10).toFixed(0)}%
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    "{res.content}"
                  </p>
                </div>
              ))}
            </div>
          ) : searchQuery && !isSearching ? (
            <div className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              No matching chunks found for query. Try broader keywords.
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
