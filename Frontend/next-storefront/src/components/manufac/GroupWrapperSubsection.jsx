"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const GroupWrapperSubsection = () => {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto">
        <Card className="border-0 shadow-lg rounded-lg overflow-hidden" style={{ backgroundColor: '#FFF5F5' }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Text content - appears first on mobile */}
              <div className="w-full md:w-1/2 order-1 md:order-1">
                <h2 className="text-4xl font-normal text-m-3refprimaryprimary-30 mb-8 font-['Playfair_Display',Helvetica] leading-[44px]">
                  The Founder
                </h2>
                <p className="text-base text-black font-['Jost',Helvetica] font-normal leading-7">
                  Established in 1970, Safina Carpets has its roots in the Mughal
                  era, where carpets adorned royal courts and symbolised luxury and
                  refinement.
                </p>
              </div>
              
              {/* Image - appears second on mobile */}
              <div className="w-full md:w-1/2 order-2 md:order-2">
                <div
                  className="w-full h-[325px] bg-cover bg-center rounded-md"
                  style={{
                    backgroundImage:
                      "url(https://c.animaapp.com/7kq845Cv/img/firefly-create-a-realistic-image-of-a-luxurious-mughal-inspired-.png)",
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

export default GroupWrapperSubsection;
