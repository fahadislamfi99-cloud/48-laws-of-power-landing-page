"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, Clock, Sparkles } from "lucide-react";

interface OrderNotification {
  name: string;
  location: string;
  timeAgo: string;
  item: string;
}

const RECENT_ORDERS: OrderNotification[] = [
  { name: "তানভীর আহমেদ", location: "ঢাকা", timeAgo: "২ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "সাকিব আল হাসান", location: "চট্টগ্রাম", timeAgo: "৩ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "রাফসান জামান", location: "সিলেট", timeAgo: "৫ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "মাহমুদুল হাসান", location: "রাজশাহী", timeAgo: "৭ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "আরিফুল ইসলাম", location: "খুলনা", timeAgo: "২ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "নাজমুল হোসেন", location: "কুমিল্লা", timeAgo: "৪ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "ফারহান করিম", location: "ঢাকা", timeAgo: "৬ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "মেহেদী হাসান", location: "বরিশাল", timeAgo: "৮ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "তাহমিদ চৌধুরী", location: "ময়মনসিংহ", timeAgo: "১ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "জুবায়ের আহমেদ", location: "গাজীপুর", timeAgo: "১০ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "অনুপম রায়", location: "রংপুর", timeAgo: "৩ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "আসিফ ইকবাল", location: "ঢাকা", timeAgo: "৫ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "সালমান ফারসি", location: "নারায়ণগঞ্জ", timeAgo: "২ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "আদনান সামী", location: "বগুড়া", timeAgo: "৪ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
];

const DISPLAY_DURATION_MS = 5500; // 5.5 seconds display time

interface LiveOrderToastProps {
  onOpenOrderModal?: () => void;
}

export default function LiveOrderToast({ onOpenOrderModal }: LiveOrderToastProps) {
  const [currentOrder, setCurrentOrder] = useState<OrderNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100); // 100% -> 0%
  const [isPaused, setIsPaused] = useState(false);

  const orderIndexRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef(DISPLAY_DURATION_MS);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pick next notification without consecutive duplicates
  const getNextOrder = () => {
    const nextIdx = (orderIndexRef.current + 1 + Math.floor(Math.random() * 2)) % RECENT_ORDERS.length;
    orderIndexRef.current = nextIdx;
    return RECENT_ORDERS[nextIdx];
  };

  const showToast = () => {
    const next = getNextOrder();
    setCurrentOrder(next);
    setProgress(100);
    remainingTimeRef.current = DISPLAY_DURATION_MS;
    startTimeRef.current = performance.now();
    setIsVisible(true);
  };

  const hideToast = (scheduleNext = true) => {
    setIsVisible(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (scheduleNext) {
      // Schedule next toast with natural random gap between 12s and 22s
      const nextDelay = Math.floor(Math.random() * 10000) + 12000;
      timeoutRef.current = setTimeout(() => {
        showToast();
      }, nextDelay);
    }
  };

  // Initial trigger after page loads (6 seconds in)
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      showToast();
    }, 6000);

    return () => {
      clearTimeout(initialTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Frame-by-frame smooth progress bar countdown (100% down to 0%)
  useEffect(() => {
    if (!isVisible || isPaused) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    let lastTimestamp = performance.now();

    const step = (now: number) => {
      const delta = now - lastTimestamp;
      lastTimestamp = now;

      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - delta);
      const newProgress = (remainingTimeRef.current / DISPLAY_DURATION_MS) * 100;
      setProgress(newProgress);

      if (remainingTimeRef.current <= 0) {
        hideToast(true);
      } else {
        animationFrameRef.current = requestAnimationFrame(step);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, isPaused]);

  if (!currentOrder) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-3 sm:left-6 z-40 max-w-[340px] xs:max-w-[370px] w-[calc(100vw-24px)] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.92, x: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 15, scale: 0.94, x: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onClick={() => {
              if (onOpenOrderModal) onOpenOrderModal();
            }}
            className="pointer-events-auto relative rounded-2xl bg-[#0F0F13]/95 border border-[#2A2A34] hover:border-[#C8A45C]/45 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.85)] p-3 sm:p-3.5 transition-colors duration-300 cursor-pointer group select-none overflow-hidden"
          >
            {/* Top ambient gold accent hairline */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A45C]/70 to-transparent pointer-events-none" />

            <div className="flex items-center gap-3">
              {/* Dual Book Stack Mockup Icon */}
              <div className="relative w-11 h-12 shrink-0 rounded-xl bg-[#16161D] border border-[#2E2E38] flex items-center justify-center overflow-hidden shadow-inner group-hover:border-[#C8A45C]/40 transition-colors">
                <img
                  src="/images/book-mockup.webp"
                  alt="48 Laws"
                  className="w-6 h-8 object-contain -rotate-6 -translate-x-1.5 drop-shadow-sm"
                  loading="lazy"
                />
                <img
                  src="/images/the-art-of-seduction-book-mockup.png"
                  alt="Art of Seduction"
                  className="w-6 h-8 object-contain rotate-6 absolute right-1 drop-shadow-sm"
                  loading="lazy"
                />
                {/* Verified Green Check Badge */}
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0F0F13] flex items-center justify-center shadow-xs">
                  <Check className="w-2.5 h-2.5 text-[#0F0F13] stroke-[3]" />
                </div>
              </div>

              {/* Order Info */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs sm:text-[13px] font-bold text-[#F0EBE0] font-bengali-serif leading-tight truncate">
                    {currentOrder.name}
                  </span>
                  <span className="text-[10px] text-[#A8A095] font-bengali-serif bg-[#181820] px-1.5 py-0.2 rounded border border-[#2A2A32]">
                    {currentOrder.location}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#C8A45C] font-semibold leading-tight font-bengali-serif mt-1">
                  <Sparkles className="w-3 h-3 text-[#E11D48] shrink-0" />
                  <span className="truncate">{currentOrder.item} কিনলেন</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-[#8A8278] font-bengali-serif mt-1 leading-none">
                  <Clock className="w-2.5 h-2.5 text-[#8A8278]" />
                  <span>{currentOrder.timeAgo}</span>
                  <span className="text-[#3A3A42]">•</span>
                  <span className="text-emerald-400 font-medium">ভেরিফাইড অর্ডার</span>
                </div>
              </div>

              {/* Dismiss Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  hideToast(true);
                }}
                className="absolute top-2.5 right-2.5 p-1 rounded-full text-[#6E675E] hover:text-[#F0EBE0] hover:bg-[#1F1F28] transition-colors cursor-pointer"
                aria-label="বিজ্ঞপ্তি বন্ধ করুন"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dynamic Linear Progress Bar: 100% -> 0% countdown */}
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1A1A22] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C8A45C] via-[#E11D48] to-[#C8A45C] transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(200,164,92,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
