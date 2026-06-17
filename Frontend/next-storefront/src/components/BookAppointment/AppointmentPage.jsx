"use client";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const AppointmentPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    phone: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to book an appointment.");
      return;
    }
    if (!formData.date || !selectedTime || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
      const response = await fetch(`${medusaUrl}/store/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
        body: JSON.stringify({
          customer_name: user.name || "Customer",
          email: user.email || "",
          phone: formData.phone,
          date: formData.date,
          time: selectedTime,
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  /* ─── Thank You View ─── */
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        {/* Decorative header band */}
        <div className="h-64 bg-gradient-to-br from-[#7A0C13] via-[#9a1a22] to-[#5a080e] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-2xl mx-auto px-6 -mt-32 relative z-10 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white shadow-xl border border-[#e5e7eb]"
          >
            <div className="p-12 sm:p-16 text-center">
              {/* Checkmark circle */}
              <div className="mx-auto w-20 h-20 rounded-full bg-[#F5E1E3] flex items-center justify-center mb-8">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7A0C13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif text-[#171717] mb-4">
                Thank You
              </h1>

              <p className="text-[#696969] font-light leading-relaxed text-base max-w-md mx-auto mb-10">
                Thank you for booking a consultation. We will send you a meeting
                link shortly on your email. During the session, our experts will
                help you explore our rugs, answer your questions, and recommend
                options tailored to your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push("/")}
                  className="bg-[#7A0C13] text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-sans hover:bg-[#171717] transition-colors"
                >
                  Return Home
                </button>
                <button
                  onClick={() => router.push("/catalog")}
                  className="border border-[#e5e7eb] text-[#171717] px-10 py-4 text-xs tracking-[0.2em] uppercase font-sans hover:border-[#7A0C13] hover:text-[#7A0C13] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ─── Not Logged In ─── */
  if (!user) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <div className="h-64 bg-gradient-to-br from-[#7A0C13] via-[#9a1a22] to-[#5a080e] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-wide">
              Virtual Consultation
            </h1>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 -mt-16 relative z-10 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl border border-[#e5e7eb] p-12 text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-[#F5E1E3] flex items-center justify-center mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A0C13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif text-[#171717] mb-3">
              Members Exclusive
            </h2>
            <p className="text-[#696969] font-light leading-relaxed mb-8">
              Please sign in to schedule a private consultation with our carpet
              experts.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="bg-[#7A0C13] text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-sans hover:bg-[#171717] transition-colors w-full"
            >
              Sign In
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ─── Main Booking Form ─── */
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero header */}
      <div className="h-72 sm:h-80 bg-gradient-to-br from-[#7A0C13] via-[#9a1a22] to-[#5a080e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#F5E1E3] text-xs tracking-[0.3em] uppercase font-sans mb-4">
            Safina Carpets
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 tracking-wide">
            Book a Free Rug Consultation
          </h1>
          <div className="w-16 h-[1px] bg-[#F5E1E3]/50 mb-4" />
          <p className="text-[#F5E1E3]/80 font-light max-w-xl text-sm sm:text-base leading-relaxed">
            Meet with our rug experts through a live video call. View rugs in
            real time, explore colors and craftsmanship up close, ask questions,
            and get personalized recommendations for your space.
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-3xl mx-auto px-6 -mt-12 relative z-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-white shadow-xl border border-[#e5e7eb]"
        >
          {/* User greeting strip */}
          <div className="border-b border-[#e5e7eb] px-8 sm:px-12 py-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F5E1E3] flex items-center justify-center text-[#7A0C13] font-serif text-lg">
              {user.name?.charAt(0)?.toUpperCase() || "C"}
            </div>
            <div>
              <p className="text-sm text-[#171717] font-medium">
                Welcome back, {user.name}
              </p>
              <p className="text-xs text-[#696969] font-light">{user.email}</p>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-10">
            {/* Date picker */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.2em] text-[#696969] font-sans flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Preferred Date <span className="text-[#7A0C13]">*</span>
              </label>
              <input
                type="date"
                name="date"
                min={new Date().toISOString().split("T")[0]}
                value={formData.date}
                onChange={handleInputChange}
                className="w-full bg-[#faf8f5] border border-[#e5e7eb] px-5 py-4 text-[#171717] text-sm focus:outline-none focus:border-[#7A0C13] focus:ring-1 focus:ring-[#7A0C13]/20 transition-all"
                required
              />
            </div>

            {/* Time slot grid */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.2em] text-[#696969] font-sans flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Select a Time Slot <span className="text-[#7A0C13]">*</span>
              </label>
              <div className="grid grid-cols-4 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-3 px-2 text-xs sm:text-sm font-sans tracking-wider border transition-all ${
                      selectedTime === slot
                        ? "bg-[#7A0C13] text-white border-[#7A0C13]"
                        : "bg-[#faf8f5] text-[#696969] border-[#e5e7eb] hover:border-[#7A0C13] hover:text-[#7A0C13]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.2em] text-[#696969] font-sans flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Phone Number <span className="text-[#7A0C13]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-[#faf8f5] border border-[#e5e7eb] px-5 py-4 text-[#171717] text-sm focus:outline-none focus:border-[#7A0C13] focus:ring-1 focus:ring-[#7A0C13]/20 transition-all placeholder:text-[#b0b0b0]"
                required
              />
            </div>

            {/* Notes */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.2em] text-[#696969] font-sans">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Are there specific collections, sizes, or styles you'd like to explore?"
                rows={4}
                className="w-full bg-[#faf8f5] border border-[#e5e7eb] px-5 py-4 text-[#171717] text-sm focus:outline-none focus:border-[#7A0C13] focus:ring-1 focus:ring-[#7A0C13]/20 transition-all resize-none placeholder:text-[#b0b0b0]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7A0C13] text-white px-8 py-5 text-xs tracking-[0.2em] uppercase font-sans hover:bg-[#171717] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                  </svg>
                  Processing...
                </>
              ) : (
                "Confirm Appointment"
              )}
            </button>

            {/* Trust note */}
            <p className="text-center text-[10px] tracking-[0.15em] uppercase text-[#b0b0b0] font-sans">
              Your information is secure and will only be used to schedule your
              consultation.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentPage;
