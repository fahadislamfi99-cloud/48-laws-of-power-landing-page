"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface FAQItem { q: string; a: string; }

const faqs: FAQItem[] = [
  { q: "এটি কি হার্ডকপি বই নাকি ডিজিটাল সংস্করণ?", a: "এটি সম্পূর্ণ বাংলা অনুবাদকৃত হাই-রেজোলিউশন ডিজিটাল PDF সংস্করণ (৪৫২ পৃষ্ঠা)। কোনো ফিজিক্যাল কপি বা কুরিয়ার ডেলিভারি নেই; পেমেন্টের সাথে সাথেই তাৎক্ষণিকভাবে ডাউনলোড করে পড়তে পারবেন।" },
  { q: "পেমেন্টের পর কীভাবে ফাইলটি পাব?", a: "বিকাশ, নগদ বা রকেটে পেমেন্ট করে TrxID দিয়ে সাবমিট করার সাথে সাথে স্ক্রিনে সরাসরি ডাউনলোড বাটন দেখতে পাবেন। একইসাথে ইমেইল ও হোয়াটসঅ্যাপেও লিংক পৌঁছে যাবে।" },
  { q: "কোন কোন ডিভাইসে এটি পড়া যাবে?", a: "যেকোনো অ্যান্ড্রয়েড স্মার্টফোন, আইফোন, আইপ্যাড, ট্যাবলেট, উইন্ডোজ পিসি কিংবা ম্যাকবুক, সব ডিভাইসে সাধারণ PDF Reader দিয়ে পড়া যাবে।" },
  { q: "বইটিতে কি সার্চ ও বুকমার্ক করার সুবিধা আছে?", a: "হ্যাঁ, এটি একটি ইন্টারেক্টিভ সার্চেবল পিডিএফ। সূচিপত্রের যেকোনো চ্যাপ্টারে ক্লিক করলেই সরাসরি সেই পাতায় চলে যাওয়া যায় এবং যেকোনো শব্দ লিখে মুহূর্তে সার্চ করা যায়।" },
  { q: "একবার কিনলে কি আজীবন অ্যাক্সেস থাকবে?", a: "হ্যাঁ। একবার ৯৯৯ টাকা পরিশোধ করলে সম্পূর্ণ লাইফটাইম অ্যাক্সেস পাবেন। ফাইলটি নিজের ফোন, কম্পিউটার বা ক্লাউড ড্রাইভে আজীবনের জন্য সংরক্ষণ করে রাখতে পারবেন।" },
  { q: "ডাউনলোডে কোনো সমস্যা হলে কীভাবে সাহায্য পাব?", a: "আমাদের ডেডিকেটেড হোয়াটসঅ্যাপ সাপোর্ট সবসময় সক্রিয়। কোনো কারণে ডাউনলোড লিংক পেতে দেরি হলে হোয়াটসঅ্যাপে মেসেজ দিলেই টিম সাথে সাথে ফাইল বা বিকল্প লিংক পাঠিয়ে দেবে।" },
];

export default function ProductFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section id="faq" ref={containerRef} className="py-20 lg:py-28 bg-[#0A0A0C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14 reveal">
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#C8A45C] uppercase block">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F0EBE0]">সাধারণ প্রশ্ন ও উত্তর</h2>
          <p className="text-[#B8B0A4] text-base">ডিজিটাল সংস্করণ ও ডাউনলোড প্রক্রিয়া সম্পর্কে প্রয়োজনীয় তথ্য নিচে জেনে নিন</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`reveal reveal-stagger-${Math.min(idx + 1, 5)} bg-[#111114] rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-[#C8A45C]/30 shadow-[0_0_20px_rgba(200,164,92,0.05)]" : "border-[#2A2A2E] hover:border-[#3A3A3E]"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bengali-serif font-bold text-[#F0EBE0] text-base sm:text-lg cursor-pointer group"
                >
                  <span className="group-hover:text-[#C8A45C] transition-colors">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full bg-[#08080A] border border-[#2A2A2E] flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 bg-[#C8A45C] text-[#08080A] border-[#C8A45C]" : "text-[#8A8278] group-hover:border-[#C8A45C]/30 group-hover:text-[#C8A45C]"}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#B8B0A4] leading-relaxed border-t border-[#2A2A2E]/60 animate-fadeIn">
                    {faq.a}
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
