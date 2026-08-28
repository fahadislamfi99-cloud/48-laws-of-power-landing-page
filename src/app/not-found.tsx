import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Compass } from "lucide-react";

export const metadata = {
  title: "পাতাটি পাওয়া যায়নি (404) | The 48 Laws of Power বাংলা",
  description: "অনুরোধকৃত পাতাটি খুঁজে পাওয়া যায়নি। মূল পাতায় ফিরে যান।",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#08080A] text-[#F0EBE0] flex items-center justify-center relative overflow-hidden px-4 py-16 selection:bg-[#C8A45C] selection:text-[#08080A]">
      {/* Background ambient gold orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A45C]/[0.05] rounded-full blur-[160px] pointer-events-none" />
      
      {/* Ambient Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#2A2A2E_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-6 sm:space-y-8">
        
        {/* Eyebrow Badge */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3">
          <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/25 text-[#C8A45C] font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>ERROR 404 • PAGE NOT FOUND</span>
          </div>
          <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
        </div>

        {/* Large 404 Display Number */}
        <div className="relative select-none">
          <span className="font-display text-8xl xs:text-9xl sm:text-[11rem] font-black tracking-tight bg-gradient-to-b from-[#F0EBE0] via-[#C8A45C] to-[#8B6914] bg-clip-text text-transparent block leading-none drop-shadow-[0_20px_50px_rgba(200,164,92,0.15)]">
            404
          </span>
          <div className="absolute inset-0 bg-radial from-transparent via-[#08080A]/40 to-[#08080A] pointer-events-none" />
        </div>

        {/* Heading & Text */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bengali-serif font-bold text-[#F0EBE0] leading-snug">
            এই পাতাটি ক্ষমতার সীমার বাইরে!
          </h1>
          <p className="text-xs sm:text-base text-[#B8B0A4] leading-relaxed max-w-md mx-auto">
            আপনি যে পাতাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা কখনোই বিদ্যমান ছিল না। ক্ষমতার কৌশলে ভুল পথে সময় নষ্ট না করে মূল গন্তব্যে ফিরে যান।
          </p>
        </div>

        {/* Quote Callout Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#111114]/90 border border-[#2A2A2E] text-left max-w-md mx-auto shadow-xl space-y-1.5">
          <div className="flex items-center gap-2 text-[#C8A45C] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45C]" />
            <span>Robert Greene • Law 47</span>
          </div>
          <p className="text-xs sm:text-sm text-[#C4BCB0] italic font-bengali-serif leading-relaxed">
            &ldquo;বিজয় অর্জনের মুহূর্তে থামতে শিখুন; লক্ষ্যের চেয়ে বেশি দূর এগিয়ে গেলে নতুন বিপদের জন্ম হয়।&rdquo;
          </p>
        </div>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full btn-gold text-xs sm:text-sm font-bold cursor-pointer hover-lift btn-shimmer shadow-lg min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>মূল পাতায় ফিরে যান</span>
          </Link>
          
          <Link
            href="/#laws-almanac"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#111114] hover:bg-[#1A1A1E] text-[#D1C9BC] hover:text-[#C8A45C] text-xs sm:text-sm font-bold border border-[#2A2A2E] hover:border-[#C8A45C]/40 transition-all duration-300 hover-lift min-h-[44px]"
          >
            <BookOpen className="w-4 h-4" />
            <span>৪৮টি নীতি দেখুন</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
