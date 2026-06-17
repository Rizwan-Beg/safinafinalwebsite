"use client";
// FILE: src/pages/CheckoutPage.jsx (Updated and Corrected)
import React, { useState, useContext } from 'react';

import { useRouter as useNavigate } from "next/navigation";;
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Renamed component to follow conventions
const CheckOut = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  // Get all needed functions and state from CartContext
  const { cartItems, subtotal, clearCart } = useContext(CartContext);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [errors, setErrors] = useState({}); // For form validation
  const [isProcessing, setIsProcessing] = useState(false); // To disable button on submit

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    
    // --- Frontend Validation Logic ---
    const newErrors = {};
    if (!address) newErrors.address = "Address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!postalCode || !/^\d{6}$/.test(postalCode)) newErrors.postalCode = "Valid 6-digit postal code is required.";
    if (!country) newErrors.country = "Country is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please correct the errors in the form.");
      return;
    }
    // --- End Validation ---

    setIsProcessing(true); // Disable the button

    try {
      // Load Razorpay script
      const isRazorpayLoaded = await loadRazorpayScript();
      if (!isRazorpayLoaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setIsProcessing(false);
        return;
      }

      const shippingAddress = { address, city, postalCode, country };
      
      const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Use the session cookie if available, or Bearer token if using JWT
          // Medusa v2 usually uses session cookies for storefront
        },
        withCredentials: true
      };

      // Create Razorpay order via the backend (assuming a custom endpoint or the old backend is still used for payments)
      // Note: If moving fully to Medusa, this should be a Medusa payment session.
      const orderResponse = await axios.post(
        `${baseUrl}/api/payments/create-order`,
        {
          amount: subtotal,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            shippingAddress: JSON.stringify(shippingAddress),
            cartItems: JSON.stringify(cartItems)
          }
        },
        config
      );

      const { order } = orderResponse.data;

      // Razorpay payment options
      const options = {
        key: 'rzp_test_RXatv1oo8vK4Ys', // Your Razorpay key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Safina Carpets',
        description: 'Premium Carpet Purchase',
        image: '/logo.jpg', // Updated to match public folder
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post(
              `${baseUrl}/api/payments/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: {
                  items: cartItems.map(item => ({
                    product: item.id || item.variant_id,
                    name: item.title,
                    price: item.unit_price / 100,
                    quantity: item.quantity,
                    image: item.thumbnail || ''
                  })),
                  shippingAddress,
                  totalAmount: subtotal,
                  paymentMethod: 'Razorpay'
                }
              },
              config
            );

            if (verifyResponse.data.success) {
              toast.success('Payment successful! Order placed.');
              clearCart();
              navigate(`/order/${verifyResponse.data.order._id || verifyResponse.data.order.id}`);
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
          setIsProcessing(false);
        },
        prefill: {
          name: '', // You can get this from user context
          email: '', // You can get this from user context
          contact: '' // You can get this from user context
        },
        notes: {
          address: `${address}, ${city}, ${postalCode}, ${country}`
        },
        theme: {
          color: '#991B1B' // Red color matching your theme
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            toast.error('Payment cancelled');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error('Error creating order:', err);
      toast.error(err.response?.data?.message || 'Failed to initiate payment.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto mt-[15vh] mb-[10vh] p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
      <form onSubmit={placeOrderHandler}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Side: Shipping Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Shipping Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">Address</label>
                <input
                  type="text" placeholder="123 Main St" value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">City</label>
                <input
                  type="text" placeholder="New Delhi" value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Postal Code</label>
                <input
                  type="text" placeholder="110001" value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Country</label>
                <input
                  type="text" placeholder="India" value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div>
            <div className="bg-white shadow-md rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-semibold border-b pb-4">Order Summary</h2>
              <div className="space-y-3 mt-4">
                {cartItems.map(item => (
                  <div key={item._id} className="flex justify-between items-center text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    <span className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-extrabold text-red-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              
              <button
                type="submit"
                disabled={isProcessing} // Disable button when processing
                className="w-full bg-red-800 text-white font-bold py-3 mt-6 rounded-lg hover:bg-red-900 transition text-lg uppercase tracking-wider disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing Payment...' : 'Pay with Razorpay'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;