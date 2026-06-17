"use client";
// FILE: src/pages/OrderConfirmationPage.jsx (New File)
import React from 'react';
import Link from "next/link";
import { useParams } from "next/navigation";;
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="container mx-auto mt-[5vh] mb-[10vh] p-4 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-lg animate-scale-fade">
        <CheckCircle size={80} className="mx-auto text-green-500" />
        <h1 className="text-4xl font-bold text-gray-900 mt-6" style={{ fontFamily: "Jost, sans-serif" }}>
          Thank You For Your Order!
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Your order has been placed successfully. A confirmation email will be sent to you shortly.
        </p>
        <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-500">Your Order ID is:</p>
          <p className="font-mono text-lg text-gray-800 break-all">{orderId}</p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link  href="/orders" className="bg-red-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-900 transition w-full">
            View My Orders
          </Link>
          <Link  href="/catalog" className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition w-full">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;