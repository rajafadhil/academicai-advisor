"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  X, 
  Sparkles, 
  CheckCircle2, 
  FileText 
} from "lucide-react";

interface CourseRow {
  code: string;
  name: string;
  credits: number;
  semester: number;
  category: "Wajib Prodi" | "Pilihan Peminatan" | "Wajib Universitas";
  description: string;
  syllabus: string;
}

export default function AdminCurriculumPage() {
  const [courses, setCourses] = useState<CourseRow[]>([
    {
      code: "TI301",
      name: "Machine Learning",
      credits: 3,
      semester: 5,
      category: "Pilihan Peminatan",
      description: "Mata kuliah dasar pembelajaran mesin menggunakan metode terawasi dan tak terawasi.",
      syllabus: "Regression, Classification, Support Vector Machines, Decision Trees, K-Means, Neural Networks dasar.",
    },
    {
      code: "TI305",
      name: "Pemrosesan Bahasa Alami",
      credits: 3,
      semester: 5,
      category: "Pilihan Peminatan",
      description: "Prinsip pemodelan bahasa alami, ekstraksi informasi, dan pemodelan sekuens.",
      syllabus: "Tokenisasi, N-Gram, Word Embeddings, RNN, LSTM, Attention Mechanism, Transformer BERT.",
    },
    {
      code: "TI201",
      name: "Struktur Data & Algoritma",
      credits: 4,
      semester: 2,
      category: "Wajib Prodi",
      description: "Konsep dasar struktur penyimpanan data dan efisiensi algoritma komputasi.",
      syllabus: "Array, Linked List, Stack, Queue, Tree, Graph, Sorting, Searching, Big-O Notation.",
    },
    {
      code: "TI204",
      name: "Basis Data Relasional",
      credits: 4,
      semester: 3,
      category: "Wajib Prodi",
      description: "Perancangan model data relasional dan implementasi SQL.",
      syllabus: "ERD, Normalisasi 1NF-BCNF, SQL DDL/DML, Indexing, Transaksi ACID.",
    },
    {
      code: "TI401",
      name: "Deep Learning & Vision",
      credits: 3,
      semester: 6,
      category: "Pilihan Peminatan",
      description: "Arsitektur jaringan saraf tiruan dalam untuk pemrosesan citra digital.",
      syllabus: "CNN, ResNet, YOLO Object Detection, Image Segmentation, GAN, PyTorch.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<CourseRow>({
    code: "",
    name: "",
    credits: 3,
    semester: 5,
    category: "Pilihan Peminatan",
    description: "",
    syllabus: "",
  });

  const filteredCourses = courses.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.name) return;

    setCourses((prev) => [formData, ...prev]);
    setIsModalOpen(false);
    setSuccessToast(`Mata kuliah ${formData.code} berhasil ditambahkan dan siap di-embedding AI!`);
    setFormData({
      code: "",
      name: "",
      credits: 3,
      semester: 5,
      category: "Pilihan Peminatan",
      description: "",
      syllabus: "",
    });
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleDelete = (code: string) => {
    if (confirm(`Yakin ingin menghapus mata kuliah ${code}?`)) {
      setCourses((prev) => prev.filter((c) => c.code !== code));
    }
  };

  return (
    <AppShell
      title="Manajemen Kurikulum & Embedding AI"
      subtitle="Kelola silabus dan deskripsi mata kuliah yang menjadi basis pengetahuan (knowledge base) AI"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {successToast && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Action Header & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan kode, nama, atau kategori..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-900 focus:bg-white transition"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Mata Kuliah Baru</span>
          </button>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Kode</th>
                  <th className="px-5 py-3.5">Nama Mata Kuliah</th>
                  <th className="px-5 py-3.5">SKS</th>
                  <th className="px-5 py-3.5">Semester Ideal</th>
                  <th className="px-5 py-3.5">Kategori</th>
                  <th className="px-5 py-3.5">Status Vektor AI</th>
                  <th className="px-5 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCourses.map((c) => (
                  <tr key={c.code} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-4 font-mono font-bold text-blue-900">
                      {c.code}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {c.description}
                      </p>
                    </td>
                    <td className="px-5 py-4 font-semibold">{c.credits} SKS</td>
                    <td className="px-5 py-4">Semester {c.semester}</td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                        {c.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        Embedded (pgvector)
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => alert(`Edit silabus untuk ${c.name}`)}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(c.code)}
                          className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Tambah MK dengan Field Silabus & Deskripsi */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
              <div className="p-5 bg-[#1e3a8a] text-white flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold">Tambah Mata Kuliah Baru</h3>
                  <p className="text-xs text-blue-200 mt-0.5">
                    Field silabus dan deskripsi akan otomatis dikonversi menjadi embedding vektor untuk AI Advisor.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCourse} className="p-6 overflow-y-auto space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Kode Mata Kuliah
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: TI310"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:border-blue-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Nama Mata Kuliah
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Cloud Computing Architecture"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-900 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Beban SKS
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={formData.credits}
                      onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-900 outline-none text-center font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Semester Ideal
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={8}
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-900 outline-none text-center font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Kategori
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-900 outline-none"
                    >
                      <option value="Wajib Prodi">Wajib Prodi</option>
                      <option value="Pilihan Peminatan">Pilihan Peminatan</option>
                      <option value="Wajib Universitas">Wajib Universitas</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Deskripsi Ringkas (Untuk Semantic Search)
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Jelaskan tujuan umum mata kuliah ini..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-900 outline-none"
                  />
                </div>

                <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200/80">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold mb-1">
                    <FileText className="w-4 h-4" />
                    <span>Silabus Lengkap (Vector Embedding Corpus)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Masukkan topik mingguan, kompetensi, dan teknologi yang dipelajari. Teks ini akan di-chunk dan di-embedding oleh model AI.
                  </p>
                  <textarea
                    rows={4}
                    required
                    placeholder="Contoh: Minggu 1: Dasar Virtualisasi, Minggu 2: Containerization (Docker), Minggu 3: Kubernetes, CI/CD Pipeline..."
                    value={formData.syllabus}
                    onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                    className="w-full p-2.5 bg-white border border-blue-200 rounded-lg focus:border-blue-900 outline-none text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg shadow-sm transition flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Simpan & Buat Embedding</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
