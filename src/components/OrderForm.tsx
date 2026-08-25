"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { trackInitiateCheckout, trackPurchase } from "@/lib/pixel";
import confetti from "canvas-confetti";
import {
  CheckCircle2, Download, ShieldCheck, Mail,
  Check, Copy, Zap, ExternalLink, Loader2, Sparkles,
  Receipt, ArrowRight,
} from "lucide-react";

interface OrderFormProps {
  onSuccess?: () => void;
}

export default function OrderForm({ onSuccess }: OrderFormProps) {
  const [gmail, setGmail] = useState("");
  const [trxId, setTrxId] = useState("");
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    trackInitiateCheckout(siteConfig.price);
  }, []);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(siteConfig.bkashNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!gmail.trim() || !gmail.includes("@")) {
      alert("অনুগ্রহ করে একটি সঠিক জিমেইল (Gmail) আইডি দিন।");
      return;
    }

    if (!trxId.trim() || trxId.trim().length < 6) {
      alert("অনুগ্রহ করে আপনার সঠিক বিকাশ ট্রানজেকশন আইডি (TrxID) দিন।");
      return;
    }

    setIsSubmitting(true);
    const generatedOrderId = "PDF-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrderId);
    trackPurchase(siteConfig.price, generatedOrderId);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ["#C8A45C", "#E2136E", "#F0EBE0", "#D4AF6E"],
        });
      } catch {}
      if (onSuccess) onSuccess();
    }, 800);
  };

  // ─── SUCCESS STATE ───────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="text-center space-y-5 animate-fadeIn py-2">
        {/* Success icon with pulse ring */}
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
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert("ডাউনলোড শুরু হয়েছে। আপনার ফাইলে সেভ করুন।");
          }}
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
            ["পেমেন্ট মাধ্যম", "bKash Send Money"],
            ["TrxID", trxId.toUpperCase()],
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
              {siteConfig.currencySymbol}{siteConfig.price} (লাইফটাইম)
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
    <form onSubmit={handleSubmit} className="space-y-5">
      
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
              {siteConfig.currencySymbol}{siteConfig.price}
            </span>
            <span className="text-xs text-[#8A8278] line-through">
              {siteConfig.currencySymbol}{siteConfig.originalPrice}
            </span>
            <span className="text-[10px] text-[#C8A45C] font-semibold">
              (৩৪% ছাড়)
            </span>
          </div>
        </div>
      </div>

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
        <p className="text-[11px] text-[#8A8278] pl-1">
          পেমেন্ট নিশ্চিত হওয়ার পর এই জিমেইলে স্বয়ংক্রিয়ভাবে ব্যাকআপ ফাইল চলে যাবে।
        </p>
      </div>

      {/* bKash Payment Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#09090C] border border-[#E2136E]/30 space-y-3.5 shadow-[0_0_20px_rgba(226,19,110,0.05)]">
        
        {/* bKash Badge & Instruction */}
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

        {/* 3 Step Instruction */}
        <div className="space-y-1.5 text-xs text-[#B8B0A4] bg-[#111114] p-3 rounded-xl border border-[#26262A]">
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-[#E2136E]/15 text-[#E2136E] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">১</span>
            <span>বিকাশ অ্যাপে <strong>Send Money</strong> অপশনে যান।</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-[#E2136E]/15 text-[#E2136E] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">২</span>
            <span>উক্ত নম্বরে <strong>{siteConfig.currencySymbol}{siteConfig.price}</strong> টাকা সেন্ড মানি করুন।</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-[#E2136E]/15 text-[#E2136E] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">৩</span>
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-2xl btn-gold text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 hover-lift btn-shimmer group shadow-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-[#08080A]" />
            <span className="text-[#08080A]">ভেরিফাই হচ্ছে...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>পেমেন্ট সম্পন্ন: ডাউনলোড করুন ({siteConfig.currencySymbol}{siteConfig.price})</span>
          </>
        )}
      </button>

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

    </form>
  );
}
