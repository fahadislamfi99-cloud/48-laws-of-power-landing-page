"use client";

import React from "react";
import {
  Brain,
  Target,
  MessageSquare,
  Eye,
  Compass,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function ValueProposition() {
  const pillars = [
    {
      icon: <Brain className="w-6 h-6 text-[#8C6B2A]" />,
      title: "Human Psychology",
      titleBn: "মানব মনস্তত্ত্ব",
      desc: "মানুষের অবচেতন আচরণ, আসল মোটিভেশন এবং লুকানো উদ্দেশ্যগুলো সঠিকভাবে অনুধাবন করতে সাহায্য করবে।",
    },
    {
      icon: <Target className="w-6 h-6 text-[#8C6B2A]" />,
      title: "Influence",
      titleBn: "প্রভাব বিস্তার",
      desc: "সামাজিক ও পেশাদার মহলে প্রভাব কীভাবে তৈরি হয় এবং নিজের সঠিক অবস্থান কীভাবে গড়ে তুলবেন তা শেখাবে।",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#8C6B2A]" />,
      title: "Strategic Communication",
      titleBn: "কৌশলী বার্তালাপ",
      desc: "কখন কথা বলা উচিত, কখন নীরব থাকা কার্যকর এবং নিজের বক্তব্য কীভাবে প্রজ্ঞার সাথে উপস্থাপন করবেন।",
    },
    {
      icon: <Eye className="w-6 h-6 text-[#8C6B2A]" />,
      title: "Observation",
      titleBn: "গভীর পর্যবেক্ষণ",
      desc: "মানুষ মুখে কী বলছে কেবল তা নয়, তাদের শারীরিক ভাষা ও কাজের পেছনের আসল উদ্দেশ্য ধরতে পারবেন।",
    },
    {
      icon: <Compass className="w-6 h-6 text-[#8C6B2A]" />,
      title: "Strategy & Mastery",
      titleBn: "দূরদর্শী রণকৌশল",
      desc: "জটিল সামাজিক ও পেশাদার দ্বন্দ্বের সময় আবেগ নিয়ন্ত্রণ করে ধীরস্থিরভাবে কৌশলগত সিদ্ধান্ত নিতে পারবেন।",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#8C6B2A]" />,
      title: "Self-Protection",
      titleBn: "আত্মসচেতনতা ও সুরক্ষা",
      desc: "অন্যরা কখন আপনাকে ম্যানিপুলেট বা নিজের স্বার্থে ব্যবহার করার চেষ্টা করছে তা দ্রুত শনাক্ত করতে পারবেন।",
    },
  ];

  return (
    <section className="relative bg-[#FAF8F5] text-stone-900 py-20 lg:py-28 border-b border-[#E8DFCF]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8C6B2A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>THE 6 CORE PILLARS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#16171A] leading-[1.25]">
            শুধু বই নয়, মানুষের আচরণ বোঝার একটি নতুন Perspective
          </h2>
          <p className="text-[#5A5C64] text-sm sm:text-base">
            রবার্ট গ্রিনের ৪৮টি নীতি আপনাকে সমাজ ও বাস্তবতাকে ৬টি গভীর দৃষ্টিকোণ থেকে দেখতে শেখায়
          </p>
        </div>

        {/* 6 Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-[#E5DCBE] hover:border-[#C59B4B]/80 hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] border border-[#E2D5BA] flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[11px] font-serif tracking-[0.15em] font-bold text-[#8C6B2A] uppercase">
                    {item.title}
                  </span>
                  <h3 className="text-xl font-bengali-serif font-bold text-[#141518] mt-0.5">
                    {item.titleBn}
                  </h3>
                </div>
                <p className="text-[#555760] text-sm leading-[1.7]">
                  {item.desc}
                </p>
              </div>

              <div className="w-10 h-[1.5px] bg-[#D5C7A8] mt-6 group-hover:w-full group-hover:bg-[#C59B4B] transition-all duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
