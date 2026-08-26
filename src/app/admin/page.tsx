"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CreditCard,
  DollarSign,
  Users,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Clock,
  CheckCircle2,
  Trash2,
  ExternalLink,
  BookOpen,
  Sparkles,
} from "lucide-react";
import ToastNotification, { ToastState } from "@/components/admin/ToastNotification";

export default function AdminOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch {
      showToast("Failed to fetch dashboard metrics", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleResetDemo = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/reset-demo", { method: "POST" });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast("Demo orders and customer data reset successfully");
        setResetModalOpen(false);
        fetchDashboardData();
      } else {
        showToast(json.message || "Failed to reset demo data", "error");
      }
    } catch {
      showToast("Server error during reset", "error");
    } finally {
      setIsResetting(false);
    }
  };

  const stats = data?.stats || {
    totalRevenue: 0,
    todayRevenue: 0,
    totalOrders: 0,
    paidOrdersCount: 0,
    todayPaidOrdersCount: 0,
    pendingOrdersCount: 0,
    totalCustomers: 0,
  };

  const recentOrders = data?.recentOrders || [];
  const recentCustomers = data?.recentCustomers || [];
  const revenueTrend = data?.revenueTrend || [];

  return (
    <div className="space-y-6">
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              The 48 Laws of Power
            </span>
            <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
              Digital PDF Edition
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Sales & Revenue Command
          </h2>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={fetchDashboardData}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Demo Data</span>
          </button>
        </div>
      </div>

      {/* Metric Cards (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              ৳
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ৳{stats.totalRevenue.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              From {stats.paidOrdersCount} completed sales
            </span>
          </div>
        </div>

        {/* Today's Sales */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Today&apos;s Revenue
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ৳{stats.todayRevenue.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              {stats.todayPaidOrdersCount} orders placed today
            </span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.totalOrders}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              {stats.pendingOrdersCount} pending verification
            </span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Customers
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.totalCustomers}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Registered buyer profiles
            </span>
          </div>
        </div>

      </div>

      {/* Revenue Trend Visualizer */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              7-Day Sales Trend
            </h3>
            <p className="text-xs text-slate-500">Daily revenue across the last 7 days</p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1 rounded-xl">
            bKash Verified Sales
          </span>
        </div>

        <div className="h-40 flex items-end gap-2 sm:gap-4 pt-6 border-b border-slate-100">
          {revenueTrend.map((t: any) => {
            const maxVal = Math.max(...revenueTrend.map((x: any) => x.amount), 1000);
            const heightPercent = Math.max(8, Math.round((t.amount / maxVal) * 100));
            return (
              <div key={t.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  ৳{t.amount}
                </span>
                <div
                  className="w-full max-w-[48px] bg-gradient-to-t from-[#8B6914] to-[#C8A45C] rounded-t-xl group-hover:from-slate-900 group-hover:to-slate-800 transition-all duration-300 shadow-xs"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] text-slate-400 font-mono truncate max-w-[44px]">
                  {t.date.split("-").slice(1).join("/")}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Recent Orders (7 cols) + Recent Customers (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Orders */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Recent Orders ({recentOrders.length})
              </h3>
              <Link
                href="/admin/orders"
                className="text-xs font-bold text-slate-900 hover:text-[#8B6914] inline-flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-2.5">Order #</th>
                    <th className="pb-2.5">Customer</th>
                    <th className="pb-2.5">Amount</th>
                    <th className="pb-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400">
                        No orders recorded yet
                      </td>
                    </tr>
                  ) : (
                    recentOrders.map((order: any) => (
                      <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 font-mono font-bold text-slate-900">
                          {order.orderNumber}
                        </td>
                        <td className="py-3">
                          <span className="font-semibold text-slate-900 block truncate max-w-[150px]">
                            {order.targetEmail}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono block">
                            {order.paymentMethod === "bkash_gateway" ? "bKash Auto" : "bKash Send Money"}
                          </span>
                        </td>
                        <td className="py-3 font-bold text-slate-900">
                          ৳{order.amount}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              order.paymentStatus === "paid"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {order.paymentStatus.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-center">
            <Link
              href="/admin/orders"
              className="text-xs text-slate-900 hover:text-[#8B6914] font-bold"
            >
              Open complete sales & transactions manager →
            </Link>
          </div>
        </div>

        {/* Recent Customers */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Recent Buyers ({recentCustomers.length})
              </h3>
              <Link
                href="/admin/customers"
                className="text-xs font-bold text-slate-900 hover:text-[#8B6914] inline-flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentCustomers.length === 0 ? (
                <p className="py-8 text-center text-xs text-slate-400">
                  No customer profiles registered yet
                </p>
              ) : (
                recentCustomers.map((cust: any) => (
                  <div
                    key={cust._id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {cust.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-slate-900 block truncate">
                          {cust.name || cust.email.split("@")[0]}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block truncate">
                          {cust.email}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-slate-900 block">
                        ৳{cust.totalSpent || 0}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold block capitalize">
                        {cust.totalOrders || 1} purchase
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-center">
            <Link
              href="/admin/customers"
              className="text-xs text-slate-900 hover:text-[#8B6914] font-bold"
            >
              Open customer directory & CRM →
            </Link>
          </div>
        </div>

      </div>

      {/* Reset Demo Data Modal Dialog */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 text-center animate-scaleIn">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Reset Demo Records?
            </h4>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              This action will clear all simulated test orders, bKash raw transaction logs, and customer CRM records. Super admin credentials and product settings will be preserved.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetDemo}
                disabled={isResetting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                {isResetting ? "Resetting..." : "Yes, Reset Data"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
