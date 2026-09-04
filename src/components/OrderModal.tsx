"use client";

import React, { useEffect, useRef } from "react";
import OrderForm from "./OrderForm";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCouponCode?: string;
}

export default function OrderModal({ isOpen, onClose, initialCouponCode }: OrderModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-x-hidden overflow-y-auto">
          {/* Backdrop: Gradual Darken + Subtle Background Blur */}
          <motion.div
            key="order-modal-backdrop"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/75 cursor-pointer will-change-[backdrop-filter,opacity]"
            onClick={onClose}
          />

          {/* Ambient Gold Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[200px] sm:h-[300px] bg-[#C8A45C]/8 rounded-full blur-[100px] pointer-events-none"
          />

          {/* Modal Panel: Slower, Silky Smooth Fade + Subtle Scale Entrance */}
          <motion.div
            key="order-modal-panel"
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative w-full max-w-[530px] max-h-[92dvh] overflow-y-auto bg-[#0D0D10] rounded-2xl sm:rounded-3xl border border-[#2A2A2E] shadow-[0_20px_70px_rgba(0,0,0,0.85)] my-auto z-10 will-change-[transform,opacity]"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#2A2A2E transparent" }}
          >
            {/* Top gold accent line */}
            <div className="sticky top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent opacity-90 z-40" />

            {/* Modal Header Bar: Fixed/Sticky at top, preventing any overlap with content */}
            <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0D0D10]/95 backdrop-blur-md border-b border-[#222228]">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <div className="min-w-0 py-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-[#F0EBE0] font-bengali-serif leading-normal tracking-wide">
                    ডিজিটাল চেকআউট
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#A8A095] leading-normal font-sans mt-0.5">
                    লাইফটাইম এক্সেস ও তাৎক্ষণিক ডাউনলোড
                  </p>
                </div>
              </div>

              {/* Safe, Dedicated Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-xl bg-[#18181D] hover:bg-[#25252D] text-[#A8A095] hover:text-[#F0EBE0] border border-[#2A2A32] hover:border-[#3E3E48] transition-all duration-200 cursor-pointer shrink-0 ml-3 group"
                aria-label="Close checkout modal"
              >
                <X className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              </button>
            </div>

            {/* Content Area with Balanced Spacing */}
            <div className="p-4 sm:p-6 pt-3.5 sm:pt-4">
              <OrderForm onSuccess={() => {}} initialCouponCode={initialCouponCode} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
