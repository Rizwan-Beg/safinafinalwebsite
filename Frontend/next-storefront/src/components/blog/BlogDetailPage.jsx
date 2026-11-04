"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2, ArrowUpRight, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const DEFAULT_ARTICLE = {
  id: "post-1",
  title: "The Renaissance of Mughal Art in Modern Homes",
  excerpt: "Discover how centuries-old weaving techniques are finding a new life in contemporary minimalist interiors. We explore the bridge between ancient Persia and modern New York.",
  content: "For centuries, Mughal rug artisans in Northern India crafted intricate floral patterns, silk knots, and rich jewel-toned dyes for royal palaces. Today, interior designers in London, Paris, and New York are discovering that these timeless woven masterpieces serve as anchor elements in contemporary minimalist spaces.\n\n### The Contrast of History and Modernity\n\nWhen placed against concrete walls, floor-to-ceiling glass, or Scandinavian oak flooring, a hand-knotted Mughal rug introduces warmth, texture, and emotional depth. The juxtaposition of architectural minimalism with complex hand-knotted artistry creates a harmonious balance.\n\n### Sustainable Heritage\n\nUnlike synthetic mass-produced floor coverings that end up in landfills after a few years, hand-knotted wool and silk rugs are heirloom investments designed to endure for generations. Each Safina carpet takes between 6 to 18 months of continuous handwork by skilled master weavers.",
  category: "Heritage",
  author: "Rizwan Beg",
  date: "May 15, 2026",
  image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1200&auto=format&fit=crop"
};

const BlogDetailPage = ({ id }) => {
  const [post, setPost] = useState(DEFAULT_ARTICLE);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
    const headers = {
      "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
    };

    fetch(`${MEDUSA_URL}/store/blogs?id=${id}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data?.blog) {
          setPost(data.blog);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to fetch article details", err);
        setLoading(false);
      });

    // Also fetch all posts for related stories
    fetch(`${MEDUSA_URL}/store/blogs`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data?.blogs) {
          setAllPosts(data.blogs);
        }
      })
      .catch(() => {});
  }, [id]);

  const relatedPosts = allPosts.filter((p) => p.id !== post?.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <article className="bg-white min-h-screen pt-32 pb-32">
      {/* Top Navigation */}
      <div className="max-w-4xl mx-auto px-6 mb-12 flex items-center justify-between">
        <Link 
          href="/blogs" 
          className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-gray-500 hover:text-[#860a0c] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <button 
          onClick={handleShare}
          className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-widest text-gray-500 hover:text-[#860a0c] transition-colors px-4 py-2 border border-gray-200 rounded-full hover:border-[#860a0c]"
        >
          <Share2 size={14} /> Share
        </button>
      </div>

      {/* Header Info */}
      <header className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <span className="inline-block bg-[#860a0c]/10 text-[#860a0c] font-body text-xs uppercase tracking-[0.3em] px-4 py-1.5 rounded-full font-medium">
          {post.category}
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl text-gray-900 leading-tight max-w-3xl mx-auto">
          {post.title}
        </h1>

        <p className="font-body text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-center gap-6 text-gray-400 font-body text-xs uppercase tracking-widest pt-4 border-b border-gray-100 pb-8">
          <span className="flex items-center gap-2 text-gray-700">
            <User size={14} className="text-[#860a0c]" /> {post.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Calendar size={14} /> {post.date}
          </span>
        </div>
      </header>

      {/* Hero Cover Image */}
      <div className="max-w-6xl mx-auto px-6 my-12">
        <div className="aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-xl">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Story Content Body */}
      <div className="max-w-3xl mx-auto px-6 font-body text-gray-800 text-base md:text-lg leading-relaxed space-y-8 font-light">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="font-serif text-2xl md:text-3xl text-gray-900 pt-6 font-normal">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          return (
            <p key={idx} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Author Footer Card */}
      <div className="max-w-3xl mx-auto px-6 mt-16 pt-12 border-t border-gray-200">
        <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#860a0c] font-semibold block mb-1">Written By</span>
            <h4 className="font-serif text-xl text-gray-900">{post.author}</h4>
            <p className="text-xs text-gray-500 font-light mt-1">Safina Carpets Master Editorial & Design Team</p>
          </div>
          <button 
            onClick={handleShare}
            className="p-3 bg-white border border-gray-200 rounded-full hover:border-[#860a0c] hover:text-[#860a0c] transition-colors"
            title="Share Article"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Related Stories */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 mt-32 border-t border-gray-100 pt-20">
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-serif text-3xl text-gray-900">Related Stories</h3>
            <Link href="/blogs" className="text-xs font-body uppercase tracking-[0.2em] text-[#860a0c] hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rel) => (
              <Link key={rel.id} href={`/blogs/${rel.id}`} className="group space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#860a0c] font-medium block">{rel.category}</span>
                <h4 className="font-serif text-xl text-gray-900 group-hover:text-[#860a0c] transition-colors line-clamp-2">{rel.title}</h4>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default BlogDetailPage;
