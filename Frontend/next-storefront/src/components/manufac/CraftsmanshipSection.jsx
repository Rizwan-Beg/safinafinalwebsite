"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const CraftsmanshipSection = () => {
  const founderInfo = {
    title: "The Founder",
    paragraphs: [
      "Established in 1970, Safina Carpets has its roots in the Mughal era, where carpets adorned royal courts and symbolised luxury and refinement.",
      "Established in 1970, Safina Carpets has its roots in the Mughal era, where carpets adorned royal courts and symbolised luxury and refinement.",
    ],
    backgroundImage:
      "https://c.animaapp.com/7kq845Cv/img/firefly-carpets-and-rugs-at-home-premium-quality-handmade-craft--1.png",
  };

  return (
    <section className="w-full py-5">
      <div className="container mx-auto">
        <Card className="border-0 shadow-lg rounded-lg overflow-hidden" style={{ backgroundColor: '#FFF5F5' }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Text content - appears first on mobile */}
              <div className="flex flex-col flex-1 order-1 md:order-2">
                <h2 className="font-normal text-4xl text-m-3refprimaryprimary-30 mb-5 font-['Playfair_Display',Helvetica] leading-[44px]">
                  {founderInfo.title}
                </h2>

                <div className="space-y-6">
                  {founderInfo.paragraphs.map((paragraph, index) => (
                    <p
                      key={`paragraph-${index}`}
                      className="font-normal text-black text-base font-['Jost',Helvetica] leading-7"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Image - appears second on mobile */}
              <div
                className="w-full md:w-[550px] h-[325px] bg-cover bg-center order-2 md:order-1"
                style={{
                  backgroundImage: `url(${founderInfo.backgroundImage})`,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
