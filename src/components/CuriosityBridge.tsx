"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CuriosityBridgeProps {
  onOpenOrderModal: () => void;
}

export default function CuriosityBridge({ onOpenOrderModal }: CuriosityBridgeProps) {
  const containerRef = useScrollReveal<HTMLElement>();

  const pillars = [
    { num: "০১", title: "ক্ষমতা ও আধিপত্য", desc: "কীভাবে অন্যের ইচ্ছার ওপর নির্ভরশীল না হয়ে নিজের নিয়ন্ত্রণ প্রতিষ্ঠা করবেন।" },
    { num: "০২", title: "রণকৌশল ও দূরদর্শিতা", desc: "কোনো সংঘাত বা প্রতিযোগিতায় কয়েক কদম আগে থেকে হিসেব করে সিদ্ধান্ত নেওয়ার নিয়ম।" },
    { num: "০৩", title: "সুনাম ও আত্মরক্ষা", desc: "সুনামকে কীভাবে একটি দুর্ভেদ্য বর্মের মতো রক্ষা করবেন যাতে কেউ আঘাত করতে না পারে।" },
    { num: "০৪", title: "কৌশলী বার্তালাপ", desc: "কখন কথা বলতে হবে, কখন নীরব থাকতে হবে এবং কীভাবে কথা দিয়ে নিয়ন্ত্রণ রাখবেন।" },
    { num: "০৫", title: "মানব মনস্তত্ত্ব ও ছদ্মবেশ", desc: "মানুষের বাহ্যিক মিষ্টি হাসির আড়ালে থাকা প্রকৃত উদ্দেশ্য ও দুর্বলতা চিহ্নিত করার উপায়।" },
  ];

  return (
    <section ref={containerRef} className="py-14 lg:py-20 bg-[#08080A] border-t border-[#26262A] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-2.5 sm:space-y-3 mb-8 sm:mb-10 reveal">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/25 text-[#C8A45C] font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-xs">
            <span>THE 48 PRINCIPLES</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F0EBE0] leading-[1.25]">
            একটি নীতি যদি দৃষ্টিভঙ্গি বদলে দিতে পারে, <br className="hidden sm:inline" />
            তবে পুরো ৪৮টি নীতি কী করতে পারে?
          </h2>
          <p className="text-base sm:text-lg text-[#B8B0A4] leading-relaxed">
            রবার্ট গ্রিনের এই বইটিতে কোনো অলীক তত্ত্ব নেই। প্রতিটি নীতি বাস্তব মানব ইতিহাসের ৩,০০০ বছরের পরীক্ষা-নিরীক্ষা থেকে প্রমাণিত এবং ৫টি মূল স্তরে বিভক্ত:
          </p>
        </div>

        {/* Pillars List */}
        <div className="border-t border-[#2A2A2E] divide-y divide-[#2A2A2E]">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`reveal reveal-left reveal-stagger-${Math.min(idx + 1, 5)} py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline px-3 sm:px-4 rounded-xl transition-all duration-300 hover:bg-[#111114] md:hover:translate-x-1 group cursor-default`}
            >
              <div className="sm:col-span-2 font-mono text-xs font-bold text-[#C8A45C] group-hover:text-[#D4AF6E] transition-colors">
                {pillar.num}
              </div>
              <div className="sm:col-span-4 font-bengali-serif font-bold text-lg sm:text-xl text-[#F0EBE0] group-hover:text-[#C8A45C] transition-colors">
                {pillar.title}
              </div>
              <div className="sm:col-span-6 text-sm text-[#B8B0A4] leading-relaxed">
                {pillar.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Action */}
        <div className="reveal reveal-stagger-5 mt-8 pt-6 border-t border-[#2A2A2E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-sm font-semibold text-[#B8B0A4]">
            সম্পূর্ণ ৪৮টি নীতি ও বিস্তারিত ঐতিহাসিক বিশ্লেষণ ডিজিটাল PDF-এ সংরক্ষিত।
          </span>
          <a
            href="#sample-preview"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C8A45C] hover:text-[#D4AF6E] transition-colors group cursor-pointer"
          >
            <span>স্যাম্পল পৃষ্ঠা পড়ে দেখুন</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
