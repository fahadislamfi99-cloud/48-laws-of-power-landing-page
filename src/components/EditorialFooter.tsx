"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function EditorialFooter() {
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <footer
      ref={containerRef}
      className="bg-[#121316] text-[#FAF8F5] py-14 border-t border-[#2C2D32] text-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#2C2D32] reveal">
          
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-[#FAF8F5] text-[#121316] flex items-center justify-center font-display text-sm font-bold transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#DFC07A]">
              48
            </div>
            <div>
              <span className="font-display font-bold tracking-widest uppercase block text-sm group-hover:text-[#DFC07A] transition-colors">
                THE 48 LAWS OF POWER
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#DFC07A] uppercase font-mono">
                বাংলা ডিজিটাল সংস্করণ • PDF
              </span>
            </div>
          </div>

          <div className="text-stone-400 font-mono text-center md:text-right text-xs">
            <span>৪৫২ পৃষ্ঠা • ক্রিস্টাল ক্লিয়ার টাইপসেটিং • লাইফটাইম অ্যাক্সেস</span>
          </div>

        </div>

        {/* Bottom Colophon Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 font-mono text-[11px] reveal reveal-stagger-1">
          <p>© 2024 The 48 Laws of Power (বাংলা সংস্করণ). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#faq" className="hover:text-stone-200 transition-colors">প্রশ্নোত্তর</a>
            <span>•</span>
            <a
              href={`https://wa.me/${siteConfig.supportWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-200 transition-colors"
            >
              হোয়াটসঅ্যাপ সাপোর্ট
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
