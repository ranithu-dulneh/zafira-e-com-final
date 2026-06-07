"use client";

import { useState } from "react";
import { loginAdmin } from "./actions";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export function AdminLoginForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(formData);

    if (res.success) {
      router.push("/admin/orders");
      router.refresh();
    } else {
      setError(res.error || "Login failed");
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white border border-brand-slate/10 shadow-lg rounded-xl space-y-6">
      <div className="flex flex-col items-center justify-center space-y-2 mb-6">
        <div className="p-3 bg-brand-cream rounded-full">
          <Lock className="w-6 h-6 text-brand-charcoal" />
        </div>
        <h2 className="text-2xl font-semibold text-brand-charcoal tracking-wide">Admin Access</h2>
        <p className="text-sm text-brand-slate">Please enter your credentials to continue</p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-brand-charcoal mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-brand-slate/20 p-2.5 rounded-lg focus:ring-2 focus:ring-brand-charcoal/20 focus:border-brand-charcoal outline-none transition-all"
            placeholder="admin@zafira.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-charcoal mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full border border-brand-slate/20 p-2.5 rounded-lg focus:ring-2 focus:ring-brand-charcoal/20 focus:border-brand-charcoal outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-charcoal hover:bg-black text-white p-3 rounded-lg font-medium transition-colors disabled:opacity-70 flex items-center justify-center"
      >
        {isLoading ? "Authenticating..." : "Sign In"}
      </button>
    </form>
  );
}
