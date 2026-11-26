"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Check,
  Plus,
  ArrowUpRight,
  Layers,
  CheckCircle2,
  ClipboardPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SUPPLY_DIVISIONS,
  type SupplyDivision,
  type SupplyDivisionCategory,
} from "@/data/maritime-data";
import { useQuoteManifest } from "./QuoteManifestContext";

gsap.registerPlugin(ScrollTrigger);

export function OfferDivisionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<SupplyDivisionCategory>("all");
  const [selectedDivision, setSelectedDivision] = useState<SupplyDivision | null>(null);
  const { addItem, hasItem, setManifestOpen } = useQuoteManifest();

  const filteredDivisions = useMemo(() => {
    if (activeTab === "all") return SUPPLY_DIVISIONS;
    return SUPPLY_DIVISIONS.filter((d) => d.category === activeTab);
  }, [activeTab]);

  useGSAP(
    () => {
      gsap.from(".division-header-el", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".division-card",
        { y: 32, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".divisions-grid",
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [activeTab] }
  );

  function handleToggleQuote(division: SupplyDivision) {
    addItem({
      id: division.id,
      title: division.title,
      code: division.impaRange,
      image: division.image,
    });
  }

  return (
    <section
      id="divisions"
      ref={sectionRef}
      className="relative bg-[#F6F6F6] py-20 sm:py-28 border-t border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="division-header-el flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#374470]">
              <Layers className="size-4 text-sky-600" />
              Catálogo Integral IMPA · 9 Divisiones
            </div>
            <h2 className="division-header-el font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#374470]">
              What We Offer
            </h2>
            <div className="division-header-el h-1 w-20 bg-[#374470]" />
            <p className="division-header-el text-slate-600 text-base sm:text-lg">
              Desde repuestos de sala de máquinas y publicaciones IMO hasta provisiones frescas y
              equipos certificados SOLAS. Haz clic en cualquier división para ver especificaciones o
              añadirla a tu manifiesto de cotización.
            </p>
          </div>

          {/* Interactive Filter Tabs (shadcn Tabs) */}
          <div className="division-header-el">
            <Tabs
              value={activeTab}
              onValueChange={(val) => setActiveTab(val as SupplyDivisionCategory)}
            >
              <TabsList className="flex-wrap h-auto bg-white border border-slate-200 p-1.5 shadow-sm gap-1">
                <TabsTrigger value="all" className="px-3 py-1.5 text-xs font-semibold cursor-pointer">
                  Todas (9)
                </TabsTrigger>
                <TabsTrigger
                  value="deck-safety"
                  className="px-3 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  Seguridad & SOLAS
                </TabsTrigger>
                <TabsTrigger
                  value="engine-chemical"
                  className="px-3 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  Máquinas & Químicos
                </TabsTrigger>
                <TabsTrigger
                  value="provisions-cabin"
                  className="px-3 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  Provisiones & Cabina
                </TabsTrigger>
                <TabsTrigger
                  value="navigation-office"
                  className="px-3 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  Cartas IMO & Oficina
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* 9 Divisions Grid */}
        <div className="divisions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDivisions.map((division, idx) => {
            const added = hasItem(division.id);
            const isPortrait = division.aspect === "portrait";

            return (
              <article
                key={division.id}
                className="division-card group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-[0_24px_50px_rgba(11,22,44,0.12)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Visual Image Stage */}
                <div className="relative h-64 w-full overflow-hidden bg-[#0B162C]">
                  <Image
                    src={division.image}
                    alt={division.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`${
                      isPortrait ? "object-contain p-4 bg-slate-100" : "object-cover"
                    } transition-transform duration-700 ease-out group-hover:scale-108`}
                  />
                  {!isPortrait && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081020]/80 via-[#081020]/15 to-transparent" />
                  )}

                  {/* Top Telemetry Overlay */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <Badge className="bg-[#081020]/80 text-white backdrop-blur-md border border-white/15 font-mono text-[11px]">
                      {String(idx + 1).padStart(2, "0")} · {division.impaRange}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => setSelectedDivision(division)}
                      aria-label={`Ver detalles de ${division.title}`}
                      className="size-8 rounded-full bg-white/90 text-[#081020] flex items-center justify-center shadow hover:bg-sky-400 hover:text-slate-950 transition-colors cursor-pointer"
                    >
                      <ArrowUpRight className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-sky-700 font-semibold">
                    {division.subtitle}
                  </div>
                  <h3 className="mt-1.5 font-display text-2xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-[#374470] transition-colors leading-tight">
                    {division.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
                    {division.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                    <Button
                      variant={added ? "secondary" : "default"}
                      size="sm"
                      onClick={() => handleToggleQuote(division)}
                      className={`flex-1 h-9 font-semibold cursor-pointer ${
                        added
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                          : "bg-[#374470] hover:bg-[#2a355a] text-white"
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="size-4" />
                          En Manifiesto
                        </>
                      ) : (
                        <>
                          <Plus className="size-4" />
                          Añadir a Cotización
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDivision(division)}
                      className="h-9 border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      Detalles
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Division Detail Dialog */}
      <Dialog
        open={Boolean(selectedDivision)}
        onOpenChange={(open) => !open && setSelectedDivision(null)}
      >
        <DialogContent className="sm:max-w-2xl bg-white text-slate-900 p-0 overflow-hidden">
          {selectedDivision && (
            <>
              <div className="relative h-60 w-full bg-[#081020]">
                <Image
                  src={selectedDivision.image}
                  alt={selectedDivision.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className={
                    selectedDivision.aspect === "portrait"
                      ? "object-contain p-4 bg-slate-100"
                      : "object-cover"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081020] via-[#081020]/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <Badge className="bg-amber-400 text-slate-950 font-mono text-xs mb-2">
                    {selectedDivision.impaRange}
                  </Badge>
                  <DialogHeader>
                    <DialogTitle className="font-display text-3xl uppercase tracking-wide text-white">
                      {selectedDivision.title}
                    </DialogTitle>
                    <DialogDescription className="text-sky-200 text-sm">
                      {selectedDivision.subtitle}
                    </DialogDescription>
                  </DialogHeader>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedDivision.description}
                </p>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2.5">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#374470] font-semibold">
                    Alcance de Suministro Habitual
                  </div>
                  {selectedDivision.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedDivision(null)}
                    className="cursor-pointer"
                  >
                    Cerrar
                  </Button>
                  <Button
                    onClick={() => {
                      handleToggleQuote(selectedDivision);
                      setSelectedDivision(null);
                      setManifestOpen(true);
                    }}
                    className="bg-[#374470] hover:bg-[#2a355a] text-white cursor-pointer"
                  >
                    <ClipboardPlus className="size-4" />
                    Añadir y Abrir Manifiesto
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
