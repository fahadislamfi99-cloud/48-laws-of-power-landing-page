"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      const shouldShow = window.scrollY > 450;
      if (shouldShow !== isVisible) {
        setIsVisible(shouldShow);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(toggleVisibility);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-label="পৃষ্ঠার ওপরে যান (Back to top)"
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40 p-2.5 sm:p-3 rounded-full bg-[#111114]/90 hover:bg-[#C8A45C] text-[#C8A45C] hover:text-[#08080A] border border-[#2A2A2E] hover:border-[#C8A45C] backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 cursor-pointer hover-lift group"
        >
          <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
