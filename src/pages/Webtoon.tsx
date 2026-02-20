import { motion } from 'framer-motion';

export default function Webtoon() {
  return (
    <div className="min-h-screen pt-24 px-4 flex items-center justify-center bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 border border-white/10 rounded-sm bg-[#121212] max-w-2xl w-full shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
        
        <h1 className="text-4xl md:text-5xl font-display text-amber-600 mb-2">WEBTOON ARCHIVE</h1>
        <p className="text-gray-500 font-serif mb-10">웹툰 아카이브</p>
        
        <div className="w-full aspect-[4/3] bg-black/50 rounded flex flex-col items-center justify-center border border-white/5 relative group">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
          
          <span className="text-3xl font-display text-gray-700 mb-2 group-hover:text-amber-800 transition-colors">ACCESS DENIED</span>
          <span className="text-sm font-serif text-gray-600">접근 권한이 부족합니다.</span>
          
          <div className="mt-8 px-4 py-1 border border-red-900/30 text-red-900/50 text-xs font-mono">
            ERROR_CODE: 19TH_ARCHIVE_LOCKED
          </div>
        </div>
      </motion.div>
    </div>
  );
}
