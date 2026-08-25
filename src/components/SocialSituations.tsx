"use client";

import React from "react";
import {
  Briefcase,
  Users2,
  TrendingUp,
  Crown,
  UserCheck2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function SocialSituations() {
  const situations = [
    {
      category: "Workplace",
      categoryBn: "কর্মক্ষেত্রে",
      icon: <Briefcase className="w-5 h-5 text-[#8C6B2A]" />,
      situation: "“আপনার idea ভালো হলেও credit অন্য কেউ নিজের নামে নিয়ে গেল।”",
    },
    {
      category: "Friendship",
      categoryBn: "বন্ধুত্বে",
      icon: <Users2 className="w-5 h-5 text-[#8C6B2A]" />,
      situation: "“কেউ আপনার সামনে খুব ভালো, কিন্তু আপনার অনুপস্থিতিতে আপনার reputation নষ্ট করছে।”",
    },
    {
      category: "Negotiation",
      categoryBn: "সমঝোতা ও ব্যবসায়ে",
      icon: <TrendingUp className="w-5 h-5 text-[#8C6B2A]" />,
      situation: "“কেউ negotiation বা চুক্তির সময় বারবার আপনাকে অন্যায্য মানসিক চাপে ফেলছে।”",
    },
    {
      category: "Leadership",
      categoryBn: "নেতৃত্বে",
      icon: <Crown className="w-5 h-5 text-[#8C6B2A]" />,
      situation: "“আপনি ভালো লিডার হতে চান, কিন্তু আশপাশের মানুষ আপনাকে seriously নিচ্ছে না।”",
    },
    {
      category: "Social Reality",
      categoryBn: "সামাজিক জীবনে",
      icon: <UserCheck2 className="w-5 h-5 text-[#8C6B2A]" />,
      situation: "“কেউ আপনার দুর্বল জায়গাগুলো ঠিকই বুঝে বারবার সেগুলো নিজের সুবিধায় ব্যবহার করছে।”",
    },
  ];

  return (
    <section className="relative bg-[#F5EFE4] text-stone-900 py-20 lg:py-28 border-b border-[#E2D5BA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8C6B2A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>দৈনন্দিন জীবনের বাস্তবতা</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#16171A] leading-[1.25]">
            বাস্তব জীবনে আপনি এই পরিস্থিতিগুলো দেখেছেন
          </h2>
          <p className="text-[#5A5C64] text-sm sm:text-base">
            আমাদের চারপাশে প্রতিনিয়ত ঘটে চলা চেনা অভিজ্ঞতার পেছনের অদৃশ্য চালচিত্র
          </p>
        </div>

        {/* 5 Situation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {situations.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#FAF8F5] border border-[#DFCFA8] shadow-xs hover:shadow-md hover:border-[#C59B4B] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F0E6D2] border border-[#D5C7A8] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#7A5B22] uppercase tracking-wider">
                    {item.category} • {item.categoryBn}
                  </span>
                </div>
                <p className="text-base text-[#1E1F22] font-bengali-serif leading-relaxed italic pt-1">
                  {item.situation}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EAE0CD] text-xs font-semibold text-[#8C6B2A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
                <span>Power dynamics বুঝলে এই পরিস্থিতি সম্পূর্ণ নিয়ন্ত্রণযোগ্য</span>
              </div>
            </div>
          ))}

          {/* 6th Card: Summary Callout */}
          <div className="p-7 rounded-2xl bg-[#18191D] text-white border border-[#C59B4B]/60 shadow-xl flex flex-col justify-center text-center space-y-3">
            <h3 className="text-lg font-serif font-bold text-[#E6C67E]">
              দৃষ্টিভঙ্গি বদলানোর মোক্ষম সময়
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              এই বইটি আপনাকে অন্যকে অন্ধভাবে দোষারোপ করার বদলে যেকোনো জটিল সামাজিক দ্বন্দ্বে নিজের অবস্থান অটুট ও অপ্রতিরোধ্য রাখতে প্রস্তুত করবে।
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
