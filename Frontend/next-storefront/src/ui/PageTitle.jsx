import React from "react";

export const PageTitle = ({ title }) => {
  return (
    <div className="w-full text-center py-8 md:py-12">
      <h1 className="[font-family:'Playfair_Display',Helvetica] font-normal text-black text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-[1.2]">
        {title}
      </h1>
    </div>
  );
};
