"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
  once = true,
}: ScrollRevealOptions = {}) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if user prefers reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal-visible");
      const children = el.querySelectorAll(".reveal");
      children.forEach((child) => child.classList.add("reveal-visible"));
      return;
    }

    // If IntersectionObserver is not supported, reveal immediately
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("reveal-visible");
      const children = el.querySelectorAll(".reveal");
      children.forEach((child) => child.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            // Also reveal child .reveal elements if observing container
            const childReveals = entry.target.querySelectorAll(".reveal");
            childReveals.forEach((child) => child.classList.add("reveal-visible"));

            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove("reveal-visible");
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    // Also observe all explicit child elements with .reveal class
    const childReveals = el.querySelectorAll(".reveal");
    childReveals.forEach((child) => observer.observe(child));

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return elementRef;
}
