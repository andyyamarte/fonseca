"use client";

import React from "react";
import Image from "next/image";
import { Anchor, Phone, Mail, MessageCircle, MapPin, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SITE_CONTACT } from "@/data/maritime-data";

export function Footer() {
  return (
    <footer className="bg-[#050B16] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative size-11 rounded-full overflow-hidden border border-white/20">
                <Image
                  src="/images/logo-round.png"
                  alt="Marine Suppliers Chile SPA"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-display text-lg font-bold uppercase tracking-wider text-white">
                  Marine Suppliers
                </div>
                <div className="font-mono text-[10px] text-sky-300 uppercase tracking-[0.22em]">
                  Chile SPA · Ship Chandler
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Ship chandler integral con cobertura en los principales puertos de Chile. Suministros
              IMPA, seguridad SOLAS, provisiones frescas y mantenimiento MORDEC™.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={SITE_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#455A64] hover:bg-[#4F6672] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors"
              >
                <MessageCircle className="size-4 text-emerald-300" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-sky-300">
              Contacto Directo
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-slate-300">
                <MapPin className="size-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{SITE_CONTACT.address}</span>
              </div>
              {SITE_CONTACT.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="size-4 text-slate-500" />
                  {phone.display}
                </a>
              ))}
              <a
                href={SITE_CONTACT.emailHref}
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="size-4 text-slate-500" />
                {SITE_CONTACT.email}
              </a>
            </div>
          </div>

          {/* Links & Certifications Column */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-sky-300">
              Legal & Certificaciones
            </h4>
            <div className="space-y-2">
              <a
                href="/privacy-policy"
                className="block text-sm text-slate-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-and-conditions"
                className="block text-sm text-slate-300 hover:text-white transition-colors"
              >
                Terms and Conditions
              </a>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["IMPA", "IMO", "SOLAS", "MARPOL", "STCW"].map((cert) => (
                <div
                  key={cert}
                  className="inline-flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-400"
                >
                  <Shield className="size-3 text-sky-500" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            <Anchor className="size-3.5 text-sky-500" />
            Copyright © {new Date().getFullYear()} Marine Suppliers Chile SPA — All rights reserved.
          </p>
          <p className="font-mono tracking-wider text-slate-600">
            IMPA · SOLAS · SHIP CHANDLER
          </p>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href={SITE_CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-40 size-14 rounded-full bg-[#374470] hover:bg-[#495a93] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(55,68,112,0.5)] transition-all hover:scale-110"
      >
        <MessageCircle className="size-6" />
      </a>
    </footer>
  );
}
