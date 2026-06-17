"use client";
import React, { useEffect, useContext } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { CurrencyContext } from "../../context/CurrencyContext";
import {
  getProductImageUrl,
  getProductTitle,
  getProductPrice,
} from "../../lib/product-image";
import "../../components/profile/Profile.css";

const Wishlist = () => {
  const { wishlistItems, addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { currency } = useContext(CurrencyContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveItem = (product) => {
    addToWishlist(product);
  };

  const handleAddToCartAndRemove = (product) => {
    addToCart(product);
    addToWishlist(product);
  };

  const productId = (item) => item.id || item._id;

  return (
    <div className={user ? "" : "profile-wishlist-page"}>
      <div className={user ? "" : "profile-container max-w-4xl mx-auto px-4"}>
        {!user && (
          <header className="text-center mb-12 pt-4">
            <Heart
              className="h-8 w-8 text-[#7A0C13] mx-auto mb-4"
              strokeWidth={1}
            />
            <h1 className="font-display text-4xl font-light text-black">
              Curated wishlist
            </h1>
            <p className="mt-3 text-sm text-black/50 max-w-md mx-auto">
              Pieces you have marked for future acquisition.
            </p>
          </header>
        )}



        {wishlistItems.length === 0 ? (
          <div className="profile-empty">
            <Heart className="profile-empty-icon" strokeWidth={1} />
            <h2 className="font-display text-2xl font-light mb-2">
              No pieces saved yet
            </h2>
            <p className="text-sm text-black/50 mb-6">
              Tap the heart on any rug to build your private edit.
            </p>
            <Link href="/catalog" className="profile-btn-primary inline-flex">
              Explore collection
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl">
            {wishlistItems.map((item) => {
              const { price, symbol } = getProductPrice(item, currency);
              const id = productId(item);
              return (
                <article key={id} className="profile-wishlist-item">
                  <Link href={`/product/${id}`} className="block">
                    <img
                      src={getProductImageUrl(item)}
                      alt={getProductTitle(item)}
                      className="profile-wishlist-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/400x400/f5f0ec/7a0c13?text=Safina";
                      }}
                    />
                  </Link>

                  <div className="text-center md:text-left min-w-0">
                    <Link href={`/product/${id}`}>
                      <h3 className="font-display text-xl font-light text-black hover:text-[#7A0C13] transition-colors truncate">
                        {getProductTitle(item)}
                      </h3>
                    </Link>
                    {(item.size || item.color || item.material) && (
                      <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2">
                        {[item.material, item.size, item.color]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                    <p className="font-display text-2xl text-[#7A0C13] mt-3">
                      {symbol}
                      {Number(price).toLocaleString(
                        currency === "USD" ? "en-US" : "en-IN"
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-end">
                    <button
                      type="button"
                      onClick={() => handleAddToCartAndRemove(item)}
                      className="profile-btn-primary w-full sm:w-auto"
                    >
                      <ShoppingBag size={14} />
                      Add to cart
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item)}
                      className="p-3 text-black/35 hover:text-[#7A0C13] transition-colors"
                      title="Remove from wishlist"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={18} strokeWidth={1.25} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
