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
  CheckCircle2,
  Download,
  ShieldCheck,
  Phone,
  User,
  Mail,
  Check,
  Copy,
  Zap,
  Sparkles,
  Smartphone,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface OrderFormProps {
  onSuccess?: () => void;
}

export default function OrderForm({ onSuccess }: OrderFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [trxId, setTrxId] = useState("");
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const activeNumber =
    paymentMethod === "bkash"
      ? siteConfig.bkashNumber
      : paymentMethod === "nagad"
      ? siteConfig.nagadNumber
      : siteConfig.rocketNumber;

  useEffect(() => {
    trackInitiateCheckout(siteConfig.price);
  }, []);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(activeNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("অনুগ্রহ করে আপনার নাম, ইমেইল এবং হোয়াটসঅ্যাপ নম্বর প্রদান করুন।");
      return;
    }

    if (phone.trim().length < 11) {
      alert("অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = "PDF-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrderId);

    trackLead(phone);
    trackPurchase(siteConfig.price, generatedOrderId);

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
      <div className="p-7 sm:p-10 text-center space-y-6 bg-white rounded-3xl border-2 border-emerald-400 shadow-xl animate-scaleIn">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner animate-fadeIn">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            অর্ডার সফল হয়েছে • তাৎক্ষণিক ডাউনলোড প্রস্তুত
          </span>
          <h3 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#141518]">
            ধন্যবাদ, {name}!
          </h3>
          <p className="text-[#555760] text-sm max-w-md mx-auto">
            আপনার ডিজিটাল কপি প্রস্তুত। নিচের বাটন থেকে এখনই সম্পূর্ণ PDF ডাউনলোড করে নিন।
          </p>
        </div>

        {/* Primary Instant Download Button */}
        <div className="py-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("The 48 Laws of Power (বাংলা পিডিএফ) ডাউনলোড শুরু হয়েছে। আপনার ইমেইল ও হোয়াটসঅ্যাপেও ফাইল লিংক পাঠানো হয়েছে।");
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg transition-all cursor-pointer hover-lift active-lift btn-shimmer"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>পিডিএফ ডাউনলোড করুন (৩৬ মেগাবাইট)</span>
          </a>
        </div>

        {/* Order Details Confirmation */}
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DCBE] text-left max-w-md mx-auto space-y-2.5 text-xs sm:text-sm">
          <div className="flex justify-between border-b border-[#EFE8DA] pb-2">
            <span className="text-stone-500">অর্ডার আইডি:</span>
            <span className="font-mono font-bold text-[#141518]">{orderId}</span>
          </div>
          <div className="flex justify-between border-b border-[#EFE8DA] pb-2">
            <span className="text-stone-500">ই-বুক সংস্করণ:</span>
            <span className="font-medium text-[#141518]">The 48 Laws of Power (বাংলা PDF)</span>
          </div>
          <div className="flex justify-between border-b border-[#EFE8DA] pb-2">
            <span className="text-stone-500">ইমেইল ডেলিভারি:</span>
            <span className="font-medium text-[#141518]">{email}</span>
          </div>
          <div className="flex justify-between border-b border-[#EFE8DA] pb-2">
            <span className="text-stone-500">হোয়াটসঅ্যাপ নম্বর:</span>
            <span className="font-medium text-[#141518]">{phone}</span>
          </div>
          <div className="flex justify-between pt-1 text-base font-bold text-[#7A5B22]">
            <span>পরিশোধিত মূল্য:</span>
            <span>{siteConfig.currencySymbol}{siteConfig.price} (লাইফটাইম অ্যাক্সেস)</span>
          </div>
        </div>

        <div className="pt-2 text-stone-500 text-xs flex items-center justify-center gap-2">
          <span>কোনো সহায়তার প্রয়োজন?</span>
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
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-9 border border-[#E5DCBE] shadow-xl space-y-6 text-stone-900 animate-fadeIn"
    >
      {/* Form Header */}
      <div className="space-y-1.5 pb-4 border-b border-[#EFE8DA]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#141518]">
            ডিজিটাল অর্ডার ফর্ম
          </h3>
          <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3 text-emerald-600" />
            <span>তাৎক্ষণিক অ্যাক্সেস</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#5A5C64]">
          তথ্য প্রদান করে পেমেন্ট সম্পন্ন করুন। সাথে সাথেই ডাউনলোড লিংক পেয়ে যাবেন।
        </p>
      </div>

      {/* Name Field */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-bold text-[#2C2D32]">
          আপনার পুরো নাম <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            required
            placeholder="যেমন: মোঃ সাকিব হাসান"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D5C7A8] bg-[#FFFDF9] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B4B] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-bold text-[#2C2D32]">
          ইমেইল ঠিকানা (যেখানে PDF লিংক পাঠানো হবে) <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="email"
            required
            placeholder="যেমন: yourname@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D5C7A8] bg-[#FFFDF9] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B4B] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Phone / WhatsApp Field */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-bold text-[#2C2D32]">
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
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D5C7A8] bg-[#FFFDF9] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B4B] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs sm:text-sm font-bold text-[#2C2D32]">
          পেমেন্ট মাধ্যম বেছে নিন <span className="text-rose-500">*</span>
        </label>
        
        <div className="grid grid-cols-3 gap-3">
          {/* bKash */}
          <button
            type="button"
            onClick={() => setPaymentMethod("bkash")}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover-lift active-lift ${
              paymentMethod === "bkash"
                ? "border-[#E2136E] bg-[#E2136E]/8 text-[#E2136E] font-bold shadow-xs scale-102 ring-1 ring-[#E2136E]/30"
                : "border-[#E5DCBE] bg-[#FFFDF9] text-stone-700 hover:bg-[#FAF6EE]"
            }`}
          >
            <span className="text-sm font-bold">বিকাশ (bKash)</span>
            <span className="text-[10px] text-stone-500 mt-0.5">Send Money</span>
          </button>

          {/* Nagad */}
          <button
            type="button"
            onClick={() => setPaymentMethod("nagad")}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover-lift active-lift ${
              paymentMethod === "nagad"
                ? "border-[#F7941D] bg-[#F7941D]/8 text-[#F7941D] font-bold shadow-xs scale-102 ring-1 ring-[#F7941D]/30"
                : "border-[#E5DCBE] bg-[#FFFDF9] text-stone-700 hover:bg-[#FAF6EE]"
            }`}
          >
            <span className="text-sm font-bold">নগদ (Nagad)</span>
            <span className="text-[10px] text-stone-500 mt-0.5">Send Money</span>
          </button>

          {/* Rocket */}
          <button
            type="button"
            onClick={() => setPaymentMethod("rocket")}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover-lift active-lift ${
              paymentMethod === "rocket"
                ? "border-[#8C3494] bg-[#8C3494]/8 text-[#8C3494] font-bold shadow-xs scale-102 ring-1 ring-[#8C3494]/30"
                : "border-[#E5DCBE] bg-[#FFFDF9] text-stone-700 hover:bg-[#FAF6EE]"
            }`}
          >
            <span className="text-sm font-bold">রকেট (Rocket)</span>
            <span className="text-[10px] text-stone-500 mt-0.5">Send Money</span>
          </button>
        </div>

        {/* Payment Instructions Box */}
        <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#DFCFA8] space-y-2 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-stone-600 font-medium">
              {paymentMethod === "bkash" ? "বিকাশ পার্সোনাল নম্বর" : paymentMethod === "nagad" ? "নগদ পার্সোনাল নম্বর" : "রকেট পার্সোনাল নম্বর"}:
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base text-[#141518]">{activeNumber}</span>
              <button
                type="button"
                onClick={handleCopyNumber}
                className="px-2.5 py-1 rounded-md bg-white border border-[#D5C7A8] text-xs font-bold text-[#7A5B22] hover:bg-[#FAF8F5] cursor-pointer flex items-center gap-1 shadow-2xs hover-lift active-lift transition-all"
              >
                {copiedNumber ? <Check className="w-3 h-3 text-emerald-600 animate-scaleIn" /> : <Copy className="w-3 h-3" />}
                <span>{copiedNumber ? "কপি হয়েছে!" : "কপি"}</span>
              </button>
            </div>
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed border-t border-[#EFE8DA] pt-2">
            ★ উপরের নম্বরে <span className="font-bold text-[#141518]">{siteConfig.currencySymbol}{siteConfig.price}</span> টাকা সেন্ড মানি করুন। এরপর নিচে আপনার ট্রানজেকশন আইডি (TrxID) দিয়ে কনফার্ম করুন।
          </p>
        </div>

        {/* TrxID Input */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-bold text-[#2C2D32]">
            ট্রানজেকশন আইডি (TrxID) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="যেমন: 9J4K2L8M7"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#D5C7A8] bg-[#FFFDF9] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B4B] focus:border-transparent font-mono uppercase transition-all"
          />
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#F5EFE4] border border-[#DFCFA8] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src="/images/book-mockup.png"
            alt="The 48 Laws of Power"
            className="h-12 w-auto object-contain drop-shadow-sm"
          />
          <div>
            <span className="text-xs text-stone-600 font-medium block">মোট প্রদেয় মূল্য:</span>
            <span className="text-[11px] text-emerald-700 font-semibold">ডিজিটাল সংস্করণ • লাইফটাইম অ্যাক্সেস</span>
          </div>
        </div>
        <span className="text-2xl font-serif font-black text-[#7A5B22] shrink-0">
          {siteConfig.currencySymbol}{siteConfig.price}
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-full bg-[#18191D] hover:bg-[#25272F] text-[#F3EDE2] font-bold text-base sm:text-lg shadow-lg border border-[#C59B4B]/60 flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-75 hover-lift btn-shimmer active-lift"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-[#E6C67E]" />
            <span>ভেরিফাই হচ্ছে...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5 text-[#E6C67E]" />
            <span>পেমেন্ট সম্পন্ন করেছি — ডাউনলোড করুন ({siteConfig.currencySymbol}{siteConfig.price})</span>
          </>
        )}
      </button>

      {/* Guarantees */}
      <div className="flex items-center justify-center gap-6 text-[11px] sm:text-xs text-stone-500 pt-1">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#8C6B2A]" />
          <span>তাৎক্ষণিক ডাউনলোড</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8C6B2A]" />
          <span>১০০% নিরাপদ ট্রানজেকশন</span>
        </div>
      </div>
    </form>
  );
}
