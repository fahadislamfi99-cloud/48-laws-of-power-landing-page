"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { trackInitiateCheckout } from "@/lib/pixel";
import {
  ShieldCheck, Mail, Zap, Loader2, Sparkles, Tag, ArrowRight, CheckCircle2, AlertCircle, Check
} from "lucide-react";

export type PackageType = "bundle" | "48_laws" | "art_of_seduction";

interface OrderFormProps {
  onSuccess?: () => void;
  initialCouponCode?: string;
  defaultPackage?: PackageType;
}

export default function OrderForm({
  onSuccess,
  initialCouponCode,
  defaultPackage = "bundle",
}: OrderFormProps) {
  const [packageType, setPackageType] = useState<PackageType>(defaultPackage);
  const [gmail, setGmail] = useState("");
  const [couponCode, setCouponCode] = useState(initialCouponCode || "");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [activeOffer, setActiveOffer] = useState<{ couponCode: string; discountAmount: number; offerTag?: string } | null>({
    couponCode: "POWER50",
    discountAmount: 50,
    offerTag: "৳৫০ OFF",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const originalPackagePrice = packageType === "bundle" ? 199 : 149;
  const originalFullPrice = packageType === "bundle" ? 298 : 149;
  const currentPrice = Math.max(1, originalPackagePrice - discountAmount);

  // Fetch active promotional offer for checkout suggestion
  useEffect(() => {
    async function fetchOffer() {
      try {
        const res = await fetch("/api/public/promo-banner");
        const data = await res.json();
        if (data.success && data.banner) {
          if (data.banner.isEnabled && data.banner.couponCode) {
            setActiveOffer({
              couponCode: data.banner.couponCode,
              discountAmount: data.banner.discountAmount || 50,
              offerTag: data.banner.offerTag || "৳৫০ OFF",
            });
          } else {
            setActiveOffer(null);
          }
        }
      } catch {
        // keep fallback default
      }
    }
    fetchOffer();
  }, []);

  // Auto-apply initial coupon if passed
  useEffect(() => {
    if (initialCouponCode && initialCouponCode.trim()) {
      const code = initialCouponCode.trim().toUpperCase();
      setCouponCode(code);
      applyCoupon(code);
    }
  }, [initialCouponCode]);

  const applyCoupon = async (rawCode?: string) => {
    const codeToApply = (rawCode !== undefined ? rawCode : couponCode).trim().toUpperCase();
    if (!codeToApply) return;
    if (validatingCoupon) return;

    setValidatingCoupon(true);
    setCouponMessage(null);

    try {
      const res = await fetch("/api/public/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeToApply, amount: originalPackagePrice }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setDiscountAmount(data.discountAmount);
        setAppliedCoupon(data.code);
        setCouponCode(data.code);
        setCouponMessage({
          text: data.message ? `${data.message} (৳${data.discountAmount} ছাড় যুক্ত হয়েছে)` : `কুপন সফলভাবে প্রয়োগ হয়েছে (৳${data.discountAmount} ছাড়)`,
          error: false,
        });
      } else {
        setCouponMessage({
          text: data.message || "অবৈধ বা মেয়াদোত্তীর্ণ কুপন কোড",
          error: true,
        });
        setDiscountAmount(0);
        setAppliedCoupon(null);
      }
    } catch {
      setCouponMessage({ text: "কুপন যাচাইকরণে ত্রুটি হয়েছে। আবার চেষ্টা করুন।", error: true });
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscountAmount(0);
    setAppliedCoupon(null);
    setCouponMessage(null);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gmail.trim() || !gmail.includes("@")) {
      setErrorMessage("অনুগ্রহ করে একটি সঠিক জিমেইল (Gmail) আইডি দিন।");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    // Track Meta Pixel InitiateCheckout event ONLY when user clicks checkout submit
    trackInitiateCheckout(currentPrice);

    try {
      const res = await fetch("/api/bkash/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: gmail.trim(),
          couponCode: appliedCoupon || undefined,
          packageType,
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
    <form onSubmit={handlePayment} className="space-y-4 sm:space-y-5 text-left">
      
      {/* ─── Visual 1-Click Package Selector (With Book Covers) ─── */}
      <div className="space-y-2 sm:space-y-2.5">
        <label className="block text-xs sm:text-sm font-bold text-[#F0EBE0] flex items-center justify-between">
          <span>প্যাকেজ নির্বাচন করুন:</span>
          <span className="text-[10px] sm:text-xs text-[#C8A45C] font-semibold">লাইফটাইম ডিজিটাল ইবুক</span>
        </label>

        {/* ─── OPTION 1: 2-Book Master Bundle (Pre-selected) ─── */}
        <div
          onClick={() => setPackageType("bundle")}
          className={`relative p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between gap-2.5 sm:gap-3.5 group select-none active:scale-[0.99] ${
            packageType === "bundle"
              ? "bg-[#18131B] border-[#C8A45C] shadow-[0_0_25px_rgba(200,164,92,0.22)]"
              : "bg-[#101014] border-[#222228] hover:border-[#33333E] opacity-80"
          }`}
        >
          {/* Popular Tag Ribbon */}
          <div className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#C8A45C] via-[#E11D48] to-[#C8A45C] text-[#08080A] text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
            <span>🌟 সেরা পছন্দ • ৮৭% পাঠক নিয়েছেন</span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Custom Radio Indicator */}
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
              packageType === "bundle" ? "border-[#C8A45C] bg-[#C8A45C]" : "border-[#4A4A55]"
            }`}>
              {packageType === "bundle" && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#08080A] stroke-[3]" />}
            </div>

            {/* Dual Overlapping Book Mockup Covers */}
            <div className="relative w-12 h-14 sm:w-14 sm:h-16 shrink-0 flex items-center justify-center">
              <img
                src="/images/book-mockup.webp"
                alt="48 Laws"
                className="w-8 h-12 sm:w-9 sm:h-14 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)] absolute left-0 z-10 transition-transform group-hover:-rotate-3"
                loading="lazy"
              />
              <img
                src="/images/the-art-of-seduction-book-mockup.png"
                alt="Art of Seduction"
                className="w-8 h-12 sm:w-9 sm:h-14 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] absolute right-0 z-20 transition-transform group-hover:rotate-3"
                loading="lazy"
              />
            </div>

            {/* Title & Info */}
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-[#F0EBE0] font-bengali-serif leading-snug truncate flex items-center gap-1.5 flex-wrap">
                <span>২-বুক মাস্টার বান্ডেল</span>
                <span className="text-[10px] text-[#C8A45C] font-mono hidden xs:inline">(কম্বো প্যাক)</span>
              </h4>
              <p className="text-[10px] sm:text-xs text-[#A8A095] mt-0.5 truncate">
                48 Laws + Art of Seduction (৯৮৯ পৃষ্ঠা)
              </p>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="text-right shrink-0 pl-1">
            <div className="text-sm sm:text-lg font-bold text-[#C8A45C] font-display">৳199</div>
            <div className="text-[10px] sm:text-xs text-[#A8A095] line-through">৳298</div>
            <span className="text-[9px] text-emerald-400 font-bold block mt-0.5">Save ৳99</span>
          </div>
        </div>

        {/* ─── OPTION 2: 48 Laws of Power (Single) ─── */}
        <div
          onClick={() => setPackageType("48_laws")}
          className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-2.5 sm:gap-3.5 group select-none active:scale-[0.99] ${
            packageType === "48_laws"
              ? "bg-[#141418] border-[#C8A45C] shadow-[0_0_15px_rgba(200,164,92,0.15)]"
              : "bg-[#0E0E12] border-[#1C1C22] hover:border-[#2A2A34] opacity-70"
          }`}
        >
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Custom Radio Indicator */}
            <div className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
              packageType === "48_laws" ? "border-[#C8A45C] bg-[#C8A45C]" : "border-[#4A4A55]"
            }`}>
              {packageType === "48_laws" && <Check className="w-2.5 h-2.5 text-[#08080A] stroke-[3]" />}
            </div>

            {/* Single Book Mockup Cover */}
            <div className="w-8 h-11 sm:w-9 sm:h-13 shrink-0 flex items-center justify-center">
              <img
                src="/images/book-mockup.webp"
                alt="The 48 Laws of Power"
                className="w-full h-full object-contain drop-shadow-md"
                loading="lazy"
              />
            </div>

            {/* Title & Info */}
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-semibold text-[#F0EBE0] font-bengali-serif truncate">
                The 48 Laws of Power (একক বই)
              </h4>
              <p className="text-[10px] sm:text-xs text-[#A8A095] mt-0.5 truncate">
                ৫০৯ পৃষ্ঠা সম্পূর্ণ বাংলা সংস্করণ
              </p>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="text-right shrink-0 pl-1">
            <div className="text-xs sm:text-base font-bold text-[#F0EBE0] font-display">৳149</div>
          </div>
        </div>

        {/* ─── OPTION 3: The Art of Seduction (Single) ─── */}
        <div
          onClick={() => setPackageType("art_of_seduction")}
          className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-2.5 sm:gap-3.5 group select-none active:scale-[0.99] ${
            packageType === "art_of_seduction"
              ? "bg-[#181115] border-[#E11D48] shadow-[0_0_15px_rgba(225,29,72,0.15)]"
              : "bg-[#0E0E12] border-[#1C1C22] hover:border-[#2A2A34] opacity-70"
          }`}
        >
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Custom Radio Indicator */}
            <div className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
              packageType === "art_of_seduction" ? "border-[#E11D48] bg-[#E11D48]" : "border-[#4A4A55]"
            }`}>
              {packageType === "art_of_seduction" && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
            </div>

            {/* Single Book Mockup Cover */}
            <div className="w-8 h-11 sm:w-9 sm:h-13 shrink-0 flex items-center justify-center">
              <img
                src="/images/the-art-of-seduction-book-mockup.png"
                alt="The Art of Seduction"
                className="w-full h-full object-contain drop-shadow-md"
                loading="lazy"
              />
            </div>

            {/* Title & Info */}
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-semibold text-[#F0EBE0] font-bengali-serif truncate">
                The Art of Seduction (একক বই)
              </h4>
              <p className="text-[10px] sm:text-xs text-[#A8A095] mt-0.5 truncate">
                ৪৮০ পৃষ্ঠা সম্পূর্ণ বাংলা সংস্করণ
              </p>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="text-right shrink-0 pl-1">
            <div className="text-xs sm:text-base font-bold text-[#F0EBE0] font-display">৳149</div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 sm:p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      {/* Gmail Input Field */}
      <div className="space-y-1 sm:space-y-1.5">
        <label className="block text-xs sm:text-sm font-bold text-[#F0EBE0] flex items-center justify-between">
          <span>আপনার জিমেইল (Gmail) ঠিকানা <span className="text-[#E24848]">*</span></span>
          <span className="text-[10px] sm:text-xs text-[#A8A095] font-normal">ডাউনলোড কপি পৌঁছাবে</span>
        </label>
        <div className="relative group flex items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#A8A095] group-focus-within:text-[#C8A45C] transition-colors">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <input
            type="email"
            required
            placeholder="example@gmail.com"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 input-dark text-xs sm:text-sm placeholder:text-[#8A8278] text-[#F0EBE0]"
          />
        </div>
        <p className="text-[10px] sm:text-xs text-[#A8A095] pl-0.5">
          পেমেন্ট নিশ্চিত হওয়ার সাথে সাথে এই জিমেইলে লাইফটাইম ডাউনলোড লিংক পাঠানো হবে।
        </p>
      </div>

      {/* Coupon Code Input */}
      <div className="space-y-1 sm:space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
          <label className="text-[#F0EBE0] font-semibold flex items-center gap-1.5 text-xs">
            <span>কুপন কোড (যদি থাকে)</span>
          </label>
          {activeOffer && !appliedCoupon ? (
            <button
              type="button"
              onClick={() => {
                setCouponCode(activeOffer.couponCode);
                applyCoupon(activeOffer.couponCode);
              }}
              disabled={validatingCoupon}
              className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-[#C8A45C] hover:text-[#E5C378] font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3 h-3 text-[#C8A45C]" />
              <span>অফার: <strong>{activeOffer.couponCode}</strong> প্রয়োগ</span>
            </button>
          ) : appliedCoupon ? (
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="text-[10px] sm:text-[11px] text-[#A8A095] hover:text-rose-400 font-medium transition-colors cursor-pointer"
            >
              কুপন মুছুন
            </button>
          ) : null}
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1 group flex items-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#A8A095]">
              <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <input
              type="text"
              placeholder={activeOffer && !appliedCoupon ? `যেমন: ${activeOffer.couponCode}` : "কুপন কোড"}
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                if (couponMessage) setCouponMessage(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!validatingCoupon && couponCode.trim()) {
                    applyCoupon();
                  }
                }
              }}
              disabled={validatingCoupon}
              enterKeyHint="go"
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck="false"
              className="w-full pl-9 sm:pl-10 pr-3 py-2 bg-[#09090C] border border-[#26262A] rounded-xl text-xs font-mono uppercase text-[#F0EBE0] outline-none focus:border-[#C8A45C] placeholder:text-[#666] disabled:opacity-60 transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={() => applyCoupon()}
            disabled={validatingCoupon || !couponCode.trim()}
            className="px-3 sm:px-4 py-2 rounded-xl bg-[#1A1A1F] hover:bg-[#25252D] text-xs font-bold text-[#C8A45C] border border-[#33333A] cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 shrink-0 min-w-[68px]"
          >
            {validatingCoupon ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8A45C]" />
            ) : (
              <span>প্রয়োগ</span>
            )}
          </button>
        </div>

        {couponMessage && (
          <div className={`text-xs font-medium pl-1 flex items-center gap-1.5 ${
            couponMessage.error ? "text-rose-400" : "text-emerald-400"
          }`}>
            {couponMessage.error ? (
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>{couponMessage.text}</span>
          </div>
        )}
      </div>

      {/* Gateway Notice Box */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-[#0F0F14] border border-[#E2136E]/40 space-y-1 text-xs">
        <div className="flex items-center gap-1.5 text-[#F0EBE0] font-bold text-xs">
          <span className="w-2 h-2 rounded-full bg-[#E2136E]" />
          <span>বিকাশ সিকিউর অটো পেমেন্ট</span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-[#D1C9BC] leading-relaxed">
          নিচের বাটনে ক্লিক করলে বিকাশ সিকিউর পেমেন্ট পেজে নিয়ে যাওয়া হবে। পেমেন্ট সম্পন্ন হওয়ামাত্র ডাউনলোড পেজ খুলবে।
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#E2136E] hover:bg-[#C90E5F] text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 hover-lift shadow-[0_0_25px_rgba(226,19,110,0.3)] transition-all group"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-white" />
            <span>বিকাশ গেটওয়ে লোড হচ্ছে...</span>
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>বিকাশ দিয়ে কিনুন (৳{currentPrice})</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 text-[10px] sm:text-xs text-[#A8A095] pt-0.5">
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-[#C8A45C]" />
          <span>তাৎক্ষণিক ডাউনলোড</span>
        </div>
        <div className="w-[1px] h-2.5 bg-[#26262A]" />
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>১০০% নিরাপদ ডেলিভারি</span>
        </div>
      </div>

    </form>
  );
}
