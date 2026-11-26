"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Anchor,
  ShieldCheck,
  LogOut,
  Clock,
  CheckCircle2,
  Truck,
  Trash2,
  ArrowUpRight,
  FileText,
  Ship,
  Loader2,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { QuotationRecord, QuotationStatus } from "@/lib/quotations-store";

const STATUS_CONFIG: Record<
  QuotationStatus,
  { label: string; icon: React.ElementType; color: string; badgeClass: string }
> = {
  pending: {
    label: "Pendiente",
    icon: Clock,
    color: "text-amber-500",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  quoted: {
    label: "Cotizada",
    icon: FileText,
    color: "text-sky-500",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
  },
  dispatched: {
    label: "Despachada",
    icon: Truck,
    color: "text-emerald-500",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

interface AdminDashboardProps {
  admin: { email: string; role: "admin" };
  initialQuotations: QuotationRecord[];
}

export function AdminDashboard({ admin, initialQuotations }: AdminDashboardProps) {
  const router = useRouter();
  const [quotations, setQuotations] = useState(initialQuotations);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const res = await fetch("/api/quotations");
      const data = (await res.json()) as { quotations: QuotationRecord[] };
      if (data.quotations) setQuotations(data.quotations);
    } catch {
      /* noop */
    } finally {
      setRefreshing(false);
    }
  }

  async function handleStatusChange(id: string, status: QuotationStatus) {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/quotations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = (await res.json()) as { quotation: QuotationRecord };
        setQuotations((prev) =>
          prev.map((q) => (q.id === id ? data.quotation : q))
        );
      }
    } catch {
      /* noop */
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta cotización permanentemente?")) return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/quotations/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQuotations((prev) => prev.filter((q) => q.id !== id));
      }
    } catch {
      /* noop */
    } finally {
      setLoadingId(null);
    }
  }

  const stats = {
    total: quotations.length,
    pending: quotations.filter((q) => q.status === "pending").length,
    quoted: quotations.filter((q) => q.status === "quoted").length,
    dispatched: quotations.filter((q) => q.status === "dispatched").length,
  };

  return (
    <div className="min-h-screen bg-[#060D1A] text-white">
      {/* Admin Header */}
      <header className="border-b border-white/10 bg-[#081020]/95 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="relative size-9 rounded-full overflow-hidden border border-white/20">
                <Image
                  src="/images/logo-round.png"
                  alt="Marine Suppliers Chile"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="font-display text-lg font-bold uppercase tracking-wider text-white">
                Admin Panel
              </span>
            </a>
            <Badge className="bg-amber-500/15 text-amber-300 border border-amber-400/30 font-mono text-[10px] uppercase tracking-widest">
              <ShieldCheck className="size-3 mr-1" />
              Administrador
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-mono text-slate-400">
              {admin.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/")}
              className="border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              Sitio Público
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
            >
              <LogOut className="size-3.5" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Cotizaciones", value: stats.total, icon: Anchor, accent: "text-white" },
            { label: "Pendientes", value: stats.pending, icon: Clock, accent: "text-amber-400" },
            { label: "Cotizadas", value: stats.quoted, icon: FileText, accent: "text-sky-400" },
            {
              label: "Despachadas",
              value: stats.dispatched,
              icon: Truck,
              accent: "text-emerald-400",
            },
          ].map((stat) => (
            <Card
              key={stat.label}
              className="bg-white/5 border-white/10 text-white"
            >
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`size-5 ${stat.accent}`} />
              </CardHeader>
              <CardContent>
                <div className={`font-display text-4xl font-bold ${stat.accent}`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quotation List */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
            Cotizaciones Recibidas
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white cursor-pointer"
          >
            <RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
        </div>

        {quotations.length === 0 ? (
          <Card className="bg-white/5 border-white/10 text-white">
            <CardContent className="py-16 text-center">
              <Ship className="size-12 mx-auto text-slate-500 mb-4" />
              <p className="text-slate-400">
                No hay cotizaciones registradas aún. Las solicitudes del formulario público
                aparecerán aquí.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {quotations.map((qt) => {
              const statusCfg = STATUS_CONFIG[qt.status];
              const StatusIcon = statusCfg.icon;
              const isLoading = loadingId === qt.id;

              return (
                <Card
                  key={qt.id}
                  className="bg-white/5 border-white/10 text-white overflow-hidden"
                >
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1 space-y-3 min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-mono text-sm font-semibold text-sky-300">
                            {qt.id}
                          </span>
                          <Badge
                            className={`border font-mono text-[10px] uppercase tracking-widest ${statusCfg.badgeClass}`}
                          >
                            <StatusIcon className="size-3 mr-1" />
                            {statusCfg.label}
                          </Badge>
                          <span className="text-xs text-slate-500 font-mono">
                            {new Date(qt.createdAt).toLocaleDateString("es-CL", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                          <span className="font-display text-lg font-bold text-white uppercase tracking-wide">
                            <Ship className="size-4 inline mr-1.5 text-sky-400" />
                            {qt.vesselName}
                          </span>
                          <span className="text-slate-400">
                            Puerto: <span className="text-white font-medium">{qt.port}</span>
                          </span>
                        </div>

                        <div className="text-sm text-slate-300">
                          <span className="font-semibold text-white">{qt.contactName}</span> ·{" "}
                          <a
                            href={`mailto:${qt.email}`}
                            className="text-sky-400 hover:underline"
                          >
                            {qt.email}
                          </a>
                        </div>

                        <Separator className="bg-white/10" />

                        <div className="space-y-1.5">
                          <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
                            División: {qt.division}
                          </div>
                          {qt.items.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {qt.items.map((item) => (
                                <Badge
                                  key={item}
                                  variant="outline"
                                  className="text-[10px] border-white/15 text-slate-300"
                                >
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <p className="text-sm text-slate-400 italic mt-1">{qt.message}</p>
                          {qt.attachmentNames.length > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-sky-400">
                              <ArrowUpRight className="size-3" />
                              Adjuntos: {qt.attachmentNames.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col items-center gap-2 shrink-0">
                        {isLoading ? (
                          <div className="p-4">
                            <Loader2 className="size-5 animate-spin text-sky-400" />
                          </div>
                        ) : (
                          <>
                            {qt.status !== "quoted" && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(qt.id, "quoted")}
                                className="bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-400/30 cursor-pointer"
                              >
                                <CheckCircle2 className="size-3.5" />
                                Cotizar
                              </Button>
                            )}
                            {qt.status !== "dispatched" && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(qt.id, "dispatched")}
                                className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-400/30 cursor-pointer"
                              >
                                <Truck className="size-3.5" />
                                Despachar
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(qt.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
