"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Clock, Tag } from "lucide-react";

interface TopAnnouncementBarProps {
  onOpenOrderModal: (couponCode?: string) => void;
}

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000; // 48 hours
const STORAGE_KEY = "laws48_countdown_epoch_v1";

function toBengaliDigit(num: number): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num)
    .padStart(2, "0")
    .split("")
    .map((d) => bnDigits[parseInt(d, 10)] ?? d)
    .join("");
}

export default function TopAnnouncementBar({ onOpenOrderModal }: TopAnnouncementBarProps) {
  const [promoData, setPromoData] = useState<{
    isEnabled: boolean;
    couponCode: string;
    discountAmount: number;
    offerTag?: string;
    title?: string;
  } | null>(null);

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 1, hours: 23, minutes: 59, seconds: 59 });

  const [mounted, setMounted] = useState(false);

  // 1. Fetch promo settings from backend
  useEffect(() => {
    async function loadPromo() {
      try {
        const res = await fetch("/api/public/promo-banner");
        const data = await res.json();
        if (data.success && data.banner && data.banner.isEnabled) {
          setPromoData({
            isEnabled: true,
            couponCode: data.banner.couponCode || "POWER50",
            discountAmount: data.banner.discountAmount || 50,
            offerTag: data.banner.offerTag || "৳৫০ OFF",
            title: data.banner.title || "আজই পাচ্ছেন ৳৫০ ছাড়",
          });
        }
      } catch {
        // fallback
      }
    }
    loadPromo();
  }, []);

  // 2. Timestamp-based continuous 2-day loop countdown
  useEffect(() => {
    setMounted(true);

    let baseEpoch = 0;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        baseEpoch = parseInt(stored, 10);
      } else {
        baseEpoch = Date.now();
        localStorage.setItem(STORAGE_KEY, String(baseEpoch));
      }
    } catch {
      baseEpoch = Date.now();
    }

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = (now - baseEpoch) % TWO_DAYS_MS;
      const remainingMs = TWO_DAYS_MS - elapsed;

      const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || !promoData || !promoData.isEnabled) {
    return null;
  }

  const handleClick = () => {
    onOpenOrderModal(promoData.couponCode);
  };

  return (
    <aside
      aria-label="Limited-time offer announcement"
      onClick={handleClick}
      className="relative z-50 bg-[#09090C] border-b border-[#C8A45C]/25 text-[#F0EBE0] cursor-pointer hover:bg-[#111116] transition-colors duration-200 group"
    >
      {/* Top Gold Shimmer Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A45C]/70 to-transparent" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 text-xs sm:text-sm">
        
        {/* ─── LEFT / OFFER COPY ────────────────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-[#C8A45C] text-[#08080A] font-extrabold text-[10px] sm:text-xs tracking-wider shrink-0 uppercase shadow-xs">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>{promoData.offerTag || "৳৫০ OFF"}</span>
          </span>

          <span className="text-[#F0EBE0] font-medium text-xs sm:text-sm truncate">
            <span className="hidden md:inline">The 48 Laws of Power (বাংলা) — </span>
            <strong className="text-[#C8A45C] font-semibold">বিশেষ ছাড়</strong> শেষ হতে বাকি
          </span>
        </div>

        {/* ─── CENTER & RIGHT / COUNTDOWN + CTA ──────────────────────────── */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          
          {/* Segmented Countdown Unit Badges */}
          <div className="flex items-center gap-1 font-mono text-[11px] sm:text-xs">
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#141418] border border-[#2A2A2E] text-[#F0EBE0]">
              <span className="font-bold text-[#C8A45C]">{toBengaliDigit(timeLeft.days)}</span>
              <span className="text-[9px] text-[#8A8278] hidden sm:inline">দিন</span>
            </div>
            <span className="text-[#C8A45C] font-bold">:</span>
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#141418] border border-[#2A2A2E] text-[#F0EBE0]">
              <span className="font-bold text-[#C8A45C]">{toBengaliDigit(timeLeft.hours)}</span>
              <span className="text-[9px] text-[#8A8278] hidden sm:inline">ঘণ্টা</span>
            </div>
            <span className="text-[#C8A45C] font-bold">:</span>
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#141418] border border-[#2A2A2E] text-[#F0EBE0]">
              <span className="font-bold text-[#C8A45C]">{toBengaliDigit(timeLeft.minutes)}</span>
              <span className="text-[9px] text-[#8A8278] hidden sm:inline">মি.</span>
            </div>
            <span className="text-[#C8A45C] font-bold">:</span>
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#141418] border border-[#2A2A2E] text-[#F0EBE0]">
              <span className="font-bold text-[#C8A45C]">{toBengaliDigit(timeLeft.seconds)}</span>
              <span className="text-[9px] text-[#8A8278] hidden sm:inline">সে.</span>
            </div>
          </div>

          {/* Action Prompt with Arrow Hover Effect */}
          <div className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#C8A45C] group-hover:text-[#F0EBE0] transition-colors pl-1">
            <span>অফারটি নিন</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-[#C8A45C] sm:hidden" />
        </div>

      </div>
    </aside>
  );
}
