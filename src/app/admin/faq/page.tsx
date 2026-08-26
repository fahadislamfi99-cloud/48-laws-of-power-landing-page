"use client";

import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  RefreshCw,
  Trash2,
  Edit2,
  X,
  Save,
  CheckCircle2,
} from "lucide-react";
import ToastNotification, { ToastState } from "@/components/admin/ToastNotification";

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general" as any,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/faq");
      const data = await res.json();
      if (data.success) {
        setFaqs(data.faqs || []);
      }
    } catch {
      showToast("Failed to fetch FAQs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setFormData({ question: "", answer: "", category: "general" });
    setModalOpen(true);
  };

  const handleOpenEdit = (faq: any) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer, category: faq.category || "general" });
    setModalOpen(true);
  };

  const handleToggleActive = async (faq: any) => {
    try {
      const res = await fetch(`/api/admin/faq/${faq._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !faq.isActive }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("FAQ status updated");
        fetchFaqs();
      }
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this FAQ question?")) return;
    try {
      const res = await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("FAQ deleted successfully");
        fetchFaqs();
      }
    } catch {
      showToast("Failed to delete FAQ", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingFaq ? `/api/admin/faq/${editingFaq._id}` : "/api/admin/faq";
      const method = editingFaq ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(editingFaq ? "FAQ updated successfully!" : "New FAQ created!");
        setModalOpen(false);
        fetchFaqs();
      } else {
        showToast(data.message || "Failed to save FAQ", "error");
      }
    } catch {
      showToast("Server error saving FAQ", "error");
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
            FAQ Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage interactive questions & answers displayed on the public landing page
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={fetchFaqs}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New FAQ</span>
          </button>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs bg-white rounded-3xl border border-slate-200">
            Loading FAQs...
          </div>
        ) : faqs.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs bg-white rounded-3xl border border-slate-200 p-8">
            No FAQs found. Add your first customer question!
          </div>
        ) : (
          faqs.map((faq: any, idx: number) => (
            <div
              key={faq._id}
              className={`bg-white border rounded-3xl p-6 shadow-xs space-y-3 transition-all ${
                faq.isActive ? "border-slate-200" : "border-slate-200 opacity-60 bg-slate-50/50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(faq)}
                    className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(faq._id)}
                    className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="capitalize text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-0.5 rounded-lg border border-slate-100">
                  Category: {faq.category || "General"}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleActive(faq)}
                  className="font-bold text-slate-700 hover:underline cursor-pointer"
                >
                  {faq.isActive ? "Hide from website" : "Show on website"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAQ Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4 animate-scaleIn"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingFaq ? "Edit FAQ Item" : "Create New FAQ"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-slate-700">প্রশ্ন (Question) *</label>
              <input
                type="text"
                required
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="যেমন: এই বইটি কি ডিজিটাল পিডিএফ নাকি হার্ডকপি?"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-slate-700">উত্তর (Detailed Answer) *</label>
              <textarea
                required
                rows={4}
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="বিস্তারিত উত্তর লিখুন..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white resize-none"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-slate-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold outline-none cursor-pointer"
              >
                <option value="general">General</option>
                <option value="reading">Reading & PDF</option>
                <option value="payment">Payment & bKash</option>
                <option value="support">Support</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                {isSaving ? "Saving..." : "Save FAQ"}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
