"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { StudyPathNode } from "@/components/study-path/StudyPathNode";
import { DUMMY_STUDENT, DUMMY_STUDY_PATH, CourseNode } from "@/types/academic";
import { 
  Sliders, 
  RotateCcw, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Eye
} from "lucide-react";

export default function SimulationPage() {
  const [coursesState, setCoursesState] = useState<CourseNode[]>(DUMMY_STUDY_PATH);
  const [simulatedCourseCode, setSimulatedCourseCode] = useState<string>("TI301");

  // Selectable courses for simulation (courses that are not COMPLETED)
  const availableChoices = [
    { code: "TI301", name: "Machine Learning (3 SKS)", targetUnlock: "TI401 (Deep Learning & Vision)" },
    { code: "TI305", name: "Pemrosesan Bahasa Alami (3 SKS)", targetUnlock: "TI499 (Tugas Akhir NLP Track)" },
    { code: "TI401", name: "Deep Learning & Vision (3 SKS)", targetUnlock: "Spesialisasi Computer Vision" },
    { code: "TI402", name: "Big Data Analytics (3 SKS)", targetUnlock: "Spesialisasi Data Engineer" },
  ];

  const handleSimulate = (code: string) => {
    setSimulatedCourseCode(code);
    setCoursesState((prev) =>
      prev.map((c) => {
        if (c.code === code) {
          return { ...c, status: "RECOMMENDED", aiReason: "Sedang diuji dalam skenario simulasi What-if." };
        }
        return c;
      })
    );
  };

  const handleReset = () => {
    setSimulatedCourseCode("");
    setCoursesState(DUMMY_STUDY_PATH);
  };

  const activeSimulation = availableChoices.find((c) => c.code === simulatedCourseCode);

  return (
    <AppShell
      title="Simulasi What-if (Uji Skenario Studi)"
      subtitle="Eksplorasi dampak pengambilan mata kuliah tanpa mengubah data permanen akademik"
    >
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Banner Alert Preview Only */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Mode Simulasi Aktif:</strong> Perubahan di halaman ini hanya bersifat kalkulasi simulasi sementara (preview state). Data tidak akan disimpan ke transkrip riil.
            </span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-amber-800 font-bold transition shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Simulasi
          </button>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sisi Kiri: Form & Kontrol Simulasi (4 Cols) */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-1">
                <Sliders className="w-4 h-4" />
                <span>Pilih Mata Kuliah untuk Diuji</span>
              </div>
              <p className="text-xs text-slate-500">
                Pilih mata kuliah pilihan di bawah untuk melihat efek pemenuhan prasyarat pada semester lanjutan.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Daftar Mata Kuliah Pilihan:
              </label>
              <select
                value={simulatedCourseCode}
                onChange={(e) => handleSimulate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:border-blue-900 focus:outline-none transition"
              >
                <option value="">-- Pilih Mata Kuliah --</option>
                {availableChoices.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code} - {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Impact Calculation Card */}
            {activeSimulation ? (
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Dampak Skenario:</span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Total SKS Lulus:</strong> Bertambah menjadi{" "}
                      <span className="text-blue-900 font-bold">
                        {DUMMY_STUDENT.completedCredits + 3} SKS
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-blue-100">
                    <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Membuka Prasyarat:</strong> MK{" "}
                      <span className="font-bold text-slate-900">
                        {activeSimulation.targetUnlock}
                      </span>{" "}
                      akan otomatis dapat diambil pada semester berikutnya.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                Pilih mata kuliah di atas untuk melihat simulasi dampak.
              </div>
            )}

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 block text-center">
                Simulasi ini menggunakan model graf ketergantungan kurikulum prodi.
              </span>
            </div>
          </div>

          {/* Sisi Kanan: Preview Study Path (8 Cols) */}
          <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Preview Study Path (Semester 5 & 6)
                </h4>
                <p className="text-xs text-slate-500">
                  Node dengan warna biru berpendar menunjukkan mata kuliah yang sedang disimulasikan.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-900 rounded-lg">
                Live Preview
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Semester 5:
                </span>
                <div className="flex flex-wrap gap-3">
                  {coursesState
                    .filter((c) => c.semester === 5)
                    .map((c) => (
                      <StudyPathNode
                        key={c.code}
                        code={c.code}
                        name={c.name}
                        credits={c.credits}
                        semester={c.semester}
                        status={c.code === simulatedCourseCode ? "RECOMMENDED" : c.status}
                        prerequisites={c.prerequisites}
                        aiReason={c.code === simulatedCourseCode ? "Mata kuliah yang disimulasikan" : c.aiReason}
                      />
                    ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Semester 6 (Dampak Terbuka):
                </span>
                <div className="flex flex-wrap gap-3">
                  {coursesState
                    .filter((c) => c.semester === 6)
                    .map((c) => (
                      <StudyPathNode
                        key={c.code}
                        code={c.code}
                        name={c.name}
                        credits={c.credits}
                        semester={c.semester}
                        status={
                          simulatedCourseCode === "TI301" && c.code === "TI401"
                            ? "RECOMMENDED"
                            : c.status
                        }
                        prerequisites={c.prerequisites}
                        aiReason={
                          simulatedCourseCode === "TI301" && c.code === "TI401"
                            ? "Prasyarat TI301 kini terpenuhi pada simulasi ini!"
                            : undefined
                        }
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
