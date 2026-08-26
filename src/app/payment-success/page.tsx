"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  BookOpen,
  ArrowRight,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const trxID = searchParams.get("trxID") || "BKASH-PAID";
  const paymentID = searchParams.get("paymentID") || "";
  const amount = searchParams.get("amount") || "999";
  const orderNumber = searchParams.get("orderNumber") || "#PDF-ORDER";
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#C8A45C", "#E2136E", "#F0EBE0", "#D4AF6E", "#10B981"],
      });
    } catch {}
  }, []);

  const handleCopyTrx = () => {
    navigator.clipboard.writeText(trxID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadUrl = token ? `/api/download/${token}` : "#";

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F0EBE0] flex items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-[#C8A45C] selection:text-[#08080A]">
      <div className="max-w-xl w-full mx-auto space-y-6">
        
        {/* Main Success Card */}
        <div className="bg-[#111114] border border-[#2A2A2E] rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Top Gold Hairline */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent opacity-80" />

          {/* Success Animated Badge */}
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              পেমেন্ট সফল • লাইফটাইম অ্যাক্সেস সক্রিয়
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bengali-serif font-bold text-[#F0EBE0] leading-tight">
              অভিনন্দন! আপনার কপি প্রস্তুত
            </h1>
            <p className="text-xs sm:text-sm text-[#B8B0A4] max-w-md mx-auto leading-relaxed">
              &ldquo;The 48 Laws of Power (বাংলা অনুবাদ)&rdquo; এর সম্পূর্ণ ৪৫২ পৃষ্ঠার সার্চেবল ডিজিটাল PDF প্রস্তুত হয়েছে।
            </p>
          </div>

          {/* Download CTA Button */}
          <div className="space-y-2.5 pt-2">
            <a
              href={downloadUrl}
              onClick={() => setDownloading(true)}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all cursor-pointer hover-lift btn-shimmer group"
            >
              <Download className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>{downloading ? "ডাউনলোড হচ্ছে..." : "সম্পূর্ণ PDF ডাউনলোড করুন (৩৬ MB)"}</span>
            </a>
            <p className="text-[11px] text-[#8A8278]">
              যেকোনো ডিভাইস (মোবাইল, ট্যাবলেট, পিসি)-তে পড়ার জন্য অপ্টিমাইজড।
            </p>
          </div>

          {/* Receipt Breakdown */}
          <div className="p-5 rounded-2xl bg-[#08080A] border border-[#2A2A2E] text-left space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-[#2A2A2E] pb-2">
              <span className="text-[#8A8278]">অর্ডার নম্বর</span>
              <span className="font-mono font-bold text-[#C8A45C]">{orderNumber}</span>
            </div>

            {email && (
              <div className="flex justify-between border-b border-[#2A2A2E] pb-2">
                <span className="text-[#8A8278]">গ্রাহক জিমেইল</span>
                <span className="font-mono font-medium text-[#F0EBE0]">{email}</span>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-[#2A2A2E] pb-2">
              <span className="text-[#8A8278]">Transaction ID</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#F0EBE0]">{trxID}</span>
                <button
                  type="button"
                  onClick={handleCopyTrx}
                  className="p-1 rounded bg-[#1A1A1E] text-[#8A8278] hover:text-[#C8A45C] transition-colors"
                  title="Copy TrxID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between border-b border-[#2A2A2E] pb-2">
              <span className="text-[#8A8278]">পেমেন্ট মেথড</span>
              <span className="font-medium text-[#F0EBE0]">bKash Verified Payment</span>
            </div>

            <div className="flex justify-between pt-2 text-base font-bold text-[#C8A45C]">
              <span>পরিশোধিত মূল্য</span>
              <span className="font-display">৳{amount} BDT (লাইফটাইম)</span>
            </div>
          </div>

          {/* Support & Guarantee */}
          <div className="pt-2 border-t border-[#2A2A2E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A8278]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% অথেনটিক ডিজিটাল সংস্করণ</span>
            </div>
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8A45C] transition-colors inline-flex items-center gap-1 font-semibold"
            >
              <span>হোয়াটসঅ্যাপ হেল্পডেস্ক</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A8278] hover:text-[#C8A45C] transition-colors"
          >
            <span>মূল ওয়েবসাইটে ফিরে যান</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08080A] flex items-center justify-center text-white">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
