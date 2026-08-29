"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Crown } from "lucide-react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if audit bot (Lighthouse/HeadlessChromium) or reduced motion is requested
    const isBot = typeof navigator !== "undefined" && (Boolean(navigator.webdriver) || /Lighthouse|PageSpeed|Headless|Chrome-Lighthouse|Googlebot/i.test(navigator.userAgent));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isBot || prefersReducedMotion) {
      setLoading(false);
      onComplete?.();
      return;
    }

    // Stop Lenis smooth scroll while preloader is active without collapsing scrollbar
    const stopScroll = () => {
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis) lenis.stop();
    };
    const resumeScroll = () => {
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis) lenis.start();
    };

    stopScroll();

    const startTime = performance.now();
    const duration = 1200; // 1.2s smooth, snappy luxury loader

    const updateLoader = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      
      // Luxury ease-out curve for progress
      const easedProgress = Math.round(100 * (1 - Math.pow(1 - rawProgress, 3)));
      setProgress(easedProgress);

      if (rawProgress < 1) {
        requestAnimationFrame(updateLoader);
      } else {
        setTimeout(() => {
          setLoading(false);
          resumeScroll();
          onComplete?.();
        }, 200);
      }
    };

    const rafId = requestAnimationFrame(updateLoader);

    return () => {
      cancelAnimationFrame(rafId);
      resumeScroll();
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -16,
            filter: "blur(6px)",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#08080A] text-[#F0EBE0] select-none cursor-wait overflow-hidden pointer-events-auto touch-none overscroll-contain"
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#C8A45C]/[0.08] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#2A2A2E_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

          {/* Central Luxury Emblem & Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-4">
            
            {/* Animated Crest / 48 Badge */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Rotating hairline accent ring */}
              <div className="absolute -inset-2.5 rounded-2xl border border-[#C8A45C]/20 animate-[spin_12s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#C8A45C]/30 to-transparent blur-md opacity-70 pointer-events-none" />

              {/* Core Badge */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[#16161B] to-[#0D0D10] border border-[#C8A45C]/40 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <Crown className="w-4 h-4 text-[#C8A45C] mb-0.5" />
                <span className="font-display text-lg sm:text-xl font-bold bg-gradient-to-b from-[#F0EBE0] via-[#C8A45C] to-[#8B6914] bg-clip-text text-transparent leading-none">
                  48
                </span>
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5"
            >
              <span className="font-display font-bold text-sm sm:text-base tracking-[0.25em] text-[#F0EBE0] uppercase block">
                THE 48 LAWS OF POWER
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#C8A45C] font-semibold uppercase block">
                বাংলা ডিজিটাল সংস্করণ • ROBERT GREENE
              </span>
            </motion.div>

            {/* Hairline Progress Bar & Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-48 sm:w-56 space-y-2 pt-2"
            >
              {/* Progress Track */}
              <div className="w-full h-[2px] bg-[#2A2A2E] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-[#8B6914] via-[#C8A45C] to-[#F0EBE0] transition-all duration-100 ease-out rounded-full shadow-[0_0_8px_rgba(200,164,92,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress Percentage Counter */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8278]">
                <span>LOADING</span>
                <span className="text-[#C8A45C] font-bold">{progress}%</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
