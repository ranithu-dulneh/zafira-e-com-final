"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useAppContext();
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "Sri Lanka",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    alert("Order placed successfully! Redirecting...");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-brand-cream/30">
        <h1 className="text-2xl font-medium text-brand-charcoal mb-4">Your cart is empty</h1>
        <Link href="/" className="px-6 py-3 bg-brand-charcoal text-white font-medium hover:bg-black transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 lg:pt-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <h1 className="text-3xl font-medium text-brand-charcoal mb-8 text-center lg:text-left">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-10">
            {/* Shipping Address */}
            <div>
              <h3 className="text-xl font-medium text-brand-charcoal mb-4 border-b border-brand-slate/10 pb-2">Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-brand-slate mb-1">Full Name</label>
                  <input required name="fullName" value={shippingDetails.fullName} onChange={handleInputChange} className="w-full p-3 border border-brand-slate/20 rounded focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-brand-slate mb-1">Email Address</label>
                  <input required type="email" name="email" value={shippingDetails.email} onChange={handleInputChange} className="w-full p-3 border border-brand-slate/20 rounded focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-brand-slate mb-1">Phone Number</label>
                  <input required type="tel" name="phone" value={shippingDetails.phone} onChange={handleInputChange} className="w-full p-3 border border-brand-slate/20 rounded focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-brand-slate mb-1">Street Address</label>
                  <input required name="streetAddress" value={shippingDetails.streetAddress} onChange={handleInputChange} className="w-full p-3 border border-brand-slate/20 rounded focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-brand-slate mb-1">City</label>
                  <input required name="city" value={shippingDetails.city} onChange={handleInputChange} className="w-full p-3 border border-brand-slate/20 rounded focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-brand-slate mb-1">Postal Code</label>
                  <input required name="postalCode" value={shippingDetails.postalCode} onChange={handleInputChange} className="w-full p-3 border border-brand-slate/20 rounded focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
              </div>
            </div>

            {/* Payment Method component */}
            <PaymentForm />
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-brand-cream/50 p-6 rounded border border-brand-slate/10 sticky top-32">
              <h3 className="text-lg font-medium text-brand-charcoal mb-6 border-b border-brand-slate/10 pb-2">Order Summary</h3>

              <ul className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <li key={item.productId} className="flex gap-4">
                    <div className="w-16 h-16 bg-white relative rounded overflow-hidden flex-shrink-0 border border-brand-slate/5">
                      {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-sm font-medium text-brand-charcoal line-clamp-1">{item.title}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-brand-slate">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium text-brand-charcoal">LKR {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-brand-slate/10 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-slate">Subtotal</span>
                  <span className="font-medium text-brand-charcoal">LKR {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-slate">Shipping</span>
                  <span className="text-brand-gold font-medium">Calculated at next step</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-brand-slate/10">
                  <span className="font-medium text-brand-charcoal">Total</span>
                  <span className="text-xl font-medium text-brand-charcoal">LKR {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-charcoal text-white font-medium tracking-wide hover:bg-black transition-colors"
              >
                Place Order
              </button>
              <p className="text-xs text-center text-brand-slate/50 mt-4 px-4">
                By placing this order, you agree to our Terms & Conditions and Privacy Policy.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
