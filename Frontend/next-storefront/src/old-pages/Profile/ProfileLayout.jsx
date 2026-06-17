"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import {
  User,
  ShoppingBag,
  MapPin,
  Settings,
  Heart,
  ArrowRight,
  Loader2,
} from "lucide-react";
import "../../components/profile/Profile.css";

const NAV_ITEMS = [
  { href: "/profile", label: "My Details", icon: User, exact: true },
  { href: "/profile/orders", label: "Orders", icon: ShoppingBag },
  { href: "/profile/addresses", label: "Addresses", icon: MapPin },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/profile/settings", label: "Settings", icon: Settings },
];

const ProfileLayout = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const pathname = usePathname();

  const isActive = (href, exact) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  if (isLoading) {
    return (
      <div className="profile-shell flex items-center justify-center min-h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#7A0C13]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-shell">
        <div className="profile-login-gate">
          <p className="profile-eyebrow">Members</p>
          <h1 className="profile-title">Your private salon</h1>
          <p className="profile-subtitle mx-auto">
            Sign in to manage orders, saved addresses, and your curated wishlist.
          </p>
          <Link href="/login" className="profile-btn-primary mt-6 inline-flex">
            Sign In
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-shell">
      <div className="profile-container">
        <div className="profile-grid">
          <aside>
            <div className="profile-sidebar-card">
              <div className="profile-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="profile-sidebar-name">{user.name}</h2>
              <p className="profile-sidebar-email">{user.email}</p>
            </div>

            <nav className="profile-nav" aria-label="Account navigation">
              {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => (
                <Link
                  key={href}
                  href={href}
                  className={`profile-nav-link ${isActive(href, exact) ? "active" : ""}`}
                >
                  <Icon size={16} strokeWidth={1.25} />
                  {label}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="profile-main">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
