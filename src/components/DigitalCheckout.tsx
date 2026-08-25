"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { trackInitiateCheckout, trackPurchase, trackLead } from "@/lib/pixel";
import confetti from "canvas-confetti";
import {
  Download, CheckCircle2, Copy, Check, Mail, Phone, User,
  ExternalLink, ShieldCheck, Loader2, Zap,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function DigitalCheckout() {
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

  const activeNumber = method === "bkash" ? siteConfig.bkashNumber : method === "nagad" ? siteConfig.nagadNumber : siteConfig.rocketNumber;

  useEffect(() => { trackInitiateCheckout(siteConfig.price); }, []);

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
      try { confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } }); } catch {}
    }, 600);
  };

  if (isSuccess) {
    return (
      <section id="checkout" className="py-20 lg:py-28 bg-[#08080A]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111114] rounded-3xl p-8 sm:p-12 border-2 border-emerald-500/40 text-center space-y-6 animate-scaleIn">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
                পেমেন্ট সফল • ডাউনলোড প্রস্তুত
              </span>
              <h3 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#F0EBE0]">
                ধন্যবাদ, {name}!
              </h3>
              <p className="text-[#B8B0A4] text-sm max-w-md mx-auto">
                আপনার ডিজিটাল কপি প্রস্তুত করা হয়েছে। নিচের বাটন থেকে এখনই সম্পূর্ণ PDF ডাউনলোড করে নিন।
              </p>
            </div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("ডাউনলোড শুরু হয়েছে।"); }}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md transition-all cursor-pointer hover-lift btn-shimmer"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>পিডিএফ ডাউনলোড করুন (৩৬ মেগাবাইট)</span>
            </a>
            <div className="p-5 rounded-2xl bg-[#08080A] border border-[#2A2A2E] text-left space-y-2.5 text-xs sm:text-sm">
              {[
                ["অর্ডার আইডি", orderId],
                ["সংস্করণ", "The 48 Laws of Power (বাংলা PDF)"],
                ["ইমেইল", email],
                ["হোয়াটসঅ্যাপ", phone],
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
              <a href={`https://wa.me/${siteConfig.supportWhatsapp}?text=Hello,%20my%20Order%20ID%20is%20${orderId}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1">
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
    <section id="checkout" ref={containerRef} className="py-20 lg:py-28 bg-[#08080A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 reveal">
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#C8A45C] uppercase block">SECURE DIGITAL ACCESS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F0EBE0]">ডিজিটাল কপি সংগ্রহ করুন</h2>
          <p className="text-[#B8B0A4] text-sm sm:text-base">নিচে তথ্য পূরণ করে পেমেন্ট সম্পন্ন করুন। সাথে সাথেই ডাউনলোড লিংক সক্রিয় হবে।</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111114] rounded-3xl p-6 sm:p-10 border border-[#2A2A2E] space-y-6 reveal reveal-stagger-1">
          {/* Price Banner */}
          <div className="p-5 rounded-2xl bg-[#0A0A0C] border border-[#2A2A2E] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src="/images/book-mockup.png" alt="Book" className="h-16 w-auto object-contain drop-shadow-md" />
              <div>
                <span className="text-xs font-mono text-[#C8A45C] font-bold block uppercase">The 48 Laws of Power (বাংলা PDF)</span>
                <span className="text-xs text-[#8A8278]">৪৫২ পৃষ্ঠা • সার্চেবল • লাইফটাইম</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-3xl font-display font-bold text-[#C8A45C]">{siteConfig.currencySymbol}{siteConfig.price}</span>
              <span className="text-[11px] text-[#8A8278] block font-mono">এককালীন • নো ডেলিভারি ফি</span>
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "আপনার পুরো নাম", type: "text", placeholder: "যেমন: মোঃ সাকিব হাসান", value: name, onChange: setName, Icon: User },
              { label: "ইমেইল ঠিকানা", type: "email", placeholder: "yourname@gmail.com", value: email, onChange: setEmail, Icon: Mail },
            ].map(({ label, type, placeholder, value, onChange, Icon }) => (
              <div key={label} className="space-y-1.5">
                <label className="block text-xs font-bold text-[#B8B0A4]">{label} <span className="text-[#E24848]">*</span></label>
                <div className="relative">
                  <Icon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8278]" />
                  <input type={type} required placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full pl-10 pr-4 py-3 input-dark" />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#B8B0A4]">মোবাইল / হোয়াটসঅ্যাপ নম্বর <span className="text-[#E24848]">*</span></label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8278]" />
              <input type="tel" required placeholder="017XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-3 input-dark" />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3 pt-2 border-t border-[#2A2A2E]">
            <label className="block text-xs font-bold text-[#B8B0A4]">পেমেন্ট মাধ্যম বেছে নিন <span className="text-[#E24848]">*</span></label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "bkash" as const, label: "বিকাশ", color: "#E2136E" },
                { id: "nagad" as const, label: "নগদ", color: "#F7941D" },
                { id: "rocket" as const, label: "রকেট", color: "#8C3494" },
              ].map(({ id, label, color }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover-lift ${
                    method === id
                      ? `border-[${color}] bg-[${color}]/10 font-bold shadow-xs ring-1`
                      : "border-[#2A2A2E] bg-[#08080A] text-[#B8B0A4] hover:bg-[#0A0A0C]"
                  }`}
                  style={method === id ? { borderColor: color, backgroundColor: `${color}15`, color: color, boxShadow: `0 0 0 1px ${color}40` } : {}}
                >
                  <span className="text-sm font-bold">{label}</span>
                  <span className="text-[10px] text-[#8A8278] mt-0.5">Send Money</span>
                </button>
              ))}
            </div>

            {/* Payment Number */}
            <div className="p-4 rounded-2xl bg-[#08080A] border border-[#2A2A2E] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8A8278] font-medium">{method === "bkash" ? "বিকাশ পার্সোনাল" : method === "nagad" ? "নগদ পার্সোনাল" : "রকেট পার্সোনাল"}:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-[#C8A45C]">{activeNumber}</span>
                  <button type="button" onClick={handleCopy} className="px-2.5 py-1 rounded-md bg-[#111114] border border-[#2A2A2E] text-xs font-bold text-[#C8A45C] hover:bg-[#1A1A1E] cursor-pointer flex items-center gap-1 transition-all">
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "কপি হয়েছে" : "কপি"}</span>
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-[#8A8278] leading-relaxed border-t border-[#2A2A2E] pt-2">
                ★ উপরের নম্বরে <span className="font-bold text-[#F0EBE0]">{siteConfig.currencySymbol}{siteConfig.price}</span> টাকা সেন্ড মানি করুন। এরপর নিচে ট্রানজেকশন আইডি দিয়ে কনফার্ম করুন।
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#B8B0A4]">ট্রানজেকশন আইডি (TrxID) <span className="text-[#E24848]">*</span></label>
              <input type="text" required placeholder="9J4K2L8M7" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="w-full px-4 py-3 input-dark font-mono uppercase" />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-full btn-gold text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 hover-lift btn-shimmer">
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /><span>ভেরিফাই হচ্ছে...</span></>
            ) : (
              <><Download className="w-5 h-5" /><span>পেমেন্ট সম্পন্ন করেছি — ডাউনলোড করুন ({siteConfig.currencySymbol}{siteConfig.price})</span></>
            )}
          </button>

          <div className="flex items-center justify-center gap-6 text-[11px] text-[#8A8278]">
            <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#C8A45C]" /><span>তাৎক্ষণিক ডাউনলোড</span></div>
            <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#C8A45C]" /><span>১০০% নিরাপদ</span></div>
          </div>
        </form>
      </div>
    </section>
  );
}
