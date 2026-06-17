"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter as useNavigate, usePathname as useLocation } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Key, User, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const toastOptions = {
  style: {
    borderRadius: '0px',
    background: '#000000',
    color: '#ffffff',
    padding: '16px 24px',
    fontFamily: '"Libre Franklin", sans-serif',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  iconTheme: { primary: '#860a0c', secondary: '#fff' },
};

// Forgot Password Modal
const ForgotPasswordModal = ({ isOpen, onClose, onSendLink }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSendLink(email);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-md rounded-none shadow-2xl"
      >
        <div className="p-10">
          <p className="font-body text-[10px] uppercase tracking-[0.5em] text-shibumi-maroon mb-4">Account Recovery</p>
          <h3 className="font-display text-3xl text-shibumi-black mb-2">Reset Password</h3>
          <p className="font-body text-sm text-shibumi-dark-gray/60 mb-8 leading-relaxed">
            Enter your email and we'll send you a link to restore access.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/50 mb-3">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full border-b-2 border-shibumi-black/10 focus:border-shibumi-maroon py-3 text-shibumi-black font-body text-sm focus:outline-none transition-colors bg-transparent"
              />
            </div>
            <div className="flex justify-end gap-4 pt-2">
              <button type="button" onClick={onClose} className="font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/50 hover:text-shibumi-black transition-colors py-3 px-6">
                Cancel
              </button>
              <button type="submit" disabled={isLoading} className="bg-shibumi-black text-white font-body text-[10px] uppercase tracking-widest py-3 px-8 hover:bg-shibumi-maroon transition-colors disabled:opacity-50 flex items-center gap-2">
                {isLoading && <Loader2 size={12} className="animate-spin" />}
                Send Link
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// Main Login/Signup Component
const Login = () => {
  const { login, signup, sendPasswordResetEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const message = params.get("message");
    const error = params.get("error");
    if (message) toast.success(message, toastOptions);
    if (error) toast.error(error, toastOptions);
  }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loadId = toast.loading(isLoginView ? 'Authenticating...' : 'Creating account...', toastOptions);
    try {
      if (isLoginView) {
        await login(formData.email, formData.password);
        toast.success("Welcome back.", { id: loadId, ...toastOptions });
      } else {
        await signup(formData.name, formData.email, formData.password);
        toast.success("Verification email sent. Please check your inbox.", { id: loadId, ...toastOptions });
        setIsLoginView(true);
      }
    } catch (err) {
      toast.error(err.message || "An error occurred.", { id: loadId, ...toastOptions });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(email);
      toast.success("Password reset link sent.", toastOptions);
    } catch (err) {
      toast.error(err.message || "Failed to send reset link.", toastOptions);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isForgotModalOpen && (
          <ForgotPasswordModal
            isOpen={isForgotModalOpen}
            onClose={() => setIsForgotModalOpen(false)}
            onSendLink={handleForgotPassword}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#F8F5F0] flex">
        {/* Left: Editorial Image Panel */}
        <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
          <img
            src="/rugbg.avif"
            alt="Safina Carpets"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 right-0 p-10 flex items-center justify-between z-10">
            <Link href="/" className="font-display text-white text-xl tracking-widest">
              SAFINA
            </Link>
            <div className="h-px w-24 bg-white/30" />
          </div>

          {/* Bottom editorial text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-12 z-10"
          >
            <p className="font-body text-[10px] uppercase tracking-[0.6em] text-shibumi-pink mb-6">Heritage. Craft. Soul.</p>
            <h2 className="font-display text-5xl text-white leading-tight mb-6">
              Where every thread<br />
              <span className="italic">tells a story.</span>
            </h2>
            <div className="w-16 h-px bg-shibumi-maroon/60 mb-6" />
            <p className="font-body text-sm text-white/60 max-w-sm leading-relaxed">
              Handcrafted rugs woven with generations of artisanal knowledge. Each piece is a masterwork — timeless, rare, and destined for extraordinary interiors.
            </p>
          </motion.div>
        </div>

        {/* Right: Form Panel */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 bg-white relative">

          {/* Back link */}
          <Link href="/" className="absolute top-10 right-10 font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/40 hover:text-shibumi-maroon transition-colors flex items-center gap-2">
            Back to Site <ArrowRight size={10} />
          </Link>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLoginView ? "login" : "signup"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm mx-auto"
            >
              {/* Eyebrow */}
              <p className="font-body text-[10px] uppercase tracking-[0.6em] text-shibumi-maroon mb-6">
                {isLoginView ? "Member Access" : "New Account"}
              </p>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl text-shibumi-black leading-tight mb-2">
                {isLoginView ? "Welcome\nBack." : "Create\nAccount."}
              </h1>
              <p className="font-body text-sm text-shibumi-dark-gray/50 mb-10 mt-3">
                {isLoginView
                  ? "Sign in to access your collection and orders."
                  : "Join Safina and discover heirloom-quality rugs."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-7">
                {!isLoginView && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <label className="block font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/50 mb-3">Full Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-shibumi-dark-gray/30" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required={!isLoginView}
                        className="w-full pl-6 border-b-2 border-shibumi-black/10 focus:border-shibumi-maroon py-3 text-shibumi-black font-body text-sm focus:outline-none transition-colors bg-transparent"
                      />
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/50 mb-3">Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-shibumi-dark-gray/30" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-6 border-b-2 border-shibumi-black/10 focus:border-shibumi-maroon py-3 text-shibumi-black font-body text-sm focus:outline-none transition-colors bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/50">Password</label>
                    {isLoginView && (
                      <button
                        type="button"
                        onClick={() => setIsForgotModalOpen(true)}
                        className="font-body text-[10px] uppercase tracking-widest text-shibumi-maroon hover:opacity-70 transition-opacity"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Key size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-shibumi-dark-gray/30" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-6 pr-10 border-b-2 border-shibumi-black/10 focus:border-shibumi-maroon py-3 text-shibumi-black font-body text-sm focus:outline-none transition-colors bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-shibumi-dark-gray/30 hover:text-shibumi-dark-gray transition-colors"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-shibumi-black text-white font-body text-[10px] uppercase tracking-[0.4em] py-5 mt-4 hover:bg-shibumi-maroon transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading
                    ? <Loader2 size={14} className="animate-spin" />
                    : isLoginView ? "Sign In" : "Create Account"
                  }
                  {!isLoading && <ArrowRight size={12} />}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-shibumi-black/5 text-center">
                <p className="font-body text-[10px] uppercase tracking-widest text-shibumi-dark-gray/40">
                  {isLoginView ? "New to Safina?" : "Already a member?"}
                  <button
                    onClick={() => setIsLoginView(!isLoginView)}
                    className="ml-3 text-shibumi-maroon hover:opacity-70 transition-opacity"
                  >
                    {isLoginView ? "Create Account" : "Sign In"}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Login;
