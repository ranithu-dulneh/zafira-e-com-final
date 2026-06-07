"use client";

import React, { useEffect } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    freeDeliveryOffer
  } = useAppContext();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const threshold = freeDeliveryOffer?.thresholdAmount || 5000;
  const amountToFreeDelivery = Math.max(0, threshold - cartTotal);
  const progressPercentage = Math.min(100, (cartTotal / threshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-slate/10">
              <h2 className="text-lg font-medium text-brand-charcoal flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Your Cart ({cartItems.length})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-brand-slate hover:text-brand-charcoal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Progress */}
            {freeDeliveryOffer?.isActive && (
              <div className="px-6 py-4 bg-brand-cream border-b border-brand-slate/10">
                <p className="text-sm text-center mb-2 font-medium text-brand-charcoal">
                  {amountToFreeDelivery > 0
                    ? `Add LKR ${amountToFreeDelivery.toLocaleString()} more to unlock Free Shipping!`
                    : "🎉 You've unlocked Free Shipping!"}
                </p>
                <div className="h-1.5 w-full bg-brand-slate/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    className="h-full bg-brand-gold transition-all duration-500"
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-brand-gold/50" />
                  </div>
                  <p className="text-brand-slate">Your cart is currently empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-sm font-medium border-b border-brand-charcoal pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cartItems.map((item) => (
                    <li key={item.productId} className="flex gap-4">
                      <div className="w-20 h-20 bg-brand-cream relative rounded overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-brand-slate/5" />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium text-brand-charcoal leading-tight">
                            {item.title}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-brand-slate/50 hover:text-brand-charcoal transition-colors ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <div className="flex items-center border border-brand-slate/20 rounded">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="px-2 py-1 text-brand-slate hover:bg-brand-slate/5 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="px-2 py-1 text-brand-slate hover:bg-brand-slate/5 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-medium text-brand-charcoal">
                            LKR {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-brand-slate/10 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-brand-slate">Subtotal</span>
                  <span className="text-lg font-medium text-brand-charcoal">
                    LKR {cartTotal.toLocaleString()}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full py-4 bg-brand-charcoal text-white text-center font-medium tracking-wide hover:bg-black transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <p className="text-xs text-center text-brand-slate/70 mt-4">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
