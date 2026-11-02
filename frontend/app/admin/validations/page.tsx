"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { DUMMY_CONSULTATIONS, ConsultationHistoryItem } from "@/types/academic";
import { AIRecommendationCard } from "@/components/consultation/AIRecommendationCard";
import { 
  ClipboardCheck, 
  Check, 
  Edit3, 
  X, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Sparkles,
  MessageSquare
} from "lucide-react";

export default function AdminValidationsPage() {
  const [consultations, setConsultations] = useState<ConsultationHistoryItem[]>(DUMMY_CONSULTATIONS);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [activeItem, setActiveItem] = useState<ConsultationHistoryItem | null>(null);

  // Revision state
  const [showRevisionInput, setShowRevisionInput] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const filteredItems = consultations.filter((item) => {
    if (filterStatus === "ALL") return true;
    return item.status === filterStatus;
  });

  const handleApprove = (id: string) => {
    setConsultations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "APPROVED", dosenNotes: "Disetujui tanpa revisi oleh Dr. Ani, M.Kom." } : c
      )
    );
    setActionSuccess(`Konsultasi ${id} berhasil disetujui!`);
    setActiveItem(null);
    setShowRevisionInput(false);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleRevise = (id: string) => {
    if (!revisionNotes.trim()) return;

    setConsultations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "REVISED",
              dosenNotes: revisionNotes,
              dosenName: "Dr. Ani, M.Kom",
            }
          : c
      )
    );
    setActionSuccess(`Catatan revisi untuk ${id} berhasil dikirim ke mahasiswa.`);
    setActiveItem(null);
    setShowRevisionInput(false);
    setRevisionNotes("");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <AppShell
      title="Validasi Rekomendasi AI"
      subtitle="Verifikasi dan berikan masukan kurikulum terhadap saran yang dihasilkan oleh AI untuk mahasiswa"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {actionSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">Filter Status:</span>
            <div className="flex items-center gap-1 text-xs">
              {["ALL", "PENDING", "APPROVED", "REVISED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg transition font-medium ${
                    filterStatus === status
                      ? "bg-blue-900 text-white font-bold"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {status === "ALL" ? "Semua" : status}
                </button>
              ))}
            </div>
          </div>

          <span className="text-xs text-slate-400">
            Total {filteredItems.length} sesi konsultasi ditemukan
          </span>
        </div>

        {/* Table of Consultations */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-5 hover:bg-slate-50 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">{item.id}</span>
                    <span className="text-xs text-slate-400">• {item.date}</span>
                    <span className="text-xs font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                      Budi Santoso (2021080112)
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    "{item.question}"
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {item.responsePreview}
                  </p>
                  {item.dosenNotes && (
                    <p className="text-[11px] text-purple-700 italic mt-1">
                      Catatan Dosen: "{item.dosenNotes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      item.status === "APPROVED"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : item.status === "REVISED"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {item.status}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveItem(item);
                      setShowRevisionInput(false);
                      setRevisionNotes(item.dosenNotes || "");
                    }}
                    className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs transition"
                  >
                    Periksa & Validasi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Validasi Detail */}
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              {/* Header */}
              <div className="p-5 bg-[#1e3a8a] text-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-blue-200">
                    {activeItem.id} • Mahasiswa: Budi Santoso (2021080112)
                  </span>
                  <h3 className="text-base font-bold mt-0.5">
                    Validasi Rekomendasi Akademik
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-5 flex-1">
                {/* Question */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Pertanyaan Mahasiswa:
                  </span>
                  <p className="text-sm font-semibold text-slate-800">
                    "{activeItem.question}"
                  </p>
                </div>

                {/* AI Recommendations with Explainability */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-3">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Rekomendasi AI yang Diajukan:</span>
                  </div>

                  {activeItem.recommendations && activeItem.recommendations.length > 0 ? (
                    activeItem.recommendations.map((rec) => (
                      <AIRecommendationCard
                        key={rec.courseCode}
                        courseCode={rec.courseCode}
                        courseName={rec.courseName}
                        credits={rec.credits}
                        semester={rec.semester}
                        confidenceScore={rec.confidenceScore}
                        reasons={rec.reasons}
                        careerBenefit={rec.careerBenefit}
                        prerequisites={rec.prerequisites}
                        syllabusSnippet={rec.syllabusSnippet}
                      />
                    ))
                  ) : (
                    <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 italic border border-slate-200">
                      Tidak ada rekomendasi MK formal pada pertanyaan ini.
                    </div>
                  )}
                </div>

                {/* Textarea Catatan Revisi */}
                {showRevisionInput && (
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2 animate-in fade-in">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                      Tulis Catatan Revisi untuk Mahasiswa:
                    </label>
                    <textarea
                      rows={3}
                      value={revisionNotes}
                      onChange={(e) => setRevisionNotes(e.target.value)}
                      placeholder="Contoh: Disarankan mengambil TI301 terlebih dahulu karena beban SKS semester ini sudah mencapai 20 SKS..."
                      className="w-full p-3 bg-white border border-amber-300 rounded-lg text-xs outline-none focus:border-amber-600 transition"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowRevisionInput(false)}
                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRevise(activeItem.id)}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs"
                      >
                        Kirim Catatan Revisi
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Keputusan Dosen bersifat final dan langsung ternotifikasi ke Mahasiswa.
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRevisionInput(true)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Revisi Rekomendasi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprove(activeItem.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve (Setujui)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
