"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Network,
  Sliders,
  History,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  LogOut,
  User,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export type Role = "STUDENT" | "ADMIN";

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  // Role switcher state
  const [currentRole, setCurrentRole] = useState<Role>("STUDENT");

  // Automatically detect role based on path
  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setCurrentRole("ADMIN");
    } else {
      setCurrentRole("STUDENT");
    }
  }, [pathname]);

  const studentNav = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Konsultasi AI", href: "/consultation", icon: MessageSquare, badge: "AI Core" },
    { label: "Study Path", href: "/study-path", icon: Network },
    { label: "Simulasi What-if", href: "/simulation", icon: Sliders },
    { label: "Riwayat Konsultasi", href: "/history", icon: History },
  ];

  const adminNav = [
    { label: "Dashboard & Laporan", href: "/admin/dashboard", icon: BarChart3 },
    { label: "Validasi Rekomendasi", href: "/admin/validations", icon: ClipboardCheck, badge: "3 Baru" },
    { label: "Kelola Kurikulum", href: "/admin/curriculum", icon: BookOpen },
  ];

  const currentNav = currentRole === "STUDENT" ? studentNav : adminNav;

  return (
    <aside className="w-64 min-h-screen bg-[#1e3a8a] text-white flex flex-col justify-between shrink-0 shadow-xl border-r border-blue-900/40 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-blue-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight leading-tight text-white">
              AcademicAI
            </h1>
            <span className="text-[10px] text-blue-200 tracking-wider uppercase font-semibold">
              Advisor System
            </span>
          </div>
        </div>

        {/* User Card */}
        <div className="px-5 py-3.5 bg-blue-950/50 border-b border-blue-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-800 border border-blue-600 flex items-center justify-center text-xs font-bold text-blue-200">
              {currentRole === "STUDENT" ? "BS" : "DA"}
            </div>
            <div>
              <p className="text-xs font-semibold text-white truncate max-w-[110px]">
                {currentRole === "STUDENT" ? "Budi Santoso" : "Dr. Ani, M.Kom"}
              </p>
              <p className="text-[10px] text-blue-300 font-mono">
                {currentRole === "STUDENT" ? "NIM: 2021080112" : "Dosen Wali"}
              </p>
            </div>
          </div>
          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            {currentRole}
          </span>
        </div>

        {/* Nav Links */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-300/80">
            {currentRole === "STUDENT" ? "Menu Mahasiswa" : "Menu Dosen / Admin"}
          </div>
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-800 text-white shadow-inner font-semibold border-l-4 border-emerald-400 pl-2"
                    : "text-blue-100 hover:bg-blue-800/60 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-blue-300 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Role Switcher & Bottom Actions */}
      <div className="p-4 border-t border-blue-800/80 space-y-3">
        {/* Quick RBAC Switcher */}
        <div className="bg-blue-950/60 p-2.5 rounded-xl border border-blue-800/60">
          <span className="text-[10px] text-blue-300 font-bold block mb-1.5">
            Ganti Tampilan Role (RBAC):
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <Link
              href="/dashboard"
              onClick={() => setCurrentRole("STUDENT")}
              className={`py-1.5 px-2 rounded-lg text-center transition flex items-center justify-center gap-1 ${
                currentRole === "STUDENT"
                  ? "bg-emerald-500 font-bold text-white shadow"
                  : "bg-blue-900/60 text-blue-200 hover:bg-blue-900"
              }`}
            >
              <User className="w-3 h-3" />
              Mahasiswa
            </Link>
            <Link
              href="/admin/dashboard"
              onClick={() => setCurrentRole("ADMIN")}
              className={`py-1.5 px-2 rounded-lg text-center transition flex items-center justify-center gap-1 ${
                currentRole === "ADMIN"
                  ? "bg-emerald-500 font-bold text-white shadow"
                  : "bg-blue-900/60 text-blue-200 hover:bg-blue-900"
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              Dosen
            </Link>
          </div>
        </div>

        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2 text-rose-300 hover:text-white hover:bg-rose-500/20 rounded-lg transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          Keluar ke Login
        </Link>
      </div>
    </aside>
  );
};
