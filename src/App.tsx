import { useEffect } from 'react';

function App() {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.hero-lights')?.classList.add('visible');
    }, 500);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all sections except hero
    const sections = document.querySelectorAll('.fade-in, .section-lights');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <div className="hero-lights">
        <div className="blue-light-left"></div>
        <div className="blue-light-right"></div>
      </div>

      <div className="light-green section-lights"></div>
      <div className="light-yellow section-lights"></div>
      <div className="light-pink section-lights"></div>

      {/* Header */}
      <header className="header">
        <div className="logo">ResyncBot</div>
        <div className="nav-buttons">
          <button className="nav-link">Join the Support Server</button>
          <button className="nav-link">Invite ResyncBot</button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero fade-in">
        <div className="profile-circle">
          <span>PFP</span>
        </div>
        
        <h1 className="hero-title">
          Discord's First <br />
          <span className="hero-highlight">Video Resyncing</span> Tool.
        </h1>
        
        <p className="hero-description">
          ResyncBot is a video resyncing tool that allows users to resync their favourite edits in seconds, viewing them in a different light.
        </p>
        
        <div className="hero-buttons">
          <button className="btn-primary">INVITE NOW</button>
          <button className="btn-secondary">SEE FEATURES</button>
        </div>
        <div className="server-stats">
          Join 115+ Servers using ResyncBot.
        </div>
      </main>

      {/* Resync Demo Section */}
      <div className="demo-section fade-in">
        {/* Left side - explanation */}
        <div className="demo-content">
          <h2 className="demo-title">What is Resyncing?</h2>
          <p className="demo-description">
            Resyncing is the practice of replacing an edit or music video's audio with a different one that fits. This has been something editors and edit enjoyers alike have done for years, and ResyncBot makes it so much easier to do. Just give it a try using the example edit on the right!
          </p>
          <button className="btn-gradient">Generate a Random Resync</button>
        </div>

        {/* Right side - video placeholders */}
        <div className="demo-videos">
          <div className="video-container">
            <div className="video-label">Original</div>
            <div className="video-placeholder"></div>
          </div>
          
          <div className="video-container">
            <div className="video-label">Resynced</div>
            <div className="video-placeholder"></div>
          </div>
        </div>
      </div>
      {/* Audio Selection Section */}
      <div className="audio-section fade-in">
        <h2 className="audio-title">Choose your own audio!</h2>
        <p className="audio-description">
          ResyncBot allows you to choose your own audio to resync with! This includes audios from YouTube, Spotify, SoundCloud and more. Try it below by inputting your favourite song.
        </p>
        
        <div className="audio-input-container">
          <input 
            type="text" 
            placeholder="Paste your audio URL here..." 
            className="audio-input"
          />
          <button className="btn-generate">Generate Resync</button>
        </div>

        <div className="audio-demo">
          <div className="audio-video-container">
            <div className="video-label">Original</div>
            <div className="video-placeholder"></div>
          </div>
          
          <div className="audio-video-container">
            <div className="video-label">Resynced</div>
            <div className="video-placeholder generating">
              <span className="generating-text">Generating...</span>
            </div>
          </div>
        </div>
      </div>
      {/* How it Works Section */}
      <div className="how-it-works fade-in">
        <h2 className="works-title">How it works.</h2>
        <p className="works-description">
          Resyncbot analyzes the BPM (beats per minute) of both audios, and tries to match the waveforms of both audios as accurately as possible, creating an accurate resync. Users can also have manual control by specifying when the audio should start instead.
        </p>
        
        <div className="waveform-container">
          <svg className="waveform" viewBox="-30 -30 460 180">
            <path className="wave-1" d="M0,60 Q20,40 40,60 Q60,80 80,60 Q100,40 120,60 Q140,80 160,60 Q180,40 200,60 Q220,80 240,60 Q260,40 280,60 Q300,80 320,60 Q340,40 360,60 Q380,80 400,60" />
            <path className="wave-2" d="M0,60 Q20,80 40,60 Q60,40 80,60 Q100,80 120,60 Q140,40 160,60 Q180,80 200,60 Q220,40 240,60 Q260,80 280,60 Q300,40 320,60 Q340,80 360,60 Q380,40 400,60" />
          </svg>
        </div>
      </div>

      {/* Media Downloader Section */}
      <div className="media-downloader fade-in">
        <h2 className="downloader-title">Built-in Media Downloader.</h2>
        <p className="downloader-description">
          Powered by yt-dlp, ResyncBot has commands that allow you to download your favourite videos in seconds, as well as your favourite audios. Whether it be from YouTube, Instagram, or TikTok, ResyncBot supports it all, eliminating the need for third-party websites.
        </p>
        
        <div className="platform-showcase">
          <div className="platform-item">YouTube</div>
          <div className="platform-item">TikTok</div>
          <div className="platform-item">Instagram</div>
          <div className="platform-item">SoundCloud</div>
          <div className="platform-item">Spotify</div>
          <div className="platform-item">Twitter</div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="final-cta fade-in">
        <h2 className="cta-title">Ready to start Resyncing?</h2>
        <button className="btn-invite-final">Invite ResyncBot to your server.</button>
      </div>
    </div>
  )
}

export default App