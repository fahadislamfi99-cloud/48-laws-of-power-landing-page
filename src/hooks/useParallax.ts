"use client";

import { useEffect, useRef } from "react";

export function useParallax<T extends HTMLElement = HTMLDivElement>(speed: number = 0.2) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isVisible = false;
    let ticking = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          updateParallax();
        }
      },
      { rootMargin: "100px 0px 100px 0px" }
    );

    observer.observe(el);

    const updateParallax = () => {
      if (!isVisible) {
        ticking = false;
        return;
      }

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const delta = (elementCenter - viewportCenter) * speed;

      el.style.transform = `translate3d(0, ${delta}px, 0)`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking && isVisible) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return elementRef;
}
