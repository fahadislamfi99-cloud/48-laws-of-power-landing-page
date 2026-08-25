"use client";

import React from "react";
import OrderForm from "./OrderForm";
import { X } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-transparent my-auto">
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 sm:-right-2 p-2 rounded-full bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <OrderForm />
      </div>
    </div>
  );
}
