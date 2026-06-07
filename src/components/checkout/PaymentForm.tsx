"use client";

import React, { useState } from "react";
import { UploadCloud, CheckCircle, CreditCard, Banknote } from "lucide-react";
import { DeliveryMethod } from "@/lib/firebase/schema";

export const PaymentForm = () => {
  const [method, setMethod] = useState<DeliveryMethod>("COD");
  const [isUploading, setIsUploading] = useState(false);
  const [receiptName, setReceiptName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setReceiptName(file.name);
        setIsUploading(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-brand-charcoal mb-4 border-b border-brand-slate/10 pb-2">Payment Method</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* COD Option */}
        <div
          onClick={() => setMethod("COD")}
          className={`cursor-pointer p-4 border rounded transition-all ${
            method === "COD"
              ? "border-brand-gold bg-brand-gold/5 ring-1 ring-brand-gold"
              : "border-brand-slate/20 hover:border-brand-slate/50"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-brand-charcoal flex items-center gap-2">
              <Banknote className="w-5 h-5 text-brand-slate" />
              Cash on Delivery
            </span>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${method === "COD" ? "border-brand-gold" : "border-brand-slate/30"}`}>
              {method === "COD" && <div className="w-2 h-2 rounded-full bg-brand-gold" />}
            </div>
          </div>
          <p className="text-sm text-brand-slate/80">Pay with cash upon delivery. Order status will remain pending until received.</p>
        </div>

        {/* Bank Deposit Option */}
        <div
          onClick={() => setMethod("BankDeposit")}
          className={`cursor-pointer p-4 border rounded transition-all ${
            method === "BankDeposit"
              ? "border-brand-gold bg-brand-gold/5 ring-1 ring-brand-gold"
              : "border-brand-slate/20 hover:border-brand-slate/50"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-brand-charcoal flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-slate" />
              Bank Transfer
            </span>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${method === "BankDeposit" ? "border-brand-gold" : "border-brand-slate/30"}`}>
              {method === "BankDeposit" && <div className="w-2 h-2 rounded-full bg-brand-gold" />}
            </div>
          </div>
          <p className="text-sm text-brand-slate/80">Transfer directly to our corporate bank account. Secure and direct.</p>
        </div>
      </div>

      {/* Bank Details & Dropzone */}
      {method === "BankDeposit" && (
        <div className="mt-6 p-6 bg-brand-cream border border-brand-slate/10 rounded animate-in fade-in duration-300">
          <h4 className="font-medium text-brand-charcoal mb-4">Corporate Bank Details</h4>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mb-6">
            <div className="text-brand-slate/60">Bank Name</div>
            <div className="font-medium text-brand-charcoal text-right">Commercial Bank</div>
            <div className="text-brand-slate/60">Account Name</div>
            <div className="font-medium text-brand-charcoal text-right">ZAFIRA Pvt Ltd</div>
            <div className="text-brand-slate/60">Account Number</div>
            <div className="font-medium text-brand-charcoal text-right tracking-wider">1234 5678 9012</div>
            <div className="text-brand-slate/60">Branch / Swift</div>
            <div className="font-medium text-brand-charcoal text-right">Colombo 01 / CBLK123</div>
          </div>

          <div className="relative border-2 border-dashed border-brand-slate/20 rounded p-6 text-center hover:bg-white/50 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-brand-slate">Uploading receipt...</span>
              </div>
            ) : receiptName ? (
              <div className="flex flex-col items-center gap-2 text-green-600">
                <CheckCircle className="w-8 h-8" />
                <span className="text-sm font-medium">{receiptName} uploaded</span>
                <span className="text-xs text-brand-slate mt-1">Click or drag to replace</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <UploadCloud className="w-8 h-8 text-brand-slate/50" />
                <span className="text-sm font-medium text-brand-charcoal">Upload Transfer Receipt</span>
                <span className="text-xs text-brand-slate">Drag & drop or click to browse (JPG, PNG, PDF)</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
