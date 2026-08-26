"use client";

import React, { useState, useEffect } from "react";
import {
  Receipt,
  Search,
  RefreshCw,
  Copy,
  Check,
  Zap,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import ToastNotification, { ToastState } from "@/components/admin/ToastNotification";

export default function AdminPaymentsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [queryPaymentId, setQueryPaymentId] = useState("");
  const [queryResult, setQueryResult] = useState<any | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/payments", window.location.origin);
      url.searchParams.set("page", String(page));
      url.searchParams.set("limit", "12");
      if (search.trim()) url.searchParams.set("search", search.trim());

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setTransactions(data.transactions);
        setTotalPages(data.pagination.totalPages || 1);
        setTotalCount(data.pagination.total || 0);
      }
    } catch {
      showToast("Failed to fetch payment logs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleQueryGateway = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryPaymentId.trim()) return;

    setIsQuerying(true);
    setQueryResult(null);
    try {
      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentID: queryPaymentId.trim() }),
      });

      const data = await res.json();
      if (data.success) {
        setQueryResult(data.result);
        showToast("Gateway query completed");
      } else {
        showToast(data.message || "Query failed", "error");
      }
    } catch {
      showToast("Server error querying bKash bridge", "error");
    } finally {
      setIsQuerying(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E2136E]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#E2136E]">
              bKash Automated Gateway
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Payment Logs & Transactions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Total {totalCount} verified bKash execution events recorded
          </p>
        </div>

        <button
          type="button"
          onClick={fetchTransactions}
          className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Gateway Query Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#E2136E]" />
          <span>Direct bKash PaymentID Inspector</span>
        </h3>
        <p className="text-xs text-slate-500">
          Query the live bKash gateway bridge for any raw paymentID to inspect transaction status.
        </p>

        <form onSubmit={handleQueryGateway} className="flex gap-2">
          <input
            type="text"
            required
            value={queryPaymentId}
            onChange={(e) => setQueryPaymentId(e.target.value)}
            placeholder="Enter bKash PaymentID (e.g. TR0011...)"
            className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
          />
          <button
            type="submit"
            disabled={isQuerying}
            className="px-6 py-2.5 rounded-xl bg-[#E2136E] hover:bg-[#C90E5F] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
          >
            {isQuerying ? "Querying..." : "Query Gateway"}
          </button>
        </form>

        {queryResult && (
          <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-[11px] overflow-x-auto max-h-48">
            <pre>{JSON.stringify(queryResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs flex items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchTransactions()}
            placeholder="Search TrxID, PaymentID, Phone..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6">TrxID</th>
                <th className="py-3.5 px-6">Payment ID</th>
                <th className="py-3.5 px-6">Payer Number</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Gateway Status</th>
                <th className="py-3.5 px-6">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Loading bKash logs...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No bKash transactions recorded yet
                  </td>
                </tr>
              ) : (
                transactions.map((tx: any) => (
                  <tr key={tx._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{tx.trxID || "PENDING"}</span>
                        {tx.trxID && (
                          <button
                            type="button"
                            onClick={() => handleCopy(tx.trxID, tx._id)}
                            className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                          >
                            {copiedId === tx._id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-slate-600 text-[11px] truncate max-w-[140px]">
                      {tx.paymentID}
                    </td>

                    <td className="py-4 px-6 font-mono font-semibold text-slate-800">
                      {tx.customerMsisdn || "N/A"}
                    </td>

                    <td className="py-4 px-6 font-bold text-slate-900">
                      ৳{tx.amount}
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {tx.transactionStatus || "Completed"}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-mono text-[10px] text-slate-400">
                      {new Date(tx.createdAt).toLocaleString()}
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

    </div>
  );
}
