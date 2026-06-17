"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ManufacturingHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;

    if (!section || !title || !subtitle || !image || !overlay) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      image,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2 }
    )
    .fromTo(
      title,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5 },
      '-=1.5'
    )
    .fromTo(
      subtitle,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.8'
    );

    const triggers = [];

    const imageTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(image, { y: self.progress * 150 });
      },
    });
    triggers.push(imageTrigger);

    const titleTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '50% top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(title, {
          opacity: 1 - self.progress * 1.5,
          y: self.progress * -50
        });
        gsap.set(subtitle, {
          opacity: 1 - self.progress * 2,
          y: self.progress * -30
        });
      },
    });
    triggers.push(titleTrigger);

    return () => {
      triggers.forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[80svh] w-full overflow-hidden"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src="https://c.animaapp.com/7kq845Cv/img/rectangle-25.svg"
          alt="Manufacturing Heritage"
          className="w-full h-full object-cover ken-burns"
        />
      </div>

      <div ref={overlayRef} className="absolute inset-0 bg-shibumi-maroon/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1
          ref={titleRef}
          className="font-display text-white text-display tracking-tight select-none"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}
        >
          Our Craftsmanship
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-white/90 text-sm md:text-base uppercase tracking-[0.3em] mt-6 max-w-2xl"
        >
          Bringing the beauty of centuries-old craftsmanship to the modern world
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent" />
    </section>
  );
};

const ZigZagItem = ({ title, subtitle, description, image, reverse, index }) => {
  const itemRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const text = textRef.current;
    const imageContainer = imageContainerRef.current;
    const img = imageRef.current;

    if (!text || !imageContainer || !img) return;

    gsap.set(text.children, { opacity: 0, y: 30 });

    const textTrigger = ScrollTrigger.create({
      trigger: text,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(text.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
    });

    const imageTrigger = ScrollTrigger.create({
      trigger: imageContainer,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const yPercent = (self.progress - 0.5) * 40;
        gsap.set(img, { yPercent });
      },
    });

    // Reveal animation
    gsap.fromTo(imageContainer, 
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { 
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: imageContainer,
          start: 'top 90%',
          once: true
        }
      }
    );

    return () => {
      textTrigger.kill();
      imageTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        index > 0 ? 'mt-24 md:mt-32' : ''
      }`}
    >
      <div
        ref={imageContainerRef}
        className={`relative overflow-hidden rounded-3xl group ${
          reverse ? 'lg:order-2' : 'lg:order-1'
        }`}
        style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      >
        <div className="relative aspect-4/3 overflow-hidden shadow-xl">
          <img
            ref={imageRef}
            src={image}
            alt={title}
            className="w-full h-[140%] object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ willChange: 'transform' }}
          />
        </div>
      </div>

      <div
        ref={textRef}
        className={`${reverse ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'}`}
      >
        <span className="font-body text-xs uppercase tracking-[0.2em] text-red-800">
          {subtitle}
        </span>
        <h3 className="font-display text-headline text-black mt-3">
          {title}
        </h3>
        <p className="font-body text-sm md:text-base text-gray-600 leading-relaxed mt-6">
          {description}
        </p>
        <div className="w-16 h-px bg-red-800/30 mt-8" />
      </div>
    </div>
  );
};

const NarrativeSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    gsap.fromTo(
      text.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div ref={textRef} className="space-y-8">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-shibumi-maroon">
            A Legacy of Excellence
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-black leading-tight">
            Where every thread tells a story of <span className="italic text-shibumi-maroon">timeless artistry</span>.
          </h2>
          <p className="font-body text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Our process is a symphony of tradition and precision. From the selection of the finest wool to the final meticulous knot, we honor the heritage of carpet making while embracing a vision for the modern home.
          </p>
        </div>
      </div>
    </section>
  );
};

const ArtOfCreation = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const text = textRef.current;
    const subtitle = subtitleRef.current;
    const img = container?.querySelector('img');

    if (!section || !container || !text || !subtitle || !img) return;

    gsap.set(container, { scale: 0.92, borderRadius: '60px' });
    gsap.set(text, { yPercent: 100 });
    gsap.set(subtitle, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Expansion effect
        const expansionProgress = Math.min(progress * 1.5, 1);
        gsap.set(container, {
          scale: 0.92 + expansionProgress * 0.08,
          borderRadius: `${60 - expansionProgress * 20}px`,
        });

        // Parallax effect on image inside frame
        gsap.set(img, {
          y: (progress - 0.5) * 150,
        });

        // Text reveal (Slide up)
        if (progress > 0.2) {
          const textProgress = Math.min((progress - 0.2) * 2, 1);
          gsap.set(text, {
            yPercent: (1 - textProgress) * 100,
          });
        }

        // Subtitle reveal
        if (progress > 0.4) {
          const subtitleProgress = Math.min((progress - 0.4) * 2, 1);
          gsap.set(subtitle, {
            opacity: subtitleProgress,
            y: 20 - subtitleProgress * 20,
          });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white">
      <div className="px-4 md:px-8">
        <div ref={containerRef} className="relative w-full max-w-7xl mx-auto overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <img
              src="/images/about-heritage.jpg"
              alt="Art of Creation"
              className="w-full h-full object-cover scale-110"
              style={{ transformOrigin: 'center center' }}
            />
            <div className="absolute inset-0 bg-shibumi-maroon/40 mix-blend-multiply opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <div className="overflow-hidden mb-4">
                <h2 ref={textRef} className="font-display text-display text-white tracking-tight">
                  The Art of Creation
                </h2>
              </div>
              <div className="overflow-hidden">
                <p ref={subtitleRef} className="font-body text-white/90 text-sm md:text-base uppercase tracking-[0.4em]">
                  Handcrafted with Heart
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 md:px-8 mt-16 md:mt-24 text-center">
        <p className="font-body text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed italic opacity-80">
          &ldquo;Behind every exceptional rug is a master artisan who has devoted their life to the craft. Our weavers use traditional techniques that have remained unchanged for centuries.&rdquo;
        </p>
      </div>
    </section>
  );
};

const ManufacturingNew = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "The Founder",
      subtitle: "OUR ROOTS",
      description: "Established in 1970, Safina Carpets has its roots in the Mughal era, where carpets adorned royal courts and symbolised luxury and refinement. Our journey began with a commitment to preserve these ancient techniques.",
      image: "https://c.animaapp.com/7kq845Cv/img/sam-carter-ghoiyov2tsq-unsplash.png",
      reverse: false
    },
    {
      title: "Heirloom Quality",
      subtitle: "MASTER ARTISTRY",
      description: "Every knot holds a memory, and every fiber tells a story. We work directly with master artisans who carry generations of weaving wisdom, ensuring each piece is a unique masterpiece of textile art.",
      image: "https://c.animaapp.com/7kq845Cv/img/aman-chaturvedi-k84vkqsa3nq-unsplash.png",
      reverse: true
    },
    {
      title: "Sustainable Process",
      subtitle: "ETHICAL CRAFT",
      description: "From hand-spinning wool to mixing natural dyes from plants and minerals, our manufacturing process respects both heritage and the environment. We ensure fair value for our weavers and premium quality for our clients.",
      image: "https://c.animaapp.com/7kq845Cv/img/firefly-carpets-and-rugs-at-home-premium-quality-handmade-craft--1.png",
      reverse: false
    },
    {
      title: "Modern Vision",
      subtitle: "EVOLVING TRADITION",
      description: "While we honor traditional techniques, we constantly innovate our designs to suit modern interiors. Safina Carpets brings the timeless elegance of the past into the contemporary homes of today.",
      image: "https://c.animaapp.com/7kq845Cv/img/parham-moieni-adoi9b6wzuo-unsplash.png",
      reverse: true
    }
  ];

  return (
    <main className="bg-white w-full overflow-hidden">
      <ManufacturingHero />
      
      <NarrativeSection />

      <ArtOfCreation />

      {/* Process Involve Divider */}
      <section className="w-full bg-shibumi-pink/30 py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-shibumi-maroon mb-4 block">
            Our Method
          </span>
          <h2 className="font-display text-headline text-black mb-16">
            The Journey of a Masterpiece
          </h2>
          <div className="relative max-w-5xl mx-auto">
            <img
              className="w-full opacity-90"
              alt="Line of Mughals"
              src="https://c.animaapp.com/7kq845Cv/img/lineofmughals.svg"
            />
          </div>
        </div>
      </section>

      {/* Main Narrative Content */}
      <section className="py-24 md:py-32 lg:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {sections.map((item, index) => (
            <ZigZagItem key={index} {...item} index={index} />
          ))}
        </div>
      </section>

      {/* Story Highlight / Breath Section Style */}
      <section className="relative w-full py-40 bg-shibumi-maroon overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full spin-slow">
            <path d="M50 0L55 45L100 50L55 55L50 100L45 55L0 50L45 45L50 0Z" fill="#FFE5E6" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="flex justify-center mb-12">
            <div className="w-12 h-12 text-shibumi-pink/40">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
          </div>
          <h2 className="font-display text-headline text-white mb-12 italic">
            &ldquo;We don&apos;t just make rugs; we preserve a legacy of art that has thrived for centuries.&rdquo;
          </h2>
          <div className="w-24 h-px bg-shibumi-pink/20 mx-auto mb-8" />
          <p className="font-body text-xs uppercase tracking-[0.4em] text-shibumi-pink">
            Safina Carpets &bull; Since 1970
          </p>
        </div>
      </section>
    </main>
  );
};

export default ManufacturingNew;
