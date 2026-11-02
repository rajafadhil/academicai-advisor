"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, ShieldCheck, User, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"STUDENT" | "ADMIN">("STUDENT");
  const [identifier, setIdentifier] = useState("2021080112");
  const [password, setPassword] = useState("password123");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "STUDENT") {
      router.push("/dashboard");
    } else {
      router.push("/admin/dashboard");
    }
  };

  const handleRoleToggle = (selectedRole: "STUDENT" | "ADMIN") => {
    setRole(selectedRole);
    if (selectedRole === "STUDENT") {
      setIdentifier("2021080112");
    } else {
      setIdentifier("dr.ani@univ.ac.id");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#1e3a8a] to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header Branding */}
        <div className="bg-[#1e3a8a] p-8 text-center text-white relative">
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-3">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">AcademicAI Advisor</h1>
          <p className="text-blue-200 text-xs mt-1">
            Sistem Konsultasi & Perencanaan Studi Berbasis Explainable AI
          </p>

          <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] bg-blue-950/60 px-2.5 py-1 rounded-full text-emerald-300 border border-blue-700">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>AI Verified</span>
          </div>
        </div>

        {/* Role Tab Switcher */}
        <div className="p-6">
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => handleRoleToggle("STUDENT")}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition ${
                role === "STUDENT"
                  ? "bg-white text-blue-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Mahasiswa
            </button>
            <button
              type="button"
              onClick={() => handleRoleToggle("ADMIN")}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition ${
                role === "ADMIN"
                  ? "bg-white text-blue-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Dosen / Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                {role === "STUDENT" ? "NIM / Email Mahasiswa" : "NIP / Email Dosen"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={role === "STUDENT" ? "Contoh: 2021080112" : "Contoh: dr.ani@univ.ac.id"}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-900 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-900 focus:outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 bg-[#1e3a8a] hover:bg-blue-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:gap-3"
            >
              <span>Masuk sebagai {role === "STUDENT" ? "Mahasiswa (Budi)" : "Dosen (Dr. Ani)"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Demo Credentials: Sudah terisi otomatis. Klik tombol di atas untuk login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
