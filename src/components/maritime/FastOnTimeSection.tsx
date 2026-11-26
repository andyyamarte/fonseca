"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function FastOnTimeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".fast-img", {
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      gsap.from(".fast-text", {
        x: 50,
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
                24/7 Operational Readiness
              </Badge>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div className="fast-text flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#374470]">
              <Zap className="size-4 text-amber-500" />
              Eficiencia Portuaria & Logística
            </div>

            <h2 className="fast-text font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#374470] leading-none">
              Fast & On Time
            </h2>
            <div className="fast-text h-1 w-20 bg-amber-400" />

            <p className="fast-text text-slate-700 text-base sm:text-lg leading-relaxed">
              We work <span className="font-bold text-slate-900">SMART</span> to ensure that all
              provisions, ship stores, and supplies have been delivered, completed, and cleaned up
              well before your ship sets sail, in accordance with IMPA standards.
            </p>

            <div className="fast-text rounded-xl bg-white border border-slate-200 p-5 space-y-3 shadow-sm">
              {[
                "Coordinación directa con agencias y capitanías de puerto",
                "Despacho en lancha o grúa a buques en rada o muelle",
                "Cadena de frío certificada para provisiones frescas",
                "Documentación IMPA y certificados SOLAS incluidos",
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
                className="h-12 px-7 bg-[#374470] hover:bg-[#2a355a] text-white font-semibold uppercase tracking-wider cursor-pointer"
              >
                Solicitar Cotización Ahora
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
