import "./globals.css";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AcademicAI Advisor - Sistem Perencanaan Studi & Konsultasi Akademik Cerdas",
  description: "Asisten cerdas akademik berbasis Explainable AI untuk rekomendasi mata kuliah dan pemantauan jalur studi mahasiswa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
