"use client";

import React from "react";
import { Crown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#ECE5D8] text-stone-700 py-10 sm:py-12 border-t border-[#E2D5BA] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#DFCFA8]">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#16171B] border border-[#C59B4B]/60 flex items-center justify-center text-[#E6C67E]">
              <Crown className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-serif font-bold tracking-widest text-stone-900 uppercase leading-none">
                48 LAWS
              </span>
              <span className="text-[8px] tracking-[0.25em] text-[#8C6D37] uppercase font-sans font-bold mt-0.5">
                DIGITAL EDITION
              </span>
            </div>
          </div>

          {/* Copyright text */}
          <div className="text-center text-stone-600 font-medium">
            <p>© 2024 The 48 Laws of Power (বাংলা ডিজিটাল PDF সংস্করণ). All rights reserved.</p>
          </div>

          {/* Social Icons (SVG) */}
          <div className="flex items-center gap-3.5 text-stone-700">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-white border border-[#D5C7A8] flex items-center justify-center hover:text-[#8C6B2A] hover:border-[#C59B4B] transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white border border-[#D5C7A8] flex items-center justify-center hover:text-[#8C6B2A] hover:border-[#C59B4B] transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-white border border-[#D5C7A8] flex items-center justify-center hover:text-[#8C6B2A] hover:border-[#C59B4B] transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

        </div>

        {/* Bottom Policy Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-stone-600 text-[11px] font-medium">
          <a href="#" className="hover:text-stone-900 transition-colors">ডিজিটাল ডেলিভারি পলিসি</a>
          <span>•</span>
          <a href="#" className="hover:text-stone-900 transition-colors">রিটার্ন ও রিফান্ড পলিসি</a>
          <span>•</span>
          <a href="#" className="hover:text-stone-900 transition-colors">প্রাইভেসি পলিসি</a>
          <span>•</span>
          <a href="#" className="hover:text-stone-900 transition-colors">শর্তাবলী</a>
          <span>•</span>
          <a href="#" className="hover:text-stone-900 transition-colors">হোয়াটসঅ্যাপ সাপোর্ট</a>
        </div>

      </div>
    </footer>
  );
}
