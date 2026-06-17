"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const Counter = ({ value, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
    duration: duration * 1000
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return spring.onChange((v) => {
      setDisplayValue(Math.round(v));
    });
  }, [spring]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const SubHero = () => {
  const stats = [
    { value: 2500, suffix: "+", label: "Years of Tradition" },
    { value: 40, suffix: "+", label: "Years in Business" },
    { value: 5000, suffix: "+", label: "Rugs Curated" },
    { value: 100, suffix: "%", label: "Hand-Knotted" },
  ];

  return (
    <section id="subhero" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-shibumi-brown text-sm tracking-[0.3em] font-light uppercase">Our Philosophy</span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl text-shibumi-black leading-tight">
                Where Art Meets Tradition
              </h2>
            </motion.div>

            <motion.div
              className="space-y-6 text-shibumi-medium-gray font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                For over four decades, Safina Carpets has been dedicated to preserving the ancient art of Mughal-era carpet weaving. Each rug in our collection tells a story of heritage, craftsmanship, and uncompromising quality.
              </p>
              <p>
                We work directly with master weavers, ensuring every piece is hand-knotted using time-honored techniques passed down through generations. Our commitment to authenticity ensures a masterpiece for every home.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a
                href="/about"
                className="inline-block text-shibumi-black text-sm tracking-widest font-medium border-b border-shibumi-brown pb-1 hover:text-shibumi-brown transition-colors uppercase"
              >
                Discover Our Heritage
              </a>
            </motion.div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <div className="text-4xl font-serif text-shibumi-brown">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-shibumi-medium-gray mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              className="relative z-10 aspect-[4/5] overflow-hidden"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <img
                src="/images/subhero-1.jpg"
                alt="Artisan at work"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-12 -left-12 w-2/3 aspect-square z-20 border-[12px] border-white overflow-hidden hidden md:block"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <img
                src="/images/subhero-2.jpg"
                alt="Rug detail"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubHero;
