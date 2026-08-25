"use client";

import React from "react";
import { Star, Quote, CheckCircle, Sparkles } from "lucide-react";
import { reviewsList } from "@/data/reviewsData";

export default function AuthorAndReviews() {
  return (
    <section
      id="author-section"
      className="relative bg-[#FAF8F5] text-stone-900 py-16 sm:py-24 border-b border-[#E8DFCF]/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: লেখক সম্পর্কে (About Author) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-serif font-bold uppercase tracking-[0.2em] text-[#8C6B2A] mb-1">
                <Sparkles className="w-3 h-3 text-[#C59B4B]" />
                <span>MEET THE AUTHOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#141518] border-b border-[#E5DCBE] pb-3">
                লেখক পরিচিতি
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white p-6 rounded-3xl border border-[#E5DCBE] shadow-xs">
              {/* Author Photo */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#C59B4B]/60 shadow-md bg-stone-900">
                  <img
                    src="/images/author.jpg"
                    alt="Robert Greene"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="text-xl font-serif font-bold text-[#141518] leading-tight">
                  Robert Greene
                </h4>
                <p className="text-xs sm:text-sm text-[#555760] leading-relaxed font-normal">
                  Robert Greene একজন আন্তর্জাতিকভাবে জনপ্রিয় মার্কিন লেখক ও গবেষক, যিনি ক্ষমতা, কৌশল, মানব আচরণ ও নেতৃত্ব নিয়ে গভীর গবেষণা করেন। তার প্রতিটি বই ঐতিহাসিক তথ্যপ্রমাণ ও মনস্তাত্ত্বিক দর্শনের ওপর ভিত্তি করে রচিত।
                </p>
                {/* Stylized signature */}
                <div className="pt-2">
                  <span className="font-serif italic text-lg sm:text-xl text-[#8C6B2A] font-semibold tracking-wider block">
                    Robert Greene
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: পাঠকদের মতামত (Customer Reviews) */}
          <div id="reviews-section" className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-serif font-bold uppercase tracking-[0.2em] text-[#8C6B2A] mb-1">
                <Sparkles className="w-3 h-3 text-[#C59B4B]" />
                <span>READER TESTIMONIALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#141518] border-b border-[#E5DCBE] pb-3 flex items-center justify-between">
                <span>পাঠকদের অভিজ্ঞতা ও মতামত</span>
                <span className="text-xs font-sans font-semibold text-[#7A5B22] bg-[#FAF6EE] border border-[#DFCFA8] px-3 py-1 rounded-full">
                  রেটিং: ৪.৯/৫ (১২০০+ পাঠক)
                </span>
              </h3>
            </div>

            {/* 3 Review Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-white border border-[#E5DCBE] shadow-xs flex flex-col justify-between hover:border-[#C59B4B] hover:shadow-md transition-all"
                >
                  <div className="space-y-3">
                    {/* 5 Gold Stars */}
                    <div className="flex gap-1 text-[#C59B4B]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#C59B4B] text-[#C59B4B]"
                        />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-[#3E4048] font-bengali-serif leading-relaxed italic">
                      {rev.comment}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#EFE8DA] flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span>— {rev.name}, {rev.location}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
