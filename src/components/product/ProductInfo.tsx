"use client";

import React, { useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Product } from "@/lib/firebase/schema";
import { motion, AnimatePresence } from "framer-motion";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { addToCart } = useAppContext();
  const [openAccordion, setOpenAccordion] = useState<string>("description");

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      price: product.basePrice,
      quantity: 1,
      image: product.images?.[0] || "",
    });
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-brand-gold fill-brand-gold" : "text-brand-slate/20"}`}
      />
    ));
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 pb-24 lg:pb-0">
        <h1 className="text-3xl font-medium text-brand-charcoal mb-2">{product.title}</h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center">
            {renderStars(product.ratingsAverage)}
            <span className="ml-2 text-sm text-brand-slate/60">({product.ratingsAverage} / 5)</span>
          </div>
        </div>

        <div className="text-2xl font-medium text-brand-charcoal mb-8">
          LKR {product.basePrice.toLocaleString()}
        </div>

        {/* Desktop Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="hidden lg:block w-full py-4 bg-brand-charcoal text-white font-medium tracking-wide hover:bg-black transition-colors mb-8"
        >
          Add to Cart
        </button>

        {/* Accordions */}
        <div className="border-t border-brand-slate/10">
          {[
            { id: "description", title: "Product Description", content: product.description },
            { id: "material", title: "Material & Care", content: "Crafted with precision using premium materials. To maintain the brilliance of your Zafira jewellery, avoid contact with perfumes, lotions, and harsh chemicals. Store in the provided pouch when not in use." },
            { id: "shipping", title: "Shipping & Returns", content: "Enjoy secure and fully insured delivery on all orders. We offer Cash on Delivery and direct Bank Deposit options. Returns are accepted within 14 days of purchase in original condition." },
          ].map((section) => (
            <div key={section.id} className="border-b border-brand-slate/10">
              <button
                onClick={() => setOpenAccordion(openAccordion === section.id ? "" : section.id)}
                className="w-full flex justify-between items-center py-4 text-left font-medium text-brand-charcoal"
              >
                {section.title}
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === section.id ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openAccordion === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-brand-slate/80 leading-relaxed text-sm">
                      {section.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Sticky Add to Cart */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-brand-slate/10 z-40">
        <button
          onClick={handleAddToCart}
          className="w-full py-4 bg-brand-charcoal text-white font-medium tracking-wide shadow-xl active:scale-[0.98] transition-transform"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
