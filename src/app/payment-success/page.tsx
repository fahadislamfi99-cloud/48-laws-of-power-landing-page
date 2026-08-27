"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2, Download, Copy, Check, ExternalLink, ShieldCheck,
  Sparkles, Loader2, Mail, Phone, FileText, ArrowRight, AlertCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/data/siteConfig";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const initialTrxID = searchParams.get("trxID") || "";
  const initialPaymentID = searchParams.get("paymentID") || "";
  const initialAmount = searchParams.get("amount") || "999";
  const initialOrderNumber = searchParams.get("orderNumber") || "";
  const token = searchParams.get("token") || "";
  const initialEmail = searchParams.get("email") || "";
  const initialPhone = searchParams.get("phone") || "";

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Live order state
  const [orderData, setOrderData] = useState<{
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    amount: number;
    paymentStatus: string;
    trxId: string;
    pdfStatus: "pending" | "generated" | "failed";
    emailStatus: "pending" | "sent" | "failed";
    downloadCount: number;
  }>({
    orderNumber: initialOrderNumber || "#PDF-ORDER",
    customerName: "সম্মানিত পাঠক",
    customerEmail: initialEmail,
    customerPhone: initialPhone || "017XXXXXXXX",
    amount: Number(initialAmount) || 999,
    paymentStatus: "paid",
    trxId: initialTrxID || "BKASH-PAID",
    pdfStatus: "pending",
    emailStatus: "pending",
    downloadCount: 0,
  });

  // Confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.4 },
        colors: ["#C8A45C", "#E2136E", "#F0EBE0", "#D4AF6E", "#10B981"],
      });
    } catch {}
  }, []);

  // Poll order status if token present
  useEffect(() => {
    if (!token) {
      setLoadingStatus(false);
      return;
    }

    let isMounted = true;
    let pollCount = 0;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/orders/status?token=${encodeURIComponent(token)}`);
        if (!res.ok) throw new Error("Status check failed");
        const data = await res.json();

        if (data.success && data.order && isMounted) {
          setOrderData(data.order);
          setLoadingStatus(false);

          // Stop polling if both PDF and Email are settled or max 5 polls
          if ((data.order.pdfStatus === "generated" && data.order.emailStatus !== "pending") || pollCount > 6) {
            return;
          }
        }
      } catch (err) {
        console.error("[Order Status Polling Error]:", err);
      }

      pollCount++;
      if (pollCount <= 6 && isMounted) {
        setTimeout(checkStatus, 2500);
      } else if (isMounted) {
        setLoadingStatus(false);
      }
    };

    checkStatus();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleCopyTrx = () => {
    navigator.clipboard.writeText(orderData.trxId);
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
              অর্ডার সফল • লাইফটাইম অ্যাক্সেস সক্রিয়
            </span>
            
            <h1 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#F0EBE0] leading-tight">
              {orderData.pdfStatus === "generated"
                ? "আপনার ব্যক্তিগত কপি প্রস্তুত!"
                : "পেমেন্ট সফল! ফাইল প্রস্তুত হচ্ছে..."}
            </h1>
            
            <p className="text-xs sm:text-sm text-[#B8B0A4] max-w-md mx-auto leading-relaxed">
              &ldquo;The 48 Laws of Power (বাংলা অনুবাদ)&rdquo; এর সম্পূর্ণ ৪৫২ পৃষ্ঠার ডিজিটাল সংস্করণ।
            </p>
          </div>

          {/* Watermark Security Notice */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#16161B] border border-[#26262A] text-left flex items-start gap-3 text-xs">
            <ShieldCheck className="w-4 h-4 text-[#C8A45C] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-[#F0EBE0] block">
                পার্সোনালাইজড লাইসেন্স কপি
              </span>
              <p className="text-[#A8A095] text-[11px] leading-relaxed">
                আপনার ফোন নম্বর (<span className="text-[#C8A45C] font-mono font-bold">{orderData.customerPhone}</span>) প্রতিটি পৃষ্ঠায় ওয়াটারমার্ক হিসেবে যুক্ত করা হয়েছে।
              </p>
            </div>
          </div>

          {/* PDF Generation & Download Action State */}
          <div className="space-y-3 pt-1">
            {orderData.pdfStatus === "pending" || (loadingStatus && orderData.pdfStatus !== "generated") ? (
              <div className="p-4 rounded-2xl bg-[#16161C] border border-[#C8A45C]/30 flex items-center justify-center gap-3 text-xs sm:text-sm text-[#C8A45C]">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-semibold">আপনার ওয়াটারমার্কযুক্ত PDF প্রস্তুত হচ্ছে...</span>
              </div>
            ) : (
              <a
                href={downloadUrl}
                onClick={() => setDownloading(true)}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all cursor-pointer hover-lift btn-shimmer group"
              >
                <Download className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>{downloading ? "ডাউনলোড শুরু হয়েছে..." : "সম্পূর্ণ PDF ডাউনলোড করুন"}</span>
              </a>
            )}

            {/* Email Delivery Confirmation Alert */}
            {orderData.emailStatus === "sent" ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-2 text-xs text-emerald-400 font-semibold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>আপনার Gmail (<span className="font-mono text-[#F0EBE0]">{orderData.customerEmail}</span>)-এও PDF পাঠানো হয়েছে।</span>
              </div>
            ) : orderData.emailStatus === "pending" ? (
              <div className="p-2.5 rounded-xl bg-[#16161B] border border-[#26262A] flex items-center justify-center gap-2 text-[11px] text-[#A8A095]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8A45C]" />
                <span>আপনার Gmail-এ PDF পাঠানো হচ্ছে...</span>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-[#181212] border border-amber-500/30 flex items-center justify-center gap-2 text-[11px] text-amber-300">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>ইমেইল ডেলিভারিতে কিছুটা বিলম্ব হলে ওপরের বাটন দিয়ে সরাসরি ডাউনলোড করুন।</span>
              </div>
            )}
          </div>

          {/* Receipt Breakdown */}
          <div className="p-5 rounded-2xl bg-[#08080A] border border-[#2A2A2E] text-left space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-[#2A2A2E] pb-2">
              <span className="text-[#8A8278]">অর্ডার নম্বর</span>
              <span className="font-mono font-bold text-[#C8A45C]">{orderData.orderNumber}</span>
            </div>

            {orderData.customerEmail && (
              <div className="flex justify-between border-b border-[#2A2A2E] pb-2">
                <span className="text-[#8A8278]">গ্রাহক জিমেইল</span>
                <span className="font-mono font-medium text-[#F0EBE0] truncate max-w-[200px]">
                  {orderData.customerEmail}
                </span>
              </div>
            )}

            <div className="flex justify-between border-b border-[#2A2A2E] pb-2">
              <span className="text-[#8A8278]">লাইসেন্সকৃত ফোন</span>
              <span className="font-mono font-bold text-[#C8A45C]">{orderData.customerPhone}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2A2E] pb-2">
              <span className="text-[#8A8278]">Transaction ID</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#F0EBE0]">{orderData.trxId}</span>
                <button
                  type="button"
                  onClick={handleCopyTrx}
                  className="p-1 rounded bg-[#1A1A1E] text-[#8A8278] hover:text-[#C8A45C] transition-colors cursor-pointer"
                  title="Copy TrxID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between border-b border-[#2A2A2E] pb-2">
              <span className="text-[#8A8278]">পেমেন্ট মেথড</span>
              <span className="font-medium text-emerald-400">bKash Verified (পরিশোধিত)</span>
            </div>

            <div className="flex justify-between pt-2 text-base font-bold text-[#C8A45C]">
              <span>পরিশোধিত মূল্য</span>
              <span className="font-display">৳{orderData.amount} BDT</span>
            </div>
          </div>

          {/* Support & Guarantee */}
          <div className="pt-2 border-t border-[#2A2A2E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A8278]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% অফিসিয়াল সংস্করণ</span>
            </div>
            <a
              href={`https://wa.me/${siteConfig.supportWhatsapp || "8801700000000"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8A45C] transition-colors inline-flex items-center gap-1 font-semibold"
            >
              <span>হোয়াটসঅ্যাপ সাপোর্ট</span>
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
