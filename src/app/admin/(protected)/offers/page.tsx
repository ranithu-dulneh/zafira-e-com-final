"use client";

import React, { useState } from "react";
import { Save, AlertCircle } from "lucide-react";

export default function AdminOffersPage() {
  const [isActive, setIsActive] = useState(true);
  const [threshold, setThreshold] = useState("5000");

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-brand-charcoal mb-1">Dynamic Promotional Offer Matrix</h1>
        <p className="text-sm text-brand-slate">Configure site-wide conversion offers and cart drawer logic.</p>
      </div>

      <div className="bg-white p-6 rounded shadow-sm border border-brand-slate/10 space-y-6">
        <div className="flex items-start justify-between pb-6 border-b border-brand-slate/10">
          <div>
            <h3 className="text-lg font-medium text-brand-charcoal">Free Delivery Threshold</h3>
            <p className="text-sm text-brand-slate mt-1 max-w-md">
              When active, the cart drawer will dynamically calculate and prompt users to add more items to reach this LKR threshold.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            <div className="w-11 h-6 bg-brand-slate/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gold"></div>
            <span className="ml-3 text-sm font-medium text-brand-charcoal">{isActive ? 'Active' : 'Inactive'}</span>
          </label>
        </div>

        <div className={`space-y-4 ${!isActive ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-1">Threshold Amount (LKR)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-slate/50">LKR</span>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full pl-12 p-3 text-lg border border-brand-slate/20 rounded focus:outline-none focus:border-brand-gold font-medium text-brand-charcoal"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 text-sm rounded border border-blue-100">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>Changes saved here will immediately reflect on the storefront client-side banner logic via Firestore.</p>
          </div>
        </div>

        <div className="pt-4">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-charcoal text-white font-medium hover:bg-black transition-colors rounded">
            <Save className="w-4 h-4" />
            Save Offer Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
