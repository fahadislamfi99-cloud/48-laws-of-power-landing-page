"use client";

import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AuthorProfile() {
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="author"
      ref={containerRef}
      className="py-14 lg:py-20 bg-[#0A0A0C] border-t border-[#26262A] relative overflow-hidden"
    >
      {/* Background ambient gold orb */}
      <div className="absolute top-1/2 -left-28 w-[400px] h-[400px] bg-[#C8A45C]/[0.035] rounded-full blur-[140px] pointer-events-none animate-[orbFloat1_16s_ease-in-out_infinite]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Author Portrait with Clean Instant Reveal */}
          <div className="md:col-span-5 flex justify-center reveal-scale">
            <div className="relative group">
              {/* Luxury ambient glow behind portrait */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-[#C8A45C]/25 to-transparent blur-md opacity-50 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-3xl overflow-hidden border border-[#2A2A2E] bg-[#111114] group-hover:border-[#C8A45C]/45 transition-colors duration-300 shadow-2xl">
                <img
                  src="/images/author.jpg"
                  alt="Robert Greene - Author Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-7 space-y-4 text-center md:text-left reveal reveal-stagger-1">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#C8A45C] uppercase block">
                ABOUT THE AUTHOR
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#F0EBE0]">
                রবার্ট গ্রিন (Robert Greene)
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#B8B0A4] leading-relaxed">
              রবার্ট গ্রিন আন্তর্জাতিকভাবে প্রশংসিত মার্কিন লেখক ও গবেষক, যিনি মানুষের অন্ধকার মনস্তত্ত্ব, ক্ষমতা, কৌশল ও প্ররোচনা নিয়ে দীর্ঘ গবেষণার জন্য বিশ্বজুড়ে সমাদৃত। ক্লাসিক্যাল ইতিহাস ও দর্শনের ছাত্র হিসেবে গ্রিন বিশ্ব ইতিহাসের সেরা কূটনীতিক, সেনাপতি ও রাষ্ট্রনায়কদের জীবন পর্যবেক্ষণ করে এই ৪৮টি সূত্র প্রণয়ন করেছেন।
            </p>

            <div className="pt-3 border-t border-[#2A2A2E] text-xs text-[#8A8278] flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="font-bold text-[#B8B0A4]">অন্যান্য আন্তর্জাতিক মাস্টারপিস:</span>
              <span className="hover:text-[#C8A45C] transition-colors cursor-pointer font-medium">Mastery</span>
              <span className="text-[#2A2A2E]">•</span>
              <span className="hover:text-[#C8A45C] transition-colors cursor-pointer font-medium">The Laws of Human Nature</span>
              <span className="text-[#2A2A2E]">•</span>
              <span className="hover:text-[#C8A45C] transition-colors cursor-pointer font-medium">The 33 Strategies of War</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
