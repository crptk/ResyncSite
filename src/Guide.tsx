import React, {useEffect} from "react";
import './index.css';

type Command = { name: string; desc: string };

function Section({
  id,
  title,
  accent,
  blurb,
  commands,
  extra
}: {
  id: string;
  title: string;
  accent: "green" | "purple" | "yellow" | "pink" | "blue";
  blurb: string;
  commands: Command[];
  extra?: React.ReactNode;
}) {
  return (
    <section id={id} className="guide-section fade-in">
      <h2 className={`guide-title ${accent}`}>{title}</h2>
      <p className="guide-blurb">{blurb}</p>

      <div className="guide-cmds">
        {commands.map((c) => (
          <div key={c.name} className="guide-card">
            <div className="guide-chip"><code>{c.name}</code></div>
            <p className="guide-desc">{c.desc}</p>
          </div>
        ))}
      </div>

      {extra && <div className="guide-extra">{extra}</div>}
    </section>
  );
}

const BotGuide: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.fade-in, .section-lights');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="guide hero-fade-in">
      <header className="guide-header">
        <h1 className="hero-title">
          ResyncBot <span className="hero-highlight">Guide</span>
        </h1>
        <p className="hero-description">
          Learn what each command does and how to get perfect syncs.
        </p>
      </header>

      {/* Section 1 */}
      <Section
        id="random"
        title="Random Resync Commands"
        accent="blue"
        blurb="Get a random track from our database that matches your video’s BPM."
        commands={[
          { name: "/resyncrandommedia", desc: "Provide a video URL (YouTube, etc.). Bot finds a random track with matching BPM and auto-syncs using waveform analysis." },
          { name: "/resyncrandomfile", desc: "Upload your video file directly. Same BPM matching from the database with automatic sync." }
        ]}
        extra={
          <ol className="guide-list">
            <li>Analyzes your video’s audio BPM</li>
            <li>Searches database for matching tempo</li>
            <li>Randomly selects a track & syncs it</li>
            <li>Uses waveform analysis for precise timing</li>
          </ol>
        }
      />

      {/* Section 2 */}
      <Section
        id="auto"
        title="Auto Resync Commands"
        accent="purple"
        blurb="Intelligent sync detection — let the bot find the perfect timing."
        commands={[
          { name: "/autoresyncmedia", desc: "Video URL + Audio URL. Choose sync method (waveform/beat/both). Bot analyzes and finds the optimal sync point." },
          { name: "/autoresyncmp4", desc: "Upload video + provide audio URL. Same intelligent sync detection." },
          { name: "/autoresyncmp3", desc: "Upload both video and audio files. Complete offline processing." }
        ]}
        extra={
          <>
            <h4 className="guide-subtitle">Sync Methods</h4>
            <ul className="guide-list">
              <li><strong>Waveform</strong>: Matches audio patterns (best overall for tone/atmosphere).</li>
              <li><strong>Beat</strong>: Rhythm/tempo matching (more precise for beat-matching).</li>
              <li><strong>Both</strong>: Uses both methods for best results.</li>
            </ul>
          </>
        }
      />

      {/* Section 3 */}
      <Section
        id="manual"
        title="Manual Resync Commands"
        accent="yellow"
        blurb="Full control over timing — specify exactly when audio should start."
        commands={[
          { name: "/resyncmedia", desc: "Video URL + Audio URL + timing offset. Classic resync with manual control." },
          { name: "/resyncmp4", desc: "Upload video + provide audio URL + offset. Manual timing control." },
          { name: "/resyncmp3", desc: "Upload both video and audio + offset. Complete manual control." }
        ]}
        extra={
          <>
            <h4 className="guide-subtitle">Timing Formats</h4>
            <ul className="guide-list">
              <li><code>0:30</code> — start audio at 30s</li>
              <li><code>1:15</code> — start audio at 1m 15s</li>
              <li><code>2:30-1:45</code> — difference calculation (45s)</li>
              <li>Video start/end times are also supported</li>
            </ul>
          </>
        }
      />

      {/* Section 4 */}
      <Section
        id="other"
        title="Other Commands"
        accent="pink"
        blurb="Additional tools and utilities."
        commands={[
          { name: "/downloadvideo", desc: "Download a video from a given link in full quality (YouTube, Instagram, TikTok, etc.)." },
          { name: "/downloadaudio", desc: "Download an audio track from a given link (Spotify, SoundCloud, YouTube, etc.)." },
          { name: "/loopaudio", desc: "Upload an audio file, set start/end, and generate a clean loop for editing inspiration." },
          { name: "/guide", desc: "Quick tips for manual/auto resync techniques and sync methods." },
          { name: "/limits", desc: "Check your daily usage, see remaining limits, and view premium status." },
          { name: "/vote", desc: "Upvote ResyncBot to reset daily limits and support the bot." }
        ]}
      />

      {/* Section 5 */}
      <Section
        id="limits"
        title="Limits & Premium"
        accent="green"
        blurb="Free tier vs Premium at a glance."
        commands={[]}
        extra={
          <div className="limits-grid">
            <div className="guide-card">
              <h4 className="guide-subtitle">Free Tier Limits</h4>
              <ul className="guide-list">
                <li>4 auto resyncs per day</li>
                <li>7 random resyncs per day</li>
                <li>Unlimited manual resyncs</li>
              </ul>
            </div>
            <div className="guide-card">
              <h4 className="guide-subtitle">Premium Benefits</h4>
              <ul className="guide-list">
                <li>Unlimited auto & random resyncs</li>
                <li>Priority processing queue</li>
                <li>$3/month or $25 lifetime</li>
                <li>No watermark</li>
                <li>Supports development ❤️</li>
              </ul>
            </div>
          </div>
        }
      />

      <footer className="guide-footer">
        <a
          className="btn-primary"
          href="https://discord.com/oauth2/authorize?client_id=1372406004515475577&permissions=2147600384&scope=bot+applications.commands"
          target="_blank"
          rel="noopener noreferrer"
        >
          Invite ResyncBot
        </a>
      </footer>
    </main>
  );
};

export default BotGuide;
