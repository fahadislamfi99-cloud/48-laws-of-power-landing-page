"use client";

import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export interface ToastState {
  message: string;
  type: "success" | "error";
}

interface ToastNotificationProps {
  toast: ToastState | null;
  onClose: () => void;
}

export default function ToastNotification({ toast, onClose }: ToastNotificationProps) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fadeInUp">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold ${
          toast.type === "success"
            ? "bg-slate-900 text-white border-emerald-500/40 shadow-emerald-950/20"
            : "bg-rose-950 text-white border-rose-500/40 shadow-rose-950/20"
        }`}
      >
        {toast.type === "success" ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
        )}
        <span>{toast.message}</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-white p-0.5 rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
