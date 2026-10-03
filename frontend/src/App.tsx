import React, { useState, useEffect } from 'react';
import { StructuredLayout } from './components/StructuredLayout';
import { LoadingState } from './components/StateViews';
import { api } from './services/api';
import { DocumentDetail, DocumentUploadResponse, WorkflowRunResponse, AudioResponse } from './types/api';

export const App: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentDetail[]>([]);
  const [activeDoc, setActiveDoc] = useState<DocumentDetail | null>(null);
  const [workflowRun, setWorkflowRun] = useState<WorkflowRunResponse | null>(null);
  const [audio, setAudio] = useState<AudioResponse | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    bootstrapApp();
  }, []);

  const loadDocWithWorkflow = async (doc: DocumentDetail) => {
    setActiveDoc(doc);
    try {
      const latestRun = await api.getLatestWorkflowRun(doc.id);
      if (latestRun) {
        setWorkflowRun(latestRun);
        if (latestRun.audio_id) {
          setAudio({
            audio_id: latestRun.audio_id,
            workflow_run_id: latestRun.workflow_run_id,
            document_id: latestRun.document_id,
            audio_url: api.getAudioUrl(latestRun.audio_id),
            voice: 'en-US-JennyNeural',
            language: latestRun.language,
            duration_seconds: 0,
            is_validated_source: true
          });
        } else {
          setAudio(null);
        }
      } else {
        setWorkflowRun(null);
        setAudio(null);
      }
    } catch {
      setWorkflowRun(null);
      setAudio(null);
    }
  };

  const bootstrapApp = async () => {
    try {
      const docs = await api.getDocuments();
      setDocuments(docs);
      if (docs && docs.length > 0) {
        await loadDocWithWorkflow(docs[0]);
      }
    } catch (err) {
      console.error("App bootstrap error:", err);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleSelectDocById = async (docId: string) => {
    try {
      const doc = await api.getDocument(docId);
      await loadDocWithWorkflow(doc);
    } catch {
      const found = documents.find(d => d.id === docId);
      if (found) await loadDocWithWorkflow(found);
    }
  };

  const handleUploadSuccess = async (uploadData: DocumentUploadResponse) => {
    const docId = uploadData.document_id;
    try {
      const allDocs = await api.getDocuments();
      setDocuments(allDocs);
      const newDoc = await api.getDocument(docId);
      await loadDocWithWorkflow(newDoc);
    } catch (err) {
      console.error("Post upload handling error:", err);
    }
  };

  const handleWorkflowComplete = (run: WorkflowRunResponse) => {
    setWorkflowRun(run);
    if (run.audio_id) {
      setAudio({
        audio_id: run.audio_id,
        workflow_run_id: run.workflow_run_id,
        document_id: run.document_id,
        audio_url: api.getAudioUrl(run.audio_id),
        voice: 'en-US-JennyNeural',
        language: run.language,
        duration_seconds: 0,
        is_validated_source: true
      });
    } else {
      setAudio(null);
    }
  };

  if (isInitialLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3F6FA' }}>
        <LoadingState message="Loading Document Intelligence & Voice System..." />
      </div>
    );
  }

  return (
    <StructuredLayout
      documents={documents}
      activeDoc={activeDoc}
      workflowRun={workflowRun}
      audio={audio}
      onSelectDoc={handleSelectDocById}
      onUploadSuccess={handleUploadSuccess}
      onWorkflowComplete={handleWorkflowComplete}
      onAudioGenerated={setAudio}
    />
  );
};

export default App;
