"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Clock, ShieldCheck, Check } from "lucide-react";

interface OrderNotification {
  name: string;
  timeAgo: string;
  item: string;
}

const RECENT_ORDERS: OrderNotification[] = [
  { name: "Tanvir Ahmed", timeAgo: "২ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Shakib Al Hasan", timeAgo: "৩ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Rafsan Zaman", timeAgo: "৫ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Mahmudul Hasan", timeAgo: "৭ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Ariful Islam", timeAgo: "২ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Nazmul Hossain", timeAgo: "৪ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Farhan Karim", timeAgo: "৬ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Mehedi Hasan", timeAgo: "৮ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Tahmid Chowdhury", timeAgo: "১ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Zubair Ahmed", timeAgo: "১০ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Anupam Roy", timeAgo: "৩ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Asif Iqbal", timeAgo: "৫ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Salman Farsi", timeAgo: "২ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Adnan Sami", timeAgo: "৪ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Shahriar Kabir", timeAgo: "৬ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Naimur Rahman", timeAgo: "৩ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
  { name: "Touhidul Islam", timeAgo: "৯ মিনিট আগে", item: "২-বুক মাস্টার বান্ডেল" },
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
      // Schedule next toast with natural random gap between 14s and 24s
      const nextDelay = Math.floor(Math.random() * 10000) + 14000;
      timeoutRef.current = setTimeout(() => {
        showToast();
      }, nextDelay);
    }
  };

  // Initial trigger after page loads (6.5s delay)
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      showToast();
    }, 6500);

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
    <div
      className="fixed bottom-[74px] sm:bottom-6 left-3 sm:left-6 z-40 max-w-[340px] xs:max-w-[360px] w-[calc(100vw-24px)] pointer-events-none select-none"
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94, x: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 15, scale: 0.94, x: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onClick={() => {
              if (onOpenOrderModal) onOpenOrderModal();
            }}
            className="pointer-events-auto relative rounded-2xl bg-[#0D0D11]/95 border border-[#282832] hover:border-[#C8A45C]/40 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.85)] p-2.5 sm:p-3 transition-colors duration-300 cursor-pointer group overflow-hidden"
          >
            {/* Top gold accent hairline */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A45C]/60 to-transparent pointer-events-none" />

            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Dual Book Stack Mockup Icon */}
              <div className="relative w-10 h-11 sm:w-11 sm:h-12 shrink-0 rounded-xl bg-[#14141A] border border-[#2A2A34] flex items-center justify-center overflow-hidden shadow-inner group-hover:border-[#C8A45C]/35 transition-colors">
                <img
                  src="/images/book-mockup.webp"
                  alt="48 Laws"
                  className="w-5.5 h-7.5 sm:w-6 sm:h-8 object-contain -rotate-6 -translate-x-1.5 drop-shadow-sm"
                  loading="lazy"
                />
                <img
                  src="/images/the-art-of-seduction-book-mockup.png"
                  alt="Art of Seduction"
                  className="w-5.5 h-7.5 sm:w-6 sm:h-8 object-contain rotate-6 absolute right-1 drop-shadow-sm"
                  loading="lazy"
                />
                {/* Verified Mini Check Badge */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-500 border-2 border-[#0D0D11] flex items-center justify-center">
                  <Check className="w-2 h-2 text-[#0D0D11] stroke-[3]" />
                </div>
              </div>

              {/* Order Information Details */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs sm:text-[13px] font-bold text-[#F0EBE0] font-sans tracking-tight truncate">
                    {currentOrder.name}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-emerald-400 font-medium font-bengali-serif shrink-0">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>ভেরিফাইড</span>
                  </span>
                </div>

                <div className="text-[11px] sm:text-xs text-[#C8A45C] font-semibold leading-tight font-bengali-serif mt-0.5 truncate">
                  {currentOrder.item} সংগ্রহ করলেন
                </div>

                <div className="flex items-center gap-1 text-[10px] text-[#8A8278] font-bengali-serif mt-0.5 leading-none">
                  <Clock className="w-2.5 h-2.5 text-[#8A8278] shrink-0" />
                  <span>{currentOrder.timeAgo}</span>
                  <span className="text-[#33333E]">•</span>
                  <span>তাৎক্ষণিক অ্যাক্সেস</span>
                </div>
              </div>

              {/* Dismiss Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  hideToast(true);
                }}
                className="absolute top-2 right-2 p-1 rounded-full text-[#6E675E] hover:text-[#F0EBE0] hover:bg-[#1A1A22] transition-colors cursor-pointer"
                aria-label="বিজ্ঞপ্তি বন্ধ করুন"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dynamic Linear Progress Bar: 100% -> 0% countdown */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A1A22] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C8A45C] via-[#E11D48] to-[#C8A45C] transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(200,164,92,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
