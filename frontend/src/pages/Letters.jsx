import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import LetterCard from '../components/LetterCard';

export default function Letters({ token, user }) {
  const [letters, setLetters] = useState([]);
  const [journalCount, setJournalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchLettersData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch letters
      const res = await fetch('https://echo-backend-1jn4.onrender.com/api/letter', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const letterData = await res.json();

      // Fetch journal count to validate if they can generate
      const journalRes = await fetch('https://echo-backend-1jn4.onrender.com/api/journal', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const journalData = await journalRes.json();

      if (res.ok && journalRes.ok) {
        setLetters(letterData);
        setJournalCount(journalData.length);
      } else {
        setError(letterData.error || 'Failed to fetch milestone data.');
      }
    } catch (err) {
      console.error('Fetch letters page error:', err);
      setError('Connection failure syncing letter vaults.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLettersData();
  }, [token]);

  const handleGenerateLetter = async () => {
    setGenerating(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch('https://echo-backend-1jn4.onrender.com/api/letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        setLetters(prev => [data, ...prev]);
        setSuccessMsg('A new letter has successfully crossed the time boundary! Open it below.');
      } else {
        setError(data.error || 'Failed to align timeline coordinates.');
      }
    } catch (err) {
      console.error('Generate letter error:', err);
      setError('Connection lost during transmission.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px', width: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '30px', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', textDecoration: 'none', background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '24px', fontWeight: '800' }}>Milestone Letter Chest</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              Deep, reflective messages looking back at your journey.
            </p>
          </div>
        </div>

        <button 
          onClick={handleGenerateLetter}
          disabled={generating || journalCount === 0}
          className="btn-glow"
          style={{ 
            padding: '10px 20px', 
            fontSize: '13px', 
            opacity: (generating || journalCount === 0) ? '0.6' : '1',
            cursor: (generating || journalCount === 0) ? 'not-allowed' : 'pointer'
          }}
        >
          {generating ? (
            <>
              <span className="writing-indicator" style={{ display: 'inline-flex', gap: '3px' }}>
                <span className="dot-pulse"></span>
                <span className="dot-pulse"></span>
                <span className="dot-pulse"></span>
              </span>
              <span>Reflecting...</span>
            </>
          ) : (
            <>
              <RefreshCw size={14} />
              <span>Decipher Future Letter</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(247, 37, 133, 0.1)', borderColor: 'var(--color-magenta)', color: 'var(--color-magenta)', marginBottom: '24px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {successMsg && (
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(0, 210, 255, 0.08)', borderColor: 'var(--color-blue)', color: 'var(--color-blue)', marginBottom: '24px', fontSize: '14px' }}>
          {successMsg}
        </div>
      )}

      {journalCount === 0 && (
        <div className="glass-panel" style={{ padding: '20px', background: 'rgba(157, 78, 221, 0.05)', display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '30px' }}>
          <AlertCircle size={18} style={{ color: 'var(--color-violet)', marginTop: '2px', flexShrink: '0' }} />
          <div style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
            <strong>Letters Locked:</strong> You haven't written any journal entries yet. Future You needs at least one journal checkpoint to analyze your current path and look back on it. Go to the <Link to="/journal" style={{ color: 'var(--color-blue)', textDecoration: 'underline' }}>Journal</Link> to write your first entry.
          </div>
        </div>
      )}

      {/* Letters List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', flexDirection: 'column', gap: '12px' }}>
            <div className="writing-indicator">
              <div className="dot-pulse"></div>
              <div className="dot-pulse"></div>
              <div className="dot-pulse"></div>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Unlocking letter coordinates...</span>
          </div>
        ) : letters.length === 0 ? (
          <div className="glass-panel" style={{ padding: '50px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Mail size={40} style={{ color: 'var(--color-violet)', opacity: '0.3', marginBottom: '16px' }} />
            <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--text-primary)', fontSize: '18px', marginBottom: '8px' }}>Your Chest is Empty</h3>
            <p style={{ fontSize: '13px', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>
              Your future self hasn't sent any milestone letters yet. Write a few journal entries, then click "Decipher Future Letter" above to check in.
            </p>
          </div>
        ) : (
          letters.map((letter) => (
            <LetterCard key={letter._id} letter={letter} />
          ))
        )}
      </div>

    </div>
  );
}
