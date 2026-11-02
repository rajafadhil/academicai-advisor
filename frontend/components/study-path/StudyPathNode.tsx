"use client";

import React, { useState } from "react";
import { Check, Clock, Sparkles, Circle } from "lucide-react";
import { NodeStatus } from "@/types/academic";

export interface StudyPathNodeProps {
  code: string;
  name: string;
  credits: number;
  semester: number;
  status: NodeStatus;
  grade?: string;
  prerequisites: string[];
  aiReason?: string;
  onClick?: (code: string) => void;
}

export const StudyPathNode: React.FC<StudyPathNodeProps> = ({
  code,
  name,
  credits,
  semester,
  status,
  grade,
  prerequisites,
  aiReason,
  onClick,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const statusStyles: Record<
    NodeStatus,
    {
      cardBg: string;
      borderColor: string;
      badgeBg: string;
      badgeText: string;
      icon: React.ReactNode;
    }
  > = {
    COMPLETED: {
      cardBg: "bg-emerald-50/70 hover:bg-emerald-50",
      borderColor: "border-emerald-500 ring-emerald-500/20",
      badgeBg: "bg-emerald-600 text-white",
      badgeText: "Lulus",
      icon: <Check className="w-3 h-3 stroke-[3]" />,
    },
    CURRENT: {
      cardBg: "bg-amber-50/80 hover:bg-amber-50",
      borderColor: "border-amber-400 ring-amber-400/20",
      badgeBg: "bg-amber-500 text-white",
      badgeText: "Sedang Diambil",
      icon: <Clock className="w-3 h-3" />,
    },
    RECOMMENDED: {
      cardBg: "bg-blue-50/90 hover:bg-blue-50",
      borderColor: "border-blue-900 ring-blue-900/30 ring-2",
      badgeBg: "bg-blue-900 text-white",
      badgeText: "Saran AI",
      icon: <Sparkles className="w-3 h-3 text-amber-300" />,
    },
    UNTAKEN: {
      cardBg: "bg-white hover:bg-slate-50",
      borderColor: "border-slate-300 ring-slate-200",
      badgeBg: "bg-slate-200 text-slate-700",
      badgeText: "Belum",
      icon: <Circle className="w-3 h-3 fill-slate-300 text-transparent" />,
    },
  };

  const currentTheme = statusStyles[status];

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Node Card */}
      <div
        onClick={() => onClick && onClick(code)}
        className={`w-48 sm:w-56 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 ${currentTheme.cardBg} ${currentTheme.borderColor}`}
      >
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <span className="text-[11px] font-mono font-bold text-slate-500">
            {code}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${currentTheme.badgeBg}`}
          >
            {currentTheme.icon}
            {currentTheme.badgeText}
          </span>
        </div>

        <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug mb-2">
          {name}
        </h4>

        <div className="flex items-center justify-between text-[11px] text-slate-600 border-t border-black/5 pt-1.5">
          <span>{credits} SKS • Sem {semester}</span>
          {grade && (
            <span className="font-extrabold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
              Nilai: {grade}
            </span>
          )}
        </div>
      </div>

      {/* Popover Hover Detail */}
      {showTooltip && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-slate-900 text-white rounded-lg shadow-xl text-xs space-y-2 pointer-events-none">
          <div className="flex items-start justify-between border-b border-slate-700 pb-1.5">
            <span className="font-bold text-slate-100">{name}</span>
            <span className="text-slate-400 font-mono text-[10px]">{code}</span>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] uppercase font-semibold">
              Mata Kuliah Prasyarat:
            </span>
            <p className="text-slate-200 mt-0.5 font-medium">
              {prerequisites.length > 0 ? prerequisites.join(", ") : "Tidak ada"}
            </p>
          </div>

          {status === "RECOMMENDED" && aiReason && (
            <div className="bg-blue-950/80 p-2 rounded border border-blue-700 text-blue-200">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Rekomendasi AI:
              </span>
              <p className="mt-0.5 text-[11px]">{aiReason}</p>
            </div>
          )}

          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
};
