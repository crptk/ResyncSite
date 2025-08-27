function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">ResyncBot</div>
        <div className="nav-buttons">
          <button className="nav-link">Join the Support Server</button>
          <button className="nav-link">Invite ResyncBot</button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero">
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
      </main>

      {/* Server Stats */}
      <div className="server-stats">
        Join 115+ Servers using ResyncBot.
      </div>

      {/* Resync Demo Section */}
      <div className="demo-section">
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
      <div className="audio-section">
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
      <div className="how-it-works">
        <h2 className="works-title">How it works.</h2>
        <p className="works-description">
          Resyncbot analyzes the BPM (beats per minute) of both audios, and tries to match the waveforms of both audios as accurately as possible, creating an accurate resync. Users can also have manual control by specifying when the audio should start instead.
        </p>
        
        <div className="waveform-container">
          <svg className="waveform" viewBox="0 0 400 100">
            <path d="M0,50 Q50,20 100,50 T200,50 Q250,80 300,50 T400,50" 
                  stroke="#fbbf24" strokeWidth="4" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Media Downloader Section */}
      <div className="media-downloader">
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
      <div className="final-cta">
        <h2 className="cta-title">Ready to start Resyncing?</h2>
        <button className="btn-invite-final">Invite ResyncBot to your server.</button>
      </div>
    </div>
  )
}

export default App