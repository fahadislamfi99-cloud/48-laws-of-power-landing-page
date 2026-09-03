"use client";

import React from "react";
import OrderForm from "@/components/OrderForm";
import CountdownTimer from "@/components/CountdownTimer";
import { siteConfig } from "@/data/siteConfig";

export default function DigitalCheckout() {
  return (
    <section id="checkout" className="py-12 sm:py-16 lg:py-20 bg-[#08080A] border-t border-[#26262A] relative overflow-hidden">
      {/* Background ambient gold orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A45C]/[0.045] rounded-full blur-[150px] pointer-events-none animate-[orbFloat1_12s_ease-in-out_infinite]" />

      <div className="max-w-xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
          <div className="sr-eyebrow flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/25 text-[#C8A45C] font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase">
              <span>SECURE DIGITAL ACCESS</span>
            </div>
            <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
          </div>
          <h2 className="sr-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F0EBE0]">
            ডিজিটাল কপি সংগ্রহ করুন
          </h2>
          <p className="sr-desc text-[#B8B0A4] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            নিচে আপনার জিমেইল প্রদান করে বিকাশ পেমেন্ট সম্পন্ন করুন। সাথে সাথেই ডাউনলোড লিংক সক্রিয় হবে।
          </p>
        </div>

        {/* Checkout Card */}
        <div className="sr-scale bg-[#111114] rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 border border-[#2A2A2E] shadow-2xl relative space-y-5 sm:space-y-6 hover:border-[#C8A45C]/35 transition-all duration-300">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent opacity-90" />

          {/* Limited-Time Offer Status Bar */}
          <div className="pb-4 sm:pb-5 border-b border-[#26262A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[#F0EBE0]">
                ২-বুক মাস্টার বান্ডেল ও বিশেষ অফার সক্রিয়
              </span>
            </div>
            <CountdownTimer variant="compact-pill" label="বাকি আছে" />
          </div>

          <OrderForm />
        </div>

      </div>
    </section>
  );
}
