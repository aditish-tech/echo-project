import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Heart, Sparkles, BookOpen, Mail, CheckSquare, Plus, PenTool } from 'lucide-react';
import TimelineView from '../components/TimelineView';

export default function Dashboard({ token, user }) {
  const [journals, setJournals] = useState([]);
  const [letters, setLetters] = useState([]);
  const [routineItems, setRoutineItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch Journals
        const journalRes = await fetch('https://echo-backend-1jn4.onrender.com/api/journal', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const journalData = await journalRes.json();

        // Fetch Letters
        const letterRes = await fetch('https://echo-backend-1jn4.onrender.com/api/letter', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const letterData = await letterRes.json();

        // Fetch Routine
        const routineRes = await fetch('https://echo-backend-1jn4.onrender.com/api/routine', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const routineData = await routineRes.json();

        if (journalRes.ok && letterRes.ok) {
          setJournals(journalData);
          setLetters(letterData);
        } else {
          setError('Failed to pull timeline data.');
        }

        if (routineRes.ok && routineData.routine) {
          const items = [
            ...(routineData.routine.morning || []),
            ...(routineData.routine.afternoon || []),
            ...(routineData.routine.evening || [])
          ];
          setRoutineItems(items);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Network error. Check connection to temporal server.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const getStreak = () => {
    if (journals.length === 0) return 0;
    const entryDates = Array.from(new Set(journals.map(j => {
      const d = new Date(j.createdAt);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }))).sort((a, b) => new Date(b) - new Date(a));

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    if (entryDates[0] !== todayStr && entryDates[0] !== yesterdayStr) {
      return 0;
    }

    let streak = 1;
    for (let i = 0; i < entryDates.length - 1; i++) {
      const d1 = new Date(entryDates[i]);
      const d2 = new Date(entryDates[i + 1]);
      const diffTime = Math.abs(d1 - d2);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak++;
      } else if (diffDays > 1) {
        break;
      }
    }
    return streak;
  };

  const streak = getStreak();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1', flexDirection: 'column', gap: '15px' }}>
        <div className="writing-indicator">
          <div className="dot-pulse"></div>
          <div className="dot-pulse"></div>
          <div className="dot-pulse"></div>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-title)' }}>Deciphering timeline logs...</p>
      </div>
    );
  }

  const latestJournal = journals[0];
  const nextLetterCount = 7 - (journals.length % 7);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', width: '100%' }}>
      
      {/* Welcome Banner */}
      <div className="glass-panel" style={{ 
        padding: '30px', 
        marginBottom: '30px', 
        background: 'radial-gradient(circle at 80% 50%, rgba(138, 43, 226, 0.15) 0%, rgba(18, 11, 33, 0.45) 100%)',
        borderColor: 'rgba(138, 43, 226, 0.3)'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-blue)', fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Sparkles size={14} />
              <span>Link Established &bull; Future Self Active</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
              Welcome back, {user.name}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <Target size={14} style={{ color: 'var(--color-blue)' }} />
                <span><strong>Goal:</strong> {user.goal}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <Heart size={14} style={{ color: 'var(--color-magenta)' }} />
                <span><strong>Anchor:</strong> {user.why}</span>
              </div>
            </div>
          </div>

          <Link to="/journal" className="btn-glow">
            <Plus size={16} />
            <span>Journal Today</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(247, 37, 133, 0.1)', borderColor: 'var(--color-magenta)', color: 'var(--color-magenta)', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: '1.8fr 1.2fr', gap: '30px' }} className="dashboard-grid">
        
        {/* Left Column: Timeline view */}
        <div>
          <div className="glass-panel" style={{ padding: '24px', background: 'rgba(10, 5, 25, 0.4)' }}>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Narrative Growth Timeline</span>
            </h2>
            <TimelineView journals={journals} letters={letters} user={user} />
          </div>
        </div>

        {/* Right Column: Quick Status & Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Status summary */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', marginBottom: '16px' }}>Status Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Journals</div>
                <div style={{ fontSize: '28px', fontFamily: 'var(--font-title)', fontWeight: '800', color: 'var(--color-blue)', marginTop: '4px' }}>{journals.length}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Milestones</div>
                <div style={{ fontSize: '28px', fontFamily: 'var(--font-title)', fontWeight: '800', color: 'var(--color-magenta)', marginTop: '4px' }}>{letters.length}</div>
              </div>
            </div>

            {/* Clickable Quick Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              {/* Progress Summary Card */}
              <Link to="/progress" style={{ 
                textDecoration: 'none', 
                background: 'rgba(157, 78, 221, 0.04)', 
                padding: '16px', 
                borderRadius: '12px', 
                border: '1px solid rgba(157, 78, 221, 0.15)',
                display: 'block',
                cursor: 'pointer'
              }} className="dashboard-summary-card">
                <div style={{ fontSize: '11px', color: 'var(--color-violet)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Alignment Streak</div>
                <div style={{ fontSize: '24px', fontFamily: 'var(--font-title)', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>{streak} Days</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>View Progress timeline &rarr;</div>
              </Link>

              {/* Routine Summary Card */}
              <Link to="/routine" style={{ 
                textDecoration: 'none', 
                background: 'rgba(0, 210, 255, 0.04)', 
                padding: '16px', 
                borderRadius: '12px', 
                border: '1px solid rgba(0, 210, 255, 0.15)',
                display: 'block',
                cursor: 'pointer'
              }} className="dashboard-summary-card">
                <div style={{ fontSize: '11px', color: 'var(--color-blue)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Routine Builder</div>
                <div style={{ fontSize: '24px', fontFamily: 'var(--font-title)', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
                  {routineItems.length > 0 ? `${routineItems.filter(i => i.completedToday).length}/${routineItems.length}` : '0/0'}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Tasks completed today &rarr;</div>
              </Link>
            </div>

            {journals.length > 0 && (
              <div style={{ marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)', background: 'rgba(0, 210, 255, 0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0, 210, 255, 0.1)' }}>
                ✨ <strong>{nextLetterCount} entries</strong> until your future self writes another reflective milestone letter.
              </div>
            )}
          </div>

          {/* AI suggested action quick launch */}
          <div className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckSquare size={16} style={{ color: 'var(--color-blue)' }} />
              <span>What would they do today?</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5', marginBottom: '16px' }}>
              Suggested daily actions anchored to your goal, generated in a non-punitive tone.
            </p>
            <Link to="/schedule" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '13px', padding: '10px' }}>
              Open Checklist
            </Link>
          </div>

          {/* Latest Conversation Quick Peek */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={16} style={{ color: 'var(--color-violet)' }} />
              <span>Latest Conversation</span>
            </h3>
            {latestJournal ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  fontSize: '13px', 
                  color: 'var(--text-secondary)',
                  borderLeft: '2px solid var(--border-color)',
                  maxHeight: '80px',
                  overflow: 'hidden'
                }}>
                  "{latestJournal.entryText}"
                </div>
                <div style={{ 
                  background: 'rgba(0, 210, 255, 0.02)', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  fontSize: '13px', 
                  color: 'var(--text-primary)',
                  borderLeft: '2px solid var(--color-blue)',
                  maxHeight: '120px',
                  overflow: 'hidden',
                  lineHeight: '1.5'
                }}>
                  <strong>Future You:</strong> {latestJournal.replyText}
                </div>
                <Link to="/journal" style={{ color: 'var(--color-blue)', fontSize: '12px', textDecoration: 'none', fontWeight: '600', alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Open Journal Link</span>
                  <Plus size={12} />
                </Link>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                <PenTool size={28} style={{ color: 'var(--text-muted)', opacity: '0.4', marginBottom: '8px' }} />
                <p>No conversations yet. Open your first link today.</p>
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .dashboard-summary-card {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dashboard-summary-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 210, 255, 0.08);
          border-color: rgba(0, 210, 255, 0.3) !important;
        }
      `}</style>

    </div>
  );
}
