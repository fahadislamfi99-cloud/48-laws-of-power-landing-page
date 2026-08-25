"use client";

import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/data/siteConfig";
import { trackInitiateCheckout, trackPurchase, trackLead } from "@/lib/pixel";
import confetti from "canvas-confetti";
import {
  CheckCircle2, Download, ShieldCheck, Phone, User, Mail,
  Check, Copy, Zap, ExternalLink, Loader2, CreditCard,
  ArrowRight, Sparkles,
} from "lucide-react";

interface OrderFormProps {
  onSuccess?: () => void;
}

export default function OrderForm({ onSuccess }: OrderFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [trxId, setTrxId] = useState("");
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const activeNumber = paymentMethod === "bkash" ? siteConfig.bkashNumber : paymentMethod === "nagad" ? siteConfig.nagadNumber : siteConfig.rocketNumber;

  useEffect(() => { trackInitiateCheckout(siteConfig.price); }, []);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(activeNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("অনুগ্রহ করে আপনার নাম, ইমেইল এবং হোয়াটসঅ্যাপ নম্বর প্রদান করুন।");
      return;
    }
    if (phone.trim().length < 11) {
      alert("অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন।");
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId.trim()) {
      alert("অনুগ্রহ করে ট্রানজেকশন আইডি প্রদান করুন।");
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
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ["#C8A45C", "#D4AF6E", "#8B6914", "#F0EBE0"],
        });
      } catch {}
      if (onSuccess) onSuccess();
    }, 800);
  };

  // ─── SUCCESS STATE ───────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="text-center space-y-6 animate-fadeIn">
        {/* Success icon with ring */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            <Sparkles className="w-3 h-3" />
            অর্ডার সফল • ডাউনলোড প্রস্তুত
          </span>
          <h3 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#F0EBE0]">
            ধন্যবাদ, {name}!
          </h3>
          <p className="text-[#B8B0A4] text-sm max-w-sm mx-auto leading-relaxed">
            আপনার ডিজিটাল কপি প্রস্তুত করা হয়েছে। নিচের বাটন থেকে এখনই PDF ডাউনলোড করুন।
          </p>
        </div>

        {/* Download button */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); alert("ডাউনলোড শুরু হয়েছে।"); }}
          className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all cursor-pointer hover-lift btn-shimmer group"
        >
          <Download className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span>পিডিএফ ডাউনলোড করুন (৩৬ MB)</span>
        </a>

        {/* Order receipt */}
        <div className="p-5 rounded-2xl bg-[#08080A] border border-[#2A2A2E] text-left space-y-0 text-xs sm:text-sm">
          {[
            ["অর্ডার আইডি", orderId],
            ["সংস্করণ", "The 48 Laws of Power (বাংলা PDF)"],
            ["ইমেইল", email],
            ["হোয়াটসঅ্যাপ", phone],
          ].map(([label, value], i, arr) => (
            <div key={label} className={`flex justify-between py-2.5 ${i < arr.length - 1 ? "border-b border-[#2A2A2E]" : ""}`}>
              <span className="text-[#8A8278]">{label}</span>
              <span className="font-medium text-[#F0EBE0] text-right max-w-[60%] truncate">{value}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3 mt-1 border-t border-[#C8A45C]/20">
            <span className="font-bold text-[#B8B0A4]">পরিশোধিত</span>
            <span className="text-lg font-display font-bold text-[#C8A45C]">{siteConfig.currencySymbol}{siteConfig.price}</span>
          </div>
        </div>

        {/* Support link */}
        <div className="text-[#8A8278] text-xs flex items-center justify-center gap-2">
          <span>কোনো সমস্যা?</span>
          <a
            href={`https://wa.me/${siteConfig.supportWhatsapp}?text=Hello,%20my%20Order%20ID%20is%20${orderId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>হোয়াটসঅ্যাপে মেসেজ দিন</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // ─── MAIN FORM ───────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header with book + price */}
      <div className="flex items-center gap-4 pb-5 border-b border-[#2A2A2E]">
        <div className="relative shrink-0">
          <img
            src="/images/book-mockup.png"
            alt="The 48 Laws of Power"
            className="h-20 w-auto object-contain drop-shadow-[0_10px_20px_rgba(200,164,92,0.15)]"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#C8A45C] text-[#08080A] flex items-center justify-center text-[10px] font-display font-bold shadow-lg">
            48
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bengali-serif font-bold text-[#F0EBE0] leading-tight">
            ডিজিটাল কপি অর্ডার
          </h3>
          <p className="text-xs text-[#8A8278] mt-0.5">The 48 Laws of Power (বাংলা PDF)</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-display font-bold text-[#C8A45C]">{siteConfig.currencySymbol}{siteConfig.price}</span>
            <span className="text-[10px] text-[#8A8278] line-through">{siteConfig.currencySymbol}{siteConfig.originalPrice}</span>
            <span className="text-[10px] bg-[#C8A45C]/10 text-[#C8A45C] border border-[#C8A45C]/20 font-bold px-2 py-0.5 rounded-full">
              ৩৪% ছাড়
            </span>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3">
        {[
          { num: 1 as const, label: "তথ্য" },
          { num: 2 as const, label: "পেমেন্ট" },
        ].map(({ num, label }, i) => (
          <React.Fragment key={num}>
            {i > 0 && <div className={`flex-1 h-[2px] rounded-full transition-colors duration-500 ${step >= 2 ? "bg-[#C8A45C]" : "bg-[#2A2A2E]"}`} />}
            <button
              type="button"
              onClick={() => { if (num === 1) setStep(1); }}
              className={`flex items-center gap-2 transition-all duration-300 ${step === num ? "cursor-default" : "cursor-pointer"}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step === num
                  ? "bg-[#C8A45C] text-[#08080A] shadow-[0_0_15px_rgba(200,164,92,0.3)]"
                  : step > num
                  ? "bg-[#C8A45C]/20 text-[#C8A45C]"
                  : "bg-[#1A1A1E] text-[#8A8278] border border-[#2A2A2E]"
              }`}>
                {step > num ? <Check className="w-3.5 h-3.5" /> : num}
              </div>
              <span className={`text-xs font-medium transition-colors ${step === num ? "text-[#C8A45C]" : "text-[#8A8278]"}`}>
                {label}
              </span>
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Contact Info */}
      {step === 1 && (
        <form onSubmit={handleContinueToPayment} className="space-y-4 animate-fadeIn">
          {[
            { label: "আপনার পুরো নাম", type: "text", placeholder: "যেমন: মোঃ সাকিব হাসান", value: name, onChange: setName, Icon: User },
            { label: "ইমেইল ঠিকানা", type: "email", placeholder: "yourname@gmail.com", value: email, onChange: setEmail, Icon: Mail },
            { label: "মোবাইল / হোয়াটসঅ্যাপ", type: "tel", placeholder: "017XXXXXXXX", value: phone, onChange: setPhone, Icon: Phone },
          ].map(({ label, type, placeholder, value, onChange, Icon }) => (
            <div key={label} className="space-y-1.5">
              <label className="block text-xs font-bold text-[#B8B0A4]">
                {label} <span className="text-[#E24848]">*</span>
              </label>
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8278] group-focus-within:text-[#C8A45C] transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <input
                  type={type}
                  required
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 input-dark text-sm"
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl btn-gold text-sm font-bold flex items-center justify-center gap-2 cursor-pointer hover-lift group"
          >
            <span>পেমেন্টে এগিয়ে যান</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
          {/* Back to step 1 */}
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center gap-1.5 text-xs text-[#8A8278] hover:text-[#C8A45C] transition-colors cursor-pointer group"
          >
            <ArrowRight className="w-3 h-3 rotate-180 transition-transform group-hover:-translate-x-0.5" />
            <span>তথ্য পরিবর্তন করুন</span>
          </button>

          {/* Payment method cards */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#B8B0A4]">
              পেমেন্ট মাধ্যম <span className="text-[#E24848]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: "bkash" as const, label: "বিকাশ", sub: "Send Money", color: "#E2136E", bg: "from-[#E2136E]/20 to-[#E2136E]/5" },
                { id: "nagad" as const, label: "নগদ", sub: "Send Money", color: "#F7941D", bg: "from-[#F7941D]/20 to-[#F7941D]/5" },
                { id: "rocket" as const, label: "রকেট", sub: "Send Money", color: "#8C3494", bg: "from-[#8C3494]/20 to-[#8C3494]/5" },
              ].map(({ id, label, sub, color, bg }) => {
                const active = paymentMethod === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={`relative p-3.5 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 cursor-pointer hover-lift overflow-hidden ${
                      active ? "border-transparent" : "border-[#2A2A2E] bg-[#08080A] hover:bg-[#0A0A0C]"
                    }`}
                    style={active ? { borderColor: color, boxShadow: `0 0 20px ${color}20, inset 0 1px 0 ${color}30` } : {}}
                  >
                    {active && (
                      <div className={`absolute inset-0 bg-gradient-to-b ${bg} pointer-events-none`} />
                    )}
                    <span className="relative text-sm font-bold" style={active ? { color } : { color: "#B8B0A4" }}>
                      {label}
                    </span>
                    <span className="relative text-[10px] text-[#8A8278] mt-0.5">{sub}</span>
                    {active && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment number display */}
          <div className="p-4 rounded-xl bg-[#08080A] border border-[#2A2A2E] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#8A8278] font-medium uppercase tracking-wider">
                {paymentMethod === "bkash" ? "বিকাশ" : paymentMethod === "nagad" ? "নগদ" : "রকেট"} পার্সোনাল
              </span>
              <span className="text-[10px] text-[#8A8278]">Send Money করুন</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#111114] border border-[#2A2A2E]">
              <span className="font-mono font-bold text-xl tracking-wider text-[#C8A45C]">
                {activeNumber}
              </span>
              <button
                type="button"
                onClick={handleCopyNumber}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-all duration-300 ${
                  copiedNumber
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-[#C8A45C]/10 text-[#C8A45C] border border-[#C8A45C]/20 hover:bg-[#C8A45C]/20"
                }`}
              >
                {copiedNumber ? (
                  <><Check className="w-3 h-3" /><span>কপি হয়েছে!</span></>
                ) : (
                  <><Copy className="w-3 h-3" /><span>কপি</span></>
                )}
              </button>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-[#8A8278] leading-relaxed">
              <span className="text-[#C8A45C] mt-0.5 shrink-0">★</span>
              <span>
                উপরের নম্বরে <span className="font-bold text-[#F0EBE0]">{siteConfig.currencySymbol}{siteConfig.price}</span> টাকা সেন্ড মানি করুন। এরপর নিচে ট্রানজেকশন আইডি দিন।
              </span>
            </div>
          </div>

          {/* TrxID input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#B8B0A4]">
              ট্রানজেকশন আইডি (TrxID) <span className="text-[#E24848]">*</span>
            </label>
            <div className="relative group">
              <CreditCard className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8278] group-focus-within:text-[#C8A45C] transition-colors" />
              <input
                type="text"
                required
                placeholder="যেমন: 9J4K2L8M7"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 input-dark font-mono uppercase text-sm tracking-wider"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl btn-gold text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 hover-lift btn-shimmer group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>ভেরিফাই হচ্ছে...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>পেমেন্ট সম্পন্ন: ডাউনলোড করুন ({siteConfig.currencySymbol}{siteConfig.price})</span>
              </>
            )}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 text-[11px] text-[#8A8278] pt-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#C8A45C]" />
              <span>তাৎক্ষণিক ডাউনলোড</span>
            </div>
            <div className="w-[1px] h-3 bg-[#2A2A2E]" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#C8A45C]" />
              <span>১০০% নিরাপদ</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
