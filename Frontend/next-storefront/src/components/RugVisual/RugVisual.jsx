"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, BrainCircuit } from 'lucide-react';

// --- Importing all necessary assets ---
import rugdining1 from '../../assets/RugVisual/rugdining1.jpg';
import rugdining2 from '../../assets/RugVisual/rugdining2.jpg';
import rugdining3 from '../../assets/RugVisual/rugdining3.jpg';
import rugdining4 from '../../assets/RugVisual/rugdining4.jpg';
import rugdining5 from '../../assets/RugVisual/rugdining5.jpg';
import rugvisualbg from '../../assets/RugVisual/rugvisualbg.jpg';

const slides = [rugdining5, rugdining2, rugdining4, rugdining3, rugdining1];

// Visualizer Container removed as we route directly now

const RugVisual = () => {
  const router = require('next/navigation').useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const setSlide = (newSlide) => {
    resetTimeout();
    setCurrentSlide(newSlide);
  };
  
  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 4000);
    return () => resetTimeout();
  }, [currentSlide]);

  const variants = {
    enter: { opacity: 0, scale: 1.05 },
    center: { zIndex: 1, opacity: 1, scale: 1 },
    exit: { zIndex: 0, opacity: 0, scale: 0.95 },
  };

  return (
    <section className="relative min-h-screen py-24 flex items-center overflow-hidden">
      {/* Background with Parallax effect */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${rugvisualbg.src || rugvisualbg})`,
        }}
      >
        <div className="absolute inset-0 bg-shibumi-black/60 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            className="text-shibumi-accent-warm text-xs tracking-[0.3em] font-light uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Digital Experience
          </motion.span>
          <motion.h2 
            className="font-serif text-4xl md:text-6xl text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            AI Rug Visualizer
          </motion.h2>
        </div>

        <div className='flex flex-col lg:flex-row items-center gap-16'>
          {/* Slider */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='relative w-full lg:w-7/12 aspect-[16/10] overflow-hidden bg-shibumi-black/20 border border-white/10'
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={currentSlide}
                src={slides[currentSlide].src || slides[currentSlide]}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 1.5, ease: 'easeInOut' },
                  scale: { duration: 2, ease: 'easeOut' }
                }}
                className='absolute w-full h-full object-cover'
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-none">
              <button 
                onClick={() => setSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)} 
                className='p-4 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-shibumi-black transition-all rounded-full pointer-events-auto border border-white/20'
              >
                <ArrowLeft size={24} strokeWidth={1} />
              </button>
              <button 
                onClick={() => setSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)} 
                className='p-4 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-shibumi-black transition-all rounded-full pointer-events-auto border border-white/20'
              >
                <ArrowRight size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSlide(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    currentSlide === index ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className='w-full lg:w-5/12 text-center lg:text-left space-y-8'
          >
            <div className='inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full text-shibumi-accent-warm text-xs font-light tracking-[0.2em] uppercase'>
              <BrainCircuit size={16} strokeWidth={1} />
              <span>Powered by Safina AI</span>
            </div>
            
            <p className='text-lg md:text-xl text-white/90 font-light leading-relaxed font-serif'>
              &ldquo;Visualize the perfect masterpiece in your home before it even arrives.&rdquo;
            </p>
            
            <p className='text-white/70 font-light leading-relaxed text-sm md:text-base'>
              Our advanced AI technology allows you to instantly see any rug from our collection in your own space. Simply upload a photo of your room and witness the transformation in high-fidelity, photorealistic detail.
            </p>

            <div className='pt-4'>
              <button
                onClick={() => router.push('/visualizer')}
                className='group bg-shibumi-brown text-white px-10 py-4 text-sm font-light tracking-widest uppercase btn-hover flex items-center gap-3 mx-auto lg:mx-0'
              >
                <Sparkles size={18} strokeWidth={1} />
                Try The AI Visualizer
              </button>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default RugVisual;