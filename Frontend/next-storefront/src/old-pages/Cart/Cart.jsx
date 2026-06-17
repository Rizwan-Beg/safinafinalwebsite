"use client";
// ===================================================================
// FILE: src/pages/CartPage.jsx (Corrected with useNavigate)
// ===================================================================
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
// --- 1. Import useNavigate instead of Link ---

import { useRouter as useNavigate } from "next/navigation";;
import { Plus, Minus, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, subtotal, taxTotal, total, cartCount } = useContext(CartContext);
  // --- 2. Initialize the navigate function ---
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center py-20 mt-[12vh] min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        
        {/* --- 3. This is now a <button> that uses navigate on click --- */}
        <button 
          onClick={() => navigate.push('/catalog')} 
          className="bg-shibumi-black text-white font-body text-[10px] uppercase tracking-widest py-4 px-10 rounded-none hover:bg-shibumi-maroon transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-[15vh] mb-[10vh] p-4 min-h-screen">
      <h1 className="font-display text-5xl md:text-7xl text-shibumi-black mb-16 text-center leading-tight">
        Your Shopping <span className="italic">Cart</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map(item => (
              // ... your item mapping logic is perfect, no changes needed here ...
              <div key={item.id} className="flex items-center bg-white border-b border-shibumi-black/10 p-6">
                <img 
                  src={item.thumbnail || 'https://placehold.co/128x128/f8f8f8/333333?text=No+Image'} 
                  alt={item.title} 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-none"
                />
                <div className="flex-grow ml-8">
                  <h3 className="font-display text-2xl text-shibumi-black">{item.title}</h3>
                  <p className="font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/60 mt-2">
                    {item.variant?.title !== 'Default Variant' ? `Variant: ${item.variant?.title}` : ''}
                  </p>
                  <p className="font-body text-sm font-medium text-shibumi-maroon mt-3">₹{(item.unit_price / 100).toLocaleString('en-IN')}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex items-center border border-shibumi-black/20 rounded-none">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-3 text-shibumi-black hover:bg-shibumi-light-gray transition-colors disabled:opacity-50" disabled={item.quantity <= 1}>
                      <Minus size={14} />
                    </button>
                    <span className="px-5 font-body text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-3 text-shibumi-black hover:bg-shibumi-light-gray transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id, item.title)} className="text-shibumi-black/40 hover:text-shibumi-maroon transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="font-body text-sm font-medium text-right w-24 ml-4 hidden sm:block text-shibumi-black">
                  ₹{((item.unit_price / 100) * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-shibumi-light-gray/30 border border-shibumi-black/5 rounded-none p-8 sticky top-32">
            <h2 className="font-display text-3xl text-shibumi-black border-b border-shibumi-black/10 pb-6 mb-6">Order Summary</h2>
            <div className="flex justify-between items-center my-4">
              <span className="font-body text-xs uppercase tracking-widest text-shibumi-dark-gray/60">Subtotal ({cartCount} items)</span>
              <span className="font-body text-sm text-shibumi-black">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-body text-xs uppercase tracking-widest text-shibumi-dark-gray/60">Estimated Tax</span>
              <span className="font-body text-sm text-shibumi-black">₹{taxTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-body text-xs uppercase tracking-widest text-shibumi-dark-gray/60">Shipping</span>
              <span className="font-body text-sm text-shibumi-maroon">FREE</span>
            </div>
            <div className="flex justify-between items-center border-t border-shibumi-black/10 pt-6 mt-6">
              <span className="font-display text-2xl text-shibumi-black">Total</span>
              <span className="font-body text-xl font-medium text-shibumi-black">₹{total.toLocaleString('en-IN')}</span>
            </div>
            
            {/* We will also change the checkout button to use this better pattern */}
            <button 
              onClick={() => navigate.push('/checkout')}
              className="w-full bg-shibumi-black text-white font-body text-[10px] uppercase tracking-widest py-5 mt-8 rounded-none hover:bg-shibumi-maroon transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;