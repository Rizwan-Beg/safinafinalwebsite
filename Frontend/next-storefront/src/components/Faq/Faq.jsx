"use client";
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ChevronDown } from 'lucide-react';

export default function AnimatedFAQSection() {
  const [openItems, setOpenItems] = useState(new Set());
  const [hoveredItem, setHoveredItem] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all furniture items in their original condition. Items must be unused and in their original packaging. Custom-made furniture cannot be returned unless there is a manufacturing defect. Return shipping costs are covered by us for defective items, otherwise customers are responsible for return shipping."
    },
    {
      id: 2,
      question: "How long does delivery take?",
      answer: "Standard delivery takes 2-3 weeks for in-stock items. Custom furniture orders typically take 6-8 weeks to manufacture and deliver. We offer expedited shipping options for an additional fee. You'll receive tracking information once your order ships, and our delivery team will contact you to schedule a convenient delivery time."
    },
    {
      id: 3,
      question: "Do you offer assembly services?",
      answer: "Yes, we provide professional assembly services for all furniture purchases. Our experienced team can assemble your furniture at the time of delivery for an additional service fee. We also provide detailed assembly instructions and video tutorials if you prefer to assemble items yourself. All necessary hardware and tools are included."
    },
    {
      id: 4,
      question: "Can I customize furniture pieces?",
      answer: "Absolutely! We offer extensive customization options including fabric selection, wood finishes, dimensions, and hardware choices. Our design consultants will work with you to create pieces that perfectly match your vision and space requirements. Custom orders require a 50% deposit and take 6-8 weeks to complete."
    },
    {
      id: 5,
      question: "Do you offer financing options?",
      answer: "Yes, we partner with several financing companies to offer flexible payment plans. Options include 0% APR for qualified customers, monthly payment plans, and lease-to-own programs. You can apply for financing online or in-store, and approval decisions are typically instant. Minimum purchase amounts may apply."
    },
    {
      id: 6,
      question: "What warranty do you provide?",
      answer: "All our furniture comes with a comprehensive warranty. Solid wood pieces have a 10-year structural warranty, upholstered items have a 5-year frame warranty and 2-year fabric warranty. Hardware and mechanisms are covered for 3 years. We also offer extended warranty options for additional peace of mind."
    },
    {
      id: 7,
      question: "Do you have showrooms I can visit?",
      answer: "Yes, we have multiple showroom locations where you can see and touch our furniture before purchasing. Our showrooms feature room displays, fabric samples, and knowledgeable staff to assist you. Visit our website for showroom locations, hours, and to schedule design consultations with our experts."
    },
    {
      id: 8,
      question: "How do I care for my furniture?",
      answer: "Each piece comes with specific care instructions. Generally, dust regularly with a soft cloth, avoid direct sunlight and heat sources, and use coasters and placemats to protect surfaces. For upholstered items, vacuum regularly and address spills immediately. We also offer professional cleaning and maintenance services."
    }
  ];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const expandAll = () => {
    setOpenItems(new Set(faqData.map(item => item.id)));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
          <HelpCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our furniture, services, and policies. 
          Can't find what you're looking for? Contact our support team.
        </p>
        
        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={expandAll}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-[1.02] ${
              hoveredItem === item.id ? 'shadow-2xl' : ''
            }`}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            {/* Question Header */}
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openItems.has(item.id) 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                }`}>
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {item.question}
                </h3>
              </div>
              
              <div className={`transition-all duration-300 ${
                openItems.has(item.id) ? 'rotate-180' : 'rotate-0'
              }`}>
                {openItems.has(item.id) ? (
                  <Minus className="w-6 h-6 text-blue-600" />
                ) : (
                  <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
                )}
              </div>
            </button>

            {/* Answer Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openItems.has(item.id) 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6">
                <div className="pl-12">
                  <div className="w-full h-px bg-gradient-to-r from-blue-200 to-purple-200 mb-4"></div>
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-16 text-center p-8 bg-white rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-6">
          Our customer support team is here to help you 24/7
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Contact Support
          </button>
          <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
            Live Chat
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}