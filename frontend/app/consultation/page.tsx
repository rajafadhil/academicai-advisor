"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { AIRecommendationCard } from "@/components/consultation/AIRecommendationCard";
import { AISkeletonLoader } from "@/components/consultation/AISkeletonLoader";
import { DUMMY_STUDENT, DUMMY_RECOMMENDATIONS, RecommendationItem } from "@/types/academic";
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  Bot, 
  User, 
  HelpCircle, 
  Info, 
  CheckCircle2 
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  recommendations?: RecommendationItem[];
  studyPathImpact?: string;
  timestamp: string;
}

export default function ConsultationPage() {
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "assistant",
      text: `Halo ${DUMMY_STUDENT.name}! Saya AcademicAI Advisor Anda. Berdasarkan data akademik Anda (IPK ${DUMMY_STUDENT.gpa}, minat: "${DUMMY_STUDENT.careerInterest}"), silakan tanyakan rencana pengambilan mata kuliah atau jalur spesialisasi Anda untuk semester 5 ke depan.`,
      timestamp: "14:30",
    },
  ]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim().length < 10) {
      setValidationError("Pertanyaan minimal 10 karakter agar AI dapat memberikan analisis akurat.");
      return;
    }

    setValidationError(null);
    const userText = inputQuery;
    setInputQuery("");

    // Add user message
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Simulate AI LLM inference + RAG response
    setTimeout(() => {
      const aiReply: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "assistant",
        text: `Berdasarkan evaluasi terhadap riwayat kelulusan mata kuliah dan preferensi karir Anda, berikut rekomendasi mata kuliah yang paling optimal untuk diambil:`,
        recommendations: DUMMY_RECOMMENDATIONS,
        studyPathImpact: "Mengambil rekomendasi di atas akan membuka prasyarat untuk 'Deep Learning & Vision' (TI401) di semester 6.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "msg-init",
        sender: "assistant",
        text: `Sesi percakapan baru dimulai. Konteks riwayat sebelumnya telah direset. Apa yang ingin Anda diskusikan untuk semester ini?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputQuery(prompt);
  };

  return (
    <AppShell
      title="Konsultasi Akademik AI"
      subtitle="Dialog cerdas perencanaan studi dengan prinsip Explainable AI (XAI)"
    >
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)]">
        {/* Header Action Bar */}
        <div className="bg-white p-3 px-4 rounded-xl border border-slate-200 mb-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Konteks Mahasiswa: <strong>{DUMMY_STUDENT.name}</strong> • Minat: {DUMMY_STUDENT.careerInterest}</span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Percakapan Baru</span>
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto space-y-5 p-2 pr-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "assistant" && (
                <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-xs ${
                  msg.sender === "user"
                    ? "bg-[#1e3a8a] text-white rounded-tr-xs"
                    : "bg-white text-slate-800 border border-slate-200 rounded-tl-xs"
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      msg.sender === "user" ? "text-blue-200" : "text-blue-900"
                    }`}
                  >
                    {msg.sender === "user" ? "Pertanyaan Anda" : "AcademicAI Advisor"}
                  </span>
                  <span
                    className={`text-[10px] ${
                      msg.sender === "user" ? "text-blue-300" : "text-slate-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {/* Text Content */}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {/* AI Recommendations Cards (Explainability Core) */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Rekomendasi Terpilih (Explainable AI):</span>
                    </div>

                    {msg.recommendations.map((rec) => (
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
                        onSimulate={(code) => {
                          window.location.href = `/simulation?course=${code}`;
                        }}
                      />
                    ))}

                    {msg.studyPathImpact && (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Dampak Pada Jalur Kelulusan:</strong> {msg.studyPathImpact}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="w-full max-w-[85%]">
                <AISkeletonLoader />
              </div>
            </div>
          )}
        </div>

        {/* Input Area with 10-char Validation */}
        <div className="pt-3">
          {/* Quick Prompts */}
          <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-1 text-xs text-slate-600">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0">Contoh Cepat:</span>
            <button
              type="button"
              onClick={() => handleQuickPrompt("Apakah saya bisa ambil Machine Learning dan NLP semester ini?")}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shrink-0 text-slate-700 transition"
            >
              Ambil ML & NLP di Semester 5?
            </button>
            <button
              type="button"
              onClick={() => handleQuickPrompt("Rekomendasi mata kuliah pilihan untuk karir Data Engineer")}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shrink-0 text-slate-700 transition"
            >
              Mata kuliah untuk Data Engineer
            </button>
          </div>

          <form onSubmit={handleSendMessage} className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-md">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => {
                  setInputQuery(e.target.value);
                  if (validationError && e.target.value.length >= 10) {
                    setValidationError(null);
                  }
                }}
                placeholder="Tuliskan pertanyaan atau rencana akademik Anda (minimal 10 karakter)..."
                className="flex-1 px-3 py-2 text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-xs"
              >
                <span>Kirim</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {validationError && (
              <div className="px-3 pt-2 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>{validationError}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </AppShell>
  );
}
