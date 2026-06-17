"use client";
import React, { useEffect, useState, useContext, useMemo } from "react";
import Link from "next/link";
import { useRouter as useNavigate, usePathname as useLocation } from "next/navigation";;
import axios from "axios";
import { Heart, ShoppingBag, X, SlidersHorizontal } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { CurrencyContext } from "../../context/CurrencyContext"; // 1. Import CurrencyContext
import { motion, AnimatePresence } from "framer-motion";

// --- A refined, professional Product Card component ---
const ProductCard = ({ product, handleWishlistToggle, addToCart, isItemInWishlist }) => {
    // --- THIS IS THE FIX ---
    // 2. Use the CurrencyContext to get the getPrice function
    const { getPrice } = useContext(CurrencyContext); 
    // 3. Get the correct dynamic price and symbol
    const { price, symbol } = getPrice(product); 

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="group relative flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-xl"
        >
            <div className="absolute top-3 right-3 z-10">
                <button 
                    onClick={() => handleWishlistToggle(product)} 
                    className="bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                    aria-label="Add to wishlist"
                >
                    <Heart size={20} className={`transition-all ${isItemInWishlist(product._id) ? 'text-red-600 fill-red-600' : 'text-gray-700 hover:text-red-500'}`} />
                </button>
            </div>
            
            <Link  href={`/purchase/${product._id}`} className="block">
                <div className="aspect-square w-full overflow-hidden bg-gray-100">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/f8f8f8/333333?text=Image+Not+Found" }}
                    />
                </div>
            </Link>
            
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-base font-semibold text-gray-800 truncate">
                    <Link  href={`/purchase/${product._id}`} className="hover:text-[#5c0b0a] transition-colors">{product.name}</Link>
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span>{product.size}</span>
                    <span className="mx-2">|</span>
                    <span className="capitalize">{product.material}</span>
                </div>
                <div className="mt-auto pt-4 flex justify-between items-center">
                    {/* 4. Display the dynamic price and symbol */}
                    <p className="text-lg font-bold text-gray-900">
                        {symbol}{price.toLocaleString('en-IN')}
                    </p>
                    <button 
                        onClick={() => addToCart(product)} 
                        className="bg-gray-800 text-white p-2 rounded-lg shadow-md hover:bg-black transition-transform hover:scale-105"
                        aria-label="Add to cart"
                    >
                        <ShoppingBag size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// --- Main Catalog Component with Dynamic Filters ---
const Catalog = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState("default");
    
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    
    const [availableFilters, setAvailableFilters] = useState({
        category: [], material: [], color: [], size: [],
    });

    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const { addToWishlist, removeFromWishlist, isItemInWishlist } = useContext(WishlistContext);
    const { user } = useContext(AuthContext);

    // Effect 1: Fetch ALL products once to build dynamic filter options
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                // Import the Medusa service mapper dynamically to avoid top-level import issues
                const { fetchProducts } = await import('../../services/productService');
                const data = await fetchProducts();
                
                setAllProducts(data);
                
                const categories = [...new Set(data.map(p => p.category).filter(Boolean))];
                const materials = [...new Set(data.map(p => p.material).filter(Boolean))];
                const colors = [...new Set(data.flatMap(p => p.color ? p.color.split(' / ') : []).filter(Boolean))];
                const sizes = [...new Set(data.map(p => p.size).filter(Boolean))];

                setAvailableFilters({ category: categories, material: materials, color: colors, size: sizes });
            } catch (err) {
                console.error("Error fetching initial product data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllProducts();
    }, []);

    // Effect 2: Sync UI state with URL parameters whenever URL changes
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const urlFilters = {};
        for (let [key, value] of query.entries()) {
            if (key === 'sort') setSortBy(value);
            else urlFilters[key] = value;
        }
        setFilters(urlFilters);
        window.scrollTo(0, 0);
    }, [location.search]);


    // useMemo to apply filtering and sorting
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...allProducts];

        // Apply all filters from the URL
        Object.entries(filters).forEach(([key, value]) => {
            filtered = filtered.filter(product => 
                product[key]?.toString().toLowerCase().includes(value.toLowerCase())
            );
        });
        
        // Apply sorting
        if (sortBy === 'newest') filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        else if (sortBy === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - b.price);
        
        return filtered;
    }, [allProducts, filters, sortBy]);

    const updateUrl = (newFilters, newSort) => {
        const searchParams = new URLSearchParams(newFilters);
        if (newSort && newSort !== 'default') searchParams.set('sort', newSort);
        navigate(`?${searchParams.toString()}`, { replace: true });
    };
    
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters };
        if (value) newFilters[key] = value;
        else delete newFilters[key];
        updateUrl(newFilters, sortBy);
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSortBy(newSort);
        updateUrl(filters, newSort);
    };
    
    const clearFilters = () => {
        setSortBy("default");
        navigate('', { replace: true });
    };

    const handleWishlistToggle = (product) => {
        if (!user) { alert("You must be logged in to manage your wishlist."); return; }
        isItemInWishlist(product._id) ? removeFromWishlist(product._id) : addToWishlist(product);
    };
    
    const FilterSidebar = () => (
        <div className="space-y-8">
            {Object.entries(availableFilters).map(([key, options], index) => (
                options.length > 0 && (
                    <motion.div key={key} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }}>
                        <h3 className="font-semibold capitalize mb-3 text-gray-800 border-b pb-2">{key}</h3>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                            {options.map(option => (
                                <button key={option} onClick={() => handleFilterChange(key, filters[key] === option ? '' : option)} className={`block w-full text-left text-sm transition-colors rounded-md px-3 py-1.5 ${filters[key] === option ? 'bg-[#5c0b0a] text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )
            ))}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <button onClick={clearFilters} className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition text-sm">
                    <X className="h-4 w-4" /> Clear All Filters
                </button>
            </motion.div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen pt-28 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
               
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
                    <aside className="lg:sticky top-28 hidden lg:block bg-gray-50 p-6 rounded-lg border">
                        <FilterSidebar />
                    </aside>

                    <main className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-4 border-b pb-4">
                            <p className="text-sm text-gray-600 font-medium">Showing {filteredAndSortedProducts.length} results</p>
                            <div className="flex items-center gap-4">
                                <select onChange={handleSortChange} value={sortBy} className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#5c0b0a] outline-none transition bg-white">
                                    <option value="default">Sort by: Default</option>
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name-asc">Alphabetical (A-Z)</option>
                                </select>
                                <button className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-semibold" onClick={() => setIsMobileFilterOpen(true)}>
                                    <SlidersHorizontal className="h-4 w-4" /> Filters
                                </button>
                            </div>
                        </div>
                        {isLoading ? (
                             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {Array.from({ length: 9 }).map((_, i) => ( <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 animate-pulse"><div className="aspect-square bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded w-3/4"></div><div className="h-3 bg-gray-200 rounded w-1/2"></div></div> ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                <AnimatePresence>
                                    {filteredAndSortedProducts.length > 0 ? (
                                        filteredAndSortedProducts.map((product) => (
                                            <ProductCard key={product._id} product={product} handleWishlistToggle={handleWishlistToggle} addToCart={addToCart} isItemInWishlist={isItemInWishlist} />
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-24 flex flex-col justify-center items-center bg-gray-50 rounded-lg border">
                                            <h3 className="text-xl font-semibold text-gray-800">No Rugs Found</h3>
                                            <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
                                            <button onClick={clearFilters} className="mt-6 px-5 py-2 bg-[#5c0b0a] text-white rounded-md hover:bg-[#4a0908] transition">Clear Filters</button>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <AnimatePresence>
                {isMobileFilterOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setIsMobileFilterOpen(false)}>
                        <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="absolute top-0 left-0 h-full w-4/5 max-w-sm bg-gray-50 p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                           <FilterSidebar />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Catalog;

