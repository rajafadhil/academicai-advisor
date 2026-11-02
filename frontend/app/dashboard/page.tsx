"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/shared/AppShell";
import { 
  DUMMY_STUDENT, 
  DUMMY_RECOMMENDATIONS 
} from "@/types/academic";
import { 
  Sparkles, 
  Network, 
  Sliders, 
  MessageSquare, 
  Award, 
  BookOpen, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  UserCheck
} from "lucide-react";

export default function DashboardPage() {
  const [careerInterest, setCareerInterest] = useState(DUMMY_STUDENT.careerInterest);
  const [targetCredits, setTargetCredits] = useState(20);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const sksPercentage = Math.round((DUMMY_STUDENT.completedCredits / DUMMY_STUDENT.targetCredits) * 100);

  return (
    <AppShell 
      title="Dashboard Akademik Mahasiswa" 
      subtitle={`Selamat datang kembali, ${DUMMY_STUDENT.name} (${DUMMY_STUDENT.nim})`}
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                IPK Kumulatif
              </span>
              <div className="text-2xl font-extrabold text-blue-900 mt-1">
                {DUMMY_STUDENT.gpa.toFixed(2)}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> Sangat Memuaskan (Cum Laude Track)
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Semester Aktif
              </span>
              <div className="text-2xl font-extrabold text-slate-800 mt-1">
                Semester {DUMMY_STUDENT.currentSemester}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Tahun Ajaran 2026/2027 Ganjil
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Progress Kelulusan SKS
              </span>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1">
                {DUMMY_STUDENT.completedCredits}{" "}
                <span className="text-sm font-normal text-slate-400">
                  / {DUMMY_STUDENT.targetCredits} SKS
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${sksPercentage}%` }}
                />
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Dosen Pembimbing
              </span>
              <div className="text-sm font-bold text-slate-800 mt-1 leading-snug">
                {DUMMY_STUDENT.dosenWali}
              </div>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" /> Status Bimbingan Aktif
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Feature Entry Point Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link 
            href="/consultation" 
            className="group bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition">
              <MessageSquare className="w-32 h-32" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Core Feature
            </span>
            <h3 className="text-xl font-bold mt-1 text-white">Konsultasi AI</h3>
            <p className="text-blue-100 text-xs mt-2 leading-relaxed">
              Tanyakan rekomendasi mata kuliah berbasis AI dengan analisis prasyarat otomatis dan alasan transparan.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-emerald-300">
              <span>Mulai Konsultasi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link 
            href="/study-path" 
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-4">
              <Network className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Peta Kurikulum
            </span>
            <h3 className="text-xl font-bold mt-1 text-slate-900">Study Path Graph</h3>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              Visualisasi pohon mata kuliah interaktif dengan color coding lulus, berjalan, dan rekomendasi AI.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-blue-900">
              <span>Buka Study Path</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link 
            href="/simulation" 
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Sliders className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              What-if Analysis
            </span>
            <h3 className="text-xl font-bold mt-1 text-slate-900">Simulasi Rencana Studi</h3>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              Uji coba skenario pengambilan mata kuliah pilihan dan lihat dampaknya secara langsung tanpa risiko.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-emerald-600">
              <span>Jalankan Simulasi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Section UC-02: Form Profil Akademik & Minat Karir */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Profil Preferensi Akademik & Minat Karir
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                AI menggunakan informasi ini untuk memberikan rekomendasi mata kuliah yang personal dan relevan.
              </p>
            </div>
            {isSaved && (
              <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Minat Karir & Bidang Spesialisasi
              </label>
              <input
                type="text"
                value={careerInterest}
                onChange={(e) => setCareerInterest(e.target.value)}
                placeholder="Contoh: AI Researcher, MLOps, Fullstack Engineer"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-900 focus:outline-none transition"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">
                AI akan melakukan semantic matching pada silabus MK yang relevan dengan kata kunci ini.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Target SKS Semester 5
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={12}
                  max={24}
                  value={targetCredits}
                  onChange={(e) => setTargetCredits(Number(e.target.value))}
                  className="w-32 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-900 focus:outline-none transition font-bold text-center"
                />
                <span className="text-xs text-slate-500">
                  SKS (Maksimal diperbolehkan: <strong>24 SKS</strong> berdasarkan IPK {DUMMY_STUDENT.gpa})
                </span>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow transition"
              >
                Simpan Perubahan Profil
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
