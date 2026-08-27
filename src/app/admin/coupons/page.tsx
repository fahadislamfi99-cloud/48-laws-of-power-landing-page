"use client";

import React, { useState, useEffect } from "react";
import {
  Tag,
  Plus,
  RefreshCw,
  Trash2,
  CheckCircle2,
  X,
  Copy,
  Check,
  Percent,
} from "lucide-react";
import ToastNotification, { ToastState } from "@/components/admin/ToastNotification";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "fixed" as "fixed" | "percentage",
    discountValue: 100,
    maxUses: 50,
    expiresAt: "",
  });

  const [isCreating, setIsCreating] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      if (data.success) {
        setCoupons(data.coupons || []);
      }
    } catch {
      showToast("Failed to fetch coupons", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast("Coupon code copied!");
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleToggleActive = async (coupon: any) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Coupon ${!coupon.isActive ? "activated" : "deactivated"}`);
        fetchCoupons();
      }
    } catch {
      showToast("Failed to toggle coupon status", "error");
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm("Delete this coupon code?")) return;
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Coupon deleted successfully");
        fetchCoupons();
      }
    } catch {
      showToast("Failed to delete coupon", "error");
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoupon),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("New coupon created successfully!");
        setCreateModalOpen(false);
        setNewCoupon({
          code: "",
          discountType: "fixed",
          discountValue: 100,
          maxUses: 50,
          expiresAt: "",
        });
        fetchCoupons();
      } else {
        showToast(data.message || "Failed to create coupon", "error");
      }
    } catch {
      showToast("Server error creating coupon", "error");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Coupons & Discounts
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Create promotional codes and track customer redemptions
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={fetchCoupons}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Coupon</span>
          </button>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400 text-xs">
            Loading coupons...
          </div>
        ) : coupons.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 text-xs bg-white rounded-3xl border border-slate-200 p-8">
            No coupon codes active. Create your first discount campaign!
          </div>
        ) : (
          coupons.map((coupon: any) => (
            <div
              key={coupon._id}
              className={`bg-white border rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                coupon.isActive ? "border-slate-200" : "border-slate-200 opacity-60 bg-slate-50/50"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                      {coupon.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(coupon.code)}
                      className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                    >
                      {copiedCode === coupon.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      coupon.isActive
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {coupon.isActive ? "Active" : "Disabled"}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {coupon.discountType === "percentage" ? `${coupon.discountValue}% OFF` : `৳${coupon.discountValue} OFF`}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Redeemed {coupon.usedCount || 0} times {coupon.maxUses ? `/ Max ${coupon.maxUses}` : ""}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => handleToggleActive(coupon)}
                  className="text-slate-700 font-bold hover:underline cursor-pointer"
                >
                  {coupon.isActive ? "Deactivate" : "Enable"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCoupon(coupon._id)}
                  className="text-rose-600 hover:underline font-bold cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Coupon Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <form
            onSubmit={handleCreateCoupon}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4 animate-scaleIn"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Create Discount Coupon
              </h3>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer group"
              >
                <X className="w-5 h-5 transition-transform duration-300 ease-out group-hover:rotate-90" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-slate-700">Coupon Code *</label>
              <input
                type="text"
                required
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                placeholder="e.g. POWER50 or EID2026"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Discount Type</label>
                <select
                  value={newCoupon.discountType}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none font-semibold cursor-pointer"
                >
                  <option value="fixed">Fixed BDT (৳)</option>
                  <option value="percentage">Percentage (%)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Discount Value *</label>
                <input
                  type="number"
                  required
                  value={newCoupon.discountValue}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-slate-700">Max Allowed Redemptions</label>
              <input
                type="number"
                value={newCoupon.maxUses}
                onChange={(e) => setNewCoupon({ ...newCoupon, maxUses: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                {isCreating ? "Creating..." : "Save Coupon"}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
