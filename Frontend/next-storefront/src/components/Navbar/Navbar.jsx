"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { usePathname as useLocation } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMapPin,
  HiOutlineMagnifyingGlass,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineShoppingCart,
  HiOutlineCalendar,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import "@fontsource/jost/300.css";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { CurrencyContext } from "../../context/CurrencyContext"; // 1. Import CurrencyContext
import { Bell, Shield } from "lucide-react";
import ProfileDropdown from "../profile/ProfileDropdown";
// Appointment now uses a dedicated page at /appointment

// --- FIX: The component needs to accept 'onCartClick' as a prop ---
const Navbar = ({ onCartClick }) => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  // 3. Get currency state and setter from context
  const { currency, setCurrency } = useContext(CurrencyContext);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleMouseEnter = (menu) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms delay to bridge the gap
  };
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");

  // Fetch announcement from Medusa admin
  useEffect(() => {
    const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
    fetch(`${MEDUSA_URL}/store/announcement`, {
      headers: { "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "" }
    })
      .then(res => res.json())
      .then(data => {
        if (data.is_active && data.text) {
          setAnnouncementText(data.text);
          setShowAnnouncement(true);
        }
      })
      .catch(() => {});
  }, []);

  const [mobilePoliciesOpen, setMobilePoliciesOpen] = useState(false);
  const iconSize = 18; 
  const iconColor = "#F3F0EB";

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2, ease: "easeOut" } },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.pageYOffset;
      
      // Early return for negative scroll (bounce effect on mobile)
      if (currentScrollY < 0) {
        ticking = false;
        return;
      }

      // At the very top, always show
      if (currentScrollY <= 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling DOWN and passed a threshold
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP
        setShowNavbar(true);
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };
  const closeAnnouncement = () => {
    setShowAnnouncement(false);
  };

  const headerClass = showNavbar ? "show" : "hide";

  return (
    <header className={headerClass}>
      {/* Announcement Banner */}
      {showAnnouncement && announcementText && (
        <div className="announcement-banner">
          <div className="announcement-content">
            <span className="announcement-text">
              {announcementText}
            </span>
            <button className="announcement-close" onClick={closeAnnouncement}>
              &times;
            </button>
          </div>
        </div>
      )}
      
      <nav className="navbar">
        {/* Mobile Hamburger Menu Button - Left Side */}
        <button className="hamburger-btn small-screen" onClick={toggleMenu}>
          {menuOpen ? <HiXMark size={28} color={iconColor} /> : <HiBars3 size={28} color={iconColor} />}
        </button>

        {/* Nav Left - Desktop Only */}
        <div className="nav-left large-screen">
            <a href="http://localhost:8080/" className="nav-icon"><HiOutlineMapPin size={iconSize} color={iconColor} /></a>
            <Link href="/appointment" className="nav-appointment">
                <HiOutlineCalendar size={iconSize} color={iconColor} /><p>BOOK AN APPOINTMENT</p>
            </Link>
        </div>

        {/* Mobile Appointment Icon Only */}
        <div className="nav-left-mobile small-screen">
            <Link href="/appointment" className="nav-appointment-mobile">
                <HiOutlineCalendar size={iconSize} color={iconColor} />
            </Link>
        </div>

        <div className="nav-center">
            <Link  href="/">
              <img 
                src={typeof logo === 'string' ? logo : logo.src} 
                alt="Logo" 
                className="nav-logo" 
              />
            </Link>
        </div>

        {/* Mobile Right Icons */}
        <div className="nav-right-mobile small-screen">
          <Link  href="/wishlist" className="nav-icon relative">
            <HiOutlineHeart size={iconSize} color={iconColor} />
            {wishlistCount > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlistCount}</span>}
          </Link>
          <Link  href="/" className="nav-icon">
            <Bell size={iconSize} color={iconColor} />
          </Link>
          {/* FIX: Use onCartClick for mobile cart */}
          <button onClick={onCartClick} className="nav-icon relative">
            <HiOutlineShoppingCart size={iconSize} color={iconColor} />
            {cartCount > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
          </button>
        </div>

        {/* Desktop Right Icons */}
        <div className="nav-right large-screen">
          
          {/* --- 4. ADDED CURRENCY TOGGLE BUTTON --- */}
          <button
            onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
            className="nav-icon nav-currency-toggle"
            title="Change Currency"
          >
            {currency === 'INR' ? '₹' : '$'}
          </button>

          {/* --- 5. ADDED CONDITIONAL ADMIN LINK --- */}
          {user && user.isAdmin && (
            <a 
              href="http://localhost:8080" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-icon admin-link" 
              title="Admin Panel"
            >
              <Shield size={iconSize - 2} color={iconColor} />
            </a>
          )}

          <Link  href="#" className="nav-icon"><HiOutlineMagnifyingGlass size={iconSize} color={iconColor} /></Link>
          <Link  href="/wishlist" className="nav-icon relative">
            <HiOutlineHeart size={iconSize} color={iconColor} />
            {wishlistCount > 0 && <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center">{wishlistCount}</span>}
          </Link>
          <Link  href="/" className="nav-icon"><Bell size={iconSize} color={iconColor} /></Link>

          {user ? (
            <ProfileDropdown
              user={user}
              open={profileOpen}
              onOpen={() => setProfileOpen(true)}
              onClose={() => setProfileOpen(false)}
              onLogout={handleLogout}
              wishlistCount={wishlistCount}
            />
          ) : (
            <Link  href="/login" className="nav-icon flex items-center gap-2">
              <HiOutlineUser size={iconSize} color={iconColor} />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}
          
          {/* FIX: Use onCartClick prop from MainLayout.jsx */}
          <Link  href="/cart" className="nav-icon relative">
            <HiOutlineShoppingCart size={iconSize} color={iconColor} />
            {cartCount > 0 && <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}
          </Link>
        </div>
      </nav>

      {/* Links container */}
      <div className="links large-screen jost-heading">
        <Link  href="/about">ABOUT US</Link>
        <a 
          href="#" 
          onMouseEnter={() => handleMouseEnter("shop")} 
          onMouseLeave={handleMouseLeave}
        >
          SHOP
        </a>
        <Link  href="/services">SERVICES</Link>
        <Link  href="/guide">GUIDE</Link>
        <Link  href="/manufacturing">MANUFACTURING</Link>
        <button 
          onMouseEnter={() => handleMouseEnter("policies")} 
          onMouseLeave={handleMouseLeave}
          className="text-white font-normal text-[0.7rem] px-[15px] py-[8px] tracking-[0.2em] uppercase transition-all duration-300 hover:text-[#FFE5E6] bg-transparent border-none cursor-pointer"
        >
          POLICIES
        </button>
        <Link  href="/checkout">CHECKOUT</Link>
        <Link  href="/blogs">BLOGS</Link>
        <Link  href="/custom">CUSTOM</Link>
        <Link  href="/faqs">FAQS</Link>
      </div>
      <AnimatePresence>
        {activeDropdown === "shop" && (
          <motion.div 
            className="mega-menu" 
            onMouseEnter={() => handleMouseEnter("shop")} 
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="mega-section">
              <h3>SIZE</h3>
              <ul>
                <li><a href="/catalog?size=2x3ft">2X3 FT</a></li>
                {/* ... all your other size links ... */}
                <li><a href="/catalog?size=large">LARGE</a></li>
                <li><a href="/catalog?size=oversize">OVERSIZE</a></li>
              </ul>
            </div>
            <div className="mega-section">
              <h3>COLORS</h3>
              <ul>
                {/* ... all your color links ... */}
                <li><a href="/catalog?color=multi-color">MULTI COLOR</a></li>
              </ul>
            </div>
            <div className="mega-section">
              <h3>ROOM</h3>
              <ul>
                {/* ... all your room links ... */}
                <li><a href="/catalog?room=outdoor-indoor">OUTDOOR/INDOOR</a></li>
              </ul>
              <h3 style={{marginTop: '20px'}}>SHAPE</h3>
              <ul>
                {/* ... all your shape links ... */}
                <li><a href="/catalog?shape=square">SQUARE</a></li>
              </ul>
            </div>
            <div className="mega-section">
              <h3>MATERIAL</h3>
              <ul>
                {/* ... all your material links ... */}
                <li><a href="/catalog?material=bamboo-silk-zari">BAMBOO SILK AND ZARI</a></li>
              </ul>
            </div>
            <div className="mega-section">
              <h3>CONSTRUCTION</h3>
              <ul>
                {/* ... all your construction links ... */}
                <li><a href="/catalog?construction=shag">SHAG</a></li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeDropdown === "policies" && (
          <motion.div 
            className="mega-menu policies-mega" 
            onMouseEnter={() => handleMouseEnter("policies")} 
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="mega-section">
              <h3>OUR POLICIES</h3>
              <p className="text-[0.7rem] text-gray-500 mb-6 font-light tracking-widest uppercase">Transparency & Trust</p>
              <ul className="grid grid-cols-2 gap-x-12 gap-y-4">
                <li>
                  <Link href="/return-refund-policy" className="policy-link">
                    <span className="link-text">Return & Refund</span>
                    <span className="link-desc text-[0.6rem] block opacity-50 lowercase tracking-normal font-light">30-day returns & full refunds</span>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="policy-link">
                    <span className="link-text">Privacy Policy</span>
                    <span className="link-desc text-[0.6rem] block opacity-50 lowercase tracking-normal font-light">Your data security is our priority</span>
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy" className="policy-link">
                    <span className="link-text">Shipping Policy</span>
                    <span className="link-desc text-[0.6rem] block opacity-50 lowercase tracking-normal font-light">Global delivery & tracking info</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions" className="policy-link">
                    <span className="link-text">Terms & Conditions</span>
                    <span className="link-desc text-[0.6rem] block opacity-50 lowercase tracking-normal font-light">The legal framework of our service</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mega-section flex items-center justify-center border-l border-gray-100 pl-12">
               <div className="text-center space-y-4 pt-4">
                  <div className="w-16 h-16 bg-[#860a0c]/5 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="text-[#860a0c]" size={24} />
                  </div>
                  <h4 className="font-serif text-xl text-[#860a0c]">Secure Experience</h4>
                  <p className="text-xs text-gray-400 max-w-[200px] mx-auto font-light leading-relaxed">Shop with confidence. Our policies are designed to protect your investment in fine artistry.</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Slide Menu */}
      <div className={`mobile-slide-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button className="mobile-menu-close" onClick={toggleMenu}>
              <HiXMark size={24} color="white" />
            </button>
          </div>
          
          <div className="mobile-menu-links">
            <Link  href="/about" onClick={toggleMenu}>ABOUT US</Link>
            <Link  href="/catalog" onClick={toggleMenu}>SHOP</Link> {/* Simplified for mobile */}
            <Link  href="/services" onClick={toggleMenu}>SERVICES</Link>
            <Link  href="/guide" onClick={toggleMenu}>GUIDE</Link>
            <Link  href="/manufacturing" onClick={toggleMenu}>MANUFACTURING</Link>
            <div className="mobile-dropdown">
              <button className="mobile-dropdown-toggle" onClick={() => setMobilePoliciesOpen(!mobilePoliciesOpen)}>
                POLICIES
                <span className={`dropdown-arrow ${mobilePoliciesOpen ? 'open' : ''}`}>▼</span>
              </button>
              {mobilePoliciesOpen && (
                <div className="mobile-dropdown-content">
                  <Link  href="/return-refund-policy" onClick={toggleMenu}>Return & Refund</Link>
                  <Link  href="/privacy-policy" onClick={toggleMenu}>Privacy Policy</Link>
                  <Link  href="/shipping-policy" onClick={toggleMenu}>Shipping Policy</Link>
                  <Link  href="/terms-conditions" onClick={toggleMenu}>Terms & Conditions</Link>
                </div>
              )}
            </div>
            <Link  href="/checkout" onClick={toggleMenu}>CHECKOUT</Link>
            <Link  href="/blogs" onClick={toggleMenu}>BLOGS</Link>
            <Link  href="/custom" onClick={toggleMenu}>CUSTOM</Link>
            <Link  href="/faqs" onClick={toggleMenu}>FAQS</Link>
          </div>

          <div className="mobile-menu-user">
            {user ? (
              <div className="mobile-user-info">
                <div className="mobile-user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                <div className="mobile-user-details">
                  <p className="mobile-user-name">{user.name}</p>
                  <p className="mobile-user-email">{user.email}</p>
                </div>
                <button onClick={handleLogout} className="mobile-logout-btn">Logout</button>
              </div>
            ) : (
              <Link  href="/login" onClick={toggleMenu} className="mobile-login-btn">
                <HiOutlineUser size={20} />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {menuOpen && <div className="mobile-menu-overlay" onClick={toggleMenu}></div>}
      

    </header>
  );
};
export default Navbar;

