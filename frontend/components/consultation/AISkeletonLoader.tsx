"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export const AISkeletonLoader: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-xl border border-blue-200/60 p-5 shadow-sm space-y-4 animate-pulse">
      <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 mb-1">
        <Sparkles className="w-4 h-4 text-blue-900 animate-spin" />
        <span>AcademicAI sedang menganalisis kurikulum & transkrip...</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-200" />
          <div className="space-y-1.5">
            <div className="w-24 h-3 bg-slate-200 rounded" />
            <div className="w-48 h-4 bg-slate-300 rounded" />
          </div>
        </div>
        <div className="w-28 h-7 bg-slate-200 rounded-full" />
      </div>

      <div className="space-y-2 pt-2">
        <div className="w-36 h-3 bg-slate-200 rounded" />
        <div className="w-full h-8 bg-slate-100 rounded-lg" />
        <div className="w-4/5 h-8 bg-slate-100 rounded-lg" />
      </div>

      <div className="w-full h-6 bg-slate-100 rounded" />
    </div>
  );
};
