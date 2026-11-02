"use client";

import React from "react";
import { Navigation } from "./Navigation";
import { Bell, Search, Sparkles } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AppShell: React.FC<AppShellProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Nav */}
      <Navigation />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-none">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-500 text-xs w-64">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari mata kuliah, silabus, topik..."
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder-slate-400"
              />
            </div>

            <div className="relative cursor-pointer p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-slate-700 hidden md:inline">
                AI Engine: Active (v2.4)
              </span>
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
