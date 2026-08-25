"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import {
  ShoppingBag,
  ArrowDown,
  BookOpen,
  ShieldCheck,
  Truck,
  Crown,
  Zap,
  Swords,
  Brain,
  Sparkles,
} from "lucide-react";

interface HeroProps {
  onOpenOrderModal: () => void;
}

export default function Hero({ onOpenOrderModal }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#FAF6EE] via-[#FAF8F5] to-[#FAF8F5] text-stone-900 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-[#E8DFCF]/80">
      
      {/* Editorial ambient radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E8DCC4]/35 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#E2D4B7]/25 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Editorial Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F3EDE2] border border-[#D8CBB0] text-[#7A5B22] text-xs font-semibold tracking-wider">
              <Crown className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span>{siteConfig.authorEn.toUpperCase()}-এর বিশ্বখ্যাত আন্তর্জাতিক মাস্টারপিস</span>
            </div>

            {/* Main Display Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight leading-[1.06] text-[#121316]">
                <span>The 48</span>{" "}
                <span className="italic font-normal font-serif text-[#9A7730]">
                  Laws of
                </span>{" "}
                <span className="block text-[#121316]">Power</span>
              </h1>
              
              {/* Bengali Subheading */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bengali-serif font-bold text-[#2A2B30] pt-1 leading-snug">
                {siteConfig.bookSubtitle}
              </h2>
            </div>

            {/* Editorial Description */}
            <p className="text-[#555760] text-sm sm:text-base md:text-lg leading-[1.8] max-w-2xl mx-auto lg:mx-0 font-normal">
              মানুষ কেন আপনাকে সম্মান করে, কেন কেউ আপনাকে নিয়ন্ত্রণ করার চেষ্টা করে, কখন কথা বলা উচিত এবং কখন নীরব থাকা বেশি শক্তিশালী — এসব সামাজিক ও পেশাদার বাস্তবতা গভীরভাবে উন্মোচন করবে এই বই।
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenOrderModal}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#18191D] hover:bg-[#272830] text-[#F4EDE0] font-bold text-sm sm:text-base border border-[#C59B4B]/60 shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 text-[#E6C67E] group-hover:scale-110 transition-transform" />
                <span>বইটি সংগ্রহ করুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
              </button>

              <a
                href="#learn-section"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/80 hover:bg-white text-[#2C2D32] font-semibold text-xs sm:text-sm border border-[#D5C9AF] shadow-xs hover:border-[#C59B4B] transition-all duration-200"
              >
                <span>কী শিখবেন দেখুন</span>
                <ArrowDown className="w-4 h-4 text-[#9A7730] animate-bounce" />
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-[#E5DCBE]/80 grid grid-cols-3 gap-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-[#42444C]">
                <div className="w-7 h-7 rounded-full bg-[#F3EDE2] border border-[#D8CBB0] flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5 text-[#8C6B2A]" />
                </div>
                <span className="text-xs sm:text-sm font-medium">বাংলা অনুবাদ</span>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-[#42444C]">
                <div className="w-7 h-7 rounded-full bg-[#F3EDE2] border border-[#D8CBB0] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8C6B2A]" />
                </div>
                <span className="text-xs sm:text-sm font-medium">হার্ডকভার কোয়ালিটি</span>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-[#42444C]">
                <div className="w-7 h-7 rounded-full bg-[#F3EDE2] border border-[#D8CBB0] flex items-center justify-center shrink-0">
                  <Truck className="w-3.5 h-3.5 text-[#8C6B2A]" />
                </div>
                <span className="text-xs sm:text-sm font-medium">সারা দেশে ডেলিভারি</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-End Photorealistic 3D Hardcover Book & Badges */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end gap-5 sm:gap-8">
            
            {/* Realistic Photorealistic Book Showcase */}
            <div className="relative group">
              {/* Subtle ambient halo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#C59B4B]/20 via-[#DFC07A]/10 to-transparent rounded-2xl blur-xl pointer-events-none" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] border border-[#C59B4B]/30 max-w-[280px] sm:max-w-[340px] transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/images/book-mockup.jpg"
                  alt="The 48 Laws of Power বাংলা অনুবাদ সংস্করণ"
                  className="w-full h-auto object-cover block"
                />
              </div>

              {/* Collector's Edition Tag */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#18191D] border border-[#C59B4B]/60 text-[#E6C67E] text-[10px] font-serif tracking-[0.2em] uppercase font-bold shadow-md whitespace-nowrap">
                Collector&apos;s Edition
              </div>
            </div>

            {/* Vertical Feature Badges */}
            <div className="hidden sm:flex flex-col gap-5 py-4 border-l border-[#DFD5BE] pl-4 lg:pl-6 text-center">
              
              {/* Badge 1: 48 LAWS */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-10 h-10 rounded-full bg-white/90 border border-[#D5C7A8] flex items-center justify-center text-[#8C6B2A] shadow-xs group-hover:border-[#C59B4B] group-hover:scale-105 transition-all">
                  <Crown className="w-4 h-4" />
                </div>
                <span className="text-[9px] tracking-[0.2em] font-serif font-bold text-stone-800 uppercase mt-1.5">
                  48 LAWS
                </span>
              </div>

              {/* Badge 2: POWER */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-10 h-10 rounded-full bg-white/90 border border-[#D5C7A8] flex items-center justify-center text-[#8C6B2A] shadow-xs group-hover:border-[#C59B4B] group-hover:scale-105 transition-all">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[9px] tracking-[0.2em] font-serif font-bold text-stone-800 uppercase mt-1.5">
                  POWER
                </span>
              </div>

              {/* Badge 3: INFLUENCE */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-10 h-10 rounded-full bg-white/90 border border-[#D5C7A8] flex items-center justify-center text-[#8C6B2A] shadow-xs group-hover:border-[#C59B4B] group-hover:scale-105 transition-all">
                  <Swords className="w-4 h-4" />
                </div>
                <span className="text-[9px] tracking-[0.2em] font-serif font-bold text-stone-800 uppercase mt-1.5">
                  INFLUENCE
                </span>
              </div>

              {/* Badge 4: HUMAN PSYCHOLOGY */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-10 h-10 rounded-full bg-white/90 border border-[#D5C7A8] flex items-center justify-center text-[#8C6B2A] shadow-xs group-hover:border-[#C59B4B] group-hover:scale-105 transition-all">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="text-[8px] tracking-wider font-serif font-bold text-stone-800 uppercase mt-1.5 text-center leading-tight max-w-[65px]">
                  PSYCHOLOGY
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
