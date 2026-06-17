"use client";
// FILE: src/pages/UserProfilePage.jsx (New File)
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Link from "next/link";;
import { ShoppingBag, CheckCircle, Truck, Clock } from 'lucide-react';

// Re-usable Status Badge Component from MyOrdersPage
const StatusBadge = ({ isPaid, isDelivered }) => {
    // ... (code for StatusBadge - same as before)
};

const UserProfile = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useContext(AuthContext); // Get the full user object

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('http://localhost:5001/api/orders/myorders', config);
        setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (!user) {
      return <div className="text-center p-12 mt-[12vh]">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto mt-[15vh] mb-[10vh] p-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* --- User Details Header --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 p-1 mx-auto">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-bold text-gray-800">
                    {user.name?.charAt(0).toUpperCase()}
                </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">{user.name}</h1>
            <p className="text-lg text-gray-500">{user.email}</p>
            {/* You can add an "Edit Profile" button here later */}
        </div>

        {/* --- Order History Section --- */}
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Order History</h2>
            {isLoading ? (
                <p>Loading your orders...</p>
            ) : orders.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <ShoppingBag size={48} className="mx-auto text-gray-400" />
                    <p className="mt-4 text-gray-600">You have not placed any orders yet.</p>
                    <Link  href="/catalog" className="mt-4 inline-block text-red-800 font-semibold hover:underline">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white p-6 shadow-md rounded-lg">
                           <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID: <span className="font-mono">{order._id}</span></p>
                                    <p className="text-sm text-gray-500">Date: <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                                </div>
                                <StatusBadge isPaid={order.isPaid} isDelivered={order.isDelivered} />
                           </div>
                           <div className="border-t my-4"></div>
                           {/* List of items in the order */}
                           <div className="space-y-3">
                                {order.orderItems.map(item => (
                                    <div key={item.product} className="flex items-center gap-4">
                                        <img src={item.image ? `http://localhost:5001/${item.image.split('\\').pop()}` : 'https://placehold.co/64x64'} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.quantity} x ₹{item.price.toLocaleString('en-IN')}</p>
                                        </div>
                                        <p className="font-semibold">₹{(item.quantity * item.price).toLocaleString('en-IN')}</p>
                                    </div>
                                ))}
                           </div>
                           <div className="border-t my-4"></div>
                           <div className="text-right">
                               <span className="text-lg font-bold">Total: ₹{order.totalPrice.toLocaleString('en-IN')}</span>
                           </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;