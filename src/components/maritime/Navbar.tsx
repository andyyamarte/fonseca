"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Anchor,
  ClipboardList,
  Menu,
  Search,
  ShieldCheck,
  Trash2,
  ArrowRight,
  Compass,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  FEATURED_PRODUCTS,
  SITE_CONTACT,
  SUPPLY_DIVISIONS,
} from "@/data/maritime-data";
import { useQuoteManifest } from "./QuoteManifestContext";
import { PreferencesToggle } from "./PreferencesToggle";
import { useSitePreferences } from "./SitePreferencesContext";
import {
  localizeDivision,
  localizeManifestItem,
  localizeProduct,
} from "@/data/spanish-translations";

export function Navbar() {
  const {
    items,
    removeItem,
    clearItems,
    manifestOpen,
    setManifestOpen,
    setAdminDialogOpen,
  } = useQuoteManifest();
  const { language, t } = useSitePreferences();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { divisions: [], products: [] };
    return {
      divisions: SUPPLY_DIVISIONS.map((division) => localizeDivision(division, language)).filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.subtitle.toLowerCase().includes(q) ||
          d.impaRange.toLowerCase().includes(q)
      ),
      products: FEATURED_PRODUCTS.map((product) => localizeProduct(product, language)).filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.impaCode.toLowerCase().includes(q) ||
          p.division.toLowerCase().includes(q)
      ),
    };
  }, [searchQuery, language]);

  function scrollToSection(id: string) {
    setMenuOpen(false);
    setManifestOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#050B16]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_12px_40px_rgba(3,9,20,0.45)] py-2.5"
            : "bg-gradient-to-b from-[#050B16]/85 via-[#050B16]/45 to-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label={t("nav.mainPage")}
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/25 bg-[#1D3C50]/80 shadow-md transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo-round.png"
                alt="Marine Suppliers Chile SPA"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-white uppercase leading-none">
                Marine Suppliers
              </span>
              <span className="font-mono text-[10px] tracking-[0.22em] text-sky-300 uppercase mt-1">
                {t("brand.tagline")}
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
            <a href="#divisions" className="hover:text-sky-300 transition-colors">
              {t("nav.divisions")}
            </a>
            <a href="#featured-impa" className="hover:text-sky-300 transition-colors">
              {t("nav.featured")}
            </a>
            <a href="#mordec" className="hover:text-sky-300 transition-colors">
              {t("nav.mordec")}
            </a>
            <a href="#operations" className="hover:text-sky-300 transition-colors">
              {t("nav.operations")}
            </a>
            <a href="#quotation" className="hover:text-sky-300 transition-colors">
              {t("nav.quotation")}
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <PreferencesToggle />

            <Button
              variant="outline"
              size="sm"
              onClick={() => setManifestOpen(true)}
              className="relative h-9 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white cursor-pointer backdrop-blur-md"
            >
              <ClipboardList className="size-4 text-sky-300" />
              <span className="hidden sm:inline">{t("nav.quoteList")}</span>
              {items.length > 0 && (
                <Badge className="ml-0.5 h-5 min-w-5 px-1.5 bg-amber-500 text-slate-950 font-mono text-[11px] font-bold">
                  {items.length}
                </Badge>
              )}
            </Button>

            <Button
              size="sm"
              onClick={() => setAdminDialogOpen(true)}
              className="hidden sm:inline-flex h-9 bg-[#374470] hover:bg-[#495a93] text-white border border-sky-300/20 cursor-pointer"
            >
              <ShieldCheck className="size-4 text-sky-300" />
              <span>{t("nav.adminAccess")}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(true)}
              aria-label={t("nav.openMenu")}
              className="h-9 w-9 text-white hover:bg-white/15 hover:text-white cursor-pointer"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation & Product Search Drawer (Admin-only auth, zero Orders/My Account) */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-[#060D1A] border-l border-white/10 text-white p-0 flex flex-col"
        >
          <SheetHeader className="p-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/20">
                <Image
                  src="/images/logo-round.png"
                  alt="Marine Suppliers Chile"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <SheetTitle className="font-display text-xl uppercase tracking-wider text-white">
                  Marine Suppliers Chile
                </SheetTitle>
                <SheetDescription className="text-xs font-mono text-sky-300/80 uppercase tracking-widest">
                  {t("drawer.title")}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Search Products */}
            <div className="space-y-2.5">
              <label
                htmlFor="drawer-search"
                className="text-xs font-mono uppercase tracking-wider text-slate-400"
              >
                {t("drawer.searchLabel")}
              </label>
              <div className="relative">
                <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="drawer-search"
                  placeholder={t("drawer.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white/5 border-white/15 text-white placeholder:text-slate-500 h-10"
                />
              </div>

              {searchQuery.trim() && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 space-y-2 max-h-56 overflow-y-auto">
                  {searchResults.divisions.length === 0 &&
                  searchResults.products.length === 0 ? (
                    <p className="text-xs text-slate-400">{t("drawer.noResults")}</p>
                  ) : (
                    <>
                      {searchResults.divisions.map((div) => (
                        <button
                          key={div.id}
                          onClick={() => scrollToSection("divisions")}
                          className="w-full text-left flex items-center justify-between rounded-md px-2.5 py-2 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <div>
                            <div className="text-xs font-semibold text-white">{div.title}</div>
                            <div className="text-[11px] text-slate-400">{div.impaRange}</div>
                          </div>
                          <ArrowRight className="size-3.5 text-sky-400" />
                        </button>
                      ))}
                      {searchResults.products.map((prod) => (
                        <button
                          key={prod.id}
                          onClick={() => scrollToSection("featured-impa")}
                          className="w-full text-left flex items-center justify-between rounded-md px-2.5 py-2 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <div>
                            <div className="text-xs font-semibold text-white">{prod.name}</div>
                            <div className="text-[11px] font-mono text-amber-300">
                              {prod.impaCode}
                            </div>
                          </div>
                          <ArrowRight className="size-3.5 text-sky-400" />
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            <Separator className="bg-white/10" />

            {/* Navigation Links */}
            <div className="space-y-1.5">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                {t("drawer.sections")}
              </div>
              {[
                { id: "hero", key: "drawer.nav.hero" as const },
                { id: "divisions", key: "drawer.nav.divisions" as const },
                { id: "featured-impa", key: "drawer.nav.featured" as const },
                { id: "mordec", key: "drawer.nav.mordec" as const },
                { id: "operations", key: "drawer.nav.operations" as const },
                { id: "quotation", key: "drawer.nav.quotation" as const },
              ].map((navItem) => (
                <button
                  key={navItem.id}
                  onClick={() => scrollToSection(navItem.id)}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Compass className="size-4 text-sky-400" />
                    {t(navItem.key)}
                  </span>
                  <ArrowRight className="size-3.5 text-slate-500" />
                </button>
              ))}
            </div>

            <Separator className="bg-white/10" />

            {/* Administrator-Only Access Block (Replacing Sign In / Orders / My Account) */}
            <div className="rounded-xl border border-[#374470]/60 bg-[#374470]/20 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-300">
                <ShieldCheck className="size-4" />
                {t("drawer.adminOnly")}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t("drawer.adminText")}
              </p>
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  setAdminDialogOpen(true);
                }}
                className="w-full bg-[#374470] hover:bg-[#495a93] text-white cursor-pointer"
              >
                <ShieldCheck className="size-4" />
                {t("drawer.adminLogin")}
              </Button>
            </div>
          </div>

          <div className="p-5 border-t border-white/10 bg-black/30 flex items-center justify-between text-xs text-slate-400">
            <a
              href={SITE_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <PhoneCall className="size-3.5" />
              {t("common.whatsapp")}
            </a>
            <span className="font-mono">{t("common.impaSolas")}</span>
          </div>
        </SheetContent>
      </Sheet>

      {/* Quote Manifest Drawer */}
      <Sheet open={manifestOpen} onOpenChange={setManifestOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-[#060D1A] border-l border-white/10 text-white p-0 flex flex-col"
        >
          <SheetHeader className="p-6 pb-4 border-b border-white/10">
            <SheetTitle className="font-display text-2xl uppercase tracking-wide text-white flex items-center gap-2">
              <Anchor className="size-5 text-sky-400" />
              {t("manifest.title")}
            </SheetTitle>
            <SheetDescription className="text-slate-300 text-xs">
              {t("manifest.description")}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {items.length === 0 && (
              <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-8 text-center space-y-3">
                <ClipboardList className="size-10 mx-auto text-slate-500" />
                <div className="text-sm font-medium text-slate-200">
                  {t("manifest.empty")}
                </div>
                <p className="text-xs text-slate-400">{t("manifest.emptyHint")}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToSection("divisions")}
                  className="border-white/20 bg-white/5 text-white hover:bg-white/15 cursor-pointer"
                >
                  {t("manifest.explore")}
                </Button>
              </div>
            )}

            {items.length > 0 && (
              items.map((item) => {
                const localized = localizeManifestItem(item, language);
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-900">
                      <Image
                        src={item.image}
                        alt={localized.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[11px] text-amber-300">{localized.code}</div>
                      <div className="text-sm font-medium text-white truncate">
                        {localized.title}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeItem(item.id)}
                      aria-label={t("manifest.removeItem", { item: localized.title })}
                      className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                );
              }))}
          </div>

          <div className="p-6 border-t border-white/10 bg-black/40 space-y-3">
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearItems}
                className="w-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                {t("manifest.clear")}
              </Button>
            )}
            <Button
              onClick={() => scrollToSection("quotation")}
              className="w-full h-11 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold uppercase tracking-wider cursor-pointer"
            >
              {t("manifest.send")}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
