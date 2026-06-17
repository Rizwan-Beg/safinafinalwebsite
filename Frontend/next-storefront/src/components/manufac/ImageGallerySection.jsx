"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const ImageGallerySection = () => {
  return (
    <section className="w-full py-6 my-6">
      <div className="container mx-auto">
        <Card className="overflow-hidden border-none shadow-lg rounded-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 p-6">
                <h2 className="font-['Playfair_Display',Helvetica] font-normal text-m-3refprimaryprimary-30 text-4xl mb-8">
                  The Founder
                </h2>
                <p className="font-['Jost',Helvetica] font-normal text-black text-base leading-7">
                  Established in 1970, Safina Carpets has its roots in the
                  Mughal era, where carpets adorned royal courts and symbolised
                  luxury and refinement.
                </p>
              </div>
              <div
                className="flex-1 min-h-[325px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://c.animaapp.com/7kq845Cv/img/naren-morum-6cd8xj4sibw-unsplash.png)",
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ImageGallerySection;
