"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const NAV_ITEMS = [
  { label: "Men's", href: "/category/mens" },
  { label: "Women's", href: "/category/womens" },
  { label: "Unisex", href: "/category/unisex" },
];

export const Header = () => {
  const { setIsCartOpen, cartItems } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-slate/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 -ml-2 text-brand-charcoal"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium tracking-wide text-brand-charcoal hover:text-brand-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Central Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-3xl font-serif tracking-widest text-brand-charcoal">ZAFIRA</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-slate/70 mt-1">Luxury Jewellery</span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <button className="text-brand-charcoal hover:text-brand-gold transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-brand-charcoal hover:text-brand-gold transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </button>
            <button
              className="text-brand-charcoal hover:text-brand-gold transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col pt-20 px-6 lg:hidden">
          <button
            className="absolute top-6 right-6 p-2 text-brand-charcoal"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <nav className="flex flex-col space-y-6 mt-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-2xl font-medium tracking-wide text-brand-charcoal"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
