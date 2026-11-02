"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/shared/AppShell";
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  ArrowRight, 
  Sparkles, 
  TrendingUp,
  BookOpen
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Mahasiswa Bimbingan", value: "32", change: "+4 semester ini", icon: Users, color: "text-blue-900 bg-blue-50" },
    { label: "Konsultasi Pending", value: "3", change: "Butuh validasi segera", icon: Clock, color: "text-amber-700 bg-amber-50" },
    { label: "Konsultasi Approved", value: "28", change: "92% tingkat persetujuan", icon: CheckCircle2, color: "text-emerald-700 bg-emerald-50" },
    { label: "Catatan Revisi", value: "4", change: "Menunggu respons mahasiswa", icon: AlertTriangle, color: "text-purple-700 bg-purple-50" },
  ];

  const careerInterests = [
    { title: "Machine Learning & AI", count: 14, percentage: 44, color: "bg-blue-900" },
    { title: "Cyber Security & Forensic", count: 8, percentage: 25, color: "bg-emerald-600" },
    { title: "Cloud & DevOps Engineering", count: 6, percentage: 19, color: "bg-amber-500" },
    { title: "Mobile & Web Fullstack", count: 4, percentage: 12, color: "bg-purple-600" },
  ];

  return (
    <AppShell
      title="Dashboard Dosen Wali & Laporan"
      subtitle="Monitoring perkembangan studi mahasiswa bimbingan dan validasi rekomendasi AI"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {s.label}
                  </span>
                  <div className="text-2xl font-extrabold text-slate-900 mt-1">
                    {s.value}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                    {s.change}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts & Pending Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Laporan Distribusi Minat Karir (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-900" />
                <h4 className="font-bold text-slate-900 text-sm">
                  Distribusi Minat Karir Mahasiswa
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold">T.A 2026/2027</span>
            </div>

            <p className="text-xs text-slate-500">
              Data agregat dari pengisian profil mahasiswa yang dianalisis oleh modul semantic AI.
            </p>

            <div className="space-y-4">
              {careerInterests.map((item) => (
                <div key={item.title} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">{item.title}</span>
                    <span className="text-slate-900 font-bold">
                      {item.count} mhs ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Insight AI:</strong> Minat ke arah AI meningkat 35% dibandingkan semester lalu. Disarankan menambah kuota kelas untuk <em>Machine Learning (TI301)</em>.
              </span>
            </div>
          </div>

          {/* List Konsultasi Menunggu Review (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Permintaan Validasi Terbaru
                </h4>
                <p className="text-xs text-slate-500">
                  Konsultasi AI mahasiswa yang memerlukan persetujuan Dosen Wali
                </p>
              </div>
              <Link
                href="/admin/validations"
                className="text-xs font-bold text-blue-900 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 transition flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Budi Santoso (2021080112)</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      Pending
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                    "Rekomendasi mata kuliah pilihan untuk mendukung karir MLOps di semester 6"
                  </p>
                </div>
                <Link
                  href="/admin/validations"
                  className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shrink-0 ml-3"
                >
                  Review
                </Link>
              </div>

              <div className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 transition flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Siti Rahma (2021080145)</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      Pending
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                    "Apakah boleh mengambil Skripsi bersamaan dengan Magang MBKM?"
                  </p>
                </div>
                <Link
                  href="/admin/validations"
                  className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shrink-0 ml-3"
                >
                  Review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
