import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { listQuotations } from "@/lib/quotations-store";
import { AdminDashboard } from "@/components/maritime/AdminDashboard";

export default async function AdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/");
  }

  const quotations = await listQuotations();

  return <AdminDashboard admin={admin} initialQuotations={quotations} />;
}
