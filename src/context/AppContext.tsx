"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { OrderItem, Offer } from "@/lib/firebase/schema";

interface AppState {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartItems: OrderItem[];
  addToCart: (item: OrderItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  freeDeliveryOffer: Offer | null;
  setFreeDeliveryOffer: (offer: Offer | null) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [freeDeliveryOffer, setFreeDeliveryOffer] = useState<Offer | null>(null);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (item: OrderItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  return (
    <AppContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        freeDeliveryOffer,
        setFreeDeliveryOffer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
