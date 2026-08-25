"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { Download, ArrowDown, Sparkles, Smartphone, Search, FileText } from "lucide-react";

interface HeroProps {
  onOpenOrderModal: () => void;
}

export default function Hero({ onOpenOrderModal }: HeroProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-[#E4DED3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#E4DED3] text-xs font-mono text-[#7A7C85]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-[#121316]">সম্পূর্ণ বাংলা ডিজিটাল সংস্করণ</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>লেখক: রবার্ট গ্রিন</span>
            <span>•</span>
            <span>পৃষ্ঠা: ৪৫২</span>
            <span>•</span>
            <span>ফরম্যাট: ইন্টারেক্টিভ PDF</span>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Thesis & Statement */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8E6A2F] uppercase block">
                ANATOMY OF HUMAN INFLUENCE
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial-serif font-black tracking-tight text-[#111215] leading-[1.05]">
                The 48 Laws <br />
                <span className="italic font-normal text-[#8E6A2F]">of Power</span>
              </h1>
              <p className="text-xl sm:text-2xl font-editorial-bengali-serif font-semibold text-[#2C2D32] leading-snug pt-2">
                ক্ষমতা কোনো অলৌকিক বিষয় নয়—এটি মানব আচরণ ও সামাজিক মনস্তত্ত্বের একটি বাস্তবসম্মত খেলা।
              </p>
            </div>

            {/* Editorial Thesis Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[#4A4D55] leading-relaxed pt-2">
              <p>
                ইতিহাসের ৩,০০০ বছরের কূটনীতি, যুদ্ধ, রাজদরবার ও বাস্তব জীবনের শিক্ষা থেকে রবার্ট গ্রিন সংকলন করেছেন ক্ষমতার ৪৮টি অমোঘ নীতি।
              </p>
              <p>
                কীভাবে অন্যের গোপন উদ্দেশ্য বুঝবেন, কর্মক্ষেত্রে নিজের অবস্থান সুরক্ষিত রাখবেন এবং প্রভাব তৈরি করবেন—এই বইতে রয়েছে তার গভীর বিশ্লেষণ।
              </p>
            </div>

            {/* CTA & Metrics */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenOrderModal}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#111215] hover:bg-[#25272E] text-[#F7F5EE] font-bold text-sm sm:text-base transition-all cursor-pointer shadow-md active:scale-98"
              >
                <Download className="w-4 h-4 text-[#DFC07A]" />
                <span>পিডিএফ ডাউনলোড করুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
              </button>

              <a
                href="#interactive-reader"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-[#FAF8F5] text-[#121316] font-semibold text-xs sm:text-sm border border-[#D5CDBE] transition-all"
              >
                <span>বইটি পড়ে দেখুন</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Digital Highlights */}
            <div className="pt-4 flex flex-wrap gap-4 text-xs font-medium text-[#4A4D55]">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#E4DED3]">
                <Smartphone className="w-3.5 h-3.5 text-[#8E6A2F]" />
                মোবাইল ও ট্যাবলেটে পড়ার উপযোগী
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#E4DED3]">
                <Search className="w-3.5 h-3.5 text-[#8E6A2F]" />
                সার্চেবল টেক্সট ও ক্লিকযোগ্য সূচি
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#E4DED3]">
                <FileText className="w-3.5 h-3.5 text-[#8E6A2F]" />
                তাৎক্ষণিক ডাউনলোড ও লাইফটাইম অ্যাক্সেস
              </span>
            </div>

          </div>

          {/* Right Column: Multi-Device Digital Mockup Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative max-w-[340px] sm:max-w-[400px] w-full group">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#D5CDBE] bg-white transition-transform duration-500 group-hover:scale-[1.01]">
                <img
                  src="/images/digital-mockup.jpg"
                  alt="The 48 Laws of Power বাংলা ডিজিটাল PDF সংস্করণ - ট্যাবলেট ও মোবাইল ভিউ"
                  className="w-full h-auto object-cover block"
                />
              </div>

              {/* Minimalist Footnote Plaque */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#7A7C85] px-1">
                <span>DIGITAL EDITION • 36 MB</span>
                <span>SEARCHABLE • BOOKMARKED</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
