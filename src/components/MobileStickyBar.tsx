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
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#08080A]/90 backdrop-blur-xl border-t border-[#2A2A2E] p-3 shadow-2xl animate-fadeInUp">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="font-display font-bold text-xs text-[#F0EBE0] leading-none">
            The 48 Laws of Power (PDF)
          </span>
          <span className="text-xs font-mono font-bold text-[#C8A45C] mt-0.5">
            {siteConfig.currencySymbol}{siteConfig.price} <span className="text-[10px] text-emerald-400">(তাৎক্ষণিক)</span>
          </span>
        </div>
        <button
          onClick={onOpenOrderModal}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full btn-gold text-xs font-bold cursor-pointer shrink-0 hover-lift btn-shimmer group"
        >
          <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span>ডিজিটাল কপি নিন</span>
        </button>
      </div>
    </div>
  );
}
