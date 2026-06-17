"use client";
import React, { useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import { useRouter as useNavigate } from "next/navigation";
import { MoveRight } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const sizes = [
  "3x5", "4x6", "5x7", "6x9", 
  "7x10", "8x10", "9x12", "10x14", 
  "11x15", "12x18", "14x20", "16x24"
];

const demoImage = "https://www.loomkart.com/cdn/shop/files/fauxsilkcarpetloomkart_neosilk550017_3.jpg?v=1753537930";

export default function ShopBySize() {
  const navigate = useNavigate();
  const bgTextRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(bgTextRef.current, 
        { x: '-10%' },
        {
          x: '10%',
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

  const handleClick = (size) => {
    navigate(`/catalog?size=${size}`);
  };

  return (
    <section ref={containerRef} className="relative py-32 bg-shibumi-light-gray/30 overflow-hidden">
      {/* Background Text - Luxurious Watermark */}
      <div className="absolute top-1/2 left-0 w-full flex justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h2 
          ref={bgTextRef}
          className="font-display text-[22vw] md:text-[18vw] leading-none text-shibumi-black opacity-[0.03] italic whitespace-nowrap tracking-tighter"
        >
          Dimensions Dimensions Dimensions
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
              The Perfect Fit
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
            Shop by <span className="italic font-light">Size</span>
          </motion.h2>
          
          <motion.p 
            className="text-shibumi-dark-gray/40 font-body text-xs tracking-[0.3em] uppercase max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            From intimate accents to grand statements
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {sizes.map((size, i) => (
            <motion.div
              key={size}
              onClick={() => handleClick(size)}
              className="group cursor-pointer flex flex-col gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:-translate-y-3">
                <img
                  src={demoImage}
                  alt={`Shop for ${size} size rugs`}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-shibumi-black/10 group-hover:bg-shibumi-black/30 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-4xl text-white font-display tracking-tight leading-none">{size}<span className="text-lg ml-1 font-body opacity-60">ft</span></p>
                    <div className="flex items-center text-white/0 group-hover:text-white/100 transition-all duration-500 text-[10px] tracking-[0.3em] uppercase font-body">
                      <span>View Collection</span>
                      <MoveRight className="h-4 w-4 ml-3 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
