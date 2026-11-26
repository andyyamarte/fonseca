"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MapPin,
  MessageCircle,
  Phone,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  Navigation,
  FileText,
  Paperclip,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SITE_CONTACT } from "@/data/maritime-data";
import { SPANISH_ADDRESS, localizeManifestItem } from "@/data/spanish-translations";
import { useQuoteManifest } from "./QuoteManifestContext";
import { useSitePreferences } from "./SitePreferencesContext";

gsap.registerPlugin(ScrollTrigger);

export function QuotationAndContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { items } = useQuoteManifest();
  const { language, t } = useSitePreferences();
  const localizedItems = items.map((item) => localizeManifestItem(item, language));
  const emailHref = `mailto:info@marinesuppliers.cl?subject=${encodeURIComponent(
    t("quote.emailSubject")
  )}&body=${encodeURIComponent(t("quote.emailBody"))}`;
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9!2d${SITE_CONTACT.coordinates.lng}!3d${SITE_CONTACT.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI0JzIzLjQiUyA3MMKwMzQnMjEuNyJX!5e0!3m2!1${language}!2scl!4v1`;
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useGSAP(
    () => {
      gsap.from(".quote-section-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    },
    { scope: sectionRef }
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const body = {
      contactName: formData.get("name") as string,
      email: formData.get("email") as string,
      vesselName: formData.get("vessel") as string,
      port: formData.get("port") as string,
      division:
        localizedItems.length > 0 ? localizedItems.map((i) => i.title).join(", ") : "GENERAL",
      items: localizedItems.map((i) => `${i.code} — ${i.title}`),
      message: formData.get("message") as string,
      attachmentNames: [],
    };

    try {
      const res = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-ui-language": language },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error || t("quote.errorDefault"));
      }
      setFormState("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : t("quote.connectionError"));
      setFormState("error");
    }
  }

  return (
    <section
      id="quotation"
      ref={sectionRef}
      className="bg-white py-20 sm:py-28 border-t border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="quote-section-reveal flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#374470]">
            <FileText className="size-4 text-sky-600" />
            {t("quote.eyebrow")}
          </div>
          <h2 className="quote-section-reveal font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#374470]">
            {t("quote.title")}
          </h2>
          <div className="quote-section-reveal h-1 w-20 bg-[#374470]" />
          <p className="quote-section-reveal text-slate-600 text-base sm:text-lg">
            {t("quote.text")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form Panel */}
          <div className="quote-section-reveal rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-6">
              <Send className="size-5 text-[#374470]" />
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#374470]">
                {t("quote.formTitle")}
              </h3>
            </div>

            {formState === "success" ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="size-14 text-emerald-500 mx-auto" />
                <h4 className="font-display text-2xl font-bold uppercase text-emerald-700">
                  {t("quote.successTitle")}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">{t("quote.successText")}</p>
                <Button
                  variant="outline"
                  onClick={() => setFormState("idle")}
                  className="mt-4 cursor-pointer"
                >
                  {t("quote.sendAnother")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs uppercase tracking-wider text-slate-600">
                      {t("quote.name")}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder={t("quote.namePlaceholder")}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs uppercase tracking-wider text-slate-600">
                      {t("quote.email")}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="ops@vessel.com"
                      className="bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="vessel" className="text-xs uppercase tracking-wider text-slate-600">
                      {t("quote.vessel")}
                    </Label>
                    <Input
                      id="vessel"
                      name="vessel"
                      placeholder="M/V Pacific Horizon"
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="port" className="text-xs uppercase tracking-wider text-slate-600">
                      {t("quote.port")}
                    </Label>
                    <Input
                      id="port"
                      name="port"
                      placeholder="Valparaíso, San Antonio..."
                      className="bg-white"
                    />
                  </div>
                </div>

                {items.length > 0 && (
                  <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 space-y-1.5">
                    <div className="text-xs font-mono uppercase tracking-wider text-sky-800 font-semibold flex items-center gap-1.5">
                      <Paperclip className="size-3.5" />
                      {t("quote.items", { count: localizedItems.length })}
                    </div>
                    {localizedItems.map((item) => (
                      <div key={item.id} className="text-xs text-sky-700">
                        {item.code} — {item.title}
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs uppercase tracking-wider text-slate-600">
                    {t("quote.message")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={t("quote.messagePlaceholder")}
                    className="bg-white resize-none"
                  />
                </div>

                {formState === "error" && errorMsg && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
                    {errorMsg}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={formState === "loading"}
                    className="h-12 px-8 bg-[#374470] hover:bg-[#2a355a] text-white font-bold uppercase tracking-wider cursor-pointer"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> {t("quote.sending")}
                      </>
                    ) : (
                      <>
                        {t("quote.send")}
                        <Send className="size-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info + Map Panel */}
          <div className="quote-section-reveal space-y-6">
            {/* WhatsApp CTA */}
            <a
              href={SITE_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-[#455A64] hover:bg-[#4F6672] p-4 text-white transition-colors"
            >
              <MessageCircle className="size-6 text-emerald-300" />
              <div>
                <div className="font-bold text-sm uppercase tracking-wider">
                  {t("quote.whatsapp")}
                </div>
                <div className="text-xs text-emerald-100">{t("quote.whatsappSub")}</div>
              </div>
            </a>

            {/* Company Info */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#374470]">
                Marine Suppliers Chile SPA
              </h3>

              <div className="flex items-start gap-3 text-sm text-slate-700">
                <MapPin className="size-5 text-[#374470] shrink-0 mt-0.5" />
                <span>{language === "es" ? SPANISH_ADDRESS : SITE_CONTACT.address}</span>
              </div>

              <Separator />

              <div className="space-y-2.5">
                {SITE_CONTACT.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="flex items-center gap-2.5 text-sm font-semibold text-[#374470] hover:text-sky-700 transition-colors"
                  >
                    <Phone className="size-4" />
                    {phone.display}
                  </a>
                ))}
                <a
                  href={emailHref}
                  className="flex items-center gap-2.5 text-sm font-semibold text-[#374470] hover:text-sky-700 transition-colors"
                >
                  <Mail className="size-4" />
                  {SITE_CONTACT.email}
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="relative w-full h-[320px]">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("quote.mapTitle")}
                  className="absolute inset-0"
                />
              </div>
              <div className="bg-white px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-slate-600">
                  <MapPin className="size-3.5 inline mr-1 text-[#374470]" />
                  Las Condes, Santiago
                </span>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${SITE_CONTACT.coordinates.lat},${SITE_CONTACT.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#374470] hover:text-sky-700 transition-colors"
                >
                  <Navigation className="size-3.5" />
                  {t("quote.directions")}
                </a>
              </div>
            </div>

            <Badge
              className="max-w-full justify-center text-center bg-slate-100 text-slate-500 font-mono text-[10px] border border-slate-200 px-3 py-1"
              style={{ whiteSpace: "normal", height: "auto" }}
            >
              {t("quote.response")}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
