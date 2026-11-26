"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSitePreferences } from "./SitePreferencesContext";

gsap.registerPlugin(ScrollTrigger);

export function MissionQuoteBanner() {
  const { t } = useSitePreferences();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".quote-text-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.to(".quote-bg-parallax", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[340px] sm:h-[400px] overflow-hidden flex items-center justify-center"
    >
      <div className="quote-bg-parallax absolute inset-0 -top-16 -bottom-16">
        <Image
          src="/images/quote-containers.jpg"
          alt="Shipping containers at sunset port"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/50" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <blockquote className="quote-text-reveal">
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-white leading-snug drop-shadow-xl">
            &ldquo;{t("mission.quote")}
            <span className="text-amber-300">{t("mission.quoteHighlight")}</span>
            &rdquo;
          </p>
        </blockquote>
      </div>
    </section>
  );
}
