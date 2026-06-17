"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const ImageWrapperSection = () => {
  const blogPosts = [
    {
      id: 1,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57-3.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
    {
      id: 2,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57-4.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
    {
      id: 3,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57-5.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-6 py-12 w-full max-w-[1297px] mx-auto">
      {blogPosts.map((post) => (
        <Card key={post.id} className="w-full max-w-[422px] border-none">
          <CardContent className="p-0">
            <div className="relative">
              <img
                className="w-full h-[228px] object-cover"
                alt="Silk rug care"
                src={post.image}
              />

              <h3 className="mt-[14px] mx-[19px] [font-family:'Playfair_Display',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[44px]">
                {post.title}
              </h3>

              <p className="mt-[23px] mx-[25px] [font-family:'Playfair_Display',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[25px]">
                {post.excerpt}
              </p>

              <a
                href="#"
                className="block mt-[13px] mx-[27px] [font-family:'Playfair_Display',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[25px] whitespace-nowrap hover:underline"
              >
                Read more →
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default ImageWrapperSection;
