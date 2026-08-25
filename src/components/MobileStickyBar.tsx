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
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#D8D0C3] p-3 shadow-2xl animate-fadeInUp">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="font-display font-bold text-xs text-[#121316] leading-none">
            The 48 Laws of Power (PDF)
          </span>
          <span className="text-xs font-mono font-bold text-[#8F6B2C] mt-0.5">
            {siteConfig.currencySymbol}{siteConfig.price} <span className="text-[10px] text-emerald-700">(তাৎক্ষণিক ডাউনলোড)</span>
          </span>
        </div>

        <button
          onClick={onOpenOrderModal}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#121316] text-[#FAF8F5] font-bold text-xs shadow-md cursor-pointer shrink-0 hover-lift active-lift btn-shimmer group"
        >
          <Download className="w-3.5 h-3.5 text-[#DFC07A] transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span>ডিজিটাল কপি নিন</span>
        </button>
      </div>
    </div>
  );
}
