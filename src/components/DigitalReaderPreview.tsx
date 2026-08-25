"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import {
  BookOpen,
  Download,
  Sun,
  Moon,
  Coffee,
  Type,
  ChevronLeft,
  ChevronRight,
  Search,
  Bookmark,
  Sparkles,
} from "lucide-react";

interface DigitalReaderPreviewProps {
  onOpenOrderModal: () => void;
}

interface ChapterExcerpt {
  id: number;
  lawNumber: string;
  titleEn: string;
  titleBn: string;
  page: number;
  epigraph: string;
  historicalCase: {
    title: string;
    text: string;
  };
  strategicRule: string;
  modernApplication: string;
}

const excerpts: ChapterExcerpt[] = [
  {
    id: 1,
    lawNumber: "LAW 01",
    titleEn: "Never Outshine the Master",
    titleBn: "মাস্টার বা শীর্ষ ব্যক্তিকে কখনো নিজের চেয়ে বেশি উজ্জ্বল দেখাবেন না",
    page: 33,
    epigraph: "সর্বদা আপনার ওপরের লোকদের স্বাচ্ছন্দ্য এবং শ্রেষ্ঠত্বের অনুভূতি দিন। তাদের সন্তুষ্ট করার চেষ্টায় নিজের প্রতিভাকে এমনভাবে প্রদর্শন করবেন না যাতে তারা নিরাপত্তাহীনতায় ভোগেন।",
    historicalCase: {
      title: "নিকোলাস ফুকেট ও রাজা চতুর্দশ লুই (ফ্রান্স, ১৬৬১)",
      text: "ফ্রান্সের অর্থমন্ত্রী নিকোলাস ফুকেট তৎকালীন পৃথিবীর সবচেয়ে বিলাসবহুল ভোজসভার আয়োজন করে রাজা লুইকে মুগ্ধ করতে চেয়েছিলেন। কিন্তু রাজাকে ছাপিয়ে নিজের ধনসম্পদ ও আভিজাত্য প্রদর্শনের ফলে রাজা লুই নিরাপত্তাহীনতায় ভোগেন। পরদিনই ফুকেটকে গ্রেপ্তার করে আজীবন কারাদণ্ডে পাঠানো হয়।",
    },
    strategicRule: "ক্ষমতাবান মানুষ নিরাপত্তাহীনতায় ভুগলে সবচেয়ে নির্মম প্রতিক্রিয়া দেখায়। আপনার কাজ হলো তাদের কর্তৃত্বের আলো বজায় রাখা, নিজের ঔজ্জ্বল্য লুকিয়ে রাখা।",
    modernApplication: "কর্মক্ষেত্রে বসের সামনে এমনভাবে আইডিয়া উপস্থাপন করুন যাতে কৃতিত্ব তাদের মনে হয়, কিন্তু মূল চালিকাশক্তি থাকে আপনার হাতে।",
  },
  {
    id: 3,
    lawNumber: "LAW 03",
    titleEn: "Conceal Your Intentions",
    titleBn: "নিজের আসল উদ্দেশ্য ও পরিকল্পনা সবসময় গোপন রাখুন",
    page: 54,
    epigraph: "মানুষকে কখনই বুঝতে দেবেন না আপনার পরবর্তী পদক্ষেপ কী। তারা যদি আপনার উদ্দেশ্য না জানে, তবে তারা কোনো প্রতিরক্ষাও তৈরি করতে পারবে না।",
    historicalCase: {
      title: "কুটনীতিক চার্লস মোরিস ডি ট্যালিরান্ড (ফ্রান্স)",
      text: "ফরাসি কূটনীতিক ট্যালিরান্ড সবসময় এমন শান্ত ও অনুভূতিহীন মুখমণ্ডল রাখতেন যাতে কেউ তার মনের কথা বুঝতে না পারে। তিনি এমন কথা বলতেন যা শুনতে একরকম কিন্তু অর্থ অন্যরকম—যার ফলে শত্রুরা বিভ্রান্ত হয়ে ভুল চাল দিত।",
    },
    strategicRule: "স্পষ্টবাদিতা অনেক সময় দুর্বলতার লক্ষণ। আপনার পরিকল্পনা যত বেশি প্রকাশ্যে আসবে, বিরোধীরা তত আগে থেকে ফাঁদ পাতবে।",
    modernApplication: "ব্যবসা বা সমঝোতায় নিজের চূড়ান্ত লক্ষ্য কখনোই টেবিলের ওপর রাখবেন না; আপাতদৃষ্টিতে সাধারণ পথ অনুসরণ করুন।",
  },
  {
    id: 4,
    lawNumber: "LAW 04",
    titleEn: "Always Say Less Than Necessary",
    titleBn: "প্রয়োজনের চেয়ে সর্বদা কম কথা বলুন",
    page: 72,
    epigraph: "যখন আপনি কথা দিয়ে কাউকে মুগ্ধ করার চেষ্টা করবেন, আপনি যত বেশি বলবেন তত সাধারণ মনে হবে। ক্ষমতাবান মানুষ কম কথা বলে অন্যদের ওপর মনস্তাত্ত্বিক চাপ সৃষ্টি করে।",
    historicalCase: {
      title: "রোমান সেনাপতি ও সম্রাটদের নীরবতা",
      text: "প্রাচীন রোমে বিজ্ঞ শাসকরা জটিল মিটিংয়ে নীরব থাকতেন। তাদের দীর্ঘ নীরবতায় উপস্থিত সভাসদরা অস্বস্তিতে পড়ে অতিরিক্ত কথা বলতে শুরু করত এবং নিজেদের লুকানো স্বার্থ ও গোপন পরিকল্পনা নিজেরাই ফাঁস করে দিত।",
    },
    strategicRule: "কথা একবার মুখ থেকে বের হলে তা আর নিজের থাকে না। নীরবতা আপনার চারপাশে রহস্যের বলয় তৈরি করে।",
    modernApplication: "বিতর্কে নীরব থাকুন। অপরপক্ষ সেই নীরবতা পূরণ করতে গিয়ে এমন তথ্য দিয়ে ফেলবে যা আপনার পক্ষে কাজে লাগবে।",
  },
  {
    id: 15,
    lawNumber: "LAW 15",
    titleEn: "Crush Your Enemy Totally",
    titleBn: "শত্রুকে সম্পূর্ণভাবে পরাজিত করুন; কোনো সুযোগ অবশিষ্ট রাখবেন না",
    page: 148,
    epigraph: "কয়লার আগুন সামান্য জ্বলন্ত থাকলেও তা থেকে পুরো জঙ্গল আবার জ্বলে উঠতে পারে। অর্ধ-পরাজিত শত্রু সবসময় প্রতিশোধের অপেক্ষায় থাকে।",
    historicalCase: {
      title: "চীনা রণকৌশল ও প্রাচীন রাজা উ (চীন)",
      text: "সান জু-এর প্রাচীন সমরবিদ্যায় বলা হয়েছে—শত্রুর ওপর আধিপত্য বিস্তার করতে হলে তার প্রতিশোধ নেওয়ার সব রসদ ধ্বংস করতে হবে। ক্ষমা অনেক সময় কৌশলগত দুর্বলতা হয়ে দাঁড়ায়।",
    },
    strategicRule: "সামাজিক বা ব্যবসায়িক প্রতিযোগিতায় কাউকে আঘাত করে ছেড়ে দেওয়া সবচেয়ে বড় ভুল। সমাধান সবসময় পূর্ণাঙ্গ হওয়া উচিত।",
    modernApplication: "আইনি বা বাণিজ্যিক বিরোধে এমন সুস্পষ্ট সমাধান ও চুক্তি করুন যাতে পরবর্তীতে কোনো পুনরাবৃত্তি না ঘটে।",
  },
  {
    id: 48,
    lawNumber: "LAW 48",
    titleEn: "Assume Formlessness",
    titleBn: "পানির মতো রূপহীন ও অভিযোজনক্ষম হোন",
    page: 432,
    epigraph: "কোনো স্থায়ী আকার ধারণ করবেন না। পরিবেশ ও পরিস্থিতির পরিবর্তনের সাথে সাথে নিজেকে নতুন আকারে রূপ দিন। যা কঠোর, তা ভেঙে পড়ে; যা নমনীয়, তা টিকে থাকে।",
    historicalCase: {
      title: "ব্রুস লি ও মার্শাল আর্টসের দর্শন",
      text: "প্রাচীন তাওইজম এবং ব্রুস লির বিখ্যাত উক্তি: 'Be water, my friend.' পানি যেকোনো পাত্রের রূপ নিতে পারে। পানির কোনো নিজস্ব দুর্বল বিন্দু নেই, তাই পানিকে কোনো অস্ত্র দিয়ে আঘাত করা যায় না।",
    },
    strategicRule: "অতিরিক্ত অনমনীয় নীতি মানুষকে দুর্বল করে দেয়। যে সময়ের সাথে নিজের অবস্থান বদলাতে জানে, সে অপরাজেয়।",
    modernApplication: "ক্যারিয়ার বা ব্যবসায় আকস্মিক সংকটে পুরোনো পদ্ধতি আঁকড়ে না থেকে দ্রুত নতুন নিয়মের সাথে খাপ খাইয়ে নিন।",
  },
];

export default function DigitalReaderPreview({
  onOpenOrderModal,
}: DigitalReaderPreviewProps) {
  const [activeLawIndex, setActiveLawIndex] = useState(0);
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("sepia");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");

  const currentExcerpt = excerpts[activeLawIndex];

  const getThemeClass = () => {
    switch (theme) {
      case "light":
        return "bg-white text-stone-900 border-stone-200";
      case "dark":
        return "bg-[#141518] text-stone-200 border-stone-800";
      case "sepia":
      default:
        return "bg-[#F7F2E7] text-[#2C271F] border-[#DFCFA8]";
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-xs sm:text-sm leading-[1.7]";
      case "lg":
        return "text-base sm:text-lg leading-[1.9]";
      case "base":
      default:
        return "text-sm sm:text-base leading-[1.8]";
    }
  };

  return (
    <section id="interactive-reader" className="py-20 lg:py-28 border-b border-[#E4DED3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8E6A2F] uppercase block">
            INTERACTIVE PDF DEMO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-black tracking-tight text-[#111215]">
            লাইভ ডিজিটাল রিডার প্রিভিউ
          </h2>
          <p className="text-[#555760] text-sm sm:text-base">
            নিচে সরাসরি বইয়ের কিছু নির্বাচিত পাতা পড়ে দেখুন। ফন্ট সাইজ ও থিম পরিবর্তন করে আপনার পছন্দের রিডিং মোড সিলেক্ট করুন।
          </p>
        </div>

        {/* Reader Container */}
        <div className="bg-white rounded-3xl border border-[#D5CDBE] shadow-xl overflow-hidden">
          
          {/* Reader Top Controls Bar */}
          <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E4DED3] flex flex-wrap items-center justify-between gap-4">
            
            {/* Chapter Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {excerpts.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveLawIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeLawIndex === idx
                      ? "bg-[#111215] text-[#DFC07A] shadow-xs"
                      : "bg-white text-stone-600 border border-[#E4DED3] hover:bg-[#F7F5EE]"
                  }`}
                >
                  {item.lawNumber}
                </button>
              ))}
            </div>

            {/* Customizer: Theme & Font */}
            <div className="flex items-center gap-4">
              
              {/* Theme Buttons */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#E4DED3]">
                <button
                  onClick={() => setTheme("sepia")}
                  title="সেপিয়া থিম"
                  className={`p-1.5 rounded-full cursor-pointer transition-colors ${
                    theme === "sepia" ? "bg-[#F7F2E7] text-[#8E6A2F]" : "text-stone-400"
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTheme("light")}
                  title="লাইট থিম"
                  className={`p-1.5 rounded-full cursor-pointer transition-colors ${
                    theme === "light" ? "bg-stone-100 text-stone-900" : "text-stone-400"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  title="ডার্ক থিম"
                  className={`p-1.5 rounded-full cursor-pointer transition-colors ${
                    theme === "dark" ? "bg-[#141518] text-[#DFC07A]" : "text-stone-400"
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Font Size Buttons */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#E4DED3] text-xs font-mono">
                <button
                  onClick={() => setFontSize("sm")}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    fontSize === "sm" ? "bg-[#111215] text-white" : "text-stone-500"
                  }`}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize("base")}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    fontSize === "base" ? "bg-[#111215] text-white" : "text-stone-500"
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("lg")}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    fontSize === "lg" ? "bg-[#111215] text-white" : "text-stone-500"
                  }`}
                >
                  A+
                </button>
              </div>

            </div>

          </div>

          {/* Reader Document Canvas */}
          <div className={`p-6 sm:p-12 transition-colors duration-200 ${getThemeClass()}`}>
            <div className="max-w-2xl mx-auto space-y-8">
              
              {/* Top Page Header */}
              <div className="flex items-center justify-between border-b pb-4 text-xs font-mono opacity-70">
                <span>The 48 Laws of Power (বাংলা অনুবাদ)</span>
                <span>পৃষ্ঠা {currentExcerpt.page} / ৪৫২</span>
              </div>

              {/* Law Title */}
              <div className="text-center space-y-2 py-2">
                <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#8E6A2F]">
                  {currentExcerpt.lawNumber}
                </span>
                <h3 className="text-2xl sm:text-3xl font-editorial-serif font-bold">
                  {currentExcerpt.titleEn}
                </h3>
                <h4 className="text-lg sm:text-xl font-editorial-bengali-serif font-bold text-[#8E6A2F] mt-1">
                  {currentExcerpt.titleBn}
                </h4>
              </div>

              {/* Epigraph Callout */}
              <div className="p-5 rounded-2xl border-l-4 border-[#8E6A2F] bg-black/5 dark:bg-white/5 italic font-editorial-bengali-serif leading-relaxed">
                &ldquo;{currentExcerpt.epigraph}&rdquo;
              </div>

              {/* Historical Anecdote */}
              <div className={`space-y-3 font-editorial-sans ${getFontSizeClass()}`}>
                <h5 className="font-bold text-base font-editorial-bengali-serif flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E6A2F]" />
                  <span>ঐতিহাসিক প্রেক্ষাপট: {currentExcerpt.historicalCase.title}</span>
                </h5>
                <p className="opacity-90">
                  {currentExcerpt.historicalCase.text}
                </p>
              </div>

              {/* Strategic Rule & Modern Takeaway */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/10 dark:border-white/10">
                <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 space-y-1">
                  <span className="text-xs font-mono font-bold uppercase text-[#8E6A2F] block">
                    কৌশলগত নীতি
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                    {currentExcerpt.strategicRule}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 space-y-1">
                  <span className="text-xs font-mono font-bold uppercase text-[#8E6A2F] block">
                    বাস্তব প্রয়োগ
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                    {currentExcerpt.modernApplication}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Reader Bottom Action Bar */}
          <div className="p-5 bg-[#FAF8F5] border-t border-[#E4DED3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#555760]">
              <Bookmark className="w-4 h-4 text-[#8E6A2F]" />
              <span>সম্পূর্ণ বইটিতে ৪৫২ পৃষ্ঠার বিস্তারিত ঐতিহাসিক ঘটনা ও বিশ্লেষণ রয়েছে</span>
            </div>

            <button
              onClick={onOpenOrderModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#111215] hover:bg-[#25272E] text-[#F7F5EE] font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#DFC07A]" />
              <span>সম্পূর্ণ ৪৫২ পৃষ্ঠার PDF ডাউনলোড করুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
