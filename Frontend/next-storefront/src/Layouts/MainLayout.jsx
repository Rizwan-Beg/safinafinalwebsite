import { Footer } from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

import { usePathname as useLocation } from "next/navigation";;
import { useState } from "react";
// import Cart from "../components/cart/cart"; // make sure path is correct

function MainLayout({ children }) {
  const location = useLocation();
  const noNavFooter = location.pathname === "/login"; // hide for login page

  // state for cart visibility
  // const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {!noNavFooter && (
        <Navbar onCartClick={() => setIsCartOpen(true)} />
      )}

      <main className={`flex-grow ${!noNavFooter ? "pt-[50px]" : ""}`}>
        {children}
      </main>

      {!noNavFooter && <Footer />}

      {/* Cart overlay (fixed, always rendered at root level) */}
      {/* <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}
    </div>
  );
}

export default MainLayout;