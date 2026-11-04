"use client";
import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, ShoppingBag, X, SlidersHorizontal, Search, Maximize2, ChevronDown, Check } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { CurrencyContext } from "../../context/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Image from "next/image";
import { getTransformedThumbnailUrl } from "../../lib/cloudinary";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PRICE_BRACKETS = [
    { label: "Under ₹15,000", min: 0, max: 15000 },
    { label: "₹15,000 - ₹50,000", min: 15000, max: 50000 },
    { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
    { label: "Over ₹1,00,000", min: 100000, max: Infinity }
];

const FilterSection = ({ title, options, selectedValues = [], onChange }) => {
    const [expanded, setExpanded] = useState(false);
    
    if (!options || options.length === 0) return null;
    
    const displayOptions = expanded ? options : options.slice(0, 5);
    
    return (
        <div className="space-y-6">
            <h3 className="font-body text-[10px] uppercase tracking-[0.3em] text-shibumi-black/40 border-b border-shibumi-black/5 pb-4">{title}</h3>
            <div className="flex flex-col gap-3">
                {displayOptions.map(option => (
                    <label key={option.name} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedValues.includes(option.name) ? 'bg-shibumi-maroon border-shibumi-maroon' : 'border-shibumi-black/20 group-hover:border-shibumi-black'}`}>
                            {selectedValues.includes(option.name) && <Check size={12} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={selectedValues.includes(option.name)}
                            onChange={() => onChange(option.name)}
                        />
                        <span className={`font-body text-[10px] uppercase tracking-widest ${selectedValues.includes(option.name) ? 'text-shibumi-black font-semibold' : 'text-shibumi-black/60 group-hover:text-shibumi-black'}`}>
                            {option.name} <span className="text-shibumi-black/30">({option.count})</span>
                        </span>
                    </label>
                ))}
            </div>
            {options.length > 5 && (
                <button onClick={() => setExpanded(!expanded)} className="text-shibumi-maroon font-body text-[10px] uppercase tracking-widest hover:underline text-left mt-2 block transition-all">
                    {expanded ? 'Show Less' : 'Load More'}
                </button>
            )}
        </div>
    );
};

const ProductCard = ({ product, handleWishlistToggle, addToCart, isItemInWishlist }) => {
    const { getPrice } = useContext(CurrencyContext); 
    const { price, symbol } = getPrice(product); 
    const cardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 95%',
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
            className="group relative flex flex-col bg-white overflow-hidden border border-transparent hover:border-shibumi-maroon/20 transition-all duration-500"
        >
            <div className="absolute top-6 right-6 z-10 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                <button 
                    onClick={() => handleWishlistToggle(product)} 
                    className="bg-white/90 backdrop-blur-md p-3 rounded-sm shadow-sm hover:bg-shibumi-maroon hover:text-white transition-colors"
                >
                    <Heart size={18} className={isItemInWishlist(product._id) ? 'fill-current' : ''} />
                </button>
            </div>
            
            <Link href={`/purchase/${product._id}`} className="block relative aspect-[3/4] overflow-hidden bg-shibumi-light-gray">
                <Image
                    src={getTransformedThumbnailUrl(product.imageUrl)}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    priority={false}
                />
                <div className="absolute inset-0 bg-shibumi-black/0 group-hover:bg-shibumi-black/20 transition-all duration-500" />
                
                <div className="absolute inset-x-8 bottom-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button 
                        onClick={(e) => { e.preventDefault(); addToCart(product); }}
                        className="w-full bg-white text-shibumi-black py-4 rounded-sm font-body text-[10px] uppercase tracking-widest hover:bg-shibumi-maroon hover:text-white transition-colors flex items-center justify-center gap-2 border border-shibumi-black/10"
                    >
                        <ShoppingBag size={14} /> Add to Collection
                    </button>
                </div>
            </Link>
            
            <div className="p-8 flex flex-col flex-grow space-y-3">
                <div className="flex items-center justify-between">
                    <span className="font-body text-[10px] uppercase tracking-[0.2em] text-shibumi-maroon">{product.category}</span>
                    <div className="flex flex-col items-end">
                        <p className="font-body text-sm font-medium text-shibumi-black">
                            {symbol}{price.toLocaleString('en-IN')}
                        </p>
                        <span className="text-[8px] uppercase tracking-tighter text-shibumi-maroon/40">Incl. 5% GST</span>
                    </div>
                </div>
                <h3 className="font-display text-2xl text-shibumi-black leading-tight group-hover:text-shibumi-maroon transition-colors">
                    <Link href={`/purchase/${product._id}`}>{product.name}</Link>
                </h3>
                <div className="flex items-center text-[10px] uppercase tracking-widest text-shibumi-dark-gray/40">
                    <span>{product.size}</span>
                    <span className="mx-3 w-1 h-1 bg-shibumi-maroon/20 rounded-full"></span>
                    <span>{product.metadata?.material || product.material}</span>
                </div>
            </div>
        </motion.div>
    );
};

const CatalogNew = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState("default");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [availableFilters, setAvailableFilters] = useState({
        size: [], color: [], price: [], shape: [], pattern: [], material: [], category: []
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const { addToCart } = useContext(CartContext);
    const { addToWishlist, removeFromWishlist, isItemInWishlist } = useContext(WishlistContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const { fetchProducts } = await import('../../services/productService');
                const data = await fetchProducts('reg_01KRQKQ7G3BFCGV3NT7HT91ZJA');
                setAllProducts(data);
                
                const counts = { category: {}, material: {}, color: {}, size: {}, shape: {}, pattern: {}, price: {} };

                data.forEach(p => {
                    try {
                        if (p?.category) counts.category[p.category] = (counts.category[p.category] || 0) + 1;
                        
                        const mat = p?.metadata?.material || p?.material;
                        if (mat) counts.material[mat] = (counts.material[mat] || 0) + 1;
                        
                        if (p?.size) counts.size[p.size] = (counts.size[p.size] || 0) + 1;
                        
                        const shape = p?.metadata?.shape;
                        if (shape && typeof shape === 'string') counts.shape[shape] = (counts.shape[shape] || 0) + 1;
                        
                        const pattern = p?.metadata?.pattern;
                        if (pattern && typeof pattern === 'string') counts.pattern[pattern] = (counts.pattern[pattern] || 0) + 1;
                        
                        let colorsRaw = p?.metadata?.colors || p?.metadata?.color || p?.color;
                        let colorsArray = [];
                        if (Array.isArray(colorsRaw)) {
                            colorsArray = colorsRaw;
                        } else if (typeof colorsRaw === 'string') {
                            colorsArray = colorsRaw.split(/[,/]+/).map(s => s.trim());
                        }
                        
                        colorsArray.forEach(c => {
                            if (c) counts.color[c] = (counts.color[c] || 0) + 1;
                        });
                        
                        PRICE_BRACKETS.forEach(bracket => {
                            if (p?.price >= bracket.min && p?.price < bracket.max) {
                                counts.price[bracket.label] = (counts.price[bracket.label] || 0) + 1;
                            }
                        });
                    } catch (e) {
                        console.error("Error parsing product filters:", p, e);
                    }
                });

                const formatOptions = (countObj) => Object.entries(countObj).map(([name, count]) => ({ name, count })).sort((a,b) => b.count - a.count);

                setAvailableFilters({ 
                    size: formatOptions(counts.size), 
                    color: formatOptions(counts.color),
                    price: PRICE_BRACKETS.filter(b => counts.price[b.label]).map(b => ({ name: b.label, count: counts.price[b.label] })),
                    shape: formatOptions(counts.shape),
                    pattern: formatOptions(counts.pattern),
                    material: formatOptions(counts.material), 
                    category: formatOptions(counts.category)
                });
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllProducts();
    }, []);

    useEffect(() => {
        const urlFilters = {};
        let urlSortBy = 'default';
        
        if (searchParams) {
            for (let [key, value] of searchParams.entries()) {
                if (key === 'sort') urlSortBy = value;
                else urlFilters[key] = value.split(',').filter(Boolean);
            }
        }
        
        setFilters(urlFilters);
        setSortBy(urlSortBy);
    }, [searchParams]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...allProducts];
        Object.entries(filters).forEach(([key, values]) => {
            if (!values || values.length === 0) return;
            
            filtered = filtered.filter(product => {
                if (key === 'price') {
                    return values.some(val => {
                        const bracket = PRICE_BRACKETS.find(b => b.label === val);
                        return bracket && product.price >= bracket.min && product.price < bracket.max;
                    });
                }
                
                let productValues = [];
                if (key === 'color') {
                    let colorsRaw = product?.metadata?.colors || product?.metadata?.color || product?.color;
                    if (Array.isArray(colorsRaw)) {
                        productValues = colorsRaw;
                    } else if (typeof colorsRaw === 'string') {
                        productValues = colorsRaw.split(/[,/]+/).map(s => s.trim());
                    }
                } else if (['shape', 'pattern', 'material'].includes(key)) {
                     productValues = [product?.metadata?.[key] || product?.[key]];
                } else {
                     productValues = [product?.[key]];
                }
                
                return values.some(v => productValues.some(pv => pv?.toString().toLowerCase() === v.toLowerCase()));
            });
        });
        
        if (sortBy === 'newest') filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        else if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
        else if (sortBy === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortBy === 'discounted') {
            filtered = filtered.filter(p => {
                if (p.variants && p.variants[0]) {
                    const variant = p.variants[0];
                    return variant.original_price && variant.calculated_price && variant.original_price > variant.calculated_price;
                }
                return false;
            });
        }
        
        return filtered;
    }, [allProducts, filters, sortBy]);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters };
        let current = newFilters[key] || [];
        if (current.includes(value)) {
            current = current.filter(v => v !== value);
        } else {
            current = [...current, value];
        }
        
        if (current.length > 0) newFilters[key] = current;
        else delete newFilters[key];
        
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([k, v]) => params.set(k, v.join(',')));
        if (sortBy !== 'default') params.set('sort', sortBy);
        
        router.push(`?${params.toString()}`);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([k, v]) => params.set(k, v.join(',')));
        if (value !== 'default') params.set('sort', value);
        router.push(`?${params.toString()}`);
    };

    const clearFilters = () => {
        setSortBy("default");
        router.push('/catalog');
    };

    const handleWishlistToggle = (product) => {
        if (!user) { alert("Please login to save your collection."); return; }
        isItemInWishlist(product._id) ? removeFromWishlist(product._id) : addToWishlist(product);
    };

    const FILTER_SECTIONS = [
        { title: "Size (Ft.)", key: "size" },
        { title: "Color", key: "color" },
        { title: "Price Range", key: "price" },
        { title: "Shape", key: "shape" },
        { title: "Pattern", key: "pattern" },
        { title: "Material", key: "material" },
        { title: "Construction", key: "category" }
    ];

    return (
        <main className="bg-shibumi-white min-h-screen pt-36 md:pt-44 pb-24 md:pb-32">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Atelier Catalog Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
                    <span className="font-body text-[10px] uppercase tracking-[0.4em] text-shibumi-maroon">
                        The Atelier Collection
                    </span>
                    <h1 className="font-display text-4xl md:text-6xl text-shibumi-black tracking-tight leading-tight">
                        Curated <span className="italic">Masterpieces</span>
                    </h1>
                    <p className="font-body text-xs md:text-sm text-shibumi-dark-gray/60 tracking-wider max-w-lg mx-auto leading-relaxed">
                        Hand-knotted with generational expertise, 100% natural organic dyes, and timeless Mughal artistry.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Desktop Sidebar (Narrower for wider grid) */}
                    <aside className="hidden lg:block w-56 space-y-12 sticky top-36 h-[calc(100vh-10rem)] pb-12 overflow-y-auto pr-4 custom-scrollbar">
                        <div className="flex justify-between items-center pb-4 border-b border-shibumi-black/10">
                            <h2 className="font-body text-[10px] uppercase tracking-[0.3em] font-semibold text-shibumi-black">Filter By</h2>
                            {Object.keys(filters).length > 0 && (
                                <button onClick={clearFilters} className="text-[10px] uppercase tracking-widest text-shibumi-maroon hover:underline">
                                    Clear All
                                </button>
                            )}
                        </div>
                        {FILTER_SECTIONS.map(({ title, key }) => (
                            <FilterSection 
                                key={key}
                                title={title}
                                options={availableFilters[key]}
                                selectedValues={filters[key]}
                                onChange={(val) => handleFilterChange(key, val)}
                            />
                        ))}
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-grow w-full">
                        <div className="flex justify-between items-center mb-8 border-b border-shibumi-black/10 pb-6">
                            <p className="font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/60">
                                Showing {filteredAndSortedProducts.length} Results
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="relative group hidden lg:block">
                                    <select 
                                        value={sortBy} 
                                        onChange={(e) => handleSortChange(e.target.value)}
                                        className="appearance-none bg-white border border-shibumi-black/20 px-8 py-3 rounded-none font-body text-[10px] uppercase tracking-widest outline-none focus:border-shibumi-maroon transition-colors cursor-pointer pr-12"
                                    >
                                        <option value="default">Sort: Default</option>
                                        <option value="newest">Newest First</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                        <option value="discounted">Discounted Items</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-shibumi-black/40" />
                                </div>
                                <button 
                                    onClick={() => setIsMobileFilterOpen(true)}
                                    className="lg:hidden flex items-center gap-3 px-6 py-3 border border-shibumi-black/10 rounded-none font-body text-[10px] uppercase tracking-widest hover:bg-shibumi-black hover:text-white transition-all"
                                >
                                    <SlidersHorizontal size={14} /> Filters
                                </button>
                            </div>
                        </div>
                        
                        {/* Active Filter Chips */}
                        {Object.keys(filters).length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {Object.entries(filters).flatMap(([key, values]) => 
                                    values.map(val => (
                                        <div key={`${key}-${val}`} className="flex items-center gap-2 bg-shibumi-light-gray px-4 py-2 rounded-full border border-shibumi-black/10">
                                            <span className="font-body text-[9px] uppercase tracking-widest">{val}</span>
                                            <button onClick={() => handleFilterChange(key, val)} className="text-shibumi-black/40 hover:text-shibumi-maroon"><X size={12} /></button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                {[1,2,3,4,5,6].map(n => (
                                    <div key={n} className="space-y-8 animate-pulse">
                                        <div className="aspect-[3/4] bg-shibumi-light-gray rounded-[2rem]" />
                                        <div className="h-4 bg-shibumi-light-gray w-1/4 rounded" />
                                        <div className="h-8 bg-shibumi-light-gray w-3/4 rounded" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <AnimatePresence mode="popLayout">
                                        {filteredAndSortedProducts.map((product) => (
                                            <ProductCard 
                                                key={product._id} 
                                                product={product} 
                                                handleWishlistToggle={handleWishlistToggle} 
                                                addToCart={addToCart} 
                                                isItemInWishlist={isItemInWishlist} 
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                {filteredAndSortedProducts.length === 0 && (
                                    <div className="py-48 text-center bg-shibumi-light-gray/20 rounded-[3rem] border border-dashed border-shibumi-black/10">
                                        <h3 className="font-display text-4xl text-shibumi-black mb-6">No matches found</h3>
                                        <p className="font-body text-shibumi-dark-gray/60 mb-10">Refine your search or clear filters to discover more.</p>
                                        <button onClick={clearFilters} className="px-10 py-4 bg-shibumi-black text-white rounded-none font-body text-[10px] uppercase tracking-widest hover:bg-shibumi-maroon transition-all">
                                            Clear All Filters
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Overlay */}
            <AnimatePresence>
                {isMobileFilterOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="fixed inset-0 bg-shibumi-black/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div 
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-[101] p-12 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-16">
                                <h2 className="font-display text-3xl text-shibumi-black">Filters</h2>
                                <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} /></button>
                            </div>
                            <div className="space-y-12">
                                {FILTER_SECTIONS.map(({ title, key }) => (
                                    <FilterSection 
                                        key={key}
                                        title={title}
                                        options={availableFilters[key]}
                                        selectedValues={filters[key]}
                                        onChange={(val) => handleFilterChange(key, val)}
                                    />
                                ))}
                                <button onClick={() => { clearFilters(); setIsMobileFilterOpen(false); }} className="w-full py-5 border border-shibumi-black/10 rounded-full font-body text-[10px] uppercase tracking-widest hover:bg-shibumi-black hover:text-white transition-all">
                                    Clear All
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
};

export default CatalogNew;
