"use client";

import React, { useState } from "react";
import { Lightbulb, Eye, CheckCircle, ArrowRight } from "lucide-react";

interface PowerLessonProps {
  onOpenOrderModal: () => void;
}

export default function PowerLesson({ onOpenOrderModal }: PowerLessonProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section className="relative bg-[#F5EFE4] text-stone-900 py-16 sm:py-24 border-b border-[#E2D5BA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE0CD] border border-[#D5C7A8] text-[#7A5B22] text-xs font-bold tracking-wider uppercase">
            <Lightbulb className="w-3.5 h-3.5 text-[#8C6B2A]" />
            <span>এক মিনিটের মনস্তাত্ত্বিক পাঠ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bengali-serif font-bold text-[#141518]">
            বাস্তব কেস স্টাডি ও Power Lesson
          </h2>
          <p className="text-[#5A5C64] text-xs sm:text-sm">
            দৈনন্দিন সামাজিক ও পেশাদার জীবনের একটি বাস্তব পরিস্থিতি বিশ্লেষণ করুন
          </p>
        </div>

        {/* Interactive Scenario Card */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#DFCFA8] shadow-md space-y-6">
          
          {/* Situation Box */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#7A5B22] text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#C59B4B]" />
              <span>বাস্তব পরিস্থিতি:</span>
            </div>
            <p className="text-base sm:text-lg text-[#202124] font-bengali-serif leading-relaxed italic bg-white p-5 sm:p-6 rounded-2xl border-l-4 border-[#C59B4B] shadow-2xs">
              &ldquo;আপনি এমন একজনের সঙ্গে কাজ করছেন যিনি আপনার চেয়ে senior। আপনি জানেন আপনার idea ভালো। কিন্তু meeting-এ সেটি এমনভাবে উপস্থাপন করলেন যাতে সবাই বুঝতে পারে আপনি তার চেয়ে বেশি capable।&rdquo;
            </p>
          </div>

          {/* Question */}
          <div className="pt-2">
            <p className="text-base sm:text-lg font-bold text-[#141518] flex items-center gap-2">
              <span>এখানে সমস্যা কোথায় হতে পারে?</span>
            </p>
          </div>

          {/* Reveal Button / Answer */}
          {!isRevealed ? (
            <div className="pt-2 text-center sm:text-left">
              <button
                onClick={() => setIsRevealed(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#18191D] hover:bg-[#282A33] text-[#E6C67E] font-bold text-xs sm:text-sm shadow-md transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#C59B4B]" />
                <span>কৌশলগত বিশ্লেষণ ও সমাধান দেখুন</span>
              </button>
            </div>
          ) : (
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#D5C7A8] space-y-4 animate-fadeIn shadow-xs">
              <div className="flex items-start gap-3.5">
                <CheckCircle className="w-5 h-5 text-[#8C6B2A] shrink-0 mt-1" />
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-[#141518] text-base sm:text-lg">
                    রবার্ট গ্রিনের বিশ্লেষণ (Law 1):
                  </h4>
                  <p className="text-[#3E4048] text-sm sm:text-base leading-[1.8]">
                    &ldquo;যোগ্যতা দেখানো এবং কাউকে প্রকাশ্যে outshine করা এক জিনিস নয়। আপনার সুপিরিয়র যখন নিরাপত্তাহীনতায় ভোগেন, তখন আপনার ভালো আইডিয়াও বাতিল হয়ে যেতে পারে। Power dynamics বুঝতে পারলে একই আইডিয়া এমনভাবে উপস্থাপন করা সম্ভব যাতে কৃতিত্ব সিনিয়র পান, কিন্তু কৌশলগত নিয়ন্ত্রণ ও মূল উদ্দেশ্য আপনার হাতেই থাকে।&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EFE8DA] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-semibold text-[#7A5B22]">
                  এমন আরও ৪৮টি বাস্তব principle জানতে বইটি পড়ুন।
                </span>
                <button
                  onClick={onOpenOrderModal}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#121316] hover:text-[#8C6B2A] transition-colors cursor-pointer"
                >
                  <span>বইটি সংগ্রহ করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
