"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Download, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenOrderModal: () => void;
}

export default function Navbar({ onOpenOrderModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "মূল ভাবনা", href: "#thesis" },
    { label: "একটি পাঠ", href: "#deep-dive" },
    { label: "ডিজিটাল প্রিভিউ", href: "#digital-preview" },
    { label: "৪৮টি নীতি", href: "#laws-almanac" },
    { label: "প্রশ্নোত্তর", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#08080A]/90 backdrop-blur-xl border-b border-[#2A2A2E] py-3"
          : "bg-transparent py-4"
      }`}
    >
      {/* Gold Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#8B6914] via-[#C8A45C] to-[#8B6914] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-br from-[#C8A45C] to-[#8B6914] text-[#08080A] flex items-center justify-center font-display text-xs font-bold tracking-wider rounded transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(200,164,92,0.3)]">
            48
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[11px] font-bold tracking-[0.2em] text-[#F0EBE0] uppercase leading-none">
              THE 48 LAWS OF POWER
            </span>
            <span className="text-[9px] tracking-[0.15em] text-[#C8A45C] uppercase font-mono mt-0.5">
              বাংলা ডিজিটাল সংস্করণ
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-7 text-[11px] font-medium text-[#9C9488] uppercase tracking-widest">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-[#C8A45C] transition-colors py-1 relative gold-underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenOrderModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gold text-xs font-bold tracking-wide cursor-pointer hover-lift btn-shimmer group"
          >
            <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>ডিজিটাল কপি — {siteConfig.currencySymbol}{siteConfig.price}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#9C9488] hover:text-[#C8A45C] hover:bg-[#1A1A1E] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111114] border-b border-[#2A2A2E] px-6 py-5 space-y-3 animate-fadeInDown">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#F0EBE0] py-2 hover:text-[#C8A45C] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3 rounded-full btn-gold text-xs font-bold flex items-center justify-center gap-2 btn-shimmer"
            >
              <Download className="w-4 h-4" />
              <span>পিডিএফ সংগ্রহ করুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
