"use client";

import React from "react";
import { ShieldCheck, RotateCcw, Lock, HeartHandshake } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#8C6B2A]" />,
      text: "১০০% অরিজিনাল বাংলা সংস্করণ",
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-[#8C6B2A]" />,
      text: "৭ দিনের সহজ রিপ্লেসমেন্ট সুবিধা",
    },
    {
      icon: <Lock className="w-5 h-5 text-[#8C6B2A]" />,
      text: "ক্যাশ অন ডেলিভারি (নিরাপদ পেমেন্ট)",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#8C6B2A]" />,
      text: "হাজারো সচেতন পাঠকের আস্থা",
    },
  ];

  return (
    <div className="bg-[#F5EFE4] border-y border-[#E2D5BA] py-5 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-3 text-[#2C2D32] font-semibold text-xs sm:text-sm text-center"
            >
              <div className="w-9 h-9 rounded-full bg-white border border-[#DFCFA8] flex items-center justify-center shrink-0 shadow-2xs">
                {b.icon}
              </div>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
