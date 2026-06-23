import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';

// Page imports
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Letters from './pages/Letters';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Progress from './pages/Progress';
import Routine from './pages/Routine';
import OurStory from './pages/OurStory';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('echo_token') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('echo_token', token);
    } else {
      localStorage.removeItem('echo_token');
    }
  }, [token]);

  // Load user profile when token changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://echo-project-ho9e.onrender.com/api/auth/login', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Wait, standard endpoint to check auth is usually /api/auth/me or similar,
        // let's make the signup/login endpoints return user info,
        // and we can fetch user profile. Let's make an endpoint in auth.js or reuse goal check,
        // Actually, we can decode the token or fetch user info.
        // Let's create a quick route GET /api/auth/me or just get user info from a profile check.
        // In backend/routes/auth.js we didn't define GET /me. Let's add GET /api/auth/me!
        // Wait, let's write it in App.jsx that fetches /api/auth/me. I will also make sure to add it to backend routes,
        // or we can fetch goal info to get user details! GET /api/goal is not defined but we can just use GET /api/auth/me.
        // Let's call /api/auth/me.
        const res = await fetch('https://echo-project-ho9e.onrender.com/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          // Token expired or invalid
          setToken('');
          setUser(null);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleLogin = (jwtToken, userData) => {
    setToken(jwtToken);
    setUser(userData);
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('echo_token');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // Protected Route component
  const ProtectedRoute = ({ children, requireGoal = true }) => {
    if (loading) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '15px' }}>
          <div className="writing-indicator">
            <div className="dot-pulse"></div>
            <div className="dot-pulse"></div>
            <div className="dot-pulse"></div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-title)' }}>Opening Echo link...</p>
        </div>
      );
    }

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    if (requireGoal && user && !user.goal) {
      return <Navigate to="/onboarding" replace />;
    }

    return children;
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar token={token} user={user} onLogout={handleLogout} />

        <main style={{ flex: '1', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div className="aurora-bg"></div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home token={token} user={user} />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/about" element={<Navigate to="/our-story" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={token ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={token ? <Navigate to="/onboarding" replace /> : <Signup onLogin={handleLogin} />}
            />

            {/* Protected Routes */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute requireGoal={false}>
                  <Onboarding token={token} user={user} onUpdateUser={handleUpdateUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard token={token} user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journal"
              element={
                <ProtectedRoute>
                  <Journal token={token} user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/letters"
              element={
                <ProtectedRoute>
                  <Letters token={token} user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <Schedule token={token} user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <Progress token={token} user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/routine"
              element={
                <ProtectedRoute>
                  <Routine token={token} user={user} />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px 0', background: 'rgba(5, 2, 12, 0.9)', backdropFilter: 'blur(10px)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🌌</span>
              <span style={{ fontFamily: 'var(--font-title)', fontWeight: '700', fontSize: '18px', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ECHO</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>&copy; {new Date().getFullYear()} Echo. Growth driven by connection, not guilt.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/our-story" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Philosophy</Link>
              <Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
