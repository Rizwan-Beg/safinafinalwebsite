"use client";
import React from "react";
import CommunityEngagementSection from "../../components/manufac/CommunityEngagementSection";
import CraftsmanshipSection from "../../components/manufac/CraftsmanshipSection";
import FeaturedContentSection from "../../components/manufac/FeaturedContentSection";
import FounderProfilesSection from "../../components/manufac/FounderProfilesSection";
import GroupWrapperSubsection from "../../components/manufac/GroupWrapperSubsection";
import ImageGallerySection from "../../components/manufac/ImageGallerySection";
import ProcessTimelineSection from "../../components/manufac/ProcessTimelineSection";
import StoryHighlightSection from "../../components/manufac/StoryHighlightSection";
import { useEffect } from 'react';
import TestimonialsSection from "../../components/manufac/TestimonialsSection";

const Manufacturing = () => {
  const timelineArrows = [
    { top: "top-[1452px]", left: "left-[712px]" },
    { top: "top-[1874px]", left: "left-[708px]" },
    { top: "top-[2292px]", left: "left-[708px]" },
    { top: "top-[2710px]", left: "left-[708px]" },
    { top: "top-[3128px]", left: "left-[708px]" },
    { top: "top-[3546px]", left: "left-[708px]" },
    { top: "top-[3964px]", left: "left-[708px]" },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white flex flex-col items-center w-full" data-model-id="60335:11166">
      <div className="bg-white w-full relative">
        {/* Header Section */}
        {/* <HeaderSection /> */}

        {/* Hero Section */}
        <section className="w-full bg-[url(https://c.animaapp.com/7kq845Cv/img/rectangle-25.svg)] bg-cover bg-center py-16 relative">
          <div className="container mx-auto px-4">
            <div className="mt-64">
              {/* <p className="text-white text-xs font-normal mb-2">
                Welcome to Safina Carpets, a name synonymous with timeless
                artistry and Mughal heritage.
              </p> */}
              <p className="text-white text-xs font-normal">
                As manufacturers and wholesalers of premium handmade carpets, we
                bring the beauty of centuries-old craftsmanship to the modern
                world.
              </p>
            </div>
          </div>
        </section>

        {/* Process Involve Section */}
        <section className="w-full bg-m-3refprimaryprimary-95 py-4">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-[#860a0c] text-4xl font-normal font-['Playfair_Display',Helvetica] mb-4">
              PROCESS INVOLVE
            </h2>
            <div className="relative">
              <img
                className="w-full max-w-5xl mx-auto py-8"
                alt="Lineofmughals"
                src="https://c.animaapp.com/7kq845Cv/img/lineofmughals.svg"
              />
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        <ProcessTimelineSection />
        <FounderProfilesSection />
        <FeaturedContentSection />
        <ImageGallerySection />
        <CraftsmanshipSection />
        <StoryHighlightSection />
        <CommunityEngagementSection />
        <GroupWrapperSubsection />
        {/* <TestimonialsSection /> */}

        {/* Timeline Arrows */}
        {/* {timelineArrows.map((arrow, index) => (
          <div
            key={`arrow-${index}`}
            className={`absolute w-4 h-12 ${arrow.top} ${arrow.left}`}
          >
            <div className="relative w-3.5 h-12 left-px">
              <div className="w-2 h-10 top-0 left-[3px] absolute bg-m-3refprimaryprimary-30" />
              <img
                className="absolute w-3.5 h-2 top-10 left-0"
                alt="Polygon"
                src="https://c.animaapp.com/7kq845Cv/img/polygon-1-6.svg"
              />
            </div>
          </div>
        ))} */}

        {/* Footer Section */}
        {/* <FooterSection /> */}
      </div>
    </main>
  );
};

export default Manufacturing;
