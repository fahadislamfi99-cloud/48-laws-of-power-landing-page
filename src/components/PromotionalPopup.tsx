"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Copy, Check, Gift, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { motion, AnimatePresence } from "motion/react";

export interface PromoBannerData {
  isEnabled: boolean;
  badgeText: string;
  title: string;
  subtitle?: string;
  description: string;
  couponCode: string;
  discountAmount: number;
  discountType: "fixed" | "percentage";
  ctaText: string;
  offerTag?: string;
  imageUrl?: string;
  displayDelaySeconds: number;
  cooldownHours: number;
}

interface PromotionalPopupProps {
  onClaimOffer: (couponCode: string) => void;
}

const STORAGE_KEY = "laws48_promo_dismissed_session_v1";

export default function PromotionalPopup({ onClaimOffer }: PromotionalPopupProps) {
  const [promoData, setPromoData] = useState<PromoBannerData | null>({
    isEnabled: true,
    badgeText: "বিশেষ অফার 🎁",
    title: "আজই পাচ্ছেন ৳৫০ ছাড়",
    subtitle: "The 48 Laws of Power (বাংলা অনুবাদ)",
    description: "৩,০০০ বছরের মানব মনস্তত্ত্ব ও ক্ষমতার রণকৌশল শিখুন বিশেষ ডিসকাউন্টে। সম্পূর্ণ ৫০৯ পৃষ্ঠার বাংলা ডিজিটাল বইতে তাৎক্ষণিক অ্যাক্সেস পান।",
    couponCode: "POWER50",
    discountAmount: 50,
    discountType: "fixed",
    ctaText: "অফারটি ব্যবহার করুন",
    offerTag: "৳৫০ OFF",
    imageUrl: "/images/promo-power-strategy.jpg",
    displayDelaySeconds: 3,
    cooldownHours: 24,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  // 1. Fetch promotional settings from public API
  useEffect(() => {
    let isMounted = true;

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

          // Trigger popup after configured delay
          const delayMs = Math.max(1, data.banner.displayDelaySeconds ?? 3) * 1000;
          const timer = setTimeout(() => {
            if (isMounted) {
              setIsOpen(true);
            }
          }, delayMs);

          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.warn("[Promo Popup Load Warning]:", err);
      }
    }

    loadPromo();

    return () => {
      isMounted = false;
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

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!promoData?.couponCode) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(promoData.couponCode);
      } else {
        const input = document.createElement("input");
        input.value = promoData.couponCode;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    }
  };

  const handleClaim = () => {
    handleDismiss();
    if (promoData?.couponCode) {
      onClaimOffer(promoData.couponCode);
    }
  };

  if (!promoData || !promoData.isEnabled) {
    return null;
  }

  const fallbackImage = "/images/promo-power-strategy.jpg";
  const displayImage = imageError ? fallbackImage : (promoData.imageUrl || fallbackImage);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-x-hidden overflow-y-auto">
          {/* Backdrop: Gradual Darken + Subtle Background Blur */}
          <motion.div
            key="promo-backdrop"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/75 cursor-pointer will-change-[backdrop-filter,opacity]"
            onClick={handleDismiss}
          />

          {/* Background ambient gold radial glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-[#C8A45C]/10 rounded-full blur-[120px] pointer-events-none"
          />

          {/* Main Luxury Popup Shell */}
          <motion.div
            key="promo-panel"
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative w-full max-w-[440px] md:max-w-[760px] lg:max-w-[820px] max-h-[92dvh] overflow-y-auto bg-[#0D0D10] rounded-2xl sm:rounded-3xl border border-[#2A2A2E] shadow-[0_20px_70px_rgba(0,0,0,0.85)] my-auto z-10 will-change-[transform,opacity]"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Top Gold Shimmer Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent z-20 opacity-90" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-[#1A1A1E]/90 hover:bg-[#2A2A2E] text-[#D1C9BC] hover:text-[#F0EBE0] border border-[#2A2A2E] hover:border-[#C8A45C]/40 transition-all duration-300 z-30 cursor-pointer backdrop-blur-sm group"
              aria-label="Close promotional offer"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 ease-out group-hover:rotate-90" />
            </button>

            {/* Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              
              {/* ─── LEFT / TOP: Cinematic Artwork ──────────────── */}
              <div className="md:col-span-5 relative overflow-hidden bg-[#070709] min-h-[140px] xs:min-h-[180px] sm:min-h-[240px] md:min-h-[460px] flex items-center justify-center">
                <img
                  src={displayImage}
                  alt="The 48 Laws of Power strategy artwork"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover object-[28%_38%] sm:object-[28%_38%] md:object-[28%_42%] transition-all duration-700 ${
                    imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0D0D10]/90 via-transparent to-transparent md:from-transparent md:via-transparent md:to-[#0D0D10]/80 pointer-events-none" />
                
                {promoData.offerTag && (
                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#C8A45C] text-[#0A0A0C] font-bold text-[10px] sm:text-xs shadow-lg tracking-wide">
                      <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{promoData.offerTag}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* ─── RIGHT / BOTTOM: Editorial Copy ──── */}
              <div className="md:col-span-7 p-3.5 sm:p-7 md:p-8 flex flex-col justify-between space-y-3 sm:space-y-5 text-left">
                
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#C8A45C]/15 border border-[#C8A45C]/30 text-[#C8A45C] font-semibold text-[11px] sm:text-xs shadow-xs">
                      <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{promoData.badgeText || "বিশেষ অফার 🎁"}</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#A8A095] bg-[#16161A] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-[#2A2A2E]">
                      সীমিত সময়ের জন্য
                    </span>
                  </div>

                  <h3 className="text-lg xs:text-xl sm:text-2xl md:text-[26px] font-bengali-serif font-bold text-[#F0EBE0] leading-snug tracking-tight">
                    {promoData.title}
                  </h3>

                  {promoData.subtitle && (
                    <p className="text-xs sm:text-sm font-semibold text-[#C8A45C]">
                      {promoData.subtitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-[#C4BCB0] leading-relaxed pt-0.5 font-normal">
                    {promoData.description}
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#141418] border border-[#2A2A2E] space-y-1 sm:space-y-1.5 shadow-inner">
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#A8A095]">
                    <span className="font-semibold text-[#D1C9BC] flex items-center gap-1 sm:gap-1.5">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                      অফারের মেয়াদ শেষ হতে বাকি:
                    </span>
                    <span className="font-mono text-[#C8A45C]">আজকের ছাড়</span>
                  </div>
                  <CountdownTimer variant="luxury-box" label="অফার শেষ হতে বাকি" />
                </div>

                {/* Coupon Code Pill */}
                {promoData.couponCode && (
                  <div className="flex items-center justify-between p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#09090C] border border-[#2A2A2E] hover:border-[#C8A45C]/40 transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#C8A45C]/10 border border-[#C8A45C]/20 flex items-center justify-center shrink-0">
                        <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C8A45C]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] sm:text-[10px] text-[#8A8278] block uppercase tracking-wider font-semibold">
                          কুপন কোড
                        </span>
                        <span className="font-mono font-bold text-xs sm:text-sm text-[#F0EBE0] tracking-wider truncate block">
                          {promoData.couponCode}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#16161A] hover:bg-[#202028] border border-[#2A2A2E] text-[11px] sm:text-xs text-[#D1C9BC] hover:text-[#C8A45C] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">কপি হয়েছে</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>কপি করুন</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Main CTA Button */}
                <button
                  type="button"
                  onClick={handleClaim}
                  className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl btn-gold text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer hover-lift btn-shimmer shadow-lg group"
                >
                  <span>{promoData.ctaText || "অফারটি গ্রহণ করুন"}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Footer Assurance Badges */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-[#8A8278] pt-0.5 sm:pt-1">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                    <span>তাৎক্ষণিক ডেলিভারি</span>
                  </div>
                  <span className="text-[#2A2A2E]">•</span>
                  <span>স্বয়ংক্রিয় কুপন প্রয়োগ</span>
                </div>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
