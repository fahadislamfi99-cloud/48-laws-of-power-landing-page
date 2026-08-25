"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import {
  trackInitiateCheckout,
  trackPurchase,
  trackLead,
} from "@/lib/pixel";
import confetti from "canvas-confetti";
import {
  Download,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Mail,
  Phone,
  User,
  ExternalLink,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface DigitalCheckoutProps {
  onSuccess?: () => void;
}

export default function DigitalCheckout({ onSuccess }: DigitalCheckoutProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [trxId, setTrxId] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const containerRef = useScrollReveal<HTMLElement>();

  const activeNumber =
    method === "bkash"
      ? siteConfig.bkashNumber
      : method === "nagad"
      ? siteConfig.nagadNumber
      : siteConfig.rocketNumber;

  useEffect(() => {
    trackInitiateCheckout(siteConfig.price);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !trxId.trim()) {
      alert("অনুগ্রহ করে আপনার নাম, ইমেইল, মোবাইল নম্বর এবং ট্রানজেকশন আইডি প্রদান করুন।");
      return;
    }

    if (phone.trim().length < 11) {
      alert("অনুগ্রহ করে একটি সঠিক মোবাইল নম্বর প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);

    const generatedId = "PDF-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);

    trackLead(phone);
    trackPurchase(siteConfig.price, generatedId);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.log(err);
      }

      if (onSuccess) onSuccess();
    }, 600);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-400 shadow-xl text-center space-y-6 animate-scaleIn max-w-xl mx-auto my-12">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner animate-fadeIn">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            পেমেন্ট সফল • ডাউনলোড প্রস্তুত
          </span>
          <h3 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#121316]">
            ধন্যবাদ, {name}!
          </h3>
          <p className="text-[#52555E] text-sm max-w-md mx-auto">
            আপনার ডিজিটাল কপি প্রস্তুত করা হয়েছে। নিচের বাটন থেকে এখনই সম্পূর্ণ PDF ডাউনলোড করে নিন।
          </p>
        </div>

        {/* Instant Download Button */}
        <div className="pt-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("The 48 Laws of Power (বাংলা পিডিএফ) ডাউনলোড শুরু হয়েছে। আপনার ইমেইল (" + email + ") ঠিকানাতেও ব্যাকআপ লিংক পাঠানো হয়েছে।");
            }}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md transition-all cursor-pointer hover-lift active-lift btn-shimmer"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>পিডিএফ ডাউনলোড করুন (৩৬ মেগাবাইট)</span>
          </a>
        </div>

        {/* Order Details Confirmation */}
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D4] text-left space-y-2.5 text-xs sm:text-sm">
          <div className="flex justify-between border-b border-[#E6E0D4] pb-2">
            <span className="text-stone-500">অর্ডার আইডি:</span>
            <span className="font-mono font-bold text-[#121316]">{orderId}</span>
          </div>
          <div className="flex justify-between border-b border-[#E6E0D4] pb-2">
            <span className="text-stone-500">সংস্করণ:</span>
            <span className="font-medium text-[#121316]">The 48 Laws of Power (বাংলা PDF)</span>
          </div>
          <div className="flex justify-between border-b border-[#E6E0D4] pb-2">
            <span className="text-stone-500">ইমেইল:</span>
            <span className="font-medium text-[#121316]">{email}</span>
          </div>
          <div className="flex justify-between border-b border-[#E6E0D4] pb-2">
            <span className="text-stone-500">হোয়াটসঅ্যাপ:</span>
            <span className="font-medium text-[#121316]">{phone}</span>
          </div>
          <div className="flex justify-between pt-1 text-base font-bold text-[#8F6B2C]">
            <span>পরিশোধিত মূল্য:</span>
            <span>{siteConfig.currencySymbol}{siteConfig.price} (লাইফটাইম অ্যাক্সেস)</span>
          </div>
        </div>

        <div className="text-stone-500 text-xs flex items-center justify-center gap-2">
          <span>কোনো সমস্যা হলে:</span>
          <a
            href={`https://wa.me/${siteConfig.supportWhatsapp}?text=Hello,%20my%20Order%20ID%20is%20${orderId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>হোয়াটসঅ্যাপে মেসেজ দিন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <section
      id="checkout"
      ref={containerRef}
      className="py-20 lg:py-28 border-b border-[#E6E0D4] bg-[#FAF8F5]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 reveal">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8F6B2C] uppercase block">
            SECURE DIGITAL ACCESS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#121316]">
            ডিজিটাল কপি সংগ্রহ করুন
          </h2>
          <p className="text-[#52555E] text-sm sm:text-base">
            নিচে তথ্য পূরণ করে পেমেন্ট সম্পন্ন করুন। সাথে সাথেই ডাউনলোড লিংক সক্রিয় হবে।
          </p>
        </div>

        {/* Checkout Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D8D0C3] shadow-md space-y-6 text-[#121316] reveal reveal-stagger-1 transition-all duration-300 hover:shadow-lg"
        >
          {/* Price Summary Banner */}
          <div className="p-5 rounded-2xl bg-[#F7F5EE] border border-[#E0D8CA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-16 shrink-0 flex items-center justify-center">
                <img
                  src="/images/book-mockup.png"
                  alt="The 48 Laws of Power Book"
                  className="h-16 w-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <span className="text-xs font-mono text-[#8F6B2C] font-bold block uppercase">
                  The 48 Laws of Power (বাংলা ডিজিটাল PDF সংস্করণ)
                </span>
                <span className="text-xs text-stone-600">
                  ৪৫২ পৃষ্ঠা • সার্চেবল টেক্সট • লাইফটাইম অ্যাক্সেস
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-3xl font-display font-bold text-[#121316]">
                {siteConfig.currencySymbol}{siteConfig.price}
              </span>
              <span className="text-[11px] text-stone-500 block font-mono">
                এককালীন মূল্য • নো ডেলিভারি ফি
              </span>
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#2C2D32]">
                আপনার পুরো নাম <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 transition-colors peer-focus:text-[#8F6B2C]" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ সাকিব হাসান"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D8D0C3] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8F6B2C] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#2C2D32]">
                ইমেইল ঠিকানা (যেখানে PDF পাঠানো হবে) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="যেমন: yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D8D0C3] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8F6B2C] focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#2C2D32]">
              মোবাইল / হোয়াটসঅ্যাপ নম্বর <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="tel"
                required
                placeholder="যেমন: 017XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D8D0C3] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8F6B2C] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2 border-t border-[#E6E0D4]">
            <label className="block text-xs font-bold text-[#2C2D32]">
              পেমেন্ট মাধ্যম বেছে নিন <span className="text-rose-500">*</span>
            </label>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setMethod("bkash")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover-lift active-lift ${
                  method === "bkash"
                    ? "border-[#E2136E] bg-[#E2136E]/8 text-[#E2136E] font-bold shadow-xs scale-102 ring-1 ring-[#E2136E]/30"
                    : "border-[#D8D0C3] bg-[#FAF8F5] text-stone-700 hover:bg-[#FAF8F5]/80"
                }`}
              >
                <span className="text-sm font-bold">বিকাশ (bKash)</span>
                <span className="text-[10px] text-stone-500 mt-0.5">Send Money</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod("nagad")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover-lift active-lift ${
                  method === "nagad"
                    ? "border-[#F7941D] bg-[#F7941D]/8 text-[#F7941D] font-bold shadow-xs scale-102 ring-1 ring-[#F7941D]/30"
                    : "border-[#D8D0C3] bg-[#FAF8F5] text-stone-700 hover:bg-[#FAF8F5]/80"
                }`}
              >
                <span className="text-sm font-bold">নগদ (Nagad)</span>
                <span className="text-[10px] text-stone-500 mt-0.5">Send Money</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod("rocket")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover-lift active-lift ${
                  method === "rocket"
                    ? "border-[#8C3494] bg-[#8C3494]/8 text-[#8C3494] font-bold shadow-xs scale-102 ring-1 ring-[#8C3494]/30"
                    : "border-[#D8D0C3] bg-[#FAF8F5] text-stone-700 hover:bg-[#FAF8F5]/80"
                }`}
              >
                <span className="text-sm font-bold">রকেট (Rocket)</span>
                <span className="text-[10px] text-stone-500 mt-0.5">Send Money</span>
              </button>
            </div>

            {/* Payment Number & Instructions */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D8D0C3] space-y-2 text-xs transition-all">
              <div className="flex items-center justify-between">
                <span className="text-stone-600 font-medium">
                  {method === "bkash" ? "বিকাশ পার্সোনাল নম্বর" : method === "nagad" ? "নগদ পার্সোনাল নম্বর" : "রকেট পার্সোনাল নম্বর"}:
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-[#121316]">{activeNumber}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-2.5 py-1 rounded-md bg-white border border-[#D8D0C3] text-xs font-bold text-[#8F6B2C] hover:bg-[#FAF8F5] cursor-pointer flex items-center gap-1 shadow-2xs hover-lift active-lift transition-all"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600 animate-scaleIn" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "কপি হয়েছে" : "কপি"}</span>
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed border-t border-[#E6E0D4] pt-2">
                ★ উপরের নম্বরে <span className="font-bold text-[#121316]">{siteConfig.currencySymbol}{siteConfig.price}</span> টাকা সেন্ড মানি করুন। এরপর নিচে ট্রানজেকশন আইডি (TrxID) দিয়ে ডাউনলোড কনফার্ম করুন।
              </p>
            </div>

            {/* TrxID Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#2C2D32]">
                ট্রানজেকশন আইডি (TrxID) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: 9J4K2L8M7"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#D8D0C3] bg-[#FAF8F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8F6B2C] focus:bg-white font-mono uppercase transition-all"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-full bg-[#121316] hover:bg-[#25272F] text-[#FAF8F5] font-bold text-base shadow-md flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-75 hover-lift btn-shimmer active-lift"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#DFC07A]" />
                <span>ভেরিফাই হচ্ছে...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5 text-[#DFC07A]" />
                <span>পেমেন্ট সম্পন্ন করেছি — ডাউনলোড করুন ({siteConfig.currencySymbol}{siteConfig.price})</span>
              </>
            )}
          </button>

          <div className="text-center text-xs text-stone-500 font-mono">
            ★ পেমেন্ট কনফার্মেশনের সাথে সাথেই অন-স্ক্রিন ডাউনলোড লিংক প্রদান করা হবে
          </div>
        </form>

      </div>
    </section>
  );
}
