"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Story() {
  const [activeTab, setActiveTab] = useState('STORIES');
  
  const tabsData = {
    'STORIES': {
      title: 'Our Journey',
      content: 'Founded in 1985, Safina Carpets began with a vision to bring the timeless elegance of Mughal artistry to the modern world. Every knot we tie is a testament to our commitment to excellence and our respect for heritage.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Artisans sharing stories'
    },
    'GUIDE': {
      title: 'Expert Guidance',
      content: 'Choosing the right rug is an art form. Our experts provide personalized consultations to help you select the perfect piece that complements your architecture, lighting, and lifestyle.',
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Interior design consultation'
    },
    'VISION': {
      title: 'A Vision for Spaces',
      content: 'We believe a rug is the soul of a room. Our vision is to create environments that inspire tranquility and evoke a sense of luxurious comfort through thoughtful, hand-crafted design.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Luxurious living space'
    },
    'HERITAGE': {
      title: 'Living Heritage',
      content: 'Our weavers use techniques passed down through generations. By supporting these traditional crafts, we ensure that the ancient art of hand-knotting continues to thrive in the 21st century.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Traditional loom work'
    },
    'SERVICES': {
      title: 'Bespoke Services',
      content: 'From custom sizing and color matching to professional cleaning and restoration, we offer a full suite of services to ensure your heirloom rug lasts for generations to come.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Professional service'
    }
  };

  const tabs = ['STORIES', 'GUIDE', 'VISION', 'HERITAGE', 'SERVICES'];

  return (
    <section className="py-24 bg-shibumi-light-gray">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-shibumi-brown text-xs tracking-[0.3em] font-light uppercase">The Safina Legacy</span>
          <h2 className="font-serif text-4xl md:text-5xl text-shibumi-black">Discover Our Story</h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-16 overflow-x-auto scrollbar-hide pb-4">
          <div className="flex gap-8 md:gap-12 border-b border-gray-200 w-full justify-center min-w-max px-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs tracking-[0.2em] font-medium transition-all duration-300 relative ${
                  activeTab === tab ? 'text-shibumi-black' : 'text-shibumi-medium-gray hover:text-shibumi-black'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-shibumi-brown"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8 order-2 lg:order-1">
              <h3 className="font-serif text-3xl md:text-4xl text-shibumi-black leading-tight">
                {tabsData[activeTab].title}
              </h3>
              <p className="text-shibumi-medium-gray font-light leading-relaxed text-lg">
                {tabsData[activeTab].content}
              </p>
              <div className="pt-4">
                <a 
                  href={`/${activeTab.toLowerCase()}`}
                  className="text-shibumi-black text-xs font-medium tracking-widest uppercase border-b border-shibumi-brown pb-1 hover:text-shibumi-brown transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
                <img 
                  src={tabsData[activeTab].image}
                  alt={tabsData[activeTab].alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-shibumi-black/10" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}