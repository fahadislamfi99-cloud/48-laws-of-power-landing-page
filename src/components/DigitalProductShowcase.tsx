"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Download, ZoomIn, X, Coffee, Sun, Moon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";

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
  const parallaxRef = useParallax<HTMLDivElement>(0.12);

  const samplePages = [
    {
      id: 0,
      lawNum: "LAW 01",
      title: "মাস্টার বা শীর্ষ ব্যক্তিকে কখনো নিজের চেয়ে বেশি উজ্জ্বল দেখাবেন না",
      titleEn: "Never Outshine the Master",
      page: "পৃষ্ঠা ৩৩",
      excerpt: (
        <div className="space-y-4 font-bengali-serif leading-[1.85] text-sm sm:text-base">
          <div className="italic bg-white/[0.04] p-5 rounded-2xl border border-[#2A2A30] text-[#F5F0E6] shadow-sm relative">
            <span className="text-xs font-mono text-[#C8A45C] font-bold block mb-1 uppercase tracking-wider">মূল ভাব:</span>
            &ldquo;বিচারবুদ্ধি ও ক্ষমতার মূল রহস্য হলো ভারসাম্য। আপনার ওপরস্থ ব্যক্তিদের সর্বদা স্বাচ্ছন্দ্য ও শ্রেষ্ঠত্বের অনুভূতি দিন। তাদের খুশি করার অতি-উৎসাহে নিজের প্রতিভার অতিরিক্ত প্রদর্শন করবেন না...&rdquo;
          </div>
          <p>
            ইতিহাস সাক্ষ্য দেয়, রাজা চতুর্দশ লুইয়ের অর্থমন্ত্রী নিকোলাস ফুকেট এক বর্ণাঢ্য ভোজের আয়োজন করে রাজাকে প্রভাবিত করতে চেয়েছিলেন। কিন্তু তিনি বুঝতে পারেননি যে, রাজাকে ছাপিয়ে নিজের প্রতিপত্তি প্রদর্শনের অর্থ হলো রাজার অহং ও নিরাপত্তাহীনতায় আঘাত করা।
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
        <div className="space-y-4 font-bengali-serif leading-[1.85] text-sm sm:text-base">
          <div className="italic bg-white/[0.04] p-5 rounded-2xl border border-[#2A2A30] text-[#F5F0E6] shadow-sm relative">
            <span className="text-xs font-mono text-[#C8A45C] font-bold block mb-1 uppercase tracking-wider">মূল ভাব:</span>
            &ldquo;মানুষকে কখনোই আগে থেকে বুঝতে দেবেন না আপনার আসল লক্ষ্য কী। তারা যদি আপনার গন্তব্য না জানে, তবে তারা কোনো প্রতিরক্ষাও গড়ে তুলতে পারবে না...&rdquo;
          </div>
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
        <div className="space-y-4 font-bengali-serif leading-[1.85] text-sm sm:text-base">
          <div className="italic bg-white/[0.04] p-5 rounded-2xl border border-[#2A2A30] text-[#F5F0E6] shadow-sm relative">
            <span className="text-xs font-mono text-[#C8A45C] font-bold block mb-1 uppercase tracking-wider">মূল ভাব:</span>
            &ldquo;কোনো অনমনীয় বা চিরস্থায়ী আকার ধারণ করবেন না। পরিবেশ ও বাস্তবতার পরিবর্তনের সাথে সাথে নিজেকে নতুন আকারে রূপ দিন। যা অতিরিক্ত শক্ত, তা ঝড়ে ভেঙে পড়ে; যা পানির মতো নমনীয়, তা চিরকাল টিকে থাকে...&rdquo;
          </div>
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
        return "bg-[#1C1C20] text-[#F5F0E6]";
      case "dark":
        return "bg-[#08080A] text-[#C4BCB0]";
      case "sepia":
      default:
        return "bg-[#141210] text-[#E0D4BE]";
    }
  };

  return (
    <section
      id="digital-preview"
      ref={containerRef}
      className="py-14 lg:py-20 bg-[#0C0C0F] border-t border-[#26262A]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 reveal">
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1.5px] w-8 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#C8A45C] uppercase">
              DIGITAL PDF PREVIEW
            </span>
            <div className="h-[1.5px] w-8 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F5F0E6] leading-[1.25]">
            বইটির ভেতর এক নজর দেখে নিন
          </h2>
          <p className="text-[#C4BCB0] text-base sm:text-lg leading-[1.8]">
            ৪৫২ পৃষ্ঠার সম্পূর্ণ বাংলা অনুবাদ। প্রতিটি পৃষ্ঠা যেকোনো ডিভাইসে পড়ার জন্য ক্রিস্টাল ক্লিয়ার টাইপসেটিংয়ে সাজানো।
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-1 scrollbar-none reveal reveal-stagger-1">
          {samplePages.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer whitespace-nowrap hover-lift ${
                activeTab === idx
                  ? "bg-[#C8A45C] text-[#08080A] shadow-[0_0_20px_rgba(200,164,92,0.3)]"
                  : "bg-[#111114] text-[#C4BCB0] border border-[#26262A] hover:border-[#C8A45C]/40"
              }`}
            >
              {page.lawNum}
            </button>
          ))}
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left: Book Photo with Parallax */}
          <div className="lg:col-span-5 flex justify-center reveal reveal-left reveal-stagger-2">
            <div
              ref={parallaxRef}
              className="rounded-3xl overflow-hidden border border-[#26262A] bg-[#111114] max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] w-full group transition-all duration-500 hover:border-[#C8A45C]/40 hover:shadow-[0_0_40px_rgba(200,164,92,0.12)] shadow-xl"
            >
              <img
                src="/images/book-open.jpg"
                alt="The 48 Laws of Power Bengali Edition Reading"
                className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-103"
              />
              <div className="p-4 bg-[#08080A] text-[#C4BCB0] text-xs font-mono flex items-center justify-between border-t border-[#26262A]">
                <span>সম্পূর্ণ ৪৫২ পৃষ্ঠা</span>
                <span className="text-[#C8A45C] font-bold">সার্চেবল PDF সংস্করণ</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Reader Sandbox */}
          <div className="lg:col-span-7 reveal reveal-right reveal-stagger-3">
            <div className="bg-[#111114] rounded-3xl border border-[#26262A] overflow-hidden transition-all duration-300 hover:border-[#C8A45C]/25 shadow-xl">
              
              {/* Reader Controls Bar */}
              <div className="p-4 sm:p-5 bg-[#08080A] border-b border-[#26262A] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-mono text-[#9E968B]">
                  <span className="font-bold text-[#C8A45C]">{samplePages[activeTab].lawNum}</span>
                  <span className="text-[#26262A]">•</span>
                  <span>{samplePages[activeTab].page} / ৪৫২</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#111114] p-1 rounded-full border border-[#26262A]">
                  {[
                    { theme: "sepia" as const, Icon: Coffee, label: "Sepia" },
                    { theme: "light" as const, Icon: Sun, label: "Light" },
                    { theme: "dark" as const, Icon: Moon, label: "Dark" },
                  ].map(({ theme, Icon, label }) => (
                    <button
                      key={theme}
                      onClick={() => setReaderTheme(theme)}
                      aria-label={label}
                      className={`p-1.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${
                        readerTheme === theme
                          ? "bg-[#C8A45C]/20 text-[#C8A45C] shadow-2xs"
                          : "text-[#9E968B] hover:text-[#C4BCB0]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Reader Content Body */}
              <div className={`p-6 sm:p-8 theme-transition min-h-[300px] ${getThemeClass()}`}>
                <div key={activeTab} className="space-y-4 animate-fadeIn">
                  <div className="border-b pb-3.5 border-white/10">
                    <span className="text-xs font-mono font-bold text-[#C8A45C] uppercase tracking-wider block">
                      {samplePages[activeTab].titleEn}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold mt-1.5 leading-snug text-[#F5F0E6]">
                      {samplePages[activeTab].title}
                    </h3>
                  </div>
                  {samplePages[activeTab].excerpt}
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 sm:p-5 bg-[#08080A] border-t border-[#26262A] flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setIsLightbox(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8A45C] hover:text-[#DFC07A] hover:underline cursor-pointer transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>বড় করে পড়ুন</span>
                </button>

                <button
                  onClick={onOpenOrderModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full btn-gold text-xs font-bold cursor-pointer hover-lift btn-shimmer group"
                >
                  <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span>সম্পূর্ণ কপি ডাউনলোড করুন ({siteConfig.currencySymbol}{siteConfig.price})</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightbox && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative bg-[#111114] max-w-2xl w-full rounded-3xl p-6 sm:p-10 max-h-[85vh] overflow-y-auto border border-[#C8A45C]/35 shadow-2xl animate-scaleIn">
            <button
              onClick={() => setIsLightbox(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#18181C] hover:bg-[#26262A] text-[#C4BCB0] hover:text-[#F5F0E6] transition-colors cursor-pointer hover:rotate-90"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4 pt-2">
              <span className="text-xs font-mono font-bold text-[#C8A45C] uppercase">
                {samplePages[activeTab].titleEn}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#F5F0E6] leading-snug">
                {samplePages[activeTab].title}
              </h3>
              <div className="text-[#C4BCB0] pt-2">
                {samplePages[activeTab].excerpt}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
