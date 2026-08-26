"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, Loader2, ShieldCheck, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameOrEmail.trim() || !password.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Network or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F0EBE0] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-[#C8A45C] selection:text-[#08080A]">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C8A45C]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto space-y-6 relative z-10">
        
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B6914] via-[#C8A45C] to-[#8B6914] flex items-center justify-center text-black font-display font-bold text-xl mx-auto shadow-[0_0_30px_rgba(200,164,92,0.3)]">
            48
          </div>
          <h1 className="text-2xl font-bold font-display tracking-wider text-[#F0EBE0] uppercase">
            The 48 Laws of Power
          </h1>
          <p className="text-xs text-[#8A8278] font-medium">
            Management & Sales Admin Console
          </p>
        </div>

        {/* Login Box */}
        <form
          onSubmit={handleLogin}
          className="bg-[#111114] border border-[#2A2A2E] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent opacity-80" />

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Username/Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#B8B0A4]">
              Username or Email
            </label>
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8A8278] group-focus-within:text-[#C8A45C] transition-colors">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="admin or admin@48laws.com"
                className="w-full pl-11 pr-4 py-3 bg-[#08080A] border border-[#2A2A2E] rounded-xl text-sm text-[#F0EBE0] placeholder:text-[#666056] outline-none focus:border-[#C8A45C] focus:ring-2 focus:ring-[#C8A45C]/15 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#B8B0A4]">
              Password
            </label>
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8A8278] group-focus-within:text-[#C8A45C] transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-[#08080A] border border-[#2A2A2E] rounded-xl text-sm text-[#F0EBE0] placeholder:text-[#666056] outline-none focus:border-[#C8A45C] focus:ring-2 focus:ring-[#C8A45C]/15 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#8A8278] hover:text-[#F0EBE0] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl btn-gold text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 hover-lift btn-shimmer group shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#08080A]" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>

          {/* Seed Notice */}
          <div className="pt-2 border-t border-[#2A2A2E] text-center">
            <span className="text-[11px] text-[#8A8278]">
              Default Credentials: <code className="text-[#C8A45C] font-mono">admin</code> / <code className="text-[#C8A45C] font-mono">admin123456</code>
            </span>
          </div>
        </form>

        {/* Security Footer */}
        <div className="text-center text-xs text-[#8A8278] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Encrypted Session • Rate Limited Protection</span>
        </div>

      </div>
    </div>
  );
}
