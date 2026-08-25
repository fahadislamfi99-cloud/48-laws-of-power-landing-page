"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import {
  Download,
  Smartphone,
  Search,
  BookOpen,
  ZoomIn,
  X,
  Coffee,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface DigitalProductShowcaseProps {
  onOpenOrderModal: () => void;
}

export default function DigitalProductShowcase({
  onOpenOrderModal,
}: DigitalProductShowcaseProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [readerTheme, setReaderTheme] = useState<"sepia" | "light" | "dark">("sepia");
  const [isLightbox, setIsLightbox] = useState(false);
  const containerRef = useScrollReveal<HTMLElement>();

  const samplePages = [
    {
      id: 0,
      lawNum: "LAW 01",
      title: "মাস্টার বা শীর্ষ ব্যক্তিকে কখনো নিজের চেয়ে বেশি উজ্জ্বল দেখাবেন না",
      titleEn: "Never Outshine the Master",
      page: "পৃষ্ঠা ৩৩",
      excerpt: (
        <div className="space-y-4 font-bengali-serif leading-relaxed text-sm sm:text-base">
          <p className="italic bg-black/5 dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#8F6B2C]">
            &ldquo;বিচারবুদ্ধি ও ক্ষমতার মূল রহস্য হলো ভারসাম্য। আপনার ওপরস্থ ব্যক্তিদের সর্বদা স্বাচ্ছন্দ্য ও শ্রেষ্ঠত্বের অনুভূতি দিন। তাদের খুশি করার অতি-উৎসাহে নিজের প্রতিভার অতিরিক্ত প্রদর্শন করবেন না...&rdquo;
          </p>
          <p>
            ইতিহাস সাক্ষ্য দেয়, রাজা চতুর্দশ লুইয়ের অর্থমন্ত্রী নিকোলাস ফুকেট এক বর্ণাঢ্য ভোজের আয়োজন করে রাজাকে প্রভাবিত করতে চেয়েছিলেন। কিন্তু তিনি বুঝতে পারেননি—রাজাকে ছাপিয়ে নিজের প্রতিপত্তি প্রদর্শনের অর্থ হলো রাজার অহং ও নিরাপত্তাহীনতায় আঘাত করা।
          </p>
          <p>
            ফলাফল: ভোজসভা শেষ হওয়ার পরদিনই ফুকেটকে গ্রেপ্তার করে আজীবন নিঃসঙ্গ কারাবন্দী করা হয়।
          </p>
        </div>
      ),
    },
    {
      id: 1,
      lawNum: "LAW 03",
      title: "নিজের আসল উদ্দেশ্য ও পরিকল্পনা সবসময় গোপন রাখুন",
      titleEn: "Conceal Your Intentions",
      page: "পৃষ্ঠা ৫৪",
      excerpt: (
        <div className="space-y-4 font-bengali-serif leading-relaxed text-sm sm:text-base">
          <p className="italic bg-black/5 dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#8F6B2C]">
            &ldquo;মানুষকে কখনোই আগে থেকে বুঝতে দেবেন না আপনার আসল লক্ষ্য কী। তারা যদি আপনার গন্তব্য না জানে, তবে তারা কোনো প্রতিরক্ষাও গড়ে তুলতে পারবে না...&rdquo;
          </p>
          <p>
            কূটনীতিকরা সবসময় এমন সহজ-সরল ও নিরপেক্ষ আচরণ বজায় রাখতেন যাতে বিরোধীরা ভাবত তাদের কোনো গোপন পরিকল্পনা নেই। মানুষের স্বভাব হলো মুখের কথা বিশ্বাস করা। তাই আপাতদৃষ্টিতে সাধারণ পথ প্রদর্শন করে আসল উদ্দেশ্যকে নিরাপদ দূরত্বে রাখাই হলো বিজয়ের রহস্য।
          </p>
        </div>
      ),
    },
    {
      id: 2,
      lawNum: "LAW 48",
      title: "পানির মতো রূপহীন ও অভিযোজনক্ষম হোন",
      titleEn: "Assume Formlessness",
      page: "পৃষ্ঠা ৪৩২",
      excerpt: (
        <div className="space-y-4 font-bengali-serif leading-relaxed text-sm sm:text-base">
          <p className="italic bg-black/5 dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#8F6B2C]">
            &ldquo;কোনো অনমনীয় বা চিরস্থায়ী আকার ধারণ করবেন না। পরিবেশ ও বাস্তবতার পরিবর্তনের সাথে সাথে নিজেকে নতুন আকারে রূপ দিন। যা অতিরিক্ত শক্ত, তা ঝড়ে ভেঙে পড়ে; যা পানির মতো নমনীয়, তা চিরকাল টিকে থাকে...&rdquo;
          </p>
          <p>
            ক্ষমতার খেলায় যেকোনো নির্দিষ্ট ছক বা নিয়মের ওপর অতিরিক্ত নির্ভরশীল হওয়া সবচেয়ে বড় ঝুঁকি। যখন আপনার কোনো নির্দিষ্ট আক্রমণযোগ্য আকার থাকবে না, তখন শত্রুরা আপনাকে লক্ষ্য করে কোনো সুনির্দিষ্ট আক্রমণ চালাতে পারবে না।
          </p>
        </div>
      ),
    },
  ];

  const getThemeClass = () => {
    switch (readerTheme) {
      case "light":
        return "bg-white text-[#121316]";
      case "dark":
        return "bg-[#141518] text-[#E8E5DD]";
      case "sepia":
      default:
        return "bg-[#F7F2E7] text-[#2C271F]";
    }
  };

  return (
    <section
      id="digital-preview"
      ref={containerRef}
      className="py-20 lg:py-28 border-b border-[#E6E0D4] bg-[#F7F5EE]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 reveal">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8F6B2C] uppercase block">
            DIGITAL PDF PREVIEW
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#121316]">
            বইটির ভেতর এক নজর দেখে নিন
          </h2>
          <p className="text-[#52555E] text-base sm:text-lg">
            ৪৫২ পৃষ্ঠার সম্পূর্ণ বাংলা অনুবাদ। প্রতিটি পৃষ্ঠা যেকোনো ডিভাইসে পড়ার জন্য ক্রিস্টাল ক্লিয়ার টাইপসেটিংয়ে সাজানো।
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-1 scrollbar-none reveal reveal-stagger-1">
          {samplePages.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap hover-lift active-lift ${
                activeTab === idx
                  ? "bg-[#121316] text-[#FAF8F5] shadow-sm scale-102"
                  : "bg-white text-stone-600 border border-[#D8D0C3] hover:bg-[#FAF8F5]"
              }`}
            >
              {page.lawNum}
            </button>
          ))}
        </div>

        {/* 2-Column: Left Book Photography, Right Interactive Reader Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Enlarged Authentic Book Photography */}
          <div className="lg:col-span-5 flex justify-center reveal reveal-stagger-2">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#D8D0C3] bg-white max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] w-full group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(18,19,22,0.15)] hover:-translate-y-1">
              <img
                src="/images/book-open.jpg"
                alt="The 48 Laws of Power Bengali Edition Reading"
                className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-103"
              />
              <div className="p-4 bg-[#121316] text-[#FAF8F5] text-xs font-mono flex items-center justify-between transition-colors duration-300 group-hover:bg-[#1d1f24]">
                <span>সম্পূর্ণ ৪৫২ পৃষ্ঠা</span>
                <span className="text-[#DFC07A]">সার্চেবল PDF সংস্করণ</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Reader Sandbox */}
          <div className="lg:col-span-7 reveal reveal-stagger-3">
            <div className="bg-white rounded-3xl border border-[#D8D0C3] shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              
              {/* Reader Controls Bar */}
              <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E6E0D4] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-mono text-stone-600">
                  <span className="font-bold text-[#121316]">{samplePages[activeTab].lawNum}</span>
                  <span>•</span>
                  <span>{samplePages[activeTab].page} / ৪৫২</span>
                </div>

                {/* Theme Toggles */}
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-[#D8D0C3]">
                  <button
                    onClick={() => setReaderTheme("sepia")}
                    title="সেপিয়া থিম"
                    className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${
                      readerTheme === "sepia" ? "bg-[#F7F2E7] text-[#8F6B2C] shadow-2xs font-bold" : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    <Coffee className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setReaderTheme("light")}
                    title="লাইট থিম"
                    className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${
                      readerTheme === "light" ? "bg-stone-100 text-stone-900 shadow-2xs font-bold" : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setReaderTheme("dark")}
                    title="ডার্ক থিম"
                    className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${
                      readerTheme === "dark" ? "bg-[#141518] text-[#DFC07A] shadow-2xs font-bold" : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Reader Document View with Smooth Cross-Fade */}
              <div className={`p-6 sm:p-8 theme-transition ${getThemeClass()}`}>
                <div key={activeTab} className="space-y-4 animate-fadeIn">
                  <div className="border-b pb-3 border-current/15">
                    <span className="text-xs font-mono font-bold text-[#8F6B2C] uppercase tracking-wider block">
                      {samplePages[activeTab].titleEn}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold mt-1 leading-snug">
                      {samplePages[activeTab].title}
                    </h3>
                  </div>

                  {samplePages[activeTab].excerpt}
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 sm:p-5 bg-[#FAF8F5] border-t border-[#E6E0D4] flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setIsLightbox(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8F6B2C] hover:text-[#6E511D] hover:underline cursor-pointer transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>বড় করে পড়ুন</span>
                </button>

                <button
                  onClick={onOpenOrderModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#121316] hover:bg-[#25272F] text-[#FAF8F5] font-bold text-xs shadow-xs transition-all cursor-pointer hover-lift btn-shimmer active-lift group"
                >
                  <Download className="w-3.5 h-3.5 text-[#DFC07A] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span>সম্পূর্ণ কপি ডাউনলোড করুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative bg-[#FAF8F5] max-w-2xl w-full rounded-3xl p-6 sm:p-10 max-h-[85vh] overflow-y-auto border border-[#8F6B2C] shadow-2xl animate-scaleIn">
            <button
              onClick={() => setIsLightbox(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4 pt-2">
              <span className="text-xs font-mono font-bold text-[#8F6B2C] uppercase">
                {samplePages[activeTab].titleEn}
              </span>
              <h3 className="text-2xl font-bengali-serif font-bold text-[#121316]">
                {samplePages[activeTab].title}
              </h3>
              {samplePages[activeTab].excerpt}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
