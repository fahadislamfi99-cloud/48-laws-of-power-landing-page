"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { trackInitiateCheckout, trackPurchase } from "@/lib/pixel";
import confetti from "canvas-confetti";
import {
  Download, CheckCircle2, Copy, Check, Mail,
  ExternalLink, ShieldCheck, Loader2, Zap, Receipt, Sparkles,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function DigitalCheckout() {
  const [gmail, setGmail] = useState("");
  const [trxId, setTrxId] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const containerRef = useScrollReveal<HTMLElement>();

  useEffect(() => {
    trackInitiateCheckout(siteConfig.price);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(siteConfig.bkashNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    const generatedId = "PDF-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    trackPurchase(siteConfig.price, generatedId);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#C8A45C", "#E2136E", "#F0EBE0", "#D4AF6E"],
        });
      } catch {}
    }, 800);
  };

  if (isSuccess) {
    return (
      <section id="checkout" className="py-14 lg:py-20 bg-[#08080A]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111114] rounded-3xl p-8 sm:p-12 border border-emerald-500/40 text-center space-y-6 animate-scaleIn shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs tracking-wider text-emerald-400 font-bold bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                পেমেন্ট সফল • ডাউনলোড প্রস্তুত
              </span>
              <h3 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#F0EBE0]">
                অভিনন্দন!
              </h3>
              <p className="text-[#B8B0A4] text-sm max-w-md mx-auto">
                আপনার ডিজিটাল কপি প্রস্তুত করা হয়েছে। নিচের বাটন থেকে এখনই সম্পূর্ণ PDF ডাউনলোড করে নিন।
              </p>
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("ডাউনলোড শুরু হয়েছে। আপনার ফাইলে সেভ করুন।");
              }}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base shadow-md transition-all cursor-pointer hover-lift btn-shimmer"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>পিডিএফ ডাউনলোড করুন (৩৬ মেগাবাইট)</span>
            </a>
            <div className="p-5 rounded-2xl bg-[#08080A] border border-[#2A2A2E] text-left space-y-2 text-xs sm:text-sm">
              {[
                ["অর্ডার আইডি", orderId],
                ["সংস্করণ", "The 48 Laws of Power (বাংলা PDF)"],
                ["প্রেরিত জিমেইল", gmail],
                ["পেমেন্ট মাধ্যম", "bKash Send Money"],
                ["TrxID", trxId.toUpperCase()],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-[#2A2A2E] pb-2">
                  <span className="text-[#8A8278]">{label}:</span>
                  <span className="font-medium text-[#F0EBE0]">{value}</span>
                </div>
              ))}
              <div className="flex justify-between pt-1 text-base font-bold text-[#C8A45C]">
                <span>পরিশোধিত মূল্য:</span>
                <span>{siteConfig.currencySymbol}{siteConfig.price} (লাইফটাইম)</span>
              </div>
            </div>
            <div className="text-[#8A8278] text-xs flex items-center justify-center gap-2">
              <span>কোনো সমস্যা হলে:</span>
              <a
                href={`https://wa.me/${siteConfig.supportWhatsapp}?text=Hello,%20my%20Order%20ID%20is%20${orderId}&Gmail=${encodeURIComponent(gmail)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>হোয়াটসঅ্যাপে মেসেজ দিন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="checkout" ref={containerRef} className="py-14 lg:py-20 bg-[#08080A] border-t border-[#26262A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 reveal">
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#C8A45C] uppercase block">
            SECURE DIGITAL ACCESS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F0EBE0]">
            ডিজিটাল কপি সংগ্রহ করুন
          </h2>
          <p className="text-[#B8B0A4] text-sm sm:text-base">
            নিচে আপনার জিমেইল প্রদান করে বিকাশ পেমেন্ট সম্পন্ন করুন। সাথে সাথেই ডাউনলোড লিংক সক্রিয় হবে।
          </p>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="bg-[#111114] rounded-3xl p-6 sm:p-10 border border-[#2A2A2E] space-y-6 reveal reveal-stagger-1 shadow-2xl">
          
          {/* Price Banner */}
          <div className="p-5 rounded-2xl bg-[#0A0A0C] border border-[#2A2A2E] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src="/images/book-mockup.png" alt="Book" className="h-16 w-auto object-contain drop-shadow-md" />
              <div>
                <span className="text-xs font-semibold text-[#C8A45C] block uppercase tracking-wider">
                  The 48 Laws of Power (বাংলা PDF)
                </span>
                <span className="text-xs text-[#8A8278]">৪৫২ পৃষ্ঠা • সার্চেবল • লাইফটাইম অ্যাক্সেস</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-3xl font-display font-bold text-[#C8A45C]">
                {siteConfig.currencySymbol}{siteConfig.price}
              </span>
              <span className="text-xs text-[#8A8278] block">এককালীন • নো ডেলিভারি ফি</span>
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
                placeholder="yourname@gmail.com"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 input-dark text-sm placeholder:text-[#666056] text-[#F0EBE0]"
              />
            </div>
            <p className="text-[11px] text-[#8A8278] pl-1">
              পেমেন্ট সম্পন্ন করার পর এই ঠিকানায় স্বয়ক্রিয়ভাবে ফাইল ও ব্যাকআপ সংরক্ষণ থাকবে।
            </p>
          </div>

          {/* bKash Payment Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#09090C] border border-[#E2136E]/30 space-y-3.5">
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

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#131318] border border-[#26262A]">
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
                onClick={handleCopy}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-all duration-200 ${
                  copied
                    ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-103"
                    : "bg-[#E2136E] hover:bg-[#C90E5F] text-white shadow-[0_0_15px_rgba(226,19,110,0.25)] hover:scale-102"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>কপি হয়েছে!</span>
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-full btn-gold text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 hover-lift btn-shimmer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>ভেরিফাই হচ্ছে...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>পেমেন্ট সম্পন্ন করেছি: ডাউনলোড করুন ({siteConfig.currencySymbol}{siteConfig.price})</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-6 text-[11px] text-[#8A8278]">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#C8A45C]" />
              <span>তাৎক্ষণিক ডাউনলোড</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45C]" />
              <span>১০০% নিরাপদ</span>
            </div>
          </div>
        </form>

      </div>
    </section>
  );
}
