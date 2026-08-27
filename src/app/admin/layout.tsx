"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage) {
      fetch("/api/admin/auth/me")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.admin) {
            setAdmin(data.admin);
          } else {
            router.push("/admin/login");
          }
        })
        .catch(() => {
          router.push("/admin/login");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-900">{children}</div>;
  }

  const getHeaderMeta = () => {
    if (pathname === "/admin") {
      return {
        title: "Executive Overview",
        subtitle: "Real-time metrics, revenue, and quick business statistics",
      };
    }
    if (pathname.startsWith("/admin/orders")) {
      return {
        title: "Orders & Sales",
        subtitle: "Monitor bKash auto payments, manual orders, and download tokens",
      };
    }
    if (pathname.startsWith("/admin/customers")) {
      return {
        title: "Customer CRM",
        subtitle: "View customer lifetime value, purchases, and order history",
      };
    }
    if (pathname.startsWith("/admin/product")) {
      return {
        title: "Digital PDF & Book",
        subtitle: "Configure book pricing, discounts, and PDF file access",
      };
    }
    if (pathname.startsWith("/admin/payments")) {
      return {
        title: "bKash Gateway Logs",
        subtitle: "Inspect raw transactions, query payment IDs, and verify records",
      };
    }
    if (pathname.startsWith("/admin/coupons")) {
      return {
        title: "Coupons & Discounts",
        subtitle: "Create promo codes and track redemptions",
      };
    }
    if (pathname.startsWith("/admin/promotions")) {
      return {
        title: "Promo Popup & Banner",
        subtitle: "Manage conversion popup, discount amount, and promotional artwork",
      };
    }
    if (pathname.startsWith("/admin/faq")) {
      return {
        title: "FAQ Management",
        subtitle: "Manage questions and answers shown on the public landing page",
      };
    }
    if (pathname.startsWith("/admin/settings")) {
      return {
        title: "Settings & Security",
        subtitle: "Update admin credentials, WhatsApp helpdesk, and bot alerts",
      };
    }
    return {
      title: "Admin Dashboard",
      subtitle: "The 48 Laws of Power Bangla Edition Platform",
    };
  };

  const meta = getHeaderMeta();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 text-sm">
        Authenticating admin session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex">
      {/* Responsive Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        adminName={admin?.name || "Administrator"}
        adminRole={admin?.role || "super_admin"}
      />

      {/* Main Dashboard Canvas */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0">
        <AdminHeader
          onToggleMobileMenu={() => setSidebarOpen(!sidebarOpen)}
          title={meta.title}
          subtitle={meta.subtitle}
          adminName={admin?.name || "Admin"}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
