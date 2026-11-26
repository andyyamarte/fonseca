import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { listQuotations } from "@/lib/quotations-store";
import { AdminDashboard } from "@/components/maritime/AdminDashboard";

// This route reads the admin session cookie at request time.
export const instant = false;

export default async function AdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/");
  }

  const quotations = await listQuotations();

  return <AdminDashboard admin={admin} initialQuotations={quotations} />;
}
