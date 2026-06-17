"use client";
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion';
import { useRouter as useNavigate } from "next/navigation";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import blueWool from '../../assets/Wools/blue.png'
import grayWool from '../../assets/Wools/gray.png'
import whiteWool from '../../assets/Wools/white.png'
import brownWool from '../../assets/Wools/brown.png'
import grayishWool from '../../assets/Wools/grayish.png'
import greenWool from '../../assets/Wools/green.png'
import halfwhiteWool from '../../assets/Wools/halfwhite.png'
import lightmaroonWool from '../../assets/Wools/lightmaroon.png'
import maroonWool from '../../assets/Wools/maroon.png'
import rgbWool from '../../assets/Wools/rgb.png'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ShopColor = () => {
  const navigate = useNavigate();
  const bgTextRef = useRef(null);
  const containerRef = useRef(null);

  const colors = [
    { name: "Gray", img: grayWool },
    { name: "Blue", img: blueWool },
    { name: "Brown", img: brownWool },
    { name: "Maroon", img: maroonWool },
    { name: "Light Maroon", img: lightmaroonWool },
    { name: "Green", img: greenWool },
    { name: "White", img: whiteWool },
    { name: "RGB", img: rgbWool },
    { name: "Half White", img: halfwhiteWool },
    { name: "Grayish", img: grayishWool },
  ];

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

  const handleClick = (colorName) => {
    navigate(`/catalog?color=${colorName}`);
  }

  return (
    <section ref={containerRef} className="relative py-32 bg-white overflow-hidden">
      {/* Background Text - Luxurious Watermark */}
      <div className="absolute top-1/2 left-0 w-full flex justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h2 
          ref={bgTextRef}
          className="font-display text-[22vw] md:text-[18vw] leading-none text-shibumi-black opacity-[0.04] italic whitespace-nowrap tracking-tighter"
        >
          Safina Carpets Safina Carpets
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
              The Masterpiece Palettes
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
            Shop by <span className="italic">Color</span>
          </motion.h2>
          
          <motion.p 
            className="text-shibumi-dark-gray/40 font-body text-xs tracking-[0.3em] uppercase max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Handcrafted with 100% natural dyes
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-12 gap-y-16">
          {colors.map((color, i) => (
            <motion.div
              key={color.name}
              className="group cursor-pointer flex flex-col items-center gap-6"
              onClick={() => handleClick(color.name)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-full bg-shibumi-light-gray group-hover:shadow-[0_20px_50px_rgba(134,10,12,0.15)] transition-all duration-700 group-hover:-translate-y-3">
                <img 
                  src={color.img.src || color.img} 
                  alt={color.name} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-shibumi-maroon/0 group-hover:bg-shibumi-maroon/5 transition-colors duration-700" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-body text-[10px] tracking-[0.2em] uppercase text-shibumi-black/40 group-hover:text-shibumi-maroon transition-colors duration-500">
                  {color.name}
                </h3>
                <div className="w-0 h-px bg-shibumi-maroon mx-auto transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopColor;