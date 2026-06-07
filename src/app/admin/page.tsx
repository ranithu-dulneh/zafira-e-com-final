import { AdminLoginForm } from "./AdminLoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_auth")?.value === "true";

  if (isAuthenticated) {
    redirect("/admin/orders");
  }

  return (
    <div className="min-h-screen bg-brand-cream/30 flex flex-1 items-center justify-center p-4">
      <AdminLoginForm />
    </div>
  );
}
