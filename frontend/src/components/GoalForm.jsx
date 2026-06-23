import React, { useState } from 'react';
import { Target, Heart, Shield, Sparkles, Navigation } from 'lucide-react';

export default function GoalForm({ initialValues = {}, onSubmit, isSaving }) {
  const [goal, setGoal] = useState(initialValues.goal || '');
  const [why, setWhy] = useState(initialValues.why || '');
  const [traits, setTraits] = useState(initialValues.personaTraits || []);
  const [dayDescription, setDayDescription] = useState(
    initialValues.onboardingAnswers?.dayDescription || ''
  );
  const [error, setError] = useState('');

  const traitOptions = [
    { label: 'Resilient & Grounded', value: 'Resilient' },
    { label: 'Warm & Compassionate', value: 'Compassionate' },
    { label: 'Peaceful & Wiser', value: 'Peaceful' },
    { label: 'Bold & Creative', value: 'Bold' },
    { label: 'Analytical & Focused', value: 'Focused' },
    { label: 'Gentle & Understanding', value: 'Gentle' }
  ];

  const handleTraitToggle = (val) => {
    if (traits.includes(val)) {
      setTraits(traits.filter((t) => t !== val));
    } else {
      setTraits([...traits, val]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal.trim() || !why.trim()) {
      setError('Your goal and your "why" are essential to connect with Future You.');
      return;
    }
    setError('');
    onSubmit({
      goal,
      why,
      personaTraits: traits,
      onboardingAnswers: { dayDescription }
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Define Goal */}
      <div className="glass-panel" style={{ padding: '24px', background: 'rgba(15, 8, 30, 0.45)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(0, 210, 255, 0.1)' }}>
            <Target size={18} style={{ color: 'var(--color-blue)' }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px' }}>What are we working towards?</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
          Be specific. Describe the state you wish to arrive at.
        </p>
        <input 
          type="text" 
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., Becoming a software engineer at a company that supports climate action"
          style={{
            width: '100%',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '12px 16px',
            color: 'var(--text-primary)',
            fontSize: '15px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--color-blue)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        />
      </div>

      {/* 2. Define Why */}
      <div className="glass-panel" style={{ padding: '24px', background: 'rgba(15, 8, 30, 0.45)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(247, 37, 133, 0.1)' }}>
            <Heart size={18} style={{ color: 'var(--color-magenta)' }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px' }}>Why does this goal matter to you?</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
          Your core driver. Future You will reference this to ground you when streaks fall behind.
        </p>
        <textarea 
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          placeholder="e.g., I want creative freedom, to work without constant stress, and to build tools that help real people."
          style={{
            width: '100%',
            height: '100px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '12px 16px',
            color: 'var(--text-primary)',
            fontSize: '15px',
            resize: 'none',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--color-blue)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        />
      </div>

      {/* 3. Traits Selection */}
      <div className="glass-panel" style={{ padding: '24px', background: 'rgba(15, 8, 30, 0.45)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(157, 78, 221, 0.1)' }}>
            <Shield size={18} style={{ color: 'var(--color-violet)' }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px' }}>Select Future You's Voice Tone</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
          Choose qualities you want your future self's responses to embody.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {traitOptions.map((opt) => {
            const isChecked = traits.includes(opt.value);
            return (
              <label 
                key={opt.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: isChecked ? 'rgba(0, 210, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                  border: isChecked ? '1px solid var(--color-blue)' : '1px solid var(--border-color)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}
              >
                <input 
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleTraitToggle(opt.value)}
                  style={{ display: 'none' }}
                />
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '4px', 
                  border: '1px solid var(--text-muted)',
                  background: isChecked ? 'var(--color-blue)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isChecked && <div style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '1px' }} />}
                </div>
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Future Day Description */}
      <div className="glass-panel" style={{ padding: '24px', background: 'rgba(15, 8, 30, 0.45)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(0, 210, 255, 0.1)' }}>
            <Sparkles size={18} style={{ color: 'var(--color-blue)' }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px' }}>Describe a peaceful moment in your future life</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
          Where are you? What do you hear or see? Describe it as if you're there (used for nostalgic sensory detail).
        </p>
        <input 
          type="text" 
          value={dayDescription}
          onChange={(e) => setDayDescription(e.target.value)}
          placeholder="e.g., Sitting on the wooden deck in the morning, holding a hot mug of coffee as the mist clears."
          style={{
            width: '100%',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '12px 16px',
            color: 'var(--text-primary)',
            fontSize: '15px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--color-blue)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        />
      </div>

      {error && (
        <div style={{ color: 'var(--color-magenta)', fontSize: '14px', fontWeight: '500' }}>
          {error}
        </div>
      )}

      <button 
        type="submit" 
        className="btn-glow" 
        disabled={isSaving}
        style={{ padding: '16px', fontSize: '16px', justifyContent: 'center' }}
      >
        {isSaving ? (
          <span>Aligning Timelines...</span>
        ) : (
          <>
            <span>Establish Connection Link</span>
            <Navigation size={16} />
          </>
        )}
      </button>
    </form>
  );
}
