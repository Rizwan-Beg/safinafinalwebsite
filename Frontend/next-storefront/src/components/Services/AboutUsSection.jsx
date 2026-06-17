"use client";
import React from "react";

export const AboutUsSection = () => {
  return (
    <section className="w-full py-12 px-4">
      <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center justify-center py-12 px-6 md:px-8">
          <h2 className="font-serif text-red-600 text-4xl mb-10 text-center">
            A Story Spanning Generations
          </h2>

          <div className="text-center text-gray-700 text-lg leading-relaxed space-y-4">
            <p>
              Established in 1970, Safina Carpets has its roots in the Mughal era,
              where carpets adorned royal courts and symbolized luxury and
              refinement.
            </p>
            
            <p>
              Founded by my grandfather, Sayeed Beg, who handcrafted intricate
              carpets, the tradition grew through the efforts of my father, Sayeed
              Beg, and father, Shahid Beg.
            </p>
            
            <p>
              Today, as the fourth generation, I, Rizwan Beg, continue this legacy
              by blending tradition with innovation and bringing it to a global
              audience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};