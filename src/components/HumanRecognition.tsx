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
      text: "আপনি একটি কঠিন প্রজেক্টে দিনের পর দিন পরিশ্রম করলেন। কিন্তু শেষ মুহূর্তে মিটিংয়ে আপনার চেয়ে চতুর একজন ব্যক্তি সেই আইডিয়া এমনভাবে উপস্থাপন করল যেন সব কৃতিত্ব তারই।",
    },
    {
      marker: "পরিস্থিতি ০২",
      title: "অতি-বিশ্বাসের নির্মম পরিণতি",
      text: "আপনি সরল বিশ্বাসে নিজের ব্যক্তিগত দুর্বলতা বা ভবিষ্যৎ পরিকল্পনার কথা সহকর্মীকে বললেন। কিছুদিন পর দেখলেন সেই তথ্যটিই আপনার বিরুদ্ধে অস্ত্র হিসেবে ব্যবহার করা হচ্ছে।",
    },
    {
      marker: "পরিস্থিতি ০৩",
      title: "সামনে মধুর হাসি, আড়ালে অপপ্রচার",
      text: "কেউ আপনার সামনে অত্যন্ত অমায়িক ও শ্রদ্ধাশীল আচরণ করছে, কিন্তু সুকৌশলে আপনার অবর্তমানে প্রভাবশালীদের কাছে আপনার বিশ্বাসযোগ্যতা ও সুনাম নষ্ট করছে।",
    },
    {
      marker: "পরিস্থিতি ০৪",
      title: "অতিরিক্ত কথার ফাঁদ",
      text: "আবেগের বশে বা নিজেকে বুদ্ধিমান প্রমাণ করতে গিয়ে এমন কিছু অতিরিক্ত কথা বলে ফেললেন, যা নিজের নিয়ন্ত্রণ হাতছাড়া করে দিল এবং বিরোধীদের জন্য সুযোগ তৈরি করল।",
    },
  ];

  return (
    <section
      id="thesis"
      ref={containerRef}
      className="py-20 lg:py-28 bg-[#08080A]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 reveal">
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#C8A45C] uppercase block">
            HUMAN SOCIAL DYNAMICS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F0EBE0] leading-[1.2]">
            আপনি কি কখনো এমন অভিজ্ঞতার মুখোমুখি হয়েছেন?
          </h2>
          <p className="text-base sm:text-lg text-[#B8B0A4] leading-relaxed">
            আমরা প্রায়ই ভাবি পৃথিবী নিখুঁত ন্যায়নীতিতে চলে। কিন্তু বাস্তব জীবনে আপনি নিশ্চয়ই এই পরিস্থিতিগুলো ঘটতে দেখেছেন:
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {experiences.map((item, idx) => (
            <div
              key={idx}
              className={`reveal ${idx % 2 === 0 ? "reveal-left" : "reveal-right"} reveal-stagger-${idx + 1} card-dark p-6 space-y-3 group`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#C8A45C]">
                <span className="font-bold uppercase tracking-wider group-hover:text-[#D4AF6E] transition-colors">
                  {item.marker}
                </span>
              </div>
              <h3 className="font-bengali-serif font-bold text-xl text-[#F0EBE0] group-hover:text-[#C8A45C] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-[#B8B0A4] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Pull Quote */}
        <div className="reveal reveal-stagger-5 mt-16 p-8 lg:p-10 rounded-2xl bg-[#111114] border border-[#2A2A2E] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:border-[#C8A45C]/20 transition-all duration-500">
          <div className="lg:col-span-2 flex justify-start lg:justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A45C] to-[#8B6914] text-[#08080A] flex items-center justify-center">
              <Quote className="w-5 h-5" />
            </div>
          </div>
          <div className="lg:col-span-10 space-y-3">
            <p className="font-bengali-serif text-lg sm:text-xl text-[#F0EBE0] leading-relaxed italic">
              &ldquo;ক্ষমতার খেলায় ভালো বা খারাপ বলে কিছু নেই। যারা এই খেলার অদৃশ্য নিয়মগুলো বোঝেন, তারা নিয়ন্ত্রণ ধরে রাখেন। আর যারা অন্ধভাবে নিয়মের অপেক্ষা করেন, তারা অন্যের সিদ্ধান্তের শিকার হন।&rdquo;
            </p>
            <span className="text-[11px] font-mono text-[#C8A45C] font-bold block pt-1">
              রবার্ট গ্রিন (The 48 Laws of Power)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
