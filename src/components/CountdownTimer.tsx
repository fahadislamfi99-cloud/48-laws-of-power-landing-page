"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000; // 48 hours = 172,800,000 ms
const STORAGE_KEY = "laws48_countdown_epoch_v1";

function toBengaliDigit(num: number): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num)
    .padStart(2, "0")
    .split("")
    .map((d) => bnDigits[parseInt(d, 10)] ?? d)
    .join("");
}

interface CountdownTimerProps {
  variant?: "luxury-box" | "compact-pill" | "inline";
  label?: string;
}

export default function CountdownTimer({
  variant = "luxury-box",
  label = "অফার শেষ হতে বাকি",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 1, hours: 23, minutes: 59, seconds: 59 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Initialize or get the base epoch
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

  if (!mounted) {
    return null;
  }

  // ─── Minimalist Inline Pill ───────────────────────────────────────────────
  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[#C8A45C] font-mono text-[11px] sm:text-xs font-bold">
        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse text-[#C8A45C]" />
        <span>
          {toBengaliDigit(timeLeft.days)}d : {toBengaliDigit(timeLeft.hours)}h : {toBengaliDigit(timeLeft.minutes)}m : {toBengaliDigit(timeLeft.seconds)}s
        </span>
      </span>
    );
  }

  // ─── Compact Pill Variant ────────────────────────────────────────────────
  if (variant === "compact-pill") {
    return (
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#141418] border border-[#C8A45C]/30 text-xs text-[#F0EBE0] shadow-sm max-w-full">
        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C8A45C] animate-pulse shrink-0" />
        <span className="text-[#A8A095] text-[10px] sm:text-[11px] font-medium shrink-0">{label}:</span>
        <span className="font-mono font-bold text-[#C8A45C] tracking-wide text-[11px] sm:text-xs whitespace-nowrap">
          {toBengaliDigit(timeLeft.days)}d {toBengaliDigit(timeLeft.hours)}h {toBengaliDigit(timeLeft.minutes)}m {toBengaliDigit(timeLeft.seconds)}s
        </span>
      </div>
    );
  }

  // ─── Luxury Block Variant (For Promo Popup & Feature Sections) ───────────
  return (
    <div className="space-y-1 sm:space-y-1.5">
      {label && (
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#A8A095] font-semibold">
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Clock className="w-3 h-3 text-[#C8A45C] animate-pulse" />
            <span>{label}</span>
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#C8A45C] uppercase tracking-wider font-bold">
            স্বয়ংক্রিয় অফার
          </span>
        </div>
      )}

      <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center">
        {[
          { label: "দিন", value: timeLeft.days },
          { label: "ঘণ্টা", value: timeLeft.hours },
          { label: "মিনিট", value: timeLeft.minutes },
          { label: "সেকেন্ড", value: timeLeft.seconds },
        ].map((unit, idx) => (
          <div
            key={idx}
            className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-[#141418] border border-[#2A2A2E] flex flex-col items-center justify-center group hover:border-[#C8A45C]/40 transition-colors"
          >
            <span className="font-mono font-black text-xs sm:text-base text-[#F0EBE0] group-hover:text-[#C8A45C] transition-colors leading-none">
              {toBengaliDigit(unit.value)}
            </span>
            <span className="text-[8px] sm:text-[10px] text-[#8A8278] font-medium mt-0.5 sm:mt-1 leading-none">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
