"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const ContentWrapperSection = () => {
  const blogPosts = [
    {
      id: 1,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57-6.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
    {
      id: 2,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57-7.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
    {
      id: 3,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57-8.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-6 py-16 w-full">
      {blogPosts.map((post) => (
        <Card key={post.id} className="w-full max-w-[422px] border-none">
          <CardContent className="p-0">
            <div className="relative">
              <img
                className="w-full h-[228px] object-cover"
                alt="Silk rug"
                src={post.image}
              />
              <div className="mt-[14px] px-[19px]">
                <h3 className="[font-family:'Playfair_Display',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[44px]">
                  {post.title}
                </h3>
              </div>
              <div className="mt-[23px] px-[25px]">
                <p className="[font-family:'Playfair_Display',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[25px]">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-[13px] px-[27px] pb-[16px]">
                <a
                  href="#"
                  className="[font-family:'Playfair_Display',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[25px] whitespace-nowrap hover:underline"
                >
                  Read more →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default ContentWrapperSection;
