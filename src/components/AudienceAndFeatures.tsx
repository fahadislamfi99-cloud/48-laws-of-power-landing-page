"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import {
  CheckCircle2,
  BookOpen,
  FileText,
  Type,
  Bookmark,
  Package,
  Truck,
  ShoppingBag,
  Clock,
  ShieldCheck,
  Banknote,
  Sparkles,
} from "lucide-react";

interface AudienceAndFeaturesProps {
  onOpenOrderModal: () => void;
}

export default function AudienceAndFeatures({
  onOpenOrderModal,
}: AudienceAndFeaturesProps) {
  const audiencePoints = [
    "যারা মানুষের আসল আচরণ ও মনস্তত্ত্ব বুঝতে চান",
    "যারা কর্মক্ষেত্রে কূটকৌশল ও ক্ষমতার রাজনীতি থেকে বাঁচতে চান",
    "যারা ব্যবসা, ক্যারিয়ার বা ব্যক্তিগত জীবনে নেতৃত্ব গড়ে তুলতে চান",
    "যারা বাস্তব পৃথিবীর ক্ষমতার খেলার নিয়ম ও কৌশল জানতে চান",
    "যারা নিজেকে আরও বুদ্ধিমান, দূরদর্শী ও কৌশলী করতে চান",
  ];

  const bookFeatures = [
    {
      icon: <BookOpen className="w-4 h-4 text-[#8C6B2A]" />,
      text: "বাংলা অনুবাদ (সহজ, প্রাঞ্জল ও সাবলীল ভাষা)",
    },
    {
      icon: <FileText className="w-4 h-4 text-[#8C6B2A]" />,
      text: "প্রিমিয়াম কোয়ালিটি পেপার (80 GSM ক্রিম)",
    },
    {
      icon: <Type className="w-4 h-4 text-[#8C6B2A]" />,
      text: "বড়, স্পষ্ট ও চোখের জন্য আরামদায়ক টাইপোগ্রাফি",
    },
    {
      icon: <Bookmark className="w-4 h-4 text-[#8C6B2A]" />,
      text: "মজবুত দীর্ঘস্থায়ী হার্ডকভার বাইন্ডিং",
    },
    {
      icon: <Package className="w-4 h-4 text-[#8C6B2A]" />,
      text: "সহজে বহনযোগ্য রয়্যাল সাইজ এডিশন",
    },
    {
      icon: <Truck className="w-4 h-4 text-[#8C6B2A]" />,
      text: "সারা দেশে দ্রুততম ক্যাশ অন ডেলিভারি",
    },
  ];

  return (
    <section className="relative bg-[#FAF8F5] text-stone-900 py-16 sm:py-24 border-b border-[#E8DFCF]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Core Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: এই বইটি কার জন্য? (Deep Velvet Obsidian Card) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#1A1B20] via-[#141518] to-[#0E0F11] text-white p-7 sm:p-8 flex flex-col justify-between border border-[#C59B4B]/40 shadow-xl overflow-hidden min-h-[460px]">
            {/* Ambient inner gold glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C59B4B]/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-serif font-bold uppercase tracking-[0.2em] text-[#E6C67E] mb-2">
                <Sparkles className="w-3 h-3 text-[#C59B4B]" />
                <span>TARGET AUDIENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#F5EFE4] mb-6">
                এই বইটি কার জন্য?
              </h3>

              <div className="space-y-4">
                {audiencePoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#C59B4B]/20 border border-[#C59B4B]/60 flex items-center justify-center shrink-0 text-[#E6C67E]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Silhouette Illustration of Person at Arched Light Portal */}
            <div className="relative pt-6 mt-4 flex items-center justify-center">
              <div className="relative w-36 h-28 flex items-end justify-center">
                {/* Glowing Arch */}
                <div className="absolute bottom-0 w-24 h-24 bg-gradient-to-t from-[#C59B4B]/40 via-[#E0C078]/20 to-transparent rounded-t-full" />
                <div className="absolute bottom-0 w-20 h-20 bg-[#F5EFE4]/60 rounded-t-full" />
                
                {/* Light Ray on Floor */}
                <div className="absolute bottom-0 w-32 h-4 bg-[#C59B4B]/30 blur-xs rounded-full" />

                {/* Walking Silhouette SVG */}
                <svg
                  className="w-10 h-16 relative z-10 text-[#0E0F11]"
                  viewBox="0 0 24 36"
                  fill="currentColor"
                >
                  <circle cx="12" cy="5" r="3.5" />
                  <path d="M9 10h6c1.1 0 2 .9 2 2v8h-2v14h-3v-10h-1v10H8V20H6v-8c0-1.1.9-2 2-2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2: বইয়ের বৈশিষ্ট্য (Warm Cream Specs Card) */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between border border-[#E5DCBE] shadow-sm">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-serif font-bold uppercase tracking-[0.2em] text-[#8C6B2A] mb-2">
                <Sparkles className="w-3 h-3 text-[#C59B4B]" />
                <span>BOOK SPECIFICATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#141518] mb-6">
                বইয়ের বৈশিষ্ট্য
              </h3>

              <div className="space-y-4">
                {bookFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-[#FAF6EE] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F5EFE4] border border-[#DFCFA8] flex items-center justify-center shrink-0">
                      {feat.icon}
                    </div>
                    <span className="text-[#32343A] text-xs sm:text-sm font-medium">
                      {feat.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Guarantee Badge */}
            <div className="pt-6 mt-4 border-t border-[#EFE8DA] flex items-center gap-3 text-stone-600 text-xs font-medium">
              <ShieldCheck className="w-5 h-5 text-[#8C6B2A] shrink-0" />
              <span>১০০% অরিজিনাল প্রিন্ট ও প্রিমিয়াম প্যাকিং নিশ্চয়তা</span>
            </div>
          </div>

          {/* Card 3: বইটি কিনুন (Collector's Luxury Pricing Card) */}
          <div className="rounded-3xl bg-gradient-to-b from-[#18191D] via-[#141518] to-[#0E0F11] text-white p-7 sm:p-8 flex flex-col justify-between border border-[#C59B4B]/60 shadow-2xl relative overflow-hidden">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#C59B4B]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center space-y-4">
              <div className="inline-block px-3.5 py-1 rounded-full bg-[#C59B4B]/20 border border-[#C59B4B]/50 text-[#E6C67E] text-[10px] font-serif font-bold uppercase tracking-wider">
                বিশেষ অফার
              </div>

              <h3 className="text-xl font-serif font-bold text-[#F5EFE4]">
                বইটি সংগ্রহ করুন
              </h3>

              {/* Price */}
              <div className="space-y-1 py-1">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl sm:text-5xl font-serif font-black text-[#E6C67E] tracking-tight">
                    {siteConfig.currencySymbol}{siteConfig.price}
                  </span>
                  <span className="text-stone-500 line-through text-lg font-serif">
                    {siteConfig.currencySymbol}{siteConfig.originalPrice}
                  </span>
                </div>
                <p className="text-xs text-[#E6C67E]/90 font-medium">
                  (৩৩% সীমিত সময়ের বিশেষ মূল্যছাড়)
                </p>
              </div>

              {/* Shipping & Payment Badges */}
              <div className="space-y-2 py-2 text-left bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2.5 text-stone-300 text-xs sm:text-sm font-light">
                  <Truck className="w-4 h-4 text-[#E6C67E] shrink-0" />
                  <span>ফ্রি হোম ডেলিভারি (সারা দেশে)</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-300 text-xs sm:text-sm font-light">
                  <Banknote className="w-4 h-4 text-[#E6C67E] shrink-0" />
                  <span>ক্যাশ অন ডেলিভারি (বই পেয়ে টাকা দিন)</span>
                </div>
              </div>
            </div>

            {/* CTA Button & Urgency Note */}
            <div className="space-y-3 pt-4">
              <button
                onClick={onOpenOrderModal}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#C59B4B] via-[#DFC07A] to-[#C59B4B] hover:from-[#DFC07A] hover:to-[#C59B4B] text-[#121316] font-bold text-sm sm:text-base shadow-[0_4px_20px_rgba(197,155,75,0.4)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.4]" />
                <span>বইটি কিনুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-stone-400 text-[11px] font-medium">
                <Clock className="w-3.5 h-3.5 text-[#E6C67E]" />
                <span>সীমিত সময়ের অফার আজই অর্ডার করুন!</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
