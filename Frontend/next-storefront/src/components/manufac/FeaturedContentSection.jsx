"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const FeaturedContentSection = () => {
  const founderData = {
    title: "The Founder",
    paragraphs: [
      "Established in 1970, Safina Carpets has its roots in the Mughal era, where carpets adorned royal courts and symbolised luxury and refinement.",
      "Established in 1970, Safina Carpets has its roots in the Mughal era, where carpets adorned royal courts and symbolised luxury and refinement.",
    ],
    imageUrl: "https://c.animaapp.com/7kq845Cv/img/rectangle-33.png",
  };

  return (
    <section className="w-full py-5 my-8">
      <div className="container mx-auto">
        <Card className="border-0 shadow-lg rounded-lg overflow-hidden" style={{ backgroundColor: '#FFF5F5' }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Text content - appears first on mobile */}
              <div className="md:w-1/2 lg:w-3/5 order-1 md:order-2">
                <h2 className="font-['Playfair_Display'] text-4xl text-m-3refprimaryprimary-30 mb-6">
                  {founderData.title}
                </h2>

                <div className="space-y-6">
                  {founderData.paragraphs.map((paragraph, index) => (
                    <p
                      key={`paragraph-${index}`}
                      className="font-['Jost'] text-base text-black leading-7"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Image - appears second on mobile */}
              <div className="md:w-1/2 lg:w-2/5 order-2 md:order-1">
                <div
                  className="w-full h-[325px] bg-cover bg-center rounded-md"
                  style={{ backgroundImage: `url(${founderData.imageUrl})` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturedContentSection;
