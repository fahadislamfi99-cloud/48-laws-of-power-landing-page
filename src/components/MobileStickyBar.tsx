"use client";

import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Download } from "lucide-react";

interface MobileStickyBarProps {
  onOpenOrderModal: () => void;
}

export default function MobileStickyBar({ onOpenOrderModal }: MobileStickyBarProps) {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      const shouldBeVisible = window.scrollY > 280;
      if (shouldBeVisible !== visibleRef.current) {
        visibleRef.current = shouldBeVisible;
        setVisible(shouldBeVisible);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkScroll);
      }
    };

    checkScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0D0D10]/95 backdrop-blur-xl border-t border-[#C8A45C]/25 px-3 sm:px-4 pt-2.5 sm:pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out transform ${
        visible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{
        paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))",
      }}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-3 max-w-md mx-auto">
        <div className="flex flex-col space-y-0.5 min-w-0">
          <span className="font-display font-bold text-[11px] sm:text-xs text-[#F0EBE0] tracking-wide truncate">
            The 48 Laws of Power
          </span>
          <div className="flex items-center gap-1.5 leading-tight">
            <span className="text-xs sm:text-sm font-bold text-[#C8A45C]">
              {siteConfig.currencySymbol}{siteConfig.price}
            </span>
            <span className="text-[9px] sm:text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              তাৎক্ষণিক
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenOrderModal}
          className="inline-flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-full btn-gold text-[11px] sm:text-xs font-bold cursor-pointer shrink-0 hover-lift btn-shimmer shadow-md group whitespace-nowrap min-h-[40px]"
        >
          <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span>ডিজিটাল কপি</span>
        </button>
      </div>
    </div>
  );
}
