import React from 'react';
import { Target, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '80px 24px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 className="glow-text text-gradient" style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: '800', marginBottom: '16px' }}>
          The Philosophy of Echo
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', fontWeight: '300' }}>
          Why we build connections, not checkmarks.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', lineHeight: '1.8', fontSize: '16px' }}>
        
        {/* Core narrative */}
        <div className="glass-panel" style={{ padding: '32px', background: 'rgba(15, 8, 30, 0.4)' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '22px', marginBottom: '16px', color: 'var(--color-blue)' }}>
            The Streak Burnout Epidemic
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Traditional productivity apps are built on behavioral guilt. They track streaks—forcing you to check boxes daily, flashing red indicators, and sending notifications that make you feel guilty when life gets in the way. 
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            When a streak snaps, the psychology is devastating: the "what-the-hell" effect kicks in, causing users to abandon their habits altogether. We are tracked, graded, and shamed. But growth isn't a factory assembly line.
          </p>
        </div>

        {/* Identity based growth explanation */}
        <div className="glass-panel" style={{ padding: '32px', background: 'rgba(157, 78, 221, 0.03)' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '22px', marginBottom: '16px', color: 'var(--color-violet)' }}>
            Identity-Based Motivation
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Behavioral science proves that lasting change doesn't come from external pressure—it comes from **identity shifting**. You don't run to get a streak; you run because you are a runner.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Echo builds a bridge between your current self and your future self. By writing daily journals and reading responses from the version of you who has already succeeded, you align your choices with that future identity. When you slip, Future You is there to say: *"I remember that slip. It's okay. We still made it."*
          </p>
        </div>

        {/* Three pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--color-blue)', marginBottom: '12px' }}><Target size={24} /></div>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '16px', marginBottom: '8px' }}>Aligned Coordinates</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
              We define clear coordinates of where we want to go, anchoring daily habits to a vivid future vision.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--color-magenta)', marginBottom: '12px' }}><Heart size={24} /></div>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '16px', marginBottom: '8px' }}>Radical Empathy</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
              Future You never judges. They speak with the warmth, calm, and confidence of someone who knows the struggle is temporary.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--color-violet)', marginBottom: '12px' }}><ShieldCheck size={24} /></div>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '16px', marginBottom: '8px' }}>Reflective Milestones</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
              No percentage bars. Progress is documented as a narrative of milestones and letters received.
            </p>
          </div>

        </div>

        {/* Closing CTA */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '20px', marginBottom: '16px' }}>
            Are you ready to write the story?
          </h3>
          <Link to="/signup" className="btn-glow" style={{ padding: '12px 30px' }}>
            <span>Begin Your Journey</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
