"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUpRight, Menu, X, Download } from "lucide-react";

interface HeaderProps {
  onOpenOrderModal: () => void;
}

export default function Header({ onOpenOrderModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "মূল ভাবনা", href: "#thesis" },
    { label: "লাইভ রিডার", href: "#interactive-reader" },
    { label: "৪৮টি নীতি", href: "#laws-codex" },
    { label: "মনস্তাত্ত্বিক টেস্ট", href: "#diagnostic" },
    { label: "লেখক", href: "#author" },
    { label: "প্রশ্নোত্তর", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#F7F5EE]/95 backdrop-blur-md border-b border-[#E2DBD0] py-3 shadow-2xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand identity */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#111215] text-[#F7F5EE] flex items-center justify-center font-serif text-sm font-bold tracking-widest shadow-2xs">
            48
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xs tracking-[0.2em] text-[#111215] uppercase leading-none">
              THE 48 LAWS OF POWER
            </span>
            <span className="text-[9px] tracking-[0.15em] text-[#7A7C85] uppercase font-sans mt-0.5">
              বাংলা ডিজিটাল সংস্করণ • PDF
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-7">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-[#4A4D55] hover:text-[#111215] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenOrderModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111215] hover:bg-[#23252A] text-[#F7F5EE] text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs active:scale-98"
          >
            <Download className="w-3.5 h-3.5" />
            <span>পিডিএফ ডাউনলোড • {siteConfig.currencySymbol}{siteConfig.price}</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-800 hover:bg-stone-200/60 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F5EE] border-b border-[#E2DBD0] px-6 py-5 space-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-stone-800 hover:text-black py-1.5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3 rounded-full bg-[#111215] text-[#F7F5EE] font-bold text-xs flex items-center justify-center gap-2"
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
