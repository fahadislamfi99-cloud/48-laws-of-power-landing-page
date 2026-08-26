"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  ShieldCheck,
  KeyRound,
  User,
  Save,
  Eye,
  EyeOff,
  Phone,
  MessageSquare,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import ToastNotification, { ToastState } from "@/components/admin/ToastNotification";

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Super Admin",
    username: "admin",
    email: "admin@48laws.com",
  });

  const [settings, setSettings] = useState({
    supportWhatsapp: "8801700000000",
    supportPhone: "+8801700000000",
    supportEmail: "support@48laws.com",
    bkashPersonalNumber: "01700000000",
    telegramBotToken: "",
    telegramChatId: "",
    metaPixelId: "",
    downloadExpiryHours: 720,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resAuth, resSettings] = await Promise.all([
        fetch("/api/admin/auth/me"),
        fetch("/api/admin/settings"),
      ]);

      const authData = await resAuth.json();
      const settingsData = await resSettings.json();

      if (authData.success && authData.admin) {
        setProfile({
          name: authData.admin.name || "Super Admin",
          username: authData.admin.username || "admin",
          email: authData.admin.email || "admin@48laws.com",
        });
      }

      if (settingsData.success && settingsData.settings) {
        setSettings({
          supportWhatsapp: settingsData.settings.supportWhatsapp || "8801700000000",
          supportPhone: settingsData.settings.supportPhone || "+8801700000000",
          supportEmail: settingsData.settings.supportEmail || "support@48laws.com",
          bkashPersonalNumber: settingsData.settings.bkashPersonalNumber || "01700000000",
          telegramBotToken: settingsData.settings.telegramBotToken || "",
          telegramChatId: settingsData.settings.telegramChatId || "",
          metaPixelId: settingsData.settings.metaPixelId || "",
          downloadExpiryHours: settingsData.settings.downloadExpiryHours || 720,
        });
      }
    } catch {
      showToast("Failed to load settings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        showToast("New passwords do not match", "error");
        return;
      }
      if (!currentPassword) {
        showToast("Current password is required to set new password", "error");
        return;
      }
    }

    setIsSavingProfile(true);
    try {
      const res = await fetch("/api/admin/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          currentPassword,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Profile & security updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showToast(data.message || "Failed to update profile", "error");
      }
    } catch {
      showToast("Server error updating profile", "error");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("System settings updated successfully!");
      } else {
        showToast(data.message || "Failed to update settings", "error");
      }
    } catch {
      showToast("Server error updating settings", "error");
    } finally {
      setIsSavingSettings(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Settings & Security
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Admin credentials, payment numbers, and automated alert integrations
          </p>
        </div>

        <button
          type="button"
          onClick={fetchData}
          className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Admin Profile & Password (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-4 h-4 text-slate-700" />
            <h3 className="text-base font-bold text-slate-900">
              Admin Profile & Password
            </h3>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Display Name</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Username</label>
                <input
                  type="text"
                  disabled
                  value={profile.username}
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">Admin Email</label>
              <input
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            {/* Change Password Sub-section */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#8B6914]" />
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                  Change Password (Leave blank to keep current)
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full px-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={isSavingProfile}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingProfile ? "Saving..." : "Save Profile & Security"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* System Settings & Credentials (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Payment & Notification Settings
            </h3>

            <form onSubmit={handleUpdateSettings} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">bKash Personal Send Money Number</label>
                <input
                  type="text"
                  required
                  value={settings.bkashPersonalNumber}
                  onChange={(e) => setSettings({ ...settings, bkashPersonalNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 outline-none focus:border-slate-900 focus:bg-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">WhatsApp Helpdesk Number</label>
                <input
                  type="text"
                  required
                  value={settings.supportWhatsapp}
                  onChange={(e) => setSettings({ ...settings, supportWhatsapp: e.target.value })}
                  placeholder="e.g. 8801700000000"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Telegram Bot Token (Optional Alerts)</label>
                <input
                  type="text"
                  value={settings.telegramBotToken}
                  onChange={(e) => setSettings({ ...settings, telegramBotToken: e.target.value })}
                  placeholder="123456:ABC-DEF..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 outline-none focus:border-slate-900 focus:bg-white text-[11px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Telegram Chat ID (Optional)</label>
                <input
                  type="text"
                  value={settings.telegramChatId}
                  onChange={(e) => setSettings({ ...settings, telegramChatId: e.target.value })}
                  placeholder="-100123456789"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 outline-none focus:border-slate-900 focus:bg-white text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingSettings ? "Saving..." : "Save Settings"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Security Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Platform Security Overview</span>
            </h4>

            <div className="space-y-2 text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                <span>Database:</span>
                <span className="font-mono font-bold text-slate-900">MongoDB Atlas (SSL Encrypted)</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                <span>Auth Encryption:</span>
                <span className="font-mono font-bold text-slate-900">bcrypt (Salt Rounds 12)</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                <span>Sessions:</span>
                <span className="font-mono font-bold text-slate-900">HTTP-Only Signed JWT (24h)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
