"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const TestimonialsSection = () => {
  return (
    <section className="w-full py-12 bg-white">
      <Card className="max-w-5xl mx-auto border-none shadow-none">
        <CardContent className="flex flex-col items-center text-center px-4 sm:px-6 md:px-8">
          <h2 className="font-['Caveat',Helvetica] font-normal text-m-3refprimaryprimary-30 text-4xl mb-8">
            A Story Spanning Generations
          </h2>

          <p className="font-['Jost',Helvetica] font-normal text-black text-base leading-7 max-w-3xl">
            Established in 1970, Safina Carpets has its roots in the Mughal era,
            where carpets adorned royal courts and symbolised luxury and
            refinement.
            <br />
            Founded by my grandfather, Sayeed Beg, who handcrafted intricate
            carpets, the tradition grew through the efforts of my father, Sayeed
            Beg, and father, Shahid Beg.
            <br />
            Today, as the fourth generation, I, Rizwan Beg, continue this legacy
            by blending tradition with innovation and bringing it to a global
            audience.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default TestimonialsSection;
