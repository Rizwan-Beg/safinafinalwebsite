"use client";
// ===================================================================
// FILE: website/src/context/CartContext.jsx (Medusa.js Integration)
// ===================================================================
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { medusaClient } from "../lib/medusa";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toastOptions = {
    style: {
      borderRadius: '0px',
      background: '#000000',
      color: '#ffffff',
      padding: '16px 24px',
      fontFamily: '"Libre Franklin", sans-serif',
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      border: '1px solid rgba(255,255,255,0.1)'
    },
    iconTheme: {
      primary: '#7A0C13',
      secondary: '#fff',
    },
  };

  const ensureCart = async () => {
    let cartId = (typeof window !== "undefined" ? localStorage.getItem("cart_id") : null);
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '';

    if (cartId) {
      try {
        const response = await fetch(`${baseUrl}/store/carts/${cartId}`, {
          headers: { 'x-publishable-api-key': publishableKey }
        });
        if (response.ok) {
          const { cart } = await response.json();
          setCart(cart);
          return cart;
        }
        throw new Error("Invalid cart");
      } catch (err) {
        if (typeof window !== "undefined") localStorage.removeItem("cart_id");
      }
    }

    const response = await fetch(`${baseUrl}/store/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableKey,
      },
      body: JSON.stringify({ region_id: 'reg_01KRQKQ7G3BFCGV3NT7HT91ZJA' })
    });

    const { cart: newCart } = await response.json();
    if (typeof window !== "undefined") localStorage.setItem("cart_id", newCart.id);
    setCart(newCart);
    return newCart;
  };

  useEffect(() => {
    const initCart = async () => {
      setIsLoading(true);
      const activeCart = await ensureCart();
      
      if (user?.id && activeCart && (!activeCart.customer_id || activeCart.email !== user.email)) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
          const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '';
          const token = localStorage.getItem('medusa_auth_token');
          
          const response = await fetch(`${baseUrl}/store/carts/${activeCart.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-publishable-api-key': publishableKey,
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ 
              customer_id: user.id,
              email: user.email 
            }),
          });

          if (response.ok) {
            const { cart: updatedCart } = await response.json();
            setCart(updatedCart);
          }
        } catch (e) {
          console.warn("Cart association failed", e);
        }
      }
      setIsLoading(false);
    };
    initCart();
  }, [user]);


  const addToCart = async (productToAdd) => {
    const toastId = toast.loading('Adding to cart...', toastOptions);
    try {
      const activeCart = await ensureCart();
      // Medusa expects a variant_id, assuming productToAdd has variants and we take the first
      // Or if productToAdd is already a variant
      const variantId = productToAdd.variant_id || (productToAdd.variants && productToAdd.variants[0]?.id);

      if (!variantId) {
        throw new Error("Product has no variants");
      }

      const quantityToAdd = productToAdd.quantity || 1;

      // Use fetch instead of medusa-js client for v2 compatibility and better error logging
      const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
      const response = await fetch(`${baseUrl}/store/carts/${activeCart.id}/line-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
        },
        body: JSON.stringify({
          variant_id: variantId,
          quantity: quantityToAdd
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to add to collection.");
      }

      setCart(result.cart);
      toast.success(`${productToAdd.name || 'Item'} added to collection.`, toastOptions);
      openCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
      let errorMessage = "Failed to add to collection.";

      // Parse Medusa Axios errors
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
        // Clean up messy Medusa error messages for the premium UI
        if (errorMessage.includes("Stock location")) {
          errorMessage = "Item unavailable at current location.";
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage, { id: toastId, duration: 4000, ...toastOptions });
    }
  };

  const updateQuantity = async (lineItemId, newQuantity) => {
    if (!cart?.id) return;
    try {
      const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
      const response = await fetch(`${baseUrl}/store/carts/${cart.id}/line-items/${lineItemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
        },
        body: JSON.stringify({
          quantity: newQuantity
        })
      });

      if (!response.ok) throw new Error("Failed to update quantity.");

      const { cart: updatedCart } = await response.json();
      setCart(updatedCart);
    } catch (err) {
      console.error("Error updating cart:", err);
      toast.error("Failed to update quantity.", toastOptions);
    }
  };

  const removeItem = async (lineItemId, productName) => {
    if (!cart?.id) return;
    try {
      const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
      const response = await fetch(`${baseUrl}/store/carts/${cart.id}/line-items/${lineItemId}`, {
        method: 'DELETE',
        headers: {
          'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
        }
      });

      if (!response.ok) throw new Error("Failed to remove item.");

      const { cart: updatedCart } = await response.json();
      setCart(updatedCart);
      toast.success(`${productName || 'Item'} removed from cart.`, { icon: '🗑️', ...toastOptions });
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Failed to remove item.", toastOptions);
    }
  };

  const updateCart = async (payload) => {
    if (!cart?.id) return;
    try {
      const { cart: updatedCart } = await medusaClient.carts.update(cart.id, payload);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      console.error("Error updating cart:", err);
      throw err;
    }
  };

  const clearCart = () => { setCart(null); if (typeof window !== "undefined") localStorage.removeItem("cart_id"); };
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Map Medusa's line items back to the generic "cartItems" array shape the old components might expect
  const cartItems = (cart?.items || []).map(item => {
    let unitPrice = item.unit_price; // 1:1 Pricing
    // Apply professional fallback if price is missing
    if (unitPrice <= 0) {
      unitPrice = 10000;
    }
    return {
      ...item,
      unit_price: unitPrice 
    };
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  // Calculate totals in Rupees (1:1 with backend units)
  const subtotal = cartItems.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);
  
  // Calculate 5% GST manually for professional display
  const taxTotal = subtotal * 0.05;
  const total = subtotal + taxTotal;

  return (
    <CartContext.Provider
      value={{
        cart, cartItems, isCartOpen, clearCart, isLoading, addToCart,
        updateQuantity, removeItem, openCart, closeCart, cartCount, subtotal, taxTotal, total, updateCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
