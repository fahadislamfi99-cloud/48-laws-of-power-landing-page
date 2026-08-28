"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { siteConfig } from "@/data/siteConfig";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "এটি কি হার্ডকপি বই নাকি ডিজিটাল সংস্করণ?",
    a: "এটি সম্পূর্ণ বাংলা অনুবাদকৃত হাই-রেজোলিউশন ডিজিটাল PDF সংস্করণ (৫০৯ পৃষ্ঠা)। কোনো ফিজিক্যাল কপি বা কুরিয়ার ডেলিভারি নেই; পেমেন্টের সাথে সাথেই তাৎক্ষণিকভাবে ডাউনলোড করে পড়তে পারবেন।",
  },
  {
    q: "পেমেন্টের পর কীভাবে ফাইলটি পাব?",
    a: "আপনার জিমেইল ঠিকানা দিয়ে বিকাশ সিকিউর অটো পেমেন্ট সম্পন্ন করার সাথে সাথে স্ক্রিনে সরাসরি ডাউনলোড বাটন দেখতে পাবেন। একইসাথে আপনার জিমেইলেও লাইফটাইম ব্যাকআপ লিংক পৌঁছে যাবে।",
  },
  {
    q: "কোন কোন ডিভাইসে এটি পড়া যাবে?",
    a: "যেকোনো অ্যান্ড্রয়েড স্মার্টফোন, আইফোন, আইপ্যাড, ট্যাবলেট, উইন্ডোজ পিসি কিংবা ম্যাকবুক, সব ডিভাইসে সাধারণ PDF Reader দিয়ে পড়া যাবে।",
  },
  {
    q: "বইটিতে কি সার্চ ও বুকমার্ক করার সুবিধা আছে?",
    a: "হ্যাঁ, এটি একটি ইন্টারেক্টিভ সার্চেবল পিডিএফ। সূচিপত্রের যেকোনো চ্যাপ্টারে ক্লিক করলেই সরাসরি সেই পাতায় চলে যাওয়া যায় এবং যেকোনো শব্দ লিখে মুহূর্তে সার্চ করা যায়।",
  },
  {
    q: "একবার কিনলে কি আজীবন অ্যাক্সেস থাকবে?",
    a: `হ্যাঁ। একবার ${siteConfig.currencySymbol}${siteConfig.price} পরিশোধ করলে সম্পূর্ণ লাইফটাইম অ্যাক্সেস পাবেন। ফাইলটি নিজের ফোন, কম্পিউটার বা ক্লাউড ড্রাইভে আজীবনের জন্য সংরক্ষণ করে রাখতে পারবেন।`,
  },
  {
    q: "ডাউনলোডে কোনো সমস্যা হলে কীভাবে সাহায্য পাব?",
    a: "আমাদের ডেডিকেটেড হোয়াটসঅ্যাপ সাপোর্ট সবসময় সক্রিয়। কোনো কারণে ডাউনলোড লিংক পেতে দেরি হলে হোয়াটসঅ্যাপে মেসেজ দিলেই টিম সাথে সাথে ফাইল বা বিকল্প লিংক পাঠিয়ে দেবে।",
  },
];

export default function ProductFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="faq"
      ref={containerRef}
      className="py-10 sm:py-14 lg:py-20 bg-[#0A0A0C] border-t border-[#26262A]"
    >
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 mb-6 sm:mb-10 reveal">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/25 text-[#C8A45C] font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase">
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F0EBE0]">
            সাধারণ প্রশ্ন ও উত্তর
          </h2>
          <p className="text-[#B8B0A4] text-xs sm:text-base">
            ডিজিটাল সংস্করণ ও ডাউনলোড প্রক্রিয়া সম্পর্কে প্রয়োজনীয় তথ্য নিচে জেনে নিন
          </p>
        </div>

        {/* FAQ Accordion List - Single reveal wrapper on parent */}
        <div className="space-y-2.5 sm:space-y-3 reveal reveal-stagger-1">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-[#111114] rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#C8A45C]/40 shadow-[0_4px_25px_rgba(200,164,92,0.06)] bg-[#131317]"
                    : "border-[#26262A] hover:border-[#3A3A3E] hover:bg-[#131316]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-3.5 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 font-bengali-serif font-bold text-[#F0EBE0] text-sm sm:text-lg cursor-pointer group select-none"
                >
                  <span className="group-hover:text-[#C8A45C] transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 bg-[#C8A45C] text-[#08080A] shadow-[0_0_15px_rgba(200,164,92,0.3)]"
                        : "bg-[#08080A] border border-[#26262A] text-[#8A8278] group-hover:border-[#C8A45C]/40 group-hover:text-[#C8A45C]"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Smooth Expand/Collapse Container */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-3.5 sm:px-6 pb-4 sm:pb-6 pt-1 text-xs sm:text-base text-[#C4BCB0] leading-[1.75] sm:leading-[1.8] border-t border-[#26262A]/60">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
