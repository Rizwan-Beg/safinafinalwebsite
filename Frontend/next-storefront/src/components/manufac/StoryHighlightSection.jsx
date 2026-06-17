"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const StoryHighlightSection = () => {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto">
        <Card className="border-none shadow-lg rounded-lg overflow-hidden" style={{ backgroundColor: '#FFF5F5' }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/2 p-4 md:p-6">
                <h2 className="text-4xl mb-6 font-normal text-m-3refprimaryprimary-30 [font-family:'Playfair_Display',Helvetica] leading-[44px]">
                  The Founder
                </h2>
                <p className="text-base text-black [font-family:'Jost',Helvetica] font-normal leading-7">
                  Established in 1970, Safina Carpets has its roots in the
                  Mughal era, where carpets adorned royal courts and symbolised
                  luxury and refinement.
                </p>
              </div>
              <div className="md:w-1/2 h-[325px]">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(https://c.animaapp.com/7kq845Cv/img/firefly-carpets-and-rugs-at-home-premium-quality-handmade-craft-.png)",
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StoryHighlightSection;
