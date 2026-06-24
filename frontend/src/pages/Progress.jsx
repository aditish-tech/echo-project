import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, BookOpen, Mail, Trophy, Shield, ArrowLeft } from 'lucide-react';
import TimelineView from '../components/TimelineView';

export default function Progress({ token, user }) {
  const [journals, setJournals] = useState([]);
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProgressData = async () => {
      setLoading(true);
      setError('');
      try {
        const journalRes = await fetch('https://echo-backend-1jn4.onrender.com/api/journal', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const journalData = await journalRes.json();

        const letterRes = await fetch('https://echo-backend-1jn4.onrender.com/api/letter', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const letterData = await letterRes.json();

        if (journalRes.ok && letterRes.ok) {
          setJournals(journalData);
          setLetters(letterData);
        } else {
          setError('Could not download coordinates from the future.');
        }
      } catch (err) {
        console.error('Fetch progress page error:', err);
        setError('Network anomaly. Temporal server link interrupted.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [token]);

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

  // Metric 1: Total journal entries
  const totalEntries = journals.length;

  // Metric 2: Streak calculation
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

  // Metric 3: Days since goal set
  const getDaysSinceGoal = () => {
    if (!user || !user.createdAt) return 0;
    const goalDate = new Date(user.createdAt);
    const today = new Date();
    const diff = today - goalDate;
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  const daysSinceGoal = getDaysSinceGoal();

  // Metric 4: Letters received
  const totalLetters = letters.length;

  // Chart 1: Consistency Ring (Percentage of last 30 days with a journal entry)
  const getConsistency = () => {
    if (journals.length === 0) return 0;
    const entryDates = new Set(journals.map(j => {
      const d = new Date(j.createdAt);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }));

    let journaledCount = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - i);
      const checkStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
      if (entryDates.has(checkStr)) {
        journaledCount++;
      }
    }
    return Math.round((journaledCount / 30) * 100);
  };

  const consistency = getConsistency();
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (consistency / 100) * circumference;

  // Chart 2: Weekly Journaling Counts (4 Weeks)
  const getWeeklyData = () => {
    const entryDates = new Set(journals.map(j => {
      const d = new Date(j.createdAt);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }));

    const weeks = [0, 0, 0, 0];
    const today = new Date();
    for (let w = 0; w < 4; w++) {
      let count = 0;
      for (let d = 0; d < 7; d++) {
        const offset = w * 7 + d;
        const checkDate = new Date();
        checkDate.setDate(today.getDate() - offset);
        const checkStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
        if (entryDates.has(checkStr)) {
          count++;
        }
      }
      weeks[w] = count;
    }
    return weeks.reverse(); // Display left-to-right (oldest to newest)
  };

  const weeklyData = getWeeklyData();
  const weekLabels = ['3 Wks Ago', '2 Wks Ago', 'Last Week', 'This Week'];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', width: '100%' }}>
      
      {/* Back button & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', transition: 'all 0.2s ease', background: 'rgba(255, 255, 255, 0.02)' }}>
          <ArrowLeft size={16} />
        </Link>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-violet)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <Sparkles size={12} />
            <span>Narrative Progress Portal</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '28px', fontWeight: '800' }}>Your Journey Log</h1>
        </div>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(247, 37, 133, 0.1)', borderColor: 'var(--color-magenta)', color: 'var(--color-magenta)', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      {/* Grid Layout: Timeline on top, Stats below */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* Timeline Section */}
        <div className="glass-panel" style={{ padding: '30px', background: 'rgba(10, 5, 25, 0.3)' }}>
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Temporal Narrative Map</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
              Your journey visualised as coordinates across time. Hover checkpoints to recall past aligned states.
            </p>
          </div>
          <TimelineView journals={journals} letters={letters} user={user} />
        </div>

        {/* Stats & Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: '1fr 1fr', gap: '30px' }} className="stats-grid">
          
          {/* Stats Cards Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', color: 'var(--text-primary)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '10px' }}>
              Journey Metrics
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              
              {/* Stat 1 */}
              <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.01)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-blue)', marginBottom: '12px' }}>
                  <BookOpen size={16} />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Journal Links</span>
                </div>
                <div style={{ fontSize: '32px', fontFamily: 'var(--font-title)', fontWeight: '800', color: 'var(--text-primary)' }}>{totalEntries}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Reflective logs deciphered</div>
              </div>

              {/* Stat 2 */}
              <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.01)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-violet)', marginBottom: '12px' }}>
                  <Trophy size={16} />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Streak</span>
                </div>
                {/* Gentle, non-punishing display: styled with soft colors */}
                <div style={{ fontSize: '32px', fontFamily: 'var(--font-title)', fontWeight: '800', color: 'var(--color-violet)' }}>{streak}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Days in alignment</div>
              </div>

              {/* Stat 3 */}
              <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.01)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-magenta)', marginBottom: '12px' }}>
                  <Mail size={16} />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Future Letters</span>
                </div>
                <div style={{ fontSize: '32px', fontFamily: 'var(--font-title)', fontWeight: '800', color: 'var(--color-magenta)' }}>{totalLetters}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Deep reflections retrieved</div>
              </div>

              {/* Stat 4 */}
              <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.01)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-blue)', marginBottom: '12px' }}>
                  <Calendar size={16} />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Anchor Age</span>
                </div>
                <div style={{ fontSize: '32px', fontFamily: 'var(--font-title)', fontWeight: '800', color: 'var(--text-primary)' }}>{daysSinceGoal}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Days since coordinate setup</div>
              </div>

            </div>

            <div className="glass-panel" style={{ padding: '16px', background: 'rgba(0, 210, 255, 0.03)', borderLeft: '3px solid var(--color-blue)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Shield size={16} style={{ color: 'var(--color-blue)', marginTop: '2px', flexShrink: 0 }} />
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  <strong>Reminder:</strong> Streak trackers are just a tool, not a report card. If you miss a day, the number reset is quiet. Your coordinates to <em>"{user.goal}"</em> remain unchanged.
                </p>
              </div>
            </div>

          </div>

          {/* Visual Charts Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', color: 'var(--text-primary)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '10px' }}>
              Visual Consistency
            </h3>

            {/* Radial + Bar Chart Container */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', sm: '1fr 1fr', gap: '20px' }} className="charts-subgrid">
              
              {/* Consistency Ring (Radial SVG) */}
              <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '220px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '16px' }}>30-Day Alignment Rate</span>
                
                <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                  <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: 'rotate(-90deg)' }}>
                    <defs>
                      <linearGradient id="radialGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-blue)" />
                        <stop offset="50%" stopColor="var(--color-violet)" />
                        <stop offset="100%" stopColor="var(--color-magenta)" />
                      </linearGradient>
                    </defs>
                    {/* Outer Track Circle */}
                    <circle
                      cx="65"
                      cy="65"
                      r={radius}
                      fill="transparent"
                      stroke="rgba(255, 255, 255, 0.04)"
                      strokeWidth="10"
                    />
                    {/* Glowing active ring */}
                    <circle
                      cx="65"
                      cy="65"
                      r={radius}
                      fill="transparent"
                      stroke="url(#radialGlowGrad)"
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      style={{ 
                        transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        filter: 'drop-shadow(0 0 6px var(--color-violet)40)'
                      }}
                    />
                  </svg>
                  
                  {/* Percentage in center */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: '26px', fontWeight: '800', fontFamily: 'var(--font-title)', color: 'var(--text-primary)' }}>
                      {consistency}%
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Consistency
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Activity (Bar Chart) */}
              <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '220px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '24px', textAlign: 'center' }}>Weekly Consistency (Last 28 Days)</span>
                
                {/* Bars Container */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flex: '1', height: '110px', padding: '0 10px' }}>
                  {weeklyData.map((val, idx) => {
                    const heightPct = (val / 7) * 100;
                    return (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '22%', gap: '8px' }}>
                        
                        {/* Bar Box */}
                        <div style={{ 
                          width: '14px', 
                          height: '100px', 
                          background: 'rgba(255, 255, 255, 0.03)', 
                          borderRadius: '8px', 
                          position: 'relative',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          overflow: 'hidden'
                        }} title={`${val}/7 days journaled`}>
                          
                          {/* Fill */}
                          <div style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            width: '100%',
                            height: `${heightPct}%`,
                            background: 'linear-gradient(to top, var(--color-violet), var(--color-blue))',
                            borderRadius: '6px',
                            boxShadow: '0 0 10px rgba(0, 210, 255, 0.4)',
                            transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)'
                          }} />
                        </div>
                        
                        {/* Label */}
                        <span style={{ fontSize: '9px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {weekLabels[idx]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .charts-subgrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
