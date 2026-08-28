"use client";

import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/data/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { sampleChapters, SampleChapter, SamplePage } from "@/data/sampleChaptersData";
import {
  Download, ChevronLeft, ChevronRight, BookOpen,
  Maximize2, X, FileText, Type, Coffee, Moon, Sun,
  Quote, Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PdfSamplePreviewProps {
  onOpenOrderModal: () => void;
}

export default function PdfSamplePreview({ onOpenOrderModal }: PdfSamplePreviewProps) {
  const containerRef = useScrollReveal<HTMLElement>();

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [readerTheme, setReaderTheme] = useState<"charcoal" | "sepia" | "dark">("charcoal");
  const [fontStyle, setFontStyle] = useState<"serif" | "sans">("serif");
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPageFlipping, setIsPageFlipping] = useState(false);

  const readerScrollRef = useRef<HTMLDivElement | null>(null);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const activeChapter: SampleChapter = sampleChapters[activeChapterIndex];
  const currentPage: SamplePage = activeChapter.pages[currentPageIndex] || activeChapter.pages[0];
  const totalPages = activeChapter.pages.length;

  // Convert digits to Bengali
  const toBengaliNumber = (num: number | string): string => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
      .toString()
      .split("")
      .map((ch) => {
        const digit = parseInt(ch, 10);
        return isNaN(digit) ? ch : bengaliDigits[digit];
      })
      .join("");
  };

  // Lock body scroll when fullscreen modal is open
  useEffect(() => {
    if (isFullscreen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isFullscreen]);

  // Scroll to top of preview viewport whenever page changes
  const resetScrollToTop = () => {
    if (readerScrollRef.current) {
      readerScrollRef.current.scrollTop = 0;
    }
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  };

  // Reset page when changing chapter
  const handleSelectChapter = (idx: number) => {
    if (idx === activeChapterIndex) return;
    setIsPageFlipping(true);
    setTimeout(() => {
      setActiveChapterIndex(idx);
      setCurrentPageIndex(0);
      setIsPageFlipping(false);
      resetScrollToTop();
    }, 100);
  };

  // Page navigation
  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setIsPageFlipping(true);
      setTimeout(() => {
        setCurrentPageIndex((p) => p - 1);
        setIsPageFlipping(false);
        resetScrollToTop();
      }, 100);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setIsPageFlipping(true);
      setTimeout(() => {
        setCurrentPageIndex((p) => p + 1);
        setIsPageFlipping(false);
        resetScrollToTop();
      }, 100);
    }
  };

  const handleJumpPage = (pIdx: number) => {
    if (pIdx === currentPageIndex) return;
    setIsPageFlipping(true);
    setTimeout(() => {
      setCurrentPageIndex(pIdx);
      setIsPageFlipping(false);
      resetScrollToTop();
    }, 100);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevPage();
      if (e.key === "ArrowRight") handleNextPage();
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (diff > 50) {
      handleNextPage();
    } else if (diff < -50) {
      handlePrevPage();
    }
    touchStartXRef.current = null;
  };

  // Theme styling
  const getThemeClasses = () => {
    switch (readerTheme) {
      case "sepia":
        return "bg-[#181512] border-[#3D352B] text-[#EFE5D8]";
      case "dark":
        return "bg-[#060608] border-[#1E1E24] text-[#D8D2C7]";
      case "charcoal":
      default:
        return "bg-[#0F0F14] border-[#2A2A30] text-[#F3EFE6]";
    }
  };

  return (
    <section
      id="sample-preview"
      ref={containerRef}
      className="py-14 lg:py-20 bg-[#08080A] border-t border-[#26262A] relative overflow-hidden"
    >
      {/* Subtle Warm Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C8A45C]/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── 1. SECTION HEADER ───────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 reveal">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/25 text-[#C8A45C] font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase">
              <span>READ A SAMPLE • একটু পড়ে দেখুন</span>
            </div>
            <div className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold tracking-tight text-[#F0EBE0] leading-[1.25]">
            কেনার আগে বইটির কিছু পৃষ্ঠা পড়ে দেখুন
          </h2>

          <p className="text-[#D1C9BC] text-sm sm:text-base lg:text-lg leading-[1.8]">
            বইটির অনুবাদ, typography এবং reading experience সম্পর্কে ধারণা নিতে নিচের ৩টি নমুনা অধ্যায় সরাসরি এখানে পড়ে দেখুন।
          </p>
        </div>

        {/* ─── 2. SAMPLE TABS (3 REAL CHAPTERS) ────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-8 reveal reveal-stagger-1">
          {sampleChapters.map((chapter, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => handleSelectChapter(idx)}
                className={`p-4 sm:p-5 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${isActive
                    ? "bg-[#141419] border-[#C8A45C] shadow-[0_4px_30px_rgba(200,164,92,0.18)] scale-[1.01]"
                    : "bg-[#0D0D10] border-[#26262A] hover:border-[#3A3A3E] hover:bg-[#121216]"
                  }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C8A45C] uppercase tracking-wider">
                      {chapter.lawNumberStr}
                    </span>
                    <span className="text-[11px] font-semibold text-[#A8A095] bg-[#08080A] px-2.5 py-0.5 rounded-full border border-[#26262A]">
                      {chapter.pageRange}
                    </span>
                  </div>

                  <h3 className="font-bengali-serif font-bold text-sm sm:text-base text-[#F0EBE0] group-hover:text-[#C8A45C] transition-colors line-clamp-2 leading-snug">
                    {chapter.titleBn}
                  </h3>

                  <p className="text-[11px] font-mono text-[#8A8278] truncate">
                    {chapter.titleEn}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#26262A] flex items-center justify-between text-xs">
                  <span className={`font-semibold flex items-center gap-1.5 ${isActive ? "text-[#C8A45C]" : "text-[#8A8278]"}`}>
                    <FileText className="w-3.5 h-3.5" />
                    <span>{toBengaliNumber(chapter.totalPages)} পৃষ্ঠার সম্পূর্ণ পাঠ</span>
                  </span>
                  <span className={`text-[11px] font-bold ${isActive ? "text-emerald-400" : "text-[#8A8278]"}`}>
                    {isActive ? "পড়ছেন ✓" : "পড়ুন →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── 3. IN-PAGE COMPACT DIGITAL BOOK READER ──────────── */}
        <div className="bg-[#111114] rounded-3xl border border-[#26262A] overflow-hidden shadow-2xl reveal-scale reveal-stagger-2 transition-all duration-300 hover:border-[#C8A45C]/35">

          {/* Reader Top Toolbar */}
          <div className="p-3.5 sm:p-4 bg-[#0A0A0D] border-b border-[#26262A] flex flex-wrap items-center justify-between gap-3 text-xs">

            {/* Title & Page count */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#C8A45C]/10 text-[#C8A45C] font-mono font-bold text-xs shrink-0 border border-[#C8A45C]/20">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{activeChapter.lawNumberStr}</span>
              </span>
              <span className="text-xs text-[#8A8278] hidden sm:inline">•</span>
              <span className="font-semibold text-[#D1C9BC] text-xs truncate">
                {currentPage.pdfPageStr} ({activeChapter.pageRange})
              </span>
            </div>

            {/* Customization Controls Bar */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">

              {/* Font Style Toggle (Serif vs Sans) */}
              <button
                type="button"
                onClick={() => setFontStyle(fontStyle === "serif" ? "sans" : "serif")}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#16161B] border border-[#26262A] text-xs font-semibold text-[#D1C9BC] hover:text-[#C8A45C] hover:border-[#C8A45C]/40 transition-colors cursor-pointer"
                title="ফন্ট পরিবর্তন"
              >
                <Type className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{fontStyle === "serif" ? "সেরিফ" : "সান্স"}</span>
              </button>

              {/* Font Size Toggle */}
              <button
                type="button"
                onClick={() => setFontSize(fontSize === "normal" ? "large" : "normal")}
                className="px-2.5 py-1.5 rounded-xl bg-[#16161B] border border-[#26262A] text-xs font-mono font-bold text-[#D1C9BC] hover:text-[#C8A45C] transition-colors cursor-pointer"
                title="লেখা বড় / স্বাভাবিক করুন"
              >
                {fontSize === "normal" ? "A+" : "A"}
              </button>

              {/* Theme Palette Toggle */}
              <div className="flex items-center gap-1 bg-[#16161B] p-1 rounded-xl border border-[#26262A]">
                {[
                  { id: "charcoal" as const, Icon: Moon, label: "চারকোল ডার্ক" },
                  { id: "sepia" as const, Icon: Coffee, label: "ওয়ার্ম সেপিয়া" },
                  { id: "dark" as const, Icon: Sun, label: "পিচ ব্ল্যাক" },
                ].map(({ id, Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setReaderTheme(id)}
                    className={`p-1.5 rounded-lg cursor-pointer transition-all ${readerTheme === id
                        ? "bg-[#C8A45C]/20 text-[#C8A45C]"
                        : "text-[#8A8278] hover:text-[#D1C9BC]"
                      }`}
                    title={label}
                    aria-label={label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>

              {/* Fullscreen Lightbox Toggle */}
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#16161B] border border-[#26262A] text-xs font-semibold text-[#D1C9BC] hover:text-[#C8A45C] hover:border-[#C8A45C]/40 transition-all cursor-pointer hover-lift"
                title="বড় ভিউতে পড়ুন (Fullscreen)"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>বড় ভিউ</span>
              </button>

            </div>
          </div>

          {/* Reader Body (Fixed-Height Viewport with Internal Scroll) */}
          <div
            ref={readerScrollRef}
            data-lenis-prevent
            className="relative bg-[#070709] h-[380px] sm:h-[440px] lg:h-[480px] overflow-y-auto overflow-x-hidden p-3 sm:p-6 lg:p-8 select-text custom-reader-scroll"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Main Book Page Content Sheet */}
            <div
              className={`w-full max-w-3xl mx-auto rounded-2xl border p-5 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-200 relative ${getThemeClasses()} ${fontStyle === "serif" ? "font-bengali-serif" : "font-bengali-sans"
                } ${fontSize === "large" ? "text-base sm:text-lg" : "text-sm sm:text-base"} ${isPageFlipping ? "opacity-30 scale-[0.99] translate-y-1" : "opacity-100 scale-100 translate-y-0"
                }`}
            >
              {/* Top Header of Page */}
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/10 text-xs text-[#8A8278]">
                <span className="font-mono font-bold text-[#C8A45C] uppercase tracking-wider">
                  {activeChapter.lawNumberStr} • {activeChapter.titleEn}
                </span>
                <span className="font-semibold text-[#A8A095]">
                  {currentPage.pdfPageStr}
                </span>
              </div>

              {/* Section Badge & Title */}
              <div className="mb-5 space-y-2">
                {currentPage.sectionBadge && (
                  <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-[#C8A45C] bg-[#C8A45C]/10 px-2.5 py-0.5 rounded border border-[#C8A45C]/20">
                    {currentPage.sectionBadge}
                  </span>
                )}
                {currentPage.pageTitle && (
                  <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#F5F0E6] leading-snug">
                    {currentPage.pageTitle}
                  </h3>
                )}
              </div>

              {/* Judgement / Callout Box */}
              {currentPage.calloutBox && (
                <div className="p-5 sm:p-7 rounded-2xl bg-[#141419] border border-[#C8A45C]/40 text-[#F5F0E6] shadow-md my-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-[#C8A45C]">
                    <Compass className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      {currentPage.calloutBox.title}
                    </span>
                  </div>
                  <p className="font-bengali-serif text-base sm:text-lg italic leading-[2.0] text-[#F7F3EB]">
                    &ldquo;{currentPage.calloutBox.text}&rdquo;
                  </p>
                </div>
              )}

              {/* Historical Sidebar Quote */}
              {currentPage.sidebarQuote && (
                <div className="my-5 p-4 sm:p-5 rounded-xl bg-[#131217] border-l-4 border-[#C8A45C] border-y border-r border-white/5 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <Quote className="w-4 h-4 text-[#C8A45C] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm italic text-[#E8DFD0] leading-relaxed">
                      &ldquo;{currentPage.sidebarQuote.quote}&rdquo;
                    </p>
                  </div>
                  <div className="text-[11px] font-semibold text-[#A8A095] text-right">
                    — <span className="text-[#C8A45C] font-bold">{currentPage.sidebarQuote.author}</span>
                    {currentPage.sidebarQuote.sourceOrDates && ` (${currentPage.sidebarQuote.sourceOrDates})`}
                  </div>
                </div>
              )}

              {/* Unabridged Paragraphs */}
              {currentPage.bodyParagraphs.length > 0 && (
                <div className="space-y-4 leading-[1.9] text-justify text-[#DCD6CA]">
                  {currentPage.bodyParagraphs.map((para, pIdx) => (
                    <p key={pIdx}>
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {/* Page Footer Watermark */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8A8278]">
                <span className="text-[11px] text-[#A8A095]">
                  The 48 Laws of Power (বাংলা সংস্করণ) • {currentPage.pdfPageStr}
                </span>
                <span className="text-[10px] font-mono text-[#C8A45C] font-semibold bg-[#C8A45C]/10 px-2 py-0.5 rounded border border-[#C8A45C]/20">
                  নমুনা প্রিভিউ
                </span>
              </div>

            </div>
          </div>

          {/* Reader Bottom Navigation & Thumbnail Scrubber */}
          <div className="p-3.5 sm:p-5 bg-[#0A0A0D] border-t border-[#26262A] flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Page Count Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className="px-3.5 py-1.5 rounded-xl bg-[#16161B] border border-[#26262A] text-xs font-semibold text-[#D1C9BC] hover:text-[#C8A45C] hover:border-[#C8A45C]/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                ← আগের পৃষ্ঠা
              </button>

              <div className="text-xs font-semibold text-[#F0EBE0] px-3 py-1 bg-[#111114] rounded-lg border border-[#26262A]">
                পৃষ্ঠা <span className="text-[#C8A45C] font-bold">{toBengaliNumber(currentPageIndex + 1)}</span> / {toBengaliNumber(totalPages)}
              </div>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPageIndex === totalPages - 1}
                className="px-3.5 py-1.5 rounded-xl bg-[#16161B] border border-[#26262A] text-xs font-semibold text-[#D1C9BC] hover:text-[#C8A45C] hover:border-[#C8A45C]/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                পরের পৃষ্ঠা →
              </button>
            </div>

            {/* Quick Page Jump Scrubber / Pills */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, pIdx) => {
                const isSelected = currentPageIndex === pIdx;
                const pageItem = activeChapter.pages[pIdx];
                return (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handleJumpPage(pIdx)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${isSelected
                        ? "bg-[#C8A45C] text-[#08080A] shadow-xs scale-105"
                        : "bg-[#16161B] text-[#8A8278] hover:text-[#F0EBE0] hover:bg-[#202026] border border-[#26262A]"
                      }`}
                    title={pageItem.pdfPageStr}
                  >
                    <span>{pageItem.pdfPageStr.replace("পৃষ্ঠা ", "পৃ. ")}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* ─── 4. BOTTOM VALUE / CONVERSION BANNER ─────────────── */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121216] via-[#16161C] to-[#121216] border border-[#2A2A30] flex flex-col md:flex-row items-center justify-between gap-6 reveal reveal-stagger-3 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold uppercase text-[#C8A45C] bg-[#C8A45C]/10 px-2.5 py-0.5 rounded-md border border-[#C8A45C]/20">
                সম্পূর্ণ ডিজিটাল PDF সংস্করণ
              </span>
              <span className="text-xs text-emerald-400 font-semibold">
                তাৎক্ষণিক লাইফটাইম অ্যাক্সেস
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bengali-serif font-bold text-[#F0EBE0]">
              অনুবাদ ও বিষয়বস্তু পছন্দ হয়েছে? সম্পূর্ণ ৫০৯ পৃষ্ঠার বইটি এখনই সংগ্রহ করুন
            </h4>
            <p className="text-xs sm:text-sm text-[#D1C9BC] max-w-xl">
              বইটিতে রয়েছে পুরো ৪৮টি নীতি, মানব মনস্তত্ত্বের খুঁটিনাটি এবং সার্চেবল ক্লিকযোগ্য সূচিপত্র। কোনো ফিজিক্যাল কপি বা কুরিয়ার ঝামেলা নেই।
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full btn-gold text-sm sm:text-base font-bold cursor-pointer hover-lift btn-shimmer shadow-lg whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>সম্পূর্ণ বই সংগ্রহ করুন ({siteConfig.currencySymbol}{siteConfig.price})</span>
            </button>
          </div>
        </div>

      </div>

      {/* ─── 5. FULLSCREEN / LIGHTBOX MODAL (NO TOP-CROPPING & FULL SCROLL) ───────────────────── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            key="pdf-fullscreen-lightbox"
            initial={{ opacity: 0, scale: 0.98, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, scale: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, scale: 0.98, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col will-change-[transform,opacity,backdrop-filter]"
          >
            {/* Lightbox Sticky Header */}
            <div className="sticky top-0 z-30 p-3.5 sm:p-4 bg-[#0A0A0D]/95 backdrop-blur-md border-b border-[#26262A] flex items-center justify-between text-xs px-4 sm:px-6">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <span className="text-xs font-mono font-bold text-[#C8A45C] bg-[#C8A45C]/10 px-2.5 py-1 rounded-md border border-[#C8A45C]/20 shrink-0">
                  {activeChapter.lawNumberStr}
                </span>
                <span className="font-bengali-serif font-bold text-[#F0EBE0] text-xs sm:text-sm truncate">
                  {activeChapter.titleBn}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-3">
                <span className="text-xs font-semibold text-[#A8A095] hidden sm:inline">
                  {currentPage.pdfPageStr} ({toBengaliNumber(currentPageIndex + 1)}/{toBengaliNumber(totalPages)})
                </span>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 sm:p-2.5 rounded-full bg-[#16161B] hover:bg-[#202026] text-[#D1C9BC] hover:text-[#F0EBE0] border border-[#26262A] hover:border-[#C8A45C]/50 transition-all duration-300 cursor-pointer group"
                  aria-label="Close fullscreen"
                  title="বন্ধ করুন (ESC)"
                >
                  <X className="w-5 h-5 transition-transform duration-300 ease-out group-hover:rotate-90" />
                </button>
              </div>
            </div>

            {/* Lightbox Scrollable Reader Body (Independent Full Scrolling, Zero Top-Cropping) */}
            <div
              ref={modalScrollRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-8 lg:p-10 custom-reader-scroll relative"
            >
              {/* Floating Left/Right Navigation Buttons */}
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#111114]/90 border border-[#26262A] text-[#F0EBE0] hover:text-[#C8A45C] hover:border-[#C8A45C] flex items-center justify-center shadow-2xl transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous Page"
                title="আগের পৃষ্ঠা"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPageIndex === totalPages - 1}
                className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#111114]/90 border border-[#26262A] text-[#F0EBE0] hover:text-[#C8A45C] hover:border-[#C8A45C] flex items-center justify-center shadow-2xl transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next Page"
                title="পরের পৃষ্ঠা"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Document Sheet */}
              <div
                className={`w-full max-w-3xl mx-auto rounded-3xl border p-6 sm:p-10 lg:p-12 shadow-2xl ${getThemeClasses()} ${fontStyle === "serif" ? "font-bengali-serif" : "font-bengali-sans"
                  } text-base sm:text-lg`}
              >
                <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/10 text-xs text-[#8A8278]">
                  <span className="font-mono font-bold text-[#C8A45C] uppercase tracking-wider">
                    {activeChapter.lawNumberStr} • {activeChapter.titleEn}
                  </span>
                  <span className="font-semibold text-[#A8A095]">
                    {currentPage.pdfPageStr}
                  </span>
                </div>

                {currentPage.sectionBadge && (
                  <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-[#C8A45C] bg-[#C8A45C]/10 px-2.5 py-0.5 rounded border border-[#C8A45C]/20 mb-3">
                    {currentPage.sectionBadge}
                  </span>
                )}

                {currentPage.pageTitle && (
                  <h3 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#F0EBE0] mb-5 leading-snug">
                    {currentPage.pageTitle}
                  </h3>
                )}

                {currentPage.calloutBox && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#141419] border border-[#C8A45C]/40 text-[#F5F0E6] shadow-md my-4 space-y-3">
                    <div className="flex items-center gap-2 text-[#C8A45C]">
                      <Compass className="w-4 h-4" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">
                        {currentPage.calloutBox.title}
                      </span>
                    </div>
                    <p className="font-bengali-serif text-base sm:text-lg italic leading-[2.0] text-[#F7F3EB]">
                      &ldquo;{currentPage.calloutBox.text}&rdquo;
                    </p>
                  </div>
                )}

                {currentPage.sidebarQuote && (
                  <div className="my-5 p-5 rounded-xl bg-[#131217] border-l-4 border-[#C8A45C] border-y border-r border-white/5 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <Quote className="w-4 h-4 text-[#C8A45C] shrink-0 mt-0.5" />
                      <p className="text-sm italic text-[#E8DFD0] leading-relaxed">
                        &ldquo;{currentPage.sidebarQuote.quote}&rdquo;
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-[#A8A095] text-right">
                      — <span className="text-[#C8A45C] font-bold">{currentPage.sidebarQuote.author}</span>
                      {currentPage.sidebarQuote.sourceOrDates && ` (${currentPage.sidebarQuote.sourceOrDates})`}
                    </div>
                  </div>
                )}

                {currentPage.bodyParagraphs.length > 0 && (
                  <div className="space-y-4 leading-[1.9] text-justify text-[#DCD6CA]">
                    {currentPage.bodyParagraphs.map((para, pIdx) => (
                      <p key={pIdx}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Lightbox Sticky Footer Actions */}
            <div className="sticky bottom-0 z-30 p-3.5 sm:p-4 bg-[#0A0A0D]/95 backdrop-blur-md border-t border-[#26262A] flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={currentPageIndex === 0}
                  className="px-3 py-1.5 rounded-xl bg-[#16161B] border border-[#26262A] text-xs font-semibold text-[#D1C9BC] hover:text-[#C8A45C] hover:border-[#C8A45C]/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  ← আগের পৃষ্ঠা
                </button>
                <span className="text-xs font-semibold text-[#F0EBE0] px-2.5 py-1 bg-[#111114] rounded-lg border border-[#26262A]">
                  {toBengaliNumber(currentPageIndex + 1)} / {toBengaliNumber(totalPages)}
                </span>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPageIndex === totalPages - 1}
                  className="px-3 py-1.5 rounded-xl bg-[#16161B] border border-[#26262A] text-xs font-semibold text-[#D1C9BC] hover:text-[#C8A45C] hover:border-[#C8A45C]/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  পরের পৃষ্ঠা →
                </button>
              </div>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsFullscreen(false);
                    onOpenOrderModal();
                  }}
                  className="px-6 py-2.5 rounded-full btn-gold text-xs font-bold flex items-center gap-2 cursor-pointer hover-lift shadow-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>সম্পূর্ণ বইটি কিনুন ({siteConfig.currencySymbol}{siteConfig.price})</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
