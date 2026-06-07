"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Package, ShoppingCart, Tag, MessageSquare, LogOut, Lock } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check for simple auth state in localStorage
    const auth = localStorage.getItem("zafira_admin_auth");
    if (auth === "true") {
      // Use setTimeout to avoid synchronous setState within effect warning
      setTimeout(() => setIsAuthenticated(true), 0);
    } else {
      setTimeout(() => setIsAuthenticated(false), 0);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "ranithudulneth@gmail.com" && password === "RanDul%3009") {
      setIsAuthenticated(true);
      localStorage.setItem("zafira_admin_auth", "true");
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("zafira_admin_auth");
  };

  const navItems = [
    { href: "/admin/orders", label: "Orders Pipeline", icon: ShoppingCart },
    { href: "/admin/products", label: "Products & Categories", icon: Package },
    { href: "/admin/offers", label: "Promotional Offers", icon: Tag },
    { href: "/admin/reviews", label: "Review Management", icon: MessageSquare },
  ];

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-brand-cream/30" />; // Loading state
  }

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-brand-cream/30 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded shadow-sm border border-brand-slate/10 w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-brand-charcoal" />
            </div>
            <h1 className="text-2xl font-medium text-brand-charcoal">Admin Portal</h1>
            <p className="text-sm text-brand-slate mt-1">Sign in to manage the store</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-brand-slate mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-brand-slate/20 rounded focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-slate mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-brand-slate/20 rounded focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-brand-charcoal text-white font-medium tracking-wide hover:bg-black transition-colors rounded mt-4"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream/30 flex pt-20">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-brand-slate/10 hidden lg:flex flex-col fixed h-[calc(100vh-5rem)]">
        <div className="p-6 border-b border-brand-slate/10">
          <h2 className="text-xl font-medium text-brand-charcoal tracking-wide">Admin Portal</h2>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-brand-slate hover:text-brand-charcoal hover:bg-brand-cream transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-brand-slate/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}
