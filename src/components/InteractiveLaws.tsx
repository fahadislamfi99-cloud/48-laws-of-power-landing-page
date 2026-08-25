"use client";

import React, { useState } from "react";
import { allLaws, featuredLawIds } from "@/data/lawsData";
import {
  Crown,
  Smile,
  Eye,
  Shield,
  Swords,
  Waves,
  ArrowRight,
  ChevronDown,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface InteractiveLawsProps {
  onOpenAllLawsModal: () => void;
  onOpenOrderModal: () => void;
}

export default function InteractiveLaws({
  onOpenAllLawsModal,
  onOpenOrderModal,
}: InteractiveLawsProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const featuredLaws = allLaws.filter((law) => featuredLawIds.includes(law.id));

  const getLawIcon = (lawId: number) => {
    switch (lawId) {
      case 1:
        return <Crown className="w-6 h-6 text-[#8C6B2A] stroke-[1.8]" />;
      case 3:
        return <Smile className="w-6 h-6 text-[#8C6B2A] stroke-[1.8]" />;
      case 4:
        return <Eye className="w-6 h-6 text-[#8C6B2A] stroke-[1.8]" />;
      case 5:
        return <Shield className="w-6 h-6 text-[#8C6B2A] stroke-[1.8]" />;
      case 15:
        return <Swords className="w-6 h-6 text-[#8C6B2A] stroke-[1.8]" />;
      case 48:
        return <Waves className="w-6 h-6 text-[#8C6B2A] stroke-[1.8]" />;
      default:
        return <BookOpen className="w-6 h-6 text-[#8C6B2A] stroke-[1.8]" />;
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="laws-section"
      className="relative bg-[#FAF8F5] text-stone-900 py-20 lg:py-28 border-b border-[#E8DFCF]/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8C6B2A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>শিক্ষণীয় নির্বাচিত নীতিসমূহ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#16171A]">
            বইটি থেকে আপনি কী শিখতে পারেন?
          </h2>
          <p className="text-[#5A5C64] text-sm sm:text-base md:text-lg">
            এখানে শুধু কয়েকটি উদাহরণ — পুরো বইয়ে রয়েছে ৪৮টি শক্তিশালী বাস্তবসম্মত নীতি।
          </p>
        </div>

        {/* 6 Law Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {featuredLaws.map((law) => {
            const isExpanded = expandedId === law.id;

            return (
              <div
                key={law.id}
                className={`col-span-1 sm:col-span-1 lg:col-span-1 flex flex-col justify-between p-5 rounded-2xl transition-all duration-300 ${
                  isExpanded
                    ? "bg-[#FFFDF9] border-2 border-[#C59B4B] shadow-lg scale-[1.02]"
                    : "bg-white/90 border border-[#E5DCBE] hover:border-[#C59B4B]/80 hover:bg-[#FFFDF9] hover:shadow-md"
                }`}
              >
                <div>
                  {/* Law Number Badge */}
                  <div className="text-center mb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#F5EFE4] border border-[#D5C7A8] text-[#553E17] text-[10px] font-mono font-bold tracking-wider uppercase">
                      {law.numberStr}
                    </span>
                  </div>

                  {/* Gold Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] border border-[#E2D5BA] flex items-center justify-center mx-auto my-3 shadow-2xs">
                    {getLawIcon(law.id)}
                  </div>

                  {/* English Title */}
                  <h3 className="text-center font-serif font-bold text-[#141518] text-sm sm:text-base leading-snug min-h-[44px] flex items-center justify-center">
                    {law.id === 48 ? "Assume Formless Like Water" : law.titleEn}
                  </h3>

                  {/* Bengali Short Description */}
                  <p className="text-xs text-[#555760] text-center leading-relaxed mt-3 pt-3 border-t border-[#EFE8DA]">
                    {law.shortDescBn}
                  </p>

                  {/* Expanded Detailed Content */}
                  {isExpanded && (
                    <div className="mt-3 p-3 rounded-xl bg-[#FAF6EE] border border-[#DFCFA8] text-xs text-[#32343A] leading-relaxed animate-fadeIn">
                      <p className="font-bold text-[#7A5B22] mb-1">
                        {law.titleBn}
                      </p>
                      <p>{law.detailedDescBn}</p>
                    </div>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="pt-4 text-center mt-auto border-t border-[#EFE8DA]/80">
                  <button
                    onClick={() => toggleExpand(law.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C6B2A] hover:text-[#553E17] transition-colors cursor-pointer group"
                  >
                    <span>{isExpanded ? "সংক্ষিপ্ত করুন" : "আরও পড়ুন"}</span>
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 transform rotate-180 transition-transform" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Central Button */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenAllLawsModal}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#18191D] hover:bg-[#25272F] text-[#E6C67E] hover:text-white font-bold text-xs sm:text-sm border border-[#C59B4B]/60 shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#C59B4B]" />
            <span>সব ৪৮টি নীতি জানতে সম্পূর্ণ বইটি পড়ুন</span>
          </button>
        </div>

      </div>
    </section>
  );
}
