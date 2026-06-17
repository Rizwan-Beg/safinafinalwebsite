"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ShopRoom() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Living room",
      description: "Lorem ipsum dolor sit amet consectetur. Vel vulputate gravida vulputate sapien volutpat et magna sed. Mattis massa diam condimentum in bibendum dolor dapibus. Scelerisque tempor purus felis ultricies neque quam mauris sem luctus. Auctor in morbi a viverra aliquam aliquet.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Bedroom",
      description: "Lorem ipsum dolor sit amet consectetur. Vel vulputate gravida vulputate sapien volutpat et magna sed. Mattis massa diam condimentum in bibendum dolor dapibus. Scelerisque tempor purus felis ultricies neque quam mauris sem luctus. Auctor in morbi a viverra aliquam aliquet.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Kitchen",
      description: "Lorem ipsum dolor sit amet consectetur. Vel vulputate gravida vulputate sapien volutpat et magna sed. Mattis massa diam condimentum in bibendum dolor dapibus. Scelerisque tempor purus felis ultricies neque quam mauris sem luctus. Auctor in morbi a viverra aliquam aliquet.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Main Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-light text-gray-900 tracking-wide">
          SHOP BY ROOM
        </h1>
      </div>

      <div className="flex items-center justify-between">
        {/* Left Arrow */}
        <button 
          onClick={prevSlide}
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-red-600 hover:text-red-700 transition-colors duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Content Container */}
        <div className="flex-1 flex items-center gap-12 px-8">
          {/* Text Content */}
          <div className="flex-1 max-w-md">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 max-w-2xl">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <img 
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={nextSlide}
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-red-600 hover:text-red-700 transition-colors duration-200"
          aria-label="Next slide"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide 
                ? 'bg-gray-800' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}