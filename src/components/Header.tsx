"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Crown, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  onOpenOrderModal: () => void;
}

export default function Header({ onOpenOrderModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "বই সম্পর্কে", href: "#about-book" },
    { name: "কী শিখবেন", href: "#learn-section" },
    { name: "সূচিপত্র", href: "#laws-section" },
    { name: "লেখক পরিচিতি", href: "#author-section" },
    { name: "পাঠক রিভিউ", href: "#reviews-section" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DCBE] shadow-xs py-3.5"
          : "bg-[#FAF8F5]/90 backdrop-blur-xs border-b border-[#EDE4D0]/70 py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Editorial Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#16171B] border border-[#C59B4B]/60 flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <Crown className="w-4 h-4 text-[#E6C67E] stroke-[2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-serif font-bold tracking-[0.2em] text-[#121316] uppercase leading-none">
              48 LAWS
            </span>
            <span className="text-[8px] tracking-[0.3em] text-[#8C6D37] uppercase font-sans font-semibold mt-0.5">
              OF POWER
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-9">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold tracking-wide text-[#4A4C54] hover:text-[#121316] transition-colors duration-200 relative group py-1"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C59B4B] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenOrderModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18191D] hover:bg-[#25272D] text-[#F3EDE2] font-semibold text-xs border border-[#C59B4B]/50 hover:border-[#D4AF37] shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E6C67E] stroke-[2.2]" />
            <span>বইটি কিনুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg md:hidden text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E5DCBE] px-5 pt-4 pb-6 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-stone-800 hover:text-[#9A7730] hover:bg-amber-100/40"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#18191D] text-[#F3EDE2] font-bold text-xs shadow-md border border-[#C59B4B]/50"
            >
              <ShoppingBag className="w-4 h-4 text-[#E6C67E]" />
              <span>বইটি অর্ডার করুন — {siteConfig.currencySymbol}{siteConfig.price}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
