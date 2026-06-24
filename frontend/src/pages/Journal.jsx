import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';
import JournalEditor from '../components/JournalEditor';

export default function Journal({ token, user }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const chatEndRef = useRef(null);

  // Fetch journal history on mount
  useEffect(() => {
    const fetchJournalHistory = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://echo-backend-1jn4.onrender.com/api/journal', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          // Sort chronological for display (oldest first in chat view)
          setConversations(data.reverse());
        } else {
          setError(data.error || 'Failed to retrieve conversation history.');
        }
      } catch (err) {
        console.error('Error fetching journal history:', err);
        setError('Network error syncing with Future You.');
      } finally {
        setLoading(false);
      }
    };

    fetchJournalHistory();
  }, [token]);

  // Scroll to bottom on new updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, submitting]);

  const handleJournalSubmit = async (text) => {
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://echo-backend-1jn4.onrender.com/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ entry: text })
      });

      const newJournal = await response.json();

      if (response.ok) {
        setConversations(prev => [...prev, newJournal]);
      } else {
        setError(newJournal.error || 'Could not send entry across time.');
      }
    } catch (err) {
      console.error('Submit journal error:', err);
      setError('Connection dropped. Verify network state.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px', width: '100%', display: 'flex', flexDirection: 'column', flex: '1' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '30px', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', textDecoration: 'none', background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '24px', fontWeight: '800' }}>Journal Workspace</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} style={{ color: 'var(--color-blue)' }} />
              <span>Channel aligned with Future {user?.name}</span>
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(247, 37, 133, 0.1)', borderColor: 'var(--color-magenta)', color: 'var(--color-magenta)', marginBottom: '24px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {/* Conversations Stream */}
      <div 
        className="glass-panel"
        style={{ 
          flex: '1', 
          maxHeight: '450px',
          overflowY: 'auto', 
          padding: '24px', 
          background: 'rgba(5, 2, 12, 0.4)', 
          borderColor: 'rgba(138, 43, 226, 0.15)',
          borderRadius: '16px',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '250px'
        }}
      >
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', flexDirection: 'column', gap: '12px' }}>
            <div className="writing-indicator">
              <div className="dot-pulse"></div>
              <div className="dot-pulse"></div>
              <div className="dot-pulse"></div>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Gathering pages...</span>
          </div>
        ) : conversations.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', flexDirection: 'column', color: 'var(--text-muted)', padding: '40px 0', textAlign: 'center' }}>
            <Sparkles size={36} style={{ color: 'var(--color-blue)', opacity: '0.4', marginBottom: '12px', animation: 'pulse-node 2s infinite alternate' }} />
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px' }}>Your timeline is quiet</h3>
            <p style={{ maxWidth: '380px', fontSize: '13px', lineHeight: '1.6' }}>
              Write your first journal entry below. Future You will respond to your words, offering warm perspective.
            </p>
          </div>
        ) : (
          <>
            {conversations.map((conv) => (
              <ChatBubble
                key={conv._id}
                entryText={conv.entryText}
                replyText={conv.replyText}
                date={conv.createdAt}
                isSimulated={!token || token.includes('mock')}
              />
            ))}
            {submitting && <ChatBubble />}
            <div ref={chatEndRef} />
          </>
        )}
      </div>

      {/* Editor Section */}
      <JournalEditor onSubmit={handleJournalSubmit} isSubmitting={submitting} />

    </div>
  );
}
