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
            {/* Top gold line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent opacity-80" />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-[#1A1A1E]/90 hover:bg-[#2A2A2E] text-[#D1C9BC] hover:text-[#F0EBE0] transition-all duration-300 z-20 cursor-pointer backdrop-blur-sm group"
              aria-label="Close checkout modal"
            >
              <X className="w-4 h-4 transition-transform duration-300 ease-out group-hover:rotate-90" />
            </button>

            {/* Content */}
            <div className="p-3.5 sm:p-6 pt-4 sm:pt-5">
              <OrderForm onSuccess={() => {}} initialCouponCode={initialCouponCode} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
