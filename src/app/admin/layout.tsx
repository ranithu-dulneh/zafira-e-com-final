import React from "react";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Tag, MessageSquare, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: "/admin/orders", label: "Orders Pipeline", icon: ShoppingCart },
    { href: "/admin/products", label: "Products & Categories", icon: Package },
    { href: "/admin/offers", label: "Promotional Offers", icon: Tag },
    { href: "/admin/reviews", label: "Review Management", icon: MessageSquare },
  ];

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
          <button className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors">
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
