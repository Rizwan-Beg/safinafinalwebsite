"use client";

import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { CartContext } from "../context/CartContext";
import useLenis from "../hooks/useLenis";

export default function MainLayoutClient({ children }: { children: React.ReactNode }) {
  useLenis();
  const pathname = usePathname();
  const { openCart } = useContext(CartContext);
  const noNavFooter = pathname === "/login" || pathname === "/verify-email" || pathname === "/checkout" || pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen">
      {!noNavFooter && <Navbar onCartClick={openCart} />}

      <main className={`flex-grow ${!noNavFooter ? "pt-[50px]" : ""}`}>
        {children}
      </main>

      {!noNavFooter && <Footer />}
    </div>
  );
}
