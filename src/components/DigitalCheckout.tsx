"use client";

import React from "react";
import OrderForm from "@/components/OrderForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function DigitalCheckout() {
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <section id="checkout" ref={containerRef} className="py-14 lg:py-20 bg-[#08080A] border-t border-[#26262A]">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 reveal">
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#C8A45C] uppercase block">
            SECURE DIGITAL ACCESS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F0EBE0]">
            ডিজিটাল কপি সংগ্রহ করুন
          </h2>
          <p className="text-[#B8B0A4] text-xs sm:text-sm">
            নিচে আপনার জিমেইল প্রদান করে বিকাশ পেমেন্ট সম্পন্ন করুন। সাথে সাথেই ডাউনলোড লিংক সক্রিয় হবে।
          </p>
        </div>

        {/* Checkout Card */}
        <div className="bg-[#111114] rounded-3xl p-6 sm:p-8 border border-[#2A2A2E] reveal reveal-stagger-1 shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent opacity-80" />
          <OrderForm />
        </div>

      </div>
    </section>
  );
}
