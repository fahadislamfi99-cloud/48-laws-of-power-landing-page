"use client";

import React, { useState } from "react";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";

export default function DeepDiveLaw() {
  const [selectedLaw, setSelectedLaw] = useState<1 | 4>(4);

  return (
    <section id="deep-dive" className="py-20 lg:py-28 border-b border-[#E6E0D4] bg-[#F7F5EE]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8F6B2C] uppercase block">
            AN INSIGHT FROM THE BOOK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#121316]">
            একটি নীতি, বাস্তব দৃষ্টিভঙ্গির পরিবর্তন
          </h2>
          <p className="text-[#52555E] text-base sm:text-lg">
            বইটি থেকে একটি নীতি মনোযোগ দিয়ে পড়ুন। এটি বুঝলে আপনি বুঝতে পারবেন বাকি ৪৭টি নীতি কীভাবে আপনার চিন্তার পরিসীমা বদলে দেবে।
          </p>
        </div>

        {/* Tab Switcher for 2 Deep Dive Lessons */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedLaw(4)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
              selectedLaw === 4
                ? "bg-[#121316] text-[#FAF8F5] shadow-xs"
                : "bg-white text-stone-600 border border-[#D8D0C3] hover:bg-[#FAF8F5]"
            }`}
          >
            LAW 04: নীরবতার শক্তি
          </button>
          <button
            onClick={() => setSelectedLaw(1)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
              selectedLaw === 1
                ? "bg-[#121316] text-[#FAF8F5] shadow-xs"
                : "bg-white text-stone-600 border border-[#D8D0C3] hover:bg-[#FAF8F5]"
            }`}
          >
            LAW 01: সুপিরিয়রের অহং
          </button>
        </div>

        {/* The Masterclass Editorial Document */}
        <div className="bg-white rounded-3xl border border-[#D8D0C3] shadow-md p-8 sm:p-12 space-y-8">
          
          {selectedLaw === 4 ? (
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-2 border-b border-[#E6E0D4] pb-6">
                <span className="text-xs font-mono font-bold text-[#8F6B2C] tracking-widest uppercase">
                  LAW 04 • The 48 Laws of Power (বাংলা সংস্করণ)
                </span>
                <h3 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#121316]">
                  প্রয়োজনের চেয়ে সর্বদা কম কথা বলুন
                </h3>
                <p className="text-sm font-mono text-stone-500">
                  Always Say Less Than Necessary
                </p>
              </div>

              {/* Core Principle Quote */}
              <div className="p-5 rounded-xl bg-[#FAF8F5] border-l-4 border-[#8F6B2C] text-[#2C2D32] italic text-base sm:text-lg leading-relaxed font-bengali-serif">
                &ldquo;যখন আপনি কথা দিয়ে কাউকে মুগ্ধ করার চেষ্টা করবেন, আপনি যত বেশি কথা বলবেন তত বেশি সাধারণ মনে হবে এবং নিজের নিয়ন্ত্রণ হারানোর সম্ভাবনা বাড়বে। ক্ষমতাবান মানুষ পরিমিত কথা বলে অন্যদের ওপর এক ধরণের অদৃশ্য মনস্তাত্ত্বিক চাপ সৃষ্টি করে।&rdquo;
              </div>

              {/* Detailed Breakdown in 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#42454D] leading-relaxed">
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-[#121316] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8F6B2C]" />
                    <span>মনস্তাত্ত্বিক কারণ:</span>
                  </h4>
                  <p>
                    নীরবতা মানুষকে অস্বস্তিতে ফেলে। যখন আপনি কোনো গুরুত্বপূর্ণ আলোচনায় ইচ্ছাকৃতভাবে শান্ত ও নীরব থাকবেন, তখন অন্যপক্ষ সেই নীরবতার শূন্যতা পূরণ করার জন্য নিজে অতিরিক্ত কথা বলতে শুরু করবে। এর ফলে তারা নিজেদের অজান্তেই লুকানো দুর্বলতা ও আসল উদ্দেশ্য প্রকাশ করে ফেলবে।
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-base text-[#121316] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8F6B2C]" />
                    <span>বাস্তব জীবনের কৌশল:</span>
                  </h4>
                  <p>
                    যেকোনো নেগোসিয়েশন বা কর্মক্ষেত্রের বিতর্কে আপনার চূড়ান্ত উত্তর সংক্ষিপ্ত ও দ্ব্যর্থহীন রাখুন। কম কথার মানুষ সবসময় রহস্যময় ও গভীর মনে হয়। কথা হলো তীরের মতো—একবার মুখ থেকে বেরিয়ে গেলে তা আর ফিরিয়ে আনা যায় না।
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-2 border-b border-[#E6E0D4] pb-6">
                <span className="text-xs font-mono font-bold text-[#8F6B2C] tracking-widest uppercase">
                  LAW 01 • The 48 Laws of Power (বাংলা সংস্করণ)
                </span>
                <h3 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#121316]">
                  মাস্টার বা শীর্ষ ব্যক্তিকে কখনো নিজের চেয়ে বেশি উজ্জ্বল দেখাবেন না
                </h3>
                <p className="text-sm font-mono text-stone-500">
                  Never Outshine the Master
                </p>
              </div>

              {/* Core Principle Quote */}
              <div className="p-5 rounded-xl bg-[#FAF8F5] border-l-4 border-[#8F6B2C] text-[#2C2D32] italic text-base sm:text-lg leading-relaxed font-bengali-serif">
                &ldquo;সর্বদা আপনার ওপরের লোকদের স্বাচ্ছন্দ্য এবং শ্রেষ্ঠত্বের অনুভূতি দিন। তাদের সন্তুষ্ট করতে গিয়ে অতিরিক্ত নিজের প্রতিভা প্রদর্শন করবেন না, কারণ এতে তারা চরম নিরাপত্তাহীনতায় ভুগতে পারে।&rdquo;
              </div>

              {/* Detailed Breakdown in 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#42454D] leading-relaxed">
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-[#121316] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8F6B2C]" />
                    <span>ঐতিহাসিক শিক্ষা:</span>
                  </h4>
                  <p>
                    ফ্রান্সের অর্থমন্ত্রী নিকোলাস ফুকেট রাজা চতুর্দশ লুইকে মুগ্ধ করার জন্য তৎকালীন শ্রেষ্ঠ প্রাসাদে জাঁকজমকপূর্ণ ভোজের আয়োজন করেছিলেন। রাজা নিজেকে ফুকেটের চেয়ে অপ্রস্তুত দেখে তীব্র নিরাপত্তাহীনতায় ভোগেন এবং পরদিনই ফুকেটকে গ্রেপ্তার করে কারাগারে নিক্ষেপ করেন।
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-base text-[#121316] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8F6B2C]" />
                    <span>বাস্তব জীবনের কৌশল:</span>
                  </h4>
                  <p>
                    আপনার সুপিরিয়রের সামনে নিজের যোগ্যতা এমনভাবে প্রকাশ করুন যাতে কৃতিত্ব ও কর্তৃত্ব তাদেরই মনে হয়। তাদের অহংকে নিরাপদ রাখা সবচেয়ে বড় বুদ্ধিমত্তা; এরপর আপনার প্রভাব স্বয়ংক্রিয়ভাবেই তৈরি হবে।
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
