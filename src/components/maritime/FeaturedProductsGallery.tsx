"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, Plus, Package, Eye, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FEATURED_PRODUCTS, type FeaturedProduct } from "@/data/maritime-data";
import { useQuoteManifest } from "./QuoteManifestContext";
import { useSitePreferences } from "./SitePreferencesContext";
import { localizeProduct } from "@/data/spanish-translations";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProductsGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { addItem, hasItem } = useQuoteManifest();
  const { language, t } = useSitePreferences();
  const [lightboxProduct, setLightboxProduct] = useState<FeaturedProduct | null>(null);
  const localizedLightbox = lightboxProduct
    ? localizeProduct(lightboxProduct, language)
    : null;

  useGSAP(
    () => {
      gsap.from(".prod-header", {
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

  return (
    <>
      <section id="featured-impa" ref={sectionRef} className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-3">
            <div className="prod-header flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#374470]">
              <Package className="size-4 text-sky-600" />
              {t("featured.eyebrow")}
            </div>
            <h2 className="prod-header font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#374470]">
              {t("featured.title")}
            </h2>
            <div className="prod-header h-1 w-20 bg-[#374470]" />
            <p className="prod-header text-slate-600 text-base sm:text-lg">
              {t("featured.text")}
            </p>
          </div>

          <div className="prod-grid grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {FEATURED_PRODUCTS.map((product) => {
              const added = hasItem(product.id);
              const localized = localizeProduct(product, language);
              return (
                <div
                  key={product.id}
                  className="prod-tile group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setLightboxProduct(product)}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                    <Image
                      src={product.image}
                      alt={localized.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge className="bg-amber-400 text-slate-950 font-mono text-[10px]">
                        {product.impaCode}
                      </Badge>
                      <div className="size-7 rounded-full bg-white/90 flex items-center justify-center">
                        <Eye className="size-3.5 text-slate-700" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem({
                            id: product.id,
                            title: product.name,
                            code: product.impaCode,
                            image: product.image,
                          });
                        }}
                        className={`w-full h-8 text-xs font-semibold cursor-pointer ${
                          added
                            ? "bg-emerald-500/90 text-white hover:bg-emerald-600"
                            : "bg-white text-slate-900 hover:bg-sky-50"
                        }`}
                      >
                        {added ? (
                          <>
                            <Check className="size-3" /> {t("featured.added")}
                          </>
                        ) : (
                          <>
                            <Plus className="size-3" /> {t("featured.quote")}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="p-3.5">
                    <div className="font-mono text-[10px] text-sky-700 font-semibold uppercase tracking-wider">
                      {localized.division}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5 line-clamp-2 leading-snug">
                      {localized.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Lightbox */}
      {lightboxProduct && localizedLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxProduct(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxProduct(null)}
              className="absolute top-4 right-4 z-10 size-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
            >
              <X className="size-4" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-slate-50 rounded-t-2xl overflow-hidden">
              <Image
                src={lightboxProduct.image}
                alt={localizedLightbox.alt}
                fill
                sizes="672px"
                className="object-contain p-6"
              />
            </div>

            <div className="p-6 space-y-4">
              <Badge className="bg-amber-400 text-slate-950 font-mono">
                {lightboxProduct.impaCode}
              </Badge>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#374470]">
                {localizedLightbox.name}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {localizedLightbox.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {localizedLightbox.specs.map((spec) => (
                  <Badge
                    key={spec}
                    variant="secondary"
                    className="bg-sky-50 text-sky-800 border border-sky-200 font-mono text-xs"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => setLightboxProduct(null)}
                  variant="outline"
                  className="cursor-pointer"
                >
                  {t("featured.close")}
                </Button>
                <Button
                  onClick={() => {
                    addItem({
                      id: lightboxProduct.id,
                      title: lightboxProduct.name,
                      code: lightboxProduct.impaCode,
                      image: lightboxProduct.image,
                    });
                    setLightboxProduct(null);
                  }}
                  className="bg-[#374470] hover:bg-[#2a355a] text-white cursor-pointer"
                >
                  <Plus className="size-4" /> {t("featured.add")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
