"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { Download, ArrowDown, Smartphone, Search, FileText, Sparkles } from "lucide-react";

interface EditorialHeroProps {
  onOpenOrderModal: () => void;
}

export default function EditorialHero({ onOpenOrderModal }: EditorialHeroProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#E6E0D4] overflow-hidden">
      {/* Subtle ambient gradient glow in background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#8F6B2C]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#121316]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Publication Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E6E0D4] text-xs font-mono text-[#737680] animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-semibold text-[#121316]">সম্পূর্ণ বাংলা ডিজিটাল সংস্করণ • PDF ই-বুক</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>মূল রচয়িতা: রবার্ট গ্রিন</span>
            <span>•</span>
            <span>৪৫২ পৃষ্ঠা</span>
            <span>•</span>
            <span>ইন্টারেক্টিভ সার্চেবল টেক্সট</span>
          </div>
        </div>

        {/* Hero Grid with Enlarged Image Showcase */}
        <div className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Typography & Story Hook */}
          <div className="lg:col-span-7 space-y-7">
            
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8F6B2C] uppercase block animate-fadeInUp [animation-delay:100ms]">
                ROBERT GREENE’S DEFINITIVE MASTERWORK
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-[#121316] leading-[1.05] animate-fadeInUp [animation-delay:200ms]">
                The 48 Laws <br />
                <span className="italic font-normal font-editorial-serif text-[#8F6B2C] transition-colors duration-300 hover:text-[#6E511D]">
                  of Power
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bengali-serif font-bold text-[#2C2D32] leading-snug pt-1 animate-fadeInUp [animation-delay:300ms]">
                {siteConfig.bookSubtitle}
              </h2>
            </div>

            {/* Editorial Lead Paragraph */}
            <p className="text-[#42454D] text-base sm:text-lg leading-[1.8] font-normal animate-fadeInUp [animation-delay:400ms]">
              সমাজ প্রকাশ্যে ন্যায় ও নিয়মের কথা বলে, কিন্তু বাস্তবে মানুষের সম্পর্ক ও পেশাদার জগৎ পরিচালিত হয় মনস্তত্ত্ব এবং ক্ষমতার এক অদৃশ্য খেলায়। ৩,০০০ বছরের ঐতিহাসিক অভিজ্ঞতা থেকে সংকলিত এই ৪৮টি নীতি আপনাকে শেখাবে কীভাবে অন্যের আসল উদ্দেশ্য বুঝবেন এবং নিজেকে নিরাপদ রেখে প্রভাবশালী হয়ে উঠবেন।
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fadeInUp [animation-delay:500ms]">
              <button
                onClick={onOpenOrderModal}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#121316] hover:bg-[#25272F] text-[#FAF8F5] font-bold text-sm sm:text-base transition-all cursor-pointer shadow-md active-lift hover-lift btn-shimmer group"
              >
                <Download className="w-4 h-4 text-[#DFC07A] transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>ডিজিটাল কপি কিনুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
              </button>

              <a
                href="#deep-dive"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-[#FAF8F5] text-[#121316] font-semibold text-xs sm:text-sm border border-[#D8D0C3] transition-all hover-lift active-lift group"
              >
                <span>একটি নীতি পড়ে দেখুন</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8F6B2C] transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>

            {/* Digital Specs Bar */}
            <div className="pt-4 border-t border-[#E6E0D4] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#52555E] font-medium animate-fadeInUp [animation-delay:600ms]">
              <div className="flex items-center gap-2 p-2 rounded-xl transition-colors hover:bg-white/60">
                <Smartphone className="w-4 h-4 text-[#8F6B2C] shrink-0" />
                <span>ফোন, ট্যাবলেট ও পিসিতে পড়ার উপযোগী</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl transition-colors hover:bg-white/60">
                <Search className="w-4 h-4 text-[#8F6B2C] shrink-0" />
                <span>সার্চেবল টেক্সট ও ক্লিকযোগ্য সূচি</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl transition-colors hover:bg-white/60">
                <FileText className="w-4 h-4 text-[#8F6B2C] shrink-0" />
                <span>তাৎক্ষণিক ডাউনলোড ও লাইফটাইম অ্যাক্সেস</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Enlarged Digital Device Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end animate-scaleIn [animation-delay:300ms]">
            <div className="relative max-w-[360px] sm:max-w-[440px] lg:max-w-[470px] w-full group">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#D8D0C3] bg-[#121316] transition-all duration-500 group-hover:shadow-[0_25px_60px_-15px_rgba(143,107,44,0.2)] group-hover:-translate-y-1">
                <img
                  src="/images/digital-mockup.jpg"
                  alt="The 48 Laws of Power বাংলা ডিজিটাল PDF সংস্করণ - ট্যাবলেট ও স্মার্টফোন ভিউ"
                  className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-102"
                />
              </div>

              {/* Minimalist Caption */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#737680] px-2 transition-colors group-hover:text-[#121316]">
                <span>DIGITAL PDF • 36 MB</span>
                <span>452 PAGES • FULL BANGLA EDITION</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
