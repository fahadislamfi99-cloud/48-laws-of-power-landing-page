"use client";

import React from "react";
import { Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function HumanRecognition() {
  const containerRef = useScrollReveal<HTMLElement>();

  const experiences = [
    {
      marker: "পরিস্থিতি ০১",
      title: "কাজের কৃতিত্ব ছিনতাই",
      text: "আপনি একটি কঠিন প্রজেক্টে দিনের পর দিন পরিশ্রম করলেন। কিন্তু শেষ মুহূর্তে মিটিংয়ে আপনার চেয়ে চতুর একজন ব্যক্তি সেই আইডিয়া এমনভাবে উপস্থাপন করল যেন সব কৃতিত্ব তারই।",
    },
    {
      marker: "পরিস্থিতি ০২",
      title: "অতি-বিশ্বাসের নির্মম পরিণতি",
      text: "আপনি সরল বিশ্বাসে নিজের ব্যক্তিগত দুর্বলতা বা ভবিষ্যৎ পরিকল্পনার কথা সহকর্মীকে বললেন। কিছুদিন পর দেখলেন সেই তথ্যটিই আপনার বিরুদ্ধে অস্ত্র হিসেবে ব্যবহার করা হচ্ছে।",
    },
    {
      marker: "পরিস্থিতি ০৩",
      title: "সামনে মধুর হাসি, আড়ালে অপপ্রচার",
      text: "কেউ আপনার সামনে অত্যন্ত অমায়িক ও শ্রদ্ধাশীল আচরণ করছে, কিন্তু সুকৌশলে আপনার অবর্তমানে প্রভাবশালীদের কাছে আপনার বিশ্বাসযোগ্যতা ও সুনাম নষ্ট করছে।",
    },
    {
      marker: "পরিস্থিতি ০৪",
      title: "অতিরিক্ত কথার ফাঁদ",
      text: "আবেগের বশে বা নিজেকে বুদ্ধিমান প্রমাণ করতে গিয়ে এমন কিছু অতিরিক্ত কথা বলে ফেললেন, যা নিজের নিয়ন্ত্রণ হাতছাড়া করে দিল এবং বিরোধীদের জন্য সুযোগ তৈরি করল।",
    },
  ];

  return (
    <section
      id="thesis"
      ref={containerRef}
      className="py-20 lg:py-28 border-b border-[#E6E0D4] bg-[#FAF8F5]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="max-w-3xl space-y-4 mb-16 reveal">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8F6B2C] uppercase block">
            HUMAN SOCIAL DYNAMICS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#121316] leading-[1.25]">
            আপনি কি কখনো এমন অভিজ্ঞতার মুখোমুখি হয়েছেন?
          </h2>
          <p className="text-base sm:text-lg text-[#52555E] leading-relaxed">
            আমরা প্রায়ই ভাবি পৃথিবী নিখুঁত ন্যায়নীতিতে চলে। কিন্তু বাস্তব জীবনে আপনি নিশ্চয়ই এই পরিস্থিতিগুলো ঘটতে দেখেছেন:
          </p>
        </div>

        {/* Asymmetrical Editorial Situations List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {experiences.map((item, idx) => (
            <div
              key={idx}
              className={`reveal reveal-stagger-${idx + 1} border-t-2 border-[#121316] hover:border-[#8F6B2C] pt-5 space-y-2.5 p-4 -mx-4 rounded-xl transition-all duration-300 hover:bg-[#F3EFE8]/40 hover:-translate-y-0.5 group`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#8F6B2C]">
                <span className="font-bold uppercase tracking-wider group-hover:text-[#6E511D] transition-colors">
                  {item.marker}
                </span>
              </div>
              <h3 className="font-bengali-serif font-bold text-xl text-[#121316] group-hover:text-[#8F6B2C] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-[#42454D] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Editorial Pull-Quote Callout */}
        <div className="reveal reveal-stagger-3 mt-16 p-8 lg:p-10 rounded-2xl bg-[#F3EFE8] border border-[#E0D8CA] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover-lift transition-all duration-300">
          <div className="lg:col-span-2 flex justify-start lg:justify-center">
            <div className="w-12 h-12 rounded-full bg-[#121316] text-[#FAF8F5] flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <Quote className="w-5 h-5" />
            </div>
          </div>
          <div className="lg:col-span-10 space-y-2">
            <p className="font-bengali-serif text-lg sm:text-xl text-[#121316] leading-relaxed italic">
              &ldquo;ক্ষমতার খেলায় ভালো বা খারাপ বলে কিছু নেই। যারা এই খেলার অদৃশ্য নিয়মগুলো বোঝেন, তারা নিয়ন্ত্রণ ধরে রাখেন। আর যারা অন্ধভাবে নিয়মের অপেক্ষা করেন, তারা অন্যের সিদ্ধান্তের শিকার হন।&rdquo;
            </p>
            <span className="text-xs font-mono text-[#8F6B2C] font-bold block pt-1">
              — রবার্ট গ্রিন (The 48 Laws of Power)
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
