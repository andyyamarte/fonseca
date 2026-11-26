"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin, MessageCircle, Phone, Mail, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CHILEAN_PORTS, SITE_CONTACT } from "@/data/maritime-data";

gsap.registerPlugin(ScrollTrigger);

export function PortTickerAndEmblem() {
  const sectionRef = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (tickerRef.current) {
        gsap.to(tickerRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 28,
          ease: "none",
        });
      }

      gsap.from(".emblem-reveal", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  const duplicatedPorts = [...CHILEAN_PORTS, ...CHILEAN_PORTS];

  return (
    <section ref={sectionRef} className="relative bg-[#DCDCDC] text-slate-900 overflow-hidden">
      {/* Infinite Maritime Port Coverage Ticker */}
      <div className="bg-[#0B162C] border-y border-white/10 py-3.5 overflow-hidden select-none">
        <div ref={tickerRef} className="flex w-max items-center gap-8 whitespace-nowrap">
          {duplicatedPorts.map((port, idx) => (
            <div key={`${port}-${idx}`} className="flex items-center gap-8">
              <span className="font-mono text-xs tracking-[0.24em] text-sky-200/90 uppercase font-medium">
                {port}
              </span>
              <span className="size-1.5 rounded-full bg-amber-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Brand Emblem & Direct Contact Split */}
      <div className="relative nautical-grid-light py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Official Ship-Bow Circular Emblem */}
            <div className="emblem-reveal lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[460px] rounded-2xl bg-white p-6 sm:p-8 shadow-[0_24px_70px_rgba(29,60,80,0.16)] border border-slate-300/80">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#374470] mb-4">
                  <span>OFFICIAL CHANDLER SEAL</span>
                  <span>EST. CHILE · IMPA</span>
                </div>
                <div className="relative aspect-[814/713] w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src="/images/logo-emblem.png"
                    alt="Marine Suppliers Chile SPA Ship Emblem"
                    fill
                    sizes="(max-width: 768px) 90vw, 440px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Contact Us / Direct Dispatch Column */}
            <div className="emblem-reveal lg:col-span-6 space-y-6">
              <Badge className="bg-[#374470] text-white font-mono text-xs uppercase tracking-widest px-3 py-1">
                <Navigation className="size-3.5 mr-1.5 text-sky-300" />
                Mesa de Despacho Portuario
              </Badge>

              <div className="space-y-3">
                <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#374470] leading-none">
                  Contact Us · Atención Directa
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-xl">
                  Coordinación inmediata para capitanes, jefes de máquinas y agencias navieras en
                  todo el litoral chileno. Respuesta ágil por WhatsApp, telefonía directa o correo
                  operativo.
                </p>
              </div>

              <div className="rounded-xl bg-white/85 backdrop-blur-sm border border-slate-300 p-5 space-y-3.5 shadow-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-[#374470] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-800">{SITE_CONTACT.address}</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                  {SITE_CONTACT.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#374470] hover:text-sky-700 transition-colors"
                    >
                      <Phone className="size-4" />
                      {phone.display}
                    </a>
                  ))}
                  <a
                    href={SITE_CONTACT.emailHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#374470] hover:text-sky-700 transition-colors"
                  >
                    <Mail className="size-4" />
                    {SITE_CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href={SITE_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center gap-3 bg-[#455A64] hover:bg-[#4F6672] px-7 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="size-5 text-emerald-300" />
                  WHATSAPP DIRECTO
                </a>

                <a
                  href="#quotation"
                  className="inline-flex h-13 items-center gap-2 border-2 border-[#374470] px-7 text-sm font-bold uppercase tracking-wider text-[#374470] hover:bg-[#374470] hover:text-white transition-all"
                >
                  Formulario de Cotización
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
