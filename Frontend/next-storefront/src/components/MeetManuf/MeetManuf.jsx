"use client";
import React from 'react';
import { motion } from 'framer-motion';
import craftsmanship from "../../assets/craftsmanship.png";
import funding from "../../assets/funding.png";
import services from "../../assets/services.png";
import warranty from "../../assets/warranty.png";

const MeetManuf = () => {
  const cards = [
    {
      icon: craftsmanship,
      title: "Heirloom Craftsmanship",
      description: "We are proud to champion artisanal techniques passed down through generations.",
      link: "Craftsmanship",
      href: "/manufacturing"
    },
    {
      icon: funding,
      title: "Direct Sourcing",
      description: "By working directly with master weavers, we ensure fair value for both creators and collectors.",
      link: "Our Heritage",
      href: "/about"
    },
    {
      icon: warranty,
      title: "Authentic Quality",
      description: "Each piece is hand-selected and comes with a guarantee of origin and premium materials.",
      link: "Learn More",
      href: "/guide"
    },
    {
      icon: services,
      title: "A Truly Personal Service",
      description: "Our experts are here to help you find the perfect masterpiece for your unique space.",
      link: "Our Services",
      href: "/services"
    }
  ];

  return (
    <section className="bg-shibumi-light-gray py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            className="text-shibumi-brown text-xs tracking-[0.3em] font-light uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Direct Connection
          </motion.span>
          <motion.h2 
            className="font-serif text-4xl md:text-5xl text-shibumi-black caveat-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Meet Manufacturers Directly
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="bg-white p-10 text-center shadow-sm hover:shadow-xl transition-all duration-500 group border border-transparent hover:border-shibumi-brown/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-8 flex justify-center">
                <div className="relative pb-4">
                  <img 
                    src={card.icon.src || card.icon} 
                    alt="" 
                    className="w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-shibumi-black/20 group-hover:bg-shibumi-brown transition-colors" />
                </div>
              </div>
              <h3 className="text-lg font-serif text-shibumi-black mb-4 leading-tight group-hover:text-shibumi-brown transition-colors">
                {card.title}
              </h3>
              <p className="text-shibumi-medium-gray text-sm font-light mb-8 leading-relaxed">
                {card.description}
              </p>
              <a 
                href={card.href}
                className="text-shibumi-black text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-2 group-hover:text-shibumi-brown transition-colors"
              >
                {card.link} <span className="text-lg">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetManuf;