"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Percent,
  ShoppingCart,
  Receipt,
  Sparkles,
  Save,
  RefreshCw,
  Sliders,
  HelpCircle,
  BarChart3,
  PieChart,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";
import ToastNotification, { ToastState } from "@/components/admin/ToastNotification";

type DateRange = "all" | "thismonth" | "last30days" | "last7days" | "today";

const STORAGE_KEY = "48laws_admin_profit_loss_v1";

interface CalculationsData {
  adSpendUSD: number;
  taxRatePercent: number;
  taxAmountUSD: number;
  totalAdSpendUSDWithTax: number;
  exchangeRate: number;
  baseAdSpendBDT: number;
  taxAmountBDT: number;
  totalAdCostBDT: number;
  gatewayFeesBDT: number;
  otherCostsBDT: number;
  totalExpensesBDT: number;
  totalRevenueBDT: number;
  netProfitBDT: number;
  totalSalesCount: number;
  bundleSalesCount: number;
  singleSalesCount: number;
  revenuePerSale: number;
  adCostPerSale: number;
  totalCostPerSale: number;
  profitPerSale: number;
  profitMarginPercent: number;
  roas: number;
  roiPercent: number;
  breakEvenOrders: number;
}

export default function ProfitLossPage() {
  const [range, setRange] = useState<DateRange>("all");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Form State (initialized from persistent cache where available)
  const [adSpendUSDInput, setAdSpendUSDInput] = useState<string>("0");
  const [taxRatePercentInput, setTaxRatePercentInput] = useState<number>(15);
  const [exchangeRateInput, setExchangeRateInput] = useState<number>(130);
  const [gatewayFeePercentInput, setGatewayFeePercentInput] = useState<number>(1.5);
  const [otherCostsBDTInput, setOtherCostsBDTInput] = useState<string>("0");
  const [notesInput, setNotesInput] = useState<string>("");

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // Backend response storage
  const [serverData, setServerData] = useState<{
    calculations: CalculationsData;
    dailyTrend: Array<{ date: string; revenue: number; orders: number }>;
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // 1. On mount: Load cached settings from localStorage for instant display
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.adSpendUSD !== undefined) setAdSpendUSDInput(String(parsed.adSpendUSD));
        if (parsed.taxRatePercent !== undefined) setTaxRatePercentInput(Number(parsed.taxRatePercent));
        if (parsed.exchangeRate !== undefined) setExchangeRateInput(Number(parsed.exchangeRate));
        if (parsed.gatewayFeePercent !== undefined) setGatewayFeePercentInput(Number(parsed.gatewayFeePercent));
        if (parsed.otherCostsBDT !== undefined) setOtherCostsBDTInput(String(parsed.otherCostsBDT));
        if (parsed.notes !== undefined) setNotesInput(parsed.notes);
      }
    } catch {
      // ignore
    }
  }, []);

  // 2. Fetch live data from server
  const fetchData = async (currentRange = range) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/profit-loss?range=${currentRange}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setServerData(data.data);
        if (data.data.settings) {
          const s = data.data.settings;
          setAdSpendUSDInput(String(s.adSpendUSD ?? 0));
          setTaxRatePercentInput(Number(s.taxRatePercent ?? 15));
          setExchangeRateInput(Number(s.exchangeRate ?? 130));
          setGatewayFeePercentInput(Number(s.gatewayFeePercent ?? 1.5));
          setOtherCostsBDTInput(String(s.otherCostsBDT ?? 0));
          setNotesInput(s.notes || "");
          setLastSavedTime(new Date(s.updatedAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

          // Save to localStorage as well
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
              adSpendUSD: s.adSpendUSD,
              taxRatePercent: s.taxRatePercent,
              exchangeRate: s.exchangeRate,
              gatewayFeePercent: s.gatewayFeePercent,
              otherCostsBDT: s.otherCostsBDT,
              notes: s.notes,
            }));
          } catch {
            // ignore
          }
        }
      } else {
        showToast(data.message || "Failed to load profit and loss data", "error");
      }
    } catch {
      showToast("Network error while loading data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(range);
  }, [range]);

  // 3. Persistent Auto-Save: Debounce save to database and localStorage whenever user enters or changes values
  const saveToBackend = async (payload: {
    adSpendUSD: number;
    taxRatePercent: number;
    exchangeRate: number;
    gatewayFeePercent: number;
    otherCostsBDT: number;
    notes: string;
  }, showFeedback = false) => {
    setIsSaving(true);
    try {
      // Save to localStorage immediately
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {
        // ignore
      }

      const res = await fetch("/api/admin/profit-loss", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        if (showFeedback) {
          showToast("Profit & loss settings saved to database!");
        }
      } else if (showFeedback) {
        showToast(data.message || "Failed to save settings", "error");
      }
    } catch {
      if (showFeedback) {
        showToast("Network error while saving settings", "error");
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Trigger debounced auto-save on input change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      saveToBackend({
        adSpendUSD: Number(adSpendUSDInput) || 0,
        taxRatePercent: Number(taxRatePercentInput) || 15,
        exchangeRate: Number(exchangeRateInput) || 130,
        gatewayFeePercent: Number(gatewayFeePercentInput) || 1.5,
        otherCostsBDT: Number(otherCostsBDTInput) || 0,
        notes: notesInput,
      }, false);
    }, 600);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [
    adSpendUSDInput,
    taxRatePercentInput,
    exchangeRateInput,
    gatewayFeePercentInput,
    otherCostsBDTInput,
    notesInput,
  ]);

  // Real-time responsive calculation based on current user inputs and actual DB orders
  const liveCalculations = useMemo(() => {
    const rawSalesCount = serverData?.calculations.totalSalesCount || 0;
    const rawRevenueBDT = serverData?.calculations.totalRevenueBDT || 0;
    const rawBundleCount = serverData?.calculations.bundleSalesCount || 0;
    const rawSingleCount = serverData?.calculations.singleSalesCount || 0;

    const adSpendUSD = Math.max(0, Number(adSpendUSDInput) || 0);
    const taxRate = Math.max(0, Number(taxRatePercentInput) || 0);
    const rate = Math.max(1, Number(exchangeRateInput) || 130);
    const gatewayRate = Math.max(0, Number(gatewayFeePercentInput) || 0);
    const otherCosts = Math.max(0, Number(otherCostsBDTInput) || 0);

    // 1. Formula Steps
    const taxUSD = adSpendUSD * (taxRate / 100);
    const totalUSDWithTax = adSpendUSD + taxUSD;

    const baseAdSpendBDT = Math.round(adSpendUSD * rate);
    const taxAmountBDT = Math.round(taxUSD * rate);
    const totalAdCostBDT = Math.round(totalUSDWithTax * rate);

    const gatewayFeesBDT = Math.round(rawRevenueBDT * (gatewayRate / 100));
    const totalExpensesBDT = totalAdCostBDT + gatewayFeesBDT + otherCosts;

    const netProfitBDT = rawRevenueBDT - totalExpensesBDT;

    const revenuePerSale = rawSalesCount > 0 ? Math.round(rawRevenueBDT / rawSalesCount) : 0;
    const adCostPerSale = rawSalesCount > 0 ? Math.round(totalAdCostBDT / rawSalesCount) : 0;
    const totalCostPerSale = rawSalesCount > 0 ? Math.round(totalExpensesBDT / rawSalesCount) : 0;
    const profitPerSale = rawSalesCount > 0 ? Math.round(netProfitBDT / rawSalesCount) : 0;

    const profitMarginPercent = rawRevenueBDT > 0 ? Number(((netProfitBDT / rawRevenueBDT) * 100).toFixed(2)) : 0;
    const roas = totalAdCostBDT > 0 ? Number((rawRevenueBDT / totalAdCostBDT).toFixed(2)) : 0;
    const roiPercent = totalExpensesBDT > 0 ? Number(((netProfitBDT / totalExpensesBDT) * 100).toFixed(2)) : 0;
    const breakEvenOrders = revenuePerSale > 0 ? Math.ceil(totalExpensesBDT / revenuePerSale) : 0;

    return {
      adSpendUSD,
      taxRatePercent: taxRate,
      taxAmountUSD: Number(taxUSD.toFixed(2)),
      totalAdSpendUSDWithTax: Number(totalUSDWithTax.toFixed(2)),
      exchangeRate: rate,
      baseAdSpendBDT,
      taxAmountBDT,
      totalAdCostBDT,
      gatewayFeesBDT,
      otherCostsBDT: otherCosts,
      totalExpensesBDT,
      totalRevenueBDT: rawRevenueBDT,
      netProfitBDT,
      totalSalesCount: rawSalesCount,
      bundleSalesCount: rawBundleCount,
      singleSalesCount: rawSingleCount,
      revenuePerSale,
      adCostPerSale,
      totalCostPerSale,
      profitPerSale,
      profitMarginPercent,
      roas,
      roiPercent,
      breakEvenOrders,
    };
  }, [
    serverData,
    adSpendUSDInput,
    taxRatePercentInput,
    exchangeRateInput,
    gatewayFeePercentInput,
    otherCostsBDTInput,
  ]);

  const handleManualSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveToBackend({
      adSpendUSD: Number(adSpendUSDInput) || 0,
      taxRatePercent: Number(taxRatePercentInput) || 15,
      exchangeRate: Number(exchangeRateInput) || 130,
      gatewayFeePercent: Number(gatewayFeePercentInput) || 1.5,
      otherCostsBDT: Number(otherCostsBDTInput) || 0,
      notes: notesInput,
    }, true);
  };

  const isProfit = liveCalculations.netProfitBDT >= 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B6914] mb-1">
            <TrendingUp className="w-4 h-4 text-[#C8A45C]" />
            Business Financial Intelligence
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Profit & Loss Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time financial performance with Facebook Ads USD spend, 15% tax, ৳130 conversion rate, and net ROI.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Filter Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/70 text-xs font-semibold">
            {[
              { id: "all", label: "All Time" },
              { id: "thismonth", label: "This Month" },
              { id: "last30days", label: "30 Days" },
              { id: "last7days", label: "7 Days" },
              { id: "today", label: "Today" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRange(tab.id as DateRange)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                  range === tab.id
                    ? "bg-white text-slate-900 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => fetchData(range)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => handleManualSave()}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>
      </div>

      {/* ─── 1. Primary Facebook Ads & Calculation Engine ─── */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-700/60 relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A45C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C8A45C]/20 border border-[#C8A45C]/40 text-[#C8A45C] text-[10px] font-bold uppercase tracking-wider">
                  Core Ad Cost Engine
                </span>
                <span className="text-xs text-slate-400 font-mono">1 USD = ৳{liveCalculations.exchangeRate} BDT</span>
                {lastSavedTime && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Saved {lastSavedTime}</span>
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 mt-1">
                Facebook Ads Input & Conversion Formula
              </h3>
            </div>

            {/* Step-by-Step Formula Visual Badges */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] font-mono text-slate-300 bg-slate-800/80 px-3.5 py-2 rounded-2xl border border-slate-700/80 flex-wrap">
              <span className="text-[#C8A45C] font-bold">${liveCalculations.adSpendUSD} USD</span>
              <span className="text-slate-500">+</span>
              <span className="text-amber-400 font-bold">15% Tax (${liveCalculations.taxAmountUSD})</span>
              <span className="text-slate-500">×</span>
              <span className="text-blue-400 font-bold">৳{liveCalculations.exchangeRate}</span>
              <span className="text-slate-500">=</span>
              <span className="text-emerald-400 font-extrabold text-xs">৳{liveCalculations.totalAdCostBDT.toLocaleString()} BDT</span>
            </div>
          </div>

          {/* Ad Spend Interactive Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Main USD Spend Input */}
            <div className="md:col-span-6 space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                Facebook Ads Spend (in USD $) *
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold text-lg">
                  $
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={adSpendUSDInput}
                  onChange={(e) => setAdSpendUSDInput(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-800/90 border-2 border-slate-600 focus:border-[#C8A45C] rounded-2xl text-xl font-extrabold text-white outline-none transition-all placeholder:text-slate-500 font-mono"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[10px] text-slate-400 font-semibold">Quick Presets:</span>
                {[25, 50, 100, 200, 500, 1000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAdSpendUSDInput(String(preset))}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold cursor-pointer transition-all ${
                      Number(adSpendUSDInput) === preset
                        ? "bg-[#C8A45C] text-slate-950 shadow-xs"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Breakdown Display Cards */}
            <div className="md:col-span-6 grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Base Ad Spend
                </span>
                <span className="text-base sm:text-lg font-extrabold text-slate-200 block font-mono mt-0.5">
                  ৳{liveCalculations.baseAdSpendBDT.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  (${liveCalculations.adSpendUSD} USD)
                </span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  15% Tax Amount
                </span>
                <span className="text-base sm:text-lg font-extrabold text-amber-300 block font-mono mt-0.5">
                  ৳{liveCalculations.taxAmountBDT.toLocaleString()}
                </span>
                <span className="text-[10px] text-amber-400/80 block font-mono">
                  (${liveCalculations.taxAmountUSD} USD)
                </span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Total Ad Cost
                </span>
                <span className="text-base sm:text-lg font-extrabold text-emerald-300 block font-mono mt-0.5">
                  ৳{liveCalculations.totalAdCostBDT.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400/80 block font-mono">
                  (${liveCalculations.totalAdSpendUSDWithTax} w/ Tax)
                </span>
              </div>
            </div>

          </div>

          {/* Collapsible Advanced Configuration */}
          <div className="pt-2 border-t border-slate-700/60">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-semibold cursor-pointer py-1"
            >
              <Sliders className="w-3.5 h-3.5 text-[#C8A45C]" />
              <span>Advanced Cost Parameters & Notes</span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvanced && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 mt-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div className="space-y-1 text-xs">
                  <label className="text-slate-400 font-bold block">Tax Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={taxRatePercentInput}
                    onChange={(e) => setTaxRatePercentInput(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono outline-none"
                  />
                  <span className="text-[10px] text-slate-500">Govt ad tax (default: 15%)</span>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="text-slate-400 font-bold block">Exchange Rate (BDT/USD)</label>
                  <input
                    type="number"
                    min="1"
                    value={exchangeRateInput}
                    onChange={(e) => setExchangeRateInput(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono outline-none"
                  />
                  <span className="text-[10px] text-slate-500">Bank conversion rate (default: 130)</span>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="text-slate-400 font-bold block">bKash Gateway Fee (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={gatewayFeePercentInput}
                    onChange={(e) => setGatewayFeePercentInput(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono outline-none"
                  />
                  <span className="text-[10px] text-slate-500">Auto merchant deduction (default: 1.5%)</span>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="text-slate-400 font-bold block">Other Custom Costs (৳ BDT)</label>
                  <input
                    type="number"
                    min="0"
                    value={otherCostsBDTInput}
                    onChange={(e) => setOtherCostsBDTInput(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono outline-none"
                  />
                  <span className="text-[10px] text-slate-500">Domains, server, staff, etc.</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ─── 2. Top Executive Summary KPI Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Total Revenue */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              ৳{liveCalculations.totalRevenueBDT.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span className="font-bold text-emerald-600">{liveCalculations.totalSalesCount} Paid Orders</span>
              <span>•</span>
              <span>AOV ৳{liveCalculations.revenuePerSale}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Ad & Operation Costs */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Costs & Ads
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              ৳{liveCalculations.totalExpensesBDT.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span>Ads: ৳{liveCalculations.totalAdCostBDT.toLocaleString()}</span>
              <span>•</span>
              <span>Gateway: ৳{liveCalculations.gatewayFeesBDT}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Net Profit / Loss (Dynamic Color) */}
        <div className={`p-5 sm:p-6 rounded-3xl border shadow-xs space-y-3 ${
          isProfit
            ? "bg-emerald-900 text-white border-emerald-800"
            : "bg-rose-950 text-white border-rose-800"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {isProfit ? "Net Profit" : "Net Loss"}
            </span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
              isProfit ? "bg-emerald-800 text-emerald-300" : "bg-rose-900 text-rose-300"
            }`}>
              {isProfit ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
              {isProfit ? "+" : ""}৳{liveCalculations.netProfitBDT.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-300">
              <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                isProfit ? "bg-emerald-800 text-emerald-200" : "bg-rose-800 text-rose-200"
              }`}>
                {liveCalculations.profitMarginPercent}% Margin
              </span>
              <span>•</span>
              <span>{isProfit ? "Profitable" : "Underperforming"}</span>
            </div>
          </div>
        </div>

        {/* Card 4: ROAS & Efficiency */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              ROAS & Marketing ROI
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              {liveCalculations.roas}x ROAS
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span className={`font-bold ${liveCalculations.roas >= 2 ? "text-emerald-600" : liveCalculations.roas >= 1 ? "text-amber-600" : "text-rose-600"}`}>
                {liveCalculations.roas >= 2 ? "High ROAS" : liveCalculations.roas >= 1 ? "Break-even+" : "Loss"}
              </span>
              <span>•</span>
              <span>ROI: {liveCalculations.roiPercent}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* ─── 3. Unit Economics & Visual Breakdown Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Unit Economics Breakdown (Waterfall Card) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#8B6914]" />
                <h3 className="text-base font-bold text-slate-900">
                  Unit Economics (Per Sale Breakdown)
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400 font-mono">
                Based on {liveCalculations.totalSalesCount} Orders
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Exact financial breakdown generated by every single book order on your website:
            </p>

            {/* Waterfall Breakdown Rows */}
            <div className="space-y-3 mt-5">
              
              {/* Row 1: Average Revenue per sale */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    +
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Gross Selling Price (AOV)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Average revenue collected per customer
                    </span>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-emerald-600 font-mono">
                  +৳{liveCalculations.revenuePerSale}
                </span>
              </div>

              {/* Row 2: Ad Acquisition Cost (CAC) */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                    -
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Facebook Ad Cost (CAC)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Including 15% ad tax & exchange rate
                    </span>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-amber-600 font-mono">
                  -৳{liveCalculations.adCostPerSale}
                </span>
              </div>

              {/* Row 3: bKash Gateway Fee */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                    -
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      bKash Gateway Processing (1.5%)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Automated payout gateway charge
                    </span>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-slate-600 font-mono">
                  -৳{liveCalculations.totalSalesCount > 0 ? Math.round(liveCalculations.gatewayFeesBDT / liveCalculations.totalSalesCount) : 0}
                </span>
              </div>

              {/* Final Row: Net Profit Per Order */}
              <div className={`flex items-center justify-between p-4 rounded-2xl border-2 ${
                liveCalculations.profitPerSale >= 0
                  ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                  : "bg-rose-50/80 border-rose-300 text-rose-950"
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    liveCalculations.profitPerSale >= 0 ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                  }`}>
                    =
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-extrabold block">
                      Net Profit Earned Per Book Sale
                    </span>
                    <span className="text-[11px] opacity-80">
                      Direct cash profit remaining after all marketing & fees
                    </span>
                  </div>
                </div>
                <span className={`text-base sm:text-lg font-black font-mono ${
                  liveCalculations.profitPerSale >= 0 ? "text-emerald-700" : "text-rose-700"
                }`}>
                  {liveCalculations.profitPerSale >= 0 ? "+" : ""}৳{liveCalculations.profitPerSale}
                </span>
              </div>

            </div>
          </div>

          {/* Break-even sales indicator */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C8A45C] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-slate-100 block">Break-even Threshold:</span>
                <span className="text-slate-400 text-[11px]">
                  Requires <strong>{liveCalculations.breakEvenOrders} sales</strong> to fully cover your ad spend of ৳{liveCalculations.totalAdCostBDT.toLocaleString()}.
                </span>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono ${
              liveCalculations.totalSalesCount >= liveCalculations.breakEvenOrders
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
            }`}>
              {liveCalculations.totalSalesCount >= liveCalculations.breakEvenOrders ? "Profitable Target Hit" : "Needs More Sales"}
            </span>
          </div>

        </div>

        {/* Expense Distribution & Package Split (Right Column) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Package Mix Breakdown Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8B6914]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Sales Mix by Product Package
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {/* 2-Book Bundle */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">2-Book Master Bundle</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 text-[9px] font-extrabold font-mono">
                      ৳199
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {liveCalculations.bundleSalesCount} orders • ৳{(liveCalculations.bundleSalesCount * 199).toLocaleString()} generated
                  </span>
                </div>
                <span className="text-xs font-bold text-amber-900 font-mono">
                  {liveCalculations.totalSalesCount > 0 ? Math.round((liveCalculations.bundleSalesCount / liveCalculations.totalSalesCount) * 100) : 0}%
                </span>
              </div>

              {/* Single Book */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">The 48 Laws (Single)</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-800 text-[9px] font-extrabold font-mono">
                      ৳149
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {liveCalculations.singleSalesCount} orders • ৳{(liveCalculations.singleSalesCount * 149).toLocaleString()} generated
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-700 font-mono">
                  {liveCalculations.totalSalesCount > 0 ? Math.round((liveCalculations.singleSalesCount / liveCalculations.totalSalesCount) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Cost Allocation Visual Bar */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#8B6914]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Revenue Cost Allocation
                </h3>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${Math.min(100, (liveCalculations.baseAdSpendBDT / (liveCalculations.totalRevenueBDT || 1)) * 100)}%` }}
                className="bg-blue-600 h-full"
                title="Base Ad Spend"
              />
              <div
                style={{ width: `${Math.min(100, (liveCalculations.taxAmountBDT / (liveCalculations.totalRevenueBDT || 1)) * 100)}%` }}
                className="bg-amber-500 h-full"
                title="15% Govt Tax"
              />
              <div
                style={{ width: `${Math.min(100, (liveCalculations.gatewayFeesBDT / (liveCalculations.totalRevenueBDT || 1)) * 100)}%` }}
                className="bg-slate-400 h-full"
                title="bKash Fee"
              />
              {isProfit && (
                <div
                  style={{ width: `${Math.min(100, liveCalculations.profitMarginPercent)}%` }}
                  className="bg-emerald-500 h-full"
                  title="Net Profit"
                />
              )}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                <span>Base Ads: ৳{liveCalculations.baseAdSpendBDT.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span>15% Tax: ৳{liveCalculations.taxAmountBDT.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                <span>bKash Fee: ৳{liveCalculations.gatewayFeesBDT.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Net Margin: {liveCalculations.profitMarginPercent}%</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ─── 4. Full Profit & Loss Accounting Statement Table ─── */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Profit & Loss Financial Statement
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Audited summary of revenues, advertising expenses, and net earnings for range: <strong className="capitalize">{range}</strong>.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            Currency: BDT (৳)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                <th className="py-3 px-6">Line Item / Account Description</th>
                <th className="py-3 px-6">Calculation Basis</th>
                <th className="py-3 px-6 text-right">Amount (BDT ৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              
              {/* Section 1: Revenue */}
              <tr className="bg-slate-50/40 font-bold text-slate-900">
                <td className="py-3.5 px-6 font-sans">1. Gross Digital Sales Revenue</td>
                <td className="py-3.5 px-6 text-slate-500 font-normal">{liveCalculations.totalSalesCount} Completed Orders</td>
                <td className="py-3.5 px-6 text-right text-emerald-600 font-extrabold">+৳{liveCalculations.totalRevenueBDT.toLocaleString()}</td>
              </tr>

              {/* Section 2: Advertising Expenses */}
              <tr>
                <td className="py-3 px-6 pl-10 text-slate-700 font-sans">Facebook Ads (Base Spend)</td>
                <td className="py-3 px-6 text-slate-500">${liveCalculations.adSpendUSD} USD × ৳{liveCalculations.exchangeRate}</td>
                <td className="py-3 px-6 text-right text-slate-700">৳{liveCalculations.baseAdSpendBDT.toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-3 px-6 pl-10 text-slate-700 font-sans">Government / Digital Ad Tax (15%)</td>
                <td className="py-3 px-6 text-slate-500">${liveCalculations.taxAmountUSD} USD × ৳{liveCalculations.exchangeRate}</td>
                <td className="py-3 px-6 text-right text-slate-700">৳{liveCalculations.taxAmountBDT.toLocaleString()}</td>
              </tr>
              <tr className="bg-amber-50/40 font-bold text-amber-950">
                <td className="py-3 px-6 pl-8 font-sans">Total Advertising Cost</td>
                <td className="py-3 px-6 text-amber-800 font-normal">Base + 15% Tax (${liveCalculations.totalAdSpendUSDWithTax} USD)</td>
                <td className="py-3 px-6 text-right text-amber-700 font-extrabold">-৳{liveCalculations.totalAdCostBDT.toLocaleString()}</td>
              </tr>

              {/* Section 3: Processing & Other Costs */}
              <tr>
                <td className="py-3 px-6 pl-10 text-slate-700 font-sans">bKash Payment Gateway Fee</td>
                <td className="py-3 px-6 text-slate-500">{liveCalculations.gatewayFeesBDT > 0 ? "1.5% on gross revenue" : "No fees recorded"}</td>
                <td className="py-3 px-6 text-right text-slate-700">-৳{liveCalculations.gatewayFeesBDT.toLocaleString()}</td>
              </tr>
              {liveCalculations.otherCostsBDT > 0 && (
                <tr>
                  <td className="py-3 px-6 pl-10 text-slate-700 font-sans">Other Operational Costs</td>
                  <td className="py-3 px-6 text-slate-500">Custom administrative overhead</td>
                  <td className="py-3 px-6 text-right text-slate-700">-৳{liveCalculations.otherCostsBDT.toLocaleString()}</td>
                </tr>
              )}

              {/* Total Expenses Row */}
              <tr className="bg-slate-100 font-bold text-slate-900">
                <td className="py-3.5 px-6 font-sans">2. Total Operating Expenses</td>
                <td className="py-3.5 px-6 text-slate-500 font-normal">Ads + Tax + Gateway + Other</td>
                <td className="py-3.5 px-6 text-right text-rose-600 font-extrabold">-৳{liveCalculations.totalExpensesBDT.toLocaleString()}</td>
              </tr>

              {/* Net Profit Final Row */}
              <tr className={`text-base font-black ${
                isProfit ? "bg-emerald-50 text-emerald-950" : "bg-rose-50 text-rose-950"
              }`}>
                <td className="py-4 px-6 font-sans">NET OPERATING PROFIT / (LOSS)</td>
                <td className="py-4 px-6 text-xs font-normal">Revenue minus All Operating Costs</td>
                <td className={`py-4 px-6 text-right text-lg font-black ${
                  isProfit ? "text-emerald-700" : "text-rose-700"
                }`}>
                  {isProfit ? "+" : ""}৳{liveCalculations.netProfitBDT.toLocaleString()}
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
