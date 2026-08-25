"use client";

import { useEffect, useRef } from "react";

export function useTextReveal<T extends HTMLElement = HTMLDivElement>() {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.clipPath = "none";
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      el.style.opacity = "1";
      el.style.clipPath = "none";
      return;
    }

    el.style.opacity = "0";
    el.style.clipPath = "inset(100% 0 0 0)";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transition = "clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease";
            el.style.clipPath = "inset(0 0 0 0)";
            el.style.opacity = "1";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return elementRef;
}
