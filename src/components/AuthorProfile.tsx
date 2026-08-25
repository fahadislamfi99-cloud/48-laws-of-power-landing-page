"use client";

import React from "react";
import { BookOpen } from "lucide-react";

export default function AuthorProfile() {
  return (
    <section id="author" className="py-20 lg:py-28 border-b border-[#E6E0D4] bg-[#F7F5EE]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Author Portrait */}
          <div className="md:col-span-4 flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border border-[#D8D0C3] shadow-md bg-stone-900">
              <img
                src="/images/author.jpg"
                alt="Robert Greene - Author Portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Author Bio & Legacy */}
          <div className="md:col-span-8 space-y-4 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8F6B2C] uppercase block">
                ABOUT THE AUTHOR
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#121316]">
                রবার্ট গ্রিন (Robert Greene)
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#42454D] leading-relaxed">
              রবার্ট গ্রিন আন্তর্জাতিকভাবে প্রশংসিত মার্কিন লেখক ও গবেষক, যিনি মানুষের অন্ধকার মনস্তত্ত্ব, ক্ষমতা, কৌশল ও প্ররোচনা নিয়ে দীর্ঘ গবেষণার জন্য বিশ্বজুড়ে সমাদৃত। ক্লাসিক্যাল ইতিহাস ও দর্শনের ছাত্র হিসেবে গ্রিন বিশ্ব ইতিহাসের সেরা কূটনীতিক, সেনাপতি ও রাষ্ট্রনায়কদের জীবন পর্যবেক্ষণ করে এই ৪৮টি সূত্র প্রণয়ন করেছেন।
            </p>

            <div className="pt-2 border-t border-[#E6E0D4] text-xs font-mono text-stone-600 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="font-bold text-[#121316]">অন্যান্য উল্লেখযোগ্য গবেষণা:</span>
              <span>• Mastery</span>
              <span>• The Laws of Human Nature</span>
              <span>• The 33 Strategies of War</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
