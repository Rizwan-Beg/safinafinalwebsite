"use client";

import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import RegionBanner from "./CountryLanguageSelector/RegionBanner";
import { CartContext } from "../context/CartContext";
export default function MainLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { openCart } = useContext(CartContext);
  const noNavFooter = pathname === "/login" || pathname === "/verify-email" || pathname === "/checkout" || pathname === "/register" || pathname.startsWith("/visualizer/room");

  return (
    <div className="flex flex-col min-h-screen">
      {!noNavFooter && <Navbar onCartClick={openCart} />}

      <main className="flex-grow">
        {children}
      </main>

      {!noNavFooter && <Footer />}
    </div>
  );
}
