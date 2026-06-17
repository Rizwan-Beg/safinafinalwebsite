"use client";
import React from "react";

const guideItems = [
  { id: 1, title: "Guide for Rugs", targetId: "guide-for-rugs" },
  { id: 2, title: "Guide for Choosing", targetId: "guide-for-choosing" },
  { id: 3, title: "Room & Sizing Guide", targetId: "room-sizing-guide" },
  { id: 4, title: "Care & Instruction", targetId: "care-instruction" },
];

export const FeatureListSection = () => {
  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="absolute w-[1444px] h-[689px] top-[150px] left-0">
      <div className="relative w-[1440px] h-[689px] bg-[url(https://c.animaapp.com/jwLiGKJa/img/rectangle-47.svg)] bg-cover bg-[50%_50%]">
        <header className="absolute w-[494px] h-[261px] top-[66px] left-[15px]">
          <h1 className="absolute w-[352px] h-[110px] top-0 left-0 [font-family:'Montserrat',Helvetica] font-medium text-white text-[64px] text-center tracking-[0] leading-6">
            <span className="[font-family:'Montserrat',Helvetica] font-medium text-white text-[64px] tracking-[0] leading-6">
              Guides
            </span>
            <span className="text-5xl">&nbsp;</span>
          </h1>

          <p className="absolute w-[426px] h-[168px] top-[93px] left-[68px] [font-family:'Montserrat',Helvetica] font-medium text-white text-sm tracking-[0] leading-6">
            Selecting the right rug size is key to defining and enhancing your
            space. A rug that&apos;s too small or too large can alter the
            room&apos;s proportions and affect its overall vibe. We&#39;ve
            teamed up with top designers to break down the essential rug sizing
            guidelines, room-by-room.
          </p>
        </header>

        <nav
          className="flex flex-col w-[253px] items-start gap-[25px] absolute top-[345px] left-[85px]"
          role="navigation"
          aria-label="Guide categories"
        >
          {guideItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.targetId)}
              className="h-[39px] self-stretch w-full flex items-center justify-center gap-2.5 p-2.5 relative rounded-[5px] border-2 border-solid border-white text-white hover:bg-white hover:text-shibumi-maroon transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
              type="button"
              aria-label={`View ${item.title}`}
            >
              <span className="relative w-fit mt-[-4.50px] mb-[-0.50px] [font-family:'Montserrat',Helvetica] font-medium text-base text-center tracking-[0] leading-6 whitespace-nowrap hover:text-shibumi-maroon">
                {item.title}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};
