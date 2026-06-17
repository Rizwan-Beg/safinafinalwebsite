"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const ProcessTimelineSection = () => {
  const founderInfo = {
    title: "The Founder",
    paragraphs: [
      "Established in 1970, Safina Carpets has its roots in the Mughal era, where carpets adorned royal courts and symbolised luxury and refinement.",
      "Established in 1970, Safina Carpets has its roots in the Mughal era, where carpets adorned royal courts and symbolised luxury and refinement.",
    ],
    image:
      "https://c.animaapp.com/7kq845Cv/img/sam-carter-ghoiyov2tsq-unsplash.png",
  };

  return (
    <section className="w-full py-5 px-4 md:px-16 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row gap-6">
              <div
                className="w-full md:w-[550px] h-[325px] bg-cover bg-center rounded-md"
                style={{ backgroundImage: `url(${founderInfo.image})` }}
                aria-label="Founder image"
              />

              <div className="flex flex-col">
                <h2 className="text-4xl font-normal text-m-3refprimaryprimary-30 font-['Playfair_Display',Helvetica] leading-[44px] mb-6">
                  {founderInfo.title}
                </h2>

                <div className="space-y-6">
                  {founderInfo.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base font-normal text-black font-['Jost',Helvetica] leading-7"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProcessTimelineSection;
