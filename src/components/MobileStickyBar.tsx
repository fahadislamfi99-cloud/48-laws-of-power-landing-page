"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Download } from "lucide-react";

interface MobileStickyBarProps {
  onOpenOrderModal: () => void;
}

export default function MobileStickyBar({ onOpenOrderModal }: MobileStickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 280);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0D0D10]/95 backdrop-blur-xl border-t border-[#C8A45C]/25 px-4 pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out transform ${
        visible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{
        paddingBottom: "max(14px, env(safe-area-inset-bottom, 14px))",
      }}
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col space-y-0.5 min-w-0">
          <span className="font-display font-bold text-xs text-[#F0EBE0] tracking-wide truncate">
            The 48 Laws of Power (PDF)
          </span>
          <div className="flex items-center gap-1.5 leading-tight">
            <span className="text-xs font-bold text-[#C8A45C]">
              {siteConfig.currencySymbol}{siteConfig.price}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              তাৎক্ষণিক
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenOrderModal}
          className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-full btn-gold text-xs font-bold cursor-pointer shrink-0 hover-lift btn-shimmer shadow-md group whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span>ডিজিটাল কপি</span>
        </button>
      </div>
    </div>
  );
}
