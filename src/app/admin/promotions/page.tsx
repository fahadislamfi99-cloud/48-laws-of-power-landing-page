"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles, Tag, Eye, Save, RefreshCw, CheckCircle2,
  Sliders, Image as ImageIcon, Clock, Check, Copy, ArrowRight, ShieldCheck, X
} from "lucide-react";
import ToastNotification, { ToastState } from "@/components/admin/ToastNotification";
import CountdownTimer from "@/components/CountdownTimer";

export default function AdminPromotionsPage() {
  const [formData, setFormData] = useState({
    isEnabled: true,
    badgeText: "বিশেষ অফার 🎁",
    title: "আজই পাচ্ছেন ৳৫০ ছাড়",
    subtitle: "The 48 Laws of Power (বাংলা অনুবাদ)",
    description: "৩,০০০ বছরের মানব মনস্তত্ত্ব ও ক্ষমতার রণকৌশল শিখুন বিশেষ ডিসকাউন্টে। সীমিত সময়ের জন্য অফারটি সক্রিয় রয়েছে।",
    couponCode: "POWER50",
    discountAmount: 50,
    discountType: "fixed",
    ctaText: "অফারটি ব্যবহার করুন",
    offerTag: "৳৫০ OFF",
    imageUrl: "/images/promo-power-strategy.jpg",
    displayDelaySeconds: 4,
    cooldownHours: 24,
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [previewCopied, setPreviewCopied] = useState(false);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/promo-banner");
      const data = await res.json();
      if (res.ok && data.success && data.banner) {
        setFormData({
          isEnabled: data.banner.isEnabled ?? true,
          badgeText: data.banner.badgeText || "বিশেষ অফার 🎁",
          title: data.banner.title || "আজই পাচ্ছেন ৳৫০ ছাড়",
          subtitle: data.banner.subtitle || "The 48 Laws of Power (বাংলা অনুবাদ)",
          description: data.banner.description || "৩,০০০ বছরের মানব মনস্তত্ত্ব ও ক্ষমতার রণকৌশল শিখুন বিশেষ ডিসকাউন্টে।",
          couponCode: data.banner.couponCode || "POWER50",
          discountAmount: data.banner.discountAmount || 50,
          discountType: data.banner.discountType || "fixed",
          ctaText: data.banner.ctaText || "অফারটি ব্যবহার করুন",
          offerTag: data.banner.offerTag || "৳৫০ OFF",
          imageUrl: data.banner.imageUrl || "/images/promo-power-strategy.jpg",
          displayDelaySeconds: data.banner.displayDelaySeconds ?? 4,
          cooldownHours: data.banner.cooldownHours ?? 24,
        });
      }
    } catch {
      showToast("Failed to load promotional settings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/promo-banner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Promotional banner & coupon settings saved successfully!");
      } else {
        showToast(data.message || "Failed to save banner settings", "error");
      }
    } catch {
      showToast("Network error while saving settings", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyPreview = () => {
    setPreviewCopied(true);
    setTimeout(() => setPreviewCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B6914] mb-1">
            <Sparkles className="w-4 h-4 text-[#C8A45C]" />
            Conversion Optimization
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Promotional Popup & Banner Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Control the luxury promotional discount popup, coupon code, and backend discount synchronization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchSettings}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Master Toggle Banner */}
      <div className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        formData.isEnabled
          ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
          : "bg-slate-100 border-slate-200 text-slate-700"
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
            formData.isEnabled ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-300 text-slate-600"
          }`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base">
                Promotional Popup Status: {formData.isEnabled ? "ACTIVE (LIVE ON SITE)" : "DISABLED (HIDDEN)"}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                formData.isEnabled ? "bg-emerald-200 text-emerald-800" : "bg-slate-200 text-slate-600"
              }`}>
                {formData.isEnabled ? "Live" : "Off"}
              </span>
            </div>
            <p className="text-xs opacity-80 mt-0.5">
              {formData.isEnabled
                ? `Visitors will see the popup offering ${formData.offerTag || "discount"} with coupon "${formData.couponCode}".`
                : "The promotional banner is completely turned off and will not appear to any visitors."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setFormData({ ...formData, isEnabled: !formData.isEnabled })}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs cursor-pointer transition-all shadow-xs shrink-0 ${
            formData.isEnabled
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-slate-800 hover:bg-slate-900 text-white"
          }`}
        >
          {formData.isEnabled ? "Turn OFF Banner" : "Turn ON Banner"}
        </button>
      </div>

      {/* Grid: Form Editor (Left) & Real-Time Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Settings */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          
          {/* Coupon & Discount Box */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3.5">
              <Tag className="w-4 h-4 text-[#8B6914]" />
              <h3 className="text-sm font-bold text-slate-900">
                1. Coupon & Discount Configuration
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-xs">
                <label className="block font-bold text-slate-700">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={formData.couponCode}
                  onChange={(e) => setFormData({ ...formData, couponCode: e.target.value.toUpperCase().replace(/\s+/g, "") })}
                  placeholder="e.g. POWER50"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                />
                <p className="text-[11px] text-slate-400">
                  Auto-synced with backend discount validator.
                </p>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="block font-bold text-slate-700">Discount Amount *</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.discountAmount}
                    onChange={(e) => setFormData({ ...formData, discountAmount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                  />
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value as "fixed" | "percentage" })}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-xs outline-none focus:border-slate-900"
                  >
                    <option value="fixed">৳ (BDT)</option>
                    <option value="percentage">% (Percent)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5 text-xs">
                <label className="block font-bold text-slate-700">Offer Tag / Ribbon</label>
                <input
                  type="text"
                  value={formData.offerTag}
                  onChange={(e) => setFormData({ ...formData, offerTag: e.target.value })}
                  placeholder="e.g. ৳৫০ OFF or 10% OFF"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="block font-bold text-slate-700">Top Badge Text</label>
                <input
                  type="text"
                  value={formData.badgeText}
                  onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                  placeholder="e.g. বিশেষ অফার 🎁"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Copywriting & Headings */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3.5">
              <Sliders className="w-4 h-4 text-[#8B6914]" />
              <h3 className="text-sm font-bold text-slate-900">
                2. Headline & Editorial Copy
              </h3>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-slate-700">Offer Headline *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. আজই পাচ্ছেন ৳৫০ ছাড়"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-slate-700">Offer Description *</label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Offer details and value proposition..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 leading-relaxed outline-none focus:border-slate-900 focus:bg-white resize-none"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-slate-700">CTA Button Text *</label>
              <input
                type="text"
                required
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                placeholder="e.g. অফারটি ব্যবহার করুন"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>
          </div>

          {/* Media & Frequency Controls */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3.5">
              <ImageIcon className="w-4 h-4 text-[#8B6914]" />
              <h3 className="text-sm font-bold text-slate-900">
                3. Artwork & Trigger Timing
              </h3>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-slate-700">Promotional Artwork Image URL</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="/images/promo-power-strategy.jpg"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: "Power Strategy Chess (Recommended)", url: "/images/promo-power-strategy.jpg" },
                  { label: "Book Mockup", url: "/images/book-mockup.png" },
                  { label: "Open Book Reader", url: "/images/book-open.jpg" },
                ].map((opt) => (
                  <button
                    key={opt.url}
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: opt.url })}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border cursor-pointer transition-colors ${
                      formData.imageUrl === opt.url
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5 text-xs">
                <label className="block font-bold text-slate-700">Display Trigger Delay (Seconds)</label>
                <input
                  type="number"
                  min={0}
                  max={60}
                  value={formData.displayDelaySeconds}
                  onChange={(e) => setFormData({ ...formData, displayDelaySeconds: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                />
                <p className="text-[11px] text-slate-400">
                  Delay before showing popup after page load (default: 4s).
                </p>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="block font-bold text-slate-700">Dismissal Cooldown (Hours)</label>
                <input
                  type="number"
                  min={1}
                  max={720}
                  value={formData.cooldownHours}
                  onChange={(e) => setFormData({ ...formData, cooldownHours: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                />
                <p className="text-[11px] text-slate-400">
                  Hours to wait before showing popup again if dismissed (default: 24h).
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm cursor-pointer transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save & Update Promotional Banner"}</span>
          </button>
        </form>

        {/* Live Interactive Preview */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Eye className="w-4 h-4 text-[#8B6914]" />
              Live Popup Preview
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Interactive Simulation
            </span>
          </div>

          {/* Luxury Popup Card Preview */}
          <div className="rounded-3xl border border-[#2A2A2E] bg-[#0D0D10] text-[#F0EBE0] overflow-hidden shadow-2xl relative">
            
            {/* Top gold accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />

            {/* Fake Close Button */}
            <div className="absolute top-3 right-3 p-1.5 rounded-full bg-[#1A1A1E]/80 text-[#D1C9BC] border border-[#26262A] z-10">
              <X className="w-4 h-4" />
            </div>

            {/* Preview Image */}
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-black">
              <img
                src={formData.imageUrl || "/images/promo-power-strategy.jpg"}
                alt="Promo artwork preview"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D10] via-[#0D0D10]/40 to-transparent" />
              
              {/* Offer Tag Badge */}
              <div className="absolute bottom-3 left-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#08080A] bg-[#C8A45C] px-3 py-1 rounded-full shadow-md">
                  {formData.offerTag || "৳৫০ OFF"}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 sm:p-6 space-y-4">
              
              {/* Badge & Title */}
              <div className="space-y-1.5">
                <span className="inline-block text-[11px] font-bold text-[#C8A45C] bg-[#C8A45C]/10 px-2.5 py-0.5 rounded-md border border-[#C8A45C]/20">
                  {formData.badgeText || "বিশেষ অফার 🎁"}
                </span>
                <h3 className="text-xl font-bengali-serif font-bold text-[#F0EBE0] leading-snug">
                  {formData.title || "আজই পাচ্ছেন ৳৫০ ছাড়"}
                </h3>
                <p className="text-xs text-[#C4BCB0] leading-relaxed">
                  {formData.description}
                </p>
              </div>

              {/* 2-Day Continuous Loop Luxury Countdown Timer Preview */}
              <div className="pt-1">
                <CountdownTimer variant="luxury-box" label="অফার শেষ হতে বাকি" />
              </div>

              {/* Coupon Box with Copy interaction */}
              <div className="p-3 rounded-2xl bg-[#141418] border border-[#C8A45C]/30 flex items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[#A8A095] tracking-wider block">
                    Coupon Code
                  </span>
                  <span className="font-mono font-extrabold text-sm sm:text-base text-[#C8A45C] tracking-wider">
                    {formData.couponCode || "POWER50"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPreview}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C8A45C]/15 hover:bg-[#C8A45C]/25 text-[#C8A45C] text-xs font-bold transition-all border border-[#C8A45C]/30 cursor-pointer"
                >
                  {previewCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{previewCopied ? "✓ Copied" : "কপি করুন"}</span>
                </button>
              </div>

              {/* CTA Button */}
              <div className="pt-1">
                <button
                  type="button"
                  className="w-full py-3.5 rounded-2xl btn-gold text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>{formData.ctaText || "অফারটি ব্যবহার করুন"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8A8278]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45C]" />
                <span>অফিসিয়াল সিকিউর বিকাশ পেমেন্ট গেটওয়ে</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <span className="font-bold block">💡 Security Guarantee:</span>
            <p className="opacity-90">
              When visitors click the CTA, the coupon is verified server-side. Discount calculations are strictly executed on the server to prevent any client-side tampering.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
