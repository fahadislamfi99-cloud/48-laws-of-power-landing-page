"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~125.66

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef<SVGCircleElement | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalHeight)) : 0;

      // 1. Direct GPU-speed DOM update for 60-120fps fluid tracking
      if (circleRef.current) {
        const offset = CIRCUMFERENCE - progress * CIRCUMFERENCE;
        circleRef.current.style.strokeDashoffset = `${offset}`;
      }

      // 2. Visibility threshold toggle
      const shouldShow = scrollY > 350;
      if (shouldShow !== isVisibleRef.current) {
        isVisibleRef.current = shouldShow;
        setIsVisible(shouldShow);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When button mounts/becomes visible, immediately sync progress offset
  useEffect(() => {
    if (isVisible && circleRef.current) {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalHeight)) : 0;
      circleRef.current.style.strokeDashoffset = `${CIRCUMFERENCE - progress * CIRCUMFERENCE}`;
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-label="পৃষ্ঠার ওপরে যান (Back to top)"
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#111114]/95 hover:bg-[#16161B] text-[#D1C9BC] hover:text-[#C8A45C] backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 cursor-pointer hover-lift group flex items-center justify-center p-0 will-change-[transform,opacity]"
        >
          {/* Circular Progress Ring (High-performance Direct SVG Dashoffset) */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 48 48"
          >
            {/* Background Track Ring */}
            <circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="#2A2A2E"
              strokeWidth="1.75"
              className="opacity-70"
            />
            {/* Active Gold Progress Ring */}
            <circle
              ref={circleRef}
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="#C8A45C"
              strokeWidth="1.75"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              strokeLinecap="round"
              className="will-change-[stroke-dashoffset]"
            />
          </svg>

          {/* Up Arrow Icon */}
          <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[#C8A45C] relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
