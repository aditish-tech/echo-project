import React from 'react';
import { Sparkles, BookOpen, Compass, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OurStory() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px', position: 'relative' }}>
      
      {/* Visual background aurora glow */}
      <div className="aurora-bg" style={{ top: '-10%', height: '400px', opacity: '0.15' }}></div>

      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-blue)', fontSize: '13px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
          <Sparkles size={14} />
          <span>The Echo Origin</span>
        </div>
        <h1 className="glow-text text-gradient" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2' }}>
          Our Story
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', fontWeight: '300', fontFamily: 'var(--font-title)' }}>
          A journey of companionship across time, built line by line.
        </p>
      </div>

      {/* Main Narrative Essay */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', lineHeight: '1.8', fontSize: '16px', color: 'var(--text-secondary)' }}>
        
        <div className="glass-panel" style={{ padding: '40px', background: 'rgba(10, 5, 25, 0.4)' }}>
          <p style={{ marginBottom: '24px', fontSize: '17px', color: 'var(--text-primary)', fontStyle: 'italic', borderLeft: '3px solid var(--color-blue)', paddingLeft: '16px' }}>
            The screen glowed at 3:00 AM, casting a soft blue hue over Aditi’s small desk. Around her, the apartment was silent. In front of her, a popular task-management app was flashing a bright red warning. She had missed her workout, again. Below it, a journaling app reprimanded her for breaking a forty-day streak. Instead of feeling inspired to do better tomorrow, Aditi felt a familiar, heavy weight in her chest: guilt.
          </p>

          <p style={{ marginBottom: '24px' }}>
            She realized then how clinical and demanding our tools had become. They behaved like strict managers, tracking every minute and flashing notifications that felt more like warnings than encouragement. We were treated like machines on an assembly line. But human growth isn't a linear percentage bar. It is winding, messy, and deeply emotional.
          </p>

          <p style={{ marginBottom: '24px' }}>
            That night, Aditi closed the apps. She began to think about what actually motivated her to grow. It wasn’t the fear of breaking a number, nor was it the sterile satisfaction of checking a box. It was a sense of purpose. She wondered: what if, instead of being yelled at by a system notification, she could hear from the one person who truly understood the struggle? What if she could talk to her future self?
          </p>

          <p style={{ marginBottom: '24px', fontWeight: '600', color: 'var(--text-primary)', textAlign: 'center', letterSpacing: '0.05em', fontFamily: 'var(--font-title)', fontSize: '18px' }}>
            The concept of Echo was born in that quiet hour.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Aditi wanted to build a bridge across time. The idea was simple but profound: you write down your raw, unfiltered thoughts today, and the version of you who has already succeeded—the Future You—replies. Not with generic praise, but with the warmth, calm, and perspective of someone who has already lived through the struggle you are currently facing.
          </p>

          <p style={{ marginBottom: '24px' }}>
            But writing the code was only the first battle. As a solo developer, Aditi faced the technical challenge of building an AI integration that didn't feel cold. Standard language models excel at structured summaries and clinical step-by-step instructions. They sound like coaches, using exclamation marks and robotic high-fives. That was exactly what she wanted to avoid.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Aditi spent weeks tuning the prompts, stripping away the artificial enthusiasm. She taught the AI to speak with radical empathy. She programmed it to understand that if the user missed a day or felt overwhelmed, the correct response wasn’t a reminder of their failure, but an understanding embrace. She wanted the system to remember what it felt like to be exhausted, and to say: <em>"I remember when we felt that way. It's okay. We still made it."</em>
          </p>

          <p style={{ marginBottom: '24px' }}>
            She named the project Echo. It was a word that felt fitting. An echo is a sound that travels forward, hits a boundary, and returns to where it started. By journaling, users send their current voice forward into the dark of the future. The response they receive is their future self calling back from the destination, guiding them along the path. It is a reminder that they are not walking alone; they are walking toward someone who is waiting for them.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Echo is entirely Aditi's labor of love, built line by line, night after night. It stands apart from corporate productivity suites. It is not designed to maximize daily active users or sell data. It exists because she wanted to build a space that felt human.
          </p>

          <p style={{ marginBottom: '0' }}>
            When Aditi looks at Echo today, she doesn't see a standard productivity portal. She hopes that when people open it, they don't feel pressure to be perfect. Instead, she hopes they feel a quiet sense of companionship across time. Echo is a reminder that the struggles of today are just the memory files of tomorrow. Every word you write is a step toward the person you are becoming. And they are already proud of you.
          </p>
        </div>

        {/* Narrative Highlights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px' }} className="story-highlights">
          <div className="glass-panel" style={{ padding: '24px', background: 'rgba(0, 210, 255, 0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-blue)', marginBottom: '10px' }}>
              <Heart size={18} />
              <h4 style={{ fontSize: '16px', fontFamily: 'var(--font-title)' }}>Radical Empathy</h4>
            </div>
            <p style={{ fontSize: '13px', lineHeight: '1.6' }}>
              Echo is built around supportive, non-judgmental guidance. The platform believes that slips are part of the story, not points deducted.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '24px', background: 'rgba(157, 78, 221, 0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-violet)', marginBottom: '10px' }}>
              <Compass size={18} />
              <h4 style={{ fontSize: '16px', fontFamily: 'var(--font-title)' }}>Identity Shifts</h4>
            </div>
            <p style={{ fontSize: '13px', lineHeight: '1.6' }}>
              True habit building starts from who we are, not what we tick off. We align our daily routines with a future identity that calls back.
            </p>
          </div>
        </div>

        {/* Action Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '20px', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Write the next chapter of your timeline.
          </h3>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/journal" className="btn-glow">
              <BookOpen size={16} />
              <span>Open Journal Link</span>
            </Link>
            <Link to="/how-it-works" className="btn-secondary">
              <span>See How It Works</span>
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          .story-highlights {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
