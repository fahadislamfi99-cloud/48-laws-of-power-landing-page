"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Download, ArrowDown, Smartphone, Search, FileText, ChevronDown } from "lucide-react";

interface EditorialHeroProps {
  onOpenOrderModal: () => void;
}

export default function EditorialHero({ onOpenOrderModal }: EditorialHeroProps) {
  const bookRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 3D tilt on book
  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * 15}deg) rotateX(${-y * 10}deg) scale(1.03)`;
    };

    const handleMouseLeave = () => {
      el.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1)";
      setTimeout(() => { el.style.transition = ""; }, 700);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Magnetic hover on CTA
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.15;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "translate(0, 0)";
      setTimeout(() => { el.style.transition = ""; }, 500);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative pt-24 pb-20 md:pt-28 md:pb-24">
      {/* ─── ANIMATED BACKGROUND ──────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#C8A45C]/[0.07] rounded-full blur-[150px] animate-[orbFloat1_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-[#C8A45C]/[0.05] rounded-full blur-[120px] animate-[orbFloat2_15s_ease-in-out_infinite]" />
        <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-[#C8A45C]/[0.04] rounded-full blur-[100px] animate-[orbFloat3_10s_ease-in-out_infinite]" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #C8A45C 1px, transparent 1px), linear-gradient(to bottom, #C8A45C 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 60% 50%, black 20%, transparent 70%)",
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#C8A45C]"
            style={{
              width: `${2 + (i % 2)}px`,
              height: `${2 + (i % 2)}px`,
              opacity: 0.2 + (i % 2) * 0.1,
              left: `${10 + i * 15}%`,
              top: `${20 + (i * 15) % 50}%`,
              animation: `particleFloat ${7 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      {/* Corner accents */}
      <div className="absolute top-24 left-8 w-20 h-20 pointer-events-none opacity-0 animate-[cornerFadeIn_1s_1.5s_forwards] hidden lg:block">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#C8A45C]/30 to-transparent" />
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-[#C8A45C]/30 to-transparent" />
      </div>

      {/* ─── CONTENT ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Top bar */}
        <div className={`flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2A2A2E] text-xs font-mono transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A45C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8A45C]" />
            </span>
            <span className="font-semibold text-[#B8B0A4]">সম্পূর্ণ বাংলা ডিজিটাল সংস্করণ</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-[#8A8278]">
            <span>রবার্ট গ্রিন</span>
            <span className="text-[#2A2A2E]">•</span>
            <span>৪৫২ পৃষ্ঠা</span>
            <span className="text-[#2A2A2E]">•</span>
            <span>সার্চেবল টেক্সট</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* ─── LEFT ──────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-3">
              {/* Mono label */}
              <div className={`flex items-center gap-3 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <div className="h-[1px] w-8 bg-gradient-to-r from-[#C8A45C] to-transparent" />
                <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#C8A45C] uppercase">
                  ROBERT GREENE&apos;S MASTERWORK
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight leading-[0.95]">
                <span className="block overflow-hidden">
                  <span className={`block transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
                    <span className="text-[#F0EBE0]">The 48 Laws</span>
                  </span>
                </span>
                <span className="block overflow-hidden mt-1">
                  <span className={`block italic font-editorial-serif font-normal transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
                    <span className="bg-gradient-to-r from-[#C8A45C] via-[#D4AF6E] to-[#8B6914] bg-clip-text text-transparent bg-[length:200%_auto] animate-[goldShimmer_4s_linear_infinite]">
                      of Power
                    </span>
                  </span>
                </span>
              </h1>

              {/* Bengali subtitle */}
              <h2 className={`text-lg sm:text-xl lg:text-2xl font-bengali-serif font-bold text-[#B8B0A4] leading-snug transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                {siteConfig.bookSubtitle}
              </h2>
            </div>

            {/* Body */}
            <p className={`text-[#B8B0A4] text-base sm:text-lg leading-[1.9] max-w-xl transition-all duration-700 delay-[800ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              সমাজ প্রকাশ্যে ন্যায় ও নিয়মের কথা বলে, কিন্তু বাস্তবে মানুষের সম্পর্ক ও পেশাদার জগৎ পরিচালিত হয় মনস্তত্ত্ব এবং ক্ষমতার এক অদৃশ্য খেলায়। ৩,০০০ বছরের ঐতিহাসিক অভিজ্ঞতা থেকে সংকলিত এই ৪৮টি নীতি আপনাকে শেখাবে কীভাবে অন্যের আসল উদ্দেশ্য বুঝবেন।
            </p>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-700 delay-[900ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <button
                ref={ctaRef}
                onClick={onOpenOrderModal}
                className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full btn-gold text-sm sm:text-base cursor-pointer hover-lift btn-shimmer group"
              >
                <span className="absolute inset-0 rounded-full bg-[#C8A45C]/20 animate-ping opacity-0 group-hover:opacity-40" style={{ animationDuration: "2s" }} />
                <Download className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span className="relative z-10">ডিজিটাল কপি কিনুন ({siteConfig.currencySymbol}{siteConfig.price})</span>
              </button>

              <a
                href="#deep-dive"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-transparent text-[#C8A45C] font-semibold text-xs sm:text-sm border border-[#C8A45C]/30 hover:border-[#C8A45C]/60 hover:bg-[#C8A45C]/5 transition-all hover-lift group"
              >
                <span>একটি নীতি পড়ে দেখুন</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </div>

            {/* Feature pills */}
            <div className={`pt-5 border-t border-[#2A2A2E] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#B8B0A4] font-medium transition-all duration-700 delay-[1000ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {[
                { icon: Smartphone, text: "ফোন, ট্যাবলেট ও পিসিতে পড়ার উপযোগী" },
                { icon: Search, text: "সার্চেবল টেক্সট ও ক্লিকযোগ্য সূচি" },
                { icon: FileText, text: "তাৎক্ষণিক ডাউনলোড ও লাইফটাইম অ্যাক্সেস" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-transparent transition-all duration-300 hover:bg-[#111114] hover:border-[#2A2A2E] group/feat"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#C8A45C]/10 flex items-center justify-center shrink-0 group-hover/feat:bg-[#C8A45C]/20 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-[#C8A45C]" />
                  </div>
                  <span className="group-hover/feat:text-[#F0EBE0] transition-colors">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Book ───────────────────────────────────── */}
          <div className={`lg:col-span-5 flex flex-col items-center lg:items-end transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}>
            <div className="relative max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] w-full">
              {/* Radial glow */}
              <div className="absolute inset-[-30%] bg-gradient-to-tr from-[#C8A45C]/[0.12] via-[#C8A45C]/[0.04] to-transparent rounded-full blur-[80px] -z-10 animate-pulseGlow" />

              {/* Book */}
              <div
                ref={bookRef}
                className="relative flex justify-center items-center py-2"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Shadow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[20px] bg-[#C8A45C]/10 rounded-full blur-[20px] animate-floatSlow" />

                <img
                  src="/images/book-mockup.png"
                  alt="The 48 Laws of Power বাংলা ডিজিটাল সংস্করণ"
                  className="w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] h-auto object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.5)] animate-floatSlow relative z-10"
                />
              </div>

              {/* Specs badge */}
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono px-4 py-3 rounded-2xl bg-[#111114] border border-[#2A2A2E] transition-all duration-500 hover:border-[#C8A45C]/30">
                <span className="font-semibold text-[#B8B0A4] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45C] animate-pulse" />
                  <span>ডিজিটাল PDF</span>
                </span>
                <span className="text-[#C8A45C] font-bold">৪৫২ পৃষ্ঠা • ৩৬ MB</span>
              </div>

              {/* Floating stat badges (desktop only) */}
              <div className="absolute -left-6 top-1/4 opacity-0 animate-[floatBadgeIn_0.8s_1.2s_forwards] hidden lg:block">
                <div className="px-3 py-2 rounded-lg bg-[#111114] border border-[#2A2A2E] text-[11px] font-mono shadow-lg">
                  <span className="text-[#C8A45C] font-bold">৪৮টি</span> <span className="text-[#B8B0A4]">নীতি</span>
                </div>
              </div>
              <div className="absolute -right-4 bottom-1/3 opacity-0 animate-[floatBadgeIn_0.8s_1.5s_forwards] hidden lg:block">
                <div className="px-3 py-2 rounded-lg bg-[#111114] border border-[#2A2A2E] text-[11px] font-mono shadow-lg">
                  <span className="text-[#C8A45C] font-bold">৩,০০০+</span> <span className="text-[#B8B0A4]">বছরের জ্ঞান</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`flex justify-center transition-all duration-700 delay-[1200ms] ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <a href="#thesis" className="flex flex-col items-center gap-2 text-[#8A8278] hover:text-[#C8A45C] transition-colors group">
            <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
