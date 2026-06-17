"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57-9.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
    {
      id: 2,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57-10.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
    {
      id: 3,
      image: "https://c.animaapp.com/WfQJY56L/img/rectangle-57-11.svg",
      title: "How To Care For Your Silk Rug – Quick Tips",
      excerpt:
        "Silk has always been the hallmark of luxury. Hailing right from the Persian royalty, silk rugs have a significant hold over history. Today, these ...",
    },
  ];

  return (
    <section className="w-full max-w-[1288px] mx-auto py-10 px-2.5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="border-none">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  className="w-full h-[228px] object-cover"
                  alt="Silk rug"
                  src={post.image}
                />
                <div className="p-5 flex flex-col gap-4">
                  <h3 className="text-2xl font-normal text-black [font-family:'Playfair_Display',Helvetica] leading-[44px]">
                    {post.title}
                  </h3>
                  <p className="text-[15px] font-normal text-black [font-family:'Playfair_Display',Helvetica] leading-[25px]">
                    {post.excerpt}
                  </p>
                  <a
                    href="#"
                    className="text-[15px] font-normal text-black [font-family:'Playfair_Display',Helvetica] leading-[25px] hover:underline"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
