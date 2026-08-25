"use client";

import React, { useState } from "react";
import { allLaws } from "@/data/lawsData";
import { siteConfig } from "@/data/siteConfig";
import {
  Search,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Download,
} from "lucide-react";

interface LawsAlmanacProps {
  onOpenAllLawsModal: () => void;
  onOpenOrderModal: () => void;
}

export default function LawsAlmanac({
  onOpenAllLawsModal,
  onOpenOrderModal,
}: LawsAlmanacProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const categories = [
    { id: "all", label: "সব নীতি" },
    { id: "power", label: "ক্ষমতা ও কর্তৃত্ব" },
    { id: "strategy", label: "রণকৌশল" },
    { id: "influence", label: "প্রভাব বিস্তার" },
    { id: "reputation", label: "সুনাম সুরক্ষা" },
    { id: "communication", label: "যোগাযোগ ও নীরবতা" },
  ];

  // Pick top 10 curated flagship laws for the inline view
  const curatedIds = [1, 2, 3, 4, 5, 9, 11, 15, 33, 48];
  const filteredLaws = allLaws
    .filter((law) => curatedIds.includes(law.id))
    .filter((law) => {
      const matchCat = selectedCat === "all" || law.category === selectedCat;
      const matchSearch =
        law.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.shortDescBn.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="laws-almanac" className="py-20 lg:py-28 border-b border-[#E6E0D4] bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8F6B2C] uppercase block">
            THE 48 LAWS ALMANAC
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#121316]">
            ক্ষমতার ৪৮টি অমোঘ সূত্রের সূচিপত্র
          </h2>
          <p className="text-[#52555E] text-base sm:text-lg">
            নিচে নির্বাচিত নীতিগুলোর সারসংক্ষেপ দেখুন। পুরো ডিজিটাল বইটিতে রয়েছে প্রতিটি সূত্রের পেছনের বিস্তারিত ঐতিহাসিক প্রেক্ষাপট ও বাস্তব বিশ্লেষণ।
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#D8D0C3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCat === cat.id
                    ? "bg-[#121316] text-[#FAF8F5]"
                    : "text-stone-600 hover:bg-[#FAF8F5]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenAllLawsModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFE8] text-[#121316] text-xs font-bold border border-[#D8D0C3] cursor-pointer transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8F6B2C]" />
            <span>সম্পূর্ণ ৪৮টি নীতি একনজরে দেখুন</span>
          </button>
        </div>

        {/* The Curated Almanac List */}
        <div className="bg-white rounded-3xl border border-[#D8D0C3] shadow-sm divide-y divide-[#E6E0D4] overflow-hidden">
          {filteredLaws.map((law) => {
            const isExpanded = expandedId === law.id;

            return (
              <div
                key={law.id}
                className={`transition-colors ${
                  isExpanded ? "bg-[#FAF8F5]" : "hover:bg-[#FAF8F5]/50"
                }`}
              >
                <button
                  onClick={() => toggleExpand(law.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="font-mono text-xs font-bold text-[#8F6B2C] uppercase shrink-0">
                      {law.numberStr}
                    </span>
                    <div>
                      <h4 className="font-editorial-serif font-bold text-base sm:text-lg text-[#121316]">
                        {law.titleEn}
                      </h4>
                      <p className="text-xs sm:text-sm font-bengali-serif font-semibold text-[#8F6B2C]">
                        {law.titleBn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 mt-1 sm:mt-0">
                    <span className="hidden md:inline-block text-[11px] font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
                      {law.categoryBn}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-white border border-[#D8D0C3] flex items-center justify-center text-stone-700 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 bg-[#121316] text-[#FAF8F5]" : ""
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm leading-relaxed text-[#42454D] space-y-3 animate-fadeIn border-t border-[#E6E0D4]/60 bg-white">
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E0D8CA] text-[#121316] font-medium">
                      {law.detailedDescBn || law.shortDescBn}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-mono text-[#8F6B2C]">
                        সম্পূর্ণ ৪৫২ পৃষ্ঠার ডিজিটাল বইতে রয়েছে প্রতিটি সূত্রের বিস্তারিত কেস স্টাডি।
                      </span>
                      <button
                        onClick={onOpenOrderModal}
                        className="text-xs font-bold text-[#121316] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>পিডিএফ ডাউনলোড করুন</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Central Modal Trigger */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenAllLawsModal}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#121316] hover:bg-[#25272F] text-[#FAF8F5] font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#DFC07A]" />
            <span>সম্পূর্ণ ৪৮টি নীতি ও বিস্তারিত সূচিপত্র খুলুন</span>
          </button>
        </div>

      </div>
    </section>
  );
}
