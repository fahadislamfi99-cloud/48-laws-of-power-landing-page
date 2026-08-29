"use client";

import React, { useState } from "react";
import { Play, Download, Sparkles, CheckCircle2, ShieldCheck, BookOpen, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface VideoLessonSectionProps {
  onOpenOrderModal: () => void;
}

export default function VideoLessonSection({ onOpenOrderModal }: VideoLessonSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState(
    "https://img.youtube.com/vi/4lUF8Kqq7P4/maxresdefault.jpg"
  );

  const takeaways = [
    {
      label: "মূল শিক্ষা ১",
      title: "সুপিরিয়রের নিরাপত্তাহীনতা",
      desc: "ক্ষমতায় থাকা ব্যক্তিরা নিজেদের অবস্থান নিয়ে সবসময় অবচেতনভাবে শঙ্কিত থাকেন। তাদের অহংয়ে আঘাত করলে বিপদ অবধারিত।",
    },
    {
      label: "মূল শিক্ষা ২",
      title: "অতিরিক্ত প্রতিভার ঝুঁকি",
      desc: "অপ্রয়োজনে নিজের অতিরিক্ত মেধা জাহির করলে প্রশংসার বদলে তাদের মনে ঈর্ষা ও ভীতি তৈরি হয়, যা গোপনে আপনার ক্ষতি করে।",
    },
    {
      label: "মূল শিক্ষা ৩",
      title: "কৌশলী বিনয়ের ক্ষমতা",
      desc: "সুপিরিয়রকে সবসময় আলোকিত ও গুরুত্বপূর্ণ অনুভব করান। এতে তাদের নিয়ন্ত্রণ অক্ষত থাকে এবং আপনার লক্ষ্য অর্জন সহজ হয়।",
    },
  ];

  return (
    <section
      id="video-lesson"
      className="py-10 sm:py-14 lg:py-20 bg-[#0A0A0E] border-t border-[#26262A] relative overflow-hidden"
    >
      {/* Background ambient gold orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C8A45C]/[0.035] rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── 1. SECTION HEADER ───────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-10">
          <div className="sr-eyebrow flex items-center justify-center gap-2 sm:gap-3">
            <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/25 text-[#C8A45C] font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase">
              <Play className="w-2.5 h-2.5 text-[#C8A45C] fill-[#C8A45C] shrink-0" />
              <span>একটি POWER LESSON • VIDEO ANALYSIS</span>
            </div>
            <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
          </div>

          <h2 className="sr-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F0EBE0] leading-[1.25]">
            প্রথম Law থেকে কিছু শিখুন: <br className="hidden sm:inline" />
            <span className="text-[#C8A45C]">“সুপিরিয়রের অহং ও ক্ষমতার খেলা”</span>
          </h2>

          <p className="sr-desc text-[#C4BCB0] text-xs sm:text-base lg:text-lg leading-[1.75] sm:leading-[1.8] max-w-2xl mx-auto">
            বইটি সংগ্রহ করার আগেই এর ব্যবহারিক গভীরতা পরখ করে নিন। রবার্ট গ্রিনের প্রথম এবং সবচেয়ে গুরুত্বপূর্ণ নীতি—<span className="text-[#F0EBE0] font-semibold">‘Never Outshine the Master’</span> এর সারমর্ম এই ভিডিও বিশ্লেষণে সুন্দরভাবে ব্যাখ্যা করা হয়েছে।
          </p>
        </div>

        {/* ─── 2. PREMIUM VIDEO PLAYER CONTAINER ────────────────── */}
        <div className="sr-scale relative max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-[#2A2A30] bg-[#111115] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-2 sm:p-3 hover:border-[#C8A45C]/40 transition-all duration-500 group">
          
          {/* Subtle top rim flare */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#C8A45C]/50 to-transparent pointer-events-none" />

          <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#070709]">
            {isPlaying ? (
              <iframe
                src="https://www.youtube-nocookie.com/embed/4lUF8Kqq7P4?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="The 48 Laws of Power - Law 01 Lesson Analysis"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full absolute inset-0 border-0"
              />
            ) : (
              <div
                onClick={() => setIsPlaying(true)}
                className="relative w-full h-full cursor-pointer group/thumb select-none overflow-hidden"
              >
                {/* Video Thumbnail with Fallback */}
                <img
                  src={thumbnailSrc}
                  alt="The 48 Laws of Power Law 1 Video Breakdown"
                  width={800}
                  height={450}
                  onError={() =>
                    setThumbnailSrc("https://img.youtube.com/vi/4lUF8Kqq7P4/hqdefault.jpg")
                  }
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-105"
                />

                {/* Dark Vignette & Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/40 to-transparent" />
                <div className="absolute inset-0 bg-[#08080A]/20 group-hover/thumb:bg-transparent transition-colors duration-500" />

                {/* Top Corner Badge */}
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10">
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#08080A]/85 border border-[#C8A45C]/35 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold text-[#C8A45C] shadow-lg">
                    <Sparkles className="w-3 h-3 text-[#C8A45C]" />
                    <span>LAW 01 • MASTER ANALYSIS</span>
                  </div>
                </div>

                {/* Central Glowing Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 z-10">
                  <div className="relative flex items-center justify-center">
                    {/* Ping Ripple */}
                    <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C8A45C]/30 animate-ping pointer-events-none" />
                    
                    {/* Play Button Disc */}
                    <div className="relative w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#E0C078] via-[#C8A45C] to-[#8B6914] text-[#08080A] flex items-center justify-center shadow-[0_0_35px_rgba(200,164,92,0.5)] group-hover/thumb:scale-110 group-hover/thumb:shadow-[0_0_50px_rgba(200,164,92,0.7)] transition-all duration-300">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-[#08080A] translate-x-0.5" />
                    </div>
                  </div>

                  <span className="text-[11px] sm:text-xs font-bold text-[#F0EBE0] tracking-wider uppercase bg-[#0A0A0E]/80 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
                    ভিডিও লেসন চালু করুন (Play Lesson)
                  </span>
                </div>

                {/* Bottom info strip */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 z-10 flex items-center justify-between text-[11px] sm:text-xs text-[#D1C9BC]">
                  <span className="font-semibold text-white/90 truncate pr-2">
                    ল নাম্বার ১: কখনোই বসের চেয়ে বেশি উজ্জ্বল হতে যাবেন না
                  </span>
                  <span className="font-mono text-[#C8A45C] font-bold shrink-0 bg-[#08080A]/80 px-2 py-0.5 rounded border border-[#2A2A2E]">
                    HD Video
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── 3. THREE KEY TAKEAWAYS CARDS ────────────────────── */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {takeaways.map((item, idx) => (
            <div
              key={idx}
              className="sr-card p-3.5 sm:p-5 rounded-2xl bg-[#111115] border border-[#26262A] hover:border-[#C8A45C]/35 transition-all duration-300 space-y-1.5 sm:space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
                <span className="font-mono font-bold text-[#C8A45C] uppercase tracking-wider bg-[#C8A45C]/10 px-2 py-0.5 rounded border border-[#C8A45C]/20">
                  {item.label}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <h3 className="font-bengali-serif font-bold text-sm sm:text-base text-[#F0EBE0] leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#A8A095] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ─── 4. SUBTLE EDITORIAL CTA CALLOUT ─────────────────── */}
        <div className="sr-fade-up mt-6 sm:mt-10 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#141419] via-[#101014] to-[#141419] border border-[#2A2A30] hover:border-[#C8A45C]/35 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 transition-all duration-500 shadow-xl">
          
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <BookOpen className="w-4 h-4 text-[#C8A45C]" />
              <span className="font-bengali-serif font-bold text-base sm:text-lg text-[#F0EBE0]">
                এটি শুধু ১ম সূত্রের একটি ধারণা
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A8A095] max-w-xl leading-relaxed">
              বইটিতে এমন আরও ৪৭টি অমোঘ রণকৌশল, ঐতিহাসিক দৃষ্টান্ত ও বিস্তারিত মনস্তাত্ত্বিক ব্যাখ্যা রয়েছে—যা ৫০৯ পৃষ্ঠার সম্পূর্ণ বাংলা ডিজিটাল PDF সংস্করণে সংকলিত।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full btn-gold text-xs sm:text-sm font-bold cursor-pointer hover-lift btn-shimmer shadow-lg whitespace-nowrap min-h-[44px]"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>পুরো বইটি সংগ্রহ করুন ({siteConfig.currencySymbol}{siteConfig.price})</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
