import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalForm from '../components/GoalForm';
import { Sparkles } from 'lucide-react';

export default function Onboarding({ token, user, onUpdateUser }) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoalSubmit = async (formData) => {
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('https://echo-backend-1jn4.onrender.com/api/goal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Update user state in App.jsx
        onUpdateUser(data.user);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(data.error || 'Failed to establish connection. Please try again.');
      }
    } catch (err) {
      console.error('Error during onboarding submit:', err);
      setError('Connection failure. Verify your server connection.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', padding: '60px 24px w-100' }}>
      
      {/* Intro Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', padding: '8px', borderRadius: '50%', background: 'rgba(0, 210, 255, 0.1)', color: 'var(--color-blue)', marginBottom: '16px' }}>
          <Sparkles size={20} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
          Establish Your Link
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Let's shape your Future Self persona. The coordinates you set here will configure our temporal channel.
        </p>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(247, 37, 133, 0.1)', borderColor: 'var(--color-magenta)', color: 'var(--color-magenta)', marginBottom: '24px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {/* Goal onboarding form */}
      <GoalForm 
        onSubmit={handleGoalSubmit} 
        isSaving={isSaving} 
        initialValues={user || {}} 
      />

    </div>
  );
}
