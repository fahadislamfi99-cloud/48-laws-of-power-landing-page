"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Sparkles, ArrowRight, ShieldCheck, BookOpen, Tag, Check, Copy } from "lucide-react";
import { exitLessonsList, ExitLesson } from "@/data/exitLessonsData";
import CountdownTimer from "./CountdownTimer";
import { motion, AnimatePresence } from "motion/react";

interface ExitIntentLessonModalProps {
  onClaimOffer: (couponCode: string) => void;
}

const STORAGE_DISMISSED_KEY = "laws48_exit_lesson_dismissed_v1";

export default function ExitIntentLessonModal({ onClaimOffer }: ExitIntentLessonModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<ExitLesson | null>(null);
  const [promoOffer, setPromoOffer] = useState<{
    isEnabled: boolean;
    couponCode: string;
    discountAmount: number;
    offerTag?: string;
    ctaText?: string;
  } | null>(null);

  const [isCopied, setIsCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  // 1. Fetch active promotional settings from backend
  useEffect(() => {
    async function loadOffer() {
      try {
        const res = await fetch("/api/public/promo-banner");
        const data = await res.json();
        if (data.success && data.banner && data.banner.isEnabled) {
          setPromoOffer({
            isEnabled: true,
            couponCode: data.banner.couponCode || "POWER50",
            discountAmount: data.banner.discountAmount || 50,
            offerTag: data.banner.offerTag || "৳৫০ OFF",
            ctaText: data.banner.ctaText || "অফারটি ব্যবহার করুন",
          });
        }
      } catch {
        // Fallback default
        setPromoOffer({
          isEnabled: true,
          couponCode: "POWER50",
          discountAmount: 50,
          offerTag: "৳৫০ OFF",
          ctaText: "অফারটি ব্যবহার করুন",
        });
      }
    }
    loadOffer();
  }, []);

  // 2. Select random educational lesson on mount
  useEffect(() => {
    if (exitLessonsList.length > 0) {
      const randomIndex = Math.floor(Math.random() * exitLessonsList.length);
      setCurrentLesson(exitLessonsList[randomIndex]);
    }
  }, []);

  // 3. Exit Intent Detection Logic
  useEffect(() => {
    // Check if dismissed within last 24h
    try {
      const dismissed = localStorage.getItem(STORAGE_DISMISSED_KEY);
      if (dismissed) {
        const timeSince = Date.now() - Number(dismissed);
        if (timeSince < 24 * 60 * 60 * 1000) {
          return; // Still in 24h cooldown
        }
      }
    } catch {
      // ignore storage error
    }

    const pageLoadTime = Date.now();
    let maxScrollY = 0;

    // Desktop Mouse Exit Intent (Cursor leaves document towards top tabs/close button)
    const handleMouseLeave = (e: MouseEvent) => {
      if (Date.now() - pageLoadTime < 6000) return;
      if (hasTriggeredRef.current) return;

      if (e.clientY <= 25 || e.clientY <= 0) {
        hasTriggeredRef.current = true;
        setIsOpen(true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (Date.now() - pageLoadTime < 6000) return;
      if (hasTriggeredRef.current) return;

      // Moving swiftly towards browser tabs / close button
      if (e.clientY <= 15) {
        hasTriggeredRef.current = true;
        setIsOpen(true);
      }
    };

    // Mobile Exit Intent / Deep Scroll Engagement Trigger
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > maxScrollY) {
        maxScrollY = currentScroll;
      }

      // If user scrolled deeply (> 600px) and then rapidly scrolls back up after 15s
      if (
        !hasTriggeredRef.current &&
        Date.now() - pageLoadTime > 15000 &&
        maxScrollY > 600 &&
        currentScroll < maxScrollY * 0.4
      ) {
        hasTriggeredRef.current = true;
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 4. Background Scroll Lock
  useEffect(() => {
    if (!isOpen) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_DISMISSED_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  };

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!promoOffer?.couponCode) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(promoOffer.couponCode);
      } else {
        const el = document.createElement("input");
        el.value = promoOffer.couponCode;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleClaim = () => {
    handleClose();
    if (promoOffer?.couponCode) {
      onClaimOffer(promoOffer.couponCode);
    }
  };

  if (!currentLesson) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-x-hidden overflow-y-auto">
          {/* Backdrop: Gradual Darken + Subtle Background Blur */}
          <motion.div
            key="exit-backdrop"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/75 cursor-pointer will-change-[backdrop-filter,opacity]"
            onClick={handleClose}
          />

          {/* Background ambient gold radial glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] h-[340px] sm:h-[580px] bg-[#C8A45C]/12 rounded-full blur-[130px] pointer-events-none"
          />

          {/* Modal Shell: Slower, Silky Smooth Fade + Subtle Scale */}
          <motion.div
            key="exit-panel"
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative w-full max-w-[460px] md:max-w-[620px] max-h-[90dvh] overflow-y-auto bg-[#0D0D10] rounded-3xl border border-[#2A2A2E] shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-5 sm:p-7 md:p-8 text-left space-y-5 my-auto z-10 will-change-[transform,opacity]"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Top Gold Shimmer Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent z-20 opacity-90" />

            {/* Close Button with Smooth 90deg Hover Rotation */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full bg-[#1A1A1E]/90 hover:bg-[#2A2A2E] text-[#D1C9BC] hover:text-[#F0EBE0] border border-[#26262A] hover:border-[#C8A45C]/40 transition-all duration-300 z-30 cursor-pointer backdrop-blur-sm group"
              aria-label="Close lesson popup"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 ease-out group-hover:rotate-90" />
            </button>

            {/* ─── 1. Header Badges & Tag ──────────────────────────────── */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A45C]/15 border border-[#C8A45C]/30 text-[#C8A45C] font-semibold text-xs shadow-xs">
                <span>{currentLesson.themeIcon}</span>
                <span>এক মিনিটের Power Lesson</span>
              </div>

              {currentLesson.lawNumber && (
                <span className="text-[11px] font-mono font-bold text-[#A8A095] bg-[#141418] px-2.5 py-1 rounded-md border border-[#26262A]">
                  {currentLesson.lawNumber} • {currentLesson.tag}
                </span>
              )}
            </div>

            {/* ─── 2. Main Lesson Insight ──────────────────────────────── */}
            <div className="space-y-3">
              <h3
                id="exit-lesson-title"
                className="text-lg sm:text-xl md:text-[22px] font-bengali-serif font-bold text-[#F0EBE0] leading-snug tracking-tight"
              >
                &ldquo;{currentLesson.headlineBn}&rdquo;
              </h3>

              <p className="text-xs sm:text-sm text-[#C4BCB0] leading-[1.8] font-normal">
                {currentLesson.explanationBn}
              </p>
            </div>

            {/* ─── 3. Editorial Transition Strip ──────────────────────── */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#141418] border border-[#26262A] flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-[#C8A45C] shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs text-[#D1C9BC] leading-relaxed">
                <span className="font-bold text-[#F0EBE0] block">
                  এটি মানব মনস্তত্ত্বের মাত্র ১টি মূলনীতি।
                </span>
                <span className="text-[#A8A095] text-[11px] block">
                  The 48 Laws of Power (বাংলা অনুবাদ)-এ রয়েছে এমন পুরো ৪৮টি নীতি, ঐতিহাসিক কেস স্টাডি ও বাস্তব প্রয়োগের ব্যাখ্যা।
                </span>
              </div>
            </div>

            {/* ─── 4. Dynamic Promotional Offer & Countdown ───────────── */}
            {promoOffer && promoOffer.isEnabled && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#16161C] to-[#0F0F14] border border-[#C8A45C]/35 space-y-3.5 shadow-inner">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C8A45C]" />
                    <span className="text-xs font-bold text-[#F0EBE0]">
                      যাওয়ার আগে আপনার জন্য বিশেষ ছাড়
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-[#08080A] bg-[#C8A45C] px-2.5 py-0.5 rounded-full shadow-xs">
                    {promoOffer.offerTag || "৳৫০ OFF"}
                  </span>
                </div>

                {/* Live 2-Day Continuous Loop Luxury Countdown Timer */}
                <CountdownTimer variant="luxury-box" label="অফার শেষ হতে বাকি" />

                {/* Coupon Code Pill */}
                <div className="p-2.5 rounded-xl bg-[#0A0A0E] border border-[#C8A45C]/25 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Tag className="w-3.5 h-3.5 text-[#C8A45C] shrink-0" />
                    <span className="text-[11px] text-[#A8A095]">Coupon:</span>
                    <span className="font-mono font-black text-sm text-[#C8A45C] tracking-wider truncate">
                      {promoOffer.couponCode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#C8A45C]/15 hover:bg-[#C8A45C]/25 text-[#C8A45C] text-xs font-bold transition-all border border-[#C8A45C]/30 cursor-pointer shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px] font-bold">✓ Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="text-[11px]">কপি</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

            {/* ─── 5. CTAs & Dismissal ─────────────────────────────────── */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleClaim}
                className="w-full py-3.5 sm:py-4 rounded-2xl btn-gold text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer hover-lift btn-shimmer shadow-lg group"
              >
                <span>{promoOffer?.offerTag ? `${promoOffer.offerTag} ছাড়ে সম্পূর্ণ ডিজিটাল কপি নিন` : "ডিজিটাল কপি কিনুন"}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-between pt-1 px-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs text-[#8A8278] hover:text-[#D1C9BC] transition-colors cursor-pointer"
                >
                  না, পরে দেখব
                </button>

                <div className="flex items-center gap-1.5 text-[11px] text-[#8A8278]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45C]" />
                  <span>বিকাশ সিকিউর পেমেন্ট • তাৎক্ষণিক অ্যাক্সেস</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
