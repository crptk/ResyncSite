// App.tsx
import { useEffect, useRef, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

function App() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [stuck, setStuck] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="app min-h-screen bg-gradient-to-b from-black via-[#020409] to-[#000106] text-white font-sans">
      {/* Navbar */}
      <header
        ref={headerRef}
        className={`header ${stuck ? 'is-sticky' : ''} ${isMobileMenuOpen ? 'is-open' : ''}`}
      >
        <div className="header-bar">
          <div className="logo">ResyncBot</div>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={`nav-buttons ${isMobileMenuOpen ? 'is-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/guide" className="nav-link" onClick={closeMenu}>Bot Guide</Link>
          <a href="https://github.com/crptk/Resyncbot.git" className="nav-link" onClick={closeMenu}>View Source</a>
          <a href="https://discord.gg/3fy9tpxdYk" className="nav-link" onClick={closeMenu}>Join ResyncHub</a>
          <a href="https://discord.com/oauth2/authorize?client_id=1372406004515475577&permissions=2147600384&scope=bot+applications.commands" className="nav-link" onClick={closeMenu}>Invite ResyncBot</a>
        </nav>
      </header>

      {/* Render Home or Guide inside here */}
      <Outlet />
    </div>
  );
}

export default App;
