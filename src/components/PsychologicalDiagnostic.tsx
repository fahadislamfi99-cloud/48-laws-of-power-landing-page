"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { CheckCircle2, HelpCircle, ArrowRight, Sparkles, BookOpen, AlertCircle } from "lucide-react";

interface Scenario {
  id: number;
  category: string;
  situation: string;
  options: {
    text: string;
    verdict: string;
    isOptimal: boolean;
    relatedLaw: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    category: "কর্মক্ষেত্র ও ক্রেডিট (Workplace Politics)",
    situation:
      "আপনি একটি প্রকল্পে কঠোর পরিশ্রম করে একটি অসাধারণ পরিকল্পনা তৈরি করলেন। কিন্তু মিটিংয়ে আপনার সিনিয়র কলিগ সেটিকে নিজের কাজ হিসেবে উপস্থাপন করলেন। আপনি কী করবেন?",
    options: [
      {
        text: "মিটিং চলাকালীন সবার সামনে কলিগকে মিথ্যাবাদী বলে প্রমাণ করতে শুরু করব।",
        verdict:
          "ভুল চাল (Law 1 & 48)। প্রকাশ্য সংঘাতে কলিগ ডিফেন্সিভ হয়ে পড়বে এবং অন্যরা আপনাকে অস্থিতিশীল মনে করতে পারে।",
        isOptimal: false,
        relatedLaw: "Law 1: Never Outshine the Master",
      },
      {
        text: "চুপচাপ মেনে নেব এবং ভাবব পরের বার নিজের ভাগ্য ভালো হবে।",
        verdict:
          "প্যাসিভ ভুল (Law 5)। অতিরিক্ত নিষ্ক্রিয়তা আপনার পেশাদার অবস্থান ও কর্তৃত্ব ধ্বংস করে দেবে।",
        isOptimal: false,
        relatedLaw: "Law 5: Protect Your Reputation",
      },
      {
        text: "পরিকল্পনার পরবর্তী জটিল ধাপগুলোর নিয়ন্ত্রণ নিজের হাতে রেখে উচ্চতর কর্তৃপক্ষের কাছে কৌশলগতভাবে বাস্তবায়নের প্রমাণ উপস্থাপন করব।",
        verdict:
          "কৌশলগতভাবে সেরা চাল (Law 7 & 11)। আইডিয়া চুরির চেয়ে বাস্তবায়নের নিয়ন্ত্রণ যার হাতে থাকে, ক্ষমতার খেলা তারই নিয়ন্ত্রণে আসে।",
        isOptimal: true,
        relatedLaw: "Law 7: Get Others to Do the Work, But Always Take Credit",
      },
    ],
  },
  {
    id: 2,
    category: "নেগোসিয়েশন ও চুক্তি (High-Stakes Negotiation)",
    situation:
      "একটি বড় ব্যবসায়িক চুক্তির সময় প্রতিপক্ষ অযৌক্তিক শর্ত দিয়ে আপনাকে বারবার মানসিক চাপে ফেলছে এবং দ্রুত সিদ্ধান্ত নিতে বাধ্য করছে। আপনার সেরা প্রতিক্রিয়া কী?",
    options: [
      {
        text: "দেরি না করে তৎক্ষণাৎ রেগে গিয়ে মিটিং বর্জন করব।",
        verdict:
          "আবেগপ্রবণ ভুল (Law 39)। মেজাজ হারালে প্রতিপক্ষ বুঝে যায় আপনার নিয়ন্ত্রণ হাতছাড়া হয়েছে।",
        isOptimal: false,
        relatedLaw: "Law 39: Stir Up Waters to Catch Fish",
      },
      {
        text: "সম্পূর্ণ শান্ত থেকে ইচ্ছাকৃত নীরবতা বজায় রাখব এবং কোনো তাড়াহুড়ো না করে প্রতিপক্ষকে নিজের ব্যাখ্যা দিতে বাধ্য করব।",
        verdict:
          "কৌশলগত বিজয়ী চাল (Law 4 & 16)। দীর্ঘ নীরবতা প্রতিপক্ষকে অস্বস্তিতে ফেলে তাদের লুকানো তাড়াহুড়ো ও দুর্বলতা প্রকাশ করে দেয়।",
        isOptimal: true,
        relatedLaw: "Law 4: Always Say Less Than Necessary",
      },
      {
        text: "চুক্তি হারানোর ভয়ে তাদের অধিকাংশ শর্ত মেনে নেব।",
        verdict:
          "আত্মসমর্পণমূলক ভুল (Law 9)। সমঝোতায় অন্যায্য ছাড় দিলে প্রতিপক্ষের লোভ ক্রমাগত বৃদ্ধি পায়।",
        isOptimal: false,
        relatedLaw: "Law 9: Win Through Actions, Never Argument",
      },
    ],
  },
  {
    id: 3,
    category: "সামাজিক শত্রুতা ও কূটকৌশল (Enemies & Alliances)",
    situation:
      "আপনি জানতে পারলেন একজন প্রভাবশালী ব্যক্তি গোপনে আপনার বিরুদ্ধে অপপ্রচার চালাচ্ছে। আপনি কী করবেন?",
    options: [
      {
        text: "সবার কাছে গিয়ে গিয়ে নিজের নির্দোষিতার সাফাই গাইতে থাকব।",
        verdict:
          "ক্ষতিকর ভুল (Law 5)। অতিরিক্ত আত্মপক্ষ সমর্থন মানুষের মনে আরও সন্দেহের উদ্রেক করে।",
        isOptimal: false,
        relatedLaw: "Law 5: Reputation is the Cornerstone of Power",
      },
      {
        text: "তার মোটিভেশন ও শক্তির উৎস চিহ্নিত করে এমন জোট তৈরি করব যাতে তার একাকীত্ব ও ক্ষমতার ভিত্তি বিনষ্ট হয়।",
        verdict:
          "মাস্টারস্ট্রোক চাল (Law 15 & 18)। ক্ষমতা ও কূটকৌশলের মূল চাবিকাঠি হলো প্রতিপক্ষের শক্তির উৎসমূল লক্ষ্য করা।",
        isOptimal: true,
        relatedLaw: "Law 15: Crush Your Enemy Totally",
      },
      {
        text: "তাকে ফ্রেন্ডলি মেসেজ পাঠিয়ে ক্ষমা চাইতে বলব।",
        verdict:
          "অবাস্তব প্রত্যাশা (Law 2)। ক্ষমতার রাজনীতিতে শত্রু কখনোই শুভাকাঙ্ক্ষী হয় না।",
        isOptimal: false,
        relatedLaw: "Law 2: Never Put Too Much Trust in Friends",
      },
    ],
  },
];

interface PsychologicalDiagnosticProps {
  onOpenOrderModal: () => void;
}

export default function PsychologicalDiagnostic({
  onOpenOrderModal,
}: PsychologicalDiagnosticProps) {
  const [activeScenario, setActiveScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const scenario = scenarios[activeScenario];

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setActiveScenario((activeScenario + 1) % scenarios.length);
  };

  return (
    <section id="diagnostic" className="py-20 lg:py-28 border-b border-[#E4DED3] bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8E6A2F] uppercase block">
            STRATEGIC DIAGNOSTIC
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-black tracking-tight text-[#111215]">
            আপনি কি ক্ষমতার এই খেলায় প্রস্তুত?
          </h2>
          <p className="text-[#555760] text-sm sm:text-base">
            বাস্তব জীবনের একটি পরিস্থিতি বেছে নিয়ে আপনার মনস্তাত্ত্বিক প্রতিক্রিয়া পরীক্ষা করুন
          </p>
        </div>

        {/* Diagnostic Card */}
        <div className="bg-white rounded-3xl border border-[#D5CDBE] shadow-lg p-6 sm:p-10 space-y-8">
          
          {/* Top Progress & Category */}
          <div className="flex items-center justify-between border-b border-[#E4DED3] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#111215] text-[#F7F5EE] text-xs font-mono font-bold flex items-center justify-center">
                {activeScenario + 1}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#111215]">
                {scenario.category}
              </span>
            </div>
            <span className="text-xs font-mono text-[#7A7C85]">
              কেস স্টাডি {activeScenario + 1} / {scenarios.length}
            </span>
          </div>

          {/* Scenario Situation */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F7F5EE] border border-[#DFCFA8] space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-[#8E6A2F]">
              পরিস্থিতি:
            </span>
            <p className="text-base sm:text-lg font-editorial-bengali-serif font-medium text-[#111215] leading-relaxed">
              {scenario.situation}
            </p>
          </div>

          {/* Options Selection */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#4A4D55] uppercase tracking-wider block">
              আপনার সিদ্ধান্ত কী হবে?
            </span>

            {scenario.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${
                  selectedOption === idx
                    ? opt.isOptimal
                      ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-xs"
                      : "bg-amber-50 border-amber-400 text-amber-950 font-semibold shadow-xs"
                    : "bg-white border-[#E4DED3] text-[#2C2D32] hover:bg-[#FAF8F5]"
                }`}
              >
                <div className="mt-0.5 w-4 h-4 rounded-full border border-stone-400 flex items-center justify-center shrink-0">
                  {selectedOption === idx && (
                    <div className="w-2 h-2 rounded-full bg-[#111215]" />
                  )}
                </div>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>

          {/* Verdict Box (Shown on select) */}
          {selectedOption !== null && (
            <div
              className={`p-5 rounded-2xl border space-y-3 animate-fadeIn ${
                scenario.options[selectedOption].isOptimal
                  ? "bg-emerald-50 border-emerald-300"
                  : "bg-amber-50 border-amber-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#111215]">
                  রবার্ট গ্রিনের কৌশলগত বিশ্লেষণ
                </span>
                <span className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-black/10">
                  {scenario.options[selectedOption].relatedLaw}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-stone-900">
                {scenario.options[selectedOption].verdict}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#111215] hover:underline cursor-pointer"
                >
                  <span>পরবর্তী কেস স্টাডি দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenOrderModal}
                  className="text-xs font-bold text-[#8E6A2F] hover:underline cursor-pointer"
                >
                  সম্পূর্ণ বইটি পড়ুন →
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
