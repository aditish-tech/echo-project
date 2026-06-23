import React from 'react';
import { Target, PenTool, Mail, CheckCircle } from 'lucide-react';

export default function TimelineView({ journals = [], letters = [], user }) {
  // Combine journals and letters into timeline events sorted by creation date
  const events = [];

  // Goal Creation Event
  if (user) {
    events.push({
      type: 'goal',
      title: 'Timeline Ignited',
      desc: `You set your coordinates to: "${user.goal}"`,
      date: user.createdAt || new Date(),
      icon: Target,
      color: 'var(--color-blue)'
    });
  }

  // Journal Events
  journals.forEach((j, idx) => {
    events.push({
      type: 'journal',
      title: `Thought Aligned (Day ${journals.length - idx})`,
      desc: j.entryText.length > 80 ? `${j.entryText.substring(0, 80)}...` : j.entryText,
      date: j.createdAt,
      icon: PenTool,
      color: 'var(--color-violet)'
    });
  });

  // Letter Events
  letters.forEach((l) => {
    events.push({
      type: 'letter',
      title: l.title,
      desc: 'You opened a window into the reflective future. A letter was deciphered.',
      date: l.createdAt,
      icon: Mail,
      color: 'var(--color-magenta)'
    });
  });

  // Sort events chronologically (newest first)
  const sortedEvents = events.sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', padding: '10px 0' }}>
      
      {/* Central Timeline Path */}
      <div style={{ 
        position: 'absolute', 
        left: '19px', 
        top: '20px', 
        bottom: '20px', 
        width: '2px', 
        background: 'linear-gradient(180deg, var(--color-blue), var(--color-violet), var(--color-magenta), transparent)',
        opacity: '0.4'
      }} />

      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {sortedEvents.map((evt, idx) => {
          const Icon = evt.icon;
          return (
            <div key={idx} style={{ display: 'flex', gap: '20px', position: 'relative', alignItems: 'flex-start' }}>
              
              {/* Timeline Indicator Node */}
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'var(--bg-dark)', 
                border: `2px solid ${evt.color}`,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: `0 0 10px ${evt.color}50`,
                zIndex: '2',
                flexShrink: 0,
                transition: 'all 0.3s ease'
              }}>
                <Icon size={16} style={{ color: evt.color }} />
              </div>

              {/* Event Content Card */}
              <div 
                className="glass-panel" 
                style={{ 
                  flex: '1', 
                  padding: '16px 20px', 
                  borderRadius: '12px',
                  background: 'rgba(18, 11, 33, 0.35)',
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <h4 style={{ 
                    fontFamily: 'var(--font-title)', 
                    fontSize: '15px', 
                    fontWeight: '600',
                    color: evt.type === 'goal' ? 'var(--color-blue)' : evt.type === 'letter' ? 'var(--color-magenta)' : 'var(--text-primary)' 
                  }}>
                    {evt.title}
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {formatDate(evt.date)}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>
                  {evt.desc}
                </p>
              </div>

            </div>
          );
        })}

        {sortedEvents.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No timeline checkpoints registered. Complete your onboarding to ignite the timeline.
          </div>
        )}
      </div>

    </div>
  );
}
