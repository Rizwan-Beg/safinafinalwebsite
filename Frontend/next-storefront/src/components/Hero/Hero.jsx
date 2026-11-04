"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Chatbot from '../Chatbot/Chatbot';
import WhatsApp from '../WhatsApp/WhatsApp';

const DEFAULT_SLIDES = [
  {
    id: "slide-1",
    type: "video",
    src: "/rugbg.mp4",
    tagline: "HANDCRAFTED EXCELLENCE SINCE 1985",
    title: "Woven with History,\nCrafted for Eternity",
    primaryBtnText: "EXPLORE COLLECTION",
    primaryBtnLink: "/catalog",
    secondaryBtnText: "OUR STORY",
    secondaryBtnLink: "/about",
    isActive: true
  },
  {
    id: "slide-2",
    type: "image",
    src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1920&q=80",
    tagline: "EXCLUSIVE PROMOTION",
    title: "The Royal Silk Collection",
    primaryBtnText: "SHOP SILK RUGS",
    primaryBtnLink: "/catalog?material=silk",
    secondaryBtnText: "CUSTOM RUG STUDIO",
    secondaryBtnLink: "/custom",
    isActive: true
  },
  {
    id: "slide-3",
    type: "image",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    tagline: "HAND-KNOTTED ARTISTRY",
    title: "The Heritage Collection",
    primaryBtnText: "EXPLORE RARE FINDS",
    primaryBtnLink: "/catalog?category=heritage",
    secondaryBtnText: "BOOK CONSULTATION",
    secondaryBtnLink: "/appointment",
    isActive: true
  }
];

const Hero = () => {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enableAutoSlide, setEnableAutoSlide] = useState(true);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(7000);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch dynamic hero slider settings from Medusa backend
  useEffect(() => {
    const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
    fetch(`${MEDUSA_URL}/store/hero-slider`, {
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.heroSlider?.slides) {
          const activeOnly = data.heroSlider.slides.filter((slide) => slide.isActive !== false);
          if (activeOnly.length > 0) {
            setSlides(activeOnly);
            setCurrentIndex(0);
          }
          setEnableAutoSlide(data.heroSlider.enableAutoSlide ?? true);
          if (data.heroSlider.autoPlaySpeed) {
            setAutoPlaySpeed(data.heroSlider.autoPlaySpeed);
          }
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch dynamic hero slider, using default slides", err);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slide timer & auto-advance handling
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const validIndex = currentIndex < slides.length ? currentIndex : 0;

  useEffect(() => {
    if (!enableAutoSlide || isPaused || slides.length <= 1) return;

    const currentSlide = slides[validIndex];
    if (!currentSlide) return;

    // For image slides, auto-advance using configured timer
    if (currentSlide.type === "image") {
      timerRef.current = setTimeout(() => {
        nextSlide();
      }, autoPlaySpeed);
    } else if (currentSlide.type === "video") {
      // For video slide, auto advance when video ends OR fallback timer (e.g. 10s)
      timerRef.current = setTimeout(() => {
        nextSlide();
      }, 10000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [validIndex, enableAutoSlide, isPaused, slides, autoPlaySpeed]);

  // Video ended event handler
  const handleVideoEnded = () => {
    if (enableAutoSlide && !isPaused) {
      nextSlide();
    }
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToNext = () => {
    const nextSection = document.querySelector('#meet-manuf') || document.querySelector('#content');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeSlide = slides[validIndex] || DEFAULT_SLIDES[0];

  return (
    <section 
      id="hero" 
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Media Background */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeSlide.id || currentIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {activeSlide.type === "video" ? (
            <video 
              ref={videoRef}
              src={activeSlide.src} 
              autoPlay 
              muted 
              playsInline 
              onEnded={handleVideoEnded}
              className="h-full w-full object-cover"
              style={{ mixBlendMode: 'normal' }}
            />
          ) : (
            <div 
              className="h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-700 transform scale-105"
              style={{ backgroundImage: `url(${activeSlide.src})` }}
            />
          )}

          {/* Dark Overlay for Luxury Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Text Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${activeSlide.id || currentIndex}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {activeSlide.tagline && (
              <span className="inline-block mb-4 text-xs sm:text-sm md:text-base tracking-[0.3em] font-light uppercase text-[#FFE5E6]">
                {activeSlide.tagline}
              </span>
            )}

            {activeSlide.title && (
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight max-w-4xl whitespace-pre-line drop-shadow-md">
                {activeSlide.title}
              </h1>
            )}

            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-2">
              {activeSlide.primaryBtnText && (
                <a
                  href={activeSlide.primaryBtnLink || "/catalog"}
                  className="px-10 py-4 bg-[#860a0c] hover:bg-[#680709] text-white font-light tracking-[0.2em] text-xs md:text-sm transition-all duration-300 uppercase shadow-lg border border-[#860a0c]"
                >
                  {activeSlide.primaryBtnText}
                </a>
              )}

              {activeSlide.secondaryBtnText && (
                <a
                  href={activeSlide.secondaryBtnLink || "/about"}
                  className="px-10 py-4 border border-white/80 text-white font-light tracking-[0.2em] text-xs md:text-sm hover:bg-white hover:text-[#860a0c] transition-all duration-300 uppercase shadow-lg backdrop-blur-sm"
                >
                  {activeSlide.secondaryBtnText}
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Arrows (Desktop & Tablet) */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide} 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/10"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={28} />
          </button>

          <button 
            onClick={nextSlide} 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/10"
            aria-label="Next Slide"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {/* Bottom Carousel Dots & Slide Status */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((slide, idx) => (
            <button
              key={slide.id || idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 transition-all duration-300 rounded-full ${
                currentIndex === idx 
                  ? "w-8 bg-white" 
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors z-20"
        aria-label="Scroll down"
      >
        <ChevronDown size={36} strokeWidth={1.5} />
      </motion.button>

      <Chatbot />
      <WhatsApp />

      {showBackToTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-8 right-8 z-50 p-3 bg-[#860a0c] text-white rounded-full shadow-lg hover:bg-red-900 transition-all duration-300"
          aria-label="Back to top"
        >
          <ChevronDown size={24} className="rotate-180" />
        </button>
      )}
    </section>
  );
};

export default Hero;
