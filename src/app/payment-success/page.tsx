"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2, Download, Copy, Check, ExternalLink, ShieldCheck,
  Sparkles, Loader2, Mail, Phone, FileText, ArrowRight, AlertCircle, BookOpen
} from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/data/siteConfig";
import { trackPurchase } from "@/lib/pixel";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const initialTrxID = searchParams.get("trxID") || "";
  const initialPaymentID = searchParams.get("paymentID") || "";
  const initialAmount = searchParams.get("amount") || String(siteConfig.price);
  const initialOrderNumber = searchParams.get("orderNumber") || "";
  const token = searchParams.get("token") || "";
  const initialEmail = searchParams.get("email") || "";
  const initialPhone = searchParams.get("phone") || "";
  const initialPackage = (searchParams.get("packageType") as "bundle" | "48_laws" | "art_of_seduction") || "bundle";

  const [copied, setCopied] = useState(false);
  const [downloadingBook, setDownloadingBook] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Live order state
  const [orderData, setOrderData] = useState<{
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    amount: number;
    packageType?: "bundle" | "48_laws" | "art_of_seduction";
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
    amount: Number(initialAmount) || siteConfig.price,
    packageType: initialPackage,
    paymentStatus: "paid",
    trxId: initialTrxID || "BKASH-PAID",
    pdfStatus: "pending",
    emailStatus: "pending",
    downloadCount: 0,
  });

  // Confetti & Meta Pixel Purchase event on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.4 },
        colors: ["#C8A45C", "#E11D48", "#F0EBE0", "#D4AF6E", "#10B981"],
      });
    } catch {}

    // Track Meta Pixel Purchase event
    const finalAmount = Number(initialAmount) || siteConfig.price;
    const finalOrderId = initialOrderNumber || initialTrxID || "ORDER-" + Date.now();
    trackPurchase(finalAmount, finalOrderId);
  }, [initialAmount, initialOrderNumber, initialTrxID]);

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
          setOrderData((prev) => ({
            ...prev,
            ...data.order,
            packageType: data.order.packageType || prev.packageType,
          }));
          setLoadingStatus(false);

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

  const isBundle = orderData.packageType === "bundle" || orderData.amount >= 180;
  const isSeductionOnly = orderData.packageType === "art_of_seduction";

  const downloadUrl48Laws = token ? `/api/download/${token}?book=48_laws` : "#";
  const downloadUrlSeduction = token ? `/api/download/${token}?book=art_of_seduction` : "#";

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
              {isBundle
                ? "The 48 Laws of Power + The Art of Seduction (২-বুক মাস্টার বান্ডেল)"
                : isSeductionOnly
                ? "The Art of Seduction (বাংলা সংস্করণ) - ৬৫০ পৃষ্ঠা"
                : "The 48 Laws of Power (বাংলা সংস্করণ) - ৫০৯ পৃষ্ঠা"}
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
            ) : isBundle ? (
              <div className="space-y-2.5">
                <a
                  href={downloadUrl48Laws}
                  onClick={() => setDownloadingBook("48_laws")}
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-2xl bg-[#181820] hover:bg-[#20202A] border border-[#C8A45C]/40 text-[#F0EBE0] font-bold text-sm shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <BookOpen className="w-4 h-4 text-[#C8A45C]" />
                    <div>
                      <span className="block text-xs font-bold text-[#F0EBE0]">📘 The 48 Laws of Power</span>
                      <span className="text-[10px] text-[#A8A095]">৫০৯ পৃষ্ঠা সম্পূর্ণ বাংলা সংস্করণ</span>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-lg bg-[#C8A45C] text-[#08080A] text-xs font-bold flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    {downloadingBook === "48_laws" ? "ডাউনলোড..." : "ডাউনলোড"}
                  </span>
                </a>

                <a
                  href={downloadUrlSeduction}
                  onClick={() => setDownloadingBook("seduction")}
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-2xl bg-[#181418] hover:bg-[#221A22] border border-[#E11D48]/40 text-[#F0EBE0] font-bold text-sm shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <Sparkles className="w-4 h-4 text-[#E11D48]" />
                    <div>
                      <span className="block text-xs font-bold text-[#F0EBE0]">📕 The Art of Seduction</span>
                      <span className="text-[10px] text-[#A8A095]">৬৫০ পৃষ্ঠা সম্পূর্ণ বাংলা সংস্করণ</span>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-lg bg-[#E11D48] text-white text-xs font-bold flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    {downloadingBook === "seduction" ? "ডাউনলোড..." : "ডাউনলোড"}
                  </span>
                </a>
              </div>
            ) : isSeductionOnly ? (
              <a
                href={downloadUrlSeduction}
                onClick={() => setDownloadingBook("seduction")}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#E11D48] to-[#C8A45C] text-white font-bold text-base shadow-[0_0_35px_rgba(225,29,72,0.3)] transition-all cursor-pointer group"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>{downloadingBook ? "ডাউনলোড শুরু হয়েছে..." : "The Art of Seduction PDF ডাউনলোড"}</span>
              </a>
            ) : (
              <a
                href={downloadUrl48Laws}
                onClick={() => setDownloadingBook("48_laws")}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all cursor-pointer group"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>{downloadingBook ? "ডাউনলোড শুরু হয়েছে..." : "The 48 Laws of Power PDF ডাউনলোড"}</span>
              </a>
            )}

            {/* Email Delivery Confirmation Alert */}
            {orderData.emailStatus === "sent" ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-2 text-xs text-emerald-400 font-semibold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>আপনার Gmail (<span className="font-mono text-[#F0EBE0]">{orderData.customerEmail}</span>)-এও ফাইল পাঠানো হয়েছে।</span>
              </div>
            ) : orderData.emailStatus === "pending" ? (
              <div className="p-2.5 rounded-xl bg-[#16161B] border border-[#26262A] flex items-center justify-center gap-2 text-[11px] text-[#A8A095]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8A45C]" />
                <span>আপনার Gmail-এ অ্যাক্সেস লিংক পাঠানো হচ্ছে...</span>
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
              <span className="text-[#8A8278]">অর্ডার প্যাকেজ</span>
              <span className="font-bold text-[#C8A45C]">
                {isBundle ? "২-বুক মাস্টার বান্ডেল" : isSeductionOnly ? "The Art of Seduction" : "The 48 Laws of Power"}
              </span>
            </div>

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

            <div className="flex justify-between items-center border-b border-[#2A2A2E] pb-2">
              <span className="text-[#8A8278]">Transaction ID</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#F0EBE0]">{orderData.trxId}</span>
                <button
                  type="button"
                  onClick={handleCopyTrx}
                  className="p-1 rounded bg-[#1A1A1E] hover:bg-[#2A2A2E] text-[#C8A45C] transition-colors"
                  title="Copy TrxID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-1">
              <span className="text-[#8A8278]">পরিশোধিত মূল্য</span>
              <span className="font-bold text-emerald-400">৳{orderData.amount} BDT (পরিশোধিত)</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1A1A1E] hover:bg-[#2A2A2E] text-[#D1C9BC] hover:text-[#F0EBE0] transition-colors font-medium text-center"
            >
              হোমপেজে ফিরুন
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#08080A] text-[#F0EBE0] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#C8A45C]" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
