"use client";

import { LogOut } from "lucide-react";
import { logoutAdmin } from "./actions";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logoutAdmin();
    router.push("/admin");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Secure Logout
    </button>
  );
}
