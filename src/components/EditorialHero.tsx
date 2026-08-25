"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { Download, ArrowDown, Smartphone, Check, Search, FileText } from "lucide-react";

interface EditorialHeroProps {
  onOpenOrderModal: () => void;
}

export default function EditorialHero({ onOpenOrderModal }: EditorialHeroProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#E6E0D4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle / Publication Line */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E6E0D4] text-xs font-mono text-[#737680]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span className="font-semibold text-[#121316]">বাংলা ডিজিটাল সংস্করণ • সম্পূর্ণ PDF কপি</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>মূল রচয়িতা: রবার্ট গ্রিন</span>
            <span>•</span>
            <span>৪৫২ পৃষ্ঠা</span>
            <span>•</span>
            <span>ইন্টারেক্টিভ সূচিপত্র</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography & Story Hook */}
          <div className="lg:col-span-7 space-y-7">
            
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8F6B2C] uppercase block">
                ROBERT GREENE’S DEFINITIVE MASTERWORK
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-[#121316] leading-[1.05]">
                The 48 Laws <br />
                <span className="italic font-normal font-editorial-serif text-[#8F6B2C]">of Power</span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bengali-serif font-bold text-[#2C2D32] leading-snug pt-1">
                {siteConfig.bookSubtitle}
              </h2>
            </div>

            {/* Editorial Lead Paragraph */}
            <p className="text-[#42454D] text-base sm:text-lg leading-[1.8] font-normal">
              সমাজ প্রকাশ্যে ন্যায় ও নিয়মের কথা বলে, কিন্তু বাস্তবে মানুষের সম্পর্ক ও পেশাদার জগৎ পরিচালিত হয় মনস্তত্ত্ব এবং ক্ষমতার এক অদৃশ্য খেলায়। ৩,০০০ বছরের ঐতিহাসিক অভিজ্ঞতা থেকে সংকলিত এই ৪৮টি নীতি আপনাকে শেখাবে কীভাবে অন্যের আসল উদ্দেশ্য বুঝবেন এবং নিজেকে নিরাপদ রেখে প্রভাবশালী হয়ে উঠবেন।
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenOrderModal}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#121316] hover:bg-[#25272F] text-[#FAF8F5] font-bold text-sm sm:text-base transition-all cursor-pointer shadow-sm active:scale-98"
              >
                <Download className="w-4 h-4 text-[#DFC07A]" />
                <span>ডিজিটাল কপি কিনুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
              </button>

              <a
                href="#deep-dive"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-[#FAF8F5] text-[#121316] font-semibold text-xs sm:text-sm border border-[#D8D0C3] transition-all"
              >
                <span>একটি নীতি পড়ে দেখুন</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8F6B2C]" />
              </a>
            </div>

            {/* Digital Specs Bar */}
            <div className="pt-4 border-t border-[#E6E0D4] grid grid-cols-3 gap-4 text-xs text-[#52555E] font-medium">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#8F6B2C] shrink-0" />
                <span>ফোন, ট্যাবলেট ও পিসিতে পড়ার উপযোগী</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#8F6B2C] shrink-0" />
                <span>সার্চেবল টেক্সট ও ক্লিকযোগ্য সূচি</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#8F6B2C] shrink-0" />
                <span>তাৎক্ষণিক ডাউনলোড ও লাইফটাইম অ্যাক্সেস</span>
              </div>
            </div>

          </div>

          {/* Right Column: Digital Devices Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative max-w-[340px] sm:max-w-[390px] w-full">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#D8D0C3] bg-[#121316]">
                <img
                  src="/images/digital-mockup.jpg"
                  alt="The 48 Laws of Power বাংলা ডিজিটাল PDF সংস্করণ - ট্যাবলেট ও স্মার্টফোন ভিউ"
                  className="w-full h-auto object-cover block"
                />
              </div>

              {/* Minimalist Caption */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#737680] px-1">
                <span>DIGITAL PDF • 36 MB</span>
                <span>452 PAGES • FULL BANGLA</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
