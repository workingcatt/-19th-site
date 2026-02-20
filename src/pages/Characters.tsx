import { CHARACTERS, Character } from '../data/gameData';
import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Paperclip, X } from 'lucide-react';

// Helper to get image URL
const getCharacterImageUrl = (code: string, emotion?: number) => {
  const num = emotion || Math.floor(Math.random() * 6) + 1;
  return `https://itimg.kr/809/탐정아카데미19th/${code}/${num}.png`;
};

export default function Characters() {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [filter, setFilter] = useState<string>('All');
  
  // Group affiliations for filter
  const affiliations = ['All', ...Array.from(new Set(CHARACTERS.map(c => c.affiliation.split('(')[0].trim())))];

  const filteredCharacters = filter === 'All' 
    ? CHARACTERS 
    : CHARACTERS.filter(c => c.affiliation.includes(filter));

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 max-w-7xl mx-auto relative">
      {/* Desk Background */}
      <div className="fixed inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"/>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-display text-amber-600 mb-2 drop-shadow-md">PERSONNEL REGISTRY</h1>
        <p className="text-gray-500 font-serif italic">Confidential Files - Authorized Personnel Only</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Sidebar / Index */}
        <div className="lg:w-1/4 flex flex-col gap-4">
          <div className="bg-[#1a1a1a] border border-[#3a3a3a] p-4 rounded-sm shadow-lg">
            <h3 className="text-amber-500 font-display tracking-widest mb-4 flex items-center gap-2">
              <Search size={16} /> INDEX
            </h3>
            <div className="flex flex-wrap gap-2">
              {affiliations.map(aff => (
                <button
                  key={aff}
                  onClick={() => setFilter(aff)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border-l-2 ${
                    filter === aff 
                      ? 'border-amber-500 bg-white/5 text-amber-200 pl-3' 
                      : 'border-transparent text-gray-500 hover:text-gray-300 hover:pl-2'
                  }`}
                >
                  {aff}
                </button>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block bg-[#e8dcc7] p-1 rounded-sm shadow-[2px_2px_10px_rgba(0,0,0,0.5)] rotate-1">
             <div className="border border-[#c4b59d] p-4 h-full bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
                <h4 className="font-display text-[#5a4a3d] text-center mb-2 border-b border-[#5a4a3d] pb-2">NOTICE</h4>
                <p className="font-serif text-xs text-[#3a2e24] leading-relaxed text-justify">
                  All personnel files are strictly confidential. Unauthorized access or dissemination of this information is punishable by immediate expulsion from the Academy and potential prosecution under the Official Secrets Act of 1889.
                </p>
                <div className="mt-4 text-right">
                  <span className="font-signature text-lg text-[#8a1c1c]">- Headmaster</span>
                </div>
             </div>
          </div>
        </div>

        {/* Main File Grid */}
        <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCharacters.map((char) => (
            // @ts-ignore
            <CharacterFile key={char.code} character={char} onClick={() => setSelectedChar(char)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedChar && (
          <CharacterModal character={selectedChar} onClose={() => setSelectedChar(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CharacterFile({ character, onClick }: { character: Character; onClick: () => void }) {
  const [imgUrl] = useState(() => getCharacterImageUrl(character.code));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, rotate: -1 }}
      onClick={onClick}
      className="bg-[#f4ebd8] relative rounded-sm shadow-[5px_5px_15px_rgba(0,0,0,0.3)] cursor-pointer group overflow-hidden"
    >
      {/* Paper Texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"/>
      
      {/* Folder Tab */}
      <div className="absolute top-0 right-0 bg-[#e6d5b8] px-3 py-1 rounded-bl-lg border-l border-b border-[#c4b59d] font-mono text-[10px] text-[#5a4a3d] font-bold">
        REF: {character.code}
      </div>

      <div className="p-4 flex gap-4 relative z-10">
        {/* Photo (Polaroid Style) */}
        <div className="w-24 h-32 bg-white p-1.5 shadow-md rotate-2 flex-shrink-0 border border-gray-200">
          <div className="w-full h-[85%] bg-gray-100 overflow-hidden grayscale-[0.3] contrast-[1.1]">
            <img 
              src={imgUrl} 
              alt={character.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="h-[15%] flex items-center justify-center">
             <span className="font-handwriting text-[8px] text-gray-500">Fig. 1</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-grow pt-2">
          <h3 className="text-xl font-display text-[#2a2a2a] border-b-2 border-[#2a2a2a] pb-1 mb-2 inline-block">
            {character.name}
          </h3>
          <div className="space-y-1">
            <p className="text-xs font-mono text-[#5a5a5a] uppercase tracking-wider">
              <span className="font-bold text-[#2a2a2a]">AFF:</span> {character.affiliation.split('(')[0]}
            </p>
            <p className="text-xs font-mono text-[#5a5a5a] uppercase tracking-wider">
              <span className="font-bold text-[#2a2a2a]">ROLE:</span> {character.role || 'N/A'}
            </p>
            <p className="text-xs font-mono text-[#5a5a5a] uppercase tracking-wider">
              <span className="font-bold text-[#2a2a2a]">ABILITY:</span> {character.ability}
            </p>
          </div>
        </div>
      </div>

      {/* Stamp */}
      <div className="absolute bottom-2 right-2 border-2 border-red-800/30 text-red-800/30 font-display font-bold text-xs px-2 py-0.5 transform -rotate-12 pointer-events-none mix-blend-multiply">
        CONFIDENTIAL
      </div>
    </motion.div>
  );
}

function CharacterModal({ character, onClose }: { character: Character; onClose: () => void }) {
  const [emotion, setEmotion] = useState(1);
  
  const nextEmotion = (e: MouseEvent) => {
    e.stopPropagation();
    setEmotion(prev => (prev % 6) + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, rotate: 2 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-[#f0e6d2] max-w-5xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative rounded-sm"
        onClick={e => e.stopPropagation()}
      >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-50 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] z-0"/>
        
        {/* Paperclip */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-20 border-4 border-gray-400 rounded-full bg-transparent shadow-sm z-50 pointer-events-none"/>

        {/* Left: Photo Area */}
        <div className="md:w-2/5 p-8 bg-[#e6d5b8] border-r border-[#c4b59d] relative z-10 flex flex-col items-center justify-center">
          <div className="bg-white p-3 shadow-lg rotate-[-2deg] w-full max-w-sm cursor-pointer transition-transform hover:rotate-0 hover:scale-[1.02]" onClick={nextEmotion}>
            <div className="aspect-[3/4] bg-gray-200 overflow-hidden border border-gray-300 relative">
               <img 
                src={getCharacterImageUrl(character.code, emotion)} 
                alt={character.name}
                className="w-full h-full object-cover sepia-[0.2]"
              />
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-1 rounded opacity-50">Click to cycle</div>
            </div>
            <div className="mt-4 font-handwriting text-center text-gray-600 text-xl rotate-[-1deg]">
              {character.name}
            </div>
          </div>
          
          <div className="mt-8 w-full">
            <div className="border-t border-b border-[#a89b85] py-2 text-center">
              <span className="font-display text-2xl text-[#5a4a3d] tracking-widest">EVIDENCE #892</span>
            </div>
          </div>
        </div>
        
        {/* Right: Dossier Content */}
        <div className="md:w-3/5 p-8 relative z-10 flex flex-col">
          <div className="flex justify-between items-start mb-6 border-b-2 border-[#2a2a2a] pb-2">
            <div>
              <h2 className="text-4xl font-display text-[#1a1a1a] mb-1">{character.name}</h2>
              <p className="font-mono text-sm text-[#5a5a5a] uppercase tracking-widest">
                {character.affiliation}
              </p>
            </div>
            <div className="border-2 border-red-800 text-red-800 px-3 py-1 font-bold font-display text-sm uppercase tracking-widest transform rotate-[-5deg] opacity-70">
              Top Secret
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 font-serif text-[#2a2a2a] mb-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-[#8a7a6a] tracking-widest mb-1">Role / Position</span>
              <span className="border-b border-[#c4b59d] pb-1">{character.role || 'Unknown'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-[#8a7a6a] tracking-widest mb-1">Special Ability</span>
              <span className="border-b border-[#c4b59d] pb-1 font-bold text-[#8a1c1c]">{character.ability}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-[#8a7a6a] tracking-widest mb-1">Hair Color</span>
              <span className="border-b border-[#c4b59d] pb-1">{character.hair}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-[#8a7a6a] tracking-widest mb-1">Eye Color</span>
              <span className="border-b border-[#c4b59d] pb-1">{character.eyes}</span>
            </div>
             <div className="flex flex-col col-span-2">
              <span className="text-[10px] font-bold uppercase text-[#8a7a6a] tracking-widest mb-1">Outfit Description</span>
              <span className="border-b border-[#c4b59d] pb-1 text-sm">{character.outfit}</span>
            </div>
          </div>

          <div className="bg-[#e8dfcc] p-6 rounded-sm border border-[#d4c5a9] mb-6 shadow-inner">
            <h4 className="font-display text-lg text-[#5a4a3d] mb-3 flex items-center gap-2">
              <FileText size={18}/> Personality Profile
            </h4>
            <p className="text-[#3a2e24] text-sm leading-relaxed text-justify font-serif">
              {character.personality}
            </p>
          </div>

          <div className="bg-[#e8dfcc] p-6 rounded-sm border border-[#d4c5a9] flex-grow shadow-inner">
            <h4 className="font-display text-lg text-[#5a4a3d] mb-3 flex items-center gap-2">
              <Paperclip size={18}/> Notable Features
            </h4>
            <p className="text-[#3a2e24] text-sm leading-relaxed text-justify font-serif">
              {character.features}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#5a4a3d] hover:text-[#1a1a1a] transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

