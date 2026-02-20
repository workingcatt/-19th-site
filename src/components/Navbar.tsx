import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';

declare global {
  interface Window {
    playGlobalBGM?: () => void;
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = 0.4;

    window.playGlobalBGM = () => {
      if (audio && audio.paused && !isMuted) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => console.error("BGM Play Error:", error));
        }
      }
    };

    const handleFirstInteraction = () => {
      if (audio.paused && !isMuted) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    
    if (isMuted) {
      audio.pause();
    } else {
      if (audio.paused && audio.readyState > 0) {
        audio.play().catch(() => {});
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const links = [
    { name: 'Entrance', sub: '입장', path: '/' },
    { name: 'World', sub: '세계관', path: '/main' },
    { name: 'Characters', sub: '등장인물', path: '/characters' },
    { name: 'Webtoon', sub: '웹툰', path: '/webtoon' },
    { name: 'Map', sub: '지도', path: '/map' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/5">
      <audio 
        id="bgm-audio"
        ref={audioRef} 
        loop 
        preload="auto"
      >
        <source src="https://incompetech.com/music/royalty-free/mp3-royaltyfree/Spy%20Glass.mp3" type="audio/mpeg" />
      </audio>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex flex-col items-start group">
              <span className="text-xl font-bold text-gray-100 font-display tracking-widest group-hover:text-amber-500 transition-colors">
                DETECTIVE ACADEMY
              </span>
              <span className="text-xs text-gray-500 tracking-[0.3em] group-hover:text-amber-400/70 transition-colors">
                탐정 아카데미 19th
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-8 mr-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="group relative px-2 py-2"
                >
                  <div className={`flex flex-col items-center transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-amber-500'
                      : 'text-gray-400 group-hover:text-gray-200'
                  }`}>
                    <span className="text-xs font-display tracking-wider uppercase mb-0.5">{link.name}</span>
                    <span className="text-sm font-serif font-bold">{link.sub}</span>
                  </div>
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 shadow-[0_0_10px_rgba(180,83,9,0.5)]"
                    />
                  )}
                </Link>
              ))}
            </div>
            <button 
              onClick={toggleMute} 
              className={`p-2 transition-colors rounded-full hover:bg-white/5 ${isMuted ? 'text-gray-500' : 'text-amber-500'}`}
              title={isMuted ? "Play BGM" : "Mute BGM"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
          <div className="-mr-2 flex md:hidden items-center gap-2">
            <button 
              onClick={toggleMute} 
              className={`p-2 transition-colors ${isMuted ? 'text-gray-500' : 'text-amber-500'}`}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium flex justify-between items-center ${
                  location.pathname === link.path
                    ? 'text-amber-500 bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="font-display">{link.name}</span>
                <span className="font-serif text-sm opacity-70">{link.sub}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
