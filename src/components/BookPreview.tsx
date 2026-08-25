"use client";

import React, { useState } from "react";
import { BookOpen, ZoomIn, X, ChevronRight, Sparkles, Smartphone, Tablet, Monitor, Download } from "lucide-react";

interface BookPreviewProps {
  onOpenOrderModal: () => void;
}

export default function BookPreview({ onOpenOrderModal }: BookPreviewProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const previewPages = [
    {
      id: 0,
      title: "নীতি ১: সুপিরিয়রের মনস্তত্ত্ব",
      subtitle: "Never Outshine the Master",
      pageNumber: "পৃষ্ঠা ৩৩",
      content: (
        <div className="space-y-4 font-bengali-serif text-[#2C2D32] leading-[1.8] text-sm sm:text-base">
          <div className="text-center pb-3 border-b border-[#EFE8DA]">
            <span className="text-[10px] tracking-[0.2em] text-[#8C6B2A] font-mono font-bold uppercase">
              LAW 01 • ডিজিটাল সংস্করণ
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-[#141518] mt-1">
              কখনও মাস্টার বা শীর্ষ ব্যক্তির চেয়ে বেশি উজ্জ্বল দেখাবেন না
            </h4>
          </div>
          <p className="italic text-[#553E17] bg-[#FAF6EE] p-4 rounded-xl border-l-3 border-[#C59B4B]">
            &ldquo;বিচারশক্তি ও ক্ষমতার মূল ভিত্তি হলো ভারসাম্য। সর্বদা আপনার ওপরস্থ ব্যক্তিদের স্বাচ্ছন্দ্য ও শ্রেষ্ঠত্বের অনুভূতি দিন। তাদের খুশি করতে গিয়ে অতিরিক্ত নিজের প্রতিভা প্রদর্শন করবেন না...&rdquo;
          </p>
          <p>
            ইতিহাস সাক্ষ্য দেয়, নিকোলাস ফুকেট (Nicolas Fouquet) ফ্রান্সের রাজা চতুর্দশ লুইকে মুগ্ধ করার জন্য তৎকালীন পৃথিবীর সবচেয়ে বিলাসবহুল রাজপ্রাসাদে এক বিশাল ভোজসভার আয়োজন করেছিলেন। তিনি ভেবেছিলেন এই জাঁকজমক রাজাকে তার প্রতি কৃতজ্ঞ করবে।
          </p>
          <p>
            কিন্তু ফল হয়েছিল উল্টো। রাজা লুই নিজের চেয়ে ফুকেটকে বেশি বিত্তশালী ও প্রভাবশালী দেখে তীব্র নিরাপত্তাহীনতায় ভোগেন। পরদিন সকালেই ফুকেটকে গ্রেপ্তার করে আজীবন কারাদণ্ডে নিক্ষেপ করা হয়।
          </p>
          <div className="pt-2 text-xs font-sans text-[#7A5B22] font-semibold">
            ★ মূল শিক্ষা: শ্রেষ্ঠত্ব প্রকাশ করার চেয়ে সুপিরিয়রের অহংকে নিরাপদ রাখা অনেক বেশি কৌশলগত বুদ্ধিমত্তা।
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "নীতি ৪: নীরবতার ক্ষমতা",
      subtitle: "Always Say Less Than Necessary",
      pageNumber: "পৃষ্ঠা ৫৮",
      content: (
        <div className="space-y-4 font-bengali-serif text-[#2C2D32] leading-[1.8] text-sm sm:text-base">
          <div className="text-center pb-3 border-b border-[#EFE8DA]">
            <span className="text-[10px] tracking-[0.2em] text-[#8C6B2A] font-mono font-bold uppercase">
              LAW 04 • ডিজিটাল সংস্করণ
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-[#141518] mt-1">
              প্রয়োজনের চেয়ে সর্বদা কম কথা বলুন
            </h4>
          </div>
          <p className="italic text-[#553E17] bg-[#FAF6EE] p-4 rounded-xl border-l-3 border-[#C59B4B]">
            &ldquo;যখন আপনি কথা দিয়ে কাউকে মুগ্ধ করার চেষ্টা করবেন, আপনি যত বেশি কথা বলবেন তত বেশি সাধারণ মনে হবে এবং নিজের নিয়ন্ত্রণ হারানোর সম্ভাবনা বাড়বে...&rdquo;
          </p>
          <p>
            ক্ষমতাবান মানুষ অল্প কথা বলে অন্যদের ওপর এক ধরণের মনস্তাত্ত্বিক চাপ সৃষ্টি করে। নীরবতা মানুষকে অস্বস্তিতে ফেলে দেয়। যখন আপনি চুপ থাকবেন, অন্য ব্যক্তি সেই নীরবতা ভাঙার জন্য নিজেই অতিরিক্ত কথা বলতে শুরু করবে এবং তার গোপন উদ্দেশ্য ও দুর্বলতা প্রকাশ করে ফেলবে।
          </p>
          <div className="pt-2 text-xs font-sans text-[#7A5B22] font-semibold">
            ★ মূল শিক্ষা: কথা হলো তীরের মতো; একবার মুখ থেকে বের হয়ে গেলে আর ফিরিয়ে নেওয়া যায় না।
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "নীতি ৫: সুনামের সুরক্ষা",
      subtitle: "So Much Depends on Reputation",
      pageNumber: "পৃষ্ঠা ৮২",
      content: (
        <div className="space-y-4 font-bengali-serif text-[#2C2D32] leading-[1.8] text-sm sm:text-base">
          <div className="text-center pb-3 border-b border-[#EFE8DA]">
            <span className="text-[10px] tracking-[0.2em] text-[#8C6B2A] font-mono font-bold uppercase">
              LAW 05 • ডিজিটাল সংস্করণ
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-[#141518] mt-1">
              সুনাম জীবনের চেয়েও মূল্যবান — সতর্ক থাকুন
            </h4>
          </div>
          <p className="italic text-[#553E17] bg-[#FAF6EE] p-4 rounded-xl border-l-3 border-[#C59B4B]">
            &ldquo;ক্ষমতার খেলা একাকী শক্তির ওপর নয়, বরং আপনার সম্পর্কে মানুষের ধারণার ওপর প্রতিষ্ঠিত। একটি শক্ত সুনাম আপনাকে লড়াই ছাড়াই অর্ধেক জয় এনে দিতে পারে...&rdquo;
          </p>
          <p>
            সুনাম হলো এক অদৃশ্য বর্ম। একবার এতে ফাটল ধরলে চারপাশ থেকে আক্রমণ শুরু হবে। তাই সর্বদা নিজের সততা, দক্ষতা ও ভাবমূর্তি নিয়ে সচেতন থাকুন এবং অন্যের পাতা ফাঁদে পা দেবেন না।
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-[#FAF8F5] text-stone-900 py-20 lg:py-28 border-b border-[#E8DFCF]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8C6B2A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>ডিজিটাল রিডিং এক্সপেরিয়েন্স</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#16171A]">
            যেভাবে ডিজিটাল পিডিএফ-এ বইটি পড়বেন
          </h2>
          <p className="text-[#5A5C64] text-sm sm:text-base">
            মোবাইল, ট্যাবলেট কিংবা ল্যাপটপে পড়ার জন্য বিশেষভাবে ফরম্যাটকৃত ক্রিস্টাল ক্লিয়ার টাইপসেটিং
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-10 overflow-x-auto pb-2">
          {previewPages.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === idx
                  ? "bg-[#18191D] text-[#E6C67E] shadow-md scale-105 border border-[#C59B4B]/50"
                  : "bg-white border border-[#D5C7A8] text-stone-700 hover:bg-[#FAF6EE]"
              }`}
            >
              {page.title}
            </button>
          ))}
        </div>

        {/* 2-Column: Digital Mockup on left + Live reading page on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Device Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#DFCFA8] group max-w-[340px]">
              <img
                src="/images/digital-mockup.jpg"
                alt="Digital Reading on Tablet and Phone"
                className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 text-white">
                <div className="space-y-1">
                  <span className="text-xs font-serif text-[#E6C67E] font-bold block">
                    যেকোনো ডিভাইসে তাৎক্ষণিক পড়ার উপযোগী
                  </span>
                  <span className="text-[11px] text-stone-300 block">
                    হাই-রেজোলিউশন ফন্ট ও জুম সাপোর্ট
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Reading Page Box */}
          <div className="lg:col-span-7">
            <div className="relative bg-white rounded-3xl p-7 sm:p-9 border border-[#E5DCBE] shadow-md">
              {/* Page Header with PDF badges */}
              <div className="flex justify-between items-center text-xs font-mono text-[#8C6B2A] pb-4 mb-4 border-b border-[#EFE8DA]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>The 48 Laws of Power (ডিজিটাল পিডিএফ)</span>
                </div>
                <span>{previewPages[activeTab].pageNumber} / ৪৫২</span>
              </div>

              {/* Page Content */}
              {previewPages[activeTab].content}

              {/* Action Bar */}
              <div className="pt-6 mt-6 border-t border-[#EFE8DA] flex items-center justify-between">
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6B2A] hover:text-[#553E17] transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>বড় করে পড়ুন</span>
                </button>

                <button
                  onClick={onOpenOrderModal}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#18191D] hover:bg-[#282A33] text-[#E6C67E] font-bold text-xs shadow-xs transition-all cursor-pointer border border-[#C59B4B]/40"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>সম্পূর্ণ পিডিএফ ডাউনলোড করুন</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-[#FAF8F5] max-w-3xl w-full rounded-3xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#C59B4B]">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pr-6">
              {previewPages[activeTab].content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
