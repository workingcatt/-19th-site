import { CHARACTERS, Character } from '../data/gameData';
import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen pt-20 pb-10 px-4 max-w-7xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-display text-center mb-2 text-amber-600"
      >
        DRAMATIS PERSONAE
      </motion.h1>
      <p className="text-center text-gray-500 font-serif mb-10">등장인물 소개</p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {affiliations.map(aff => (
          <button
            key={aff}
            onClick={() => setFilter(aff)}
            className={`px-5 py-2 rounded-sm text-sm font-serif transition-all border ${
              filter === aff 
                ? 'bg-amber-900/40 border-amber-600 text-amber-200' 
                : 'bg-black/40 border-white/10 text-gray-500 hover:border-gray-400 hover:text-gray-300'
            }`}
          >
            {aff}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCharacters.map((char) => (
          // @ts-ignore
          <CharacterCard key={char.code} character={char} onClick={() => setSelectedChar(char)} />
        ))}
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

function CharacterCard({ character, onClick }: { character: Character; onClick: () => void }) {
  // Random emotion for the card preview
  const [imgUrl] = useState(() => getCharacterImageUrl(character.code));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      onClick={onClick}
      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer group relative"
    >
      <div className="aspect-[3/4] overflow-hidden bg-black/40 relative">
        <img 
          src={imgUrl} 
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/300x400/1a1a1a/FFF?text=${character.name}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-display text-amber-400">{character.name}</h3>
          <p className="text-xs text-gray-400 uppercase tracking-wider">{character.affiliation}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CharacterModal({ character, onClose }: { character: Character; onClose: () => void }) {
  // Cycle through emotions in modal? Or just show one big one?
  // Let's show a random one or allow clicking to change emotion.
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-[#1a1a1a] border border-amber-900/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row overflow-hidden shadow-2xl shadow-amber-900/20"
        onClick={e => e.stopPropagation()}
      >
        <div className="md:w-1/2 bg-black/50 relative group cursor-pointer" onClick={nextEmotion}>
          <img 
            src={getCharacterImageUrl(character.code, emotion)} 
            alt={character.name}
            className="w-full h-full object-contain max-h-[60vh] md:max-h-full"
          />
          <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
            Click image to change expression
          </div>
        </div>
        
        <div className="md:w-1/2 p-8 flex flex-col gap-4">
          <div>
            <h2 className="text-4xl font-display text-amber-500 mb-1">{character.name}</h2>
            <p className="text-sm text-amber-800/80 font-serif-italic border-b border-white/10 pb-4">
              {character.affiliation} {character.role ? `• ${character.role}` : ''}
            </p>
          </div>

          <div className="space-y-4 text-gray-300 text-sm leading-relaxed font-serif">
            <div className="grid grid-cols-[80px_1fr] gap-y-3 gap-x-4">
              <span className="text-amber-700 font-bold uppercase text-xs pt-1 border-b border-amber-900/30 pb-1">Hair</span>
              <span className="border-b border-white/5 pb-1">{character.hair}</span>
              
              <span className="text-amber-700 font-bold uppercase text-xs pt-1 border-b border-amber-900/30 pb-1">Eyes</span>
              <span className="border-b border-white/5 pb-1">{character.eyes}</span>
              
              <span className="text-amber-700 font-bold uppercase text-xs pt-1 border-b border-amber-900/30 pb-1">Outfit</span>
              <span className="border-b border-white/5 pb-1">{character.outfit}</span>
              
              <span className="text-amber-700 font-bold uppercase text-xs pt-1 border-b border-amber-900/30 pb-1">Personality</span>
              <span className="border-b border-white/5 pb-1">{character.personality}</span>
              
              <span className="text-amber-700 font-bold uppercase text-xs pt-1 border-b border-amber-900/30 pb-1">Ability</span>
              <span className="text-amber-400 border-b border-white/5 pb-1">{character.ability}</span>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="font-display text-lg text-gray-400 mb-2">Features</h4>
              <p className="text-gray-400">{character.features}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="mt-auto self-end px-6 py-2 border border-white/20 rounded hover:bg-white/10 transition-colors text-sm uppercase tracking-widest"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
