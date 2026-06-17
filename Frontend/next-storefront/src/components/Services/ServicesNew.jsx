"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ServicesHero = () => {
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
          src="https://c.animaapp.com/uQnJWZv3/img/naren-morum-6cd8xj4sibw-unsplash.png"
          alt="Our Services"
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
          Care & Restoration
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-white/90 text-sm md:text-base uppercase tracking-[0.3em] mt-6 max-w-2xl"
        >
          Preserving the beauty and longevity of your hand-knotted treasures
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent" />
    </section>
  );
};

const ZigZagServiceItem = ({ title, description, image, reverse, index }) => {
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
        <div className="relative aspect-4/3 overflow-hidden shadow-xl bg-gray-100">
          {image ? (
            <img
              ref={imageRef}
              src={image}
              alt={title}
              className="w-full h-[140%] object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ willChange: 'transform' }}
            />
          ) : (
            <div className="w-full h-full bg-shibumi-pink/10 flex items-center justify-center">
               <span className="font-display text-2xl text-red-800/20">{title}</span>
            </div>
          )}
        </div>
      </div>

      <div
        ref={textRef}
        className={`${reverse ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'}`}
      >
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
    <section className="py-24 md:py-32 bg-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={textRef} className="space-y-8">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-shibumi-maroon">
            Expertise Beyond Craft
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-black leading-tight">
            Comprehensive care for your <span className="italic text-shibumi-maroon">fine rugs</span>.
          </h2>
          <p className="font-body text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            From professional cleaning to intricate restoration, our team of experts provides a full range of services to ensure your investment remains a source of beauty for generations.
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
              src="/images/about-showroom.jpg"
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

const ServicesNew = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Carpet Washing & Cleaning",
      description: "Professional carpet cleaning services using advanced techniques to restore your carpets to their original beauty. Our experienced team ensures deep cleaning while preserving the fabric quality.",
      image: "https://c.animaapp.com/uQnJWZv3/img/aman-chaturvedi-k84vkqsa3nq-unsplash.png",
      reverse: false
    },
    {
      title: "Repair & Restoration",
      description: "Expert repair and restoration services for damaged carpets. We specialize in fixing tears, holes, frayed edges, and restoring vintage carpets to their former glory.",
      image: "https://c.animaapp.com/uQnJWZv3/img/rectangle-33.png",
      reverse: true
    },
    {
      title: "Bespoke Customization",
      description: "Create bespoke carpets tailored to your specific requirements. Choose from various designs, colors, sizes, and materials to match your interior perfectly.",
      image: "https://c.animaapp.com/uQnJWZv3/img/firefly-carpets-and-rugs-at-home-premium-quality-handmade-craft-.png",
      reverse: false
    },
    {
      title: "Trade & Exchange",
      description: "Trade-in your old carpets for new ones or exchange carpets that no longer suit your space. We offer fair valuations and flexible exchange options.",
      image: "https://c.animaapp.com/uQnJWZv3/img/naren-morum-6cd8xj4sibw-unsplash.png",
      reverse: true
    },
    {
      title: "Expert Consultation",
      description: "Get professional advice on carpet selection, placement, and care. Our experts help you choose the perfect carpets for your home or office space.",
      image: "https://c.animaapp.com/uQnJWZv3/img/parham-moieni-adoi9b6wzuo-unsplash.png",
      reverse: false
    },
    {
      title: "Corporate & Event Solutions",
      description: "Special carpet solutions for corporate events, exhibitions, and commercial spaces. We provide rental and installation services for temporary and permanent setups.",
      image: "https://c.animaapp.com/uQnJWZv3/img/firefly-carpets-and-rugs-at-home-premium-quality-handmade-craft--1.png",
      reverse: true
    },
    {
      title: "Protection Plans",
      description: "Comprehensive protection plans to maintain your carpet's condition. Includes regular cleaning, stain protection, and maintenance services.",
      image: "https://c.animaapp.com/7kq845Cv/img/parham-moieni-adoi9b6wzuo-unsplash.png",
      reverse: false
    }
  ];

  return (
    <main className="bg-[#FFF5F5] w-full overflow-hidden">
      <div className="bg-[#FFF5F5]">
        <ServicesHero />
        <NarrativeSection />

        <ArtOfCreation />
        
        <section className="py-24 md:py-32 lg:py-48 bg-[#FFF5F5]">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            {services.map((service, index) => (
              <ZigZagServiceItem key={index} {...service} index={index} />
            ))}
          </div>
        </section>

        <section className="relative w-full py-40 bg-shibumi-maroon overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="flex justify-center mb-12">
              <div className="w-12 h-12 text-shibumi-pink/40">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                </svg>
              </div>
            </div>
            <h2 className="font-display text-headline text-white mb-12 italic">
              &ldquo;Preserve the Art, Protect the Legacy&rdquo;
            </h2>
            <div className="w-24 h-px bg-shibumi-pink/20 mx-auto mb-8" />
            <p className="font-body text-xs uppercase tracking-[0.4em] text-shibumi-pink">
              Quality Care &bull; Professional Restoration
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServicesNew;
