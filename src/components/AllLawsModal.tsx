"use client";

import React, { useState, useMemo } from "react";
import { allLaws } from "@/data/lawsData";
import { siteConfig } from "@/data/siteConfig";
import {
  X,
  Search,
  Download,
  Crown,
} from "lucide-react";

interface AllLawsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
}

export default function AllLawsModal({
  isOpen,
  onClose,
  onOpenOrderModal,
}: AllLawsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "সব নীতি (৪৮টি)" },
    { id: "power", label: "ক্ষমতা" },
    { id: "strategy", label: "রণকৌশল" },
    { id: "influence", label: "প্রভাব বিস্তার" },
    { id: "reputation", label: "সুনাম ও সম্মান" },
    { id: "communication", label: "কমিউনিকেশন" },
    { id: "human_nature", label: "মানব মনস্তত্ত্ব" },
  ];

  const filteredLaws = useMemo(() => {
    return allLaws.filter((law) => {
      const matchesCategory =
        selectedCategory === "all" || law.category === selectedCategory;
      const matchesSearch =
        law.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.numberStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.shortDescBn.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#DFCFA8] flex flex-col max-h-[90vh] overflow-hidden text-stone-900 animate-scaleIn">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#F5EFE6] text-stone-900 border-b border-[#E2D5BA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EAE0CD] border border-[#D5C7A8] flex items-center justify-center text-stone-900 shadow-xs">
              <Crown className="w-5 h-5 stroke-[2.2] text-[#8C6B2A]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                The 48 Laws of Power — সম্পূর্ণ সূচিপত্র
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                ডিজিটাল সংস্করণ • ক্ষমতা ও মনস্তত্ত্বের প্রতিটি নীতি গভীরভাবে বোঝার গাইড
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-600 hover:text-stone-950 hover:bg-stone-200/80 transition-all duration-200 hover:rotate-90 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 sm:p-5 bg-[#FAF6EE] border-b border-[#EFE8DA] space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="যেকোনো Law নম্বর বা বিষয় খুঁজুন (যেমন: Law 1, সুনাম, শত্রু, কথা)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white rounded-xl border border-[#D5C7A8] text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C59B4B] text-sm shadow-2xs transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer hover-lift active-lift ${
                  selectedCategory === cat.id
                    ? "bg-[#18191D] text-[#E6C67E] font-bold shadow-xs border border-[#C59B4B]/50 scale-102"
                    : "bg-white border border-[#D5C7A8] text-stone-700 hover:bg-[#FAF6EE]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Laws List Scroll Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 divide-y divide-[#EFE8DA] bg-white">
          {filteredLaws.length === 0 ? (
            <div className="py-12 text-center text-stone-500 animate-fadeIn">
              কোনো নীতি খুঁজে পাওয়া যায়নি। অন্য কিছু লিখে খুঁজুন।
            </div>
          ) : (
            filteredLaws.map((law) => (
              <div key={law.id} className="pt-4 first:pt-0 space-y-2 hover:bg-[#FAF8F5]/60 p-3 -mx-3 rounded-xl transition-colors">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#FAF6EE] border border-[#DFCFA8] text-[#7A5B22] font-mono text-xs font-bold">
                    {law.numberStr}
                  </div>
                  <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                    {law.categoryBn}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                  {law.titleEn}
                </h4>
                <p className="text-sm font-semibold text-[#7A5B22]">
                  {law.titleBn}
                </p>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {law.detailedDescBn || law.shortDescBn}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="p-4 sm:p-5 bg-[#F5EFE6] text-stone-900 border-t border-[#E2D5BA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-stone-600 font-semibold">
              সম্পূর্ণ বাংলা ডিজিটাল PDF সংস্করণে ৪৮টি নীতি আয়ত্ত করুন
            </p>
            <p className="text-base sm:text-lg font-black text-[#7A5B22]">
              মূল্য: {siteConfig.currencySymbol}{siteConfig.price} (তাৎক্ষণিক ডাউনলোড • লাইফটাইম অ্যাক্সেস)
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenOrderModal();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#18191D] hover:bg-[#25272F] text-[#E6C67E] font-bold text-sm shadow-md border border-[#C59B4B]/60 cursor-pointer hover-lift active-lift btn-shimmer"
          >
            <Download className="w-4 h-4" />
            <span>এখনই ডাউনলোড করুন</span>
          </button>
        </div>

      </div>
    </div>
  );
}
