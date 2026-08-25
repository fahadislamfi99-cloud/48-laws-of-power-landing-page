"use client";

import React from "react";
import { Star, Sparkles, CheckCircle } from "lucide-react";
import { reviewsList } from "@/data/reviewsData";

export default function AuthorProfile() {
  return (
    <section id="author" className="py-20 lg:py-28 border-b border-[#E4DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Author Profile */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8E6A2F] uppercase block">
                MEET THE AUTHOR
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial-serif font-black tracking-tight text-[#111215]">
                রবার্ট গ্রিন (Robert Greene)
              </h2>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#D5CDBE] shadow-sm space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-[#D5CDBE] shrink-0 bg-stone-900">
                  <img
                    src="/images/author.jpg"
                    alt="Robert Greene"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-editorial-serif font-bold text-[#111215]">
                    Robert Greene
                  </h3>
                  <p className="text-xs font-mono text-[#8E6A2F]">
                    লেখক, গবেষক ও কৌশলবিদ
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    ইউসি বার্কলে ও উইসকনসিন বিশ্ববিদ্যালয়ের প্রাক্তনী
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4A4D55] leading-relaxed">
                রবার্ট গ্রিন বিশ্বের অন্যতম জনপ্রিয় লেখক ও মানব মনস্তত্ত্ব গবেষক। ক্ষমতা, কৌশল, প্রলোভন ও মানুষের অন্ধকার মনস্তত্ত্ব নিয়ে তার সুগভীর গবেষণা বিশ্বজুড়ে কোটি কোটি পাঠক, রাষ্ট্রনায়ক, উদ্যোক্তা ও পেশাজীবীদের জীবন বদলে দিয়েছে।
              </p>

              {/* Other Notable Works */}
              <div className="pt-2 border-t border-[#E4DED3] text-xs font-mono text-stone-600 space-y-1">
                <span className="font-bold text-stone-800 block">অন্যান্য মাস্টারপিস গ্রন্থ:</span>
                <span>• The Laws of Human Nature • Mastery • The 33 Strategies of War</span>
              </div>
            </div>
          </div>

          {/* Right: Reader Notes & Testimonials */}
          <div id="reviews-section" className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8E6A2F] uppercase block">
                  READER TESTIMONIALS
                </span>
                <h2 className="text-2xl sm:text-3xl font-editorial-serif font-black tracking-tight text-[#111215]">
                  পাঠকদের প্রতিক্রিয়া
                </h2>
              </div>

              <div className="text-right">
                <div className="flex gap-1 text-[#8E6A2F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#8E6A2F]" />
                  ))}
                </div>
                <span className="text-xs font-mono text-stone-500 mt-1 block">
                  ৪.৯ / ৫ রেটিং (৩,০০০+ পাঠক)
                </span>
              </div>
            </div>

            {/* 3 Review Cards */}
            <div className="space-y-4">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E4DED3] shadow-2xs space-y-3"
                >
                  <p className="text-xs sm:text-sm font-editorial-bengali-serif text-[#2C2D32] leading-relaxed italic">
                    {rev.comment}
                  </p>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-[#E4DED3]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#111215]">{rev.name}</span>
                      <span>•</span>
                      <span>{rev.role}</span>
                      <span>•</span>
                      <span>{rev.location}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      ভেরিফাইড ডিজিটাল পারচেজ
                    </span>
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
