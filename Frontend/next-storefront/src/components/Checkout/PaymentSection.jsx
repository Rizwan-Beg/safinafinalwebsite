"use client";
import React from "react";

export const PaymentSection = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Payment Methods */}
        <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
          <img src="https://c.animaapp.com/oLaUSUeq/img/visa.svg" alt="Visa" className="h-8" />
          <img src="https://c.animaapp.com/oLaUSUeq/img/mastercard.svg" alt="Mastercard" className="h-8" />
          <img src="https://c.animaapp.com/oLaUSUeq/img/amex.svg" alt="American Express" className="h-8" />
          <img src="https://c.animaapp.com/oLaUSUeq/img/discover.svg" alt="Discover" className="h-8" />
        </div>
        
        {/* Payment Form */}
        <form className="space-y-4">
          {/* Card Number */}
          <div>
            <label htmlFor="card-number" className="block text-sm font-medium text-gray-600 mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              placeholder="1234 5678 9012 3456"
              className="w-full border border-gray-300 rounded-md px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700"
            />
          </div>
          
          {/* Expiry and Security Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-600 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry-date"
                placeholder="MM/YY"
                className="w-full border border-gray-300 rounded-md px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700"
              />
            </div>
            
            <div>
              <label htmlFor="security-code" className="block text-sm font-medium text-gray-600 mb-2">
                Security Code
              </label>
              <input
                type="text"
                id="security-code"
                placeholder="CVC"
                className="w-full border border-gray-300 rounded-md px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700"
              />
            </div>
          </div>
          
          {/* Name on Card */}
          <div>
            <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-600 mb-2">
              Name on Card
            </label>
            <input
              type="text"
              id="name-on-card"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-md px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700"
            />
          </div>
          
          {/* Save Card Checkbox */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="save-card"
              className="w-4 h-4 text-amber-700 rounded focus:ring-amber-700"
            />
            <label htmlFor="save-card" className="text-sm text-black cursor-pointer">
              Save this card for future purchases
            </label>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-700 text-white py-3 px-4 rounded-md font-medium hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2 transition-colors mt-6"
          >
            Complete Payment
          </button>
        </form>
      </div>
    </div>
  );
};