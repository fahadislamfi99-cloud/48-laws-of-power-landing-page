"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Save,
  RefreshCw,
  FileText,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
} from "lucide-react";
import ToastNotification, { ToastState } from "@/components/admin/ToastNotification";

export default function AdminProductPage() {
  const [product, setProduct] = useState<any>({
    title: "দ্য ৪৮ লজ অফ পাওয়ার (বাংলা অনুবাদ)",
    titleEn: "The 48 Laws of Power (Bengali Edition)",
    subtitle: "ক্ষমতা, প্রভাব ও মানুষের মনস্তত্ত্ব বোঝার ৪৮টি নীতি",
    price: 999,
    originalPrice: 1500,
    discountPercent: 34,
    fileName: "the-48-laws-of-power-bangla.pdf",
    fileSize: "36 MB",
    fileUrl: "/downloads/the-48-laws-of-power-bangla.pdf",
    pages: 452,
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/product");
      const data = await res.json();
      if (data.success && data.product) {
        setProduct(data.product);
      }
    } catch {
      showToast("Failed to fetch product details", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/product", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Digital product settings updated successfully!");
        fetchProduct();
      } else {
        showToast(data.message || "Failed to update product", "error");
      }
    } catch {
      showToast("Server error updating product", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Digital PDF Book Settings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage live pricing, metadata, and secure PDF delivery access
          </p>
        </div>

        <button
          type="button"
          onClick={fetchProduct}
          className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Product Editor (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Book Information & Pricing
          </h3>

          <div className="space-y-4 text-xs">
            {/* Title Bn */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">বইয়ের নাম (Bengali Title) *</label>
              <input
                type="text"
                required
                value={product.title}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            {/* Title En */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">English Title</label>
              <input
                type="text"
                value={product.titleEn}
                onChange={(e) => setProduct({ ...product, titleEn: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">Subtitle / Tagline</label>
              <input
                type="text"
                value={product.subtitle}
                onChange={(e) => setProduct({ ...product, subtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            {/* Pricing Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">বিক্রয় মূল্য (Price in ৳) *</label>
                <input
                  type="number"
                  required
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold outline-none focus:border-slate-900 focus:bg-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">আসল মূল্য (Original ৳)</label>
                <input
                  type="number"
                  value={product.originalPrice}
                  onChange={(e) => setProduct({ ...product, originalPrice: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">ছাড় (Discount %)</label>
                <input
                  type="number"
                  value={product.discountPercent}
                  onChange={(e) => setProduct({ ...product, discountPercent: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white font-mono"
                />
              </div>
            </div>

            {/* PDF File Settings */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                PDF File & Delivery
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Total Pages</label>
                  <input
                    type="number"
                    value={product.pages}
                    onChange={(e) => setProduct({ ...product, pages: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">File Size (e.g. 36 MB)</label>
                  <input
                    type="text"
                    value={product.fileSize}
                    onChange={(e) => setProduct({ ...product, fileSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">
                  Direct PDF / Cloud Storage URL (Optional)
                </label>
                <input
                  type="text"
                  value={product.fileUrl}
                  onChange={(e) => setProduct({ ...product, fileUrl: e.target.value })}
                  placeholder="https://your-cloud-storage.com/file.pdf"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-[11px] outline-none focus:border-slate-900 focus:bg-white"
                />
                <p className="text-[11px] text-slate-400">
                  Leave as default to serve from local server, or input your secure S3 / Google Drive direct link.
                </p>
              </div>
            </div>

            {/* Active Switch */}
            <div className="pt-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={product.isActive}
                onChange={(e) => setProduct({ ...product, isActive: e.target.checked })}
                className="w-4 h-4 rounded text-slate-900 cursor-pointer"
              />
              <label htmlFor="isActive" className="text-xs font-bold text-slate-800 cursor-pointer">
                Product is active & open for instant purchasing on landing page
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Product Settings"}</span>
            </button>
          </div>
        </div>

        {/* Live Preview Box (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8B6914]" />
              <span>Public Landing Card Preview</span>
            </h4>

            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-[#C8A45C]/15 text-[#C8A45C] font-bold px-2 py-0.5 rounded-full border border-[#C8A45C]/25">
                  ডিজিটাল PDF
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">
                  {product.discountPercent}% ছাড়
                </span>
              </div>

              <div>
                <h5 className="font-bold text-sm text-[#F0EBE0]">{product.title}</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">{product.subtitle}</p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <span className="text-xl font-bold text-[#C8A45C]">৳{product.price}</span>
                <span className="text-xs text-slate-500 line-through">৳{product.originalPrice}</span>
              </div>
            </div>

            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Total Pages:</span>
                <span className="font-bold text-slate-900">{product.pages} Pages</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>File Size:</span>
                <span className="font-bold text-slate-900">{product.fileSize}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Status:</span>
                <span className="font-bold text-emerald-600">
                  {product.isActive ? "Active on Website" : "Hidden"}
                </span>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
