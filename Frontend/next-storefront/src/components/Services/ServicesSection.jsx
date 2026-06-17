"use client";
import React from "react";

export const ServicesSection = () => {
  // Service data for mapping
  const services = [
    {
      id: 1,
      title: "Carpet Washing & Cleaning Services",
      description: "Professional carpet cleaning services using advanced techniques to restore your carpets to their original beauty. Our experienced team ensures deep cleaning while preserving the fabric quality.",
      imagePosition: "left",
      hasBorder: true,
    },
    {
      id: 2,
      title: "Carpet Repair & Restoration",
      description: "Expert repair and restoration services for damaged carpets. We specialize in fixing tears, holes, frayed edges, and restoring vintage carpets to their former glory.",
      imagePosition: "right",
      imageUrl: "https://c.animaapp.com/uQnJWZv3/img/aman-chaturvedi-k84vkqsa3nq-unsplash.png",
    },
    {
      id: 3,
      title: "Carpet Customization Services",
      description: "Create bespoke carpets tailored to your specific requirements. Choose from various designs, colors, sizes, and materials to match your interior perfectly.",
      imagePosition: "left",
      imageUrl: "https://c.animaapp.com/uQnJWZv3/img/rectangle-33.png",
    },
    {
      id: 4,
      title: "Carpet Trade & Exchange Services",
      description: "Trade-in your old carpets for new ones or exchange carpets that no longer suit your space. We offer fair valuations and flexible exchange options.",
      imagePosition: "right",
      imageUrl: "https://c.animaapp.com/uQnJWZv3/img/naren-morum-6cd8xj4sibw-unsplash.png",
    },
    {
      id: 5,
      title: "Expert Consultation Services",
      description: "Get professional advice on carpet selection, placement, and care. Our experts help you choose the perfect carpets for your home or office space.",
      imagePosition: "left",
      imageUrl: "https://c.animaapp.com/uQnJWZv3/img/firefly-carpets-and-rugs-at-home-premium-quality-handmade-craft-.png",
    },
    {
      id: 6,
      title: "Corporate & Event Services",
      description: "Special carpet solutions for corporate events, exhibitions, and commercial spaces. We provide rental and installation services for temporary and permanent setups.",
      imagePosition: "right",
      imageUrl: "https://c.animaapp.com/uQnJWZv3/img/firefly-carpets-and-rugs-at-home-premium-quality-handmade-craft--1.png",
    },
    {
      id: 7,
      title: "Carpet Protection Plans",
      description: "Comprehensive protection plans to maintain your carpet's condition. Includes regular cleaning, stain protection, and maintenance services.",
      imagePosition: "left",
      imageUrl: "https://c.animaapp.com/uQnJWZv3/img/parham-moieni-adoi9b6wzuo-unsplash.png",
    },
  ];

  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {services.map((service) => (
          <div key={service.id} className="flex flex-col lg:flex-row items-center gap-8">
            {service.imagePosition === "left" && (
              <div className="w-full lg:w-1/2">
                {service.hasBorder ? (
                  <div className="w-full h-80 bg-gray-100 rounded-2xl border-b-4 border-red-600" />
                ) : service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                ) : null}
              </div>
            )}

            <div className="w-full lg:w-1/2 space-y-4">
              <h2 className="text-3xl lg:text-4xl font-serif text-red-600 leading-tight">
                {service.title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>

            {service.imagePosition === "right" && (
              <div className="w-full lg:w-1/2">
                {service.imageUrl && (
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};