"use client";

import React from "react";
import { CheckCircle2, Quote, Sparkles } from "lucide-react";

export default function HookSection() {
  const questions = [
    "কেন কিছু মানুষ খুব সহজেই অন্যদের influence করতে পারে?",
    "কেন অতিরিক্ত ভালো মানুষকে অনেক সময় দুর্বল মনে করা হয়?",
    "কখন নিজের ক্ষমতা প্রকাশ করা উচিত আর কখন তা গোপন রাখা ভালো?",
    "কেন কিছু মানুষ আপনার সাফল্যকে পছন্দ করে না?",
    "কখন নীরব থাকা কথার চেয়ে বেশি শক্তিশালী?",
    "মানুষের আচরণের আড়ালে থাকা উদ্দেশ্য কীভাবে বুঝবেন?",
  ];

  return (
    <section
      id="about-book"
      className="relative bg-[#FAF8F5] text-stone-900 py-20 lg:py-28 overflow-hidden border-b border-[#E8DFCF]/80"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#d6c9b3_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#E8DCC4]/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Questions & Core Psychological Hook */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Heading */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8C6B2A]">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
                <span>মনস্তাত্ত্বিক বাস্তবতা</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#16171A] leading-[1.25]">
                আপনি কি মানুষকে বুঝতে পারেন, <br className="hidden sm:inline" />
                নাকি শুধু তাদের কথাই শুনেন?
              </h2>
              {/* Gold underline accent line */}
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#C59B4B] via-[#E0C078] to-transparent rounded-full" />
            </div>

            {/* Questions Checklist Cards */}
            <div className="space-y-3 pt-1">
              {questions.map((question, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3 sm:p-3.5 rounded-xl bg-white/70 border border-[#E8DFC8]/70 hover:border-[#C59B4B]/60 hover:bg-white hover:shadow-xs transition-all duration-200"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#F3EDE2] border border-[#D5C7A8] flex items-center justify-center shrink-0 text-[#8C6B2A]">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.4]" />
                  </div>
                  <p className="text-[#32343A] font-medium text-sm sm:text-base leading-relaxed">
                    {question}
                  </p>
                </div>
              ))}
            </div>

            {/* Callout Quote Box */}
            <div className="relative mt-6 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#F5EFE4] to-[#FAF7F2] border border-[#DFCFA8] shadow-xs">
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-[#EAE0CD] text-[#7A5B22] flex items-center justify-center shrink-0 mt-0.5">
                  <Quote className="w-4 h-4 stroke-[2.2]" />
                </div>
                <p className="text-[#202124] font-bengali-serif text-sm sm:text-base md:text-lg leading-[1.8] italic">
                  এই বই আপনাকে মানুষকে &ldquo;ভালো&rdquo; বা &ldquo;খারাপ&rdquo; হিসেবে বিচার করতে শেখাবে না। বরং মানুষের আচরণের পেছনে থাকা <span className="font-bold text-[#7A5B22] underline decoration-[#C59B4B] underline-offset-4">power dynamics</span> ও অদৃশ্য কৌশল লক্ষ্য করতে শেখাবে।
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Museum Quality Chess King Artwork */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Museum Exhibition Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border-2 border-[#D8CEB9] max-w-[320px] sm:max-w-[380px] bg-white group transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="/images/chess-king.jpg"
                alt="The Art of Strategy - Chess King"
                className="w-full h-auto object-cover block"
              />
              
              {/* Museum Plaque Overlay at bottom */}
              <div className="p-4 bg-gradient-to-t from-[#141518] via-[#141518]/90 to-transparent absolute bottom-0 left-0 right-0 text-center text-white">
                <span className="text-[9px] font-serif tracking-[0.25em] text-[#E6C67E] uppercase block font-semibold">
                  STRATEGY & REPUTATION
                </span>
                <p className="text-xs font-serif text-stone-300 italic mt-0.5">
                  &ldquo;Master the board before making your move.&rdquo;
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
