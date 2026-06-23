import React, { useState } from 'react';
import { Send, Sparkles, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending form details
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 24px', width: '100%' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '50%', background: 'rgba(0, 210, 255, 0.08)', color: 'var(--color-blue)', marginBottom: '16px' }}>
          <MessageSquare size={24} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
          Contact & Feedback
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          We want to hear about your experience. Send us thoughts or feature suggestions.
        </p>
      </div>

      {submitted ? (
        <div className="glass-panel" style={{ padding: '40px 24px', textClassName: 'center', textAlign: 'center', background: 'rgba(0, 210, 255, 0.03)', borderColor: 'var(--color-blue)' }}>
          <Sparkles size={36} style={{ color: 'var(--color-blue)', margin: '0 auto 16px auto', display: 'block', animation: 'pulse-node 2s infinite alternate' }} />
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '20px', marginBottom: '10px' }}>Message Decoded</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', maxWidth: '350px', margin: '0 auto' }}>
            Your feedback has been cast into our system. Thank you for helping us shape the Future of growth.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-secondary"
            style={{ marginTop: '24px', padding: '8px 20px', fontSize: '13px' }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '30px', background: 'rgba(15, 8, 30, 0.45)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontFamily: 'var(--font-title)', fontWeight: '600' }}>Your Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Robin Smith"
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '14px'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontFamily: 'var(--font-title)', fontWeight: '600' }}>Your Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. robin@example.com"
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '14px'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontFamily: 'var(--font-title)', fontWeight: '600' }}>Your Message</label>
            <textarea 
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your thoughts or request here..."
              style={{
                width: '100%',
                height: '120px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: 'var(--text-primary)',
                outline: 'none',
                resize: 'none',
                fontSize: '14px'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          <button 
            type="submit" 
            className="btn-glow" 
            disabled={loading}
            style={{ padding: '12px', fontSize: '14px', justifyContent: 'center', width: '100%' }}
          >
            {loading ? (
              <span>Transmitting...</span>
            ) : (
              <>
                <span>Transmit Message</span>
                <Send size={14} />
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );
}
