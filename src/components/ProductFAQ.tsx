"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "এটি কি হার্ডকপি বই নাকি ডিজিটাল সংস্করণ?",
    a: "এটি সম্পূর্ণ বাংলা অনুবাদকৃত হাই-রেজোলিউশন ডিজিটাল PDF সংস্করণ (৪৫২ পৃষ্ঠা)। কোনো ফিজিক্যাল কপি বা কুরিয়ার ডেলিভারি নেই; পেমেন্টের সাথে সাথেই তাৎক্ষণিকভাবে ডাউনলোড করে পড়তে পারবেন।"
  },
  {
    q: "পেমেন্টের পর কীভাবে ফাইলটি পাব?",
    a: "বিকাশ, নগদ বা রকেটে পেমেন্ট করে TrxID দিয়ে সাবমিট করার সাথে সাথে স্ক্রিনে সরাসরি 'পিডিএফ ডাউনলোড' বাটন দেখতে পাবেন। একইসাথে আপনার প্রদত্ত ইমেইল ও হোয়াটসঅ্যাপ নম্বরেও ডাউনলোড লিংক ব্যাকআপ হিসেবে পৌঁছে যাবে।"
  },
  {
    q: "কোন কোন ডিভাইসে এটি পড়া যাবে?",
    a: "যেকোনো অ্যান্ড্রয়েড স্মার্টফোন, আইফোন, আইপ্যাড, অ্যান্ড্রয়েড ট্যাবলেট, উইন্ডোজ পিসি কিংবা ম্যাকবুক—সব ডিভাইসে সাধারণ PDF Reader অ্যাপ দিয়ে এটি নিখুঁতভাবে পড়া যাবে।"
  },
  {
    q: "বইটিতে কি সার্চ ও বুকমার্ক করার সুবিধা আছে?",
    a: "হ্যাঁ, এটি একটি ইন্টারেক্টিভ সার্চেবল পিডিএফ। সূচিপত্রের যেকোনো চ্যাপ্টারে ক্লিক করলেই সরাসরি সেই পাতায় চলে যাওয়া যায় এবং যেকোনো শব্দ লিখে মুহূর্তে সার্চ করা যায়।"
  },
  {
    q: "একবার কিনলে কি আজীবন অ্যাক্সেস থাকবে?",
    a: "হ্যাঁ। একবার ৯৯৯ টাকা পরিশোধ করলে আপনি সম্পূর্ণ লাইফটাইম অ্যাক্সেস পাবেন। ফাইলটি নিজের ফোন, কম্পিউটার বা ক্লাউড ড্রাইভে আজীবনের জন্য সংরক্ষণ করে রাখতে পারবেন।"
  },
  {
    q: "ডাউনলোডে কোনো সমস্যা হলে কীভাবে সাহায্য পাব?",
    a: "আমাদের ডেডিকেটেড হোয়াটসঅ্যাপ সাপোর্ট সবসময় সক্রিয় রয়েছে। কোনো কারণে ডাউনলোড লিংক পেতে দেরি হলে হোয়াটসঅ্যাপে মেসেজ দিলেই আমাদের টিম সাথে সাথে সরাসরি ফাইল বা বিকল্প লিংক পাঠিয়ে দেবে।"
  }
];

export default function ProductFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 border-b border-[#E6E0D4] bg-[#F7F5EE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8F6B2C] uppercase block">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#121316]">
            সাধারণ প্রশ্ন ও উত্তর
          </h2>
          <p className="text-[#52555E] text-base">
            ডিজিটাল সংস্করণ ও ডাউনলোড প্রক্রিয়া সম্পর্কে প্রয়োজনীয় তথ্য নিচে জেনে নিন
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#D8D0C3] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bengali-serif font-bold text-[#121316] text-base sm:text-lg cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#D8D0C3] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#121316] text-[#FAF8F5]" : "text-stone-700"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#42454D] leading-relaxed border-t border-[#E6E0D4]/60 animate-fadeIn">
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
