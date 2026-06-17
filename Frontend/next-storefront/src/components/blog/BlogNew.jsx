"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, User, ChevronRight, Search, Filter } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BlogHero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power4.out', delay: 0.5 }
      );

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[90svh] w-full overflow-hidden flex items-center justify-center bg-black">
      <div ref={bgRef} className="absolute inset-0 w-full h-[115%] -top-[10%] opacity-70">
        <img
          src="https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=2000&auto=format&fit=crop"
          alt="Safina Journal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl" ref={titleRef}>
        <span className="font-body text-white/60 text-[10px] md:text-xs uppercase tracking-[0.8em] block mb-8">Established 1970 — The Journal</span>
        <h1 className="font-display text-white text-7xl md:text-[10rem] tracking-tight leading-[0.85] mb-12">
          Threads of <br /> <span className="italic font-light">Heritage</span>
        </h1>
        <div className="flex flex-col items-center gap-8">
          <div className="w-px h-24 bg-gradient-to-b from-white/50 to-transparent" />
          <p className="font-body text-white/70 text-sm md:text-lg max-w-xl mx-auto leading-relaxed tracking-wide">
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
      gsap.fromTo(postRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: postRef.current,
            start: 'top 80%',
          }
        }
      );
    }, postRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={postRef} className="relative py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
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
            <span className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-6 py-2 rounded-full font-body text-[10px] uppercase tracking-widest">
              Editor's Choice
            </span>
          </div>
        </div>
        <div className="lg:col-span-5 space-y-8 lg:pl-12">
          <div className="space-y-4">
            <span className="text-shibumi-maroon font-body text-xs uppercase tracking-widest">{post.category}</span>
            <h2 className="font-display text-4xl md:text-6xl text-shibumi-black leading-tight">
              {post.title}
            </h2>
          </div>
          <p className="font-body text-shibumi-dark-gray/70 text-lg leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-shibumi-dark-gray/50 font-body text-xs uppercase tracking-widest">
            <span>By {post.author}</span>
            <span className="w-1 h-1 bg-shibumi-maroon rounded-full" />
            <span>{post.date}</span>
          </div>
          <Link href={`/blogs/${post.id}`} className="inline-flex items-center gap-4 group">
            <span className="font-body text-xs uppercase tracking-[0.3em] text-shibumi-black border-b border-shibumi-black/20 pb-1 group-hover:border-shibumi-maroon transition-colors">Read Full Story</span>
            <div className="w-10 h-10 rounded-full border border-shibumi-black/10 flex items-center justify-center group-hover:bg-shibumi-black group-hover:text-white transition-all">
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ post, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] mb-8 bg-shibumi-light-gray">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shibumi-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
           <p className="text-white text-xs font-body uppercase tracking-widest line-clamp-2">{post.excerpt}</p>
        </div>
      </div>
      
      <div className="space-y-4 mt-auto">
        <div className="flex items-center justify-between text-shibumi-dark-gray/40 font-body text-[10px] uppercase tracking-widest">
          <span className="text-shibumi-maroon font-medium">{post.category}</span>
          <span>{post.date}</span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-shibumi-black leading-[1.2] group-hover:text-shibumi-maroon transition-colors duration-300">
          {post.title}
        </h3>
        <Link href={`/blogs/${post.id}`} className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-shibumi-black/50 group-hover:text-shibumi-maroon transition-colors">
          View Detail <ChevronRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
};

const BlogNew = () => {
  const posts = [
    {
      id: 1,
      title: "The Renaissance of Mughal Art in Modern Homes",
      excerpt: "Discover how centuries-old weaving techniques are finding a new life in contemporary minimalist interiors. We explore the bridge between ancient Persia and modern New York.",
      category: "Heritage",
      date: "May 15, 2026",
      author: "Rizwan Beg",
      image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Sustainable Silk: The Future of Luxury Rugs",
      excerpt: "Exploring the eco-conscious journey of our silk collection, from ethical harvesting to natural dyes. Luxury that doesn't cost the Earth.",
      category: "Sustainability",
      date: "May 10, 2026",
      author: "Safina Design Team",
      image: "https://images.unsplash.com/photo-1575313021311-bd3079410b6e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Mastering the Palette: Colors of the Silk Road",
      excerpt: "A deep dive into the symbolic meanings behind the vibrant colors used in our signature collections. From Indigo blues to Terracotta reds.",
      category: "Design",
      date: "May 05, 2026",
      author: "Master Weaver",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "The Architecture of a Knot",
      excerpt: "Understanding the technical precision required to create a carpet that lasts for generations. It's more than weaving; it's engineering.",
      category: "Craft",
      date: "April 28, 2026",
      author: "Elena Rossi",
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Minimalism and the Statement Rug",
      excerpt: "How a single piece of textile can define an entire room's identity. Less is more when the 'more' is a Safina masterpiece.",
      category: "Interior",
      date: "April 20, 2026",
      author: "Julian Thorne",
      image: "https://images.unsplash.com/photo-1579656335362-9c1dc11a505f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Preserving the Nomadic Traditions",
      excerpt: "A journey into the high-altitude villages where the wool is gathered and the stories are born. Protecting a dying art form.",
      category: "Heritage",
      date: "April 12, 2026",
      author: "Safina Archive",
      image: "https://images.unsplash.com/photo-1518191775389-fe19275d3ad4?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <main className="bg-shibumi-white min-h-screen pb-32">
      <BlogHero />
      
      {/* Editorial Filter Section */}
      <div className="sticky top-20 z-40 bg-shibumi-white/80 backdrop-blur-xl border-y border-shibumi-black/5 mb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-12">
            <span className="font-body text-[10px] uppercase tracking-widest text-shibumi-black/40">Filter By</span>
            <div className="flex gap-8">
              {['All', 'Heritage', 'Design', 'Sustainability', 'Craft'].map((cat) => (
                <button key={cat} className="font-body text-[10px] uppercase tracking-widest text-shibumi-black hover:text-shibumi-maroon transition-colors relative group">
                  {cat}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-shibumi-maroon transition-all group-hover:w-full" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 border-l border-shibumi-black/10 pl-8">
            <Search size={14} className="text-shibumi-black/30" />
            <input 
              type="text" 
              placeholder="SEARCH STORIES..." 
              className="bg-transparent border-none outline-none font-body text-[10px] uppercase tracking-widest w-40 placeholder:text-shibumi-black/20"
            />
          </div>
        </div>
      </div>

      <FeaturedPost post={posts[0]} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {posts.slice(1).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Newsletter / CTA */}
        <section className="mt-48 py-32 border-t border-shibumi-black/5 text-center">
          <div className="max-w-2xl mx-auto space-y-12">
            <span className="font-body text-shibumi-maroon text-[10px] uppercase tracking-[0.5em]">The Safina Letter</span>
            <h2 className="font-display text-5xl md:text-7xl text-shibumi-black leading-tight">Join our global <br /> <span className="italic">community</span></h2>
            <p className="font-body text-shibumi-dark-gray/60 text-lg leading-relaxed">
              Curated stories on art, design, and craftsmanship, delivered monthly to your inbox.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="flex-grow bg-shibumi-light-gray px-8 py-5 rounded-full font-body text-[10px] uppercase tracking-widest outline-none focus:ring-1 ring-shibumi-maroon/20"
              />
              <button className="bg-shibumi-black text-white px-10 py-5 rounded-full font-body text-[10px] uppercase tracking-[0.3em] hover:bg-shibumi-maroon transition-all duration-500">
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
