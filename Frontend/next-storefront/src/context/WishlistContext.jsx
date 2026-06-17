"use client";
// ===================================================================
// FILE: src/context/WishlistContext.jsx (Medusa Integration - API Sync)
// ===================================================================
import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
  const HEADERS = {
    "Content-Type": "application/json",
    "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
  };

  // Fetch from Medusa API whenever user changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setWishlistItems([]);
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch(`${MEDUSA_URL}/store/favorites?customer_id=${user.id}`, { headers: HEADERS });
        if (res.ok) {
          const data = await res.json();
          // Map backend Favorite models to frontend expected product shape
          const items = data.favorites.map(fav => ({
            id: fav.product_id,
            _id: fav.product_id,
            title: fav.product_title,
            handle: fav.product_handle,
            thumbnail: fav.product_thumbnail,
          }));
          setWishlistItems(items);
        }
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const addToWishlist = async (product) => {
    if (!user) {
      toast.error("Please log in to add items to your wishlist.", { icon: '🔒' });
      router.push("/login");
      return;
    }

    const productId = product.id || product._id;
    const exists = wishlistItems.some(item => item.id === productId || item._id === productId);
    
    if (!exists) {
      // Optimistic update
      const normalizedProduct = { ...product, _id: productId };
      setWishlistItems(prev => [...prev, normalizedProduct]);
      toast.success(`${product.title || product.name || 'Item'} added to wishlist!`, { icon: '❤️' });

      // Persist to backend
      try {
        await fetch(`${MEDUSA_URL}/store/favorites`, {
          method: "POST",
          headers: HEADERS,
          body: JSON.stringify({
            customer_id: user.id,
            customer_name: user.name,
            customer_email: user.email,
            product_id: productId,
            product_handle: product.handle,
            product_title: product.title || product.name,
            product_thumbnail: product.thumbnail,
          })
        });
      } catch (err) {
        console.error("Failed to save favorite", err);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;

    // Optimistic update
    setWishlistItems(prev => prev.filter(item => item.id !== productId && item._id !== productId));
    toast.success(`Item removed from wishlist.`, { icon: '🗑️' });

    // Remove from backend
    try {
      await fetch(`${MEDUSA_URL}/store/favorites?customer_id=${user.id}&product_id=${productId}`, {
        method: "DELETE",
        headers: HEADERS
      });
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };
  
  const isItemInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId || item._id === productId);
  };

  const value = {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isItemInWishlist,
    wishlistCount: wishlistItems.length,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};