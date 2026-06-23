import React, { useState } from 'react';
import { PenTool, Send, AlertCircle } from 'lucide-react';

export default function JournalEditor({ onSubmit, isSubmitting }) {
  const [entry, setEntry] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry.trim()) {
      setError('Please write something in your journal before communicating across time.');
      return;
    }
    setError('');
    onSubmit(entry);
    setEntry(''); // Clear editor
  };

  const handleChange = (e) => {
    setEntry(e.target.value);
    if (e.target.value.trim()) {
      setError('');
    }
  };

  const wordCount = entry.trim() ? entry.trim().split(/\s+/).length : 0;

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div 
        className="glass-panel"
        style={{ 
          padding: '24px', 
          borderRadius: '16px',
          background: 'rgba(15, 8, 30, 0.45)',
          border: '1px solid rgba(138, 43, 226, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PenTool size={18} style={{ color: 'var(--color-blue)' }} />
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '16px', fontWeight: '600' }}>
            Write today's thoughts...
          </h3>
        </div>

        <textarea
          value={entry}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="How was your day? Are you hitting blockages, or did you make a small breakthrough? Write to Future You. They understand."
          style={{
            width: '100%',
            height: '180px',
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '16px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            lineHeight: '1.6',
            resize: 'none',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--color-blue)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        />

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-magenta)', fontSize: '13px' }}>
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {wordCount} words {wordCount > 0 && `(approx. ${Math.ceil(wordCount / 100)}m write)`}
          </span>

          <button
            type="submit"
            className="btn-glow"
            disabled={isSubmitting || !entry.trim()}
            style={{
              padding: '10px 24px',
              fontSize: '14px',
              opacity: (isSubmitting || !entry.trim()) ? '0.6' : '1',
              cursor: (isSubmitting || !entry.trim()) ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? (
              <>
                <span className="writing-indicator" style={{ display: 'inline-flex', gap: '3px' }}>
                  <span className="dot-pulse"></span>
                  <span className="dot-pulse"></span>
                  <span className="dot-pulse"></span>
                </span>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <span>Send to Future Self</span>
                <Send size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
