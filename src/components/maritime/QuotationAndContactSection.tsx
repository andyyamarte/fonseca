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
import { useQuoteManifest } from "./QuoteManifestContext";

gsap.registerPlugin(ScrollTrigger);

export function QuotationAndContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { items } = useQuoteManifest();
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
      division: items.length > 0 ? items.map((i) => i.title).join(", ") : "GENERAL",
      items: items.map((i) => `${i.code} — ${i.title}`),
      message: formData.get("message") as string,
      attachmentNames: [],
    };

    try {
      const res = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error || "Error al enviar");
      }
      setFormState("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error de conexión");
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
            Cotización & Contacto Directo
          </div>
          <h2 className="quote-section-reveal font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#374470]">
            Get Your Quotation
          </h2>
          <div className="quote-section-reveal h-1 w-20 bg-[#374470]" />
          <p className="quote-section-reveal text-slate-600 text-base sm:text-lg">
            Our mission is to supply your vessel with the best maritime industry equipment and ship
            stores, including provisions needed for your ship, all at the most competitive market
            prices. We are your trusted ship chandler, delivering on time, every time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form Panel */}
          <div className="quote-section-reveal rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-6">
              <Send className="size-5 text-[#374470]" />
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#374470]">
                Get in touch with us.
              </h3>
            </div>

            {formState === "success" ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="size-14 text-emerald-500 mx-auto" />
                <h4 className="font-display text-2xl font-bold uppercase text-emerald-700">
                  ¡Cotización Recibida!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Tu solicitud ha sido registrada exitosamente. Nuestro equipo operativo se pondrá en
                  contacto contigo en las próximas horas.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFormState("idle")}
                  className="mt-4 cursor-pointer"
                >
                  Enviar otra cotización
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs uppercase tracking-wider text-slate-600">
                      Name / Nombre
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Capt. / Ch. Eng."
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs uppercase tracking-wider text-slate-600">
                      Correo electrónico *
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
                      Nombre del Buque
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
                      Puerto de Arribo
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
                      Ítems del Manifiesto ({items.length})
                    </div>
                    {items.map((item) => (
                      <div key={item.id} className="text-xs text-sky-700">
                        {item.code} — {item.title}
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs uppercase tracking-wider text-slate-600">
                    Message / Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Describe tu requisición: listas IMPA, cantidades, ETA del buque, instrucciones especiales..."
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
                        <Loader2 className="size-4 animate-spin" /> Enviando...
                      </>
                    ) : (
                      <>
                        Send / Enviar
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
                  Contact us / Contáctanos
                </div>
                <div className="text-xs text-emerald-100">WhatsApp disponible 24/7</div>
              </div>
            </a>

            {/* Company Info */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#374470]">
                Marine Suppliers Chile SPA
              </h3>

              <div className="flex items-start gap-3 text-sm text-slate-700">
                <MapPin className="size-5 text-[#374470] shrink-0 mt-0.5" />
                <span>{SITE_CONTACT.address}</span>
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
                  href={SITE_CONTACT.emailHref}
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
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9!2d${SITE_CONTACT.coordinates.lng}!3d${SITE_CONTACT.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI0JzIzLjQiUyA3MMKwMzQnMjEuNyJX!5e0!3m2!1ses!2scl!4v1`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Marine Suppliers Chile location map"
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
                  GET DIRECTIONS
                </a>
              </div>
            </div>

            <Badge className="bg-slate-100 text-slate-500 font-mono text-[10px] border border-slate-200 px-3 py-1">
              Respuesta operativa en menos de 4 horas · Cotizaciones 24/7
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
