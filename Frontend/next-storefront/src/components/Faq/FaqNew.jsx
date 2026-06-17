"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FaqItem = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <div className="border-b border-shibumi-maroon/10 last:border-none py-8 group cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-center w-full text-left gap-8">
        <div className="flex items-start gap-6">
          <span className="font-display text-shibumi-maroon/30 text-lg pt-1">0{index + 1}</span>
          <h3 className={`text-xl md:text-2xl font-display transition-smooth ${isOpen ? 'text-shibumi-maroon' : 'text-shibumi-dark-gray group-hover:text-shibumi-maroon'}`}>
            {question}
          </h3>
        </div>
        <div className={`shrink-0 w-10 h-10 rounded-full border border-shibumi-maroon/20 flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-shibumi-maroon border-shibumi-maroon rotate-180' : 'group-hover:border-shibumi-maroon'}`}>
          {isOpen ? <Minus size={18} className="text-white" /> : <Plus size={18} className="text-shibumi-maroon" />}
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 pl-14 pr-12">
              <p className="font-body text-shibumi-dark-gray/80 text-lg leading-relaxed max-w-4xl">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqNew = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.fromTo(titleRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const faqData = [
    {
      question: "What materials are your rugs made from?",
      answer: "Our rugs are crafted from a variety of high-quality materials, including 100% natural wool, luxurious silk, and durable jute. Each product page specifies the exact materials used, so you can choose the perfect texture and durability for your space."
    },
    {
      question: "How do I clean and care for my rug?",
      answer: "For general maintenance, we recommend regular vacuuming without a beater bar. For spills, blot immediately with a clean, dry cloth. For deep cleaning, we strongly advise using a professional rug cleaning service to preserve the integrity and color of your handmade carpet."
    },
    {
      question: "What is your shipping policy?",
      answer: "We offer complimentary shipping on all orders across India. Once your order is placed, it is typically processed within 2-3 business days. You will receive a tracking number via email as soon as your rug is dispatched."
    },
    {
      question: "What is your return policy?",
      answer: "We offer an easy 7-day return policy. If you are not completely satisfied with your purchase, you can return it within 7 days of delivery for a full refund or exchange. The rug must be in its original, unused condition."
    },
    {
      question: "Can I order a custom-sized rug?",
      answer: "Absolutely! We specialize in custom orders. Please visit our 'Custom Rugs' section or contact our design consultants through the 'Book an Appointment' link to discuss your specific requirements for size, color, and design."
    }
  ];

  return (
    <main className="bg-shibumi-white min-h-screen pt-[15vh] pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={titleRef} className="mb-24 text-center">
          <span className="font-body text-shibumi-maroon text-sm uppercase tracking-[0.4em] block mb-6">Support Concierge</span>
          <h1 className="font-display text-5xl md:text-7xl text-shibumi-maroon tracking-tight leading-none mb-8">
            Curated Knowledge
          </h1>
          <div className="w-24 h-px bg-shibumi-maroon mx-auto opacity-30" />
        </div>

        <div ref={containerRef} className="max-w-4xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="mt-32 text-center">
          <div className="bg-[#FFE5E6]/50 p-12 md:p-20 rounded-[3rem] border border-shibumi-maroon/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-shibumi-maroon/5 rounded-full -mr-32 -mt-32 transition-smooth group-hover:scale-110" />
            <h2 className="font-display text-3xl md:text-5xl text-shibumi-maroon mb-8 relative z-10">Still Have Questions?</h2>
            <p className="font-body text-shibumi-dark-gray/80 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Our design consultants are available for personalized guidance on choosing the perfect piece for your sanctuary.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
              <a href="mailto:safinacarpets@yahoo.com" className="px-10 py-5 bg-shibumi-maroon text-white rounded-full font-body text-sm uppercase tracking-widest transition-smooth hover:bg-shibumi-maroon/90 hover:-translate-y-1 hover:shadow-xl">
                Contact Concierge
              </a>
              <button className="px-10 py-5 border border-shibumi-maroon text-shibumi-maroon rounded-full font-body text-sm uppercase tracking-widest transition-smooth hover:bg-shibumi-maroon hover:text-white hover:-translate-y-1">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FaqNew;
