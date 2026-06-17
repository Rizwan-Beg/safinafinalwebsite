"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowUpRight, ChevronRight, Info, ShieldCheck, Waves, Wind } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const roomData = [
  {
    id: "living-room",
    title: "Living Room",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
    layouts: [
      {
        title: "The Classic Anchor",
        image: "https://c.animaapp.com/jwLiGKJa/img/living-room@2x.png",
        description: "Ensure the front legs of your couch and chairs rest comfortably on the rug. A standard 8x10 rug generally works well, defining the conversational area with grace."
      },
      {
        title: "The Island Layout",
        image: "https://c.animaapp.com/jwLiGKJa/img/living-room-1@2x.png",
        description: "For larger spaces, an oversized rug unifies the entire seating arrangement. All furniture legs should sit entirely on the rug to create a singular, cohesive island of luxury."
      }
    ]
  },
  {
    id: "bedroom",
    title: "Bedroom",
    heroImage: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2000&auto=format&fit=crop",
    layouts: [
      {
        title: "The Grand Foundation",
        image: "https://c.animaapp.com/jwLiGKJa/img/bedroom@2x.png",
        description: "To effectively frame your sanctuary, place two-thirds of an 8x10 rug beneath the bed. This provides a soft, warm landing on both sides of the mattress."
      },
      {
        title: "The Twin Runners",
        image: "https://c.animaapp.com/jwLiGKJa/img/bedroom-2@2x.png",
        description: "Runners on either side of the bed offer a focused, inviting atmosphere. This approach is ideal for smaller rooms where a full area rug might overwhelm the architecture."
      }
    ]
  },
  {
    id: "dining-room",
    title: "Dining Room",
    heroImage: "https://images.unsplash.com/photo-1617806118233-18e1db207fa6?q=80&w=2000&auto=format&fit=crop",
    layouts: [
      {
        title: "The Full Extension",
        image: "https://c.animaapp.com/jwLiGKJa/img/dining-room@2x.png",
        description: "Leave at least 24 inches of space on all sides so that chairs remain on the rug even when pulled out. A 9x12 rug is the gold standard for an 8-chair arrangement."
      }
    ]
  }
];

const GuideHero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current.children, 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power4.out', delay: 0.5 }
      );

      gsap.to(bgRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[90svh] w-full flex items-center justify-center overflow-hidden bg-shibumi-black">
      <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-60">
        <img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover"
          alt="Luxury Rug Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-shibumi-white" />
      </div>

      <div ref={textRef} className="relative z-10 text-center px-6">
        <span className="font-body text-white/60 text-[10px] md:text-xs uppercase tracking-[0.8em] block mb-8">The Safina Perspective</span>
        <h1 className="font-display text-white text-7xl md:text-[10rem] leading-[0.85] tracking-tight mb-12">
          Mastering the <br /> <span className="italic font-light">Space</span>
        </h1>
        <div className="flex flex-col items-center gap-8">
          <div className="w-px h-24 bg-gradient-to-b from-white/50 to-transparent" />
          <p className="font-body text-white/70 text-sm md:text-lg max-w-xl mx-auto leading-relaxed tracking-wide">
            An editorial guide to choosing, placing, and preserving your handcrafted masterpieces.
          </p>
        </div>
      </div>
    </section>
  );
};

const RoomSection = ({ room, index }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, 
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={room.id} className="py-24 bg-white overflow-hidden border-b border-shibumi-black/5 last:border-none data-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div ref={titleRef} className="max-w-2xl">
            <span className="text-shibumi-maroon font-body text-[10px] uppercase tracking-[0.5em] block mb-4">Chapter {index + 1}</span>
            <h2 className="font-display text-4xl md:text-7xl text-shibumi-black leading-none uppercase">
              The {room.title} <br /> <span className="italic font-light text-3xl md:text-5xl">Perspective</span>
            </h2>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-px bg-shibumi-black/10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {room.layouts.map((layout, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="space-y-8 group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-shibumi-light-gray shadow-xl">
                <img 
                  src={layout.image} 
                  alt={layout.title}
                  className="w-full h-full object-contain p-2 md:p-4 transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-shibumi-black/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
              <div className="space-y-4 px-2">
                <h3 className="font-display text-2xl text-shibumi-black">{layout.title}</h3>
                <p className="font-body text-shibumi-dark-gray/60 text-base leading-relaxed font-light">
                  {layout.description}
                </p>
                <button className="flex items-center gap-3 text-shibumi-maroon font-body text-[10px] uppercase tracking-widest border-b border-shibumi-maroon/20 pb-1 hover:border-shibumi-maroon transition-all">
                  Explore configuration <ChevronRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState("living-room");
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY <= 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('.data-section, #care');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = showNavbar ? 90 : 0;
      const subNavHeight = 60;
      const offset = navbarHeight + subNavHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="bg-white min-h-screen">
      <GuideHero />

      {/* Sticky Sub-Navigation */}
      <div 
        className="sticky z-40 bg-white/90 backdrop-blur-xl border-y border-shibumi-black/5 transition-all duration-500"
        style={{ top: showNavbar ? '90px' : '0px' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8 md:gap-12 overflow-x-auto no-scrollbar">
            <span className="font-body text-[10px] uppercase tracking-widest text-shibumi-black/40 whitespace-nowrap">Explore Rooms</span>
            <div className="flex gap-6 md:gap-8">
              {roomData.map((room) => (
                <a 
                  key={room.id}
                  href={`#${room.id}`}
                  onClick={(e) => scrollToSection(e, room.id)}
                  className={`font-body text-[10px] uppercase tracking-widest transition-colors relative group whitespace-nowrap ${activeSection === room.id ? 'text-shibumi-maroon' : 'text-shibumi-black'}`}
                >
                  {room.title}
                  <span className={`absolute -bottom-1 left-0 h-px bg-shibumi-maroon transition-all ${activeSection === room.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              ))}
              <a 
                href="#care" 
                onClick={(e) => scrollToSection(e, 'care')}
                className={`font-body text-[10px] uppercase tracking-widest transition-colors relative group whitespace-nowrap ${activeSection === 'care' ? 'text-shibumi-maroon' : 'text-shibumi-black'}`}
              >
                Care & Storage
                <span className={`absolute -bottom-1 left-0 h-px bg-shibumi-maroon transition-all ${activeSection === 'care' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <button className="flex items-center gap-3 font-body text-[10px] uppercase tracking-widest text-shibumi-black/60 hover:text-shibumi-black transition-colors">
              <Info size={14} /> Design Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Room Sections */}
      {roomData.map((room, index) => (
        <RoomSection key={room.id} room={room} index={index} />
      ))}

      {/* Care & Instruction Section */}
      <section id="care" className="relative py-32 md:py-48 bg-shibumi-black text-white overflow-hidden">
        {/* Decorative Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
          <h2 className="font-display text-[30vw] italic whitespace-nowrap">Preservation</h2>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <div className="lg:col-span-5 space-y-8 md:space-y-12">
              <div className="space-y-6">
                <span className="text-shibumi-maroon text-[10px] tracking-[0.5em] font-body uppercase block">Safekeeping</span>
                <h2 className="font-display text-5xl md:text-8xl leading-none">The Art of <br /> <span className="italic font-light">Endurance</span></h2>
              </div>
              <p className="font-body text-white/60 text-lg md:text-xl leading-relaxed font-light">
                A handcrafted rug is a living legacy. Proper care ensures its story continues for generations.
              </p>
              <div className="space-y-8 pt-8 border-t border-white/10">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-shibumi-black transition-all">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display text-xl">Storage Mastery</h4>
                    <p className="text-white/40 text-sm font-light leading-relaxed">Ensure rugs are cleaned, dried, and rolled in a cool, dark, climate-controlled space.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-shibumi-black transition-all">
                    <Waves size={20} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display text-xl">Spill Response</h4>
                    <p className="text-white/40 text-sm font-light leading-relaxed">Blot immediately with a clean, white cloth. Never rub, as it can damage the delicate fibers.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] group">
                <img 
                  src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2000&auto=format&fit=crop" 
                  alt="Rug Maintenance"
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-shibumi-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12">
                  <div className="p-8 md:p-12 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] space-y-6 md:space-y-8">
                    <div className="flex items-center gap-4 text-white">
                      <Wind size={24} className="text-shibumi-maroon" />
                      <h3 className="font-display text-2xl md:text-3xl">Professional Cleaning</h3>
                    </div>
                    <p className="text-white/80 font-body text-base md:text-lg font-light leading-relaxed">
                      We recommend professional cleaning every 3-5 years to remove deep-seated dust and restore the natural oils in the wool.
                    </p>
                    <button className="w-full py-5 md:py-6 bg-white text-shibumi-black rounded-full font-body text-[10px] uppercase tracking-[0.3em] hover:bg-shibumi-maroon hover:text-white transition-all">
                      Schedule Expert Service
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 md:py-48 text-center bg-white">
        <div className="max-w-3xl mx-auto space-y-12 px-6">
          <h2 className="font-display text-4xl md:text-8xl text-shibumi-black leading-tight italic">
            Your space, <br /> reimagined.
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <a href="/catalog" className="w-full md:w-auto px-16 py-6 bg-shibumi-black text-white rounded-full font-body text-[10px] uppercase tracking-[0.3em] hover:bg-shibumi-maroon transition-all">
              Explore Collections
            </a>
            <a href="/custom" className="w-full md:w-auto px-16 py-6 border border-shibumi-black/10 rounded-full font-body text-[10px] uppercase tracking-[0.3em] hover:bg-shibumi-black hover:text-white transition-all">
              Bespoke Design
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
