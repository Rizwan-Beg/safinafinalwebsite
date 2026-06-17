"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      title: "The Art of Natural Dyeing",
      excerpt: "Discover how we use roots, minerals and flowers to create our signature colors.",
      image: "/images/blog-dyes.jpg",
      date: "May 12, 2024"
    },
    {
      title: "Caring for Your Heirloom Rug",
      excerpt: "A comprehensive guide to preserving the beauty of your hand-knotted carpet.",
      image: "/images/blog-care.jpg",
      date: "April 28, 2024"
    },
    {
      title: "Rugs in Modern Interior Design",
      excerpt: "How to anchor your space with traditional craftsmanship and contemporary style.",
      image: "/images/blog-interior.jpg",
      date: "April 15, 2024"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-shibumi-brown text-xs tracking-[0.3em] font-light uppercase">The Journal</span>
            <h2 className="font-serif text-4xl md:text-5xl text-shibumi-black">Heritage & Insight</h2>
          </div>
          <a href="/blogs" className="text-shibumi-black text-sm tracking-widest font-medium border-b border-shibumi-brown pb-1 hover:text-shibumi-brown transition-colors uppercase flex items-center gap-2">
            View All Stories <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              className="group cursor-pointer space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-shibumi-medium-gray font-medium">{post.date}</span>
                <h3 className="font-serif text-2xl text-shibumi-black group-hover:text-shibumi-brown transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-shibumi-medium-gray text-sm font-light leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
