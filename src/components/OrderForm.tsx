"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { trackInitiateCheckout, trackPurchase } from "@/lib/pixel";
import confetti from "canvas-confetti";
import {
  CheckCircle2, Download, ShieldCheck, Mail,
  Check, Copy, Zap, ExternalLink, Loader2, Sparkles,
  Receipt, ArrowRight, Tag,
} from "lucide-react";

interface OrderFormProps {
  onSuccess?: () => void;
}

export default function OrderForm({ onSuccess }: OrderFormProps) {
  const [activeTab, setActiveTab] = useState<"gateway" | "manual">("gateway");
  const [gmail, setGmail] = useState("");
  const [trxId, setTrxId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [downloadToken, setDownloadToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const originalPrice = siteConfig.price || 999;
  const currentPrice = Math.max(1, originalPrice - discountAmount);

  useEffect(() => {
    trackInitiateCheckout(currentPrice);
  }, [currentPrice]);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(siteConfig.bkashNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
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
        setCouponMessage({ text: data.message || "অবৈধ কুপন", error: true });
        setDiscountAmount(0);
        setAppliedCoupon(null);
      }
    } catch {
      setCouponMessage({ text: "কুপন যাচাইকরণে ত্রুটি", error: true });
    } finally {
      setValidatingCoupon(false);
    }
  };

  // ─── bKash Auto Payment Initiation ───
  const handleGatewayPayment = async (e: React.FormEvent) => {
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
        setErrorMessage(data.message || "বিকাশ পেমেন্ট চালু করতে সমস্যা হয়েছে। অনুগ্রহ করে Send Money অপশনটি ব্যবহার করুন।");
        setIsSubmitting(false);
      }
    } catch {
      setErrorMessage("সার্ভার সংযোগে ত্রুটি। অনুগ্রহ করে Send Money অপশনটি ব্যবহার করুন।");
      setIsSubmitting(false);
    }
  };

  // ─── bKash Manual TrxID Submission ───
  const handleManualPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gmail.trim() || !gmail.includes("@")) {
      setErrorMessage("অনুগ্রহ করে একটি সঠিক জিমেইল (Gmail) আইডি দিন।");
      return;
    }

    if (!trxId.trim() || trxId.trim().length < 6) {
      setErrorMessage("অনুগ্রহ করে আপনার সঠিক বিকাশ ট্রানজেকশন আইডি (TrxID) দিন।");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/orders/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: gmail.trim(),
          trxId: trxId.trim(),
          couponCode: appliedCoupon || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOrderId(data.orderNumber);
        setDownloadToken(data.downloadToken);
        trackPurchase(currentPrice, data.orderNumber);
        setIsSuccess(true);
        try {
          confetti({
            particleCount: 160,
            spread: 90,
            origin: { y: 0.5 },
            colors: ["#C8A45C", "#E2136E", "#F0EBE0", "#D4AF6E"],
          });
        } catch {}
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage(data.message || "পেমেন্ট নিশ্চিত করা যায়নি। অনুগ্রহ করে TrxID চেক করুন।");
      }
    } catch {
      setErrorMessage("সার্ভার ত্রুটি। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── SUCCESS STATE ───────────────────────────────────────────────
  if (isSuccess) {
    const downloadUrl = downloadToken ? `/api/download/${downloadToken}` : "#";
    return (
      <div className="text-center space-y-5 animate-fadeIn py-2">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-9 h-9 text-white" />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-xs tracking-wider text-emerald-400 font-bold bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            পেমেন্ট সফল • ডাউনলোড প্রস্তুত
          </span>
          <h3 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#F0EBE0]">
            অভিনন্দন!
          </h3>
          <p className="text-[#B8B0A4] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
            আপনার ডিজিটাল কপি প্রস্তুত। নিচের বাটন থেকে এখনই সম্পূর্ণ PDF ডাউনলোড করে নিন।
          </p>
        </div>

        {/* Download Button */}
        <a
          href={downloadUrl}
          className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all cursor-pointer hover-lift btn-shimmer group"
        >
          <Download className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span>পিডিএফ ডাউনলোড করুন (৩৬ MB)</span>
        </a>

        {/* Order Receipt */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#08080A] border border-[#2A2A2E] text-left space-y-0 text-xs sm:text-sm">
          {[
            ["অর্ডার আইডি", orderId],
            ["সংস্করণ", "The 48 Laws of Power (বাংলা PDF)"],
            ["প্রেরিত জিমেইল", gmail],
            ["পেমেন্ট মাধ্যম", "bKash Verified"],
            ["TrxID", trxId ? trxId.toUpperCase() : "VERIFIED"],
          ].map(([label, value], i, arr) => (
            <div
              key={label}
              className={`flex justify-between py-2 ${
                i < arr.length - 1 ? "border-b border-[#2A2A2E]" : ""
              }`}
            >
              <span className="text-[#8A8278]">{label}</span>
              <span className="font-medium text-[#F0EBE0] text-right max-w-[60%] truncate">
                {value}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-3 mt-1 border-t border-[#C8A45C]/20">
            <span className="font-bold text-[#B8B0A4]">পরিশোধিত মূল্য</span>
            <span className="text-base font-display font-bold text-[#C8A45C]">
              {siteConfig.currencySymbol}{currentPrice} (লাইফটাইম)
            </span>
          </div>
        </div>

        {/* WhatsApp Support Link */}
        <div className="text-[#8A8278] text-xs flex items-center justify-center gap-2 pt-1">
          <span>কোনো সহায়তার প্রয়োজন?</span>
          <a
            href={`https://wa.me/${siteConfig.supportWhatsapp}?text=Hello,%20my%20Order%20ID%20is%20${orderId}%20and%20Gmail%20is%20${encodeURIComponent(gmail)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>হোয়াটসঅ্যাপ সাপোর্ট</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // ─── MAIN PAYMENT FORM ───────────────────────────────────────────
  return (
    <div className="space-y-5">
      
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
            <span className="text-[10px] uppercase font-bold text-[#C8A45C] bg-[#C8A45C]/10 px-2 py-0.5 rounded-md border border-[#C8A45C]/20">
              ডিজিটাল PDF
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">
              ইনস্ট্যান্ট অ্যাক্সেস
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bengali-serif font-bold text-[#F0EBE0] leading-tight mt-1 truncate">
            The 48 Laws of Power (বাংলা সংস্করণ)
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xl font-display font-bold text-[#C8A45C]">
              {siteConfig.currencySymbol}{currentPrice}
            </span>
            <span className="text-xs text-[#8A8278] line-through">
              {siteConfig.currencySymbol}{siteConfig.originalPrice}
            </span>
            {discountAmount > 0 ? (
              <span className="text-[10px] text-emerald-400 font-bold">
                (৳{discountAmount} কুপন ছাড়)
              </span>
            ) : (
              <span className="text-[10px] text-[#C8A45C] font-semibold">
                (৩৪% ছাড়)
              </span>
            )}
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      {/* Gmail Input Field */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[#F0EBE0] flex items-center justify-between">
          <span>আপনার জিমেইল (Gmail) ঠিকানা <span className="text-[#E24848]">*</span></span>
          <span className="text-[11px] text-[#8A8278] font-normal">ডাউনলোড কপি পৌঁছাবে</span>
        </label>
        <div className="relative group flex items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8A8278] group-focus-within:text-[#C8A45C] transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            required
            placeholder="example@gmail.com"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 input-dark text-sm placeholder:text-[#666056] text-[#F0EBE0]"
          />
        </div>
      </div>

      {/* Coupon Code Accordion / Input */}
      <div className="space-y-1.5">
        <div className="flex gap-2">
          <div className="relative flex-1 group flex items-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8A8278]">
              <Tag className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="কুপন কোড (যদি থাকে)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-[#09090C] border border-[#26262A] rounded-xl text-xs font-mono uppercase text-[#F0EBE0] outline-none focus:border-[#C8A45C]"
            />
          </div>
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={validatingCoupon || !couponCode.trim()}
            className="px-4 py-2 rounded-xl bg-[#1A1A1F] hover:bg-[#25252D] text-xs font-bold text-[#C8A45C] border border-[#33333A] cursor-pointer disabled:opacity-50"
          >
            {validatingCoupon ? "..." : "প্রয়োগ"}
          </button>
        </div>
        {couponMessage && (
          <p className={`text-[11px] ${couponMessage.error ? "text-rose-400" : "text-emerald-400"} font-semibold pl-1`}>
            {couponMessage.text}
          </p>
        )}
      </div>

      {/* Payment Method Selector Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-[#0A0A0E] p-1 rounded-2xl border border-[#26262A]">
        <button
          type="button"
          onClick={() => setActiveTab("gateway")}
          className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "gateway"
              ? "bg-[#E2136E] text-white shadow-md"
              : "text-[#8A8278] hover:text-white"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>bKash অটো পেমেন্ট</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("manual")}
          className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "manual"
              ? "bg-[#1C1C22] text-[#C8A45C] border border-[#C8A45C]/30 shadow-md"
              : "text-[#8A8278] hover:text-white"
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Send Money (ম্যানুয়াল)</span>
        </button>
      </div>

      {/* Tab 1: bKash Gateway Auto Payment */}
      {activeTab === "gateway" && (
        <form onSubmit={handleGatewayPayment} className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-[#09090C] border border-[#E2136E]/30 space-y-2 text-xs text-[#B8B0A4]">
            <div className="flex items-center gap-2 text-white font-bold">
              <span className="w-2 h-2 rounded-full bg-[#E2136E]" />
              <span>বিকাশ অফিশিয়াল পেমেন্ট গেটওয়ে</span>
            </div>
            <p className="text-[11px] text-[#8A8278] leading-relaxed">
              &ldquo;অটো পেমেন্ট করুন&rdquo; বাটনে ক্লিক করলে বিকাশ সিকিউর গেটওয়েতে নিয়ে যাওয়া হবে। পেমেন্ট সম্পন্ন হওয়ামাত্র স্বয়ংক্রিয়ভাবে ডাউনলোড পেজ খুলবে।
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-[#E2136E] hover:bg-[#C90E5F] text-white text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 hover-lift shadow-[0_0_25px_rgba(226,19,110,0.3)] transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>বিকাশ গেটওয়ে লোড হচ্ছে...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>বিকাশ অটো পেমেন্ট করুন ({siteConfig.currencySymbol}{currentPrice})</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Tab 2: Send Money Manual Payment */}
      {activeTab === "manual" && (
        <form onSubmit={handleManualPayment} className="space-y-4 animate-fadeIn">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#09090C] border border-[#E2136E]/30 space-y-3.5 shadow-[0_0_20px_rgba(226,19,110,0.05)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#E2136E] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  ৳
                </div>
                <span className="text-xs font-bold text-[#F0EBE0]">
                  বিকাশ (bKash) পার্সোনাল
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#E2136E] bg-[#E2136E]/10 px-2 py-0.5 rounded-full border border-[#E2136E]/20">
                Send Money
              </span>
            </div>

            {/* Number & Copy Button */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#131318] border border-[#26262A]">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#8A8278] uppercase tracking-wider font-semibold">
                  বিকাশ নম্বর
                </span>
                <span className="font-mono font-bold text-lg sm:text-xl text-[#F0EBE0] tracking-wider">
                  {siteConfig.bkashNumber}
                </span>
              </div>
              
              <button
                type="button"
                onClick={handleCopyNumber}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-all duration-200 ${
                  copiedNumber
                    ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-103"
                    : "bg-[#E2136E] hover:bg-[#C90E5F] text-white shadow-[0_0_15px_rgba(226,19,110,0.25)] hover:scale-102"
                }`}
              >
                {copiedNumber ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>নম্বর কপি</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-[#B8B0A4] bg-[#111114] p-3 rounded-xl border border-[#26262A]">
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-[#E2136E]/15 text-[#E2136E] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">১</span>
                <span>বিকাশ অ্যাপে <strong>Send Money</strong> দিয়ে <strong>{siteConfig.currencySymbol}{currentPrice}</strong> টাকা পাঠান।</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-[#E2136E]/15 text-[#E2136E] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">২</span>
                <span>বিকাশ থেকে পাওয়া <strong>TrxID</strong> নিচে লিখে সাবমিট করুন।</span>
              </div>
            </div>
          </div>

          {/* TrxID Input Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#F0EBE0] flex items-center justify-between">
              <span>বিকাশ ট্রানজেকশন আইডি (TrxID) <span className="text-[#E24848]">*</span></span>
              <span className="text-[11px] text-[#8A8278] font-normal">মেসেজে পাওয়া কোড</span>
            </label>
            <div className="relative group flex items-center">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8A8278] group-focus-within:text-[#C8A45C] transition-colors">
                <Receipt className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                placeholder="যেমন: BLA78K9Q2M"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 input-dark text-sm uppercase tracking-wider font-mono font-bold placeholder:text-[#666056] text-[#C8A45C]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl btn-gold text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 hover-lift btn-shimmer group shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#08080A]" />
                <span className="text-[#08080A]">যাচাই করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>পেমেন্ট সম্পন্ন: ডাউনলোড করুন ({siteConfig.currencySymbol}{currentPrice})</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 text-[11px] text-[#8A8278] pt-1">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#C8A45C]" />
          <span>তাৎক্ষণিক ডাউনলোড</span>
        </div>
        <div className="w-[1px] h-3 bg-[#26262A]" />
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45C]" />
          <span>১০০% নিরাপদ ডেলিভারি</span>
        </div>
      </div>

    </div>
  );
}
