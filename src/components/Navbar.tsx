"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Download, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenOrderModal: (couponCode?: string) => void;
}

export default function Navbar({ onOpenOrderModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open with scrollbar shift compensation
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "মূল ভাবনা", href: "#thesis" },
    { label: "একটি পাঠ", href: "#deep-dive" },
    { label: "একটু পড়ে দেখুন", href: "#sample-preview" },
    { label: "৪৮টি নীতি", href: "#laws-almanac" },
    { label: "লেখক পরিচিতি", href: "#author" },
    { label: "প্রশ্নোত্তর", href: "#faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // Smooth scroll to target section
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-3 sm:py-3.5 border-b transition-colors duration-200 ease-out ${
          isScrolled || mobileMenuOpen
            ? "bg-[#08080A]/95 backdrop-blur-xl border-[#26262A] shadow-md"
            : "bg-[#08080A]/80 backdrop-blur-md border-transparent"
        }`}
      >
        {/* Top Gold Scroll Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-[#8B6914] via-[#C8A45C] to-[#8B6914] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#C8A45C] to-[#8B6914] text-[#08080A] flex items-center justify-center font-display text-[11px] sm:text-xs font-bold tracking-wider rounded transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(200,164,92,0.35)]">
              48
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[10px] sm:text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-[#F0EBE0] uppercase leading-none">
                THE 48 LAWS OF POWER
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-[#C8A45C] mt-0.5">
                বাংলা ডিজিটাল সংস্করণ
              </span>
            </div>
          </a>

          {/* Desktop & Laptop Navigation (Visible on lg / >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-semibold text-[#D1C9BC]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-[#C8A45C] transition-colors py-1 relative gold-underline whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs + Mobile/Tablet Drawer Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop CTA */}
            <button
              type="button"
              onClick={() => onOpenOrderModal()}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full btn-gold text-xs font-bold tracking-wide cursor-pointer hover-lift btn-shimmer shadow-sm whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>ডিজিটাল কপি ({siteConfig.currencySymbol}{siteConfig.price})</span>
            </button>

            {/* Mobile / Tablet Hamburger Toggle (Visible < lg / < 1024px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-xl text-[#D1C9BC] hover:text-[#C8A45C] hover:bg-[#1A1A1E] transition-colors cursor-pointer group"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 transition-transform duration-200 ease-out group-hover:rotate-90" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile & Tablet Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-nav-panel"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                duration: 0.15,
                ease: "easeOut",
              }}
              className="lg:hidden bg-[#0D0D10] border-b border-[#26262A] px-5 sm:px-8 py-6 space-y-4 shadow-2xl overflow-hidden will-change-[transform,opacity]"
            >
              <nav className="space-y-1 divide-y divide-[#1A1A1E]">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center justify-between text-sm font-semibold text-[#F0EBE0] py-3 hover:text-[#C8A45C] transition-colors cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8A8278]" />
                  </a>
                ))}
              </nav>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOrderModal();
                  }}
                  className="w-full py-3.5 rounded-2xl btn-gold text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer hover-lift"
                >
                  <Download className="w-4 h-4" />
                  <span>পিডিএফ সংগ্রহ করুন ({siteConfig.currencySymbol}{siteConfig.price})</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-40 lg:hidden cursor-pointer will-change-[opacity]"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
