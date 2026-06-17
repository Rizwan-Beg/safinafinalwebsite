"use client";
import React, { useEffect, useRef, useState, useContext } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ShoppingBag, 
  Heart, 
  ChevronRight, 
  SlidersHorizontal,
  Search,
  Maximize2
} from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { CurrencyContext } from '../../context/CurrencyContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SAMPLE_RUGS = [
  {
    id: 'rug-1',
    name: "The Emperor's Silk",
    collection: "Heritage Collection",
    material: "100% Pure Mulberry Silk",
    price: 4500,
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop",
    category: "Hand-Knotted"
  },
  {
    id: 'rug-2',
    name: "Midnight over Isfahan",
    collection: "Celestial Series",
    material: "High-Altitude Wool & Zari",
    price: 3200,
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop",
    category: "Traditional"
  },
  {
    id: 'rug-3',
    name: "Golden Hour Mirage",
    collection: "Modern Minimalism",
    material: "Bamboo Silk & Viscose",
    price: 2800,
    image: "https://images.unsplash.com/photo-1579656335362-9c1dc11a505f?q=80&w=1000&auto=format&fit=crop",
    category: "Modern"
  },
  {
    id: 'rug-4',
    name: "Eternal Vine Ticker",
    collection: "Botanical Anthology",
    material: "Organic Cotton & Silk",
    price: 1950,
    image: "https://images.unsplash.com/photo-1575313021311-bd3079410b6e?q=80&w=1000&auto=format&fit=crop",
    category: "Heritage"
  },
  {
    id: 'rug-5',
    name: "Desert Nomad Shag",
    collection: "Rustic Roots",
    material: "Hand-Spun Afghan Wool",
    price: 2400,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
    category: "Hand-Tufted"
  },
  {
    id: 'rug-6',
    name: "The Velvet Monsoon",
    collection: "Signature Luxe",
    material: "Mercerized Cotton & Silk Blend",
    price: 5800,
    image: "https://images.unsplash.com/photo-1518191775389-fe19275d3ad4?q=80&w=1000&auto=format&fit=crop",
    category: "Limited Edition"
  }
];

const ShopHero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current.children, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power4.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[80svh] w-full flex items-center justify-center overflow-hidden bg-shibumi-black">
      <div className="absolute inset-0 opacity-60">
        <img 
          src="https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover scale-105"
          alt="Shop Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-shibumi-white" />
      </div>

      <div ref={textRef} className="relative z-10 text-center px-6">
        <span className="font-body text-white/60 text-xs uppercase tracking-[0.8em] block mb-8">Curated Collections</span>
        <h1 className="font-display text-white text-7xl md:text-[10rem] leading-[0.85] tracking-tight mb-12">
          The Curated <br /> <span className="italic font-light">Gallery</span>
        </h1>
        <p className="font-body text-white/70 text-sm md:text-lg max-w-xl mx-auto leading-relaxed tracking-wide">
          Explore our most exquisite handmade pieces, each a singular masterpiece of design and heritage.
        </p>
      </div>
    </section>
  );
};

const RugCard = ({ rug, index }) => {
  const { addToCart } = useContext(CartContext);
  const { getPrice } = useContext(CurrencyContext);
  const { price, symbol } = getPrice({ price: rug.price });
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
      className="group relative flex flex-col h-full"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-shibumi-light-gray mb-8">
        <img
          src={rug.image}
          alt={rug.name}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        
        {/* Hover Overlays */}
        <div className="absolute inset-0 bg-shibumi-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-6 right-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-shibumi-maroon hover:bg-shibumi-maroon hover:text-white transition-colors">
            <Heart size={18} />
          </button>
        </div>

        <div className="absolute inset-x-8 bottom-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-3">
          <button 
            onClick={() => addToCart({ ...rug, _id: rug.id, imageUrl: rug.image })}
            className="flex-grow bg-white text-shibumi-black py-4 rounded-full font-body text-[10px] uppercase tracking-widest hover:bg-shibumi-maroon hover:text-white transition-colors"
          >
            Add to Cart
          </button>
          <Link href={`/purchase/${rug.id}`} className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-shibumi-black transition-colors">
            <Maximize2 size={18} />
          </Link>
        </div>
      </div>

      <div className="space-y-3 px-2">
        <div className="flex items-center justify-between">
          <span className="font-body text-[10px] uppercase tracking-widest text-shibumi-maroon">{rug.collection}</span>
          <span className="font-body text-xs font-medium text-shibumi-black">{symbol}{price.toLocaleString()}</span>
        </div>
        <h3 className="font-display text-2xl text-shibumi-black leading-tight group-hover:text-shibumi-maroon transition-colors">
          {rug.name}
        </h3>
        <p className="font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/40">
          {rug.material} — {rug.category}
        </p>
      </div>
    </motion.div>
  );
};

const CategoryExplorer = () => {
  const scrollRef = useRef(null);

  const categories = [
    { name: "Living Room", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop", link: "/catalog?room=living-room" },
    { name: "Hand-Knotted", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop", link: "/catalog?construction=hand-knotted" },
    { name: "Pure Silk", image: "https://images.unsplash.com/photo-1575313021311-bd3079410b6e?q=80&w=1000&auto=format&fit=crop", link: "/catalog?material=silk" },
    { name: "Modern Art", image: "https://images.unsplash.com/photo-1579656335362-9c1dc11a505f?q=80&w=1000&auto=format&fit=crop", link: "/catalog?category=modern" },
  ];

  return (
    <section className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex items-end justify-between">
        <h2 className="font-display text-4xl md:text-6xl text-shibumi-black">
          Shop by <br /> <span className="italic">Perspective</span>
        </h2>
        <Link href="/catalog" className="font-body text-[10px] uppercase tracking-widest text-shibumi-maroon border-b border-shibumi-maroon/20 pb-1">
          Explore All
        </Link>
      </div>
      
      <div className="flex gap-8 overflow-x-auto no-scrollbar px-6 md:px-12 pb-12">
        {categories.map((cat, i) => (
          <Link 
            key={i} 
            href={cat.link}
            className="flex-shrink-0 w-[300px] md:w-[450px] group"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] mb-6">
              <img 
                src={cat.image} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt={cat.name} 
              />
              <div className="absolute inset-0 bg-shibumi-black/20 group-hover:bg-shibumi-black/10 transition-colors" />
            </div>
            <div className="flex items-center justify-between px-2">
              <h3 className="font-display text-2xl text-shibumi-black">{cat.name}</h3>
              <ArrowUpRight size={20} className="text-shibumi-maroon translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const ShopNew = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Hand-Knotted', 'Traditional', 'Modern', 'Heritage', 'Limited Edition'];

  const filteredRugs = activeCategory === 'All' 
    ? SAMPLE_RUGS 
    : SAMPLE_RUGS.filter(rug => rug.category === activeCategory);

  return (
    <main className="bg-shibumi-white min-h-screen pb-32">
      <ShopHero />
      <CategoryExplorer />

      {/* Premium Filter & Search Bar */}
      <div className="sticky top-20 z-40 bg-shibumi-white/80 backdrop-blur-xl border-y border-shibumi-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-12 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <span className="font-body text-[10px] uppercase tracking-widest text-shibumi-black/40 whitespace-nowrap">Filter By</span>
            <div className="flex gap-8">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`font-body text-[10px] uppercase tracking-widest transition-colors relative group whitespace-nowrap ${activeCategory === cat ? 'text-shibumi-maroon' : 'text-shibumi-black'}`}
                >
                  {cat}
                  <span className={`absolute -bottom-1 left-0 h-px bg-shibumi-maroon transition-all ${activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6 border-l border-shibumi-black/10 pl-8 ml-auto">
            <button className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-shibumi-black/60 hover:text-shibumi-black">
              <SlidersHorizontal size={14} /> Sort
            </button>
            <div className="flex items-center gap-3 bg-shibumi-light-gray/50 px-6 py-3 rounded-full border border-transparent focus-within:border-shibumi-maroon/20 transition-all">
              <Search size={14} className="text-shibumi-black/30" />
              <input 
                type="text" 
                placeholder="FIND A MASTERPIECE..." 
                className="bg-transparent border-none outline-none font-body text-[10px] uppercase tracking-widest w-40 placeholder:text-shibumi-black/20"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        {/* Collection Header */}
        <div className="mb-24">
          <h2 className="font-display text-4xl md:text-7xl text-shibumi-black leading-[1.1]">
            Curated <br /> <span className="italic">Selection</span>
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          <AnimatePresence mode='popLayout'>
            {filteredRugs.map((rug, index) => (
              <RugCard key={rug.id} rug={rug} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredRugs.length === 0 && (
          <div className="py-48 text-center border border-dashed border-shibumi-black/10 rounded-[3rem]">
            <h3 className="font-display text-4xl text-shibumi-black mb-4">No Masterpieces Found</h3>
            <p className="font-body text-shibumi-dark-gray/60">Try selecting a different category or refining your search.</p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="mt-8 font-body text-[10px] uppercase tracking-widest text-shibumi-maroon border-b border-shibumi-maroon/20 pb-1"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Custom Order CTA */}
        <section className="mt-48 relative h-[60vh] rounded-[3rem] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]"
            alt="Custom Order"
          />
          <div className="absolute inset-0 bg-shibumi-black/60 group-hover:bg-shibumi-black/40 transition-all duration-1000" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className="max-w-3xl space-y-12">
              <span className="font-body text-white/60 text-xs uppercase tracking-[0.8em] block">Bespoke Craftsmanship</span>
              <h2 className="font-display text-5xl md:text-8xl text-white leading-tight">Can&apos;t find the <br /> <span className="italic">perfect piece?</span></h2>
              <p className="font-body text-white/70 text-lg leading-relaxed max-w-xl mx-auto">
                Commission a custom rug tailored to your exact dimensions, colors, and design philosophy.
              </p>
              <Link href="/custom" className="inline-block px-12 py-6 bg-white text-shibumi-black rounded-full font-body text-[10px] uppercase tracking-[0.3em] hover:bg-shibumi-maroon hover:text-white transition-all duration-500 hover:-translate-y-1">
                Start Custom Design
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ShopNew;