import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import logoImage from '/logo-light.png';

export function VideoHero() {
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToContent = () => {
    const element = document.getElementById('main-content');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: '#080C14' }}>
      {/* Deep dark gradient fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080C14] via-[#0F1A2E] to-[#080C14]" style={{ zIndex: 1 }} />

      {/* Video — lazy load after hero paints */}
      {!videoError && (
        <video
          autoPlay muted loop playsInline preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ zIndex: 2, willChange: 'transform' }}
          onError={() => setVideoError(true)}
          onLoadedData={() => setIsLoaded(true)}
          onCanPlay={() => setIsLoaded(true)}
        >
          <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay — heavier for premium dark feel */}
      <div className="absolute inset-0 bg-black/65" style={{ zIndex: 3 }} />

      {/* Bronze gradient overlay — adds brand colour */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 4,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(196,149,106,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          zIndex: 5,
          backgroundImage: `linear-gradient(rgba(248,250,252,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <img
              src={logoImage}
              alt="Santa Mesa"
              className="h-40 md:h-52 w-auto mx-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium tracking-widest uppercase"
              style={{ background: 'rgba(196,149,106,0.12)', color: '#C4956A', border: '1px solid rgba(196,149,106,0.3)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4956A] animate-pulse" />
              AI-Powered Growth Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight"
          >
            Elevate Your{' '}
            <span style={{ color: '#C4956A' }}>Vision</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-lg md:text-2xl font-light tracking-wide mb-10 max-w-2xl mx-auto"
            style={{ color: 'rgba(248,250,252,0.65)' }}
          >
            Where Innovation Meets Growth
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-semibold text-base tracking-wide transition-all"
              style={{
                background: 'linear-gradient(135deg, #C4956A, #A67850)',
                color: '#080C14',
                boxShadow: '0 0 30px rgba(196,149,106,0.35)',
              }}
            >
              Book a Free Strategy Call
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-semibold text-base tracking-wide transition-all"
              style={{
                background: 'transparent',
                color: '#F8FAFC',
                border: '1px solid rgba(248,250,252,0.25)',
              }}
            >
              See What We Do
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors"
          style={{ color: 'rgba(196,149,106,0.6)' }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown className="w-7 h-7" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
