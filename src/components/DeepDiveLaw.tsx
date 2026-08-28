"use client";

import React, { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function DeepDiveLaw() {
  const [selectedLaw, setSelectedLaw] = useState<1 | 4>(4);
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="deep-dive"
      ref={containerRef}
      className="py-14 lg:py-20 bg-[#0C0C0F] border-t border-[#26262A] relative overflow-hidden"
    >
      {/* Subtle Gold Background Orb */}
      <div className="absolute top-1/2 -right-32 w-[420px] h-[420px] bg-[#C8A45C]/[0.035] rounded-full blur-[140px] pointer-events-none animate-[orbFloat2_16s_ease-in-out_infinite]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 reveal">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/25 text-[#C8A45C] font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase">
              <span>AN INSIGHT FROM THE BOOK</span>
            </div>
            <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F5F0E6] leading-[1.25]">
            একটি নীতি, বাস্তব দৃষ্টিভঙ্গির পরিবর্তন
          </h2>
          <p className="text-[#C4BCB0] text-base sm:text-lg leading-[1.8]">
            বইটি থেকে একটি নীতি মনোযোগ দিয়ে পড়ুন। এটি বুঝলে আপনি বুঝতে পারবেন বাকি ৪৭টি নীতি কীভাবে আপনার চিন্তার পরিসীমা বদলে দেবে।
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-3 mb-8 reveal reveal-stagger-1">
          {[
            { id: 4 as const, label: "LAW 04: নীরবতার শক্তি" },
            { id: 1 as const, label: "LAW 01: সুপিরিয়রের অহং" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedLaw(tab.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45C] ${selectedLaw === tab.id
                  ? "bg-[#C8A45C] text-[#08080A] shadow-[0_0_20px_rgba(200,164,92,0.35)] btn-shimmer"
                  : "bg-[#111114] text-[#C4BCB0] border border-[#26262A] hover:border-[#C8A45C]/40 hover:text-[#C8A45C]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-[#111114] rounded-3xl border border-[#26262A] p-6 sm:p-10 lg:p-12 space-y-8 transition-all duration-300 hover:border-[#C8A45C]/30 shadow-2xl">
          {selectedLaw === 4 ? (
            <div key="law-4" className="space-y-8 animate-fadeIn">
              <div className="space-y-2 border-b border-[#26262A] pb-6">
                <span className="text-xs font-semibold text-[#C8A45C] tracking-[0.2em] uppercase">
                  LAW 04 • The 48 Laws of Power (বাংলা সংস্করণ)
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bengali-serif font-bold text-[#F5F0E6] leading-snug">
                  প্রয়োজনের চেয়ে সর্বদা কম কথা বলুন
                </h3>
                <p className="text-xs sm:text-sm text-[#9E968B]">
                  Always Say Less Than Necessary
                </p>
              </div>

              {/* Bespoke Editorial Quote Card */}
              <div className="relative py-7 px-6 sm:px-10 rounded-2xl bg-gradient-to-b from-[#18181C] via-[#121215] to-[#18181C] border border-[#2A2A30] shadow-md overflow-hidden">
                {/* Subtle gold corner accent line */}
                <div className="absolute top-0 left-0 w-24 h-[2px] bg-gradient-to-r from-[#C8A45C] to-transparent" />
                <div className="absolute bottom-0 right-0 w-24 h-[2px] bg-gradient-to-l from-[#C8A45C] to-transparent" />

                {/* Decorative Quotation Glyph */}
                <span className="absolute -top-1 left-4 font-display text-6xl text-[#C8A45C]/15 select-none pointer-events-none leading-none">
                  “
                </span>

                <p className="relative z-10 font-bengali-serif text-lg sm:text-xl text-[#F5F0E6] leading-[1.85] italic pl-2 sm:pl-6">
                  &ldquo;যখন আপনি কথা দিয়ে কাউকে মুগ্ধ করার চেষ্টা করবেন, আপনি যত বেশি কথা বলবেন তত বেশি সাধারণ মনে হবে এবং নিজের নিয়ন্ত্রণ হারানোর সম্ভাবনা বাড়বে। ক্ষমতাবান মানুষ পরিমিত কথা বলে অন্যদের ওপর এক ধরণের অদৃশ্য মনস্তাত্ত্বিক চাপ সৃষ্টি করে।&rdquo;
                </p>

                <div className="mt-4 pt-3 border-t border-[#26262A]/60 flex items-center justify-between text-xs text-[#C8A45C]">
                  <span className="text-[11px] text-[#9E968B] font-medium tracking-wide">মূল সূত্রের নির্যাস</span>
                  <span className="font-mono font-bold tracking-wider uppercase">ROBERT GREENE</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#C4BCB0] leading-[1.8]">
                <div className="space-y-2.5 p-5 rounded-2xl bg-[#08080A]/60 border border-[#26262A]">
                  <h4 className="font-bold text-base text-[#F5F0E6] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C8A45C]" />
                    <span>মনস্তাত্ত্বিক কারণ:</span>
                  </h4>
                  <p>
                    নীরবতা মানুষকে অস্বস্তিতে ফেলে। যখন আপনি কোনো গুরুত্বপূর্ণ আলোচনায় ইচ্ছাকৃতভাবে শান্ত ও নীরব থাকবেন, তখন অন্যপক্ষ সেই নীরবতার শূন্যতা পূরণ করার জন্য নিজে অতিরিক্ত কথা বলতে শুরু করবে। এর ফলে তারা নিজেদের অজান্তেই লুকানো দুর্বলতা ও আসল উদ্দেশ্য প্রকাশ করে ফেলবে।
                  </p>
                </div>

                <div className="space-y-2.5 p-5 rounded-2xl bg-[#08080A]/60 border border-[#26262A]">
                  <h4 className="font-bold text-base text-[#F5F0E6] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C8A45C]" />
                    <span>বাস্তব জীবনের কৌশল:</span>
                  </h4>
                  <p>
                    যেকোনো নেগোসিয়েশন বা কর্মক্ষেত্রের বিতর্কে আপনার চূড়ান্ত উত্তর সংক্ষিপ্ত ও দ্ব্যর্থহীন রাখুন। কম কথার মানুষ সবসময় রহস্যময় ও গভীর মনে হয়। কথা হলো তীরের মতো, একবার মুখ থেকে বেরিয়ে গেলে তা আর ফিরিয়ে আনা যায় না।
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div key="law-1" className="space-y-8 animate-fadeIn">
              <div className="space-y-2 border-b border-[#26262A] pb-6">
                <span className="text-xs font-semibold text-[#C8A45C] tracking-[0.2em] uppercase">
                  LAW 01 • The 48 Laws of Power (বাংলা সংস্করণ)
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bengali-serif font-bold text-[#F5F0E6] leading-snug">
                  মাস্টার বা শীর্ষ ব্যক্তিকে কখনো নিজের চেয়ে বেশি উজ্জ্বল দেখাবেন না
                </h3>
                <p className="text-xs sm:text-sm text-[#9E968B]">
                  Never Outshine the Master
                </p>
              </div>

              {/* Bespoke Editorial Quote Card */}
              <div className="relative py-7 px-6 sm:px-10 rounded-2xl bg-gradient-to-b from-[#18181C] via-[#121215] to-[#18181C] border border-[#2A2A30] shadow-md overflow-hidden">
                {/* Subtle gold corner accent line */}
                <div className="absolute top-0 left-0 w-24 h-[2px] bg-gradient-to-r from-[#C8A45C] to-transparent" />
                <div className="absolute bottom-0 right-0 w-24 h-[2px] bg-gradient-to-l from-[#C8A45C] to-transparent" />

                {/* Decorative Quotation Glyph */}
                <span className="absolute -top-1 left-4 font-display text-6xl text-[#C8A45C]/15 select-none pointer-events-none leading-none">
                  “
                </span>

                <p className="relative z-10 font-bengali-serif text-lg sm:text-xl text-[#F5F0E6] leading-[1.85] italic pl-2 sm:pl-6">
                  &ldquo;সর্বদা আপনার ওপরের লোকদের স্বাচ্ছন্দ্য এবং শ্রেষ্ঠত্বের অনুভূতি দিন। তাদের সন্তুষ্ট করতে গিয়ে অতিরিক্ত নিজের প্রতিভা প্রদর্শন করবেন না, কারণ এতে তারা চরম নিরাপত্তাহীনতায় ভুগতে পারে।&rdquo;
                </p>

                <div className="mt-4 pt-3 border-t border-[#26262A]/60 flex items-center justify-between text-xs text-[#C8A45C]">
                  <span className="text-[11px] text-[#9E968B] font-medium tracking-wide">মূল সূত্রের নির্যাস</span>
                  <span className="font-mono font-bold tracking-wider uppercase">ROBERT GREENE</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#C4BCB0] leading-[1.8]">
                <div className="space-y-2.5 p-5 rounded-2xl bg-[#08080A]/60 border border-[#26262A]">
                  <h4 className="font-bold text-base text-[#F5F0E6] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C8A45C]" />
                    <span>ঐতিহাসিক শিক্ষা:</span>
                  </h4>
                  <p>
                    ফ্রান্সের অর্থমন্ত্রী নিকোলাস ফুকেট রাজা চতুর্দশ লুইকে মুগ্ধ করার জন্য তৎকালীন শ্রেষ্ঠ প্রাসাদে জাঁকজমকপূর্ণ ভোজের আয়োজন করেছিলেন। রাজা নিজেকে ফুকেটের চেয়ে অপ্রস্তুত দেখে তীব্র নিরাপত্তাহীনতায় ভোগেন এবং পরদিনই ফুকেটকে গ্রেপ্তার করে কারাগারে নিক্ষেপ করেন।
                  </p>
                </div>

                <div className="space-y-2.5 p-5 rounded-2xl bg-[#08080A]/60 border border-[#26262A]">
                  <h4 className="font-bold text-base text-[#F5F0E6] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C8A45C]" />
                    <span>বাস্তব জীবনের কৌশল:</span>
                  </h4>
                  <p>
                    আপনার সুপিরিয়রের সামনে নিজের যোগ্যতা এমনভাবে প্রকাশ করুন যাতে কৃতিত্ব ও কর্তৃত্ব তাদেরই মনে হয়। তাদের অহংকে নিরাপদ রাখা সবচেয়ে বড় বুদ্ধিমত্তা; এরপর আপনার প্রভাব স্বয়ংক্রিয়ভাবেই তৈরি হবে।
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
