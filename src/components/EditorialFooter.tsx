"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function EditorialFooter() {
  const containerRef = useScrollReveal<HTMLElement>();

  return (
    <footer ref={containerRef} className="bg-[#08080A] text-[#F0EBE0] pt-10 pb-24 md:pb-10 border-t border-[#26262A] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#2A2A2E] reveal">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-[#C8A45C] to-[#8B6914] text-[#08080A] flex items-center justify-center font-display text-sm font-bold transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(200,164,92,0.3)]">
              48
            </div>
            <div>
              <span className="font-display font-bold tracking-widest uppercase block text-sm group-hover:text-[#C8A45C] transition-colors">
                THE 48 LAWS OF POWER
              </span>
              <span className="text-[10px] tracking-[0.15em] text-[#C8A45C] font-semibold uppercase">
                বাংলা ডিজিটাল সংস্করণ • PDF
              </span>
            </div>
          </div>
          <div className="text-[#8A8278] text-xs text-center md:text-right">
            <span>৫০৯ পৃষ্ঠা • ক্রিস্টাল ক্লিয়ার টাইপসেটিং • লাইফটাইম অ্যাক্সেস</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8A8278] text-xs reveal reveal-stagger-1">
          <p>&copy; 2024 The 48 Laws of Power (বাংলা সংস্করণ). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#faq" className="hover:text-[#C8A45C] transition-colors">প্রশ্নোত্তর</a>
            <span className="text-[#2A2A2E]">•</span>
            <a href={`https://wa.me/${siteConfig.supportWhatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A45C] transition-colors">
              হোয়াটসঅ্যাপ সাপোর্ট
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
