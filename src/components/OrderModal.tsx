"use client";

import React, { useEffect, useRef } from "react";
import OrderForm from "./OrderForm";
import { X } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCouponCode?: string;
}

export default function OrderModal({ isOpen, onClose, initialCouponCode }: OrderModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Gold accent glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[200px] sm:h-[300px] bg-[#C8A45C]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-[500px] max-h-[90dvh] overflow-y-auto bg-[#0D0D10] sm:rounded-3xl rounded-t-3xl border border-[#2A2A2E] shadow-[0_0_80px_rgba(0,0,0,0.7)] my-0 sm:my-6 animate-fadeInUp sm:animate-scaleIn"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#2A2A2E transparent" }}
      >
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent opacity-80" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-[#1A1A1E]/90 hover:bg-[#2A2A2E] text-[#D1C9BC] hover:text-[#F0EBE0] transition-all duration-300 z-20 cursor-pointer backdrop-blur-sm group"
          aria-label="Close checkout modal"
        >
          <X className="w-4 h-4 transition-transform duration-300 ease-out group-hover:rotate-90" />
        </button>

        {/* Content */}
        <div className="p-4 sm:p-6 pt-5">
          <OrderForm onSuccess={() => {}} initialCouponCode={initialCouponCode} />
        </div>
      </div>
    </div>
  );
}
