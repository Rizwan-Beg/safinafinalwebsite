"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Chatbot from '../Chatbot/Chatbot';
import WhatsApp from '../WhatsApp/WhatsApp';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToNext = () => {
    const nextSection = document.querySelector('#meet-manuf');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/rugbg.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="h-full w-full object-cover"
          style={{ mixBlendMode: 'normal' }}
        ></video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="inline-block mb-6 text-sm md:text-base tracking-[0.3em] font-light uppercase text-shibumi-accent-warm">
            Handcrafted Excellence Since 1985
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-4xl md:text-6xl lg:text-7xl mb-10 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Woven with History,<br />Crafted for Eternity
        </motion.h1>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <a
            href="/catalog"
            className="px-12 py-4 bg-shibumi-brown text-white font-light tracking-widest text-sm btn-hover uppercase"
          >
            Explore Collection
          </a>
          <a
            href="/about"
            className="px-12 py-4 border border-white text-white font-light tracking-widest text-sm hover:bg-white hover:text-shibumi-maroon transition-all duration-300 uppercase"
          >
            Our Story
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors z-10"
      >
        <ChevronDown size={40} strokeWidth={1} />
      </motion.button>

      <Chatbot />
      <WhatsApp />

      {showBackToTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-8 right-8 z-50 p-3 bg-shibumi-brown text-white rounded-full shadow-lg hover:bg-shibumi-accent-dark transition-all duration-300 animate-fade-in"
          aria-label="Back to top"
        >
          <ChevronDown size={24} className="rotate-180" />
        </button>
      )}
    </section>
  );
};

export default Hero;
