"use client";
import React from "react";
import { FeatureListSection } from "../../components/guide/FeatureListSection";
import { ImageGallerySection } from "../../components/guide/ImageGallerySection";
import { IntroductionSection } from "../../components/guide/IntroductionSection";
import { OverlayContentSection } from "../../components/guide/OverlayContentSection";
// import { FooterSection } from "../components/layout/FooterSection";
// import { HeaderSection } from "../components/layout/HeaderSection";

export const Guide = () => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1440px] h-[13764px] relative">
        
        <FeatureListSection />

        <div className="absolute w-[1440px] h-[11164px] top-[2671px] left-0 bg-m-3refprimaryprimary-99">
          <ImageGallerySection />
        </div>

         {/* <HeaderSection />  */}
        {/* <FooterSection /> */}

        <OverlayContentSection />

        <p className="absolute w-[973px] h-[194px] top-[14968px] left-[133px] font-['Playfair_Display'] font-semibold text-white text-base tracking-[0] leading-6">
          Proper storage of rugs is important to prolong their lifespan and
          prevent them from becoming damaged over time. Ideally, the rug should
          first be thoroughly cleaned and dried before being rolled up and left
          in a cool, dry, dark space. Climate-controlled spaces are preferable
          to prevent fluctuations in temperature and humidity that can damage
          rugs.
        </p>

        <div className="absolute w-[346px] h-[78px] top-[14885px] left-[132px] font-['Playfair_Display'] font-semibold text-white text-4xl tracking-[0] leading-6">
          Rug Storage
        </div>

        <p className="absolute w-[1075px] h-[67px] top-[16020px] left-[183px] font-['Playfair_Display'] font-semibold text-white text-base text-center tracking-[0] leading-6">
          Being familiar with the basics of rug care ensures that you will
          always be ready if a mishap occurs. Instead of panicking and maybe
          getting yourself in a more difficult position, you&apos;ll know how to
          solve the problem promptly and with ease.
        </p>

        <IntroductionSection />

        <div className="absolute h-6 top-[860px] left-[580px] font-['Jost'] font-normal text-black text-[40px] tracking-[0.50px] leading-6 whitespace-nowrap">
          Choosing a Rug
        </div>

      </div>
    </div>
  );
};
