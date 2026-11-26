"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, Anchor, Shield, Clock, Globe2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONTACT } from "@/data/maritime-data";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Global scroll progress bar at top edge
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
          },
        });
      }

      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-reveal", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.11,
      }).from(
        ".hero-stat",
        {
          y: 20,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
        },
        "-=0.45"
      );

      // Scroll parallax on background media
      if (bgLayerRef.current) {
        gsap.to(bgLayerRef.current, {
          yPercent: 18,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  function goToQuotation() {
    document.getElementById("quotation")?.scrollIntoView({ behavior: "smooth" });
  }

  function goToDivisions() {
    document.getElementById("divisions")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Top GSAP Scroll Telemetry Progress Line */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-sky-400 via-[#374470] to-amber-400 pointer-events-none"
      />

      <section
        id="hero"
        ref={containerRef}
        className="relative min-h-[96vh] w-full overflow-hidden bg-[#050B16] flex flex-col justify-between pt-28 pb-10"
      >
        {/* Parallax Background Media: Local Poster + Live Vimeo Loop */}
        <div
          ref={bgLayerRef}
          className="absolute inset-0 -top-10 -bottom-10 pointer-events-none select-none overflow-hidden"
        >
          <Image
            src="/images/hero-poster.jpg"
            alt="Marine Suppliers Chile port container vessel operations"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-75"
          />
          <iframe
            src={SITE_CONTACT.vimeoEmbedUrl}
            title="Marine Suppliers Chile Vessel Background Video"
            allow="autoplay; fullscreen; picture-in-picture"
            className="absolute top-1/2 left-1/2 min-w-[177.78vh] min-h-[100vw] w-full h-full -translate-x-1/2 -translate-y-1/2 opacity-80"
          />
          {/* Cinematic multi-stop dark maritime overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050B16]/80 via-[#071326]/55 to-[#050B16]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050B16]/85 via-transparent to-[#050B16]/60" />
          <div className="absolute inset-0 nautical-grid opacity-45" />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-auto pt-8">
          <div className="max-w-4xl space-y-7">
            <div className="hero-reveal flex flex-wrap items-center gap-3">
              <Badge className="bg-sky-500/15 text-sky-300 border border-sky-400/30 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] backdrop-blur-md">
                <span className="inline-block size-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                Chile Port Operations · {SITE_CONTACT.coordinates.label}
              </Badge>
              <Badge className="bg-amber-500/15 text-amber-300 border border-amber-400/30 px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] backdrop-blur-md">
                IMPA & SOLAS Standard
              </Badge>
            </div>

            <div className="hero-reveal space-y-2">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold uppercase tracking-tight text-white leading-[0.94] drop-shadow-2xl">
                Marine Suppliers
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
                  Chile SPA
                </span>
              </h1>
              <div className="flex items-center gap-4 pt-2">
                <span className="h-[2px] w-12 bg-amber-400" />
                <p className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.22em] text-amber-300">
                  Ship Chandler
                </p>
              </div>
            </div>

            <p className="hero-reveal max-w-2xl text-base sm:text-lg text-slate-200/95 leading-relaxed">
              Abastecimiento integral de naves en los principales puertos de Chile. Equipos
              técnicos IMPA, provisiones frescas, seguridad SOLAS, mantenimiento preventivo MORDEC™
              y entrega coordinada en muelle o lancha{" "}
              <span className="text-white font-semibold">antes de zarpar</span>.
            </p>

            <div className="hero-reveal flex flex-wrap items-center gap-4 pt-2">
              <Button
                size="lg"
                onClick={goToQuotation}
                className="h-14 px-8 rounded-none bg-white text-[#081020] hover:bg-sky-100 font-bold uppercase tracking-widest text-xs sm:text-sm shadow-[0_14px_35px_rgba(14,165,233,0.25)] transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Get a Quotation
                <ArrowDownRight className="size-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={goToDivisions}
                className="h-14 px-7 rounded-none border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-md font-semibold uppercase tracking-wider text-xs sm:text-sm cursor-pointer"
              >
                Explorar Catálogo IMPA
              </Button>

              <a
                href={SITE_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-2.5 border border-emerald-400/35 bg-[#455A64]/90 hover:bg-[#4F6672] px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4 text-emerald-300" />
                WhatsApp 24/7
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Glassmorphic Operational Telemetry Strip */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: Anchor,
                value: "09 Divisiones",
                label: "Engine, Deck, Cabin, SOLAS & Provisions",
              },
              {
                icon: Globe2,
                value: "11+ Puertos",
                label: "Cobertura nacional en costa chilena",
              },
              {
                icon: Shield,
                value: "Norma IMPA / IMO",
                label: "Equipos certificados & listas PSC",
              },
              {
                icon: Clock,
                value: "On Time, Every Time",
                label: "Despacho 24/7 antes del zarpe",
              },
            ].map((stat) => (
              <div
                key={stat.value}
                className="hero-stat rounded-xl border border-white/15 bg-[#081224]/75 backdrop-blur-xl px-4 py-3.5 flex items-start gap-3"
              >
                <div className="rounded-lg bg-[#374470]/60 p-2 text-sky-300 shrink-0">
                  <stat.icon className="size-4" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold uppercase tracking-wide text-white leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-300/80 mt-0.5 leading-snug">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
