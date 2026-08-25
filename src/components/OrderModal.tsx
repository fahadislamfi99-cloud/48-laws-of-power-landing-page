"use client";

import React from "react";
import OrderForm from "./OrderForm";
import { X, Crown, Sparkles } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#D5CDBE] overflow-hidden my-6 animate-scaleIn">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all duration-200 hover:rotate-90 z-10 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-2 sm:p-4">
          <OrderForm onSuccess={() => {}} />
        </div>

      </div>
    </div>
  );
}
