import { motion } from 'framer-motion';

export default function Webtoon() {
  const images = [
    "https://itimg.kr/809/웹툰모음/탐정아카데미.re/1.png",
    "https://itimg.kr/809/웹툰모음/탐정아카데미.re/2.png",
    "https://itimg.kr/809/웹툰모음/탐정아카데미.re/3.png",
    "https://itimg.kr/809/웹툰모음/탐정아카데미.re/4.png"
  ];

  return (
    <div className="min-h-screen pt-24 px-4 pb-20 bg-[#0a0a0a] flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display text-amber-600 mb-2">WEBTOON ARCHIVE</h1>
        <p className="text-gray-500 font-serif">탐정 아카데미 RE</p>
      </motion.div>

      <div className="max-w-3xl w-full flex flex-col gap-0 shadow-2xl bg-black">
        {images.map((src, index) => (
          <motion.img
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            src={src}
            alt={`Webtoon Page ${index + 1}`}
            className="w-full h-auto block"
            loading="lazy"
          />
        ))}
      </div>
      
      <div className="mt-12 text-center text-gray-600 font-serif text-sm">
        <p>- End of Chapter -</p>
      </div>
    </div>
  );
}
