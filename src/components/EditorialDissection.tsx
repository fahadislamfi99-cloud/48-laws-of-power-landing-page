"use client";

import React from "react";
import { Quote, Sparkles, ArrowRight } from "lucide-react";

interface EditorialDissectionProps {
  onOpenOrderModal: () => void;
}

export default function EditorialDissection({
  onOpenOrderModal,
}: EditorialDissectionProps) {
  const principles = [
    {
      num: "০১",
      title: "ন্যায্যতার মোহ বনাম ক্ষমতার বাস্তবতা",
      desc: "সমাজ মুখে সততা ও সহানুভূতির কথা বলে, কিন্তু বাস্তবে ক্ষমতার অধিকারী ব্যক্তির কথাই প্রাধান্য পায়। এই বইটি আপনাকে ভণ্ডামি ত্যাগ করে বাস্তবতাকে স্পষ্ট চোখে দেখতে শেখায়।",
    },
    {
      num: "০২",
      title: "মুখোশ ও অদৃশ্য উদ্দেশ্য",
      desc: "মানুষের বাহ্যিক আচরণ এবং তাদের অন্তর্নিহিত উদ্দেশ্যের মধ্যে বিস্তর ফারাক থাকে। যারা শুধু কথা শোনে তারা ফাঁদে পড়ে, আর যারা প্যাটার্ন লক্ষ্য করে তারা নিয়ন্ত্রণ ধরে রাখে।",
    },
    {
      num: "০৩",
      title: "সুনাম: অপ্রতিরোধ্য মনস্তাত্ত্বিক বর্ম",
      desc: "সুনাম তৈরি হতে বছরের পর বছর সময় লাগে, কিন্তু একটি অসাবধান পদক্ষেপে তা ধূলিসাৎ হতে পারে। সুনাম কীভাবে গড়ে তুলবেন ও রক্ষা করবেন—তার নিখুঁত নির্দেশিকা।",
    },
    {
      num: "০৪",
      title: "নীরবতার কৌশলগত আধিপত্য",
      desc: "অতিরিক্ত কথা বলা মানুষের দুর্বলতা প্রকাশ করে। পরিমিত বাক্যালাপ ও কৌশলগত নীরবতা যেকোনো সামাজিক পরিবেশে আপনার অবস্থানকে রহস্যময় ও শক্তিশালী করে তোলে।",
    },
  ];

  return (
    <section id="thesis" className="py-20 lg:py-28 border-b border-[#E4DED3] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8E6A2F] uppercase block">
                EDITORIAL THESIS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-black tracking-tight text-[#111215] leading-[1.15]">
                কেন ভালো মানুষও <br />
                ক্ষমতার খেলায় হেরে যায়?
              </h2>
              <p className="text-sm sm:text-base text-[#4A4D55] leading-relaxed">
                অধিকাংশ মানুষ বিশ্বাস করে সততা ও কঠোর পরিশ্রমই সাফল্যের একমাত্র মাপকাঠি। কিন্তু মানব ইতিহাস প্রমাণ করে—কৌশলগত দূরদর্শিতা এবং ক্ষমতার ব্যাকরণ না জানলে একজন যোগ্য ব্যক্তিও খুব সহজে কূটকৌশলের শিকার হতে পারেন।
              </p>
            </div>

            {/* 4 Editorial Core Realities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {principles.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-[#E4DED3] space-y-2 shadow-2xs"
                >
                  <span className="text-xs font-mono font-bold text-[#8E6A2F]">
                    {item.num}
                  </span>
                  <h3 className="font-editorial-bengali-serif font-bold text-base text-[#111215]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#555760] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Editorial Pull Quote */}
            <div className="p-6 rounded-2xl bg-[#F7F5EE] border-l-4 border-[#8E6A2F] text-stone-900 space-y-2">
              <p className="font-editorial-bengali-serif italic text-base sm:text-lg leading-relaxed">
                &ldquo;ক্ষমতার খেলায় কোনো নিরপেক্ষ স্থান নেই। আপনি যদি এই খেলার নিয়ম না জানেন, তবে আপনি অজান্তেই অন্যের চালের ঘুঁটি হয়ে যাবেন।&rdquo;
              </p>
              <span className="text-xs font-mono text-[#8E6A2F] font-bold block">
                — রবার্ট গ্রিন (The 48 Laws of Power)
              </span>
            </div>

          </div>

          {/* Right Column: Museum Chess Piece Artwork */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#D5CDBE] bg-white group max-w-[340px] sm:max-w-[380px]">
              <img
                src="/images/chess-king.jpg"
                alt="Strategy & Psychology - Chess King"
                className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4 bg-[#111215] text-[#F7F5EE] text-center">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#DFC07A] uppercase block">
                  STRATEGY & REPUTATION
                </span>
                <p className="text-xs font-editorial-serif italic text-stone-300 mt-0.5">
                  &ldquo;To master power, you must master human nature.&rdquo;
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
