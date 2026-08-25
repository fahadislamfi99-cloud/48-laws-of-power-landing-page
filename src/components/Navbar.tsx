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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6E0D4] py-3.5"
          : "bg-[#FAF8F5]/80 backdrop-blur-xs border-b border-[#E6E0D4]/70 py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Editorial Masthead Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#121316] text-[#FAF8F5] flex items-center justify-center font-display text-xs font-bold tracking-wider">
            48
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold tracking-[0.2em] text-[#121316] uppercase leading-none">
              THE 48 LAWS OF POWER
            </span>
            <span className="text-[9px] tracking-[0.15em] text-[#8F6B2C] uppercase font-mono mt-0.5">
              বাংলা ডিজিটাল সংস্করণ • PDF
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-[#42454D]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-[#121316] transition-colors py-1 relative"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenOrderModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121316] hover:bg-[#25272F] text-[#FAF8F5] text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs active:scale-98"
          >
            <Download className="w-3.5 h-3.5 text-[#DFC07A]" />
            <span>ডিজিটাল কপি — {siteConfig.currencySymbol}{siteConfig.price}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-800 hover:bg-stone-200/50 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E6E0D4] px-6 py-5 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#121316] py-1.5"
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
              className="w-full py-3 rounded-full bg-[#121316] text-[#FAF8F5] font-bold text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#DFC07A]" />
              <span>পিডিএফ সংগ্রহ করুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
