"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MORDEC_SLIDES } from "@/data/maritime-data";

gsap.registerPlugin(ScrollTrigger);

export function MordecCatalogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const slide = MORDEC_SLIDES[currentPage];

  useGSAP(
    () => {
      gsap.from(".mordec-header", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    },
    { scope: sectionRef }
  );

  function goPage(dir: -1 | 1) {
    setCurrentPage((prev) => Math.max(0, Math.min(MORDEC_SLIDES.length - 1, prev + dir)));
  }

  return (
    <section id="mordec" ref={sectionRef} className="bg-white py-20 sm:py-28 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="mordec-header flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#374470]">
            <FileText className="size-4 text-sky-600" />
            Programa de Mantenimiento Preventivo
          </div>
          <h2 className="mordec-header font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#374470]">
            MORDEC ROPE PREVENTIVE MAINTENANCE PRODUCTS
          </h2>
          <div className="mordec-header h-1 w-20 bg-[#374470]" />
          <p className="mordec-header text-slate-600 text-base sm:text-lg">
            Catálogo interactivo del programa de protección y lubricación MORDEC™ para cables de
            acero, engranajes abiertos y equipos de cubierta. 8 páginas de especificaciones técnicas
            y aplicaciones marítimas.
          </p>
        </div>

        {/* Interactive Catalog Viewer */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-md overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[460px]">
            {/* Left: "Canvas" Visual Panel */}
            <div className="bg-[#081020] p-8 sm:p-10 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 nautical-grid opacity-30" />
              <div className="relative z-10 space-y-5">
                <Badge className="bg-amber-400 text-slate-950 font-mono text-xs">
                  Pág. {slide.page} de {MORDEC_SLIDES.length}
                </Badge>
                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
                  {slide.title}
                </h3>
                <div className="text-sky-300 font-mono text-sm uppercase tracking-wider">
                  {slide.subtitle}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs text-sky-200 font-mono uppercase tracking-wider backdrop-blur-sm">
                  <span className="size-2 rounded-full bg-amber-400" />
                  {slide.focusArea}
                </div>
              </div>
            </div>

            {/* Right: Technical Description Panel */}
            <div className="p-8 sm:p-10 flex flex-col justify-center space-y-5">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{slide.description}</p>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-[#374470] font-semibold">
                  Especificaciones Clave
                </div>
                {slide.keySpecs.map((spec) => (
                  <div key={spec} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Recomendado para:</span>{" "}
                {slide.recommendedFor}
              </div>

              <div className="text-[11px] text-slate-400 font-mono">
                Copyright © 2020 Mordec International Pte Ltd. All rights reserved.
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-6 py-5 border-t border-slate-200 bg-slate-50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goPage(-1)}
              disabled={currentPage === 0}
              className="cursor-pointer"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {MORDEC_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`size-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentPage ? "bg-[#374470] scale-125" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Ir a página ${idx + 1}`}
                />
              ))}
            </div>

            <span className="font-mono text-sm text-slate-600">
              {currentPage + 1}/{MORDEC_SLIDES.length}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => goPage(1)}
              disabled={currentPage === MORDEC_SLIDES.length - 1}
              className="cursor-pointer"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
