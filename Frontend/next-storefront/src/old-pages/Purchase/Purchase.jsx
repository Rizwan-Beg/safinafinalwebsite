"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";;
import axios from "axios";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Camera,
  AlertTriangle,
  ChevronDown,
  Award,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { CurrencyContext } from "../../context/CurrencyContext"; // 1. IMPORT THE NEW CONTEXT
import { motion, AnimatePresence } from "framer-motion";

// --- VISUALIZER MODAL REMOVED (Routed to Next.js page instead) ---

// --- ACCORDION ITEM (Restyled with smooth animation) ---
const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button
      className="flex justify-between items-center w-full py-5 text-left"
      onClick={onClick}
    >
      <span className="font-display text-xl text-shibumi-black">{title}</span>
      <ChevronDown
        className={`w-5 h-5 text-shibumi-black/40 transition-transform duration-300 ${
          isOpen ? "transform rotate-180 text-shibumi-maroon" : ""
        }`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pb-6 font-body text-shibumi-dark-gray/80 leading-relaxed text-sm">
            <p>{content}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- MAIN PURCHASE PAGE COMPONENT (Modern Redesign) ---
export const Purchase = () => {
  const { productId } = useParams();
  const { addToCart, cartItems } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isItemInWishlist } =
    useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const { getPrice } = useContext(CurrencyContext); // 2. USE THE CONTEXT

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(0);
  const router = require('next/navigation').useRouter();

  const toggleVisualizer = () => {
    router.push(`/visualizer?rugUrl=${encodeURIComponent(selectedImage)}`);
  };
  const toggleAccordion = (index) =>
    setOpenAccordion(openAccordion === index ? null : index);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { fetchProductById } = await import("../../services/productService");
        // Use India region for pricing context
        const data = await fetchProductById(productId, 'reg_01KRQKQ7G3BFCGV3NT7HT91ZJA');
        
        // Medusa doesn't have a simple "countInStock" by default unless configured,
        // so we fake it for now to prevent breaking UI logic.
        const initialCountInStock = data.countInStock || 10;
        setProduct({ ...data, countInStock: initialCountInStock, initialCountInStock });

        const imageUrl =
          data.images && data.images.length > 0
            ? data.images[0]
            : data.imageUrl;
        setSelectedImage(imageUrl);

        setSelectedSize(data.size || "Standard");
        setSelectedColor(data.color || "Default");
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(() => {
    if (product?.initialCountInStock !== undefined) {
      const itemInCart = cartItems.find((item) => item._id === product._id);
      const cartQuantity = itemInCart ? itemInCart.quantity : 0;
      const newCountInStock = product.initialCountInStock - cartQuantity;
      const finalCount = Math.max(0, newCountInStock);

      if (!product.countInStock || product.countInStock !== finalCount) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          countInStock: finalCount,
        }));
      }
    }
  }, [cartItems, product?.initialCountInStock, product?._id]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  const handleAddToCart = () => {
    if (!product || product.countInStock <= 0) return;
    const itemToAdd = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };
    addToCart(itemToAdd);
  };
  const handleWishlistClick = () => {
    if (!user) {
      alert("You must be logged in to manage your wishlist.");
      return;
    }
    if (!product) return;
    isItemInWishlist(product._id)
      ? removeFromWishlist(product._id)
      : addToWishlist(product.id);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen font-semibold text-lg text-gray-600">
        Loading Product...
      </div>
    );
  if (!product)
    return (
      <div className="flex justify-center items-center h-screen font-semibold text-lg text-red-600">
        Product Not Found
      </div>
    );

  const images =
    product.images?.length > 0 ? product.images : [product.imageUrl];
  const sizes =
    product.specifications?.sizeOptions || [product.size].filter(Boolean);
  const colors =
    product.specifications?.colorOptions || [product.color].filter(Boolean);
  const availableStockForAdding = product.countInStock;
  const isLowStock =
    availableStockForAdding > 0 && availableStockForAdding <= 10;
  const isOutOfStock = !availableStockForAdding || availableStockForAdding <= 0;

  const accordionItems = [
    {
      title: "Detailed Description",
      content: product.description || "No details available for this product.",
    },
    {
      title: "Shipping & Returns",
      content:
        "We offer complimentary shipping across India. Our products are eligible for return within 7 days of delivery, provided they are in their original condition. Please contact our customer service to initiate a return.",
    },
    {
      title: "Care Instructions",
      content:
        "To maintain the beauty of your rug, we recommend professional cleaning. For minor spills, blot immediately with a clean, dry cloth. Avoid exposure to direct sunlight for prolonged periods to prevent fading.",
    },
  ];

  // 3. GET THE DYNAMIC PRICE
  const { price, symbol } = getPrice(product);

  return (
    <>
      <div className="bg-white pt-[130px]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {/* --- Left Column: Image Gallery --- */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="lg:sticky top-24 self-start flex gap-4 items-start"
            >
              {/* Thumbnails - Vertical */}
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-none overflow-hidden border transition-all duration-300 ${
                      selectedImage === img
                        ? "border-shibumi-maroon opacity-100"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image with Magnify Effect */}
              <div className="relative aspect-[3/4] bg-shibumi-light-gray rounded-none overflow-hidden border border-shibumi-black/5 flex-1 group cursor-zoom-in">
                {isOutOfStock && (
                  <div className="absolute top-6 left-6 bg-shibumi-black text-white text-[10px] font-body uppercase tracking-widest py-2 px-4 rounded-none z-10">
                    Out of Stock
                  </div>
                )}

                <AnimatePresence>
                  <motion.img
                    key={selectedImage}
                    src={selectedImage}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-125 group-hover:cursor-zoom-in"
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            {/* --- Right Column: Product Details --- */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex flex-col"
            >
              <Link  href="/catalog"
                className="font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/60 hover:text-shibumi-maroon transition-colors mb-6"
              >
                ← Back to Collection
              </Link>
              <h1 className="font-display text-4xl lg:text-6xl text-shibumi-black leading-tight">
                {product.name}
              </h1>
              {/* 4. DISPLAY THE DYNAMIC PRICE */}
              <div className="flex flex-col mt-4">
                <p className="font-body text-xl tracking-widest text-shibumi-maroon">
                  {symbol}{price?.toLocaleString("en-IN")}
                </p>
                <span className="text-[10px] uppercase tracking-widest text-shibumi-maroon/40">Inclusive of 5% GST</span>
              </div>

              <div className="mt-8 border-b border-shibumi-black/10 pb-8">
                <p className="font-body text-shibumi-dark-gray/80 leading-relaxed text-sm">
                  {product.shortDescription ||
                    `A beautifully crafted ${product.material} rug, perfect for adding a touch of elegance to any room.`}
                </p>
              </div>

              <div className="space-y-6 my-6">
                {/* This section can be built out later if size/color options are needed */}
              </div>

              {isLowStock && (
                <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-orange-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <AlertTriangle size={18} />
                  <p>
                    Limited stock! Only {availableStockForAdding} remaining.
                  </p>
                </div>
              )}

              <div className="bg-transparent mt-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-shibumi-black/20 rounded-none bg-white">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={isOutOfStock || quantity <= 1}
                      className="p-4 text-shibumi-black hover:bg-shibumi-light-gray disabled:opacity-50 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-5 text-base font-semibold text-gray-800">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      disabled={
                        isOutOfStock || quantity >= availableStockForAdding
                      }
                      className="p-3 text-gray-600 hover:bg-gray-100 disabled:opacity-50 rounded-r-md"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-grow w-full flex items-center justify-center bg-shibumi-black text-white font-body text-[10px] uppercase tracking-widest py-4 px-8 rounded-none hover:bg-shibumi-maroon transition-colors disabled:bg-shibumi-medium-gray disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="mr-3" size={16} />
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </button>
                  <button
                    type="button"
                    onClick={handleWishlistClick}
                    className="p-4 border border-shibumi-black/20 rounded-none text-shibumi-black hover:text-shibumi-maroon hover:border-shibumi-maroon transition-colors bg-white"
                  >
                    <Heart
                      className={`transition-colors ${
                        isItemInWishlist(product?._id)
                          ? "text-shibumi-maroon fill-shibumi-maroon"
                          : "text-shibumi-black"
                      }`}
                      size={20}
                    />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={toggleVisualizer}
                  className="w-full flex items-center justify-center gap-3 border border-shibumi-black text-shibumi-black font-body text-[10px] uppercase tracking-widest py-4 px-5 rounded-none hover:bg-shibumi-black hover:text-white transition-colors mt-6"
                >
                  <Camera size={16} /> Visualize In Your Room
                </button>
              </div>

              <div className="flex items-center space-x-6 mt-6 border-t border-b py-4">
                <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/60">
                  <Award size={16} className="text-shibumi-maroon" />
                  <span>Handcrafted Quality</span>
                </div>
                <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/60">
                  <Truck size={16} className="text-shibumi-maroon" />
                  <span>Free India Shipping</span>
                </div>
                <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/60">
                  <ShieldCheck size={16} className="text-shibumi-maroon" />
                  <span>Secure Payments</span>
                </div>
              </div>

              <div className="mt-6">
                {accordionItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openAccordion === index}
                    onClick={() => toggleAccordion(index)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Purchase;

