"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { trackInitiateCheckout } from "@/lib/pixel";
import {
  ShieldCheck, Mail, Zap, Loader2, Sparkles, Tag, ArrowRight,
} from "lucide-react";

interface OrderFormProps {
  onSuccess?: () => void;
  initialCouponCode?: string;
}

export default function OrderForm({ onSuccess, initialCouponCode }: OrderFormProps) {
  const [gmail, setGmail] = useState("");
  const [couponCode, setCouponCode] = useState(initialCouponCode || "");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const originalPrice = siteConfig.price || 999;
  const currentPrice = Math.max(1, originalPrice - discountAmount);

  useEffect(() => {
    trackInitiateCheckout(currentPrice);
  }, [currentPrice]);

  // Auto-apply initial coupon if passed
  useEffect(() => {
    if (initialCouponCode && initialCouponCode.trim()) {
      setCouponCode(initialCouponCode.trim().toUpperCase());
      applySpecificCoupon(initialCouponCode.trim().toUpperCase());
    }
  }, [initialCouponCode]);

  const applySpecificCoupon = async (codeToApply: string) => {
    if (!codeToApply) return;
    setValidatingCoupon(true);
    setCouponMessage(null);

    try {
      const res = await fetch("/api/public/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeToApply, amount: originalPrice }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setDiscountAmount(data.discountAmount);
        setAppliedCoupon(data.code);
        setCouponMessage({ text: data.message });
      } else {
        setCouponMessage({ text: data.message || "অবৈধ কুপন কোড", error: true });
        setDiscountAmount(0);
        setAppliedCoupon(null);
      }
    } catch {
      setCouponMessage({ text: "কুপন যাচাইকরণে ত্রুটি", error: true });
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setValidatingCoupon(true);
    setCouponMessage(null);

    try {
      const res = await fetch("/api/public/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim(), amount: originalPrice }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setDiscountAmount(data.discountAmount);
        setAppliedCoupon(data.code);
        setCouponMessage({ text: data.message });
      } else {
        setCouponMessage({ text: data.message || "অবৈধ কুপন কোড", error: true });
        setDiscountAmount(0);
        setAppliedCoupon(null);
      }
    } catch {
      setCouponMessage({ text: "কুপন যাচাইকরণে ত্রুটি", error: true });
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gmail.trim() || !gmail.includes("@")) {
      setErrorMessage("অনুগ্রহ করে একটি সঠিক জিমেইল (Gmail) আইডি দিন।");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/bkash/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: gmail.trim(),
          couponCode: appliedCoupon || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.bkashURL) {
        window.location.href = data.bkashURL;
      } else {
        setErrorMessage(data.message || "বিকাশ পেমেন্ট গেটওয়ে চালু করতে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।");
        setIsSubmitting(false);
      }
    } catch {
      setErrorMessage("সার্ভার সংযোগে ত্রুটি। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-5">
      
      {/* Product Summary Header */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-[#26262A]">
        <div className="relative shrink-0">
          <img
            src="/images/book-mockup.png"
            alt="The 48 Laws of Power"
            className="h-16 w-auto object-contain drop-shadow-md"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase font-bold text-[#C8A45C] bg-[#C8A45C]/10 px-2.5 py-0.5 rounded-md border border-[#C8A45C]/20">
              ডিজিটাল PDF
            </span>
            <span className="text-xs text-emerald-400 font-bold">
              ইনস্ট্যান্ট অ্যাক্সেস
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bengali-serif font-bold text-[#F0EBE0] leading-tight mt-1.5 truncate">
            The 48 Laws of Power (বাংলা সংস্করণ)
          </h3>
          <div className="flex items-center gap-2.5 mt-1.5">
            <span className="text-xl font-display font-bold text-[#C8A45C]">
              {siteConfig.currencySymbol}{currentPrice}
            </span>
            <span className="text-xs text-[#A8A095] line-through">
              {siteConfig.currencySymbol}{siteConfig.originalPrice}
            </span>
            {discountAmount > 0 ? (
              <span className="text-xs text-emerald-400 font-bold">
                (৳{discountAmount} কুপন ছাড়)
              </span>
            ) : (
              <span className="text-xs text-[#C8A45C] font-semibold">
                (৩৪% ছাড়)
              </span>
            )}
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      {/* Gmail Input Field */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-bold text-[#F0EBE0] flex items-center justify-between">
          <span>আপনার জিমেইল (Gmail) ঠিকানা <span className="text-[#E24848]">*</span></span>
          <span className="text-xs text-[#A8A095] font-normal">ডাউনলোড কপি পৌঁছাবে</span>
        </label>
        <div className="relative group flex items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#A8A095] group-focus-within:text-[#C8A45C] transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            required
            placeholder="example@gmail.com"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 input-dark text-sm placeholder:text-[#8A8278] text-[#F0EBE0]"
          />
        </div>
        <p className="text-xs text-[#A8A095] pl-1">
          পেমেন্ট নিশ্চিত হওয়ার সাথে সাথে এই জিমেইলে লাইফটাইম ডাউনলোড লিংক সংরক্ষিত থাকবে।
        </p>
      </div>

      {/* Coupon Code Input */}
      <div className="space-y-1.5">
        <div className="flex gap-2">
          <div className="relative flex-1 group flex items-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#A8A095]">
              <Tag className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="কুপন কোড (যদি থাকে)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-[#09090C] border border-[#26262A] rounded-xl text-xs font-mono uppercase text-[#F0EBE0] outline-none focus:border-[#C8A45C]"
            />
          </div>
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={validatingCoupon || !couponCode.trim()}
            className="px-4 py-2.5 rounded-xl bg-[#1A1A1F] hover:bg-[#25252D] text-xs font-bold text-[#C8A45C] border border-[#33333A] cursor-pointer disabled:opacity-50 transition-colors"
          >
            {validatingCoupon ? "..." : "প্রয়োগ"}
          </button>
        </div>
        {couponMessage && (
          <p className={`text-xs ${couponMessage.error ? "text-rose-400" : "text-emerald-400"} font-semibold pl-1`}>
            {couponMessage.text}
          </p>
        )}
      </div>

      {/* Gateway Notice Box */}
      <div className="p-4 sm:p-4.5 rounded-2xl bg-[#0F0F14] border border-[#E2136E]/40 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-[#F0EBE0] font-bold text-xs sm:text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E2136E]" />
          <span>বিকাশ অফিশিয়াল অটো পেমেন্ট</span>
        </div>
        <p className="text-xs sm:text-[13px] text-[#D1C9BC] leading-relaxed">
          নিচের বাটনে ক্লিক করলে বিকাশ সিকিউর পেমেন্ট পেজে নিয়ে যাওয়া হবে। পেমেন্ট সম্পন্ন হওয়ামাত্র স্বয়ংক্রিয়ভাবে ডাউনলোড পেজ খুলবে।
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-2xl bg-[#E2136E] hover:bg-[#C90E5F] text-white text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 hover-lift shadow-[0_0_25px_rgba(226,19,110,0.3)] transition-all group"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-white" />
            <span>বিকাশ গেটওয়ে লোড হচ্ছে...</span>
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            <span>বিকাশ দিয়ে কিনুন ({siteConfig.currencySymbol}{currentPrice})</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-5 text-xs text-[#A8A095] pt-1">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#C8A45C]" />
          <span>তাৎক্ষণিক ডাউনলোড</span>
        </div>
        <div className="w-[1px] h-3 bg-[#26262A]" />
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>১০০% নিরাপদ ডেলিভারি</span>
        </div>
      </div>

    </form>
  );
}
