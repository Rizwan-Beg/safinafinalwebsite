"use client";
import React, { useEffect } from 'react';
import Link from "next/link";;
import './Shop.css';

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shopCategories = {
    size: {
      title: "SIZE",
      icon: "📏",
      items: [
        { name: "2X3 FT", link: "/catalog?size=2x3ft" },
        { name: "3X5 FT", link: "/catalog?size=3x5ft" },
        { name: "4X6 FT", link: "/catalog?size=4x6ft" },
        { name: "5X7 FT", link: "/catalog?size=5x7ft" },
        { name: "6X9 FT", link: "/catalog?size=6x9ft" },
        { name: "8X10 FT", link: "/catalog?size=8x10ft" },
        { name: "9X12 FT", link: "/catalog?size=9x12ft" },
        { name: "10X14 FT", link: "/catalog?size=10x14ft" },
        { name: "12X15 FT", link: "/catalog?size=12x15ft" },
        { name: "SMALL", link: "/catalog?size=small" },
        { name: "MEDIUM", link: "/catalog?size=medium" },
        { name: "LARGE", link: "/catalog?size=large" },
        { name: "OVERSIZE", link: "/catalog?size=oversize" }
      ]
    },
    colors: {
      title: "COLORS",
      icon: "🎨",
      items: [
        { name: "BLUE", link: "/catalog?color=blue", color: "#4A90E2" },
        { name: "RED", link: "/catalog?color=red", color: "#E74C3C" },
        { name: "GREEN", link: "/catalog?color=green", color: "#27AE60" },
        { name: "YELLOW", link: "/catalog?color=yellow", color: "#F1C40F" },
        { name: "IVORY / WHITE", link: "/catalog?color=ivory-white", color: "#FFF8DC" },
        { name: "GREY", link: "/catalog?color=grey", color: "#95A5A6" },
        { name: "BLACK", link: "/catalog?color=black", color: "#2C3E50" },
        { name: "ORANGE", link: "/catalog?color=orange", color: "#E67E22" },
        { name: "PINK", link: "/catalog?color=pink", color: "#E91E63" },
        { name: "PURPLE", link: "/catalog?color=purple", color: "#9B59B6" },
        { name: "BROWN", link: "/catalog?color=brown", color: "#8B4513" },
        { name: "BEIGE", link: "/catalog?color=beige", color: "#F5F5DC" },
        { name: "MULTI COLOR", link: "/catalog?color=multi-color", color: "linear-gradient(45deg, #E74C3C, #F1C40F, #27AE60, #4A90E2)" }
      ]
    },
    room: {
      title: "ROOM",
      icon: "🏠",
      items: [
        { name: "LIVING ROOM", link: "/catalog?room=living-room" },
        { name: "DINING ROOM", link: "/catalog?room=dining-room" },
        { name: "BEDROOM", link: "/catalog?room=bedroom" },
        { name: "KIDS ROOM", link: "/catalog?room=kids-room" },
        { name: "OUTDOOR/INDOOR", link: "/catalog?room=outdoor-indoor" }
      ]
    },
    shape: {
      title: "SHAPE",
      icon: "⬜",
      items: [
        { name: "RECTANGLE", link: "/catalog?shape=rectangle" },
        { name: "IRREGULAR", link: "/catalog?shape=irregular" },
        { name: "ROUND", link: "/catalog?shape=round" },
        { name: "RUNNER", link: "/catalog?shape=runner" },
        { name: "OVAL", link: "/catalog?shape=oval" },
        { name: "SQUARE", link: "/catalog?shape=square" }
      ]
    },
    material: {
      title: "MATERIAL",
      icon: "🧵",
      items: [
        { name: "WOOL", link: "/catalog?material=wool" },
        { name: "WOOL & BAMBOO SILK", link: "/catalog?material=wool-bamboo-silk" },
        { name: "WOOL & SILK", link: "/catalog?material=wool-silk" },
        { name: "SILK", link: "/catalog?material=silk" },
        { name: "VISCOSE", link: "/catalog?material=viscose" },
        { name: "JUTE & HEMP", link: "/catalog?material=jute-hemp" },
        { name: "COTTON", link: "/catalog?material=cotton" },
        { name: "POLYESTER", link: "/catalog?material=polyester" },
        { name: "AFGHAN WOOL", link: "/catalog?material=afghan-wool" },
        { name: "ACRYLIC", link: "/catalog?material=acrylic" },
        { name: "BAMBOO SILK AND ZARI", link: "/catalog?material=bamboo-silk-zari" }
      ]
    },
    construction: {
      title: "CONSTRUCTION",
      icon: "🔨",
      items: [
        { name: "HAND KNOTTED", link: "/catalog?construction=hand-knotted" },
        { name: "HAND TUFTED", link: "/catalog?construction=hand-tufted" },
        { name: "HAND LOOM", link: "/catalog?construction=hand-loom" },
        { name: "FLAT WEAVES", link: "/catalog?construction=flat-weaves" },
        { name: "SHAG", link: "/catalog?construction=shag" }
      ]
    }
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Shop Our Collection</h1>
        <p>Discover our exquisite range of handcrafted rugs by category</p>
      </div>

      <div className="shop-categories">
        {Object.entries(shopCategories).map(([key, category]) => (
          <div key={key} className="category-section">
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h2>{category.title}</h2>
            </div>
            
            <div className="category-grid">
              {category.items.map((item, index) => (
                <Link key={index} href={item.link} 
                  className="category-item"
                  style={item.color ? {
                    background: item.color.includes('gradient') ? item.color : `${item.color}20`,
                    borderColor: item.color.includes('gradient') ? '#8B4513' : item.color
                  } : {}}
                >
                  {item.color && !item.color.includes('gradient') && (
                    <div 
                      className="color-preview" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                  )}
                  {item.color && item.color.includes('gradient') && (
                    <div 
                      className="color-preview gradient" 
                      style={{ background: item.color }}
                    ></div>
                  )}
                  <span className="item-name">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="shop-footer">
        <div className="footer-content">
          <h3>Need Help Finding the Perfect Rug?</h3>
          <p>Our experts are here to help you choose the ideal rug for your space.</p>
          <div className="footer-actions">
            <Link  href="/custom" className="btn-primary">Custom Design</Link>
            <Link  href="/faqs" className="btn-secondary">View FAQs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;