import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

interface FeedbackFormProps {
  workflowRunId?: string;
  onSubmitted?: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  workflowRunId,
  onSubmitted
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isHelpful, setIsHelpful] = useState<boolean>(true);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workflowRunId) {
      setError('Please run a summarization workflow first before submitting feedback.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await api.submitFeedback(workflowRunId, rating, isHelpful, feedbackText);
      setIsSubmitted(true);
      if (onSubmitted) onSubmitted();
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Failed to submit feedback.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 600 }}>Thank You for Your Feedback!</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Your evaluation has been logged in SQLite to continuously refine our Document Intelligence Agents.
        </p>
        <button
          onClick={() => { setIsSubmitted(false); setFeedbackText(''); }}
          className="btn btn-secondary"
          style={{ marginTop: '1.5rem', fontSize: '0.85rem' }}
        >
          Submit Another Note
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(249,115,22,0.15))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#eab308'
        }}>
          <MessageSquare size={22} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 600 }}>Human-in-the-Loop Feedback</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Help evaluate groundedness, clarity, and utility of the multi-agent summary
          </p>
        </div>
      </div>

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid var(--danger)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#f87171',
          fontSize: '0.85rem'
        }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Star Rating */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Overall Summary Quality:
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  color: (hoverRating || rating) >= star ? '#eab308' : 'var(--text-muted)',
                  transition: 'transform 0.1s'
                }}
              >
                <Star size={26} fill={(hoverRating || rating) >= star ? '#eab308' : 'transparent'} />
              </button>
            ))}
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
              {rating === 5 ? 'Excellent & Factually Sound' : rating === 4 ? 'Very Good' : rating === 3 ? 'Acceptable' : rating === 2 ? 'Needs Revision' : 'Poor Quality'}
            </span>
          </div>
        </div>

        {/* Helpful Toggle */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Was this summary useful and actionable?
          </label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setIsHelpful(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: `1px solid ${isHelpful ? 'var(--success)' : 'var(--border-color)'}`,
                background: isHelpful ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)',
                color: isHelpful ? 'var(--success)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: isHelpful ? 600 : 400
              }}
            >
              <ThumbsUp size={16} />
              <span>Yes, accurate & helpful</span>
            </button>

            <button
              type="button"
              onClick={() => setIsHelpful(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: `1px solid ${!isHelpful ? 'var(--danger)' : 'var(--border-color)'}`,
                background: !isHelpful ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-secondary)',
                color: !isHelpful ? '#f87171' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: !isHelpful ? 600 : 400
              }}
            >
              <ThumbsDown size={16} />
              <span>No, issues detected</span>
            </button>
          </div>
        </div>

        {/* Detailed Comments */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Comments or Specific Corrections (Optional):
          </label>
          <textarea
            rows={3}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="e.g., The summary correctly extracted the 2023 budget numbers, but could emphasize the compliance risks more..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !workflowRunId}
          className="btn btn-primary"
          style={{
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem'
          }}
        >
          <Send size={15} />
          <span>{isSubmitting ? 'Recording...' : 'Submit Feedback'}</span>
        </button>
      </form>
    </div>
  );
};
