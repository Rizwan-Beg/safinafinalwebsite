"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const HeroImageSection = () => {
  const blogPosts = [
    {
      id: 1,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
    {
      id: 2,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57-1.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
    {
      id: 3,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57-2.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-6 w-full py-12">
      {blogPosts.map((post) => (
        <Card key={post.id} className="w-full max-w-[422px] border-none">
          <CardContent className="p-0">
            <div className="relative">
              <img
                className="w-full h-[228px] object-cover"
                alt="Blog post featured image"
                src={post.image}
              />

              <div className="mt-[14px] mx-[19px] [font-family:'Playfair_Display',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[44px]">
                {post.title}
              </div>

              <div className="mt-[23px] mx-[25px] [font-family:'Playfair_Display',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[25px]">
                {post.excerpt}
              </div>

              <div className="mt-[13px] mx-[27px] [font-family:'Playfair_Display',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[25px] whitespace-nowrap cursor-pointer hover:underline">
                Read more →
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default HeroImageSection;
