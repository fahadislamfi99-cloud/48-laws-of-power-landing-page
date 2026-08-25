"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AuthorProfile() {
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="author"
      ref={containerRef}
      className="py-20 lg:py-28 border-b border-[#E6E0D4] bg-[#F7F5EE]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Author Portrait with Prominent Scale */}
          <div className="md:col-span-5 flex justify-center reveal">
            <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-3xl overflow-hidden border border-[#D8D0C3] shadow-lg bg-stone-900 group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              <img
                src="/images/author.jpg"
                alt="Robert Greene - Author Portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Author Bio & Legacy */}
          <div className="md:col-span-7 space-y-4 text-center md:text-left reveal reveal-stagger-1">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8F6B2C] uppercase block">
                ABOUT THE AUTHOR
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#121316]">
                রবার্ট গ্রিন (Robert Greene)
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#42454D] leading-relaxed">
              রবার্ট গ্রিন আন্তর্জাতিকভাবে প্রশংসিত মার্কিন লেখক ও গবেষক, যিনি মানুষের অন্ধকার মনস্তত্ত্ব, ক্ষমতা, কৌশল ও প্ররোচনা নিয়ে দীর্ঘ গবেষণার জন্য বিশ্বজুড়ে সমাদৃত। ক্লাসিক্যাল ইতিহাস ও দর্শনের ছাত্র হিসেবে গ্রিন বিশ্ব ইতিহাসের সেরা কূটনীতিক, সেনাপতি ও রাষ্ট্রনায়কদের জীবন পর্যবেক্ষণ করে এই ৪৮টি সূত্র প্রণয়ন করেছেন।
            </p>

            <div className="pt-3 border-t border-[#E6E0D4] text-xs font-mono text-stone-600 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="font-bold text-[#121316]">অন্যান্য আন্তর্জাতিক মাস্টারপিস:</span>
              <span className="hover:text-[#8F6B2C] transition-colors">• Mastery</span>
              <span className="hover:text-[#8F6B2C] transition-colors">• The Laws of Human Nature</span>
              <span className="hover:text-[#8F6B2C] transition-colors">• The 33 Strategies of War</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
