"use client";
import React, { createContext, useState, useMemo, useContext } from 'react';

export const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children }) => {
  // Default to INR, but try to get the user's preference from localStorage
  const [currency, setCurrency] = useState((typeof window !== "undefined" ? localStorage.getItem('currency') : null) || 'INR');

  const setAndStoreCurrency = (newCurrency) => {
    if(typeof window !== "undefined") localStorage.setItem('currency', newCurrency);
    setCurrency(newCurrency);
  };

  const value = useMemo(() => ({
    currency,
    setCurrency: setAndStoreCurrency,
    // Helper function to get the correct price
    getPrice: (product) => {
      if (!product) return { price: 0, symbol: '₹' };
      
      // Use new priceData if it exists
      if (product.priceData) {
        if (currency === 'USD') {
          return { price: product.priceData.usd || 0, symbol: '$' };
        }
        // Default to INR
        return { price: product.priceData.inr || 0, symbol: '₹' };
      }
      
      // Fallback for your older products that only have a single 'price' field
      return { price: product.price || 0, symbol: '₹' };
    }
  }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
