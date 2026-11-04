"use client";
import React, { createContext, useState, useMemo, useEffect } from 'react';

export const CurrencyContext = createContext(null);

export const REGIONS = [
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', rate: 1.0, locale: 'en-IN' },
  { code: 'US', name: 'US', flag: '🇺🇸', currency: 'USD', symbol: '$', rate: 0.012, locale: 'en-US' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', symbol: 'S$', rate: 0.016, locale: 'en-SG' },
  { code: 'GB', name: 'UK', flag: '🇬🇧', currency: 'GBP', symbol: '£', rate: 0.0094, locale: 'en-GB' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: 'A$', rate: 0.018, locale: 'en-AU' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', symbol: '€', rate: 0.011, locale: 'en-FR' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', symbol: '€', rate: 0.011, locale: 'en-IT' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', symbol: '€', rate: 0.011, locale: 'en-DE' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', symbol: 'SAR ', rate: 0.045, locale: 'en-SA' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', symbol: 'CHF', rate: 0.010, locale: 'en-CH' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', symbol: '€', rate: 0.011, locale: 'en-ES' },
  { code: 'EU', name: 'European Union', flag: '🇪🇺', currency: 'EUR', symbol: '€', rate: 0.011, locale: 'en-IE' },
  { code: 'AE', name: 'Middle East', flag: '🇦🇪', currency: 'AED', symbol: 'AED ', rate: 0.044, locale: 'en-AE' },
  { code: 'ROW', name: 'ROW', flag: '🌐', currency: 'USD', symbol: '$', rate: 0.012, locale: 'en-US' },
];

export const CurrencyProvider = ({ children }) => {
  const [selectedRegionCode, setSelectedRegionCode] = useState('IN');
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('safina_region_code') || localStorage.getItem('region_code');
      if (stored) {
        // If the stored code exists in our updated REGIONS, use it. Otherwise fallback to IN
        const regionExists = REGIONS.some(r => r.code === stored);
        if (regionExists) {
          setSelectedRegionCode(stored);
        } else {
          setSelectedRegionCode('IN');
          localStorage.setItem('safina_region_code', 'IN');
        }
      }
      
      const bannerDismissed = localStorage.getItem('safina_banner_dismissed') || localStorage.getItem('region_banner_dismissed');
      if (bannerDismissed === 'true') {
        setShowBanner(false);
      }
    }
  }, []);

  const selectedRegion = useMemo(() => {
    return REGIONS.find(r => r.code === selectedRegionCode) || REGIONS[0];
  }, [selectedRegionCode]);

  const selectRegion = (code) => {
    setSelectedRegionCode(code);
    if (typeof window !== "undefined") {
      localStorage.setItem('safina_region_code', code);
      localStorage.setItem('region_code', code);
      localStorage.setItem('currency', REGIONS.find(r => r.code === code)?.currency || 'INR'); // for backward compatibility
    }
    setIsSelectorOpen(false);
  };

  const dismissBanner = () => {
    setShowBanner(false);
    if (typeof window !== "undefined") {
      localStorage.setItem('safina_banner_dismissed', 'true');
      localStorage.setItem('region_banner_dismissed', 'true');
    }
  };

  const openSelector = () => setIsSelectorOpen(true);
  const closeSelector = () => setIsSelectorOpen(false);

  // Helper function to format any raw INR number to current region format
  const formatAmount = (inrAmount) => {
    if (!inrAmount || isNaN(inrAmount)) return `${selectedRegion.symbol}0`;
    const converted = inrAmount * selectedRegion.rate;
    const rounded = Math.round(converted);
    const formatted = rounded.toLocaleString(selectedRegion.locale);
    return `${selectedRegion.symbol}${formatted}`;
  };

  const value = useMemo(() => ({
    // Legacy support
    currency: selectedRegion.currency,
    setCurrency: (currencyCode) => {
      // Find first region matching this currency as fallback
      const match = REGIONS.find(r => r.currency === currencyCode);
      if(match) selectRegion(match.code);
    },
    
    // New Region & Language support
    regions: REGIONS,
    selectedRegion,
    selectRegion,
    
    // UI State
    isSelectorOpen,
    openSelector,
    closeSelector,
    showBanner,
    dismissBanner,
    
    // Formatting
    formatAmount,
    
    // Get correct price object for products
    getPrice: (product) => {
      if (!product) return { price: 0, rawPrice: 0, symbol: selectedRegion.symbol, formatted: `${selectedRegion.symbol}0` };
      
      let inrAmount = 0;
      if (typeof product === 'number') {
        inrAmount = product;
      } else if (product.priceData) {
        // If we have explicit USD price and region uses USD
        if (selectedRegion.currency === 'USD' && product.priceData.usd) {
          const usdPrice = product.priceData.usd;
          return { 
            price: Math.round(usdPrice), 
            rawPrice: usdPrice, 
            symbol: '$', 
            formatted: `$${Math.round(usdPrice).toLocaleString(selectedRegion.locale)}` 
          };
        }
        inrAmount = product.priceData.inr || product.price || 0;
      } else {
        inrAmount = product.price || 0;
      }

      const converted = inrAmount * selectedRegion.rate;
      const rounded = Math.round(converted);
      
      return { 
        price: rounded,
        rawPrice: converted,
        symbol: selectedRegion.symbol, 
        formatted: `${selectedRegion.symbol}${rounded.toLocaleString(selectedRegion.locale)}`,
        currency: selectedRegion.currency
      };
    }
  }), [selectedRegion, isSelectorOpen, showBanner]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
