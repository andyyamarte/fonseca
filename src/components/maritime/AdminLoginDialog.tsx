"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useQuoteManifest } from "./QuoteManifestContext";

export function AdminLoginDialog() {
  const router = useRouter();
  const { adminDialogOpen, setAdminDialogOpen } = useQuoteManifest();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeAdminEmail, setActiveAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!adminDialogOpen) return;
    let active = true;
    fetch("/api/admin/session")
      .then((res) => res.json())
      .then((data: { authenticated?: boolean; admin?: { email?: string } | null }) => {
        if (!active) return;
        if (data.authenticated && data.admin?.email) {
          setActiveAdminEmail(data.admin.email);
        } else {
          setActiveAdminEmail(null);
        }
      })
      .catch(() => {
        if (active) setActiveAdminEmail(null);
      });
    return () => {
      active = false;
    };
  }, [adminDialogOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Acceso denegado.");
        return;
      }
      setAdminDialogOpen(false);
      setPassword("");
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Error de conexión al verificar credenciales.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={adminDialogOpen} onOpenChange={setAdminDialogOpen}>
      <DialogContent className="sm:max-w-md border-[#374470]/30 bg-[#081020] text-white shadow-2xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between pr-6">
            <Badge className="bg-amber-500/15 text-amber-300 border border-amber-400/30 font-mono text-[11px] uppercase tracking-wider">
              <Lock className="size-3 mr-1" />
              Solo Administrador
            </Badge>
          </div>
          <DialogTitle className="font-display text-2xl uppercase tracking-wide text-white flex items-center gap-2.5">
            <ShieldCheck className="size-6 text-sky-400" />
            Acceso Exclusivo Administrador
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-sm leading-relaxed">
            Portal privado para la administración de cotizaciones marítimas de{" "}
            <span className="text-white font-medium">Marine Suppliers Chile SPA</span>. No hay
            registro público ni cuentas de clientes.
          </DialogDescription>
        </DialogHeader>

        {activeAdminEmail ? (
          <div className="mt-2 space-y-4 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4">
            <div className="text-sm text-emerald-200">
              Sesión activa como <span className="font-mono font-semibold">{activeAdminEmail}</span>.
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold cursor-pointer"
                onClick={() => {
                  setAdminDialogOpen(false);
                  router.push("/admin");
                }}
              >
                Ir al Panel Admin
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="text-slate-200 text-xs uppercase tracking-wider">
                Correo de Administrador
              </Label>
              <Input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                placeholder="admin@marinesuppliers.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/15 text-white placeholder:text-slate-500 h-10 focus-visible:border-sky-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-slate-200 text-xs uppercase tracking-wider">
                Contraseña Maestra
              </Label>
              <Input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/15 text-white placeholder:text-slate-500 h-10 focus-visible:border-sky-400"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-200">
                <AlertCircle className="size-4 shrink-0 mt-0.5 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#374470] hover:bg-[#46568c] text-white font-semibold uppercase tracking-wider cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  Ingresar como Administrador
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
