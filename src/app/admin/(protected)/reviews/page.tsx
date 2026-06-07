"use client";

import React from "react";
import { Check, X, Star } from "lucide-react";

const mockReviews = [
  { id: "REV-1", product: "Eternity Diamond Pendant", customer: "Sarah L.", rating: 5, comment: "Absolutely stunning piece. The craftsmanship is incredible and the packaging was luxurious.", status: "pending" },
  { id: "REV-2", product: "Gold Chain 18k", customer: "Mike T.", rating: 2, comment: "Looks smaller than in the pictures. Not very happy with the thickness.", status: "pending" },
  { id: "REV-3", product: "Pearl Drop Earrings", customer: "Emma W.", rating: 4, comment: "Beautiful earrings, exactly as described. Delivery took a day longer than expected though.", status: "approved" },
];

export default function AdminReviewsPage() {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-brand-gold fill-brand-gold" : "text-brand-slate/20"}`} />
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-brand-charcoal mb-1">Content Vetting & Review Management</h1>
        <p className="text-sm text-brand-slate">Moderate customer reviews before they appear on product pages.</p>
      </div>

      <div className="grid gap-4">
        {mockReviews.map((review) => (
          <div key={review.id} className="bg-white p-5 rounded shadow-sm border border-brand-slate/10 flex flex-col md:flex-row gap-4 justify-between">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="font-medium text-brand-charcoal">{review.customer}</span>
                <span className="text-brand-slate/30">•</span>
                <span className="text-sm text-brand-slate">on {review.product}</span>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(review.rating)}
              </div>
              <p className="text-sm text-brand-slate/80 leading-relaxed italic">
                &quot;{review.comment}&quot;
              </p>
            </div>

            <div className="flex items-start gap-2 pt-2 md:pt-0 shrink-0 border-t border-brand-slate/5 md:border-none mt-2 md:mt-0">
              {review.status === 'pending' ? (
                <>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded border border-green-200 hover:bg-green-100 transition-colors">
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded border border-red-200 hover:bg-red-100 transition-colors">
                    <X className="w-4 h-4" /> Reject
                  </button>
                </>
              ) : (
                <span className="px-3 py-1 bg-brand-cream text-brand-slate text-sm font-medium rounded border border-brand-slate/10">
                  Already Approved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
