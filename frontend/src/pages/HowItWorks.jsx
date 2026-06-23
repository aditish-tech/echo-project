import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Target, Eye, PenTool, Mail, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Target,
      color: "var(--color-blue)",
      title: "Define Your Goal",
      concept: "Igniting a Star in the Starfield",
      desc: "ECHO does not ask you how many calories you want to burn or how many lines of code you want to write. We ask you to define the future state. Where are you? What did you achieve? When you write this goal down during onboarding, we represent this as a single glowing node igniting in your personal dashboard space. It is a visual anchor.",
      detail: "This details your 'coordinate'—the point in time you are heading towards. Rather than measuring distance, ECHO measures alignment.",
      glow: "rgba(0, 210, 255, 0.15)"
    },
    {
      num: "02",
      icon: Eye,
      color: "var(--color-violet)",
      title: "Meet Your Future Persona",
      concept: "Silicon-Guided Reflection",
      desc: "Our servers take your goal, your personal 'Why', and the personality traits you wish to cultivate (e.g. warmth, resilience, analytical focus). Using Groq's generative layer, we compile a dedicated persona of 'Future You'. This persona does not speak as a trainer or coach. They write from a place of having succeeded, holding the memories of your current struggle.",
      detail: "They speak in a warm, wise, grounded tone, referencing details of your life. They know what it feels like to stand where you stand.",
      glow: "rgba(157, 78, 221, 0.15)"
    },
    {
      num: "03",
      icon: PenTool,
      color: "var(--color-magenta)",
      title: "Journal Your Raw Reality",
      concept: "Waveform Text Trails",
      desc: "Whenever you write in your daily journal, you cast your raw thoughts into the time link. Write about failures, exhaustion, missed days, or small breakthroughs. As you type, the editor glows and matches your typing rhythm with light wave trails. You are not forced to hit perfect checkmarks. Honest reflection is the only currency.",
      detail: "No streaks. If you miss a week, your future self understands. The route to them is not a straight line, but a winding path.",
      glow: "rgba(247, 37, 133, 0.15)"
    },
    {
      num: "04",
      icon: Mail,
      color: "var(--color-blue)",
      title: "Receive Responses Across Time",
      concept: "Connecting Pulses",
      desc: "Moments after saving your journal entry, your future self replies. These responses are kept short and punchy (under 120 words), written to give you immediate perspective. Every 7 entries, they write a detailed reflective Milestone Letter (200-300 words). They look back on your recent entries, contextualizing your struggles as part of the story they lived through.",
      detail: "You receive supportive suggested daily actions each morning. Not as items to feel guilty about, but actions they remember taking.",
      glow: "rgba(0, 210, 255, 0.15)"
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="glow-text text-gradient" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '16px' }}>
          Understanding the Connection
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', fontWeight: '300', lineHeight: '1.6' }}>
          Echo is built on identity-based motivation. Here is how your daily actions build the path to who you become.
        </p>
      </div>

      {/* 4 Steps detailed list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div 
              key={idx}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '40px',
                position: 'relative',
                background: `radial-gradient(circle at 10% 20%, ${step.glow} 0%, rgba(18, 11, 33, 0.4) 100%)`,
                borderColor: 'rgba(138, 43, 226, 0.2)'
              }}
            >
              {/* Step number watermark */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '40px',
                fontSize: '90px',
                fontWeight: '900',
                fontFamily: 'var(--font-title)',
                color: 'rgba(255,255,255,0.02)',
                userSelect: 'none',
                lineHeight: '1'
              }}>
                {step.num}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '12px', 
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${step.color}50`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: `0 0 15px ${step.color}30`
                }}>
                  <Icon size={24} style={{ color: step.color }} />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: step.color, fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Step {step.num} &mdash; {step.concept}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '24px', color: 'var(--text-primary)', marginTop: '4px' }}>
                    {step.title}
                  </h2>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', md: '2fr 1fr', gap: '30px', marginTop: '10px' }} className="step-content-grid">
                <div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '16px', lineHeight: '1.7', fontWeight: '300' }}>
                    {step.desc}
                  </p>
                </div>
                <div style={{ borderLeft: '2px solid rgba(255,255,255,0.05)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    Under the hood
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
                    {step.detail}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to action */}
      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '24px', marginBottom: '16px' }}>
          Ready to establish your connection?
        </h3>
        <Link to="/signup" className="btn-glow" style={{ padding: '14px 36px' }}>
          <span>Begin Onboarding</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .step-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
