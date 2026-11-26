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
  SlidersHorizontal,
  ChevronDown,
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
import { useSitePreferences, type TranslationKey } from "./SitePreferencesContext";
import { localizeDivision } from "@/data/spanish-translations";

gsap.registerPlugin(ScrollTrigger);

export function OfferDivisionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<SupplyDivisionCategory>("all");
  const [selectedDivision, setSelectedDivision] = useState<SupplyDivision | null>(null);
  const { addItem, hasItem, setManifestOpen } = useQuoteManifest();
  const { language, t } = useSitePreferences();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filterTabs: { value: SupplyDivisionCategory; labelKey: TranslationKey }[] = [
    { value: "all", labelKey: "divisions.tab.all" },
    { value: "deck-safety", labelKey: "divisions.tab.deck" },
    { value: "engine-chemical", labelKey: "divisions.tab.engine" },
    { value: "provisions-cabin", labelKey: "divisions.tab.provisions" },
    { value: "navigation-office", labelKey: "divisions.tab.navigation" },
  ];

  const renderFilterTriggers = (compact: boolean) =>
    filterTabs.map((tab, index) => (
      <TabsTrigger
        key={tab.value}
        value={tab.value}
        className={
          compact
            ? `${index === 0 ? "col-span-2 " : ""}h-auto! min-h-9 w-full whitespace-normal! px-2 py-1 text-center text-[11px] font-semibold leading-tight cursor-pointer`
            : "px-3 py-1.5 text-xs font-semibold cursor-pointer"
        }
      >
        {t(tab.labelKey)}
      </TabsTrigger>
    ));

  const activeFilterLabel = t(
    filterTabs.find((tab) => tab.value === activeTab)?.labelKey ?? "divisions.tab.all",
  );

  const filteredDivisions = useMemo(() => {
    if (activeTab === "all") return SUPPLY_DIVISIONS;
    return SUPPLY_DIVISIONS.filter((d) => d.category === activeTab);
  }, [activeTab]);

  const selectedLocalized = selectedDivision
    ? localizeDivision(selectedDivision, language)
    : null;

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
        <div className="flex flex-col gap-8 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="division-header-el flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#374470]">
              <Layers className="size-4 text-sky-600" />
              {t("divisions.eyebrow")}
            </div>
            <h2 className="division-header-el font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#374470]">
              {t("divisions.title")}
            </h2>
            <div className="division-header-el h-1 w-20 bg-[#374470]" />
            <p className="division-header-el text-slate-600 text-base sm:text-lg">
              {t("divisions.text")}
            </p>
          </div>

          {/* Interactive Filter Tabs (shadcn Tabs) */}
          <div className="division-header-el flex justify-center">
            {/* Mobile: compact Filters button with collapsible options */}
            <div className="w-full sm:hidden">
              <button
                type="button"
                aria-expanded={filtersOpen}
                aria-controls="division-filters"
                onClick={() => setFiltersOpen((open) => !open)}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm cursor-pointer"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#374470]">
                  <SlidersHorizontal className="size-4 text-sky-600" />
                  {t("divisions.filters")}
                </span>
                <span className="flex min-w-0 items-center gap-2">
                  <span className="max-w-[150px] truncate text-xs font-medium text-slate-500">
                    {activeFilterLabel}
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-slate-500 transition-transform ${
                      filtersOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
              {filtersOpen && (
                <Tabs
                  className="mt-2 w-full items-center"
                  value={activeTab}
                  onValueChange={(val) => {
                    setActiveTab(val as SupplyDivisionCategory);
                    setFiltersOpen(false);
                  }}
                >
                  <TabsList
                    id="division-filters"
                    className="grid! h-auto! w-full! grid-cols-2 items-stretch! gap-1.5 rounded-lg bg-white border border-slate-200 p-1.5 shadow-sm"
                  >
                    {renderFilterTriggers(true)}
                  </TabsList>
                </Tabs>
              )}
            </div>

            {/* Desktop: centered single row */}
            <Tabs
              className="hidden w-full items-center sm:flex"
              value={activeTab}
              onValueChange={(val) => setActiveTab(val as SupplyDivisionCategory)}
            >
              <TabsList className="bg-white border border-slate-200 p-1.5 shadow-sm gap-1">
                {renderFilterTriggers(false)}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* 9 Divisions Grid */}
        <div className="divisions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDivisions.map((division, idx) => {
            const added = hasItem(division.id);
            const isPortrait = division.aspect === "portrait";
            const localized = localizeDivision(division, language);

            return (
              <article
                key={division.id}
                className="division-card group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-[0_24px_50px_rgba(11,22,44,0.12)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Visual Image Stage */}
                <div className="relative h-64 w-full overflow-hidden bg-[#0B162C]">
                  <Image
                    src={division.image}
                    alt={localized.alt}
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
                      aria-label={t("divisions.details", { title: localized.title })}
                      className="size-8 rounded-full bg-white/90 text-[#081020] flex items-center justify-center shadow hover:bg-sky-400 hover:text-slate-950 transition-colors cursor-pointer"
                    >
                      <ArrowUpRight className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-sky-700 font-semibold">
                    {localized.subtitle}
                  </div>
                  <h3 className="mt-1.5 font-display text-2xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-[#374470] transition-colors leading-tight">
                    {localized.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
                    {localized.description}
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
                          {t("divisions.inManifest")}
                        </>
                      ) : (
                        <>
                          <Plus className="size-4" />
                          {t("divisions.add")}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDivision(division)}
                      className="h-9 border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      {t("divisions.detailsBtn")}
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
          {selectedDivision && selectedLocalized && (
            <>
              <div className="relative h-60 w-full bg-[#081020]">
                <Image
                  src={selectedDivision.image}
                  alt={selectedLocalized.alt}
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
                      {selectedLocalized.title}
                    </DialogTitle>
                    <DialogDescription className="text-sky-200 text-sm">
                      {selectedLocalized.subtitle}
                    </DialogDescription>
                  </DialogHeader>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedLocalized.description}
                </p>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2.5">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#374470] font-semibold">
                    {t("divisions.scope")}
                  </div>
                  {selectedLocalized.highlights.map((item) => (
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
                    {t("divisions.close")}
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
                    {t("divisions.addOpen")}
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
