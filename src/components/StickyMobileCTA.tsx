"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { ShoppingCart } from "lucide-react";

interface StickyMobileCTAProps {
  onOpenOrderModal: () => void;
}

export default function StickyMobileCTA({ onOpenOrderModal }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FAF7F2]/95 backdrop-blur-md border-t border-amber-400/60 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] animate-slideUp">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs font-serif font-bold text-stone-900 leading-tight">
            The 48 Laws of Power
          </span>
          <span className="text-xs font-bold text-amber-900">
            {siteConfig.currencySymbol}{siteConfig.price} <span className="text-[10px] text-emerald-700 font-semibold">(ফ্রি ডেলিভারি)</span>
          </span>
        </div>

        <button
          onClick={onOpenOrderModal}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs shadow-md cursor-pointer shrink-0"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>এখনই কিনুন</span>
        </button>
      </div>
    </div>
  );
}
