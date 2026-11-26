"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Loader2,
  KeyRound,
  CalendarClock,
  ArrowLeft,
  RefreshCw,
  Mail,
  Smartphone,
} from "lucide-react";
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
import { SITE_CONTACT } from "@/data/maritime-data";
import {
  clearAdminUiSession,
  writeAdminUiSession,
} from "@/lib/admin-ui-session";
import { useQuoteManifest } from "./QuoteManifestContext";
import { useSitePreferences } from "./SitePreferencesContext";

type Step = "credentials" | "code";

export function AdminLoginDialog() {
  const router = useRouter();
  const { adminDialogOpen, setAdminDialogOpen } = useQuoteManifest();
  const { language, t } = useSitePreferences();
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeAdminEmail, setActiveAdminEmail] = useState<string | null>(null);
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);

  useEffect(() => {
    if (!adminDialogOpen) return;
    let active = true;
    setChecking(true);

    fetch("/api/admin/session")
      .then((res) => res.json())
      .then(
        (data: {
          authenticated?: boolean;
          admin?: { email?: string } | null;
          expiresAt?: number;
        }) => {
          if (!active) return;
          if (data.authenticated && data.admin?.email) {
            setActiveAdminEmail(data.admin.email);
            setSessionExpiry(data.expiresAt ?? null);
            writeAdminUiSession({
              email: data.admin.email,
              expiresAt: data.expiresAt ?? Date.now(),
            });
          } else {
            clearAdminUiSession();
            setActiveAdminEmail(null);
            setSessionExpiry(null);
          }
        }
      )
      .catch(() => {
        if (active) {
          clearAdminUiSession();
          setActiveAdminEmail(null);
          setSessionExpiry(null);
        }
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [adminDialogOpen]);

  async function requestCode() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ui-language": language,
      },
      body: JSON.stringify({ email, password }),
    });
    const data = (await res.json()) as {
      error?: string;
      challengeId?: string;
      expiresAt?: number;
      devCode?: string;
    };
    if (!res.ok || !data.challengeId) {
      throw new Error(data.error || t("admin.denied"));
    }
    setChallengeId(data.challengeId);
    setDevCode(data.devCode ?? null);
    setCode("");
    setStep("code");
  }

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await requestCode();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("admin.connectionError"));
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!challengeId) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-ui-language": language,
        },
        body: JSON.stringify({ challengeId, code }),
      });
      const data = (await res.json()) as {
        error?: string;
        admin?: { email?: string };
        expiresAt?: number;
      };
      if (!res.ok || !data.admin?.email) {
        setError(data.error || t("admin.denied"));
        return;
      }
      writeAdminUiSession({
        email: data.admin.email,
        expiresAt: data.expiresAt ?? Date.now(),
      });
      setActiveAdminEmail(data.admin.email);
      setSessionExpiry(data.expiresAt ?? null);
      setPassword("");
      setCode("");
      setChallengeId(null);
      setAdminDialogOpen(false);
      router.push("/admin");
      router.refresh();
    } catch {
      setError(t("admin.connectionError"));
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError(null);
    setLoading(true);
    try {
      await requestCode();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("admin.connectionError"));
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    setStep("credentials");
    setChallengeId(null);
    setDevCode(null);
    setCode("");
    setError(null);
  }

  const expiryLabel = sessionExpiry
    ? new Date(sessionExpiry).toLocaleDateString(language === "es" ? "es-CL" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Dialog open={adminDialogOpen} onOpenChange={setAdminDialogOpen}>
      <DialogContent className="sm:max-w-md border-[#374470]/30 bg-[#081020] text-white shadow-2xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between pr-6">
            <Badge className="bg-amber-500/15 text-amber-300 border border-amber-400/30 font-mono text-[11px] uppercase tracking-wider">
              <Lock className="size-3 mr-1" />
              {t("admin.only")}
            </Badge>
          </div>
          <DialogTitle className="font-display text-2xl uppercase tracking-wide text-white flex items-center gap-2.5">
            <ShieldCheck className="size-6 text-sky-400" />
            {step === "code" ? t("admin.codeStepTitle") : t("admin.title")}
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-sm leading-relaxed">
            {step === "code" ? t("admin.codeStepText") : t("admin.text")}
          </DialogDescription>
        </DialogHeader>

        {checking ? (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-300">
            <Loader2 className="size-4 animate-spin" />
            {t("admin.checkingSession")}
          </div>
        ) : activeAdminEmail ? (
          <div className="mt-2 space-y-4 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4">
            <div className="text-sm text-emerald-200">
              {t("admin.activeSession", { email: activeAdminEmail })}
            </div>
            {expiryLabel && (
              <div className="flex items-center gap-2 text-xs text-emerald-100/80">
                <CalendarClock className="size-4 shrink-0" />
                {t("admin.nextVerification", { date: expiryLabel })}
              </div>
            )}
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold cursor-pointer"
                onClick={() => {
                  setAdminDialogOpen(false);
                  router.push("/admin");
                }}
              >
                {t("admin.goPanel")}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        ) : step === "credentials" ? (
          <form onSubmit={handleCredentials} className="mt-2 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="text-slate-200 text-xs uppercase tracking-wider">
                {t("admin.email")}
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
                {t("admin.password")}
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

            <div className="flex items-center gap-2 rounded-lg border border-sky-400/20 bg-sky-500/5 px-3 py-2.5 text-[11px] leading-relaxed text-slate-300">
              <Mail className="size-3.5 shrink-0 text-sky-400" />
              <span>{t("admin.codeStepText")}</span>
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
                  {t("admin.sending")}
                </>
              ) : (
                <>
                  {t("admin.sendCode")}
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="mt-2 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-code" className="flex items-center gap-2 text-slate-200 text-xs uppercase tracking-wider">
                <KeyRound className="size-3.5 text-sky-400" />
                {t("admin.code")}
              </Label>
              <Input
                id="admin-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]*"
                minLength={6}
                maxLength={6}
                required
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="bg-white/5 border-white/15 text-white placeholder:text-slate-500 h-12 tracking-[0.35em] font-mono text-center text-lg focus-visible:border-sky-400"
              />
              <p className="text-[11px] leading-relaxed text-slate-400">
                {t("admin.codeHint")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 shrink-0 text-sky-400" />
                <span className="truncate">{SITE_CONTACT.email}</span>
              </div>
              {SITE_CONTACT.phones.map((phone) => (
                <div className="flex items-center gap-2" key={phone.href}>
                  <Smartphone className="size-3.5 shrink-0 text-sky-400" />
                  <span>{phone.display}</span>
                </div>
              ))}
            </div>

            {devCode && (
              <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                {t("admin.devCode", { code: devCode })}
              </div>
            )}

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
                  {t("admin.verifying")}
                </>
              ) : (
                <>
                  {t("admin.verify")}
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>

            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-slate-300 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="size-4" />
                {t("admin.back")}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={loading}
                onClick={handleResend}
                className="text-sky-300 hover:text-sky-200 cursor-pointer"
              >
                <RefreshCw className="size-4" />
                {t("admin.resend")}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
