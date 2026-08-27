"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  BookOpen,
  Receipt,
  Tag,
  HelpCircle,
  Settings,
  Globe,
  Sparkles,
  LogOut,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  adminName?: string;
  adminRole?: string;
}

export default function AdminSidebar({
  isOpen,
  onClose,
  onLogout,
  adminName = "Administrator",
  adminRole = "super_admin",
}: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Orders & Sales", href: "/admin/orders", icon: CreditCard },
    { name: "Customer CRM", href: "/admin/customers", icon: Users },
    { name: "Digital PDF & Book", href: "/admin/product", icon: BookOpen },
    { name: "bKash Gateway Logs", href: "/admin/payments", icon: Receipt },
    { name: "Coupons & Discounts", href: "/admin/coupons", icon: Tag },
    { name: "FAQ Management", href: "/admin/faq", icon: HelpCircle },
    { name: "Settings & Security", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Shell */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B6914] via-[#C8A45C] to-[#8B6914] flex items-center justify-center text-black font-display font-bold text-xs shadow-xs">
                48
              </div>
              <div>
                <span className="font-bold text-xs tracking-wider text-slate-900 uppercase block leading-tight">
                  The 48 Laws
                </span>
                <span className="text-[10px] font-semibold text-[#8B6914] tracking-wide uppercase block">
                  Admin Console
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-slate-600 p-1 cursor-pointer group"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 transition-transform duration-300 ease-out group-hover:rotate-90" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3.5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#C8A45C]" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with Live Website Link & Profile Card */}
        <div className="p-3.5 border-t border-slate-100 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-[#8B6914] hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <span>Public Landing Page</span>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-mono font-semibold">
              Live
            </span>
          </Link>

          {/* Profile Card & Logout */}
          <div className="bg-slate-50 rounded-2xl p-3 flex items-center justify-between border border-slate-100">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-slate-900 block truncate">
                  {adminName}
                </span>
                <span className="text-[10px] text-slate-500 font-medium block truncate capitalize">
                  {adminRole.replace("_", " ")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
