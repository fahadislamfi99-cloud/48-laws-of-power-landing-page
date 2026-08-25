"use client";

import React, { useState } from "react";
import { allLaws } from "@/data/lawsData";
import { siteConfig } from "@/data/siteConfig";
import {
  Search,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Download,
  Filter,
} from "lucide-react";

interface LawsCodexProps {
  onOpenAllLawsModal: () => void;
  onOpenOrderModal: () => void;
}

export default function LawsCodex({
  onOpenAllLawsModal,
  onOpenOrderModal,
}: LawsCodexProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedLawId, setExpandedLawId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "নির্বাচিত নীতিসমূহ" },
    { id: "power", label: "ক্ষমতা ও আধিপত্য" },
    { id: "strategy", label: "রণকৌশল" },
    { id: "influence", label: "প্রভাব ও প্রভাব বিস্তার" },
    { id: "reputation", label: "সুনাম ও মর্যাদা" },
  ];

  // Pick top 8 curated flagship laws
  const flagshipIds = [1, 3, 4, 5, 9, 15, 33, 48];
  const displayedLaws = allLaws
    .filter((law) => flagshipIds.includes(law.id))
    .filter((law) => {
      const matchCat =
        selectedCategory === "all" || law.category === selectedCategory;
      const matchSearch =
        law.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.shortDescBn.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

  const toggleExpand = (id: number) => {
    setExpandedLawId(expandedLawId === id ? null : id);
  };

  return (
    <section id="laws-codex" className="py-20 lg:py-28 border-b border-[#E4DED3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8E6A2F] uppercase block">
            THE 48 LAWS CODEX
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-black tracking-tight text-[#111215]">
            ক্ষমতার ৪৮টি অমোঘ নীতি
          </h2>
          <p className="text-[#555760] text-sm sm:text-base">
            নিচে নির্বাচিত কয়েকটি নীতি সংক্ষেপে দেওয়া হলো। পুরো গ্রন্থে প্রতিটি নীতির পেছনের ঐতিহাসিক প্রেক্ষাপট ও কৌশলগত বিস্তারিত বিশ্লেষণ রয়েছে।
          </p>
        </div>

        {/* Category & Search Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-3 rounded-2xl border border-[#E4DED3] shadow-xs">
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#111215] text-[#F7F5EE]"
                    : "text-stone-600 hover:bg-[#FAF8F5]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenAllLawsModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F0EBE0] text-stone-800 text-xs font-bold border border-[#D5CDBE] cursor-pointer transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8E6A2F]" />
            <span>সব ৪৮টি নীতি দেখুন (সূচিপত্র)</span>
          </button>
        </div>

        {/* Laws Accordion / Archival Codex List */}
        <div className="bg-white rounded-3xl border border-[#D5CDBE] shadow-md divide-y divide-[#E4DED3] overflow-hidden">
          {displayedLaws.map((law) => {
            const isExpanded = expandedLawId === law.id;

            return (
              <div
                key={law.id}
                className={`transition-colors ${
                  isExpanded ? "bg-[#FAF8F5]" : "hover:bg-[#FAF8F5]/50"
                }`}
              >
                {/* Accordion Row Header */}
                <button
                  onClick={() => toggleExpand(law.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="font-mono text-xs font-bold text-[#8E6A2F] tracking-wider uppercase shrink-0">
                      {law.numberStr}
                    </span>
                    <div>
                      <h4 className="font-editorial-serif font-bold text-base sm:text-lg text-[#111215]">
                        {law.titleEn}
                      </h4>
                      <p className="text-xs sm:text-sm font-editorial-bengali-serif font-semibold text-[#8E6A2F]">
                        {law.titleBn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 mt-1 sm:mt-0">
                    <span className="hidden md:inline-block text-[11px] font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
                      {law.categoryBn}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-white border border-[#D5CDBE] flex items-center justify-center text-stone-700 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 bg-[#111215] text-[#F7F5EE]" : ""
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm leading-relaxed text-[#4A4D55] space-y-3 animate-fadeIn border-t border-[#E4DED3]/60 bg-white">
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DFCFA8] text-stone-900 font-medium">
                      {law.detailedDescBn || law.shortDescBn}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-mono text-[#8E6A2F]">
                        সম্পূর্ণ বইতে প্রতিটি নীতির ঐতিহাসিক উদাহরণ ও কৌশল রয়েছে।
                      </span>
                      <button
                        onClick={onOpenOrderModal}
                        className="text-xs font-bold text-[#111215] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>পিডিএফ ডাউনলোড</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Central CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenAllLawsModal}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#111215] hover:bg-[#25272E] text-[#F7F5EE] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#DFC07A]" />
            <span>সম্পূর্ণ ৪৮টি নীতি ও বিস্তারিত সূচিপত্র খুলুন</span>
          </button>
        </div>

      </div>
    </section>
  );
}
