import { FACTIONS } from '../data/gameData';
import { motion } from 'framer-motion';

export default function Main() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-6xl mx-auto relative">
      {/* Background Texture for the "Desk" */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-display text-amber-600 mb-6 drop-shadow-lg">WORLDVIEW</h1>
        <h2 className="text-2xl font-serif text-gray-400 mb-8">세계관 설정</h2>
        <div className="w-24 h-1 bg-amber-800 mx-auto mb-8" />
        <p className="text-lg md:text-xl text-gray-300 font-serif leading-loose max-w-3xl mx-auto bg-black/60 p-8 rounded-lg border border-white/10 shadow-2xl backdrop-blur-sm">
          "빅토리아 시대 런던, 안개 속에 숨겨진 진실.<br/>
          범죄 조직과 괴현상 '페즐'이 도사리는 밤.<br/>
          탐정과 조수가 하나 되어 사건을 해결하는 19th 아카데미."
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
        {FACTIONS.map((faction, index) => (
          <motion.div
            key={faction.name}
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative pt-8 group"
          >
            {/* Folder Tab */}
            <div className="absolute top-0 left-4 bg-[#e6d5b8] px-6 py-2 rounded-t-lg border border-b-0 border-[#c4b59d] font-mono text-xs font-bold text-[#5a4a3d] shadow-sm z-0 group-hover:-translate-y-1 transition-transform">
              FILE #{String(index + 1).padStart(2, '0')}
            </div>
            
            {/* Main Folder Body */}
            <div className="relative z-10 bg-[#f4ebd8] border border-[#c4b59d] p-8 rounded-b-lg rounded-tr-lg shadow-[5px_5px_20px_rgba(0,0,0,0.6)] group-hover:shadow-[8px_8px_25px_rgba(0,0,0,0.8)] transition-shadow">
              {/* Paper Texture */}
              <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />
              
              {/* Content */}
              <div className="relative z-20">
                <div className="flex justify-between items-start border-b-2 border-[#3a3a3a] pb-4 mb-6">
                  <h3 className="text-2xl md:text-3xl font-display text-[#1a1a1a] font-bold tracking-wider">
                    {faction.name}
                  </h3>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-[10px] font-mono text-[#5a5a5a] uppercase">Status</div>
                    <div className="text-sm font-bold font-mono text-red-800 tracking-widest">CLASSIFIED</div>
                  </div>
                </div>
                
                <p className="font-serif text-[#2a2a2a] leading-loose text-justify text-sm md:text-base">
                  {faction.description}
                </p>
              </div>

              {/* Stamp */}
              <div className="absolute bottom-6 right-6 border-4 border-red-800/60 text-red-800/60 font-display font-bold text-2xl px-4 py-1 transform -rotate-12 pointer-events-none mix-blend-multiply select-none">
                TOP SECRET
              </div>
              
              {/* Paperclip (Visual) */}
              <div className="absolute -top-4 right-8 w-3 h-12 border-2 border-gray-400 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 shadow-sm transform rotate-[15deg] z-30 pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
