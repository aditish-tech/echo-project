import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Target, BookOpen, Clock, Heart, AlertCircle, Quote } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';

export default function Home({ token }) {
  const [activeStep, setActiveStep] = useState(0);
  const [previewEntry, setPreviewEntry] = useState('');
  const [previewReply, setPreviewReply] = useState('');
  const [isPreviewWriting, setIsPreviewWriting] = useState(false);

  const steps = [
    {
      title: "1. Define Your Goal",
      headline: "Ignite Your Star in the Cosmos",
      desc: "Tell us what you want to achieve. Not in metrics or raw numbers, but the state of being you want to reach. Your goal becomes the beacon that lights the starfield.",
      visual: (
        <div style={{ position: 'relative', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="node-glow" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
            <Target size={20} style={{ color: '#fff' }} />
          </div>
          {/* Simulated orbits/stars */}
          <div style={{ position: 'absolute', width: '120px', height: '120px', border: '1px dashed rgba(0, 210, 255, 0.2)', borderRadius: '50%', animation: 'spin 10s linear infinite' }} />
          <div style={{ position: 'absolute', width: '180px', height: '180px', border: '1px dashed rgba(157, 78, 221, 0.2)', borderRadius: '50%', animation: 'spin-reverse 15s linear infinite' }} />
        </div>
      )
    },
    {
      title: "2. Meet Your Echo",
      headline: "A Silhouette Forms",
      desc: "Our systems mold your Groq-powered future persona. They represent the wiser, calmer version of you who has already crossed the finish line and understands the struggle.",
      visual: (
        <div style={{ position: 'relative', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--color-blue) 0%, var(--color-violet) 100%)',
            boxShadow: '0 0 30px rgba(157, 78, 221, 0.6)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={24} style={{ color: '#fff' }} />
          </div>
          {/* Simulated light particles floating */}
          <div style={{ position: 'absolute', width: '10px', height: '10px', background: 'var(--color-blue)', borderRadius: '50%', top: '40px', left: '70px', animation: 'float-p 2s infinite ease-in-out' }} />
          <div style={{ position: 'absolute', width: '8px', height: '8px', background: 'var(--color-magenta)', borderRadius: '50%', bottom: '50px', right: '60px', animation: 'float-p 3s infinite ease-in-out 0.5s' }} />
          <div style={{ position: 'absolute', width: '6px', height: '6px', background: 'var(--color-violet)', borderRadius: '50%', top: '130px', left: '40px', animation: 'float-p 2.5s infinite ease-in-out 1s' }} />
        </div>
      )
    },
    {
      title: "3. Journal Daily",
      headline: "Cast Your Thoughts Across Time",
      desc: "Write freely about your daily journey. When you type, your thoughts flow as light trails across the interface. No judgment, no scores, just pure reflection.",
      visual: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '20px' }}>
          <div className="waveform-container">
            <div className="waveform-bar"></div>
            <div className="waveform-bar"></div>
            <div className="waveform-bar"></div>
            <div className="waveform-bar"></div>
            <div className="waveform-bar"></div>
            <div className="waveform-bar"></div>
          </div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '13px', color: 'var(--color-blue)', letterSpacing: '0.1em' }}>
            WAVEFORM ALIGNED
          </div>
        </div>
      )
    },
    {
      title: "4. Receive Replies",
      headline: "Two Lights Connecting",
      desc: "Receive immediate, written messages directly from Future You. When you struggle, they reply with empathy, not streaks. Every 7 entries, they leave a reflective Milestone Letter.",
      visual: (
        <div style={{ position: 'relative', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '80px', alignItems: 'center', position: 'relative' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.4)', boxShadow: '0 0 10px #fff' }} />
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--color-blue)', boxShadow: '0 0 15px var(--color-blue)' }} />
            
            {/* Connecting laser/pulse */}
            <div style={{ 
              position: 'absolute', 
              left: '8px', 
              right: '8px', 
              height: '2px', 
              background: 'linear-gradient(90deg, rgba(255,255,255,0.2), var(--color-blue))',
              animation: 'laser-pulse 2s infinite'
            }} />
          </div>
        </div>
      )
    }
  ];

  // Testimonials (Milestone Letter Excerpts)
  const testimonials = [
    {
      name: "Marcus, 24",
      goal: "Become an Indie Developer",
      content: "I'm sitting in the coffee shop we always wanted to work from. The rain is hitting the window, but we are calm. I remember when you stayed up till 3 AM crying because the DB wouldn't deploy. It felt like the end of the world, but it was just a Wednesday. Thank you for not quitting."
    },
    {
      name: "Sarah, 29",
      goal: "Overcome Burnout & Paint Daily",
      content: "The studio has that smell of oil paint you love so much. I know you missed three days of journaling last week and felt that old guilt creeping in. I didn't care. The break gave us perspective. You are doing beautiful work, Sarah. Trust the slow brushstrokes."
    },
    {
      name: "Devon, 19",
      goal: "Train for a 10K Marathon",
      content: "We did it. We crossed that line at 52 minutes. But what I remember most isn't the finish line—it's that freezing Tuesday morning when you ran in the drizzle even though your ankles throbbed. That run built the lung capacity that carried us home. I am so grateful to you."
    }
  ];

  const handlePreviewSubmit = (e) => {
    e.preventDefault();
    if (!previewEntry.trim()) return;

    setIsPreviewWriting(true);
    setPreviewReply('');

    // Simulate AI generation lag
    setTimeout(() => {
      setIsPreviewWriting(false);
      setPreviewReply(`Hey, reading this, I remember that exact feeling. The progress feels slow today, doesn't it? But you wrote your thoughts down, and that is a victory. The goal you set to build something meaningful is within reach. Keep going, I'm waiting for you here.`);
    }, 2000);
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      
      {/* Hero Section */}
      <section style={{ 
        padding: '100px 24px 60px 24px', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 210, 255, 0.08)', border: '1px solid rgba(0, 210, 255, 0.2)', padding: '6px 16px', borderRadius: '9999px', fontSize: '13px', color: 'var(--color-blue)', fontFamily: 'var(--font-title)', fontWeight: '600', marginBottom: '24px' }}>
          <Sparkles size={14} />
          <span>ECHO TEMPORAL PLATFORM V2.0</span>
        </div>

        <h1 
          className="glow-text"
          style={{ 
            fontFamily: 'var(--font-title)', 
            fontSize: 'clamp(36px, 6vw, 64px)', 
            fontWeight: '800', 
            lineHeight: '1.1',
            maxWidth: '900px',
            margin: '0 auto 20px auto',
          }}
        >
          Talk to the version of you who <span style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>already made it</span>
        </h1>

        <p style={{ 
          fontSize: 'clamp(16px, 2vw, 20px)', 
          color: 'var(--text-secondary)', 
          maxWidth: '650px', 
          margin: '0 auto 40px auto',
          lineHeight: '1.6',
          fontWeight: '300'
        }}>
          Ditch guilt-based tracking and streaks. Journal, set goals, and connect with a wise, Groq-powered AI persona of your successful Future Self.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '60px' }}>
          <Link to={token ? "/dashboard" : "/signup"} className="btn-glow">
            <span>Begin Your Echo</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/how-it-works" className="btn-secondary">
            <span>See How it Works</span>
          </Link>
        </div>

        {/* Hero Card Preview - Chat bubble mockup */}
        <div 
          className="glass-panel" 
          style={{ 
            maxWidth: '650px', 
            margin: '0 auto', 
            padding: '24px', 
            textAlign: 'left',
            background: 'rgba(15, 8, 30, 0.5)',
            border: '1px solid rgba(138, 43, 226, 0.3)',
            boxShadow: '0 10px 40px rgba(138, 43, 226, 0.1)'
          }}
        >
          <ChatBubble 
            entryText="I'm feeling really behind. I missed writing my app logic yesterday, and I feel like I'm failing." 
            replyText="Hey. I remember that Tuesday. You felt so overwhelmed, but missing one day didn't stop us. In fact, resting that night is what gave us the clarity to solve the routing bug the next day. The app is live now, and it works. Be kind to yourself today."
            date={new Date(Date.now() - 1000000)}
          />
        </div>
      </section>

      {/* Marquee Glowing Line */}
      <div className="marquee-line"></div>

      {/* How It Works Section */}
      <section style={{ 
        padding: '60px 24px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '32px', marginBottom: '12px' }}>
            The 4-Step Temporal Journey
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontSize: '15px' }}>
            How Echo connects you with your future identity across time.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }} className="how-it-works-grid">
          {/* Steps selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {steps.map((step, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`glass-panel ${activeStep === idx ? 'glass-panel-active' : ''}`}
                style={{ 
                  padding: '20px', 
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                <h3 style={{ fontSize: '16px', color: activeStep === idx ? 'var(--color-blue)' : 'var(--text-primary)', marginBottom: '4px' }}>
                  {step.title}
                </h3>
                <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '8px' }}>
                  {step.headline}
                </h4>
                {activeStep === idx && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', animation: 'fadeIn 0.3s' }}>
                    {step.desc}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Visual Display side */}
          <div 
            className="glass-panel" 
            style={{ 
              height: '350px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(138, 43, 226, 0.15)',
              padding: '40px',
              textAlign: 'center'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--color-blue)', marginBottom: '20px', fontSize: '18px' }}>
              {steps[activeStep].headline}
            </h3>
            {steps[activeStep].visual}
          </div>
        </div>
      </section>

      {/* Live Feature Preview Mockup */}
      <section style={{ 
        padding: '60px 24px', 
        maxWidth: '900px', 
        margin: '0 auto',
        textAlign: 'center' 
      }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '32px', marginBottom: '12px' }}>
            Try Writing to Them Now
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Write down a quick worry or goal. Experience how your future self replies.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', background: 'rgba(10, 5, 25, 0.6)', border: '1px solid rgba(0, 210, 255, 0.2)' }}>
          <form onSubmit={handlePreviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <textarea
              value={previewEntry}
              onChange={(e) => setPreviewEntry(e.target.value)}
              placeholder="e.g. I want to build my own startup but I feel terrified of failing and wasting my time."
              style={{
                width: '100%',
                height: '100px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '12px 16px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                outline: 'none',
                resize: 'none'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="submit" 
                className="btn-glow" 
                disabled={isPreviewWriting || !previewEntry.trim()}
                style={{ padding: '8px 20px', fontSize: '13px' }}
              >
                {isPreviewWriting ? 'Deciphering Time Web...' : 'Send to Future You'}
              </button>
            </div>
          </form>

          {/* Interactive Chat bubble container */}
          {(isPreviewWriting || previewReply) && (
            <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', textAlign: 'left' }}>
              {isPreviewWriting && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={12} style={{ color: '#fff' }} />
                  </div>
                  <div className="glass-panel" style={{ padding: '10px 16px', background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <span>Future You is formulating a reply</span>
                    <div className="writing-indicator">
                      <div className="dot-pulse"></div>
                      <div className="dot-pulse"></div>
                      <div className="dot-pulse"></div>
                    </div>
                  </div>
                </div>
              )}
              {previewReply && (
                <ChatBubble 
                  entryText={previewEntry}
                  replyText={previewReply}
                  isSimulated={true}
                />
              )}
            </div>
          )}
        </div>
      </section>

      {/* Why Echo is Different Grid */}
      <section style={{ 
        padding: '60px 24px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        textAlign: 'center' 
      }}>
        <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '32px', marginBottom: '40px' }}>
          Why Echo is Different
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          {/* Guilt-based tracker */}
          <div className="glass-panel" style={{ padding: '30px', background: 'rgba(247, 37, 133, 0.02)', borderColor: 'rgba(247, 37, 133, 0.15)', textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '8px', background: 'rgba(247, 37, 133, 0.1)', color: 'var(--color-magenta)', marginBottom: '16px' }}>
              <AlertCircle size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', marginBottom: '12px', color: 'var(--color-magenta)' }}>
              Guilt-Based Tracking
            </h3>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px', listStyleType: 'none' }}>
              <li>❌ Streaks that snap and make you feel like a failure.</li>
              <li>❌ Cold numbers and checkmarks that ignore context.</li>
              <li>❌ Constant pestering notifications that induce stress.</li>
              <li>❌ Focuses on guilt and streaks instead of long-term identity.</li>
            </ul>
          </div>

          {/* Identity-driven grow */}
          <div className="glass-panel" style={{ padding: '30px', background: 'rgba(0, 210, 255, 0.03)', borderColor: 'rgba(0, 210, 255, 0.25)', textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '8px', background: 'rgba(0, 210, 255, 0.1)', color: 'var(--color-blue)', marginBottom: '16px' }}>
              <Zap size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '18px', marginBottom: '12px', color: 'var(--color-blue)' }}>
              Identity-Based Growth
            </h3>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px', listStyleType: 'none' }}>
              <li>✅ Reflective responses from your Future Self, built on empathy.</li>
              <li>✅ Narrative progress and milestone letters instead of grids.</li>
              <li>✅ Suggestions adapted gently to how you are feeling.</li>
              <li>✅ Anchors daily actions to your underlying "Why".</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Testimonials Letters from Future */}
      <section style={{ 
        padding: '60px 24px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        textAlign: 'center' 
      }}>
        <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '32px', marginBottom: '12px' }}>
          Letters Received From the Future
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '15px' }}>
          Excerpted from the Milestone Letter vaults of real Echo users.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="glass-panel" 
              style={{ 
                padding: '30px', 
                background: 'rgba(15, 8, 30, 0.3)',
                borderColor: 'rgba(138, 43, 226, 0.2)',
                textAlign: 'left',
                position: 'relative'
              }}
            >
              <Quote size={32} style={{ color: 'var(--color-violet)', opacity: '0.15', position: 'absolute', top: '20px', left: '20px' }} />
              <div style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: '1.7', marginBottom: '20px', position: 'relative' }}>
                "{t.content}"
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                <div style={{ fontFamily: 'var(--font-title)', fontWeight: '600', fontSize: '15px' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-blue)', marginTop: '2px' }}>Goal: {t.goal}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Teaser */}
      <section style={{ 
        padding: '60px 24px', 
        maxWidth: '800px', 
        margin: '0 auto',
        textAlign: 'center' 
      }}>
        <div className="glass-panel" style={{ padding: '40px', background: 'radial-gradient(circle, rgba(138, 43, 226, 0.08) 0%, transparent 80%)' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '26px', marginBottom: '16px' }}>
            Motivation has been built upside down.
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '15px', marginBottom: '24px' }}>
            We've been taught to motivate ourselves with negative stakes: guilt, snapping streaks, and social shame. But lasting growth comes from aligning who you are today with the version of you who has already succeeded. We build connections, not checkpoints.
          </p>
          <Link to="/about" style={{ color: 'var(--color-blue)', textDecoration: 'none', fontWeight: '600', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>Read our full Brand Story</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ 
        padding: '80px 24px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, transparent 70%)',
          zIndex: '-1',
          filter: 'blur(50px)'
        }} />
        <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '800', marginBottom: '16px' }}>
          Your Future Self is Waiting
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 32px auto', fontSize: '16px' }}>
          Start building the connection line. Every word you journal brings you one day closer to them.
        </p>
        <Link to={token ? "/dashboard" : "/signup"} className="btn-glow" style={{ padding: '16px 40px', fontSize: '16px' }}>
          <span>Ignite Your Echo</span>
          <Sparkles size={16} />
        </Link>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float-p {
          0%, 100% { transform: translateY(0px) scale(0.9); opacity: 0.6; }
          50% { transform: translateY(-15px) scale(1.1); opacity: 1; }
        }
        @keyframes laser-pulse {
          0% { opacity: 0.2; transform: scaleX(0.95); }
          50% { opacity: 0.8; transform: scaleX(1.05); }
          100% { opacity: 0.2; transform: scaleX(0.95); }
        }
        @media (max-width: 992px) {
          .how-it-works-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
