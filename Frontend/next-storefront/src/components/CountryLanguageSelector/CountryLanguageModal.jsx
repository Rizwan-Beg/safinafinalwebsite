"use client";
import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { CurrencyContext } from '../../context/CurrencyContext';

const CountryLanguageModal = () => {
  const { isSelectorOpen, closeSelector, regions, selectedRegion, selectRegion } = useContext(CurrencyContext);

  return (
    <AnimatePresence>
      {isSelectorOpen && (
        <div className="absolute bottom-full left-0 mb-2 z-[101]">
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-[220px] max-h-[90vh] bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col overflow-hidden"
          >

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
              <div className="flex flex-col">
                {regions.map((region) => {
                  const isSelected = selectedRegion.code === region.code;
                  return (
                    <button
                      key={region.code}
                      onClick={() => selectRegion(region.code)}
                      className={`flex items-center gap-3 px-4 py-1.5 text-left transition-colors ${
                        isSelected 
                          ? 'bg-[#FFE5E6]/30' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg drop-shadow-sm">{region.flag}</span>
                      <span className={`text-xs ${isSelected ? 'font-medium text-[#4a0807]' : 'font-light text-gray-600'}`}>
                        {region.name} | {region.symbol}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <button 
              onClick={closeSelector}
              className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CountryLanguageModal;
