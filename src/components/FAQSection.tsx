"use client";

import React, { useState } from "react";
import { faqList } from "@/data/faqData";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-[#FAF8F5] text-stone-900 py-20 lg:py-28 border-b border-[#E8DFCF]/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8C6B2A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>সচরাচর জিজ্ঞাসা</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#16171A]">
            সাধারণ প্রশ্ন ও উত্তর (FAQ)
          </h2>
          <p className="text-[#5A5C64] text-sm sm:text-base">
            বইটি ও অর্ডার সম্পর্কিত প্রয়োজনীয় তথ্য নিচে বিস্তারিত দেখুন
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqList.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-[#E5DCBE] shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bengali-serif font-bold text-[#141518] text-sm sm:text-base hover:text-[#8C6B2A] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#DFCFA8] flex items-center justify-center shrink-0 text-[#7A5B22] transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#C59B4B] text-[#121316]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-[#45474F] text-xs sm:text-sm leading-[1.8] border-t border-[#EFE8DA] animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
