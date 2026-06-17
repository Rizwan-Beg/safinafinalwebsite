"use client";
import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, ShoppingBag, X, SlidersHorizontal, Search, Maximize2, ChevronDown } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { CurrencyContext } from "../../context/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Image from "next/image";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
                    src={product.imageUrl}
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
                    <span>{product.material}</span>
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
        category: [], material: [], color: [], size: [],
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
                // Use India region for pricing context
                const data = await fetchProducts('reg_01KRQKQ7G3BFCGV3NT7HT91ZJA');
                setAllProducts(data);
                
                const categories = [...new Set(data.map(p => p.category).filter(Boolean))];
                const materials = [...new Set(data.map(p => p.material).filter(Boolean))];
                const colors = [...new Set(data.flatMap(p => p.color ? p.color.split(' / ') : []).filter(Boolean))];
                const sizes = [...new Set(data.map(p => p.size).filter(Boolean))];

                setAvailableFilters({ category: categories, material: materials, color: colors, size: sizes });
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
                else urlFilters[key] = value;
            }
        }
        
        setFilters(urlFilters);
        setSortBy(urlSortBy);
    }, [searchParams]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...allProducts];
        Object.entries(filters).forEach(([key, value]) => {
            filtered = filtered.filter(product => 
                product[key]?.toString().toLowerCase().includes(value.toLowerCase())
            );
        });
        
        if (sortBy === 'newest') filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        else if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
        else if (sortBy === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
        
        return filtered;
    }, [allProducts, filters, sortBy]);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters };
        if (value) newFilters[key] = value;
        else delete newFilters[key];
        
        const params = new URLSearchParams(newFilters);
        if (sortBy !== 'default') params.set('sort', sortBy);
        router.push(`?${params.toString()}`);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        const params = new URLSearchParams(filters);
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

    return (
        <main className="bg-shibumi-white min-h-screen pt-32 pb-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                


                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 space-y-12 sticky top-32 h-fit">
                        {Object.entries(availableFilters).map(([key, options]) => (
                            options.length > 0 && (
                                <div key={key} className="space-y-6">
                                    <h3 className="font-body text-[10px] uppercase tracking-[0.3em] text-shibumi-black/40 border-b border-shibumi-black/5 pb-4">{key}</h3>
                                    <div className="flex flex-col gap-3">
                                        {options.map(option => (
                                            <button 
                                                key={option} 
                                                onClick={() => handleFilterChange(key, filters[key] === option ? '' : option)}
                                                className={`text-left font-body text-[10px] uppercase tracking-widest transition-all hover:translate-x-1 ${filters[key] === option ? 'text-shibumi-maroon font-semibold' : 'text-shibumi-black/60 hover:text-shibumi-black'}`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                        <button onClick={clearFilters} className="text-shibumi-maroon font-body text-[10px] uppercase tracking-widest border-b border-shibumi-maroon/20 pb-1 hover:border-shibumi-maroon transition-all">
                            Reset All Filters
                        </button>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-grow">
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
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {[1,2,3,4].map(n => (
                                    <div key={n} className="space-y-8 animate-pulse">
                                        <div className="aspect-[3/4] bg-shibumi-light-gray rounded-[2rem]" />
                                        <div className="h-4 bg-shibumi-light-gray w-1/4 rounded" />
                                        <div className="h-8 bg-shibumi-light-gray w-3/4 rounded" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
                                {Object.entries(availableFilters).map(([key, options]) => (
                                    <div key={key} className="space-y-6">
                                        <h3 className="font-body text-[10px] uppercase tracking-[0.3em] text-shibumi-black/40">{key}</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {options.map(option => (
                                                <button 
                                                    key={option} 
                                                    onClick={() => handleFilterChange(key, filters[key] === option ? '' : option)}
                                                    className={`px-5 py-3 rounded-full border font-body text-[10px] uppercase tracking-widest transition-all ${filters[key] === option ? 'bg-shibumi-maroon border-shibumi-maroon text-white' : 'border-shibumi-black/10 text-shibumi-black hover:border-shibumi-black'}`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <button onClick={clearFilters} className="w-full py-5 border border-shibumi-black/10 rounded-full font-body text-[10px] uppercase tracking-widest hover:bg-shibumi-black hover:text-white transition-all">
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