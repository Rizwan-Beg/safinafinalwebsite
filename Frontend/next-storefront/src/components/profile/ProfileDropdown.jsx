"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";
import "./Profile.css";

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ProfileDropdown({
  user,
  open,
  onOpen,
  onClose,
  onLogout,
  wishlistCount = 0,
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className="cursor-pointer border-0 bg-transparent p-0"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="w-10 h-10 border border-[#F3F0EB]/30 flex items-center justify-center font-display text-lg font-light text-[#F3F0EB]">
          {user.name?.charAt(0).toUpperCase()}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="profile-dropdown-panel origin-top-right"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="profile-dropdown-header">
              <p className="font-display text-xl font-light text-white leading-tight">
                {user.name}
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/45 mt-1 truncate">
                {user.email}
              </p>
            </div>

            <nav aria-label="Account menu">
              <Link href="/profile" className="profile-dropdown-link" onClick={onClose}>
                <User size={15} strokeWidth={1.25} />
                My details
              </Link>
              <Link href="/profile/orders" className="profile-dropdown-link" onClick={onClose}>
                <ShoppingBag size={15} strokeWidth={1.25} />
                Orders
              </Link>
              <Link href="/profile/addresses" className="profile-dropdown-link" onClick={onClose}>
                <MapPin size={15} strokeWidth={1.25} />
                Addresses
              </Link>
              <Link href="/wishlist" className="profile-dropdown-link" onClick={onClose}>
                <Heart size={15} strokeWidth={1.25} />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-auto text-[9px] text-[#F5E1E3]">{wishlistCount}</span>
                )}
              </Link>
              <Link href="/profile/settings" className="profile-dropdown-link" onClick={onClose}>
                <Settings size={15} strokeWidth={1.25} />
                Settings
              </Link>
            </nav>

            <div className="profile-dropdown-footer">
              <button
                type="button"
                onClick={onLogout}
                className="profile-dropdown-logout flex items-center justify-center gap-2"
              >
                <LogOut size={14} strokeWidth={1.25} />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
