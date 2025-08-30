import { useEffect, useState } from 'react';

function Home() {
    const [isGenerating1, setIsGenerating1] = useState(false);
    const [isGenerating2, setIsGenerating2] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');
    const [detectedBpm, setDetectedBpm] = useState<null | number | "DURATION_ERROR" | "ERROR">(null);
    const [isAnalyzingBpm, setIsAnalyzingBpm] = useState(false);
    const [serverCount, setServerCount] = useState<number | null>(null);
    const [mediaUrl, setMediaUrl] = useState('');
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [stuck, setStuck] = useState(false);
    const [lightsVisible, setLightsVisible] = useState(false);
    const discord_invite = "https://discord.com/oauth2/authorize?client_id=1372406004515475577&permissions=2147600384&scope=bot+applications.commands"
    const handleRandomResync = async () => {
        if (isGenerating1) return; // Prevent double-clicks

        setIsGenerating1(true);

        const container = document.getElementById('resynced-demo-1');
        if (!container) {
            console.error('Could not find resynced-demo-1 container');
            setIsGenerating1(false);
            return;
        }
        container.className = 'video-content generating';
        container.innerHTML = '<span class="generating-text purple">Generating...</span>';

        try {
            const response = await fetch('http://127.0.0.1:5000/demo/random-resync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Random resync failed');
            }

            // Get the video blob
            const videoBlob = await response.blob();
            const videoUrl = URL.createObjectURL(videoBlob);

            // Replace the generating content with the video
            const container = document.getElementById('resynced-demo-1');
            if (!container) {
                console.error('Could not find resynced-demo-1 container');
                setIsGenerating1(false);
                return;
            }
            container.className = 'video-content has-video';
            container.innerHTML = `
        <video controls onContextMenu="return false;">
          <source src="${videoUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;

        } catch (error) {
            console.error('Random resync failed:', error);
            // Show error in the container
            const container = document.getElementById('resynced-demo-1');
            if (!container) {
                console.error('Could not find resynced-demo-1 container');
                setIsGenerating1(false);
                return;
            }
            container.className = 'video-content generating';
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            container.innerHTML = `<span class="generating-text purple">Error: ${errorMessage}</span>`;
        } finally {
            setIsGenerating1(false);
        }
    };

    const handleCustomResync = async () => {
        if (isGenerating2 || !audioUrl.trim()) return;

        setIsGenerating2(true);

        const container = document.getElementById('resynced-demo-2');
        if (!container) {
            console.error('Could not find resynced-demo-1 container');
            setIsGenerating1(false);
            return;
        }
        container.className = 'video-content generating';
        container.innerHTML = '<span class="generating-text green">Generating...</span>';

        try {
            const response = await fetch('http://127.0.0.1:5000/demo/custom-resync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ audio_url: audioUrl })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Custom resync failed');
            }

            const videoBlob = await response.blob();
            const videoUrl = URL.createObjectURL(videoBlob);

            // Replace generating content with video
            container.className = 'video-content has-video';
            container.innerHTML = `
        <video controls onContextMenu="return false;">
          <source src="${videoUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;

        } catch (error) {
            console.error('Custom resync failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

            container.className = 'video-content generating';
            container.innerHTML = `<span class="generating-text green">Error: ${errorMessage}</span>`;
        } finally {
            setIsGenerating2(false);
        }
    };

    const handleBpmAnalysis = async () => {
        if (isAnalyzingBpm || !audioUrl.trim()) return;

        setIsAnalyzingBpm(true);
        setDetectedBpm(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/demo/analyze-bpm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ audio_url: audioUrl })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'BPM analysis failed');
            }

            const data = await response.json();
            setDetectedBpm(data.bpm);

        } catch (error) {
            console.error('BPM analysis failed:', error);

            const msg =
                error instanceof Error ? error.message : String(error || '');

            if (msg.toLowerCase().includes('please use audio')) {
                // Your console example: "Please use audio shorter than 5 minutes."
                setDetectedBpm('DURATION_ERROR');
            } else {
                setDetectedBpm('ERROR');
            }

        } finally {
            setIsAnalyzingBpm(false);
        }
    };

    const handleMediaPreview = async () => {
        if (isPreviewing || !mediaUrl.trim()) return;

        setIsPreviewing(true);
        const container = document.getElementById('media-preview-simple');
        if (container) {
            container.innerHTML = `<p style="color: #9ca3af; font-size: 16px;">Generating preview...</p>`;
        }

        try {
            const res = await fetch('http://127.0.0.1:5000/demo/preview-media', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: mediaUrl, kind: "auto" })
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Preview failed');
            }

            const contentType = res.headers.get("content-type") || "";
            const blob = await res.blob();
            const objectUrl = URL.createObjectURL(blob);

            if (!container) return;

            const isAudio = contentType.includes("audio");

            container.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100px;
          padding: ${isAudio ? '20px 0' : '0'};
          border-radius: 12px;
        ">
          ${isAudio
                    ? `<audio 
                  controls 
                  preload="metadata"
                  oncontextmenu="return false;"
                  controlsList="nodownload"
                  style="
                    display: block;
                    width: 100%;
                    max-width: 800px;
                    min-width: 600px;
                    min-height: 48px;
                    height: 48px;
                    margin: 0 auto;
                    border-radius: 8px;
                ">
                <source src="${objectUrl}" type="${contentType}">
                Your browser does not support the audio element.
              </audio>`
                    : `<video 
                  controls 
                  preload="metadata"
                  oncontextmenu="return false;"
                  controlsList="nodownload"
                  style="
                    display: block;
                    width: 100%;
                    max-width: 800px;
                    height: auto;
                    border-radius: 8px;
                    margin: 0 auto;
                  ">
                <source src="${objectUrl}" type="${contentType}">
                Your browser does not support the video tag.
              </video>`
                }
        </div>
      `;


            // Optional: Reflow trigger
            container.offsetHeight;

        } catch (e: unknown) {
            if (container) {
                const msg = e instanceof Error ? e.message : String(e);
                container.innerHTML = `<p style="color: #ef4444; font-size: 16px;">Error: ${msg}</p>`;
            }
        } finally {
            setIsPreviewing(false);
        }
    };


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

        // For live server count update
        const fetchServers = async () => {
            try {
                const res = await fetch("http://127.0.0.1:5000/metrics/servers");
                const json = await res.json();
                if (typeof json?.total_servers === "number") {
                    setServerCount(json.total_servers);
                }
            } catch {
                setServerCount(null);
            }
        };
        fetchServers();
        const id = setInterval(fetchServers, 5 * 60 * 1000); // refresh every 5 mins
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const fetchServers = async () => {
            try {
                const res = await fetch('http://127.0.0.1:5000/metrics/servers');
                const json = await res.json();
                if (typeof json?.total_servers === 'number') setServerCount(json.total_servers);
            } catch {
                setServerCount(null);
            }
        };
        fetchServers();
        const id = setInterval(fetchServers, 5 * 60 * 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const onScroll = () => setStuck(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setLightsVisible(true), 300);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="app">
            
            <div className={`hero-lights ${lightsVisible ? 'visible' : ''}`}>
                <div className="blue-light-left"></div>
                <div className="blue-light-right"></div>
            </div>

            <div className="background-lights">
                <div className="light-green section-lights"></div>
                <div className="light-green2 section-lights"></div>
                <div className="light-yellow section-lights"></div>
                <div className="light-yellow2 section-lights"></div>
                <div className="light-purple section-lights"></div>
                <div className="light-purple2 section-lights"></div>
                <div className="light-pink section-lights"></div>
                <div className="light-pink2 section-lights"></div>
                <div className="white-light1 section-lights"></div>
                <div className="white-light2 section-lights"></div>
            </div>

            {/* Hero Section */}
            <main className="hero fade-in">
                <div className="profile-circle">
                    <img src="src/assets/pfp.png" alt="ResyncBot PFP" className="pfp-image" />
                </div>

                <h1 className="hero-title">
                    Discord's First <br />
                    <span className="hero-highlight">Video Resyncing</span> Tool
                </h1>

                <p className="hero-description">
                    ResyncBot is a video resyncing tool that allows users to resync their favourite edits in seconds, viewing them in a different light.
                </p>

                <div className="hero-buttons">
                    <a
                    href={discord_invite}
                    className="btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <img src="src/assets/discord-logo.svg" alt="Discord" className="btn-icon" />
                    INVITE NOW
                    </a>

                    <a href="#features" className="btn-secondary">
                        SEE FEATURES
                    </a>
                </div>
                <div className="server-stats">
                    {serverCount === null
                        ? "Join ResyncBot on Discord."
                        : `Join ${serverCount.toLocaleString()} ${serverCount === 1 ? "Server" : "Servers"
                        } using ResyncBot`}
                </div>
            </main>

            {/* Resync Demo Section */}
            <div id="features" className="demo-section fade-in">
                <div className="demo-content">
                    <h2 className="demo-title">What is Resyncing?</h2>
                    <p className="demo-description">
                        Resyncing is the practice of replacing an edit or music video's audio with a different one that fits. This has been something editors and edit enjoyers alike have done for years, and ResyncBot makes it so much easier to do. Just give it a try using the example edit on the right!
                    </p>
                    <button
                        className="btn-gradient"
                        onClick={handleRandomResync}
                        disabled={isGenerating1}
                    >
                        {isGenerating1 ? 'Generating...' : 'Generate a Random Resync'}
                    </button>
                </div>

                <div className="demo-videos">
                    <div className="video-container">
                        <div className="video-label purple">Original</div>
                        <div className="video-placeholder">
                            <div className="video-content has-video">
                                <video
                                    src="http://127.0.0.1:5000/demo/video"
                                    controls
                                    onContextMenu={(e) => e.preventDefault()}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>

                    <div className="video-container">
                        <div className="video-label purple">Resynced</div>
                        <div className="video-placeholder">
                            <div className="video-content generating" id="resynced-demo-1">
                                <span className="generating-text purple">Click the generate button to start generating!</span>
                            </div>
                        </div>
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
                        value={audioUrl}
                        onChange={(e) => setAudioUrl(e.target.value)}
                    />
                    <button
                        className="btn-generate"
                        onClick={handleCustomResync}
                        disabled={isGenerating2 || !audioUrl.trim()}
                    >
                        {isGenerating2 ? 'Generating...' : 'Generate Resync'}
                    </button>
                </div>

                <div className="audio-demo">
                    <div className="audio-video-container">
                        <div className="video-label green">Original</div>
                        <div className="video-placeholder">
                            <div className="video-content has-video">
                                <video
                                    src="http://127.0.0.1:5000/demo/video"
                                    controls
                                    onContextMenu={(e) => e.preventDefault()}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>

                    <div className="audio-video-container">
                        <div className="video-label green">Resynced</div>
                        <div className="video-placeholder">
                            <div className="video-content generating" id="resynced-demo-2">
                                <span className="generating-text green">Click the generate button to start generating!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* How it Works Section */}
            <div className="how-it-works fade-in">
                <h2 className="works-title">How it works</h2>
                <p className="works-description">
                    Resyncbot analyzes the BPM (beats per minute) of both audios, and tries to match the waveforms of both audios as accurately as possible, creating an accurate resync. Users can also have manual control by specifying when the audio should start instead.
                </p>
                <div className="audio-input-container-bpm">
                    <input
                        type="text"
                        placeholder="Paste your audio URL here..."
                        className="audio-input-bpm"
                        value={audioUrl}
                        onChange={(e) => setAudioUrl(e.target.value)}
                    />
                    <button
                        className="btn-generate-bpm"
                        onClick={handleBpmAnalysis}
                        disabled={isAnalyzingBpm || !audioUrl.trim()}
                    >
                        {isGenerating2 ? 'Analyzing...' : 'Analyze BPM'}
                    </button>
                </div>
                <text className="bpm-generate bpm-text">
                    Generated BPM: {
                        isAnalyzingBpm
                            ? 'Analyzing...'
                            : detectedBpm === 'ERROR'
                                ? 'Ran into an error with that audio link, try a different one!'
                                : detectedBpm === 'DURATION_ERROR'
                                    ? 'That audio is too long! Please use an audio shorter than 7 minutes.'
                                    : detectedBpm !== null
                                        ? `${detectedBpm} BPM`
                                        : 'Enter audio URL and click Analyze BPM'
                    }
                </text>
                <div className="waveform-container">
                    <svg className="waveform" viewBox="-30 -30 460 180">
                        <path className="wave-1" d="M0,60 Q20,40 40,60 Q60,80 80,60 Q100,40 120,60 Q140,80 160,60 Q180,40 200,60 Q220,80 240,60 Q260,40 280,60 Q300,80 320,60 Q340,40 360,60 Q380,80 400,60" />
                        <path className="wave-2" d="M0,60 Q20,80 40,60 Q60,40 80,60 Q100,80 120,60 Q140,40 160,60 Q180,80 200,60 Q220,40 240,60 Q260,80 280,60 Q300,40 320,60 Q340,80 360,60 Q380,40 400,60" />
                    </svg>
                </div>
            </div>

            {/* Media Downloader Section */}
            <div className="media-downloader fade-in">
                <h2 className="downloader-title">Built-in Media Downloader</h2>
                <p className="downloader-description">
                    Paste a link and preview what ResyncBot can fetch. Choose Audio or Video.
                    (Downloads are disabled on this page — preview only. To download audio or video, invite ResyncBot to your server and use /downloadvideo or /downloadaudio.)
                </p>

                <div className="media-input-row">
                    <input
                        className="audio-input-media"
                        placeholder="Paste media URL (YouTube, TikTok, Instagram, SoundCloud, etc.)"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                    />
                    <button
                        className="btn-generate-media"
                        onClick={handleMediaPreview}
                        disabled={isPreviewing || !mediaUrl.trim()}
                    >
                        {isPreviewing ? 'Generating...' : 'Preview'}
                    </button>
                </div>

                {/* Simple preview area - no container styling */}
                <div>
                    <div id="media-preview-simple">
                        <p style={{ color: '#9ca3af', fontSize: '16px' }}>
                            Enter a link above and click Preview
                        </p>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="final-cta fade-in">
                <h2 className="cta-title">Ready to start Resyncing?</h2>
                <div className="rainbow-border-wrapper">
                    <a href={discord_invite} className="btn-invite-final">
                        Invite ResyncBot to your server.
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Home