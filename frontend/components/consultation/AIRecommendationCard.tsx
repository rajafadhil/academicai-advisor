"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  PlayCircle 
} from "lucide-react";
import { Prerequisite } from "@/types/academic";

export interface RecommendationProps {
  courseCode: string;
  courseName: string;
  credits: number;
  semester: number;
  confidenceScore: number; // 0 - 100
  reasons: string[];       // Minimal 2 alasan spesifik
  careerBenefit: string;   // Prospek karir
  prerequisites: Prerequisite[];
  syllabusSnippet?: string;
  onSimulate?: (courseCode: string) => void;
}

export const AIRecommendationCard: React.FC<RecommendationProps> = ({
  courseCode,
  courseName,
  credits,
  semester,
  confidenceScore,
  reasons,
  careerBenefit,
  prerequisites,
  syllabusSnippet,
  onSimulate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const allPrerequisitesMet = prerequisites.length === 0 || prerequisites.every((p) => p.isFulfilled);

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden mb-4">
      {/* Header Card: Identitas MK & Confidence Badge */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-900/10 flex items-center justify-center text-blue-900 font-bold text-sm tracking-wide">
            {credits} SKS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                {courseCode} • Semester {semester}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                AI Match
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {courseName}
            </h4>
          </div>
        </div>

        {/* Confidence Score Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span className="text-xs font-medium text-emerald-800">
            Kesesuaian:{" "}
            <strong className="text-emerald-700 font-bold">
              {confidenceScore}%
            </strong>
          </span>
        </div>
      </div>

      {/* Body: Explainability First */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Alasan Spesifik Rekomendasi AI */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Mengapa AI Merekomendasikan Ini?
          </h5>
          <ul className="space-y-2">
            {reasons.map((reason, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-2 shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Manfaat Karir */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-lg">
          <Briefcase className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong className="text-slate-800">Relevansi Karir:</strong>{" "}
            {careerBenefit}
          </span>
        </div>

        {/* Status Prasyarat (Explicit Display) */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pemeriksaan Prasyarat
            </span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                allPrerequisitesMet
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-rose-100 text-rose-800"
              }`}
            >
              {allPrerequisitesMet ? "Lengkap & Siap Ambil" : "Ada Syarat Belum Lulus"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {prerequisites.length === 0 ? (
              <span className="text-xs text-slate-500 italic">Tidak ada mata kuliah prasyarat</span>
            ) : (
              prerequisites.map((prereq) => (
                <div
                  key={prereq.code}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border font-medium ${
                    prereq.isFulfilled
                      ? "bg-emerald-50/60 border-emerald-200 text-emerald-700"
                      : "bg-rose-50/60 border-rose-200 text-rose-700"
                  }`}
                >
                  {prereq.isFulfilled ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  )}
                  <span>
                    {prereq.code} - {prereq.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Progressive Disclosure: Silabus */}
        {syllabusSnippet && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-medium text-blue-900 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isExpanded ? "Sembunyikan Silabus" : "Lihat Silabus Singkat"}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {isExpanded && (
              <div className="mt-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 leading-relaxed border border-slate-200">
                <p className="font-semibold text-slate-800 mb-1">Cakupan Materi Pokok:</p>
                {syllabusSnippet}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Action Card */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Diverifikasi dengan Silabus Prodi
        </span>
        <button
          type="button"
          onClick={() => onSimulate && onSimulate(courseCode)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors shadow-sm"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          Simulasikan di Study Path
        </button>
      </div>
    </div>
  );
};
