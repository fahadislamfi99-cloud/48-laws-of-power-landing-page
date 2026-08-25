"use client";

import React, { useState, useMemo } from "react";
import { allLaws } from "@/data/lawsData";
import { siteConfig } from "@/data/siteConfig";
import { X, Search, Download, Crown } from "lucide-react";

interface AllLawsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
}

export default function AllLawsModal({ isOpen, onClose, onOpenOrderModal }: AllLawsModalProps) {
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
      const matchesCategory = selectedCategory === "all" || law.category === selectedCategory;
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#111114] rounded-3xl shadow-2xl border border-[#2A2A2E] flex flex-col max-h-[90vh] overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0A0A0C] border-b border-[#2A2A2E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/20 flex items-center justify-center">
              <Crown className="w-5 h-5 text-[#C8A45C]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#F0EBE0]">The 48 Laws of Power: সম্পূর্ণ সূচিপত্র</h3>
              <p className="text-xs sm:text-sm text-[#8A8278]">ডিজিটাল সংস্করণ • প্রতিটি নীতি গভীরভাবে বোঝার গাইড</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-[#8A8278] hover:text-[#F0EBE0] hover:bg-[#1A1A1E] transition-all duration-200 hover:rotate-90 cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 sm:p-5 bg-[#08080A] border-b border-[#2A2A2E] space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8278]" />
            <input
              type="text"
              placeholder="যেকোনো Law নম্বর বা বিষয় খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 input-dark"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer hover-lift ${
                  selectedCategory === cat.id
                    ? "bg-[#C8A45C] text-[#08080A] font-bold shadow-xs"
                    : "bg-[#111114] border border-[#2A2A2E] text-[#B8B0A4] hover:bg-[#1A1A1E]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Laws List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 divide-y divide-[#2A2A2E] bg-[#111114]">
          {filteredLaws.length === 0 ? (
            <div className="py-12 text-center text-[#8A8278] animate-fadeIn">কোনো নীতি খুঁজে পাওয়া যায়নি।</div>
          ) : (
            filteredLaws.map((law) => (
              <div key={law.id} className="pt-4 first:pt-0 space-y-2 hover:bg-[#0A0A0C] p-3 -mx-3 rounded-xl transition-colors">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/20 text-[#C8A45C] font-mono text-xs font-bold">
                    {law.numberStr}
                  </div>
                  <span className="text-[11px] font-medium text-[#8A8278] bg-[#08080A] px-2 py-0.5 rounded border border-[#2A2A2E]">
                    {law.categoryBn}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-[#F0EBE0]">{law.titleEn}</h4>
                <p className="text-sm font-semibold text-[#C8A45C]/70">{law.titleBn}</p>
                <p className="text-sm text-[#B8B0A4] leading-relaxed">{law.detailedDescBn || law.shortDescBn}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-4 sm:p-5 bg-[#0A0A0C] border-t border-[#2A2A2E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-[#8A8278] font-semibold">সম্পূর্ণ বাংলা ডিজিটাল PDF সংস্করণে ৪৮টি নীতি আয়ত্ত করুন</p>
            <p className="text-base sm:text-lg font-black text-[#C8A45C]">মূল্য: {siteConfig.currencySymbol}{siteConfig.price} (তাৎক্ষণিক • লাইফটাইম)</p>
          </div>
          <button
            onClick={() => { onClose(); onOpenOrderModal(); }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full btn-gold text-sm font-bold cursor-pointer hover-lift btn-shimmer"
          >
            <Download className="w-4 h-4" />
            <span>এখনই ডাউনলোড করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}
