"use client";
import React from 'react';
import { motion } from 'framer-motion';

const VideoSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div 
        className="absolute inset-0 parallax-bg"
        style={{ backgroundImage: 'url(/images/video-section-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-shibumi-accent-warm text-sm tracking-[0.3em] font-light uppercase">The Craft</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl mx-auto">
            Every Knot Tells a Story of Heritage
          </h2>
          <div className="mt-8 space-y-6 text-lg font-light max-w-2xl mx-auto opacity-90">
            <p>
              The art of carpet weaving is a labor of love that can take months or even years to complete. Master weavers tie each knot by hand, creating intricate patterns that have remained unchanged for millennia.
            </p>
          </div>
          <div className="mt-12">
            <a
              href="/manufacturing"
              className="px-12 py-4 bg-shibumi-brown text-white font-light tracking-widest text-sm btn-hover uppercase"
            >
              Watch the Process
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
