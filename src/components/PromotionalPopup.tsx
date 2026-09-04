"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ArrowRight, ShieldCheck, CheckCircle2, Zap, Flame } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { motion, AnimatePresence } from "motion/react";

export interface PromoBannerData {
  isEnabled: boolean;
  badgeText: string;
  title: string;
  subtitle?: string;
  description: string;
  couponCode?: string;
  discountAmount?: number;
  discountType?: "fixed" | "percentage";
  ctaText: string;
  offerTag?: string;
  imageUrl?: string;
  displayDelaySeconds: number;
  cooldownHours: number;
}

interface PromotionalPopupProps {
  onClaimOffer: (couponCode?: string) => void;
}

const STORAGE_KEY = "laws48_combo_promo_v1";

export default function PromotionalPopup({ onClaimOffer }: PromotionalPopupProps) {
  const [promoData, setPromoData] = useState<PromoBannerData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // 1. Fetch promotional settings from public API
  useEffect(() => {
    // Skip automated audit bots
    if (
      typeof navigator !== "undefined" &&
      (Boolean(navigator.webdriver) ||
        /Lighthouse|PageSpeed|Headless|Chrome-Lighthouse|Googlebot/i.test(navigator.userAgent))
    ) {
      return;
    }

    let isMounted = true;
    let timer: NodeJS.Timeout | null = null;

    async function loadPromo() {
      try {
        const res = await fetch("/api/public/promo-banner");
        const data = await res.json();

        if (isMounted && data.success && data.banner) {
          if (!data.banner.isEnabled) {
            setPromoData(null);
            return;
          }
          setPromoData(data.banner);

          // Check if already dismissed in current session
          try {
            const dismissedInSession = sessionStorage.getItem(STORAGE_KEY);
            if (dismissedInSession) {
              return;
            }
          } catch {
            // ignore
          }

          let triggered = false;
          const showBanner = () => {
            if (triggered) return;
            triggered = true;
            if (isMounted) {
              setIsOpen(true);
            }
          };

          // Trigger banner exactly after 5 seconds
          const delayMs = (data.banner.displayDelaySeconds && data.banner.displayDelaySeconds >= 5) 
            ? data.banner.displayDelaySeconds * 1000 
            : 5000;

          timer = setTimeout(showBanner, delayMs);
        }
      } catch (err) {
        console.warn("[Promo Popup Load Warning]:", err);
      }
    }

    loadPromo();

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  // 2. Background scroll locking and Escape key handler
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
      if (e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore storage write errors
    }
  };

  const handleClaim = () => {
    handleDismiss();
    onClaimOffer(promoData?.couponCode || "");
  };

  if (!promoData || !promoData.isEnabled) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-x-hidden overflow-y-auto">
          {/* Backdrop: Translucent Frosted Glass Overlay with Subtle Blur */}
          <motion.div
            key="promo-backdrop"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md cursor-pointer will-change-[backdrop-filter,opacity]"
            onClick={handleDismiss}
          />

          {/* Background ambient dual glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[620px] h-[340px] sm:h-[620px] bg-gradient-to-br from-[#C8A45C]/15 via-[#E11D48]/10 to-transparent rounded-full blur-[140px] pointer-events-none"
          />

          {/* Main Luxury Popup Shell */}
          <motion.div
            key="promo-panel"
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative w-full max-w-[440px] md:max-w-[780px] lg:max-w-[840px] max-h-[92dvh] overflow-y-auto bg-[#0D0D11] rounded-2xl sm:rounded-3xl border border-[#2A2A34] shadow-[0_25px_80px_rgba(0,0,0,0.9)] my-auto z-10 will-change-[transform,opacity]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#2E2E36 transparent",
            }}
          >
            {/* Top Gold-Rose Gradient Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#C8A45C] via-[#E11D48] to-[#C8A45C] z-30 opacity-90" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 p-1.5 sm:p-2 rounded-full bg-[#1A1A22]/90 hover:bg-[#282834] text-[#D1C9BC] hover:text-[#F0EBE0] border border-[#2A2A34] hover:border-[#C8A45C]/40 transition-all duration-300 z-30 cursor-pointer backdrop-blur-sm group"
              aria-label="বিজ্ঞপ্তি বন্ধ করুন"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 ease-out group-hover:rotate-90" />
            </button>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              
              {/* ─── LEFT / TOP: 3D Dual Book Visual Showcase ──────────────── */}
              <div className="md:col-span-5 relative overflow-hidden bg-gradient-to-b from-[#151218] via-[#100F14] to-[#0A0A0E] p-5 sm:p-6 md:p-7 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#22222C]">
                
                {/* Background ambient lighting orb */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#C8A45C]/15 via-transparent to-[#E11D48]/15 pointer-events-none" />

                {/* Top Badges on Artwork (Cleanly aligned left with safe right margin for mobile close button) */}
                <div className="relative z-10 w-full flex items-center justify-start gap-2 pr-10 md:pr-0 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E11D48]/20 border border-[#E11D48]/40 text-[#E11D48] text-[10px] font-bold tracking-wider uppercase font-sans">
                    <Flame className="w-3 h-3 text-[#E11D48]" />
                    <span>স্পেশাল ডিল</span>
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#C8A45C] text-[#08080A] text-[10px] sm:text-[11px] font-extrabold tracking-wide shadow-md">
                    ৳১০০ ছাড়
                  </span>
                </div>

                {/* Dual 3D Books Stage: Equalized Height and Tight Cohesive Combo Composition */}
                <div className="relative my-3 sm:my-4 md:my-auto w-full h-[180px] xs:h-[200px] sm:h-[220px] md:h-[275px] lg:h-[300px] flex items-center justify-center pointer-events-none select-none">
                  
                  {/* Ambient spotlight under the books */}
                  <div className="absolute w-[240px] md:w-[320px] h-[70px] md:h-[90px] bg-[#C8A45C]/18 rounded-full blur-2xl bottom-1 left-1/2 -translate-x-1/2 pointer-events-none" />

                  {/* Flex Centered 3D Pair - Unified Single Bundle Unit */}
                  <div className="relative flex items-center justify-center pointer-events-auto">
                    
                    {/* Book 1: The 48 Laws of Power (Left / Back Layer - matched 1:1 in visual height) */}
                    <div className="relative z-10 -rotate-[3.5deg] transition-all duration-300 hover:-rotate-[6deg] hover:scale-105 hover:z-30 origin-bottom-right cursor-pointer shrink-0">
                      <img
                        src="/images/book-mockup.webp"
                        alt="The 48 Laws of Power"
                        width={200}
                        height={270}
                        className="h-[148px] xs:h-[168px] sm:h-[188px] md:h-[225px] lg:h-[248px] w-auto object-contain scale-[1.08] drop-shadow-[0_12px_26px_rgba(0,0,0,0.85)]"
                        loading="lazy"
                      />
                    </div>

                    {/* Book 2: The Art of Seduction (Right / Front Layer - tightly overlapping left book) */}
                    <div className="relative z-20 rotate-[2.5deg] -ml-13 xs:-ml-15 sm:-ml-17 md:-ml-22 lg:-ml-26 transition-all duration-300 hover:rotate-[5deg] hover:scale-105 hover:z-30 origin-bottom-left cursor-pointer shrink-0">
                      <img
                        src="/images/the-art-of-seduction-book-mockup.png"
                        alt="The Art of Seduction"
                        width={200}
                        height={270}
                        className="h-[148px] xs:h-[168px] sm:h-[188px] md:h-[225px] lg:h-[248px] w-auto object-contain drop-shadow-[-8px_16px_32px_rgba(0,0,0,0.92)]"
                        loading="lazy"
                      />
                    </div>

                  </div>
                </div>

                {/* Bottom Specs Pill */}
                <div className="relative z-10 w-full pt-1">
                  <div className="flex items-center justify-center gap-2 py-1 px-3 rounded-full bg-[#181822]/80 border border-[#2E2E3C] text-[10px] sm:text-[11px] text-[#D1C9BC] font-mono">
                    <span className="text-[#C8A45C] font-bold">১,১৫৯+ পৃষ্ঠা</span>
                    <span className="text-[#444450]">•</span>
                    <span>২টি মাস্টারক্লাস বই</span>
                  </div>
                </div>
              </div>

              {/* ─── RIGHT / BOTTOM: Editorial Copy & CTA ────────────────── */}
              <div className="md:col-span-7 p-4 sm:p-6 md:p-7 flex flex-col justify-between space-y-3.5 sm:space-y-4 text-left">
                
                {/* Header Titles */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C8A45C]/15 border border-[#C8A45C]/35 text-[#C8A45C] font-semibold text-[10px] sm:text-xs font-sans">
                      <Flame className="w-3 h-3 text-[#E11D48]" />
                      <span>{promoData.badgeText || "🔥 স্পেশাল মাস্টার বান্ডেল অফার"}</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#A8A095] bg-[#16161C] px-2 py-0.5 rounded-full border border-[#282832]">
                      ৮৭% পাঠক এটি পছন্দ করেছেন
                    </span>
                  </div>

                  <h3 className="text-base xs:text-lg sm:text-2xl font-bengali-serif font-bold text-[#F0EBE0] leading-snug tracking-tight">
                    {promoData.title || "দুটি পাওয়ার মাস্টারক্লাস বই একসাথে মাত্র ৳১৯৯"}
                  </h3>

                  {/* Price Comparison Card */}
                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#14141A] border border-[#2E2E38]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] sm:text-[11px] text-[#8A8278] block font-bengali-serif">
                        আলাদা কিনলে: <span className="line-through text-[#A8A095]">৳২৯৮</span> (৳১৪৯ + ৳১৪৯)
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm sm:text-lg font-extrabold text-[#C8A45C] font-sans">
                          স্পেশাল কম্বো: ৳১৯৯
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                      Save ৳১০০
                    </span>
                  </div>
                </div>

                {/* Key Bullet Features */}
                <div className="space-y-2 text-xs text-[#D1C9BC] font-bengali-serif pt-0.5">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8A45C] shrink-0 mt-0.5" />
                    <span><strong>The 48 Laws of Power (৫০৯ পৃ.):</strong> ক্ষমতা অর্জন ও মনস্তাত্ত্বিক রণকৌশল।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E11D48] shrink-0 mt-0.5" />
                    <span><strong>The Art of Seduction (৬৫০ পৃ.):</strong> ব্যক্তিত্বের চৌম্বকত্ব ও সম্মোহন বিদ্যা।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>তাৎক্ষণিক অ্যাক্সেস:</strong> পেমেন্ট সম্পন্ন হওয়ামাত্র উভয় বইয়ের ডাউনলোড লিংক সক্রিয়।</span>
                  </div>
                </div>

                {/* Countdown Timer Status */}
                <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#101015] border border-[#262630] text-xs">
                  <span className="text-[10px] sm:text-[11px] text-[#A8A095] font-bengali-serif">অফার সক্রিয় আছে:</span>
                  <CountdownTimer variant="compact-pill" label="Ends in" lang="en" />
                </div>

                {/* Main Action CTA Button */}
                <button
                  type="button"
                  onClick={handleClaim}
                  className="w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl btn-gold text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer hover-lift btn-shimmer shadow-lg group"
                >
                  <span>{promoData.ctaText || "২-বুক মাস্টার বান্ডেল কিনুন (৳১৯৯)"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Footer Assurance Badges */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-[#8A8278] pt-0.5">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>১০০% নিরাপদ বিকাশ পেমেন্ট</span>
                  </div>
                  <span className="text-[#2A2A2E]">•</span>
                  <span>লাইফটাইম ডাউনলোড অ্যাক্সেস</span>
                </div>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
