"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(imageRef.current,
        { scale: 1.3, filter: 'grayscale(100%)' },
        { scale: 1, filter: 'grayscale(0%)', duration: 2.5 }
      )
      .fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8 },
        '-=2'
      )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        '-=1.2'
      );

      gsap.to(imageRef.current, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src="https://c.animaapp.com/gH0bez6V/img/rectangle-25.svg"
          alt="Safina Heritage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-shibumi-maroon/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-white" />
      </div>
      
      <div className="relative z-10 text-center px-6">
        <div className="overflow-hidden mb-4">
          <span ref={subtitleRef} className="font-body text-white/80 text-xs md:text-sm uppercase tracking-[0.6em] block">
            Since 1970 — The Art of Handweaving
          </span>
        </div>
        <h1 ref={titleRef} className="font-display text-white text-[12vw] md:text-[10rem] leading-[0.8] tracking-tighter mix-blend-difference">
          Safina <br /> <span className="italic ml-[10vw]">Carpets</span>
        </h1>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/50">
        <span className="font-body text-[10px] uppercase tracking-widest">Scroll to Discover</span>
        <div className="w-px h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }} 
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-white" 
          />
        </div>
      </div>
    </section>
  );
};

const LegacySection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
        <div className="lg:col-span-7" ref={textRef}>
          <span className="font-body text-shibumi-maroon text-sm uppercase tracking-[0.4em] block mb-12">The Legacy</span>
          <h2 className="font-display text-5xl md:text-8xl text-shibumi-maroon leading-[0.9] mb-12">
            A Story Spanning <br /> <span className="italic">Four Generations</span>
          </h2>
          <div className="max-w-2xl font-body text-shibumi-dark-gray text-lg md:text-xl leading-relaxed space-y-8">
            <p>
              Established in 1970, Safina Carpets has its roots in the Mughal era, where carpets adorned royal courts and symbolised luxury and refinement.
            </p>
            <p className="font-display text-3xl italic text-shibumi-maroon/60 border-l-2 border-shibumi-maroon/20 pl-8 py-2">
              &ldquo;We believe a carpet is the soul of a room.&rdquo;
            </p>
            <p>
              Founded by my grandfather, Sayeed Beg, who handcrafted intricate carpets, the tradition grew through the efforts of my father, Shahid Beg.
            </p>
          </div>
        </div>
        <div className="lg:col-span-5 relative group">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
            <img 
              src="https://c.animaapp.com/gH0bez6V/img/rectangle-29.svg" 
              alt="Artisan" 
              className="w-full h-full object-cover transition-smooth group-hover:scale-110"
            />
          </div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-shibumi-pink rounded-full -z-10 animate-spin-slow opacity-50" />
        </div>
      </div>
    </section>
  );
};

const VisionSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, imageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 bg-shibumi-light-gray/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
        <div className="lg:col-span-6 lg:order-2">
          <h2 className="font-display text-5xl md:text-7xl text-shibumi-maroon mb-12">The Visionary <br /> <span className="italic">Craftsmanship</span></h2>
          <div className="space-y-8 font-body text-shibumi-dark-gray text-lg leading-relaxed">
            <p>
              The journey of Safina Carpets is a testament to the dedication of those who came before us. Every knot tells a story of patience, skill, and an unwavering commitment to quality.
            </p>
            <p>
              Today, as the fourth generation, I, Rizwan Beg, continue this legacy by blending tradition with innovation and bringing it to a global audience.
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 lg:order-1">
          <div ref={imageRef} className="relative aspect-square overflow-hidden rounded-[3rem] shadow-2xl">
            <img 
              src="https://c.animaapp.com/gH0bez6V/img/rectangle-33.svg" 
              alt="Visionary" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const teamMembers = [
    { name: "Shahid Beg", role: "Master Weaver", image: "https://c.animaapp.com/gH0bez6V/img/rectangle-39.svg" },
    { name: "Shahid Beg", role: "Design Visionary", image: "https://c.animaapp.com/gH0bez6V/img/rectangle-40.svg" },
    { name: "Shahid Beg", role: "Production Lead", image: "https://c.animaapp.com/gH0bez6V/img/rectangle-41.svg" },
    { name: "Shahid Beg", role: "Heritage Keeper", image: "https://c.animaapp.com/gH0bez6V/img/rectangle-42.svg" },
  ];

  return (
    <section className="py-48 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 text-center">
          <h2 className="font-display text-5xl md:text-8xl text-shibumi-maroon leading-none">Our Heritage <br /><span className="italic">Custodians</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-8 bg-shibumi-light-gray">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-shibumi-maroon/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                  <span className="text-white font-body text-xs uppercase tracking-[0.3em]">{member.role}</span>
                </div>
              </div>
              <h3 className="font-display text-2xl text-shibumi-maroon mb-2">{member.name}</h3>
              <div className="w-12 h-px bg-shibumi-maroon/30 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="relative py-48 bg-[#1a1a1a] text-white overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-40">
        <img 
          src="https://c.animaapp.com/gH0bez6V/img/rectangle-25.svg" 
          className="w-full h-full object-cover scale-110" 
          alt="CTA Background"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />
      
      <div className="relative z-10 text-center max-w-4xl px-6">
        <span className="font-body text-[#FFE5E6] text-sm uppercase tracking-[0.6em] block mb-12">Your Sanctuary Awaits</span>
        <h2 className="font-caveat text-6xl md:text-9xl mb-12 text-[#FFE5E6]">Make Your House Happy</h2>
        <p className="font-body text-lg md:text-xl font-light tracking-wide leading-relaxed opacity-70 mb-16 max-w-2xl mx-auto">
          Experience the pinnacle of Mughal heritage and modern luxury. Every Safina carpet is a masterpiece crafted for your legacy.
        </p>
        <button className="group relative px-12 py-6 bg-white text-shibumi-maroon font-body text-xs uppercase tracking-[0.3em] overflow-hidden rounded-full transition-smooth hover:text-white">
          <div className="absolute inset-0 bg-shibumi-maroon translate-y-full transition-transform duration-500 ease-[0.16, 1, 0.3, 1] group-hover:translate-y-0" />
          <span className="relative z-10">Discover the Collection</span>
        </button>
      </div>
    </section>
  );
};

const AboutUsNew = () => {
  return (
    <main className="bg-white overflow-x-hidden w-full relative">
      <AboutHero />
      <LegacySection />
      
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-shibumi-maroon">
        <div className="absolute inset-0 opacity-10 font-display text-[30vw] whitespace-nowrap select-none pointer-events-none text-white flex items-center animate-scroll-text will-change-transform">
          SAFINA HERITAGE SAFINA HERITAGE SAFINA HERITAGE
        </div>
        <div className="relative z-10 max-w-4xl text-center px-6">
          <p className="font-display text-3xl md:text-5xl text-[#FFE5E6] leading-tight">
            &ldquo;We don&apos;t just weave carpets, we weave stories that last for generations.&rdquo;
          </p>
        </div>
      </section>

      <VisionSection />
      <TeamSection />
      <CTASection />

      <style jsx global>{`
        @keyframes scroll-text {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll-text {
          animation: scroll-text 30s linear infinite;
        }
      `}</style>
    </main>
  );
};

export default AboutUsNew;
