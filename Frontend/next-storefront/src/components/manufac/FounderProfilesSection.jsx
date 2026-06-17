"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const FounderProfilesSection = () => {
  return (
    <section className="w-full py-6 my-6">
      <div className="container mx-auto">
        <Card className="border-none shadow-lg rounded-lg overflow-hidden" style={{ backgroundColor: '#FFF5F5' }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/2 flex flex-col justify-center">
                <h2 className="text-4xl mb-6 font-normal text-m-3refprimaryprimary-30 font-['Playfair_Display',Helvetica] leading-[44px]">
                  The Founder
                </h2>
                <p className="text-base text-black font-['Jost',Helvetica] font-normal leading-7">
                  Established in 1970, Safina Carpets has its roots in the
                  Mughal era, where carpets adorned royal courts and symbolised
                  luxury and refinement.
                </p>
              </div>
              <div className="md:w-1/2">
                <div
                  className="w-full h-[325px] bg-cover bg-center rounded-sm"
                  style={{
                    backgroundImage:
                      "url(https://c.animaapp.com/7kq845Cv/img/aman-chaturvedi-k84vkqsa3nq-unsplash.png)",
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

export default FounderProfilesSection;
