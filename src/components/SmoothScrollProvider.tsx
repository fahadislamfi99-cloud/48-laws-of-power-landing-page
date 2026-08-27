"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; duration?: number; immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Respect user preference for reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // 2. Check if device is a pure mobile/tablet touch screen without a fine pointer
    // On pure touch devices, we let the browser use native 120Hz/60Hz hardware kinetic fling momentum
    const isTouchOnly =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse) and (hover: none)").matches;

    if (isTouchOnly) {
      // Mobile touch devices use full native momentum + smooth anchor scrolling
      const handleMobileAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest("a");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            const top = (targetElement as HTMLElement).offsetTop - 75;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      };

      document.addEventListener("click", handleMobileAnchorClick, { capture: true });
      return () => {
        document.removeEventListener("click", handleMobileAnchorClick, { capture: true });
      };
    }

    // 3. Desktop / Laptop / Trackpad: Initialize Lenis with exact momentum inertia
    const lenis = new Lenis({
      duration: 1.15, // Subtle, controlled inertia - preserved exactly for desktop
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decel curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95, // Balanced, natural momentum
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // High-performance requestAnimationFrame loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth Anchor Link Interception on desktop
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -75, // Offset for fixed navbar height
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    // Watch body overflow to automatically pause Lenis when modals / drawers open
    const bodyObserver = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      bodyObserver.disconnect();
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else if (typeof target === "string" && target.startsWith("#")) {
      const el = document.querySelector(target);
      if (el) {
        const top = (el as HTMLElement).offsetTop - (options?.offset ? Math.abs(options.offset) : 75);
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const stop = () => lenisRef.current?.stop();
  const start = () => lenisRef.current?.start();

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, scrollTo, stop, start }}>
      {children}
    </LenisContext.Provider>
  );
}
