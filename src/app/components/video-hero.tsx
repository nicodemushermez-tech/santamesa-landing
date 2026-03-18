import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import logoImage from '/logo-dark.png';

export function VideoHero() {
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload check
    console.log('VideoHero component mounted');
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: '#1a2a3a' }}>
      {/* Ocean Gradient Fallback - Always visible */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#2B4A5E] via-[#3A5A6E] to-[#1a2a3a]"
        style={{ zIndex: 1 }}
      />

      {/* Video Background - Only on desktop or when loaded successfully */}
      {!videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            zIndex: 2,
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            perspective: '1000px',
            WebkitPerspective: '1000px',
            willChange: 'transform',
          }}
          onError={(e) => {
            console.error('Video failed to load:', e);
            setVideoError(true);
          }}
          onLoadedData={() => {
            console.log('Video loaded successfully');
            setIsLoaded(true);
          }}
          onCanPlay={() => {
            setIsLoaded(true);
          }}
        >
          <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark Overlay for better text visibility */}
      <div 
        className="absolute inset-0 bg-black/40"
        style={{ zIndex: 3 }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          {/* Logo with subtle combination approach (text shadow + soft backdrop) */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-black/30 blur-2xl" aria-hidden="true"></div>
            <img
              src={logoImage}
              alt="Santa Mesa - Elevate Your Vision"
              className="h-32 md:h-40 w-auto mx-auto relative z-10"
              style={{ 
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))',
              }}
            />
          </div>

          {/* Main Heading with Strong Shadows */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative mb-6"
          >
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide relative"
              style={{
                textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)',
              }}
            >
              Elevate Your Vision
            </h1>
          </motion.div>
          
          {/* Motto with Strong Contrast */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="relative text-2xl md:text-3xl font-medium tracking-wider text-white"
            style={{
              textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)',
            }}
          >
            Where Innovation Meets Growth
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors group"
        >
          <span className="text-sm uppercase tracking-wider">Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
