"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Search } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_POSTS = [
  {
    id: "post-1",
    slug: "mughal-art-in-modern-homes",
    title: "The Renaissance of Mughal Art in Modern Homes",
    excerpt: "Discover how centuries-old weaving techniques are finding a new life in contemporary minimalist interiors. We explore the bridge between ancient Persia and modern New York.",
    content: "For centuries, Mughal rug artisans in Northern India crafted intricate floral patterns...",
    category: "Heritage",
    author: "Rizwan Beg",
    date: "May 15, 2026",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop",
    isFeatured: true,
    isPublished: true
  },
  {
    id: "post-2",
    slug: "sustainable-silk-luxury-rugs",
    title: "Sustainable Silk: The Future of Luxury Rugs",
    excerpt: "Exploring the eco-conscious journey of our silk collection, from ethical harvesting to natural dyes. Luxury that doesn't cost the Earth.",
    content: "True luxury is born from respect—for the artisan, the craft, and the planet...",
    category: "Sustainability",
    author: "Safina Design Team",
    date: "May 10, 2026",
    image: "https://images.unsplash.com/photo-1575313021311-bd3079410b6e?q=80&w=1000&auto=format&fit=crop",
    isFeatured: false,
    isPublished: true
  },
  {
    id: "post-3",
    slug: "colors-of-the-silk-road",
    title: "Mastering the Palette: Colors of the Silk Road",
    excerpt: "A deep dive into the symbolic meanings behind the vibrant colors used in our signature collections. From Indigo blues to Terracotta reds.",
    content: "Every color woven into a Safina rug carries historical symbolism...",
    category: "Design",
    author: "Master Weaver",
    date: "May 05, 2026",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
    isFeatured: false,
    isPublished: true
  },
  {
    id: "post-4",
    slug: "architecture-of-a-knot",
    title: "The Architecture of a Knot",
    excerpt: "Understanding the technical precision required to create a carpet that lasts for generations. It's more than weaving; it's engineering.",
    content: "A high-density hand-knotted carpet contains up to 400 knots per square inch...",
    category: "Craft",
    author: "Elena Rossi",
    date: "April 28, 2026",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop",
    isFeatured: false,
    isPublished: true
  }
];

const BlogHero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current.children,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power4.out', delay: 0.3 }
        );
      }

      if (bgRef.current && containerRef.current) {
        gsap.to(bgRef.current, {
          y: '15%',
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-black">
      <div ref={bgRef} className="absolute inset-0 w-full h-[115%] -top-[10%] opacity-70">
        <img
          src="https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=2000&auto=format&fit=crop"
          alt="Safina Journal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl" ref={titleRef}>
        <span className="font-body text-white/60 text-[10px] md:text-xs uppercase tracking-[0.8em] block mb-6">Established 1985 — The Journal</span>
        <h1 className="font-serif text-white text-6xl md:text-[8rem] tracking-tight leading-[0.9] mb-10">
          Threads of <br /> <span className="italic font-light">Heritage</span>
        </h1>
        <div className="flex flex-col items-center gap-6">
          <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
          <p className="font-body text-white/80 text-sm md:text-lg max-w-xl mx-auto leading-relaxed tracking-wide font-light">
            An editorial exploration of craftsmanship, culture, and the art of the handmade.
          </p>
        </div>
      </div>
    </section>
  );
};

const FeaturedPost = ({ post }) => {
  const postRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (postRef.current) {
        gsap.fromTo(postRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: postRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }, postRef);
    return () => ctx.revert();
  }, [post]);

  if (!post) return null;

  return (
    <section ref={postRef} className="relative py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 relative group overflow-hidden rounded-[2rem]">
          <div className="aspect-[16/9] overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
          </div>
          <div className="absolute top-8 left-8">
            <span className="bg-black/40 backdrop-blur-xl text-white border border-white/20 px-6 py-2 rounded-full font-body text-[10px] uppercase tracking-widest">
              Editor's Choice
            </span>
          </div>
        </div>
        <div className="lg:col-span-5 space-y-8 lg:pl-8">
          <div className="space-y-4">
            <span className="text-[#860a0c] font-body text-xs uppercase tracking-widest font-semibold">{post.category}</span>
            <h2 className="font-serif text-3xl md:text-5xl text-gray-900 leading-tight">
              {post.title}
            </h2>
          </div>
          <p className="font-body text-gray-600 text-base md:text-lg leading-relaxed font-light">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-gray-400 font-body text-xs uppercase tracking-widest">
            <span>By {post.author}</span>
            <span className="w-1.5 h-1.5 bg-[#860a0c] rounded-full" />
            <span>{post.date}</span>
          </div>
          <Link href={`/blogs/${post.id}`} className="inline-flex items-center gap-4 group">
            <span className="font-body text-xs uppercase tracking-[0.3em] text-gray-900 border-b border-gray-300 pb-1 group-hover:border-[#860a0c] group-hover:text-[#860a0c] transition-colors">Read Full Story</span>
            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-[#860a0c] group-hover:text-white group-hover:border-[#860a0c] transition-all">
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ post }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, cardRef);
    return () => ctx.revert();
  }, [post]);

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden rounded-[2rem] mb-6 bg-gray-100">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
           <p className="text-white text-xs font-body uppercase tracking-widest line-clamp-2">{post.excerpt}</p>
        </div>
      </div>
      
      <div className="space-y-3 mt-auto">
        <div className="flex items-center justify-between text-gray-400 font-body text-[10px] uppercase tracking-widest">
          <span className="text-[#860a0c] font-medium">{post.category}</span>
          <span>{post.date}</span>
        </div>
        <h3 className="font-serif text-2xl text-gray-900 leading-[1.25] group-hover:text-[#860a0c] transition-colors duration-300">
          {post.title}
        </h3>
        <Link href={`/blogs/${post.id}`} className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-[#860a0c] transition-colors pt-1">
          Read Story <ChevronRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
};

const BlogNew = () => {
  const [posts, setPosts] = useState(DEFAULT_POSTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch blogs dynamically from Medusa Store API
  useEffect(() => {
    const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
    fetch(`${MEDUSA_URL}/store/blogs`, {
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.blogs && data.blogs.length > 0) {
          setPosts(data.blogs);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch dynamic blogs, using default stories", err);
      });
  }, []);

  // Filter posts based on selected category & search input
  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCategory === "All" || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery.trim() || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const featuredPost = filteredPosts.find((p) => p.isFeatured) || filteredPosts[0];
  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  const categories = ["All", "Heritage", "Design", "Sustainability", "Craft"];

  return (
    <main className="bg-white min-h-screen pb-32">
      <BlogHero />
      
      {/* Editorial Filter & Search Bar */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-y border-gray-100 mb-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-8 md:gap-12 flex-wrap">
            <span className="font-body text-[10px] uppercase tracking-widest text-gray-400 font-medium">Filter By</span>
            <div className="flex flex-wrap gap-4 md:gap-8">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-body text-xs uppercase tracking-widest transition-colors relative py-1 ${
                    selectedCategory === cat ? "text-[#860a0c] font-semibold" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {cat}
                  {selectedCategory === cat && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#860a0c]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-6 w-full md:w-auto">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH STORIES..." 
              className="bg-transparent border-none outline-none font-body text-xs uppercase tracking-widest w-48 placeholder:text-gray-400 text-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Featured Story */}
      {featuredPost && <FeaturedPost post={featuredPost} />}
      
      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm uppercase tracking-widest font-body">No stories match your filter or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {gridPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <section className="mt-40 py-24 border-t border-gray-100 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <span className="font-body text-[#860a0c] text-xs uppercase tracking-[0.4em] font-medium">The Safina Journal</span>
            <h2 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">Join our global <br /> <span className="italic font-light">community</span></h2>
            <p className="font-body text-gray-500 text-base md:text-lg leading-relaxed font-light">
              Curated stories on art, heritage, and luxury craftsmanship, delivered monthly.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="flex-grow bg-gray-50 border border-gray-200 px-6 py-4 rounded-full font-body text-xs uppercase tracking-widest outline-none focus:border-[#860a0c]"
              />
              <button className="bg-[#860a0c] text-white px-8 py-4 rounded-full font-body text-xs uppercase tracking-[0.2em] hover:bg-red-900 transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default BlogNew;
