"use client";
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from "react-hot-toast";
import { Calendar as CalendarIcon, Clock, Phone, User, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BookAppointment = ({ onSuccess }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    date: '',
    time: '10:00 AM',
    phone: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to book an appointment.');
      return;
    }
    if (!formData.date || !formData.time || !formData.phone) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
      const response = await fetch(`${medusaUrl}/store/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
        },
        body: JSON.stringify({
          customer_name: user.name || "Customer",
          email: user.email || "",
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          notes: formData.notes
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Failed to book appointment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12 px-6">
        <div className="mx-auto w-16 h-16 bg-[#F5E1E3] rounded-full flex items-center justify-center mb-6">
          <User className="text-[#7A0C13]" size={32} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-serif text-[#171717] mb-3">Members Exclusive</h3>
        <p className="text-[#696969] mb-8 font-light leading-relaxed">
          Please sign in to schedule a private consultation with our carpet experts.
        </p>
        <button
          onClick={() => {
            if (onSuccess) onSuccess();
            router.push('/login');
          }}
          className="bg-[#7A0C13] text-[#ffffff] px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-[#171717] transition-colors w-full"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12 px-6">
        <div className="mx-auto w-16 h-16 bg-[#F5E1E3] rounded-full flex items-center justify-center mb-6">
          <Heart className="text-[#7A0C13]" size={32} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-serif text-[#171717] mb-3">Thank You</h3>
        <p className="text-[#696969] mb-8 font-light leading-relaxed text-sm">
          Thank you for booking a consultation. We will send you a meeting link shortly on your email. During the session, our experts will help you explore our rugs, answer your questions, and recommend options tailored to your needs.
        </p>
        <button
          onClick={() => {
            if (onSuccess) onSuccess();
          }}
          className="bg-[#7A0C13] text-[#ffffff] px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-[#171717] transition-colors w-full"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif text-[#171717] mb-3">Book a Free Rug Consultation</h3>
        <p className="text-[#696969] font-light leading-relaxed text-sm mb-4">
          Meet with our rug experts through a live video call. View rugs in real time, explore colors and craftsmanship up close, ask questions, and get personalized recommendations for your space.
        </p>
        <p className="text-[#696969] font-light leading-relaxed text-sm">
          Welcome back, <span className="font-serif italic text-[#171717]">{user.name}</span>. Please provide your availability for a personalized consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-[#696969] font-sans flex items-center gap-2">
            <CalendarIcon size={14} /> Preferred Date *
          </label>
          <input
            type="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            value={formData.date}
            onChange={handleInputChange}
            className="w-full bg-[#f7f7f7] border border-[#e5e7eb] px-4 py-3 text-[#171717] focus:outline-none focus:border-[#7A0C13] transition-colors rounded-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-[#696969] font-sans flex items-center gap-2">
            <Clock size={14} /> Preferred Time *
          </label>
          <select
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="w-full bg-[#f7f7f7] border border-[#e5e7eb] px-4 py-3 text-[#171717] focus:outline-none focus:border-[#7A0C13] transition-colors rounded-none"
            required
          >
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:30 AM">11:30 AM</option>
            <option value="01:00 PM">01:00 PM</option>
            <option value="02:30 PM">02:30 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="05:30 PM">05:30 PM</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-[#696969] font-sans flex items-center gap-2">
          <Phone size={14} /> Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+91"
          className="w-full bg-[#f7f7f7] border border-[#e5e7eb] px-4 py-3 text-[#171717] focus:outline-none focus:border-[#7A0C13] transition-colors rounded-none"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-[#696969] font-sans flex items-center gap-2">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Are there specific collections or styles you'd like to explore?"
          rows={3}
          className="w-full bg-[#f7f7f7] border border-[#e5e7eb] px-4 py-3 text-[#171717] focus:outline-none focus:border-[#7A0C13] transition-colors rounded-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#7A0C13] text-[#ffffff] px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-[#171717] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
      >
        {loading ? (
          "Processing..."
        ) : (
          <>
            <Heart size={16} /> Confirm Appointment
          </>
        )}
      </button>
    </form>
  );
};

export default BookAppointment;