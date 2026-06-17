"use client";
import { useEffect, useRef, useState, useContext } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CartContext } from '../../context/CartContext';

const productsConfig = {
  tag: "Our Collection",
  heading: "Masterpieces for Your Home",
  description: "Explore our curated selection of authentic Persian and Oriental rugs. From the geometric boldness of Heriz to the floral elegance of Kashan, each piece represents the pinnacle of weaving artistry.",
  viewAllText: "View All Rugs",
  addToCartText: "Add to Cart",
  addedToCartText: "Added to Cart",
  categories: ["All", "Classic", "Tribal", "Silk", "Vintage"],
  products: [
    { id: 1, name: "Kashan Royal Medallion", price: 8500, category: "Classic", image: "/images/rug-kashan.jpg" },
    { id: 2, name: "Tabriz Garden of Paradise", price: 12000, category: "Silk", image: "/images/rug-tabriz.jpg" },
    { id: 3, name: "Heriz Imperial Medallion", price: 6800, category: "Tribal", image: "/images/rug-heriz.jpg" },
    { id: 4, name: "Nain Celestial Blue", price: 15000, category: "Silk", image: "/images/rug-nain.jpg" },
    { id: 5, name: "Gabbeh Earth Tales", price: 4200, category: "Tribal", image: "/images/rug-gabbeh.jpg" },
    { id: 6, name: "Isfahan Shah Abbas", price: 22000, category: "Classic", image: "/images/rug-isfahan.jpg" },
    { id: 7, name: "Kerman Rose Garden", price: 7800, category: "Classic", image: "/images/rug-kerman.jpg" },
    { id: 8, name: "Qum Silk Prayer", price: 18500, category: "Silk", image: "/images/rug-qum.jpg" },
    { id: 9, name: "Mashad Grand Medallion", price: 9500, category: "Vintage", image: "/images/rug-mashad.jpg" },
  ],
};

const Masterpieces = () => {
  const { addToCart } = useContext(CartContext);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedItems, setAddedItems] = useState([]);
  const [medusaProducts, setMedusaProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { fetchProducts } = await import('../../services/productService');
        const data = await fetchProducts('reg_01KRQKQ7G3BFCGV3NT7HT91ZJA');
        setMedusaProducts(data.slice(0, 9)); // Take top 9 for the grid
      } catch (err) {
        console.error("Masterpieces load failed", err);
      }
    };
    loadProducts();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? medusaProducts
    : medusaProducts.filter(p => p.category === activeCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== product.id));
    }, 2000);
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-[60px]">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block mb-4 text-sm tracking-[0.2em] text-[#8b6d4b] font-medium uppercase transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {productsConfig.tag}
          </span>
          <h2
            className={`font-serif text-4xl md:text-5xl text-black mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {productsConfig.heading}
          </h2>
          <p
            className={`max-w-2xl mx-auto text-[#696969] text-lg transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {productsConfig.description}
          </p>
        </div>

        {/* Category Filter */}
        {productsConfig.categories.length > 0 && (
          <div
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {productsConfig.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#8b6d4b] text-white'
                    : 'bg-[#fafafa] text-[#696969] hover:bg-[#f0f0f0]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <Link key={product.id} href={`/purchase/${product.id}`}>
              <motion.div
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                {/* Image Container */}
                <div className="relative h-[400px] overflow-hidden bg-[#fafafa] mb-6">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                {/* Quick Add Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 flex items-center gap-2 text-sm tracking-wide transition-all duration-300 ${
                    addedItems.includes(product.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-[#8b6d4b] text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                  }`}
                >
                  {addedItems.includes(product.id) ? (
                    <>
                      <Check size={16} />
                      {productsConfig.addedToCartText}
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      {productsConfig.addToCartText}
                    </>
                  )}
                </button>
              </div>

              <div className="p-6 text-center">
                <p className="text-[#8b6d4b] text-[10px] uppercase tracking-[0.2em] mb-2">
                  {product.category}
                </p>
                <h3 className="font-serif text-xl text-black mb-2 group-hover:text-[#8b6d4b] transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="flex flex-col items-center">
                  <p className="text-gray-500 font-medium">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[8px] uppercase tracking-tighter text-[#8b6d4b]/40">Incl. 5% GST</span>
                </div>
              </div>
            </motion.div>
          </Link>
          ))}
        </div>

        {/* View All Link */}
        {productsConfig.viewAllText && (
          <div
            className={`text-center mt-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1200ms' }}
          >
            <button className="px-12 py-4 border-2 border-[#8b6d4b] text-[#8b6d4b] font-light tracking-widest text-sm hover:bg-[#8b6d4b] hover:text-white transition-all duration-300">
              {productsConfig.viewAllText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Masterpieces;
