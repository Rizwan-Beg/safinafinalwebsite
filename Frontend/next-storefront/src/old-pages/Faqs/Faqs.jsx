"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200 py-4">
    <button
      className="flex justify-between items-center w-full text-left"
      onClick={onClick}
    >
      <h3 className="text-2xl font-semibold text-red-900">{question}</h3>
      <ChevronDown 
        className={`w-6 h-6 text-red-800 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
      />
    </button>
    <div 
      className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pt-4' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <div className="overflow-hidden">
        <p className="text-gray-900 text-[1.2rem] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  </div>
);

const Faqs = () => {
  const [openQuestion, setOpenQuestion] = useState(null); // Manages which question is open
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Professional FAQ content for an e-commerce rug store
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
      answer: "We offer an easy 7-day return policy. If you are not completely satisfied with your purchase, you can return it within 7 days of delivery for a full refund or exchange. The rug must be in its original, unused condition. Please visit our 'Shipping and Returns' page for detailed instructions."
    },
    {
      question: "Can I order a custom-sized rug?",
      answer: "Absolutely! We specialize in custom orders. Please visit our 'Custom Rugs' section or contact our design consultants through the 'Book an Appointment' link to discuss your specific requirements for size, color, and design."
    }
  ];

  return (
    <div className="bg-pink-50 min-h-screen ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[12vh]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 
            className={`text-4xl lg:text-6xl font-semibold text-red-800 tracking-tight transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
            style={{fontFamily: 'Jost, sans-serif'}}
          >
            Frequently Asked Questions
          </h1>
          <p 
            className={`mt-4 text-lg text-gray-900 max-w-3xl mx-auto transition-all duration-700 ease-in-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Have a question? We're here to help. If you don't see your question answered below, please feel free to contact us.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-5xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openQuestion === index}
              onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;