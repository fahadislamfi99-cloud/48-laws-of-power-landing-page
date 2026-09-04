"use client";

import React, { useState, useEffect } from "react";
import { X, BookOpen, Sparkles, ArrowRight, ShieldCheck, Flame, Heart } from "lucide-react";
import { SEDUCTION_SAMPLE_LESSONS, SEDUCER_ARCHETYPES } from "@/data/seductionData";
import { useLenis } from "@/components/SmoothScrollProvider";

interface SeductionLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: (coupon?: string) => void;
}

export default function SeductionLessonModal({
  isOpen,
  onClose,
  onOpenOrderModal,
}: SeductionLessonModalProps) {
  const { lenis } = useLenis();
  const [activeTab, setActiveTab] = useState<"lessons" | "archetypes">("lessons");
  const [selectedLessonId, setSelectedLessonId] = useState<string>("lesson_1");
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>("siren");

  useEffect(() => {
    if (!isOpen) return;

    // 1. Pause Lenis smooth scrolling instance
    lenis?.stop();

    // 2. Prevent body & html background scroll + compensate scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      lenis?.start();
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose, lenis]);

  if (!isOpen) return null;

  const currentLesson = SEDUCTION_SAMPLE_LESSONS.find((l) => l.id === selectedLessonId) || SEDUCTION_SAMPLE_LESSONS[0];
  const currentArchetype = SEDUCER_ARCHETYPES.find((a) => a.id === selectedArchetypeId) || SEDUCER_ARCHETYPES[0];

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-x-hidden overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        data-lenis-prevent
        className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto bg-[#0E0E12] rounded-2xl sm:rounded-3xl border border-[#2A2A2E] shadow-[0_25px_80px_rgba(0,0,0,0.9)] my-auto z-10 animate-in fade-in zoom-in-95 duration-200"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#2A2A2E transparent" }}
      >
        {/* Luxury top accent gradient */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E11D48] to-transparent" />

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0E0E12]/95 backdrop-blur-md border-b border-[#1A1A1E]">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-[#E11D48]/10 text-[#E11D48]">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#E11D48] uppercase font-bold">
                The Art of Seduction • বাংলা সংস্করণ
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#F0EBE0] font-bengali-serif">
                একটি গোপন মনস্তাত্ত্বিক পাঠ
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-[#1A1A1E] hover:bg-[#2A2A2E] text-[#D1C9BC] hover:text-[#F0EBE0] transition-colors cursor-pointer"
            aria-label="Close reader"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="flex p-1 bg-[#15151A] rounded-xl border border-[#24242A]">
            <button
              onClick={() => setActiveTab("lessons")}
              className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "lessons"
                  ? "bg-[#E11D48] text-white shadow-md"
                  : "text-[#A8A095] hover:text-[#F0EBE0]"
              }`}
            >
              📖 বাস্তব শিক্ষা ও স্ট্র্যাটেজি
            </button>
            <button
              onClick={() => setActiveTab("archetypes")}
              className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "archetypes"
                  ? "bg-[#C8A45C] text-[#08080A] shadow-md font-bold"
                  : "text-[#A8A095] hover:text-[#F0EBE0]"
              }`}
            >
              🎭 ৯টি প্রলোভক ব্যক্তিত্ব (Archetypes)
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5">
          {activeTab === "lessons" ? (
            <div className="space-y-4">
              {/* Lesson Pill Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SEDUCTION_SAMPLE_LESSONS.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`text-left p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedLessonId === lesson.id
                        ? "bg-[#1A161B] border-[#E11D48]/50 shadow-[0_0_15px_rgba(225,29,72,0.15)]"
                        : "bg-[#121216] border-[#1E1E24] hover:border-[#2A2A34] text-[#A8A095]"
                    }`}
                  >
                    <span className="text-[10px] font-mono text-[#E11D48] block">{lesson.category}</span>
                    <span className="text-xs sm:text-sm font-bold text-[#F0EBE0] block mt-0.5 line-clamp-1 font-bengali-serif">
                      {lesson.titleBn}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Lesson Content Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#121217] border border-[#22222A] space-y-4 text-[#D1C9BC]">
                <div className="border-b border-[#1E1E24] pb-3">
                  <div className="flex items-center justify-between text-xs text-[#E11D48] font-mono">
                    <span>{currentLesson.category}</span>
                    <span>{currentLesson.readTime}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#F0EBE0] mt-1 font-bengali-serif">
                    {currentLesson.titleBn}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A8A095] mt-1 italic font-bengali-serif">
                    &ldquo;{currentLesson.summary}&rdquo;
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#D1C9BC] font-bengali-serif">
                  {currentLesson.content.map((p, idx) => (
                    <p key={idx} className="leading-[1.8]">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Key Takeaway box */}
                <div className="p-3.5 rounded-xl bg-[#E11D48]/10 border border-[#E11D48]/25 text-[#F0EBE0] text-xs sm:text-sm font-semibold font-bengali-serif flex items-start gap-2.5">
                  <span className="text-[#E11D48] text-base leading-none mt-0.5">💡</span>
                  <span>{currentLesson.takeaway}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Archetypes Selector Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
                {SEDUCER_ARCHETYPES.map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => setSelectedArchetypeId(arch.id)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedArchetypeId === arch.id
                        ? "bg-[#1E1A16] border-[#C8A45C] text-[#C8A45C] shadow-md"
                        : "bg-[#121216] border-[#1E1E24] text-[#A8A095] hover:text-[#F0EBE0]"
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs font-bold block truncate font-bengali-serif">
                      {arch.nameBn}
                    </span>
                    <span className="text-[9px] text-[#A8A095] block truncate">
                      {arch.nameEn}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Archetype Detail */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#121217] border border-[#22222A] space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#1E1E24] pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#C8A45C] uppercase font-bold tracking-wider">
                      Seducer Archetype
                    </span>
                    <h4 className="text-base sm:text-xl font-bold text-[#F0EBE0] font-bengali-serif">
                      {currentArchetype.nameBn} ({currentArchetype.nameEn})
                    </h4>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#C8A45C]/15 border border-[#C8A45C]/30 text-[#C8A45C] font-semibold">
                    {currentArchetype.tagline}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-[#D1C9BC] font-bengali-serif leading-relaxed">
                  <p className="text-[#F0EBE0] font-medium">{currentArchetype.shortDesc}</p>
                  <div className="p-3 rounded-xl bg-[#16161C] border border-[#22222A]">
                    <span className="text-[#C8A45C] font-semibold block text-xs">মনস্তাত্ত্বিক আকর্ষণ (Psychological Hook):</span>
                    <span className="text-xs sm:text-sm text-[#D1C9BC] mt-0.5 block">{currentArchetype.psychologicalHook}</span>
                  </div>
                  <div className="text-xs text-[#A8A095]">
                    <strong className="text-[#D1C9BC]">ঐতিহাসিক উদাহরণ:</strong> {currentArchetype.historicalExample}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Call to Action Card inside Modal */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1E1218] via-[#16141B] to-[#16161E] border border-[#E11D48]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E11D48] text-white uppercase tracking-wider">
                  স্পেশাল কম্বো অফার
                </span>
                <span className="text-xs text-[#C8A45C] font-bold">৬৫০ পৃষ্ঠা সম্পূর্ণ বাংলা ইবুক</span>
              </div>
              <h5 className="text-sm sm:text-base font-bold text-[#F0EBE0] mt-1 font-bengali-serif">
                দুটি মাস্টারক্লাস বই একসাথে মাত্র ৳১৯৯ (Save ৳১০০)
              </h5>
              <p className="text-xs text-[#A8A095] mt-0.5">
                The 48 Laws of Power + The Art of Seduction লাইফটাইম অ্যাক্সেস
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenOrderModal();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#C8A45C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-lg cursor-pointer whitespace-nowrap"
            >
              <span>২-বুক বান্ডেল কিনুন (৳১৯৯)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
