"use client";
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { getStoredToken } from '../../lib/medusa-auth';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Truck, CreditCard, ChevronRight, Lock, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import Link from 'next/link';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CheckoutNew = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useContext(AuthContext);
  const { cart, cartItems, subtotal, taxTotal, total, clearCart, updateCart } = useContext(CartContext);
  const { currency } = useContext(CurrencyContext);
  const symbol = currency === 'USD' ? '$' : '₹';

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", 
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const titleRef = useRef(null);

  useEffect(() => {
    // Enforce login
    if (!authLoading && !user) {
      toast.error("Please login to complete your purchase.");
      router.push('/login?redirect=/checkout');
      return;
    }

    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );
    }

    const syncRegion = async () => {
      try {
        // Set cart to the India region so Medusa calculates 5% GST
        await updateCart({
          region_id: 'reg_01KRQKQ7G3BFCGV3NT7HT91ZJA'
        });
      } catch (err) {
        console.error('Failed to sync region for tax:', err);
      }
    };
    syncRegion();
  }, []);

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!address) newErrors.address = "Street address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) newErrors.phone = "Valid 10-digit Indian phone number is required.";
    if (!postalCode || !/^\d{6}$/.test(postalCode)) newErrors.postalCode = "Valid 6-digit postal code is required.";
    if (!country) newErrors.country = "Country is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please ensure all fields are correctly filled.");
      return;
    }

    setIsProcessing(true);

    try {
      const isRazorpayLoaded = await loadRazorpayScript();
      if (!isRazorpayLoaded) {
        toast.error('Payment gateway unavailable. Please try again.');
        setIsProcessing(false);
        return;
      }

      // Amount must be in paise (smallest unit). Razorpay requires a minimum of 100 paise (1 INR).
      let amountInPaise = Math.round((total || subtotal) * 100);
      if (amountInPaise < 100) {
        amountInPaise = 100;
      }

      // Fetch the order_id from our new backend route
      const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
      const orderRes = await fetch(`${medusaUrl}/store/razorpay-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
        },
        body: JSON.stringify({ amount: amountInPaise }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.order_id) {
        toast.error(orderData.error || "Failed to create order on server.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_RXatv1oo8vK4Ys',
        amount: amountInPaise,
        currency: 'INR',
        name: 'Safina Carpets',
        description: 'Luxury Heritage Purchase',
        image: '/logo.jpg',
        order_id: orderData.order_id, 
        prefill: {
          name: user ? `${user.first_name} ${user.last_name}` : '',
          email: user?.email || '',
          contact: phone,
        },
        notes: {
          address: address,
          city: city,
          state: state,
          postalCode: postalCode,
        },
        handler: async function (response) {
          try {
            setIsProcessing(true);
            // Step 2: Verify payment and create order on backend
            const token = getStoredToken();
            const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
            const verifyRes = await fetch(`${medusaUrl}/store/razorpay-verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
              },
              body: JSON.stringify({
                cart_id: cart.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                shipping_address: {
                  address_1: address,
                  city: city,
                  province: state, // Using province for state in Medusa
                  postal_code: postalCode,
                  phone: phone,
                  country_code: 'in'
                }
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              toast.success('Your Safina masterpiece is on its way! Order #' + verifyData.display_id);
              clearCart();
              // Redirect to a success or profile page
              router.push('/profile/orders');
            } else {
              console.error("Verification failed:", verifyData);
              toast.error(verifyData.error || "Payment verified but order creation failed. Please contact support.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("An error occurred while finalizing your order.");
          } finally {
            setIsProcessing(false);
          }
        },
        theme: { color: '#860a0c' },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled.');
            setIsProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error('Payment failed: ' + (response.error?.description || 'Please try again.'));
        setIsProcessing(false);
      });
      rzp.open();

    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Could not initiate payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <main className="bg-shibumi-white min-h-screen pb-32 pt-[180px] md:pt-[130px]">

      {/* Slim full-bleed premium banner header */}
      <header ref={titleRef} className="w-full bg-shibumi-black py-6 px-6 mb-12 flex items-center justify-between">
        <Link
          href="/catalog"
          className="flex items-center gap-2 font-body text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft size={10} /> Gallery
        </Link>
        <div className="text-center">
          <p className="font-body text-[8px] uppercase tracking-[0.8em] text-shibumi-maroon/80 mb-0.5">Concierge</p>
          <h1 className="font-display text-xl md:text-2xl text-white leading-tight tracking-widest italic">
            Finalizing Your Selection
          </h1>
        </div>
        <div className="flex items-center gap-1 font-body text-[9px] uppercase tracking-widest text-white/40">
          <Lock size={10} /> Secure
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Form Side */}
          <div className="lg:col-span-7">
            <form onSubmit={placeOrderHandler} className="space-y-12">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-shibumi-maroon text-white flex items-center justify-center font-display text-lg">1</div>
                  <h2 className="font-display text-2xl text-shibumi-maroon uppercase tracking-wider">Shipping Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block font-body text-[10px] uppercase tracking-widest text-shibumi-maroon/60 mb-2">Street Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`w-full bg-white border-b-2 py-4 px-1 text-shibumi-dark-gray focus:outline-none transition-smooth ${errors.address ? 'border-red-500' : 'border-shibumi-maroon/10 focus:border-shibumi-maroon'}`}
                      placeholder="e.g. 2592 S. Beverly St"
                    />
                    {errors.address && <p className="text-red-500 text-[10px] mt-1 uppercase tracking-tighter">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-[10px] uppercase tracking-widest text-shibumi-maroon/60 mb-2">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-full bg-white border-b-2 py-4 px-1 text-shibumi-dark-gray focus:outline-none transition-smooth ${errors.city ? 'border-red-500' : 'border-shibumi-maroon/10 focus:border-shibumi-maroon'}`}
                      placeholder="e.g. New Delhi"
                    />
                    {errors.city && <p className="text-red-500 text-[10px] mt-1 uppercase tracking-tighter">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-[10px] uppercase tracking-widest text-shibumi-maroon/60 mb-2">State</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className={`w-full bg-white border-b-2 py-4 px-1 text-shibumi-dark-gray focus:outline-none transition-smooth ${errors.state ? 'border-red-500' : 'border-shibumi-maroon/10 focus:border-shibumi-maroon'}`}
                    >
                      <option value="">Select State</option>
                      {indianStates.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-[10px] mt-1 uppercase tracking-tighter">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-[10px] uppercase tracking-widest text-shibumi-maroon/60 mb-2">Phone Number</label>
                    <div className="flex items-center border-b-2 border-shibumi-maroon/10">
                      <span className="py-4 px-1 text-shibumi-dark-gray/60 font-body text-sm">+91</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className={`w-full bg-white py-4 px-1 text-shibumi-dark-gray focus:outline-none transition-smooth ${errors.phone ? 'border-red-500' : 'focus:border-shibumi-maroon'}`}
                        placeholder="10-digit number"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-[10px] mt-1 uppercase tracking-tighter">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-[10px] uppercase tracking-widest text-shibumi-maroon/60 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={`w-full bg-white border-b-2 py-4 px-1 text-shibumi-dark-gray focus:outline-none transition-smooth ${errors.postalCode ? 'border-red-500' : 'border-shibumi-maroon/10 focus:border-shibumi-maroon'}`}
                      placeholder="6-digit code"
                    />
                    {errors.postalCode && <p className="text-red-500 text-[10px] mt-1 uppercase tracking-tighter">{errors.postalCode}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-body text-[10px] uppercase tracking-widest text-shibumi-maroon/60 mb-2">Country</label>
                    <input
                      type="text"
                      value={country}
                      disabled
                      className="w-full bg-shibumi-light-gray/20 border-b-2 border-shibumi-maroon/10 py-4 px-1 text-shibumi-dark-gray/60 cursor-not-allowed"
                    />
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-shibumi-maroon/10 text-shibumi-maroon flex items-center justify-center font-display text-lg">2</div>
                  <h2 className="font-display text-2xl text-shibumi-maroon/40 uppercase tracking-wider">Payment Method</h2>
                </div>
                <div className="p-8 border-2 border-shibumi-maroon rounded-2xl flex items-center justify-between bg-shibumi-maroon/5 group transition-smooth cursor-default">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-shibumi-maroon text-white flex items-center justify-center">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <p className="font-display text-xl text-shibumi-maroon">Razorpay Secure</p>
                      <p className="font-body text-xs text-shibumi-maroon/60">UPI, Cards, NetBanking, Wallets</p>
                    </div>
                  </div>
                  <Lock className="text-shibumi-maroon/40" size={20} />
                </div>
              </section>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-shibumi-black text-white py-6 rounded-none font-body text-[10px] uppercase tracking-[0.4em] transition-smooth hover:bg-shibumi-maroon disabled:bg-shibumi-black/30 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    Confirm & Pay {symbol}{(total || subtotal).toLocaleString('en-IN')}
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-2" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar Side */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2rem] p-10 shadow-2xl shadow-shibumi-maroon/5 border border-shibumi-maroon/5 sticky top-32">
              <h3 className="font-display text-2xl text-shibumi-maroon mb-8 border-b border-shibumi-maroon/10 pb-6 uppercase tracking-widest">Order Summary</h3>

              <div className="max-h-[40vh] overflow-y-auto mb-8 pr-4 space-y-6 custom-scrollbar">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-6 items-center"
                    >
                      <div className="w-20 h-24 bg-shibumi-light-gray rounded-lg overflow-hidden shrink-0">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-sm text-shibumi-dark-gray line-clamp-1 uppercase">{item.title}</h4>
                        <p className="font-body text-[10px] text-shibumi-dark-gray/60 uppercase tracking-widest mt-1">Quantity: {item.quantity}</p>
                        <p className="font-body text-sm text-shibumi-maroon mt-2">{symbol}{(item.unit_price * item.quantity / 100).toLocaleString('en-IN')}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="space-y-4 border-t border-shibumi-maroon/10 pt-8">
                <div className="flex justify-between text-shibumi-dark-gray/60 font-body text-[10px] uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>{symbol}{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-shibumi-dark-gray/60 font-body text-[10px] uppercase tracking-widest">
                  <span>Tax (GST)</span>
                  <span>{symbol}{taxTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-shibumi-dark-gray/60 font-body text-[10px] uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-shibumi-maroon font-medium italic">Complimentary</span>
                </div>
                <div className="flex justify-between items-end pt-6 border-t border-shibumi-maroon/10 mt-6">
                  <span className="font-display text-2xl text-shibumi-black uppercase tracking-widest">Total</span>
                  <div className="text-right">
                    <p className="text-4xl font-display text-shibumi-black">{symbol}{(total || subtotal).toLocaleString('en-IN')}</p>
                    <p className="text-[9px] font-body text-shibumi-dark-gray/40 uppercase tracking-widest mt-1">Inclusive of all taxes</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-shibumi-maroon/5 pt-8">
                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck size={20} className="text-shibumi-maroon/40" />
                  <span className="text-[8px] font-body uppercase tracking-widest text-shibumi-dark-gray/40">Secure</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck size={20} className="text-shibumi-maroon/40" />
                  <span className="text-[8px] font-body uppercase tracking-widest text-shibumi-dark-gray/40">Insured</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Lock size={20} className="text-shibumi-maroon/40" />
                  </motion.div>
                  <span className="text-[8px] font-body uppercase tracking-widest text-shibumi-dark-gray/40">Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(134, 10, 12, 0.1); border-radius: 10px; }
      `}</style>
    </main>
  );
};

export default CheckoutNew;
