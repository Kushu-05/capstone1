import axios from 'axios';
import {
  DocumentDetail,
  DocumentUploadResponse,
  WorkflowRunResponse,
  AudioResponse,
  DashboardStats,
  QAResponse,
  CompareResponse,
  GovReportSample,
  GovReportEvalResponse
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 120s timeout for large multi-agent jobs
});

export const api = {
  // Health
  checkHealth: async () => {
    const res = await client.get('/api/health');
    return res.data;
  },

  // Dashboard Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    const res = await client.get('/api/documents/stats/overview');
    return res.data;
  },

  // Documents
  uploadDocument: async (file: File, onProgress?: (percent: number) => void): Promise<DocumentUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await client.post('/api/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      }
    });
    return res.data;
  },

  getDocuments: async (): Promise<DocumentDetail[]> => {
    const res = await client.get('/api/documents');
    return res.data;
  },

  getDocument: async (docId: string): Promise<DocumentDetail> => {
    const res = await client.get(`/api/documents/${docId}`);
    return res.data;
  },

  searchChunks: async (docId: string, query: string, topK = 5) => {
    const res = await client.get(`/api/documents/${docId}/search`, {
      params: { q: query, top_k: topK }
    });
    return res.data;
  },

  // Multi-Agent Workflow
  runPipeline: async (
    docId: string,
    requestedFocus: string,
    language = 'en',
    autoGenerateAudio = false,
    voice?: string
  ): Promise<WorkflowRunResponse> => {
    const payload = {
      document_id: docId,
      requested_focus: requestedFocus,
      language: language,
      auto_generate_audio: autoGenerateAudio,
      voice: voice
    };
    const res = await client.post('/api/pipeline/run', payload);
    return res.data;
  },

  runMultiPipeline: async (
    docIds: string[],
    requestedFocus: string,
    language = 'en',
    autoGenerateAudio = false,
    voice?: string
  ): Promise<WorkflowRunResponse> => {
    const payload = {
      document_ids: docIds,
      requested_focus: requestedFocus,
      language: language,
      auto_generate_audio: autoGenerateAudio,
      voice: voice
    };
    const res = await client.post('/api/pipeline/run-multi', payload);
    return res.data;
  },

  getWorkflowRun: async (runId: string): Promise<WorkflowRunResponse> => {
    const res = await client.get(`/api/pipeline/runs/${runId}`);
    return res.data;
  },

  getLatestWorkflowRun: async (docId: string): Promise<WorkflowRunResponse | null> => {
    try {
      const res = await client.get(`/api/pipeline/document/${docId}/latest`);
      return res.data;
    } catch {
      return null;
    }
  },

  // Text to Speech
  generateSpeech: async (runId: string, voice?: string, language = 'en', text?: string): Promise<AudioResponse> => {
    const payload = {
      workflow_run_id: runId,
      voice: voice,
      language: language,
      text: text
    };
    const res = await client.post('/api/tts/generate', payload);
    return res.data;
  },

  switchLanguage: async (
    runId: string,
    targetLanguage: string,
    autoGenerateAudio = true,
    voice?: string
  ): Promise<{
    workflow_run_id: string;
    language: string;
    original_language: string;
    canonical_summary: string;
    translated_summary: string;
    audio?: AudioResponse;
  }> => {
    const payload = {
      workflow_run_id: runId,
      target_language: targetLanguage,
      auto_generate_audio: autoGenerateAudio,
      voice: voice
    };
    const res = await client.post('/api/pipeline/switch-language', payload);
    return res.data;
  },

  getAudioUrl: (audioId: string) => {
    return `${API_BASE_URL}/api/tts/audio/${audioId}`;
  },

  // Document Q&A
  askQuestion: async (docId: string, question: string, language = 'en'): Promise<QAResponse> => {
    const res = await client.post(`/api/documents/${docId}/qa`, { question, language });
    return res.data;
  },

  askMultiQuestion: async (docIds: string[], question: string, language = 'en'): Promise<QAResponse> => {
    const res = await client.post('/api/documents/qa-multi', { document_ids: docIds, question, language });
    return res.data;
  },

  // Document Comparison
  compareDocuments: async (docId1: string, docId2: string): Promise<CompareResponse> => {
    const res = await client.post('/api/documents/compare', {
      doc_id_1: docId1,
      doc_id_2: docId2
    });
    return res.data;
  },

  // GovReport Benchmark
  getGovReportSamples: async (): Promise<GovReportSample[]> => {
    const res = await client.get('/api/evaluation/govreport/samples');
    return res.data.samples || [];
  },

  runGovReportEval: async (sampleId: string): Promise<GovReportEvalResponse> => {
    const res = await client.post(`/api/evaluation/govreport/run/${sampleId}`);
    return res.data;
  },

  loadGovReportSample: async (sampleId: string = 'CRS-R46240'): Promise<DocumentUploadResponse> => {
    const res = await client.post(`/api/documents/load-govreport-sample/${sampleId}`);
    return res.data;
  },

  // Real-Time Neural Translation
  translateContent: async (text: string, targetLanguage: string, sourceLanguage = 'en'): Promise<{ translated_text: string; target_language: string; original_text: string }> => {
    const res = await client.post('/api/documents/translate', {
      text,
      target_language: targetLanguage,
      source_language: sourceLanguage
    });
    return res.data;
  },

  // Feedback
  submitFeedback: async (runId: string, rating: number, isHelpful: boolean, feedbackText: string) => {
    const res = await client.post('/api/feedback', {
      workflow_run_id: runId,
      rating,
      is_helpful: isHelpful,
      feedback_text: feedbackText
    });
    return res.data;
  }
};
