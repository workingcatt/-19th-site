import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Entrance() {
  const [step, setStep] = useState<'click' | 'opening' | 'main'>('click');

  useEffect(() => {
    // Check if user has already visited the entrance in this session
    const hasVisited = sessionStorage.getItem('hasVisitedEntrance');
    if (hasVisited) {
      setStep('main');
    }
  }, []);

  useEffect(() => {
    if (step === 'opening') {
      const timer = setTimeout(() => {
        setStep('main');
        sessionStorage.setItem('hasVisitedEntrance', 'true');
      }, 3500); // Opening duration
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleStart = () => {
    if (step === 'click') {
      setStep('opening');
      // Force BGM to play immediately upon this explicit user click using the global function
      if ((window as any).playGlobalBGM) {
        (window as any).playGlobalBGM();
      } else {
        // Fallback
        const audio = document.getElementById('bgm-audio') as HTMLAudioElement;
        if (audio) {
          audio.play().catch(e => console.error("BGM forced play failed:", e));
        }
      }
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-black cursor-pointer"
      onClick={handleStart}
    >
      {/* Background Image & Overlay (Always present but revealed later) */}
      <div className="absolute inset-0 z-0">
         <img 
            src="https://itimg.kr/809/site/탐정아카데미19th/back.png?_t=1771606218" 
            alt="London Night" 
            className="w-full h-full object-cover opacity-60"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#0f172a]/30 to-[#050505]/80" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Main Content (Revealed when step is 'main') */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 'main' ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      >
        {/* Shading Effect Overlay for smooth entrance when skipping */}
        <motion.div 
           initial={{ opacity: 1 }}
           animate={{ opacity: 0 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="absolute inset-0 bg-black pointer-events-none z-50"
           style={{ display: step === 'main' ? 'block' : 'none' }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={step === 'main' ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-12 relative w-full"
        >
          <div className="absolute -inset-10 bg-amber-900/10 blur-3xl rounded-full"></div>
          <h2 className="text-lg md:text-2xl font-serif text-amber-500/80 tracking-[0.2em] md:tracking-[0.5em] mb-4 uppercase pl-[0.2em] md:pl-[0.5em] text-center">
            Detective Academy
          </h2>
          <h1 className="text-5xl md:text-8xl font-display text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-widest leading-tight text-center">
            탐정<br/>아카데미<br/><span className="text-amber-600">19th</span>
          </h1>
          <p className="mt-8 text-base md:text-xl font-serif text-gray-400 tracking-widest max-w-lg mx-auto leading-loose text-center">
            "진실은 런던의 그림자 속에 숨어있다."<br/>
            <span className="text-xs md:text-sm opacity-60">Truth lies within the shadows of London.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={step === 'main' ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link 
            to="/main"
            className="group relative inline-flex items-center justify-center px-12 md:px-16 py-4 overflow-hidden font-display font-medium tracking-tighter text-white bg-transparent border border-white/20 rounded-sm hover:border-amber-600/50 transition-colors duration-500"
            onClick={(e) => e.stopPropagation()} // Prevent triggering handleStart again
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-amber-900/40 rounded-full group-hover:w-80 group-hover:h-80 opacity-30"></span>
            <span className="relative flex flex-col items-center">
              <span className="text-lg md:text-xl tracking-[0.2em] group-hover:text-amber-200 transition-colors">ACADEMY ENTRY</span>
              <span className="text-[10px] md:text-xs font-serif text-gray-500 mt-1 group-hover:text-amber-400/70">아카데미 입장</span>
            </span>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Decorative Corners for Main Screen */}
      <div className={`absolute top-4 left-4 md:top-8 md:left-8 w-16 h-16 md:w-32 md:h-32 border-t border-l border-white/10 pointer-events-none transition-opacity duration-1000 ${step === 'main' ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 md:w-32 md:h-32 border-b border-r border-white/10 pointer-events-none transition-opacity duration-1000 ${step === 'main' ? 'opacity-100' : 'opacity-0'}`} />

      {/* Opening / Click Overlay */}
      <AnimatePresence>
        {(step === 'click' || step === 'opening') && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black px-4"
          >
            <div className="text-center w-full relative z-10">
              {/* Static Title to prevent blinking */}
              <motion.h1 
                layout
                className="text-3xl md:text-6xl font-display text-white tracking-[0.2em] md:tracking-[0.5em] uppercase mb-8 pl-[0.2em] md:pl-[0.5em] text-center"
              >
                Detective Academy
              </motion.h1>

              {/* Changing Subtitles */}
              <AnimatePresence mode="wait">
                {step === 'click' ? (
                  <motion.p 
                    key="click-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, duration: 0.5 }}
                    className="text-amber-600 font-serif italic tracking-widest text-sm md:text-base text-center"
                  >
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      - Click anywhere to begin -
                    </motion.span>
                  </motion.p>
                ) : (
                  <motion.div
                    key="opening-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="h-px bg-amber-600 mx-auto max-w-2xl"
                    />
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="mt-4 text-gray-400 font-serif italic tracking-widest pl-[0.2em] md:pl-[0.5em] text-center text-sm md:text-base"
                    >
                      19th Century, London
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

