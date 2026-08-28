"use client";

import React, { useState, useMemo, useEffect } from "react";
import { allLaws } from "@/data/lawsData";
import { siteConfig } from "@/data/siteConfig";
import { X, Search, Download, Crown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AllLawsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
}

export default function AllLawsModal({ isOpen, onClose, onOpenOrderModal }: AllLawsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-x-hidden overflow-y-auto">
          {/* Backdrop: Gradual Darken + Subtle Background Blur */}
          <motion.div
            key="all-laws-backdrop"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/75 cursor-pointer will-change-[backdrop-filter,opacity]"
            onClick={onClose}
          />

          {/* Modal Panel: Slower, Silky Smooth Fade + Subtle Scale */}
          <motion.div
            key="all-laws-panel"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative w-full max-w-4xl bg-[#111114] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#2A2A2E] flex flex-col max-h-[92dvh] overflow-hidden my-auto z-10 will-change-[transform,opacity]"
          >
            {/* Header */}
            <div className="p-3 sm:p-6 bg-[#0A0A0C] border-b border-[#2A2A2E] flex items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/20 flex items-center justify-center shrink-0">
                  <Crown className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C8A45C]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs xs:text-sm sm:text-xl font-display font-bold text-[#F0EBE0] truncate">
                    The 48 Laws of Power: সম্পূর্ণ সূচিপত্র
                  </h3>
                  <p className="text-[10px] sm:text-sm text-[#A8A095] truncate">
                    ডিজিটাল সংস্করণ • প্রতিটি নীতি গভীরভাবে বোঝার গাইড
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full text-[#A8A095] hover:text-[#F0EBE0] hover:bg-[#1A1A1E] transition-all duration-300 cursor-pointer shrink-0 group"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-6 sm:h-6 transition-transform duration-300 ease-out group-hover:rotate-90" />
              </button>
            </div>

            {/* Search & Filter */}
            <div className="p-2.5 sm:p-5 bg-[#08080A] border-b border-[#2A2A2E] space-y-2 sm:space-y-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 sm:w-5 sm:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8278]" />
                <input
                  type="text"
                  placeholder="যেকোনো Law নম্বর বা বিষয় খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-2.5 input-dark text-xs sm:text-sm placeholder:text-[#8A8278] text-[#F0EBE0]"
                />
              </div>
              <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-[#C8A45C] text-[#08080A] font-bold shadow-xs"
                        : "bg-[#111114] border border-[#2A2A2E] text-[#D1C9BC] hover:bg-[#1A1A1E]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Laws List */}
            <div className="p-2.5 sm:p-6 overflow-y-auto space-y-2 sm:space-y-4 divide-y divide-[#2A2A2E] bg-[#111114]">
              {filteredLaws.length === 0 ? (
                <div className="py-10 sm:py-12 text-center text-[#A8A095] text-xs sm:text-sm">
                  কোনো নীতি খুঁজে পাওয়া যায়নি।
                </div>
              ) : (
                filteredLaws.map((law) => (
                  <div key={law.id} className="pt-2.5 sm:pt-4 first:pt-0 space-y-1 sm:space-y-2 hover:bg-[#0A0A0C] p-2.5 sm:p-3 rounded-xl transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/20 text-[#C8A45C] font-mono text-[11px] sm:text-xs font-bold">
                        {law.numberStr}
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-[#A8A095] bg-[#08080A] px-2 py-0.5 rounded border border-[#26262A]">
                        {law.categoryBn}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-lg font-editorial-serif font-bold text-[#F0EBE0]">{law.titleEn}</h4>
                    <p className="text-[11px] sm:text-sm font-bengali-serif font-bold text-[#C8A45C]/80">{law.titleBn}</p>
                    <p className="text-xs sm:text-sm text-[#D1C9BC] leading-relaxed">{law.detailedDescBn || law.shortDescBn}</p>
                  </div>
                ))
              )}
            </div>

            {/* Footer CTA */}
            <div className="p-3 sm:p-5 bg-[#0A0A0C] border-t border-[#2A2A2E] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4">
              <div className="text-center sm:text-left">
                <p className="text-[11px] sm:text-xs text-[#A8A095] font-semibold">সম্পূর্ণ বাংলা ডিজিটাল PDF সংস্করণে ৪৮টি নীতি আয়ত্ত করুন</p>
                <p className="text-xs sm:text-base font-bold text-[#C8A45C]">মূল্য: {siteConfig.currencySymbol}{siteConfig.price} (তাৎক্ষণিক • লাইফটাইম)</p>
              </div>
              <button
                type="button"
                onClick={() => { onClose(); onOpenOrderModal(); }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full btn-gold text-xs sm:text-sm font-bold cursor-pointer hover-lift btn-shimmer whitespace-nowrap min-h-[42px]"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>এখনই ডাউনলোড করুন</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
