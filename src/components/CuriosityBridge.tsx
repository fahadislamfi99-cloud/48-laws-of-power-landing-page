"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface CuriosityBridgeProps {
  onOpenOrderModal: () => void;
}

export default function CuriosityBridge({ onOpenOrderModal }: CuriosityBridgeProps) {
  const pillars = [
    {
      num: "০১",
      title: "ক্ষমতা ও আধিপত্য",
      desc: "কীভাবে অন্যের ইচ্ছার ওপর নির্ভরশীল না হয়ে নিজের নিয়ন্ত্রণ প্রতিষ্ঠা করবেন।",
    },
    {
      num: "০২",
      title: "রণকৌশল ও দূরদর্শিতা",
      desc: "কোনো সংঘাত বা প্রতিযোগিতায় কয়েক কদম আগে থেকে হিসেব করে সিদ্ধান্ত নেওয়ার নিয়ম।",
    },
    {
      num: "০৩",
      title: "সুনাম ও আত্মরক্ষা",
      desc: "সুনামকে কীভাবে একটি দুর্ভেদ্য বর্মের মতো রক্ষা করবেন যাতে কেউ আঘাত করতে না পারে।",
    },
    {
      num: "০৪",
      title: "কৌশলী বার্তালাপ",
      desc: "কখন কথা বলতে হবে, কখন নীরব থাকতে হবে এবং কীভাবে কথা দিয়ে নিয়ন্ত্রণ রাখবেন।",
    },
    {
      num: "০৫",
      title: "মানব মনস্তত্ত্ব ও ছদ্মবেশ",
      desc: "মানুষের বাহ্যিক মিষ্টি হাসির আড়ালে থাকা প্রকৃত উদ্দেশ্য ও দুর্বলতা চিহ্নিত করার উপায়।",
    },
  ];

  return (
    <section className="py-20 lg:py-28 border-b border-[#E6E0D4] bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8F6B2C] uppercase block">
            THE 48 PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#121316] leading-[1.25]">
            একটি নীতি যদি দৃষ্টিভঙ্গি বদলে দিতে পারে— <br className="hidden sm:inline" />
            তবে পুরো ৪৮টি নীতি কী করতে পারে?
          </h2>
          <p className="text-base sm:text-lg text-[#52555E] leading-relaxed">
            রবার্ট গ্রিনের এই বইটিতে কোনো অলীক তত্ত্ব নেই। প্রতিটি নীতি বাস্তব মানব ইতিহাসের ৩,০০০ বছরের পরীক্ষা-নিরীক্ষা থেকে প্রমাণিত এবং ৫টি মূল স্তরে বিভক্ত:
          </p>
        </div>

        {/* 5 Thematic Pillars (Editorial List format, not generic cards) */}
        <div className="border-t border-[#E6E0D4] divide-y divide-[#E6E0D4]">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline"
            >
              <div className="sm:col-span-2 font-mono text-xs font-bold text-[#8F6B2C]">
                {pillar.num}
              </div>
              <div className="sm:col-span-4 font-bengali-serif font-bold text-lg sm:text-xl text-[#121316]">
                {pillar.title}
              </div>
              <div className="sm:col-span-6 text-sm text-[#52555E] leading-relaxed">
                {pillar.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 pt-8 border-t border-[#E6E0D4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-sm font-semibold text-[#121316]">
            সম্পূর্ণ ৪৮টি নীতি ও বিস্তারিত ঐতিহাসিক বিশ্লেষণ ডিজিটাল PDF-এ সংরক্ষিত।
          </span>
          <a
            href="#digital-preview"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8F6B2C] hover:underline"
          >
            <span>ডিজিটাল প্রিভিউ দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
