"use client";

import React from "react";
import { Sparkles, Shield, Flame, BookOpen, CheckCircle2, ArrowRight, Eye, Zap } from "lucide-react";
import { BUNDLE_DETAILS, SEDUCER_ARCHETYPES } from "@/data/seductionData";

interface DualMasterySectionProps {
  onOpenOrderModal: (coupon?: string) => void;
  onOpenSeductionLessonModal: () => void;
}

export default function DualMasterySection({
  onOpenOrderModal,
  onOpenSeductionLessonModal,
}: DualMasterySectionProps) {
  return (
    <section id="bundle-mastery" className="relative py-16 sm:py-24 bg-[#09090C] text-[#F0EBE0] overflow-hidden border-t border-b border-[#1A1A1F]">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#C8A45C]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-[#E11D48]/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#C8A45C]/15 to-[#E11D48]/15 border border-[#C8A45C]/30 text-xs font-mono font-bold tracking-widest text-[#D4AF6E] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>THE ROBERT GREENE DUAL MASTERCLASS</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#F0EBE0] leading-tight">
            ক্ষমতা এবং সম্মোহনের <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#C8A45C] via-[#E11D48] to-[#D4AF6E] bg-clip-text text-transparent">
              সম্পূর্ণ মনস্তাত্ত্বিক মাস্টার বান্ডেল
            </span>
          </h2>

          <p className="text-xs sm:text-base text-[#A8A095] font-bengali-serif leading-relaxed max-w-2xl mx-auto">
            শুধু ক্ষমতা অর্জন করলেই হয় না, মানুষকে প্রভাবিত ও আকর্ষণ করার শিল্প জানা না থাকলে সেই ক্ষমতা স্থায়ী হয় না। রবার্ট গ্রিনের দুটি সেরা ক্লাসিক একসাথে পড়ুন।
          </p>
        </div>

        {/* Dual Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12 sm:mb-16">
          
          {/* Left Column: Side-by-side 3D Mockups */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative flex items-center justify-center gap-4 sm:gap-6 w-full max-w-[480px]">
              
              {/* Book 1: The 48 Laws of Power */}
              <div className="relative group transition-all duration-500 hover:-translate-y-2 flex-1 max-w-[210px]">
                <div className="absolute inset-0 bg-[#C8A45C]/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all pointer-events-none" />
                <div className="relative p-2 rounded-2xl bg-[#121217] border border-[#C8A45C]/30 shadow-2xl flex flex-col items-center text-center">
                  <picture>
                    <source type="image/webp" srcSet="/images/book-mockup.webp" />
                    <img
                      src="/images/book-mockup.png"
                      alt="The 48 Laws of Power বাংলা সংস্করণ"
                      width={220}
                      height={260}
                      className="w-full h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                      loading="lazy"
                    />
                  </picture>
                  <div className="mt-2.5 pb-1">
                    <span className="text-[10px] font-mono text-[#C8A45C] uppercase block font-bold">৫০৯ পৃষ্ঠা • ৬ MB</span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#F0EBE0] line-clamp-1 font-bengali-serif">48 Laws of Power</h3>
                  </div>
                </div>
              </div>

              {/* Plus Badge */}
              <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#181820] border border-[#2A2A34] text-[#F0EBE0] font-bold flex items-center justify-center text-sm shadow-xl z-10">
                +
              </div>

              {/* Book 2: The Art of Seduction */}
              <div className="relative group transition-all duration-500 hover:-translate-y-2 flex-1 max-w-[210px]">
                <div className="absolute inset-0 bg-[#E11D48]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all pointer-events-none" />
                <div className="relative p-2 rounded-2xl bg-[#141014] border border-[#E11D48]/40 shadow-2xl flex flex-col items-center text-center">
                  <img
                    src="/images/the-art-of-seduction-book-mockup.png"
                    alt="The Art of Seduction বাংলা সংস্করণ"
                    width={220}
                    height={260}
                    className="w-full h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                    loading="lazy"
                  />
                  <div className="mt-2.5 pb-1">
                    <span className="text-[10px] font-mono text-[#E11D48] uppercase block font-bold">৬৫০ পৃষ্ঠা • ১২ MB</span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#F0EBE0] line-clamp-1 font-bengali-serif">The Art of Seduction</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro-lesson CTA button */}
            <div className="mt-6 text-center">
              <button
                onClick={onOpenSeductionLessonModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1A161E] hover:bg-[#241E2B] border border-[#E11D48]/40 hover:border-[#E11D48]/70 text-[#F0EBE0] text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer group"
              >
                <Eye className="w-4 h-4 text-[#E11D48] transition-transform group-hover:scale-110" />
                <span>The Art of Seduction-এর একটি গোপন পাঠ পড়ুন 👁️</span>
              </button>
            </div>
          </div>

          {/* Right Column: Comparative Value Breakdown & Takeaways */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Feature Box 1 */}
              <div className="p-4 rounded-2xl bg-[#111115] border border-[#222228] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#C8A45C]/10 flex items-center justify-center text-[#C8A45C]">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#F0EBE0] font-bengali-serif">
                  The 48 Laws of Power
                </h4>
                <p className="text-xs text-[#A8A095] leading-relaxed font-bengali-serif">
                  কীভাবে পেশাদার ও সামাজিক জগতে নিজের ক্ষমতা প্রতিষ্ঠা করবেন, শত্রু চিনবেন এবং অদৃশ্য খেলায় নিজেকে রক্ষা করবেন।
                </p>
              </div>

              {/* Feature Box 2 */}
              <div className="p-4 rounded-2xl bg-[#131014] border border-[#E11D48]/25 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#E11D48]/15 flex items-center justify-center text-[#E11D48]">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#F0EBE0] font-bengali-serif">
                  The Art of Seduction
                </h4>
                <p className="text-xs text-[#A8A095] leading-relaxed font-bengali-serif">
                  কীভাবে মানুষের অবচেতন মন জয় করবেন, গভীর আকর্ষণ তৈরি করবেন এবং নিজের ব্যক্তিত্বকে অপ্রতিরোধ্য করে তুলবেন।
                </p>
              </div>
            </div>

            {/* 4 Core Pillars of Seduction */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#121217] border border-[#22222A] space-y-3">
              <span className="text-xs font-mono text-[#D4AF6E] font-bold uppercase tracking-wider block">
                The Art of Seduction থেকে আপনি কী শিখবেন:
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[#D1C9BC] font-bengali-serif">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                  <span><strong>৯টি প্রলোভক ব্যক্তিত্ব (Archetypes):</strong> আপনি কোন ঘরানার এবং কীভাবে নিজের সুপ্ত চৌম্বকত্ব জাগ্রত করবেন।</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                  <span><strong>২৪টি সম্মোহন ধাপ:</strong> মানুষের প্রাথমিক প্রতিরোধ ভাঙা থেকে শুরু করে চূড়ান্ত মানসিক বশ্যতা তৈরি।</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                  <span><strong>মানুষের দুর্বলতা চেনার মনস্তত্ত্ব:</strong> অপরপক্ষের গোপন আকাঙ্ক্ষা ও মানসিক শূন্যতা বোঝার কৌশল।</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Master Bundle Pricing Card (High Conversion Decoy Offer) */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#18131B] via-[#121015] to-[#0D0D11] border-2 border-[#C8A45C]/40 p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-w-4xl mx-auto text-center overflow-hidden">
          
          {/* Top highlight ribbon */}
          <div className="absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-[#C8A45C] via-[#E11D48] to-[#C8A45C]" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E11D48]/15 border border-[#E11D48]/40 text-[#E11D48] text-xs font-bold uppercase tracking-wider mb-4">
            🔥 সবচেয়ে জনপ্রিয় স্পেশাল ডিল (৮৭% পাঠক এটি নিয়েছেন)
          </div>

          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold font-bengali-serif text-[#F0EBE0] mb-2">
            দুটি মাস্টারপিস বই একসাথে মাত্র <span className="text-[#C8A45C]">৳১৯৯</span>
          </h3>

          <p className="text-xs sm:text-sm text-[#A8A095] font-bengali-serif max-w-xl mx-auto mb-6">
            আলাদা কিনলে ৳১৪৯ + ৳১৪৯ = ৳২৯৮। কিন্তু আজকের স্পেশাল বান্ডেলে আপনি পাচ্ছেন <strong className="text-[#F0EBE0]">৳৯৯ নিশ্চিত ছাড়</strong>!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-6 mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#D1C9BC]">
              <CheckCircle2 className="w-4 h-4 text-[#C8A45C]" />
              <span>১,১৫৯+ পৃষ্ঠা সম্পূর্ণ বাংলা ডিজিটাল ইবুক</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#D1C9BC]">
              <CheckCircle2 className="w-4 h-4 text-[#C8A45C]" />
              <span>সার্চেবল টেক্সট ও ক্লিকযোগ্য সূচি</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#D1C9BC]">
              <CheckCircle2 className="w-4 h-4 text-[#C8A45C]" />
              <span>তাৎক্ষণিক ডেলিভারি ও লাইফটাইম অ্যাক্সেস</span>
            </div>
          </div>

          <button
            onClick={() => onOpenOrderModal()}
            className="w-full sm:w-auto min-w-[280px] px-8 py-4 rounded-full bg-gradient-to-r from-[#C8A45C] via-[#D4AF6E] to-[#C8A45C] text-[#08080A] font-bold text-sm sm:text-base hover:opacity-95 transition-transform hover:scale-[1.02] shadow-[0_10px_30px_rgba(200,164,92,0.35)] cursor-pointer inline-flex items-center justify-center gap-3 mx-auto"
          >
            <span>২-বুক মাস্টার বান্ডেল কিনুন (৳১৯৯)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
