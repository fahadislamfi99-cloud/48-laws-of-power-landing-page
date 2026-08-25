"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import OrderForm from "./OrderForm";
import { Crown, CheckCircle2, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      id="order-section"
      className="relative bg-gradient-to-b from-[#FAF8F5] via-[#F4EDE0] to-[#EDE3D0] text-stone-900 py-20 lg:py-28 overflow-hidden border-t border-[#DFCFA8]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#C59B4B]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Text */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE0CD] border border-[#D5C7A8] text-[#7A5B22] text-xs font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>অর্ডারের শেষ সুযোগ</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bengali-serif font-bold tracking-tight text-[#141518] leading-[1.25]">
            মানুষকে বুঝতে চাইলে, <br className="hidden sm:inline" />
            শুধু তাদের কথা শুনবেন না।
          </h2>

          <p className="text-[#42444C] text-base sm:text-xl font-normal">
            তাদের আচরণ, উদ্দেশ্য এবং <span className="text-[#7A5B22] font-bold">power dynamics</span> লক্ষ্য করতে শিখুন।
          </p>
        </div>

        {/* 2-Column: Left Book Visual / Guarantees, Right Order Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Book & Value Highlights */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] border border-[#C59B4B]/40 max-w-[280px] sm:max-w-[320px]">
                <img
                  src="/images/book-mockup.jpg"
                  alt="The 48 Laws of Power বাংলা সংস্করণ"
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2 bg-white/80 backdrop-blur-xs p-6 rounded-3xl border border-[#DFCFA8] shadow-xs w-full max-w-sm">
              <div className="flex items-center gap-3 text-[#2C2D32] text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#8C6B2A] shrink-0" />
                <span>সম্পূর্ণ বাংলা অনুবাদ ও মানসম্মত বাইন্ডিং</span>
              </div>
              <div className="flex items-center gap-3 text-[#2C2D32] text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#8C6B2A] shrink-0" />
                <span>সারা দেশে সম্পূর্ণ ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-3 text-[#2C2D32] text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#8C6B2A] shrink-0" />
                <span>৭ দিনের নিশ্চিত রিপ্লেসমেন্ট গ্যারান্টি</span>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Checkout Form */}
          <div className="lg:col-span-7">
            <OrderForm />
          </div>

        </div>

      </div>
    </section>
  );
}
