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

  return (
    <div className="app min-h-screen bg-gradient-to-b from-black via-[#020409] to-[#000106] text-white font-sans">
      {/* Navbar */}
      <header
        ref={headerRef}
        className={`header ${stuck ? 'is-sticky' : ''} flex flex-col md:flex-row items-center md:justify-between gap-3 px-6 py-4`}
      >
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="logo text-xl font-bold">ResyncBot</div>
          
        </div>

        {/* Navigation links - hidden on mobile when menu is closed */}
        <div className={`nav-buttons ${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:flex-wrap justify-center gap-x-4 gap-y-3 text-sm md:text-base absolute md:static top-16 left-0 w-full md:w-auto bg-[rgba(8,10,14,0.95)] md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-0`}>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/guide" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Bot Guide</Link>
          <a href="https://github.com/crptk/Resyncbot.git" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>View Source</a>
          <a href="https://discord.gg/EJnQUm8h" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Join ResyncHub</a>
          <a href="https://discord.com/oauth2/authorize?client_id=1372406004515475577&permissions=2147600384&scope=bot+applications.commands" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Invite ResyncBot</a>
        </div>
      </header>

      {/* Render Home or Guide inside here */}
      <Outlet />
    </div>
  );
}

export default App;