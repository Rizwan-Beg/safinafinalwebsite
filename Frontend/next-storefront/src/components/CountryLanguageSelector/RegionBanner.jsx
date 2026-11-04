"use client";
import React, { useContext } from 'react';
import { CurrencyContext } from '../../context/CurrencyContext';
import { X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegionBanner = () => {
  const { showBanner, dismissBanner, selectedRegion, openSelector } = useContext(CurrencyContext);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-[#d2aba3] text-white w-full z-50 overflow-hidden relative"
        >
          <div className="max-w-[1400px] mx-auto px-4 py-2 md:py-3 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-xs md:text-sm font-light">
            <p className="text-center">
              You are on our <span className="font-medium">{selectedRegion.name}</span> website. Please select your region to see content specific for your location.
            </p>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={openSelector}
                className="flex items-center gap-2 bg-white text-[#4a0807] px-4 py-1.5 rounded-[4px] font-medium text-xs shadow-sm hover:bg-gray-50 transition-colors"
              >
                <span>{selectedRegion.flag}</span>
                <span>{selectedRegion.name} | {selectedRegion.symbol}</span>
                <ChevronDown size={14} className="opacity-50" />
              </button>
              
              <button 
                onClick={dismissBanner}
                className="bg-white text-[#4a0807] px-4 py-1.5 rounded-[4px] font-bold text-[10px] tracking-widest uppercase hover:bg-gray-50 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
          
          <button 
            onClick={dismissBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hidden md:block"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegionBanner;
