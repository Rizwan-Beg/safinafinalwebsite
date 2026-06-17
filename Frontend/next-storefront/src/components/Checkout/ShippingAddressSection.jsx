"use client";
import React, { useState } from "react";

const cartItems = [
  {
    id: 1,
    name: "Lahar Hand-Knotted Area Rug",
    variant: "Ecru / 6' x 9'",
    status: "In stock. Ready to ship.",
    price: "$1,119.20",
    image: "https://c.animaapp.com/oLaUSUeq/img/ecru@2x.png",
    quantity: 1,
  },
];

const rugPadData = {
  name: "Eco-Friendly Rug Pad",
  size: "6' x 9'",
  price: "$99.00",
  image: "https://c.animaapp.com/oLaUSUeq/img/eco-friendly-rug-pad@2x.png",
};

export const ShippingAddressSection = () => {
  const [giftVoucher, setGiftVoucher] = useState("");
  const [addGiftMessage, setAddGiftMessage] = useState(false);

  const handleApplyVoucher = () => {
    console.log("Applying voucher:", giftVoucher);
  };

  const handleAddRugPad = () => {
    console.log("Adding rug pad to cart");
  };

  return (
    <aside className="w-full bg-red-50 shadow-lg min-h-screen">
      <div className="p-6 space-y-6">
        
        {/* Cart Items Section */}
        <section className="space-y-4">
          {cartItems.map((item) => (
            <article key={item.id} className="flex items-start gap-4 p-4 bg-white rounded-lg">
              <div className="relative flex-shrink-0">
                <img
                  className="w-16 h-16 rounded-md object-cover border"
                  alt={item.name}
                  src={item.image}
                />
                <div className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-black text-sm mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs mb-1">
                  {item.variant}
                </p>
                <p className="text-amber-700 text-xs italic">
                  {item.status}
                </p>
              </div>

              <div className="flex-shrink-0">
                <span className="font-medium text-black text-sm">
                  {item.price}
                </span>
              </div>
            </article>
          ))}
        </section>

        {/* Gift Voucher Section */}
        <section className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={giftVoucher}
              onChange={(e) => setGiftVoucher(e.target.value)}
              placeholder="Gift Voucher"
              className="flex-1 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleApplyVoucher}
              disabled={!giftVoucher.trim()}
              className="px-6 py-3 bg-gray-200 text-black rounded-md hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              Apply
            </button>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={addGiftMessage}
              onChange={(e) => setAddGiftMessage(e.target.checked)}
              className="w-4 h-4 text-amber-700 rounded focus:ring-red-500"
            />
            <span className="text-sm text-black">Add gift message</span>
          </label>
        </section>

        {/* Order Summary Section */}
        <section className="space-y-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="text-sm text-black">Subtotal</span>
            <span className="text-sm text-black">$1,119.20</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-black">Shipping</span>
            <span className="text-sm text-gray-600">Calculated at next step</span>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-xl font-medium text-black">Total</span>
            <div className="flex items-end gap-2">
              <span className="text-xs text-gray-600 mb-1">USD</span>
              <span className="text-xl font-medium text-black">$1,119.20</span>
            </div>
          </div>
        </section>

        {/* Rug Pad Upsell Section */}
        <section className="space-y-4 pt-6 border-t border-gray-200">
          <h2 className="font-bold text-black text-base uppercase">
            Extend the Lifetime of Your Rug
          </h2>

          <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
            <img
              className="w-16 h-16 object-cover border rounded-md"
              alt={rugPadData.name}
              src={rugPadData.image}
            />

            <div className="flex-1">
              <h3 className="font-medium text-black text-base mb-1">
                {rugPadData.name}
              </h3>
              <p className="text-gray-600 text-sm mb-1">{rugPadData.size}</p>
              <p className="text-gray-600 text-sm">{rugPadData.price}</p>
            </div>

            <button
              onClick={handleAddRugPad}
              className="px-4 py-2 border border-gray-300 rounded-md text-blue-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Add
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
};