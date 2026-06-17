"use client";
import React from "react";
import  BlogSection  from "../../components/blog/BlogSection";
import  ContentWrapperSection  from "../../components/blog/ContentWrapperSection";
import  HeroImageSection  from "../../components/blog/HeroImageSection";
import  ImageWrapperSection  from "../../components/blog/ImageWrapperSection";
import { useEffect } from 'react';
 const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main
      className="bg-[#fff5f5] flex flex-col items-center w-full"
      data-model-id="60467:14657"
    >
      <div className="bg-m-3refprimaryprimary-99 overflow-hidden w-full max-w-[1414px] relative">
        <HeroImageSection />
        <ImageWrapperSection />
        <ContentWrapperSection />
        <BlogSection />
      </div>
    </main>
  );
};
export default Blogs;