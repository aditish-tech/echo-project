import React from 'react';
import { Sparkles, User } from 'lucide-react';

export default function ChatBubble({ entryText, replyText, date, isSimulated = false }) {
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '20px 0' }}>
      
      {/* User Journal Bubble */}
      {entryText && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <div style={{ display: 'flex', gap: '12px', maxWidth: '80%', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                padding: '16px 20px', 
                borderRadius: '16px 16px 4px 16px',
                color: 'var(--text-primary)',
                lineHeight: '1.6',
                fontSize: '15px'
              }}>
                {entryText}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                {date ? formatDate(date) : 'Today'}
              </span>
            </div>
            
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              background: 'rgba(255, 255, 255, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              flexShrink: 0
            }}>
              <User size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>
          </div>
        </div>
      )}

      {/* AI Reply Bubble */}
      {replyText ? (
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <div style={{ display: 'flex', gap: '12px', maxWidth: '80%', alignItems: 'flex-start' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--color-blue), var(--color-violet))', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(0, 210, 255, 0.5)',
              flexShrink: 0
            }}>
              <Sparkles size={16} style={{ color: '#fff' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div 
                className="glass-panel"
                style={{ 
                  padding: '20px', 
                  borderRadius: '4px 16px 16px 16px',
                  lineHeight: '1.7',
                  fontSize: '15px',
                  background: 'rgba(21, 10, 48, 0.4)',
                  borderColor: 'rgba(0, 210, 255, 0.15)',
                  boxShadow: '0 4px 20px rgba(0, 210, 255, 0.03)'
                }}
              >
                <div style={{ 
                  fontFamily: 'var(--font-title)', 
                  fontWeight: '700', 
                  fontSize: '13px', 
                  color: 'var(--color-blue)', 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>Future You</span>
                  {isSimulated && (
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'none' }}>
                      (Simulated)
                    </span>
                  )}
                </div>
                <p style={{ color: 'var(--text-primary)' }}>{replyText}</p>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                {date ? formatDate(date) : 'Moments later'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Typing state */
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <div style={{ display: 'flex', gap: '12px', maxWidth: '80%', alignItems: 'center' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--color-blue), var(--color-violet))', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(0, 210, 255, 0.3)',
              flexShrink: 0
            }}>
              <Sparkles size={16} style={{ color: '#fff' }} />
            </div>
            
            <div className="glass-panel" style={{ padding: '12px 20px', borderRadius: '4px 16px 16px 16px', background: 'rgba(21, 10, 48, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-title)' }}>Future You is writing across time</span>
              <div className="writing-indicator">
                <div className="dot-pulse"></div>
                <div className="dot-pulse"></div>
                <div className="dot-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
