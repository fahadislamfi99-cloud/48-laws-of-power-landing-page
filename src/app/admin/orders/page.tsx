"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard, Search, RefreshCw, Copy, Check, Eye, Plus,
  Trash2, Download, ChevronLeft, ChevronRight, X, Save,
  ExternalLink, ShieldCheck, Mail, Zap, FileText, Send,
  AlertCircle, CheckCircle2, Phone
} from "lucide-react";
import ToastNotification, { ToastState } from "@/components/admin/ToastNotification";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    targetEmail: "",
    customerPhone: "",
    amount: 999,
    paymentMethod: "bkash_gateway",
    paymentStatus: "paid",
    orderStatus: "active",
    trxId: "",
    notes: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/orders", window.location.origin);
      url.searchParams.set("page", String(page));
      url.searchParams.set("limit", "12");
      if (search.trim()) url.searchParams.set("search", search.trim());
      if (paymentStatus && paymentStatus !== "all") url.searchParams.set("paymentStatus", paymentStatus);
      if (paymentMethod && paymentMethod !== "all") url.searchParams.set("paymentMethod", paymentMethod);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
        setTotalPages(data.pagination.totalPages || 1);
        setTotalCount(data.pagination.total || 0);
      }
    } catch {
      showToast("Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, paymentStatus, paymentMethod]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleUpdateOrderStatus = async (newStatus: string) => {
    if (!selectedOrder) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentStatus: newStatus,
          orderStatus: newStatus === "paid" ? "active" : newStatus === "cancelled" ? "cancelled" : "pending",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Order status updated successfully");
        setSelectedOrder({ ...selectedOrder, paymentStatus: newStatus });
        fetchOrders();
      } else {
        showToast(data.message || "Failed to update order", "error");
      }
    } catch {
      showToast("Server error updating order", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRegeneratePdf = async () => {
    if (!selectedOrder) return;
    setIsActionLoading("pdf");
    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "regenerate_pdf" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message || "PDF regenerated with customer phone watermark!");
        setSelectedOrder({ ...selectedOrder, pdfStatus: "generated" });
        fetchOrders();
      } else {
        showToast(data.message || "Failed to regenerate PDF", "error");
      }
    } catch {
      showToast("Server error regenerating PDF", "error");
    } finally {
      setIsActionLoading(null);
    }
  };

  const handleResendEmail = async () => {
    if (!selectedOrder) return;
    setIsActionLoading("email");
    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resend_email" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message || "PDF successfully sent to customer Gmail!");
        setSelectedOrder({ ...selectedOrder, emailStatus: "sent" });
        fetchOrders();
      } else {
        showToast(data.message || "Failed to send email", "error");
      }
    } catch {
      showToast("Server error sending email", "error");
    } finally {
      setIsActionLoading(null);
    }
  };

  const handleRegenerateToken = async () => {
    if (!selectedOrder) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regenerateToken: true }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("New secure download token generated!");
        setSelectedOrder({ ...selectedOrder, downloadToken: data.downloadToken });
        fetchOrders();
      }
    } catch {
      showToast("Failed to regenerate token", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order record?")) return;
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Order deleted successfully");
        setSelectedOrder(null);
        fetchOrders();
      } else {
        showToast(data.message || "Failed to delete", "error");
      }
    } catch {
      showToast("Server error deleting order", "error");
    }
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Order created successfully!");
        setCreateModalOpen(false);
        setNewOrder({
          customerName: "",
          targetEmail: "",
          customerPhone: "",
          amount: 999,
          paymentMethod: "bkash_gateway",
          paymentStatus: "paid",
          orderStatus: "active",
          trxId: "",
          notes: "",
        });
        fetchOrders();
      } else {
        showToast(data.message || "Failed to create order", "error");
      }
    } catch {
      showToast("Server error creating order", "error");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Orders & PDF Deliveries
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Total {totalCount} orders • Automated PDF Watermarking & Gmail Dispatch
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={fetchOrders}
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
            <span>Create Manual Order</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchOrders()}
            placeholder="Search Order #, Gmail, Phone, TrxID..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={paymentStatus}
            onChange={(e) => { setPaymentStatus(e.target.value); setPage(1); }}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer"
          >
            <option value="all">All Payment Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={paymentMethod}
            onChange={(e) => { setPaymentMethod(e.target.value); setPage(1); }}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer"
          >
            <option value="all">All Payment Methods</option>
            <option value="bkash_gateway">bKash Auto Gateway</option>
            <option value="bkash_manual">Manual bKash</option>
          </select>
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6">Order #</th>
                <th className="py-3.5 px-6">Customer & Phone</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">TrxID & Gateway</th>
                <th className="py-3.5 px-6">PDF Status</th>
                <th className="py-3.5 px-6">Gmail Status</th>
                <th className="py-3.5 px-6">Downloads</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Loading orders from database...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No orders matching criteria
                  </td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {order.orderNumber}
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-900 block truncate max-w-[180px]">
                        {order.targetEmail}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{order.customerPhone || order.payerPhone || "No Phone"}</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 font-bold text-slate-900">
                      ৳{order.amount}
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-[10px] font-bold text-slate-600 block uppercase">
                        {order.paymentMethod === "bkash_gateway" ? "bKash Auto" : "bKash Manual"}
                      </span>
                      {order.trxId ? (
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="font-mono text-[10px] text-[#8B6914] font-bold">
                            {order.trxId}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(order.trxId, order._id)}
                            className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                          >
                            {copiedId === order._id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.pdfStatus === "generated"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : order.pdfStatus === "failed"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        <FileText className="w-3 h-3" />
                        <span>{order.pdfStatus ? order.pdfStatus.toUpperCase() : "READY"}</span>
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.emailStatus === "sent"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : order.emailStatus === "failed"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        <Mail className="w-3 h-3" />
                        <span>{order.emailStatus ? order.emailStatus.toUpperCase() : "PENDING"}</span>
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-slate-700 font-semibold font-mono">
                        {order.downloadCount || 0} times
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        title="View Details & Actions"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteOrder(order._id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                        title="Delete Order"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-2 rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Order Details & Retry Actions Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-scaleIn">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8B6914] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {selectedOrder.orderNumber}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Order & Watermark Delivery Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between">
                <span className="text-slate-500">Customer Gmail:</span>
                <span className="font-bold text-slate-900">{selectedOrder.targetEmail}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between">
                <span className="text-slate-500">Watermarked Phone:</span>
                <span className="font-mono font-bold text-[#8B6914]">
                  {selectedOrder.customerPhone || selectedOrder.payerPhone || "Not provided"}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between">
                <span className="text-slate-500">Amount & Status:</span>
                <span className="font-bold text-slate-900">৳{selectedOrder.amount} BDT ({selectedOrder.paymentStatus.toUpperCase()})</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-bold text-[#8B6914]">{selectedOrder.trxId || "N/A"}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between">
                <span className="text-slate-500">Order Date:</span>
                <span className="font-mono text-slate-700">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>

              {/* PDF & Email Status with Retry Actions */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                  Delivery Status & Retry Controls
                </span>

                <div className="flex items-center justify-between pt-1">
                  <div className="space-y-0.5">
                    <span className="text-slate-500 block">Watermark PDF Status:</span>
                    <span className={`font-bold ${selectedOrder.pdfStatus === "generated" ? "text-emerald-600" : "text-amber-600"}`}>
                      {selectedOrder.pdfStatus ? selectedOrder.pdfStatus.toUpperCase() : "READY"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRegeneratePdf}
                    disabled={isActionLoading === "pdf"}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isActionLoading === "pdf" ? "animate-spin" : ""}`} />
                    <span>Regenerate PDF</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <div className="space-y-0.5">
                    <span className="text-slate-500 block">Gmail Delivery Status:</span>
                    <span className={`font-bold ${selectedOrder.emailStatus === "sent" ? "text-emerald-600" : "text-amber-600"}`}>
                      {selectedOrder.emailStatus ? selectedOrder.emailStatus.toUpperCase() : "PENDING"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={isActionLoading === "email"}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3 h-3" />
                    <span>Resend PDF to Gmail</span>
                  </button>
                </div>
              </div>

              {/* Download Access Token */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Secure Download Link ({selectedOrder.downloadCount || 0} downloads)
                  </span>
                  <button
                    type="button"
                    onClick={handleRegenerateToken}
                    disabled={isUpdating}
                    className="text-[10px] text-[#C8A45C] hover:underline font-bold cursor-pointer"
                  >
                    Regenerate Token
                  </button>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800 font-mono text-[11px]">
                  <span className="truncate max-w-[280px]">
                    {window.location.origin}/api/download/{selectedOrder.downloadToken}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`${window.location.origin}/api/download/${selectedOrder.downloadToken}`, "modal_token")}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copiedId === "modal_token" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Status Updater */}
              <div className="space-y-2 pt-2">
                <label className="block font-bold text-slate-700">Change Payment Status:</label>
                <div className="grid grid-cols-3 gap-2">
                  {["paid", "pending", "cancelled"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateOrderStatus(st)}
                      disabled={isUpdating || selectedOrder.paymentStatus === st}
                      className={`py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        selectedOrder.paymentStatus === st
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Order Creation Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <form
            onSubmit={handleCreateOrder}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4 animate-scaleIn"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Create Manual Order
              </h3>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Customer Gmail *</label>
              <input
                type="email"
                required
                value={newOrder.targetEmail}
                onChange={(e) => setNewOrder({ ...newOrder, targetEmail: e.target.value })}
                placeholder="customer@gmail.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Customer Phone Number (For Watermark) *</label>
              <input
                type="tel"
                required
                value={newOrder.customerPhone}
                onChange={(e) => setNewOrder({ ...newOrder, customerPhone: e.target.value })}
                placeholder="017XXXXXXXX"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Amount (BDT)</label>
              <input
                type="number"
                required
                value={newOrder.amount}
                onChange={(e) => setNewOrder({ ...newOrder, amount: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Transaction ID (TrxID)</label>
              <input
                type="text"
                value={newOrder.trxId}
                onChange={(e) => setNewOrder({ ...newOrder, trxId: e.target.value })}
                placeholder="e.g. 9J4K2L8M7"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase text-slate-800 outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Payment Status</label>
              <select
                value={newOrder.paymentStatus}
                onChange={(e) => setNewOrder({ ...newOrder, paymentStatus: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none"
              >
                <option value="paid">Paid (Generate Watermarked PDF & Send Email)</option>
                <option value="pending">Pending Verification</option>
              </select>
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
                {isCreating ? "Creating..." : "Save Order"}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
