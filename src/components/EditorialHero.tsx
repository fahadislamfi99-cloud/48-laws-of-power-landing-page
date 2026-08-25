"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Download, ArrowDown, Smartphone, Search, FileText } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface EditorialHeroProps {
  onOpenOrderModal: () => void;
}

export default function EditorialHero({ onOpenOrderModal }: EditorialHeroProps) {
  const containerRef = useScrollReveal<HTMLElement>();
  const bookRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect on book mockup
  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";
      setTimeout(() => { el.style.transition = ""; }, 600);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      {/* Ambient gold glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#C8A45C]/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C8A45C]/4 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C8A45C]/40"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
              animation: `particleFloat ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2A2A2E] text-xs font-mono text-[#5C5750] animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8A45C] animate-pulse" />
            <span className="font-semibold text-[#9C9488]">সম্পূর্ণ বাংলা ডিজিটাল সংস্করণ • PDF ই-বুক</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-[#5C5750]">
            <span>মূল রচয়িতা: রবার্ট গ্রিন</span>
            <span className="text-[#2A2A2E]">•</span>
            <span>৪৫২ পৃষ্ঠা</span>
            <span className="text-[#2A2A2E]">•</span>
            <span>ইন্টারেক্টিভ সার্চেবল টেক্সট</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Typography */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#C8A45C] uppercase block animate-fadeInUp [animation-delay:100ms]">
                ROBERT GREENE&apos;S DEFINITIVE MASTERWORK
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tight text-[#F0EBE0] leading-[1.02]">
                <span className="block animate-textReveal [animation-delay:200ms]">The 48 Laws</span>
                <span className="block italic font-editorial-serif font-normal text-[#C8A45C] animate-textReveal [animation-delay:400ms]">
                  of Power
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bengali-serif font-bold text-[#9C9488] leading-snug animate-fadeInUp [animation-delay:600ms]">
                {siteConfig.bookSubtitle}
              </h2>
            </div>

            <p className="text-[#9C9488] text-base sm:text-lg leading-[1.9] max-w-xl animate-fadeInUp [animation-delay:700ms]">
              সমাজ প্রকাশ্যে ন্যায় ও নিয়মের কথা বলে, কিন্তু বাস্তবে মানুষের সম্পর্ক ও পেশাদার জগৎ পরিচালিত হয় মনস্তত্ত্ব এবং ক্ষমতার এক অদৃশ্য খেলায়। ৩,০০০ বছরের ঐতিহাসিক অভিজ্ঞতা থেকে সংকলিত এই ৪৮টি নীতি আপনাকে শেখাবে কীভাবে অন্যের আসল উদ্দেশ্য বুঝবেন এবং নিজেকে নিরাপদ রেখে প্রভাবশালী হয়ে উঠবেন।
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fadeInUp [animation-delay:800ms]">
              <button
                onClick={onOpenOrderModal}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full btn-gold text-sm sm:text-base cursor-pointer hover-lift btn-shimmer group"
              >
                <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>ডিজিটাল কপি কিনুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
              </button>

              <a
                href="#deep-dive"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-transparent text-[#C8A45C] font-semibold text-xs sm:text-sm border border-[#C8A45C]/30 hover:border-[#C8A45C]/60 hover:bg-[#C8A45C]/5 transition-all hover-lift group"
              >
                <span>একটি নীতি পড়ে দেখুন</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>

            {/* Feature pills */}
            <div className="pt-4 border-t border-[#2A2A2E] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#5C5750] font-medium animate-fadeInUp [animation-delay:900ms]">
              {[
                { icon: Smartphone, text: "ফোন, ট্যাবলেট ও পিসিতে পড়ার উপযোগী" },
                { icon: Search, text: "সার্চেবল টেক্সট ও ক্লিকযোগ্য সূচি" },
                { icon: FileText, text: "তাৎক্ষণিক ডাউনলোড ও লাইফটাইম অ্যাক্সেস" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 p-2 rounded-xl transition-colors hover:bg-[#111114]">
                  <Icon className="w-4 h-4 text-[#C8A45C] shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Book Mockup with 3D Tilt */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end animate-scaleIn [animation-delay:400ms]">
            <div className="relative max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] w-full">
              {/* Radial glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C8A45C]/20 via-[#C8A45C]/8 to-transparent rounded-full blur-[80px] -z-10 animate-pulseGlow" />

              {/* Book with 3D tilt */}
              <div ref={bookRef} className="relative flex justify-center items-center py-2" style={{ transformStyle: "preserve-3d" }}>
                <img
                  src="/images/book-mockup.png"
                  alt="The 48 Laws of Power বাংলা ডিজিটাল সংস্করণ"
                  className="w-full max-w-[320px] sm:max-w-[370px] h-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] animate-floatSlow"
                />
              </div>

              {/* Specs badge */}
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-[#5C5750] px-4 py-2.5 rounded-2xl bg-[#111114] border border-[#2A2A2E] transition-all duration-300 hover:border-[#C8A45C]/30">
                <span className="font-semibold text-[#9C9488] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45C]" />
                  <span>ডিজিটাল PDF সংস্করণ</span>
                </span>
                <span className="text-[#C8A45C] font-bold">৪৫২ পৃষ্ঠা • ৩৬ MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
