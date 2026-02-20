import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Landmark, Shield, Skull, Building2, Ghost, MapPin } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  korName: string;
  x: number;
  y: number;
  description: string;
  type: 'academy' | 'hq' | 'city' | 'danger';
  imageUrl: string;
  icon: any;
}

const LOCATIONS: Location[] = [
  { 
    id: 'london', 
    name: 'London City', 
    korName: '런던', 
    x: 50, 
    y: 50, 
    description: '안개와 매연으로 뒤덮인 19세기 빅토리아 시대의 수도. 화려한 발전의 이면에는 빈부격차와 범죄, 그리고 기괴한 현상들이 도사리고 있다.', 
    type: 'city',
    imageUrl: 'https://itimg.kr/809/site/탐정아카데미19th/13.png?_t=1771606298',
    icon: MapPin
  },
  { 
    id: 'academy', 
    name: 'Detective Academy 19th', 
    korName: '탐정 아카데미 19th', 
    x: 40, 
    y: 40, 
    description: '런던 최대의 탐정 육성 아카데미. 뛰어난 추리력과 특별한 능력을 지닌 자들만이 입학할 수 있으며, 탐정과 조수가 2인 1조로 활동하는 것을 원칙으로 한다.', 
    type: 'academy',
    imageUrl: 'https://itimg.kr/809/site/탐정아카데미19th/14.png?_t=1771606298',
    icon: Landmark
  },
  { 
    id: 'demonico', 
    name: 'DEMONICO HQ', 
    korName: '데모니코 본부', 
    x: 65, 
    y: 35, 
    description: '19th 아카데미의 협력 집단이자 런던의 치안을 수호하는 경찰청. 범죄 조직과 페즐 현상으로부터 시민들을 보호하기 위해 밤낮으로 고군분투한다.', 
    type: 'hq',
    imageUrl: 'https://itimg.kr/809/site/탐정아카데미19th/17.png?_t=1771606298',
    icon: Shield
  },
  { 
    id: 'mysterio', 
    name: 'Mysterio HQ', 
    korName: '미스테리오 본부', 
    x: 75, 
    y: 70, 
    description: '런던 최대의 범죄 조직 연합. 자유로운 서클 형태로 운영되며, 오직 자신만의 신념에 따라 행동하는 무법자들의 은밀한 거점이다.', 
    type: 'hq',
    imageUrl: 'https://itimg.kr/809/site/탐정아카데미19th/16.png?_t=1771606298',
    icon: Building2
  },
  { 
    id: 'nightmare', 
    name: 'Nightmare Base', 
    korName: '나이트메어 기지', 
    x: 20, 
    y: 80, 
    description: '모든 세력을 적대하며 오직 인간에 대한 복수와 학살만을 목적으로 하는 정체불명의 집단. 그들의 기지는 런던 외곽의 깊은 어둠 속에 숨겨져 있다.', 
    type: 'danger',
    imageUrl: 'https://itimg.kr/809/site/탐정아카데미19th/18.png?_t=1771606298',
    icon: Skull
  },
  { 
    id: 'alley', 
    name: 'Back Alley', 
    korName: '뒷골목', 
    x: 30, 
    y: 60, 
    description: '빛이 닿지 않는 런던의 빈민가. 불법적인 거래와 음모가 끊이지 않으며, 괴도 그룹 REMATE를 비롯한 여러 그림자들이 숨어드는 장소이다.', 
    type: 'danger',
    imageUrl: 'https://itimg.kr/809/site/탐정아카데미19th/19.png?_t=1771606298',
    icon: Ghost
  },
];

// Generate decorative buildings once
const DECORATIVE_BUILDINGS = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  x: Math.random() * 85 + 5,
  y: Math.random() * 85 + 5,
  width: Math.random() * 30 + 15,
  height: Math.random() * 40 + 20,
  rotation: Math.random() * 180,
  opacity: Math.random() * 0.3 + 0.1
}));

export default function Map() {
  const [selectedLoc, setSelectedLoc] = useState<Location | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 flex flex-col items-center justify-center bg-[#0a0a0a] relative">
      {/* Desk Background */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-display text-amber-600 mb-2 drop-shadow-lg">LONDON DISTRICTS</h1>
        <p className="text-gray-400 font-serif">런던의 주요 구역 지도</p>
      </motion.div>

      {/* Physical Map Container */}
      <div className="relative w-full max-w-6xl bg-[#e8dcc7] p-3 md:p-6 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#c4b59d] z-10">
        {/* Paper texture overlay for the whole map board */}
        <div className="absolute inset-0 opacity-50 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />
        
        {/* Inner Map Frame */}
        <div className="relative w-full h-[65vh] md:h-[70vh] border-4 border-double border-[#5c4a3d] bg-[#1a1a1a] overflow-hidden flex shadow-inner">
          
          {/* Map Area */}
          <div className="relative flex-grow h-full bg-[#1a1a1a] overflow-hidden">
            {/* Map Background (Abstract London Map) */}
            <div className="absolute inset-0 opacity-60 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Map_of_London_by_W._B._Clarke_1830.jpg/1280px-Map_of_London_by_W._B._Clarke_1830.jpg')] bg-cover bg-center grayscale sepia contrast-[1.2] brightness-90" />
            
            {/* Vignette & Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

            {/* Decorative City Blocks */}
            {DECORATIVE_BUILDINGS.map(b => (
              <div 
                key={`block-${b.id}`}
                className="absolute bg-[#2a221b] border border-[#3a2e24] pointer-events-none shadow-md"
                style={{
                  top: `${b.y}%`,
                  left: `${b.x}%`,
                  width: `${b.width}px`,
                  height: `${b.height}px`,
                  transform: `rotate(${b.rotation}deg)`,
                  opacity: b.opacity
                }}
              />
            ))}

            {/* District Labels */}
            <div className="absolute top-[20%] left-[30%] text-[#5c4a3d] font-display text-3xl md:text-5xl opacity-30 -rotate-12 pointer-events-none tracking-[0.5em] md:tracking-[1em]">
              WESTMINSTER
            </div>
            <div className="absolute top-[60%] left-[60%] text-[#5c4a3d] font-display text-4xl md:text-6xl opacity-30 rotate-12 pointer-events-none tracking-[0.5em] md:tracking-[1em]">
              EAST END
            </div>
            <div className="absolute top-[45%] left-[10%] text-[#5c4a3d] font-display text-2xl md:text-4xl opacity-30 -rotate-45 pointer-events-none tracking-[0.5em] md:tracking-[1em]">
              THE THAMES
            </div>

            {/* Compass Rose Decoration */}
            <div className="absolute top-4 left-4 opacity-40 pointer-events-none w-24 h-24 md:w-32 md:h-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/f/f0/Compass_rose_brown.svg')] bg-contain bg-no-repeat filter invert drop-shadow-lg" />

            {/* Scale Bar Decoration */}
            <div className="absolute bottom-4 left-4 opacity-60 pointer-events-none border-b-2 border-l-2 border-white/50 w-32 h-4 flex items-end px-1 pb-1">
              <span className="text-[10px] font-mono text-white/70">1 Mile</span>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Locations */}
            {LOCATIONS.map((loc) => (
              <motion.div
                key={loc.id}
                className="absolute cursor-pointer group z-20"
                style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedLoc(loc)}
              >
                {/* Map Pin Marker (Building Icon) */}
                <div className="relative -top-8 -left-6">
                  <div className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-sm border-2 shadow-[0_5px_15px_rgba(0,0,0,0.8)] backdrop-blur-md transition-transform ${
                    loc.type === 'academy' ? 'bg-amber-900/90 border-amber-400 text-amber-300' :
                    loc.type === 'hq' ? 'bg-blue-900/90 border-blue-400 text-blue-300' :
                    loc.type === 'danger' ? 'bg-red-900/90 border-red-400 text-red-300' :
                    'bg-gray-800/90 border-gray-400 text-gray-300'
                  }`}>
                    <loc.icon size={24} strokeWidth={1.5} />
                  </div>
                  {/* Pin Point */}
                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] ${
                    loc.type === 'academy' ? 'border-t-amber-400' :
                    loc.type === 'hq' ? 'border-t-blue-400' :
                    loc.type === 'danger' ? 'border-t-red-400' :
                    'border-t-gray-400'
                  }`} />
                </div>
                
                <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity z-30">
                  <span className="text-xs font-bold bg-[#2a2a2a]/90 px-3 py-1 rounded-sm text-[#e8dcc7] border border-[#c4b59d]/50 backdrop-blur-sm shadow-lg font-serif">
                    {loc.korName}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Panel (Right Side Desktop / Overlay Mobile) */}
          <AnimatePresence>
            {selectedLoc && (
              <motion.div 
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute inset-0 md:relative md:inset-auto md:w-[350px] h-full bg-[#1a1a1a]/95 md:bg-[#1a1a1a]/90 border-l-4 border-double border-[#5c4a3d] overflow-y-auto flex-shrink-0 z-40 backdrop-blur-md"
              >
                <div className="p-6 h-full flex flex-col relative">
                  {/* Panel Paper Texture */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-full aspect-video bg-black rounded-sm mb-6 overflow-hidden border-2 border-[#5c4a3d] flex-shrink-0 shadow-lg p-1">
                      <img 
                        src={selectedLoc.imageUrl} 
                        alt={selectedLoc.name} 
                        className="w-full h-full object-cover grayscale-[0.2] sepia-[0.3]"
                      />
                    </div>
                    
                    <h3 className="text-2xl font-display text-amber-500 mb-1 tracking-wider">{selectedLoc.name}</h3>
                    <h4 className="text-sm font-serif text-gray-400 mb-4 border-b border-[#5c4a3d] pb-3">{selectedLoc.korName}</h4>
                    
                    <p className="text-gray-300 leading-relaxed font-serif text-sm flex-grow text-justify">
                      {selectedLoc.description}
                    </p>
                    
                    <div className="mt-6 pt-4 border-t border-[#5c4a3d] flex-shrink-0">
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-mono">Zone Status</div>
                      <div className={`text-sm font-bold tracking-widest font-mono ${
                         selectedLoc.type === 'academy' ? 'text-amber-500' :
                         selectedLoc.type === 'hq' ? 'text-blue-500' :
                         selectedLoc.type === 'danger' ? 'text-red-500' :
                         'text-gray-400'
                      }`}>
                        [{selectedLoc.type === 'academy' ? 'SAFE ZONE' :
                         selectedLoc.type === 'hq' ? 'RESTRICTED AREA' :
                         selectedLoc.type === 'danger' ? 'DANGER ZONE' :
                         'PUBLIC AREA'}]
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedLoc(null)}
                      className="mt-8 w-full py-3 border border-[#5c4a3d] bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-sm transition-colors text-xs uppercase tracking-widest text-amber-500/80 hover:text-amber-400 flex-shrink-0 font-mono"
                    >
                      Close Report
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
