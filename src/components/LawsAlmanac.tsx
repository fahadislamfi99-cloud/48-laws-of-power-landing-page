"use client";

import React, { useState } from "react";
import { allLaws } from "@/data/lawsData";
import { siteConfig } from "@/data/siteConfig";
import { BookOpen, ChevronDown, ChevronRight, Download } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface LawsAlmanacProps {
  onOpenAllLawsModal: () => void;
  onOpenOrderModal: () => void;
}

export default function LawsAlmanac({
  onOpenAllLawsModal,
  onOpenOrderModal,
}: LawsAlmanacProps) {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const containerRef = useScrollReveal<HTMLElement>();

  const categories = [
    { id: "all", label: "সব নীতি" },
    { id: "power", label: "ক্ষমতা ও কর্তৃত্ব" },
    { id: "strategy", label: "রণকৌশল" },
    { id: "influence", label: "প্রভাব বিস্তার" },
    { id: "reputation", label: "সুনাম সুরক্ষা" },
    { id: "communication", label: "যোগাযোগ ও নীরবতা" },
  ];

  const curatedIds = [1, 2, 3, 4, 5, 9, 11, 15, 33, 48];
  const filteredLaws = allLaws
    .filter((law) => curatedIds.includes(law.id))
    .filter((law) => selectedCat === "all" || law.category === selectedCat);

  return (
    <section
      id="laws-almanac"
      ref={containerRef}
      className="py-14 lg:py-20 bg-[#08080A] border-t border-[#26262A]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 reveal">
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#C8A45C] uppercase block">
            THE 48 LAWS ALMANAC
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F0EBE0]">
            ক্ষমতার ৪৮টি অমোঘ সূত্রের সূচিপত্র
          </h2>
          <p className="text-[#B8B0A4] text-base sm:text-lg">
            নিচে নির্বাচিত নীতিগুলোর সারসংক্ষেপ দেখুন। পুরো ডিজিটাল বইটিতে রয়েছে প্রতিটি সূত্রের পেছনের বিস্তারিত ঐতিহাসিক প্রেক্ষাপট ও বাস্তব বিশ্লেষণ।
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#111114] p-3 sm:p-4 rounded-2xl border border-[#2A2A2E] flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 reveal reveal-stagger-1">
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCat === cat.id
                    ? "bg-[#C8A45C] text-[#08080A] shadow-xs"
                    : "text-[#B8B0A4] hover:bg-[#1A1A1E] hover:text-[#F0EBE0]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenAllLawsModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A1A1E] hover:bg-[#2A2A2E] text-[#C8A45C] text-xs font-bold border border-[#2A2A2E] cursor-pointer transition-all hover-lift"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>সম্পূর্ণ ৪৮টি নীতি একনজরে দেখুন</span>
          </button>
        </div>

        {/* Laws List */}
        <div className="bg-[#111114] rounded-3xl border border-[#2A2A2E] divide-y divide-[#2A2A2E] overflow-hidden reveal reveal-stagger-2">
          {filteredLaws.map((law) => {
            const isExpanded = expandedId === law.id;
            return (
              <div
                key={law.id}
                className={`transition-colors duration-200 ${isExpanded ? "bg-[#0A0A0C]" : "hover:bg-[#0D0D0F]"}`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : law.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="font-mono text-xs font-bold text-[#C8A45C] uppercase shrink-0 transition-transform duration-200 group-hover:scale-105">
                      {law.numberStr}
                    </span>
                    <div>
                      <h4 className="font-editorial-serif font-bold text-base sm:text-lg text-[#F0EBE0] group-hover:text-[#C8A45C] transition-colors">
                        {law.titleEn}
                      </h4>
                      <p className="text-xs sm:text-sm font-bengali-serif font-semibold text-[#C8A45C]/70">
                        {law.titleBn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 mt-1 sm:mt-0">
                    <span className="hidden md:inline-block text-[11px] font-mono text-[#8A8278] bg-[#08080A] px-2.5 py-1 rounded border border-[#2A2A2E]">
                      {law.categoryBn}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-[#08080A] border border-[#2A2A2E] flex items-center justify-center text-[#8A8278] transition-all duration-300 ${
                        isExpanded ? "rotate-180 bg-[#C8A45C] text-[#08080A] border-[#C8A45C]" : "group-hover:border-[#C8A45C]/30 group-hover:text-[#C8A45C]"
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>

                {/* Smooth Expand/Collapse */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm leading-relaxed text-[#B8B0A4] space-y-3 border-t border-[#2A2A2E]/60 bg-[#111114]">
                      <div className="p-4 rounded-xl bg-[#08080A] border border-[#2A2A2E] text-[#C4BCB0] font-medium leading-[1.75]">
                        {law.detailedDescBn || law.shortDescBn}
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1">
                        <span className="text-xs font-mono text-[#8A8278]">
                          সম্পূর্ণ ৪৫২ পৃষ্ঠার ডিজিটাল বইতে রয়েছে প্রতিটি সূত্রের বিস্তারিত কেস স্টাডি।
                        </span>
                        <button
                          onClick={onOpenOrderModal}
                          className="text-xs font-bold text-[#C8A45C] hover:text-[#D4AF6E] hover:underline inline-flex items-center gap-1 cursor-pointer transition-colors group shrink-0"
                        >
                          <span>পিডিএফ ডাউনলোড করুন</span>
                          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center reveal reveal-stagger-3">
          <button
            onClick={onOpenAllLawsModal}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full btn-gold text-xs sm:text-sm cursor-pointer hover-lift btn-shimmer group"
          >
            <BookOpen className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
            <span>সম্পূর্ণ ৪৮টি নীতি ও বিস্তারিত সূচিপত্র খুলুন</span>
          </button>
        </div>
      </div>
    </section>
  );
}
