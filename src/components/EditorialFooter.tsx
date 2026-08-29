"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";

export default function EditorialFooter() {
  return (
    <footer className="bg-[#08080A] text-[#F0EBE0] pt-8 sm:pt-10 pb-28 sm:pb-24 md:pb-10 border-t border-[#26262A] text-xs">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="sr-fade-up flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#2A2A2E]">
          <div className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#C8A45C] to-[#8B6914] text-[#08080A] flex items-center justify-center font-display text-xs sm:text-sm font-bold rounded transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(200,164,92,0.3)] shrink-0">
              48
            </div>
            <div>
              <span className="font-display font-bold tracking-widest uppercase block text-xs sm:text-sm group-hover:text-[#C8A45C] transition-colors">
                THE 48 LAWS OF POWER
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.15em] text-[#C8A45C] font-semibold uppercase">
                বাংলা ডিজিটাল সংস্করণ • PDF
              </span>
            </div>
          </div>
          <div className="text-[#8A8278] text-[11px] sm:text-xs text-center md:text-right">
            <span>৫০৯ পৃষ্ঠা • ক্রিস্টাল ক্লিয়ার টাইপসেটিং • লাইফটাইম অ্যাক্সেস</span>
          </div>
        </div>

        <div className="sr-fade-up flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[#8A8278] text-[11px] sm:text-xs text-center sm:text-left">
          <div className="space-y-1">
            <p>&copy; {new Date().getFullYear()} The 48 Laws of Power (বাংলা সংস্করণ). All rights reserved.</p>
            <p className="text-[10px] sm:text-[11px]">
              Designed & Developed by{" "}
              <a
                href="https://fahadislam.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D1C9BC] hover:text-[#C8A45C] font-semibold transition-colors underline decoration-[#C8A45C]/40 hover:decoration-[#C8A45C]"
              >
                Fahad Islam
              </a>
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-4 shrink-0">
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
