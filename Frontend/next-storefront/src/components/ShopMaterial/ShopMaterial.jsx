"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter as useNavigate } from "next/navigation";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const fallbackCards = [
  { name: "Hand Made", image: "/handmade.png", description: "Authentic hand-knotted masterpieces, crafted with centuries-old techniques." },
  { name: "Staple", image: "/staple.png", description: "Durable and beautiful everyday rugs for contemporary living spaces." },
  { name: "Machine Made", image: "/machinemade.png", description: "Precision crafted for modern living with consistent quality and style." },
];

const ShopMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const navigate = useNavigate();
  const bgTextRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
    fetch(`${baseUrl}/api/materials`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) setMaterials(data);
        else setMaterials(fallbackCards);
      })
      .catch(err => {
        setMaterials(fallbackCards);
      });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(bgTextRef.current, 
        { x: '10%' },
        {
          x: '-10%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    const maxSlide = Math.max(0, materials.length - cardsPerView);
    setCurrentSlide(prev => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxSlide = Math.max(0, materials.length - cardsPerView);
    setCurrentSlide(prev => (prev <= 0 ? maxSlide : prev - 1));
  };

  const handleClick = (materialName) => {
    navigate(`/catalog?material=${materialName}`);
  };

  return (
    <section ref={containerRef} className="relative py-32 bg-white overflow-hidden">
      {/* Background Text - Luxurious Watermark */}
      <div className="absolute top-1/2 left-0 w-full flex justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h2 
          ref={bgTextRef}
          className="font-display text-[22vw] md:text-[18vw] leading-none text-shibumi-black opacity-[0.03] italic whitespace-nowrap tracking-tighter"
        >
          Textures Textures Textures
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <motion.span 
              className="text-shibumi-maroon text-[10px] tracking-[0.6em] font-body uppercase"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Premium Artistry
            </motion.span>
            <div className="w-12 h-px bg-shibumi-maroon/20" />
          </div>
          
          <motion.h2 
            className="font-display text-5xl md:text-7xl text-shibumi-black leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Shop by <span className="italic font-light">Material</span>
          </motion.h2>
          
          <motion.p 
            className="text-shibumi-dark-gray/40 font-body text-xs tracking-[0.3em] uppercase max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Woven with the world&apos;s finest natural fibers
          </motion.p>
        </div>

        <div className="relative group">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md shadow-2xl text-shibumi-black p-5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-shibumi-maroon hover:text-white border border-shibumi-black/5"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md shadow-2xl text-shibumi-black p-5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-shibumi-maroon hover:text-white border border-shibumi-black/5"
          >
            <ChevronRight size={20} />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden px-2">
            <div 
              className="flex transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
              style={{ transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)` }}
            >
              {materials.map((material, index) => (
                <motion.div 
                  key={index} 
                  className="px-6 flex-shrink-0"
                  style={{ width: `${100 / cardsPerView}%` }}
                  onClick={() => handleClick(material.name)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                >
                  <div className="group cursor-pointer bg-white overflow-hidden rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img 
                        src={material.image} 
                        alt={material.name} 
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-110"
                      />
                    </div>
                    <div className="p-10 space-y-6">
                      <div className="space-y-3">
                        <h3 className="font-display text-3xl text-shibumi-black group-hover:text-shibumi-maroon transition-colors duration-500">
                          {material.name}
                        </h3>
                        <p className="text-shibumi-dark-gray/60 font-body text-sm leading-relaxed line-clamp-3">
                          {material.description}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center text-[10px] tracking-[0.3em] uppercase font-body text-shibumi-black/40 group-hover:text-shibumi-maroon transition-colors duration-500">
                        <span>Explore Masterpieces</span>
                        <ArrowUpRight className="ml-3 h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-16 space-x-4">
            {Array.from({ length: Math.max(1, materials.length - cardsPerView + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-[2px] transition-all duration-700 ${
                  index === currentSlide 
                    ? 'bg-shibumi-maroon w-16' 
                    : 'bg-shibumi-black/10 w-6 hover:bg-shibumi-black/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopMaterial;
