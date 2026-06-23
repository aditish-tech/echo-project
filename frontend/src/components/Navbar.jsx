import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Compass, PenTool, Mail, CheckSquare, User as UserIcon, Activity, Clock, BookOpen } from 'lucide-react';

export default function Navbar({ token, user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoutClick = () => {
    onLogout();
    setIsOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    color: isActive(path) ? 'var(--color-blue)' : 'var(--text-secondary)',
    textDecoration: 'none',
    fontFamily: 'var(--font-title)',
    fontWeight: isActive(path) ? '600' : '500',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    borderRadius: '8px',
    background: isActive(path) ? 'rgba(0, 210, 255, 0.08)' : 'transparent',
    transition: 'all 0.2s ease'
  });

  return (
    <nav style={{ 
      position: 'sticky', 
      top: '0', 
      zIndex: '100', 
      background: 'rgba(7, 3, 19, 0.75)', 
      backdropFilter: 'blur(12px)', 
      borderBottom: '1px solid var(--border-color)',
      padding: '16px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
          <span style={{ fontSize: '24px' }}>🌌</span>
          <span style={{ 
            fontFamily: 'var(--font-title)', 
            fontWeight: '800', 
            fontSize: '22px', 
            background: 'var(--gradient-text)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.05em'
          }}>ECHO</span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-menu">
          {token && user ? (
            <>
              {user.goal && (
                <>
                  <Link to="/dashboard" style={linkStyle('/dashboard')}>
                    <Compass size={16} />
                    <span>Your Echo</span>
                  </Link>
                  <Link to="/journal" style={linkStyle('/journal')}>
                    <PenTool size={16} />
                    <span>Journal</span>
                  </Link>
                  <Link to="/progress" style={linkStyle('/progress')}>
                    <Activity size={16} />
                    <span>Progress</span>
                  </Link>
                  <Link to="/routine" style={linkStyle('/routine')}>
                    <Clock size={16} />
                    <span>Routine</span>
                  </Link>
                  <Link to="/letters" style={linkStyle('/letters')}>
                    <Mail size={16} />
                    <span>Letters</span>
                  </Link>
                  <Link to="/schedule" style={linkStyle('/schedule')}>
                    <CheckSquare size={16} />
                    <span>Schedule</span>
                  </Link>
                </>
              )}
              <Link to="/our-story" style={linkStyle('/our-story')}>
                <BookOpen size={15} />
                <span>Our Story</span>
              </Link>
              <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 8px' }}></div>
              <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <UserIcon size={14} className="text-gradient" />
                {user.name}
              </span>
              <button 
                onClick={handleLogoutClick}
                style={{ 
                  background: 'rgba(247, 37, 133, 0.1)', 
                  border: '1px solid rgba(247, 37, 133, 0.3)', 
                  color: 'var(--color-magenta)', 
                  padding: '8px 16px', 
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginLeft: '8px'
                }}
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/how-it-works" style={linkStyle('/how-it-works')}>How It Works</Link>
              <Link to="/our-story" style={linkStyle('/our-story')}>Our Story</Link>
              <Link to="/contact" style={linkStyle('/contact')}>Feedback</Link>
              <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 8px' }}></div>
              <Link to="/login" style={linkStyle('/login')}>Login</Link>
              <Link to="/signup" className="btn-glow" style={{ padding: '8px 20px', fontSize: '14px' }}>
                Begin Echo
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          onClick={toggleMenu} 
          style={{ 
            display: 'none', 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-primary)', 
            cursor: 'pointer' 
          }}
          className="mobile-menu-btn"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Links Dropdown */}
      {isOpen && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px', 
          padding: '16px 8px 8px 8px',
          borderTop: '1px solid var(--border-color)',
          marginTop: '16px'
        }} className="mobile-menu-dropdown">
          {token && user ? (
            <>
              {user.goal && (
                <>
                  <Link to="/dashboard" style={linkStyle('/dashboard')} onClick={toggleMenu}>
                    <Compass size={16} />
                    <span>Your Echo</span>
                  </Link>
                  <Link to="/journal" style={linkStyle('/journal')} onClick={toggleMenu}>
                    <PenTool size={16} />
                    <span>Journal</span>
                  </Link>
                  <Link to="/progress" style={linkStyle('/progress')} onClick={toggleMenu}>
                    <Activity size={16} />
                    <span>Progress</span>
                  </Link>
                  <Link to="/routine" style={linkStyle('/routine')} onClick={toggleMenu}>
                    <Clock size={16} />
                    <span>Routine</span>
                  </Link>
                  <Link to="/letters" style={linkStyle('/letters')} onClick={toggleMenu}>
                    <Mail size={16} />
                    <span>Letters</span>
                  </Link>
                  <Link to="/schedule" style={linkStyle('/schedule')} onClick={toggleMenu}>
                    <CheckSquare size={16} />
                    <span>Schedule</span>
                  </Link>
                </>
              )}
              <Link to="/our-story" style={linkStyle('/our-story')} onClick={toggleMenu}>Our Story</Link>
              <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }}></div>
              <span style={{ color: 'var(--text-primary)', fontSize: '14px', padding: '4px 12px' }}>
                Signed in as: {user.name}
              </span>
              <button 
                onClick={handleLogoutClick}
                style={{ 
                  background: 'rgba(247, 37, 133, 0.1)', 
                  border: '1px solid rgba(247, 37, 133, 0.3)', 
                  color: 'var(--color-magenta)', 
                  padding: '10px', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/how-it-works" style={linkStyle('/how-it-works')} onClick={toggleMenu}>How It Works</Link>
              <Link to="/our-story" style={linkStyle('/our-story')} onClick={toggleMenu}>Our Story</Link>
              <Link to="/contact" style={linkStyle('/contact')} onClick={toggleMenu}>Feedback</Link>
              <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }}></div>
              <Link to="/login" style={linkStyle('/login')} onClick={toggleMenu}>Login</Link>
              <Link to="/signup" className="btn-glow" style={{ padding: '10px', fontSize: '14px', justifyContent: 'center' }} onClick={toggleMenu}>
                Begin Echo
              </Link>
            </>
          )}
        </div>
      )}

      {/* Basic Mobile Responsive Display CSS Injection */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
