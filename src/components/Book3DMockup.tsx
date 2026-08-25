"use client";

import React from "react";

interface Book3DMockupProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Book3DMockup({
  className = "",
  size = "md",
}: Book3DMockupProps) {
  const sizeClasses = {
    sm: "w-[180px] h-[260px]",
    md: "w-[240px] h-[350px] sm:w-[280px] sm:h-[410px]",
    lg: "w-[280px] h-[410px] sm:w-[340px] sm:h-[500px]",
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-yellow-600/10 to-transparent rounded-full blur-2xl -z-10 pointer-events-none" />

      {/* 3D Book Container */}
      <div
        className={`relative ${sizeClasses} perspective-1000 group transition-transform duration-500 hover:rotate-y-[-8deg] hover:scale-105`}
        style={{ perspective: "1200px" }}
      >
        {/* Book shadow on table */}
        <div
          className="absolute -bottom-8 left-4 right-2 h-8 bg-black/60 blur-xl rounded-full transform rotate-[-4deg] scale-95"
          aria-hidden="true"
        />

        {/* The 3D Book */}
        <div
          className="relative w-full h-full rounded-r-md rounded-l-sm shadow-2xl transition-all duration-300"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateY(-18deg) rotateX(4deg)",
            boxShadow:
              "20px 25px 50px -10px rgba(0, 0, 0, 0.8), -5px 0 15px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Front Cover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1f] via-[#111113] to-[#0a0a0c] rounded-r-md rounded-l-sm border-l-2 border-l-stone-700/60 border-t border-t-amber-500/20 border-r border-r-stone-800 p-5 sm:p-7 flex flex-col justify-between overflow-hidden">
            {/* Subtle texture / sheen line */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-amber-500/[0.08] pointer-events-none" />
            <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500/30 via-transparent to-amber-500/20" />
            <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-stone-700/40" />

            {/* Author */}
            <div className="text-center pt-2 relative z-10">
              <span className="text-[11px] sm:text-[13px] tracking-[0.25em] font-serif text-amber-200/80 font-medium uppercase">
                Robert Greene
              </span>
            </div>

            {/* Title & Chess Piece */}
            <div className="flex flex-col items-center justify-center my-auto py-3 text-center relative z-10">
              <span className="text-[12px] sm:text-[14px] tracking-[0.3em] font-serif text-stone-300 uppercase font-light">
                THE
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white my-1">
                48
              </h2>
              <span className="text-xl sm:text-2xl font-serif font-semibold tracking-wider text-amber-400">
                LAWS
              </span>
              <span className="text-xs sm:text-sm font-serif tracking-[0.3em] text-stone-400 font-light">
                OF
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-amber-400">
                POWER
              </span>

              {/* Gold Chess King Piece Icon */}
              <div className="my-3 text-amber-400 drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]">
                <svg
                  className="w-10 h-12 sm:w-14 sm:h-16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1.1c2.8.5 5 3 5 5.9 0 1.2-.4 2.3-1 3.2l1.7 2.6c.3.5.1 1.2-.4 1.5-.2.1-.5.2-.8.2H5.5c-.6 0-1-.4-1-1 0-.3.1-.6.3-.8L6.5 16c-.6-.9-1-2-1-3.2 0-2.9 2.2-5.4 5-5.9V6H9.5a1 1 0 0 1 0-2h1V3a1 1 0 0 1 1-1zm0 7c-2 0-3.6 1.6-3.6 3.6 0 .9.3 1.8.9 2.4h5.4c.6-.6.9-1.5.9-2.4 0-2-1.6-3.6-3.6-3.6zm-4.7 9.5l-.8 1.5h11l-.8-1.5H7.3z" />
                </svg>
              </div>

              {/* Bengali Edition Title */}
              <div className="mt-1">
                <p className="text-xs sm:text-sm font-medium text-stone-200 tracking-wide">
                  দ্য ৪৮ ল অব পাওয়ার
                </p>
                <p className="text-[10px] sm:text-[11px] text-amber-400/90 font-light tracking-wider mt-0.5">
                  বাংলা অনুবাদ
                </p>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="text-center pb-2 relative z-10">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mb-1.5" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-stone-400 uppercase font-sans">
                Best Selling Edition
              </span>
            </div>
          </div>

          {/* Book Spine (Left thickness) */}
          <div
            className="absolute top-0 bottom-0 left-0 w-[28px] sm:w-[36px] bg-gradient-to-r from-[#0d0d0f] via-[#1a1a1e] to-[#0a0a0d] rounded-l-sm flex flex-col justify-between py-6 px-1 text-center border-y border-stone-800"
            style={{
              transform: "rotateY(-90deg) translateX(-14px) sm:translateX(-18px)",
              transformOrigin: "left",
              boxShadow: "inset -2px 0 5px rgba(0, 0, 0, 0.7)",
            }}
          >
            <span className="text-[8px] tracking-widest text-amber-300 font-serif rotate-90 transform origin-center whitespace-nowrap">
              ROBERT GREENE
            </span>
            <span className="text-[9px] font-bold tracking-wider text-white font-serif rotate-90 transform origin-center whitespace-nowrap">
              48 LAWS OF POWER
            </span>
            <span className="text-[8px] text-stone-400 rotate-90 transform origin-center whitespace-nowrap">
              বাংলা
            </span>
          </div>

          {/* Book Pages (Right edge thickness) */}
          <div
            className="absolute top-1 bottom-1 right-0 w-[26px] sm:w-[32px] bg-[#f5ede0] rounded-r-[2px]"
            style={{
              transform: "rotateY(90deg) translateZ(-13px) sm:translateZ(-16px)",
              transformOrigin: "right",
              background:
                "repeating-linear-gradient(to right, #ece1ce 0px, #f7f0e4 2px, #dfd2be 3px)",
              boxShadow: "inset 4px 0 10px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
