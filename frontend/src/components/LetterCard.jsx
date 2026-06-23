import React, { useState } from 'react';
import { Mail, Calendar, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function LetterCard({ letter }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div 
      className="glass-panel"
      style={{ 
        position: 'relative',
        padding: '24px', 
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(157, 78, 221, 0.25)',
        boxShadow: isOpen ? '0 8px 32px rgba(157, 78, 221, 0.15)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
        background: isOpen ? 'rgba(23, 13, 48, 0.65)' : 'rgba(18, 11, 33, 0.45)',
        transition: 'all 0.4s ease'
      }}
    >
      {/* Decorative Gradient Glow behind the card when open */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: isOpen ? '20px' : '0' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px', 
            background: isOpen ? 'linear-gradient(135deg, var(--color-magenta), var(--color-violet))' : 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: isOpen ? '0 0 15px rgba(247, 37, 133, 0.4)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            <Mail size={20} style={{ color: '#fff' }} />
          </div>
          <div>
            <h3 style={{ 
              fontFamily: 'var(--font-title)', 
              fontSize: '18px', 
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {letter.title}
              {isOpen && <Sparkles size={14} style={{ color: 'var(--color-blue)' }} />}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
              <Calendar size={12} />
              <span>Received {formatDate(letter.createdAt)}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleToggle}
          className={isOpen ? 'btn-secondary' : 'btn-glow'}
          style={{ 
            padding: '10px 20px', 
            fontSize: '13px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px' 
          }}
        >
          {isOpen ? (
            <>
              <EyeOff size={14} />
              <span>Fold Letter</span>
            </>
          ) : (
            <>
              <Eye size={14} />
              <span>Open Letter</span>
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div style={{ 
          borderTop: '1px solid rgba(138, 43, 226, 0.15)',
          paddingTop: '20px',
          animation: 'fadeIn 0.5s ease',
          lineHeight: '1.8'
        }}>
          <div 
            style={{ 
              color: '#dcd8ed', 
              fontSize: '16px', 
              fontStyle: 'italic', 
              whiteSpace: 'pre-line',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.01em'
            }}
          >
            {letter.content}
          </div>
          
          <div style={{ 
            marginTop: '24px', 
            textAlign: 'right',
            fontFamily: 'var(--font-title)',
            fontWeight: '600',
            color: 'var(--color-blue)',
            fontSize: '14px',
            letterSpacing: '0.05em'
          }}>
            — Communicated across time by your Future Self
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
