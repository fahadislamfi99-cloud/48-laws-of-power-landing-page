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

    const revealSelector = ".reveal, .reveal-card, .reveal-scale, .reveal-left, .reveal-right, .reveal-line";

    // Check if user prefers reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal-visible");
      const children = el.querySelectorAll(revealSelector);
      children.forEach((child) => child.classList.add("reveal-visible"));
      return;
    }

    // If IntersectionObserver is not supported, reveal immediately
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("reveal-visible");
      const children = el.querySelectorAll(revealSelector);
      children.forEach((child) => child.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            if (entry.target instanceof HTMLElement) {
              entry.target.setAttribute("data-revealed", "true");
            }
            // Also reveal the root container and all its descendants permanently
            el.classList.add("reveal-visible");
            el.setAttribute("data-revealed", "true");
            const children = el.querySelectorAll(revealSelector);
            children.forEach((child) => {
              child.classList.add("reveal-visible");
              if (child instanceof HTMLElement) child.setAttribute("data-revealed", "true");
            });

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

    // Observe the main container
    observer.observe(el);

    // Also observe individual child elements
    const childReveals = el.querySelectorAll(revealSelector);
    childReveals.forEach((child) => observer.observe(child));

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return elementRef;
}
