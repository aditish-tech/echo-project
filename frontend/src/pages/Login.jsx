import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://echo-backend-1jn4.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.token, data.user);
        // Redirect to dashboard (or onboarding if no goal)
        if (data.user.goal) {
          navigate('/dashboard');
        } else {
          navigate('/onboarding');
        }
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection failure. Check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: 'auto', padding: '60px 24px', width: '100%' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>🌌</span>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '28px', fontWeight: '800' }}>Align Your Timeline</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
          Re-open the connection to your Future Self.
        </p>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '12px 16px', background: 'rgba(247, 37, 133, 0.1)', borderColor: 'var(--color-magenta)', color: 'var(--color-magenta)', marginBottom: '20px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '30px', background: 'rgba(15, 8, 30, 0.55)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontFamily: 'var(--font-title)', fontWeight: '600' }}>Email Address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '12px 16px 12px 40px',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '14px'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', fontFamily: 'var(--font-title)', fontWeight: '600' }}>Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '12px 16px 12px 40px',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '14px'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="btn-glow" 
          disabled={loading}
          style={{ padding: '12px', fontSize: '14px', justifyContent: 'center', width: '100%', marginTop: '10px' }}
        >
          {loading ? (
            <span>Aligning Coordinates...</span>
          ) : (
            <>
              <span>Establish Link</span>
              <LogIn size={14} />
            </>
          )}
        </button>

        <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>
          Don't have a link?{' '}
          <Link to="/signup" style={{ color: 'var(--color-blue)', textDecoration: 'none', fontWeight: '500' }}>
            Begin Echo
          </Link>
        </div>

      </form>

    </div>
  );
}
