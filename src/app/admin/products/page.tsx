"use client";

import React, { useState } from "react";
import { Plus, Image as ImageIcon, Trash2 } from "lucide-react";

export default function AdminProductsPage() {
  const [activeTab, setActiveTab] = useState<"products" | "categories">("products");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-medium text-brand-charcoal mb-1">Dynamic Product & Sub-Category CRUD Engine</h1>
          <p className="text-sm text-brand-slate">Manage inventory, uploads, and category hierarchies.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-charcoal text-white text-sm font-medium hover:bg-black transition-colors rounded">
          <Plus className="w-4 h-4" />
          {activeTab === "products" ? "New Product" : "New Sub-Category"}
        </button>
      </div>

      <div className="flex gap-4 border-b border-brand-slate/10 pb-px">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "products" ? "border-brand-gold text-brand-charcoal" : "border-transparent text-brand-slate hover:text-brand-charcoal"}`}
        >
          Product Matrix
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "categories" ? "border-brand-gold text-brand-charcoal" : "border-transparent text-brand-slate hover:text-brand-charcoal"}`}
        >
          Category Hierarchy Manager
        </button>
      </div>

      {activeTab === "products" && (
        <div className="bg-white p-6 rounded shadow-sm border border-brand-slate/10">
          <h3 className="text-lg font-medium text-brand-charcoal mb-4">Integrated Product Upload Wizard</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-brand-slate mb-1">Product Title</label>
                <input type="text" className="w-full p-2 border border-brand-slate/20 rounded focus:border-brand-gold outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-brand-slate mb-1">Base Price (LKR)</label>
                  <input type="number" className="w-full p-2 border border-brand-slate/20 rounded focus:border-brand-gold outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-brand-slate mb-1">Stock Level</label>
                  <input type="number" className="w-full p-2 border border-brand-slate/20 rounded focus:border-brand-gold outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-brand-slate mb-1">Primary Category</label>
                  <select className="w-full p-2 border border-brand-slate/20 rounded focus:border-brand-gold outline-none bg-white">
                    <option>Men&apos;s</option>
                    <option>Women&apos;s</option>
                    <option>Unisex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-brand-slate mb-1">Sub Category</label>
                  <select className="w-full p-2 border border-brand-slate/20 rounded focus:border-brand-gold outline-none bg-white">
                    <option>Rings</option>
                    <option>Necklaces</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-brand-slate mb-1">Rich Description</label>
                <textarea rows={4} className="w-full p-2 border border-brand-slate/20 rounded focus:border-brand-gold outline-none"></textarea>
              </div>
            </div>

            <div>
              <label className="block text-sm text-brand-slate mb-1">Product Media (Firebase Storage)</label>
              <div className="border-2 border-dashed border-brand-slate/20 rounded-lg p-12 flex flex-col items-center justify-center text-center hover:bg-brand-cream/50 transition-colors cursor-pointer">
                <ImageIcon className="w-8 h-8 text-brand-slate/40 mb-2" />
                <span className="text-sm font-medium text-brand-charcoal">Drag & Drop Images</span>
                <span className="text-xs text-brand-slate mt-1">PNG, JPG, WebP up to 5MB</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "categories" && (
        <div className="bg-white p-6 rounded shadow-sm border border-brand-slate/10">
          <p className="text-sm text-brand-slate mb-6">Create, update, or permanently delete secondary sub-categories under major headers.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Men's", "Women's", "Unisex"].map((primary) => (
              <div key={primary} className="border border-brand-slate/10 rounded p-4">
                <h4 className="font-medium text-brand-charcoal mb-4 pb-2 border-b border-brand-slate/5">{primary}</h4>
                <ul className="space-y-2 mb-4">
                  <li className="flex justify-between items-center text-sm group">
                    <span className="text-brand-slate group-hover:text-brand-charcoal transition-colors">Rings</span>
                    <button className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3.5 h-3.5" /></button>
                  </li>
                  <li className="flex justify-between items-center text-sm group">
                    <span className="text-brand-slate group-hover:text-brand-charcoal transition-colors">Necklaces</span>
                    <button className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3.5 h-3.5" /></button>
                  </li>
                </ul>
                <div className="flex gap-2 mt-4">
                  <input type="text" placeholder="New sub-category..." className="w-full p-1.5 text-sm border border-brand-slate/20 rounded outline-none focus:border-brand-gold" />
                  <button className="px-3 py-1.5 bg-brand-cream text-brand-charcoal text-sm font-medium rounded hover:bg-brand-gold hover:text-white transition-colors">Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
