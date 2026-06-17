"use client";
import React from 'react';
import { Truck, ShieldCheck, Leaf, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <Truck size={32} strokeWidth={1} />,
      title: "Global Shipping",
      description: "White-glove delivery service to over 50 countries worldwide."
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1} />,
      title: "Authenticity Guaranteed",
      description: "Each piece comes with a certified certificate of origin and age."
    },
    {
      icon: <Leaf size={32} strokeWidth={1} />,
      title: "Natural Dyes",
      description: "We use only organic pigments derived from plants and minerals."
    },
    {
      icon: <Heart size={32} strokeWidth={1} />,
      title: "Ethical Sourcing",
      description: "Supporting weaving communities and ensuring fair trade practices."
    }
  ];

  return (
    <section className="py-24 bg-shibumi-light-gray">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex justify-center text-shibumi-brown">
                {feature.icon}
              </div>
              <h4 className="font-serif text-xl text-shibumi-black">{feature.title}</h4>
              <p className="text-shibumi-medium-gray text-sm font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
