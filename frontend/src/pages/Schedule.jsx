import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Check, RefreshCw, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Schedule({ token, user }) {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [error, setError] = useState('');

  const fetchSchedule = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://echo-backend-1jn4.onrender.com/api/schedule', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setSchedule(data);
      } else {
        setError(data.error || 'Failed to fetch today\'s actions.');
      }
    } catch (err) {
      console.error('Fetch schedule error:', err);
      setError('Connection failure updating daily actions list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [token]);

  const handleToggle = async (actionId) => {
    setTogglingId(actionId);
    try {
      const response = await fetch(`https://echo-backend-1jn4.onrender.com/api/schedule/${actionId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setSchedule(data);
      } else {
        setError(data.error || 'Failed to update action completion.');
      }
    } catch (err) {
      console.error('Toggle action error:', err);
      setError('Connection error toggling action status.');
    } finally {
      setTogglingId(null);
    }
  };

  const getTodayDisplay = () => {
    return new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const completedCount = schedule?.actions.filter(a => a.completed).length || 0;
  const totalCount = schedule?.actions.length || 0;

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', padding: '40px 24px', width: '100%' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '30px', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', textDecoration: 'none', background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '24px', fontWeight: '800' }}>Daily Alignment</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} style={{ color: 'var(--color-blue)' }} />
              <span>What would they do today?</span>
            </p>
          </div>
        </div>

        <button 
          onClick={fetchSchedule}
          disabled={loading}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '12px' }}
        >
          <RefreshCw size={12} className={loading ? 'spin-anim' : ''} />
          <span>Refresh Actions</span>
        </button>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(247, 37, 133, 0.1)', borderColor: 'var(--color-magenta)', color: 'var(--color-magenta)', marginBottom: '24px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {/* Main Checklist Card */}
      <div className="glass-panel" style={{ padding: '30px', background: 'rgba(15, 8, 30, 0.4)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--color-blue)', fontWeight: '700', letterSpacing: '0.05em' }}>DATE COORDINATES</span>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', marginTop: '2px' }}>{getTodayDisplay()}</h3>
          </div>
          {totalCount > 0 && (
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>COMPLETED</span>
              <div style={{ fontSize: '18px', fontFamily: 'var(--font-title)', fontWeight: '700', color: completedCount === totalCount ? 'var(--color-blue)' : 'var(--text-primary)' }}>
                {completedCount} / {totalCount}
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', flexDirection: 'column', gap: '12px' }}>
            <div className="writing-indicator">
              <div className="dot-pulse"></div>
              <div className="dot-pulse"></div>
              <div className="dot-pulse"></div>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Formulating daily alignment...</span>
          </div>
        ) : !schedule || schedule.actions.length === 0 ? (
          <div style={{ padding: '30px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            No daily actions generated. Fill out your goal coordinates to begin.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {schedule.actions.map((act) => {
              const isChecking = togglingId === act._id;
              return (
                <div 
                  key={act._id}
                  onClick={() => !isChecking && handleToggle(act._id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    background: act.completed ? 'rgba(0, 210, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                    border: act.completed ? '1px solid rgba(0, 210, 255, 0.25)' : '1px solid rgba(255,255,255,0.04)',
                    cursor: isChecking ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: isChecking ? '0.7' : '1'
                  }}
                >
                  {/* Custom Checkbox Toggle */}
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '6px', 
                    border: act.completed ? '1px solid var(--color-blue)' : '1px solid var(--text-muted)',
                    background: act.completed ? 'var(--color-blue)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: act.completed ? '0 0 10px rgba(0, 210, 255, 0.4)' : 'none',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}>
                    {act.completed && <Check size={14} style={{ color: '#fff' }} />}
                  </div>

                  <span style={{ 
                    fontSize: '15px', 
                    color: act.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
                    textDecoration: act.completed ? 'line-through' : 'none',
                    lineHeight: '1.5',
                    transition: 'all 0.2s ease'
                  }}>
                    {act.text}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Non-punitive adaptation message */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
          💡 <strong>Non-punishing adaptation:</strong> If you miss a task, it's okay. These are gentles suggestions, not streaks. They adapt to your journal entries tomorrow.
        </p>
      </div>

      <style>{`
        .spin-anim {
          animation: spin-kf 1s linear infinite;
        }
        @keyframes spin-kf {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}
