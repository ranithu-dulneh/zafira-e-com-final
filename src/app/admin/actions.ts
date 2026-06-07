"use server";

import { cookies } from "next/headers";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === "ranithudulneth@gmail.com" && password === "RanDul%3009") {
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return { success: true };
  }

  return { success: false, error: "Invalid credentials" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
}
