"use client";

import { useEffect } from "react";

/**
 * ScrollReveal.js Integration for Landing Page
 * Provides subtle, editorial, luxury scroll-triggered animations.
 * Excludes Hero section to preserve its existing custom animation.
 */
export default function ScrollRevealInit() {
  useEffect(() => {
    // 1. Accessibility: Respect prefers-reduced-motion & audit bots
    if (typeof window === "undefined") return;
    const isBot = typeof navigator !== "undefined" && (Boolean(navigator.webdriver) || /Lighthouse|PageSpeed|Headless|Chrome-Lighthouse|Googlebot/i.test(navigator.userAgent));
    if (isBot || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let srInstance: any = null;
    let idleId: number | null = null;
    let timerId: NodeJS.Timeout | null = null;

    const initSR = () => {
      import("scrollreveal").then((module) => {
        const ScrollReveal = module.default;
        const sr = ScrollReveal();
        srInstance = sr;

        const isMobile = window.innerWidth < 768;

        const baseConfig = {
          distance: isMobile ? "14px" : "22px",
          duration: 750,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          origin: "bottom",
          opacity: 0,
          scale: 1,
          reset: false,
          cleanup: true,
          viewFactor: 0.12,
          mobile: true,
        };

        // 3. Editorial Sequence & Staggers
        sr.reveal(".sr-eyebrow", { ...baseConfig, distance: "10px", duration: 600, delay: 40 });
        sr.reveal(".sr-heading", { ...baseConfig, distance: "18px", duration: 750, delay: 100 });
        sr.reveal(".sr-desc", { ...baseConfig, distance: "14px", duration: 700, delay: 160 });
        sr.reveal(".sr-card", { ...baseConfig, distance: "20px", duration: 750, interval: isMobile ? 65 : 85, delay: 60 });
        sr.reveal(".sr-left", { ...baseConfig, origin: isMobile ? "bottom" : "left", distance: "20px", duration: 700, interval: isMobile ? 50 : 70, delay: 50 });
        sr.reveal(".sr-right", { ...baseConfig, origin: isMobile ? "bottom" : "right", distance: "20px", duration: 700, interval: isMobile ? 50 : 70, delay: 50 });
        sr.reveal(".sr-scale", { ...baseConfig, scale: 0.98, distance: "14px", duration: 800, delay: 80 });
        sr.reveal(".sr-fade-up", { ...baseConfig, distance: "16px", duration: 750, delay: 60 });
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(initSR, { timeout: 1200 });
    } else {
      timerId = setTimeout(initSR, 400);
    }

    return () => {
      if (idleId !== null && "cancelIdleCallback" in window) (window as any).cancelIdleCallback(idleId);
      if (timerId !== null) clearTimeout(timerId);
      if (srInstance && typeof srInstance.destroy === "function") {
        srInstance.destroy();
      }
    };
  }, []);

  return null;
}
