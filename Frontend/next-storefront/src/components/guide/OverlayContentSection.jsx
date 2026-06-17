"use client";
import React from "react";

const roomCategories = [
  "Living Room",
  "Bedroom",
  "Dining room",
  "hallway",
  "Kitchen",
  "Office",
  "Outdoor",
];

export const OverlayContentSection = () => {
  return (
    <section className="absolute w-[1444px] h-[567px] top-[2104px] left-0">
      <div className="relative w-[1440px] h-[567px] bg-[url(https://c.animaapp.com/jwLiGKJa/img/rectangle-48.svg)] bg-cover bg-[50%_50%]">
        <div className="w-[1440px] h-[213px] top-[354px] bg-[linear-gradient(0deg,rgba(0,0,0,0.44)_0%,rgba(0,0,0,0.44)_19%,rgba(58,58,58,0.44)_45%,rgba(61,61,61,0.02)_100%)] absolute left-0" />

        <div className="w-[623px] h-[565px] top-0.5 bg-[linear-gradient(90deg,rgba(0,0,0,0.44)_0%,rgba(102,102,102,0.44)_42%,rgba(193,193,193,0.02)_95%)] absolute left-0" />

        <nav
          className="inline-flex h-9 items-center gap-7 absolute top-[489px] left-[76px]"
          role="navigation"
          aria-label="Room categories"
        >
          {roomCategories.map((room, index) => (
            <button
              key={index}
              className="w-40 mt-[-3.90px] mb-[-3.90px] flex items-center justify-center gap-2.5 p-2.5 relative rounded-[5px] border-2 border-solid border-white hover:bg-white hover:text-shibumi-maroon transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              type="button"
              aria-label={`View ${room} sizing guide`}
            >
              <span className="relative w-fit mt-[-2.00px] [font-family:'Montserrat',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6 whitespace-nowrap hover:text-shibumi-maroon">
                {room}
              </span>
            </button>
          ))}
        </nav>

        <p className="absolute w-[525px] h-[149px] top-44 left-[73px] [font-family:'Playfair_Display',Helvetica] font-semibold text-white text-base tracking-[0] leading-6">
          Selecting the right rug size is key to defining and enhancing your
          space. A rug that&apos;s too small or too large can alter the
          room&apos;s proportions and affect its overall vibe. We&#39;ve teamed
          up with top designers to break down the essential rug sizing
          guidelines, room-by-room.
        </p>

        <h1 className="absolute w-[426px] h-5 top-[126px] left-[73px] [font-family:'Montserrat',Helvetica] font-medium text-white text-[40px] text-center tracking-[0] leading-6 whitespace-nowrap">
          Room &amp; Sizing Guide
        </h1>
      </div>
    </section>
  );
};
