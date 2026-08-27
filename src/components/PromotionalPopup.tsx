"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Copy, Check, Sparkles, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

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

const STORAGE_KEY = "laws48_promo_dismissed_at";

export default function PromotionalPopup({ onClaimOffer }: PromotionalPopupProps) {
  const [promoData, setPromoData] = useState<PromoBannerData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // 1. Fetch promotional settings from public API
  useEffect(() => {
    let isMounted = true;

    async function loadPromo() {
      try {
        const res = await fetch("/api/public/promo-banner");
        const data = await res.json();

        if (isMounted && data.success && data.banner && data.banner.isEnabled) {
          setPromoData(data.banner);

          // Check dismissal cooldown in localStorage
          const dismissedAt = localStorage.getItem(STORAGE_KEY);
          if (dismissedAt) {
            const cooldownMs = (data.banner.cooldownHours || 24) * 60 * 60 * 1000;
            const timeSinceDismiss = Date.now() - Number(dismissedAt);
            if (timeSinceDismiss < cooldownMs) {
              return; // Still in cooldown
            }
          }

          // Trigger popup after configured delay (e.g. 4 seconds)
          const delayMs = Math.max(1, data.banner.displayDelaySeconds ?? 4) * 1000;
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

    // Prevent background scrolling without layout shift
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
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
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
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

  if (!isOpen || !promoData || !promoData.isEnabled) {
    return null;
  }

  const fallbackImage = "/images/promo-power-strategy.jpg";
  const displayImage = imageError ? fallbackImage : (promoData.imageUrl || fallbackImage);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-popup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleDismiss();
      }}
    >
      {/* Background ambient gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-[#C8A45C]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Luxury Popup Shell */}
      <div
        ref={panelRef}
        className="relative w-full max-w-[440px] md:max-w-[760px] lg:max-w-[820px] max-h-[90dvh] overflow-y-auto bg-[#0D0D10] rounded-3xl border border-[#2A2A2E] shadow-[0_20px_70px_rgba(0,0,0,0.85)] animate-scaleIn my-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Top Gold Shimmer Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent z-20 opacity-90" />

        {/* Close Button with Smooth 90deg Hover Rotation */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full bg-[#1A1A1E]/90 hover:bg-[#2A2A2E] text-[#D1C9BC] hover:text-[#F0EBE0] border border-[#2A2A2E] hover:border-[#C8A45C]/40 transition-all duration-300 z-30 cursor-pointer backdrop-blur-sm group"
          aria-label="Close promotional offer"
        >
          <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 ease-out group-hover:rotate-90" />
        </button>

        {/* Layout: Vertical Stack on Mobile (< md), 2-Column Split on Desktop (>= md) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          
          {/* ─── LEFT / TOP: High-End Cinematic Artwork ──────────────── */}
          <div className="md:col-span-5 relative overflow-hidden bg-black min-h-[160px] sm:min-h-[200px] md:min-h-full">
            <img
              src={displayImage}
              alt="The 48 Laws of Power strategy artwork"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover object-center transition-all duration-700 ${
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            />
            {/* Dark Vignette Overlay for Luxury Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0D0D10] via-[#0D0D10]/40 to-transparent" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 pointer-events-none" />

            {/* Float Ribbon Tag */}
            <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A45C] text-[#08080A] font-display font-extrabold text-[11px] sm:text-xs shadow-lg uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#08080A]" />
                <span>{promoData.offerTag || "৳৫০ OFF"}</span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT / BOTTOM: Editorial Offer Copy & Interactions ──── */}
          <div className="md:col-span-7 p-5 sm:p-7 md:p-8 flex flex-col justify-between space-y-4 sm:space-y-5 text-left">
            
            {/* Header / Subtitle / Title */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#C8A45C] bg-[#C8A45C]/10 px-2.5 py-0.5 rounded-md border border-[#C8A45C]/20">
                  <span>{promoData.badgeText || "বিশেষ অফার 🎁"}</span>
                </span>
                <span className="text-[11px] text-[#A8A095] font-semibold hidden sm:inline">
                  • সীমিত সময়ের জন্য
                </span>
              </div>

              <h3
                id="promo-popup-title"
                className="text-xl sm:text-2xl lg:text-[26px] font-bengali-serif font-bold text-[#F0EBE0] leading-snug tracking-tight"
              >
                {promoData.title || "আজই পাচ্ছেন ৳৫০ ছাড়"}
              </h3>

              <p className="text-xs sm:text-sm text-[#C4BCB0] leading-relaxed font-normal">
                {promoData.description ||
                  "৩,০০০ বছরের মানব মনস্তত্ত্ব ও ক্ষমতার রণকৌশল শিখুন বিশেষ ডিসকাউন্টে। সম্পূর্ণ ৫০৯ পৃষ্ঠার বাংলা ডিজিটাল বইতে তাৎক্ষণিক অ্যাক্সেস পান।"}
              </p>
            </div>

            {/* 2-Day Continuous Loop Luxury Countdown Timer */}
            <div className="pt-1">
              <CountdownTimer variant="luxury-box" label="অফার শেষ হতে বাকি" />
            </div>

            {/* Coupon Code Pill with 1-Click Copy Interaction */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-[#141418] border border-[#C8A45C]/30 flex items-center justify-between gap-2.5 transition-all hover:border-[#C8A45C]/60 shadow-inner">
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase font-bold text-[#8A8278] tracking-wider">
                  <Tag className="w-3 h-3 text-[#C8A45C]" />
                  <span>Coupon Code</span>
                </div>
                <div className="font-mono font-black text-base sm:text-lg text-[#C8A45C] tracking-wider truncate">
                  {promoData.couponCode}
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#C8A45C]/15 hover:bg-[#C8A45C]/25 text-[#C8A45C] hover:text-[#F0EBE0] text-xs font-bold transition-all border border-[#C8A45C]/35 cursor-pointer hover:scale-102 active:scale-98 shrink-0"
                title="কুপন কোড কপি করুন"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 animate-scaleIn" />
                    <span className="text-emerald-400 font-extrabold">✓ Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>কপি করুন</span>
                  </>
                )}
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleClaim}
                className="w-full py-3.5 sm:py-4 rounded-2xl btn-gold text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer hover-lift btn-shimmer shadow-lg group"
              >
                <span>{promoData.ctaText || "অফারটি ব্যবহার করুন"}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8A8278]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45C]" />
                <span>বিকাশ সিকিউর পেমেন্ট • তাৎক্ষণিক অটো ডেলিভারি</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
