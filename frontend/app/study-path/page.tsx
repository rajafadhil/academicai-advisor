"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { StudyPathNode } from "@/components/study-path/StudyPathNode";
import { DUMMY_STUDENT, DUMMY_STUDY_PATH, CourseNode } from "@/types/academic";
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Circle, 
  Layers, 
  Filter, 
  Info 
} from "lucide-react";

export default function StudyPathPage() {
  const [selectedSemester, setSelectedSemester] = useState<number | "ALL">("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const semesters = [1, 2, 3, 4, 5, 6, 8];

  const filteredCourses = DUMMY_STUDY_PATH.filter((c) => {
    if (selectedSemester !== "ALL" && c.semester !== selectedSemester) return false;
    if (filterStatus !== "ALL" && c.status !== filterStatus) return false;
    return true;
  });

  const sksPercentage = Math.round((DUMMY_STUDENT.completedCredits / DUMMY_STUDENT.targetCredits) * 100);

  return (
    <AppShell
      title="Study Path & Pohon Kurikulum"
      subtitle="Visualisasi alur mata kuliah, prasyarat keilmuan, dan rekomendasi lintasan studi AI"
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Progress & Legend Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pencapaian Kurikulum
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {DUMMY_STUDENT.completedCredits} / {DUMMY_STUDENT.targetCredits} SKS Selesai ({sksPercentage}%)
              </h3>
            </div>

            {/* Color Coding Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>🟢 Lulus</span>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>🟡 Sedang Diambil</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-900 px-2.5 py-1 rounded-md border border-blue-200 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900" />
                <span>🔵 Rekomendasi AI</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span>⚪ Belum Diambil</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${sksPercentage}%` }}
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-600">Filter Semester:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedSemester("ALL")}
                className={`px-2.5 py-1 rounded-md transition ${
                  selectedSemester === "ALL"
                    ? "bg-blue-900 text-white font-bold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Semua
              </button>
              {semesters.map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSelectedSemester(sem)}
                  className={`px-2.5 py-1 rounded-md transition ${
                    selectedSemester === sem
                      ? "bg-blue-900 text-white font-bold"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Sem {sem}
                </button>
              ))}
            </div>
          </div>

          <div className="text-slate-400 text-[11px] flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            <span>Arahkan kursor (hover) pada node untuk melihat prasyarat & alasan rekomendasi AI</span>
          </div>
        </div>

        {/* Timeline / Semester Tree View */}
        <div className="space-y-6">
          {semesters
            .filter((sem) => selectedSemester === "ALL" || selectedSemester === sem)
            .map((sem) => {
              const semCourses = filteredCourses.filter((c) => c.semester === sem);
              if (semCourses.length === 0) return null;

              const totalSemCredits = semCourses.reduce((sum, c) => sum + c.credits, 0);

              return (
                <div key={sem} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-900 text-white font-bold flex items-center justify-center text-xs">
                        {sem}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800">
                        Semester {sem} {sem === 5 ? "(Semester Berjalan & Saran AI)" : ""}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 font-semibold">
                      Total: {totalSemCredits} SKS
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 items-start">
                    {semCourses.map((course) => (
                      <StudyPathNode
                        key={course.code}
                        code={course.code}
                        name={course.name}
                        credits={course.credits}
                        semester={course.semester}
                        status={course.status}
                        grade={course.grade}
                        prerequisites={course.prerequisites}
                        aiReason={course.aiReason}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </AppShell>
  );
}
