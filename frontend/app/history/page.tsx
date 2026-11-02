"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { DUMMY_CONSULTATIONS, ConsultationHistoryItem } from "@/types/academic";
import { AIRecommendationCard } from "@/components/consultation/AIRecommendationCard";
import { 
  History, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  UserCheck, 
  X 
} from "lucide-react";

export default function HistoryPage() {
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationHistoryItem | null>(null);

  const getStatusBadge = (status: "PENDING" | "APPROVED" | "REVISED") => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Disetujui Dosen
          </span>
        );
      case "REVISED":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full">
            <AlertTriangle className="w-3.5 h-3.5" /> Perlu Revisi
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
            <Clock className="w-3.5 h-3.5" /> Menunggu Validasi
          </span>
        );
    }
  };

  return (
    <AppShell
      title="Riwayat Konsultasi Akademik"
      subtitle="Arsip sesi konsultasi AI dan status validasi resmi oleh Dosen Pembimbing Akademik"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Table List View */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-blue-900" />
              <h3 className="font-bold text-slate-800 text-sm">Daftar Sesi Konsultasi</h3>
            </div>
            <span className="text-xs text-slate-500">
              Menampilkan {DUMMY_CONSULTATIONS.length} sesi konsultasi
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {DUMMY_CONSULTATIONS.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedConsultation(item)}
                className="p-5 hover:bg-slate-50/80 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {item.id}
                    </span>
                    <span className="text-xs text-slate-400">• {item.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                    "{item.question}"
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {item.responsePreview}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {getStatusBadge(item.status)}
                  <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Modal / Drawer View */}
        {selectedConsultation && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="p-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-blue-200">
                    {selectedConsultation.id} • {selectedConsultation.date}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    Detail Riwayat Konsultasi
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedConsultation(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 flex-1">
                {/* Status Box */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-600">
                    Status Validasi Dosen:
                  </span>
                  {getStatusBadge(selectedConsultation.status)}
                </div>

                {/* Notes from Dosen */}
                {selectedConsultation.dosenNotes && (
                  <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-900 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-purple-900">
                      <UserCheck className="w-4 h-4 text-purple-700" />
                      <span>Catatan Dosen Wali ({selectedConsultation.dosenName}):</span>
                    </div>
                    <p className="leading-relaxed pl-5">
                      "{selectedConsultation.dosenNotes}"
                    </p>
                  </div>
                )}

                {/* Question */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Pertanyaan Mahasiswa:
                  </span>
                  <p className="text-sm font-semibold text-slate-800">
                    "{selectedConsultation.question}"
                  </p>
                </div>

                {/* AI Recommendations in History */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Rekomendasi yang Disimpan:
                  </span>
                  {selectedConsultation.recommendations.length > 0 ? (
                    selectedConsultation.recommendations.map((rec) => (
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
                    <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      Tidak ada kartu rekomendasi MK formal untuk sesi ini (sesi tanya-jawab umum arah karir).
                    </p>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedConsultation(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
