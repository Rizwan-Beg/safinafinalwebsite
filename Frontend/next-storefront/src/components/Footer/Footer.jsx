"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer-main bg-[#FFE5E6] text-[#4a0807] pt-24 pb-12 border-t border-red-200">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <h3 className="footer-logo font-serif text-3xl mb-8 tracking-wider text-[#4a0807]">SAFINA CARPETS</h3>
            <p className="footer-description text-[#4a0807] font-light text-base leading-relaxed mb-10 max-w-md">
              Crafting timeless elegance since generations. We preserve the heritage of Mughal-era artistry through premium handwoven rugs that tell a story of luxury and tradition.
            </p>
            <div className="flex items-center gap-6 social-links">
              <a href="#" className="social-icon group" aria-label="Instagram">
                <FaInstagram size={22} className="transition-transform group-hover:scale-110" />
              </a>
              <a href="#" className="social-icon group" aria-label="Facebook">
                <FaFacebookF size={22} className="transition-transform group-hover:scale-110" />
              </a>
              <a href="#" className="social-icon group" aria-label="Twitter">
                <FaTwitter size={22} className="transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="footer-heading text-xs font-bold uppercase tracking-[0.3em] mb-10 text-[#4a0807]">Collection</h4>
            <ul className="space-y-5">
              <li><Link href="/catalog" className="footer-link">All Products</Link></li>
              <li><Link href="/manufacturing" className="footer-link">The Craft</Link></li>
              <li><Link href="/about" className="footer-link">Our Story</Link></li>
              <li><Link href="/blogs" className="footer-link">Journal</Link></li>
              <li><Link href="/services" className="footer-link">Bespoke Services</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="footer-heading text-xs font-bold uppercase tracking-[0.3em] mb-10 text-[#4a0807]">Concierge</h4>
            <ul className="space-y-5">
              <li><Link href="/shipping-policy" className="footer-link">Shipping & Delivery</Link></li>
              <li><Link href="/return-refund-policy" className="footer-link">Returns & Exchanges</Link></li>
              <li><Link href="/faqs" className="footer-link">Help Center</Link></li>
              <li><Link href="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="footer-heading text-xs font-bold uppercase tracking-[0.3em] mb-10 text-[#4a0807]">Private Invitation</h4>
            <p className="footer-newsletter-text text-[#4a0807] font-light text-sm mb-8">
              Join our inner circle for exclusive previews of new collections and artisan stories.
            </p>
            
            <form onSubmit={handleSubscribe} className="newsletter-form mb-10">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#4a0807]/30 py-4 pr-12 text-sm font-light focus:outline-none focus:border-[#4a0807] transition-all duration-500 text-[#4a0807] placeholder:text-[#4a0807]/40"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#4a0807]/60 hover:text-[#4a0807] transition-colors"
                  aria-label="Subscribe"
                >
                  {isSubscribed ? "Sent" : <ArrowRight size={20} />}
                </button>
              </div>
            </form>

            <div className="space-y-5 text-sm font-light text-[#4a0807]">
              <div className="flex items-center gap-4 group cursor-pointer">
                <MapPin size={18} className="text-[#4a0807]/60 group-hover:text-[#4a0807] transition-colors" />
                <p className="group-hover:text-[#4a0807] transition-colors">2592 S. Beverly St, Suite 130, Boise, ID</p>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <Phone size={18} className="text-[#4a0807]/60 group-hover:text-[#4a0807] transition-colors" />
                <p className="group-hover:text-[#4a0807] transition-colors">+91 741XF GFSTW</p>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <Mail size={18} className="text-[#4a0807]/60 group-hover:text-[#4a0807] transition-colors" />
                <a href="mailto:safinacarpets@yahoo.com" className="group-hover:text-[#4a0807] transition-colors">safinacarpets@yahoo.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-[#4a0807]/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[#4a0807]/40 text-[10px] uppercase tracking-[0.4em] font-medium">
            © {new Date().getFullYear()} SAFINA CARPETS. CRAFTED WITH PASSION.
          </p>
          <div className="flex items-center gap-10">
            <Link href="/shipping-policy" className="text-[#4a0807]/40 text-[10px] uppercase tracking-widest hover:text-[#4a0807] transition-colors">Shipping</Link>
            <Link href="/privacy-policy" className="text-[#4a0807]/40 text-[10px] uppercase tracking-widest hover:text-[#4a0807] transition-colors">Privacy</Link>
            <Link href="/terms-conditions" className="text-[#4a0807]/40 text-[10px] uppercase tracking-widest hover:text-[#4a0807] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
