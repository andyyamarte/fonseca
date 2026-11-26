"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSitePreferences } from "./SitePreferencesContext";

gsap.registerPlugin(ScrollTrigger);

export function FastOnTimeSection() {
  const { t } = useSitePreferences();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".fast-img", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      gsap.from(".fast-text", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="operations"
      ref={sectionRef}
      className="bg-[#F6F6F6] py-20 sm:py-28 border-t border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="fast-img relative rounded-2xl overflow-hidden shadow-xl">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src="/images/fast-drydock.jpg"
                alt="Marine engineer inspecting ship hull and propeller in dry dock"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#081020]/30 to-transparent" />
            </div>
            <div className="absolute bottom-5 left-5">
              <Badge className="bg-white/90 text-[#374470] font-mono text-xs shadow-md backdrop-blur-sm">
                <Zap className="size-3.5 text-amber-500 mr-1" />
                {t("fast.badge")}
              </Badge>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div className="fast-text flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#374470]">
              <Zap className="size-4 text-amber-500" />
              {t("fast.eyebrow")}
            </div>

            <h2 className="fast-text font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#374470] leading-none">
              {t("fast.title")}
            </h2>
            <div className="fast-text h-1 w-20 bg-amber-400" />

            <p className="fast-text text-slate-700 text-base sm:text-lg leading-relaxed">
              {t("fast.textBefore")}
              <span className="font-bold text-slate-900">{t("fast.smart")}</span>{" "}
              {t("fast.textAfter")}
            </p>

            <div className="fast-text rounded-xl bg-white border border-slate-200 p-5 space-y-3 shadow-sm">
              {[
                t("fast.item1"),
                t("fast.item2"),
                t("fast.item3"),
                t("fast.item4"),
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="fast-text">
              <Button
                onClick={() =>
                  document.getElementById("quotation")?.scrollIntoView({ behavior: "smooth" })
                }
                className="h-auto min-h-12 max-w-full px-4 sm:px-7 bg-[#374470] hover:bg-[#2a355a] text-white font-semibold uppercase tracking-wider cursor-pointer text-center"
                style={{ whiteSpace: "normal" }}
              >
                {t("fast.cta")}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
