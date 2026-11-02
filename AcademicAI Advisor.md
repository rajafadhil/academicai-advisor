# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# AI Academic Advisory System dengan Curriculum RAG & Personalized Study Path

---

**Versi Dokumen:** 1.0
**Tanggal Penyusunan:** 2 November 2026
**Status:** Draft Final untuk UAS Sistem Informasi
**Mata Kuliah:** Sistem Informasi | Program Studi: S1 Teknologi Informasi
**Bentuk Penilaian:** Proyek Berkelompok

**Disusun oleh:**
1. [Nama Anggota 1] – [NIM] – [Peran: Project Leader / Backend & AI Engineer]
2. [Nama Anggota 2] – [NIM] – [Peran: Frontend Developer]
3. [Nama Anggota 3] – [NIM] – [Peran: Database & UI/UX Designer]

**Kelas:** [Kelas]
**Dosen Pengampu:** [Nama Dosen]
**Program Studi Teknologi Informasi – [Nama Perguruan Tinggi]**
**Tahun Akademik 2026/2027**

---

## DAFTAR ISI

1. Ringkasan Eksekutif
2. Latar Belakang & Permasalahan
3. Tujuan & Sasaran Proyek
4. Persona Pengguna
5. Ruang Lingkup & Batasan
6. Kebutuhan Fungsional (FR)
7. Kebutuhan Non-Fungsional (NFR)
8. User Stories
9. Arsitektur Teknis
10. Model Data & Perancangan Database
11. Integrasi AI / LLM (RAG Pipeline)
12. Alur Proses Utama
13. Desain Antarmuka
14. Skenario Pengujian
15. Timeline 30 Hari
16. Metrik Kesuksesan
17. Risiko & Mitigasi
18. Deliverables
19. Keputusan Desain Penting
20. Kriteria Penerimaan (Definition of Done)
21. Referensi & Pustaka

---

## 1. RINGKASAN EKSEKUTIF

**Nama Produk:** AcademicAI Advisor
**Jenis Produk:** Sistem Informasi Akademik berbasis Web dengan integrasi AI (LLM + RAG)
**Studi Kasus:** Simulasi layanan konsultasi akademik di Program Studi Teknologi Informasi

AcademicAI Advisor adalah prototipe sistem informasi konsultasi akademik yang memanfaatkan teknologi Retrieval-Augmented Generation (RAG) untuk memberikan rekomendasi mata kuliah yang personal, dapat dijelaskan (explainable), dan kontekstual berdasarkan kurikulum resmi, prasyarat, silabus, serta profil akademik mahasiswa.

Sistem ini menyediakan:
- Chat interface untuk konsultasi akademik dengan AI
- Rekomendasi mata kuliah beserta alasan eksplisit (Explainable AI)
- Visualisasi Study Path interaktif
- Simulasi "What-if" untuk eksplorasi kombinasi mata kuliah
- Dashboard admin untuk validasi rekomendasi oleh dosen wali

**Masalah yang Diselesaikan:**
Proses konsultasi akademik saat ini dilakukan manual, tidak konsisten antar dosen wali, tidak ada validasi prasyarat otomatis, dan tidak ada visualisasi progress studi mahasiswa.

**Solusi:**
Sistem informasi berbasis web dengan AI RAG yang mengakses knowledge base kurikulum secara semantic, menghasilkan rekomendasi terstruktur dengan alasan yang dapat dijelaskan, serta memvisualisasikan study path mahasiswa.

**Nilai Utama:**
- Mengurangi beban konsultasi rutin dosen wali hingga 40-60%
- Memberikan rekomendasi berbasis data kurikulum, bukan intuisi
- Meningkatkan kualitas perencanaan studi mahasiswa melalui explainable AI
- Menyediakan audit trail konsultasi untuk evaluasi akademik

**Asumsi Data:**
Seluruh data mahasiswa, kurikulum, dan riwayat konsultasi adalah DATA DUMMY (SIMULASI) untuk keperluan akademis. Tidak ada data pribadi nyata (PII) yang digunakan.

---

## 2. LATAR BELAKANG & PERMASALAHAN

### 2.1 Kondisi Saat Ini (AS-IS)

Proses konsultasi akademik di Program Studi Teknologi Informasi saat ini dilakukan secara manual dengan alur berikut:

1. Mahasiswa menunggu jadwal konsultasi dengan dosen wali (biasanya menjelang periode KRS).
2. Mahasiswa datang ke ruang dosen dan menyampaikan rencana studi secara lisan.
3. Dosen wali memberikan rekomendasi berdasarkan ingatan, pengalaman, dan catatan manual.
4. Tidak ada sistem yang mencatat riwayat rekomendasi atau memvalidasi prasyarat secara otomatis.
5. Mahasiswa tidak memiliki gambaran visual tentang progress studi mereka.
6. Setelah konsultasi, tidak ada dokumentasi terstruktur yang bisa dirujuk kembali.

### 2.2 Bukti Adanya Masalah

| No | Masalah | Bukti / Dampak |
|----|---------|----------------|
| P1 | Rekomendasi tidak konsisten antar dosen wali | Mahasiswa A dan B dengan profil serupa mendapat saran berbeda |
| P2 | Validasi prasyarat dilakukan manual | Rawan human error; mahasiswa bisa salah ambil MK tanpa prasyarat |
| P3 | Tidak ada visualisasi study path | Mahasiswa tidak tahu progress & sisa MK yang harus diambil |
| P4 | Beban dosen wali tinggi saat periode KRS | Waktu konsultasi per mahasiswa sangat singkat (5-10 menit) |
| P5 | Tidak ada riwayat konsultasi terstruktur | Tidak ada audit trail untuk evaluasi akademik |
| P6 | Mahasiswa pasif dalam perencanaan studi | Cenderung mengikuti teman tanpa memahami alasan |

### 2.3 Siapa yang Terdampak

- **Mahasiswa:** Kebingungan memilih MK, potensi kesalahan prasyarat, tidak punya gambaran karir
- **Dosen Wali:** Beban kerja tinggi saat KRS, tidak ada tools bantu
- **Program Studi:** Kualitas perencanaan studi mahasiswa tidak terjamin, sulit evaluasi kurikulum

### 2.4 Alasan Solusi Sistem Informasi Diperlukan

Sistem informasi berbasis AI diperlukan untuk:
1. Mengotomasi proses rekomendasi awal sehingga dosen wali bisa fokus pada kasus kompleks
2. Menyediakan knowledge base kurikulum yang selalu ter-update dan dapat diakses semantic
3. Memberikan penjelasan (explainability) di balik setiap rekomendasi agar mahasiswa bisa belajar mengambil keputusan
4. Memvisualisasikan progress studi untuk meningkatkan motivasi dan perencanaan
5. Menyimpan riwayat konsultasi sebagai audit trail akademik

---

## 3. TUJUAN & SASARAN PROYEK

### 3.1 Tujuan Utama

1. Merancang dan membangun prototipe sistem advisory akademik berbasis AI dengan pendekatan RAG (Retrieval-Augmented Generation).
2. Menyediakan rekomendasi mata kuliah yang personal, kontekstual, dan dapat dijelaskan (explainable AI).
3. Memvisualisasikan study path mahasiswa secara interaktif.
4. Mendukung simulasi skenario pengambilan mata kuliah (what-if analysis).
5. Menyediakan dashboard bagi dosen/admin untuk memvalidasi dan memantau konsultasi.

### 3.2 Sasaran Terukur (Success Metrics)

| Metrik | Target | Cara Pengukuran |
|--------|--------|-----------------|
| Waktu respons rekomendasi AI | ≤ 5 detik per permintaan | Logging timestamp di backend |
| Akurasi rekomendasi (validasi dosen) | ≥ 80% disetujui tanpa revisi | Hitung rasio APPROVED vs REVISED |
| Kepuasan pengguna (persona simulasi) | ≥ 4/5 pada skala Likert | Kuesioner simulasi persona |
| Cakupan fitur UAS | 100% FR & NFR terpenuhi | Checklist pengujian |
| Skenario pengujian lulus | 3/3 skenario lulus | Tabel hasil pengujian Bab IV |

---

## 4. PERSONA PENGGUNA

### Persona 1: Budi Santoso (Mahasiswa)

| Atribut | Detail |
|---------|--------|
| Usia | 20 tahun |
| Status | Mahasiswa Semester 5, S1 Teknologi Informasi |
| IPK | 3.52 |
| Minat Karir | Artificial Intelligence & Data Science |
| MK Lulus | 45 SKS (termasuk Algoritma, Basis Data, Statistika) |
| Perilaku | Tech-savvy, ingin proses cepat, sering bertanya "kenapa" terhadap rekomendasi |
| Pain Points | Bingung pilih MK pilihan, tidak tahu prasyarat, tidak ada gambaran karir |

**Kebutuhan Utama:**
- Rekomendasi MK pilihan yang sesuai minat karir
- Penjelasan alasan di balik setiap rekomendasi
- Visualisasi progress studi
- Simulasi "bagaimana jika saya ambil MK X?"
- Riwayat konsultasi yang bisa diakses kapan saja

**Skenario Penggunaan:**
Budi login ke sistem, mengisi profil minatnya di bidang AI, lalu bertanya: "Mata kuliah apa yang sebaiknya saya ambil semester depan untuk mempersiapkan karir di bidang Machine Learning?" Sistem memberikan 3 rekomendasi MK dengan alasan eksplisit, confidence score, dan visualisasi study path.

---

### Persona 2: Dr. Ani Wijaya (Dosen Wali / Admin Akademik)

| Atribut | Detail |
|---------|--------|
| Usia | 42 tahun |
| Status | Dosen tetap, Wali akademik untuk 25 mahasiswa |
| Beban Kerja | Mengajar 3 MK + bimbingan 25 mahasiswa + tugas struktural |
| Perilaku | Sibuk, butuh tools yang mempercepat kerja, peduli kualitas akademik |
| Pain Points | Waktu konsultasi terbatas, tidak ada tools bantu, sulit track progress mahasiswa |

**Kebutuhan Utama:**
- Dashboard ringkasan konsultasi mahasiswa bimbingannya
- Kemampuan memvalidasi/merevisi rekomendasi AI
- Riwayat konsultasi terstruktur per mahasiswa
- Notifikasi jika ada rekomendasi yang perlu perhatian khusus
- Laporan penggunaan sistem untuk evaluasi

**Skenario Penggunaan:**
Dr. Ani login ke dashboard admin, melihat daftar 8 konsultasi baru dari mahasiswa bimbingannya. Untuk setiap konsultasi, ia membaca pertanyaan mahasiswa, rekomendasi AI beserta alasannya, lalu mengklik "Approve" jika sesuai atau "Revise" dengan catatan jika perlu penyesuaian.

---

## 5. RUANG LINGKUP & BATASAN

### 5.1 In-Scope (Masuk Cakupan)

| No | Fitur | Keterangan |
|----|-------|------------|
| 1 | Autentikasi & Otorisasi | Login, JWT, Role-Based Access Control (mahasiswa, admin) |
| 2 | Manajemen Profil Mahasiswa | Input/edit profil akademik (minat, IPK, semester) |
| 3 | Manajemen Data Kurikulum | CRUD mata kuliah, prasyarat, silabus oleh admin |
| 4 | Chat Interface Konsultasi | Interface chat dengan AI untuk konsultasi akademik |
| 5 | RAG Pipeline | Retrieval dari knowledge base kurikulum + generation |
| 6 | Explainable AI Output | Setiap rekomendasi disertai alasan eksplisit |
| 7 | Study Path Visualization | Grafik interaktif progress mata kuliah |
| 8 | What-if Simulator | Simulasi kombinasi MK tanpa mengubah data permanen |
| 9 | Dashboard Admin | Validasi rekomendasi, kelola kurikulum, lihat laporan |
| 10 | Riwayat Konsultasi | List semua percakapan sebelumnya per mahasiswa |

### 5.2 Out-of-Scope (Di Luar Cakupan)

| No | Fitur | Alasan Tidak Masuk |
|----|-------|-------------------|
| 1 | Integrasi dengan SIAKAD universitas | Butuh API access & izin institusi |
| 2 | Pengisian KRS otomatis ke sistem universitas | Di luar scope prototipe |
| 3 | Notifikasi email/WhatsApp otomatis | Menambah kompleksitas, bukan core |
| 4 | Pembayaran UKT/SPP | Bukan domain akademik advisory |
| 5 | Chat real-time dengan dosen (human) | Fokus pada AI advisory dulu |
| 6 | Upload dokumen transkrip (OCR) | Data dummy sudah cukup untuk simulasi |
| 7 | Multi-bahasa (English) | Scope bahasa Indonesia saja |

### 5.3 Asumsi & Batasan

1. **Data Simulasi:** Seluruh data mahasiswa, kurikulum, dan riwayat konsultasi adalah DATA DUMMY yang di-generate melalui seed script. Tidak ada data pribadi nyata (PII) yang digunakan.
2. **API AI:** Menggunakan OpenAI API dalam batas free tier / kuota pengembangan. Jika kuota habis, sistem menampilkan pesan graceful degradation.
3. **Skala Pengguna:** Prototipe dirancang untuk maksimal 50 concurrent users (skala demo UAS).
4. **Deployment:** Frontend di Vercel, Backend di Railway/Render, Database di Neon/Supabase (semua free tier).
5. **Kurikulum:** Menggunakan 30 mata kuliah dummy yang merepresentasikan kurikulum S1 Teknologi Informasi.
6. **Tidak Ada Jaminan Akurasi 100%:** Rekomendasi AI bersifat saran, bukan keputusan final. Validasi dosen tetap diperlukan.

---

## 6. KEBUTUHAN FUNGSIONAL (FR)

| Kode | Aktor | Kebutuhan Fungsional | Prioritas | Kriteria Penerimaan |
|------|-------|----------------------|-----------|---------------------|
| FR-01 | Mahasiswa | Mahasiswa dapat mengisi profil akademik (minat, IPK, semester) dan mengajukan pertanyaan konsultasi melalui chat interface | Tinggi | Profil tersimpan di DB; pertanyaan terkirim; respons AI muncul dalam ≤ 5 detik |
| FR-02 | Mahasiswa | Sistem menghasilkan rekomendasi mata kuliah beserta alasan yang dapat dijelaskan (Explainable AI) berdasarkan kurikulum dan profil mahasiswa | Tinggi | Setiap rekomendasi menyertakan minimal 2 alasan spesifik (misal: sesuai minat, prasyarat terpenuhi, membuka jalur karir); confidence score 0-1 ditampilkan |
| FR-03 | Mahasiswa | Mahasiswa dapat melihat visualisasi Study Path yang menampilkan progress mata kuliah (lulus, sedang, rencana) | Sedang | Grafik interaktif tampil dengan warna sesuai status; data sesuai profil mahasiswa; responsive di desktop & tablet |
| FR-04 | Mahasiswa | Mahasiswa dapat melakukan simulasi "what-if" (misal: "Bagaimana jika saya ambil MK X semester depan?") dan melihat dampaknya terhadap study path | Sedang | Sistem memberikan analisis dampak tanpa mengubah data permanen; preview study path berubah sesuai skenario |
| FR-05 | Admin/Dosen | Admin dapat memantau daftar konsultasi, membaca rekomendasi AI beserta alasannya, dan memberikan status validasi (Disetujui / Perlu Revisi) | Tinggi | Status validasi tersimpan dengan timestamp; dashboard admin menampilkan ringkasan (total, pending, approved, revised) |

### Detail Tambahan per FR:

**FR-01 Detail:**
- Input profil: nama, NIM, semester (1-14), IPK (0-4), minat karir (text)
- Chat interface mendukung multi-turn conversation (AI ingat konteks sebelumnya)
- Pertanyaan minimal 10 karakter, maksimal 500 karakter
- Jika input kosong atau hanya spasi → tampilkan validasi error

**FR-02 Detail:**
- AI menggunakan RAG untuk retrieve top-K mata kuliah relevan dari knowledge base
- Output terstruktur dalam format JSON: [{kode_mk, nama_mk, alasan[], confidence}]
- Alasan harus spesifik, bukan generik (misal: "MK ini cocok karena Anda sudah lulus Basis Data sebagai prasyarat" bukan "MK ini bagus")
- Confidence score dihitung berdasarkan similarity score + kelengkapan prasyarat

**FR-03 Detail:**
- Visualisasi menggunakan grafik node-based atau timeline
- Warna: Hijau (lulus), Kuning (sedang diambil), Biru (rekomendasi AI), Abu-abu (belum diambil)
- Hover pada node menampilkan detail MK (SKS, prasyarat, deskripsi singkat)

**FR-04 Detail:**
- User memilih MK dari dropdown → preview study path berubah
- Tidak ada data yang disimpan ke DB (hanya state frontend)
- Tombol "Reset" untuk kembali ke kondisi awal

**FR-05 Detail:**
- Admin melihat tabel konsultasi dengan filter: status, tanggal, mahasiswa
- Klik konsultasi → detail view: pertanyaan, rekomendasi AI, alasan, confidence
- Tombol "Approve" atau "Revise" (dengan textarea untuk catatan revisi)

---

## 7. KEBUTUHAN NON-FUNGSIONAL (NFR)

| Kode | Kebutuhan Nonfungsional | Indikator Verifikasi |
|------|-------------------------|----------------------|
| NFR-01 | **Keamanan & RBAC:** Pengguna dengan role `mahasiswa` tidak dapat mengakses endpoint admin. Semua endpoint dilindungi JWT authentication. | Request ke `/api/admin/*` dari token mahasiswa dikembalikan HTTP 403 dalam waktu < 100ms. Request tanpa token dikembalikan HTTP 401. |
| NFR-02 | **Performa AI:** Respons rekomendasi AI lengkap dengan alasan harus dihasilkan dalam waktu wajar untuk pengalaman pengguna yang baik. | Waktu respons end-to-end (dari submit pertanyaan hingga respons lengkap tampil) ≤ 5 detik pada koneksi internet standar (≥ 10 Mbps). Diukur menggunakan logging timestamp di backend. |
| NFR-03 | **Privasi Data:** Seluruh data yang disimpan adalah data dummy, tidak mengandung Personally Identifiable Information (PII) nyata. Sesuai dengan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi. | Audit kolom tabel menunjukkan data ter-generate dari seed script. Tidak ada NIM, nama, atau email asli. Pernyataan eksplisit di laporan dan README. |

---

## 8. USER STORIES

### Mahasiswa (Budi)

| ID | User Story | Acceptance Criteria |
|----|-----------|---------------------|
| US-01 | Sebagai mahasiswa, saya ingin mengisi profil akademik agar AI bisa memberikan rekomendasi yang personal | Form profil tersimpan; data muncul di sesi konsultasi berikutnya |
| US-02 | Sebagai mahasiswa, saya ingin bertanya tentang mata kuliah yang cocok untuk minat saya agar saya tidak salah pilih | Chat interface responsif; AI menjawab dalam ≤ 5 detik |
| US-03 | Sebagai mahasiswa, saya ingin melihat alasan di balik rekomendasi AI agar saya bisa mempertimbangkannya secara kritis | Setiap rekomendasi punya ≥ 2 alasan spesifik |
| US-04 | Sebagai mahasiswa, saya ingin melihat visualisasi study path saya agar saya tahu progress dan sisa mata kuliah | Grafik tampil dengan warna sesuai status; interactive hover |
| US-05 | Sebagai mahasiswa, saya ingin mensimulasikan kombinasi mata kuliah sebelum memutuskan agar saya bisa eksplorasi skenario | What-if simulator mengubah preview tanpa simpan ke DB |
| US-06 | Sebagai mahasiswa, saya ingin melihat riwayat konsultasi saya agar saya bisa merefleksikan saran yang pernah diberikan | List riwayat tampil urut tanggal; klik untuk lihat detail |

### Admin/Dosen (Dr. Ani)

| ID | User Story | Acceptance Criteria |
|----|-----------|---------------------|
| US-07 | Sebagai dosen wali, saya ingin melihat daftar konsultasi mahasiswa bimbingan saya agar saya bisa memantau progress mereka | Dashboard menampilkan tabel konsultasi dengan filter |
| US-08 | Sebagai dosen wali, saya ingin memvalidasi rekomendasi AI agar kualitas saran tetap terjamin | Tombol Approve/Revise berfungsi; status tersimpan |
| US-09 | Sebagai admin, saya ingin mengelola data kurikulum (MK, prasyarat, silabus) agar knowledge base AI selalu update | CRUD MK berfungsi; perubahan tercermin di rekomendasi AI berikutnya |

---

## 9. ARSITEKTUR TEKNIK

### 9.1 Tech Stack

| Layer | Teknologi | Alasan Pemilihan |
|-------|-----------|------------------|
| Frontend | Next.js 14 (App Router) | SSR untuk performa, file-based routing, mudah deploy |
| Styling | Tailwind CSS | Rapid prototyping, responsive by default |
| Visualization | Recharts / React Flow | Grafik interaktif untuk study path |
| Backend | Node.js + Express.js | Familiar, ekosistem luas, mudah integrasi AI SDK |
| Database | PostgreSQL + pgvector | Relational + vector search dalam satu DB, free tier available |
| ORM | Prisma | Type-safe, auto migration, mudah seeding |
| AI/LLM | OpenAI API (GPT-4o-mini) | Kualitas tinggi, support embeddings + structured output |
| Embeddings | text-embedding-3-small | 1536 dimensi, cost-effective |
| Memory | In-memory Map (atau Redis opsional) | Simpan conversation context, cukup untuk skala demo |
| Auth | JWT (jsonwebtoken) | Stateless, mudah implementasi RBAC |
| Deployment FE | Vercel | Free tier, auto deploy dari GitHub |
| Deployment BE | Railway / Render | Free tier, mudah setup Node.js |
| Database Hosting | Neon / Supabase | Free tier PostgreSQL + pgvector support |

### 9.2 Diagram Arsitektur High-Level
┌─────────────────────────────────────────────────────────────────┐
│ CLIENT (Browser) │
│ Next.js + Tailwind CSS │
│ (Chat UI, Study Path, Dashboard Admin) │
└──────────────────────────┬──────────────────────────────────────┘
│ HTTPS (REST API)
▼
┌─────────────────────────────────────────────────────────────────┐
│ BACKEND (Express.js) │
│ │
│ ┌──────────┐ ┌──────────────┐ ┌────────────────────────┐ │
│ │ Auth │ │ CRUD APIs │ │ AI / RAG Pipeline │ │
│ │ (JWT) │ │ (Students, │ │ - Query Embedding │ │
│ │ │ │ Courses, │ │ - Vector Search │ │
│ │ │ │ Consult.) │ │ - Context Assembly │ │
│ └──────────┘ └──────────────┘ │ - LLM Generation │ │
│ │ - Response Parsing │ │
│ └───────────┬────────────┘ │
└───────────────────────────────────────────────┼─────────────────┘
│ │
▼ ▼ HTTPS
┌──────────────────────────────────┐ ┌──────────────────────────┐
│ PostgreSQL + pgvector (Neon) │ │ OpenAI API │
│ │ │ │
│ - students │ │ - text-embedding-3-small│
│ - courses (+ embedding vector) │ │ - gpt-4o-mini (chat) │
│ - consultations │ │ │
└──────────────────────────────────┘ └──────────────────────────┘


### 9.3 RAG Pipeline Detail
┌─────────────────────────────────────────────────────────────────────┐
│ RAG PIPELINE │
│ │
│ [User Query] │
│ │ │
│ ▼ │
│ ┌─────────────────────────────────────────┐ │
│ │ Step 1: QUERY EMBEDDING │ │
│ │ - Convert pertanyaan ke vector 1536-dim │ │
│ │ - Model: text-embedding-3-small │ │
│ └─────────────────┬───────────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────────────────────────┐ │
│ │ Step 2: VECTOR SIMILARITY SEARCH │ │
│ │ - pgvector cosine similarity │ │
│ │ - Retrieve Top-K courses (K=5) │ │
│ │ - Filter: semester_ideal <= user_sem+2 │ │
│ └─────────────────┬───────────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────────────────────────┐ │
│ │ Step 3: CONTEXT ASSEMBLY │ │
│ │ - Student profile (minat, IPK, semester)│ │
│ │ - Top-K courses (nama, silabus, prasy.) │ │
│ │ - Conversation history (max 10 turns) │ │
│ └─────────────────┬───────────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────────────────────────┐ │
│ │ Step 4: LLM GENERATION │ │
│ │ - Model: gpt-4o-mini │ │
│ │ - Structured output (JSON mode) │ │
│ │ - System prompt: Academic Advisor role │ │
│ └─────────────────┬───────────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────────────────────────┐ │
│ │ Step 5: POST-PROCESSING & VALIDATION │ │
│ │ - Parse JSON response │ │
│ │ - Validate: hanya MK yang ada di DB │ │
│ │ - Calculate confidence score │ │
│ └─────────────────┬───────────────────────┘ │
│ │ │
│ ▼ │
│ [Structured Response → Frontend] │
│ │
└─────────────────────────────────────────────────────────────────────┘


---

## 10. MODEL DATA & PERANCANGAN DATABASE

### 10.1 Entity Relationship Diagram (ERD)
┌─────────────────────────┐ ┌─────────────────────────┐
│ Students │ │ Courses │
├─────────────────────────┤ ├─────────────────────────┤
│ id (PK, INT) │ │ id (PK, INT) │
│ nama (VARCHAR) │ │ kode_mk (VARCHAR,UQ)│
│ nim (VARCHAR,UQ)│ │ nama_mk (VARCHAR) │
│ semester (INT) │ │ sks (INT) │
│ ipk (FLOAT) │ │ kategori (VARCHAR) │
│ minat_karir (TEXT) │ │ semester_ideal (INT) │
│ password_hash (VARCHAR) │ │ deskripsi (TEXT) │
│ role (ENUM) │ │ silabus (TEXT) │
│ embedding (VECTOR) │ │ embedding (VECTOR) │
│ created_at (TIMESTAMP) │ │ created_at (TIMESTAMP) │
└────────────┬────────────┘ └────────────┬────────────┘
│ │
│ 1 │ 1
│ │
│ N │ N
│ │
▼ ▼
┌─────────────────────────────────────────────────────────────┐
│ Consultations │
├─────────────────────────────────────────────────────────────┤
│ id (PK, INT) │
│ student_id (FK → Students.id) │
│ course_id (FK → Courses.id, NULLABLE) │
│ pertanyaan (TEXT) │
│ ai_recommendation (TEXT) │
│ ai_reasoning (JSONB) │
│ confidence_score (FLOAT) │
│ status_validasi (ENUM: PENDING/APPROVED/REVISED) │
│ catatan_revisi (TEXT, NULLABLE) │
│ conversation_ctx (JSONB) │
│ created_at (TIMESTAMP) │
│ updated_at (TIMESTAMP) │
└─────────────────────────────────────────────────────────────┘
Relasi:
Students 1 ──── N Consultations
Courses 1 ──── N Consultations (nullable, untuk MK spesifik)


### 10.2 Kamus Data Ringkas

| Tabel | Kolom | Tipe | Keterangan |
|-------|-------|------|------------|
| Students | id | INT (PK) | Auto-increment |
| Students | nama | VARCHAR(100) | Nama dummy |
| Students | nim | VARCHAR(20) | NIM dummy, unique |
| Students | semester | INT | 1-14 |
| Students | ipk | FLOAT | 0.00 - 4.00 |
| Students | minat_karir | TEXT | Misal: "AI & Data Science" |
| Students | password_hash | VARCHAR(255) | bcrypt hash |
| Students | role | ENUM | 'mahasiswa' atau 'admin' |
| Students | embedding | VECTOR(1536) | pgvector, dari profil |
| Courses | id | INT (PK) | Auto-increment |
| Courses | kode_mk | VARCHAR(10) | Misal: "TI301", unique |
| Courses | nama_mk | VARCHAR(100) | Misal: "Machine Learning" |
| Courses | sks | INT | 2-4 SKS |
| Courses | kategori | VARCHAR(50) | "Wajib" / "Pilihan" |
| Courses | semester_ideal | INT | Semester rekomendasi |
| Courses | deskripsi | TEXT | Deskripsi singkat MK |
| Courses | silabus | TEXT | Silabus lengkap untuk RAG |
| Courses | embedding | VECTOR(1536) | pgvector, dari silabus |
| Consultations | id | INT (PK) | Auto-increment |
| Consultations | student_id | INT (FK) | Ref Students.id |
| Consultations | course_id | INT (FK) | Ref Courses.id, nullable |
| Consultations | pertanyaan | TEXT | Input mahasiswa |
| Consultations | ai_recommendation | TEXT | Raw response AI |
| Consultations | ai_reasoning | JSONB | Structured reasons |
| Consultations | confidence_score | FLOAT | 0.00 - 1.00 |
| Consultations | status_validasi | ENUM | PENDING/APPROVED/REVISED |
| Consultations | catatan_revisi | TEXT | Catatan dari admin |
| Consultations | conversation_ctx | JSONB | History multi-turn |
| Consultations | created_at | TIMESTAMP | Auto |
| Consultations | updated_at | TIMESTAMP | Auto |

### 10.3 Prisma Schema

```prisma
// schema.prisma

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [vector]
}

enum Role {
  MAHASISWA
  ADMIN
}

enum StatusValidasi {
  PENDING
  APPROVED
  REVISED
}

model Student {
  id              Int           @id @default(autoincrement())
  nama            String
  nim             String        @unique
  semester        Int
  ipk             Float
  minatKarir      String
  passwordHash    String
  role            Role          @default(MAHASISWA)
  embedding       Unsupported("vector(1536)")?
  consultations   Consultation[]
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model Course {
  id              Int           @id @default(autoincrement())
  kodeMk          String        @unique
  namaMk          String
  sks             Int
  kategori        String
  semesterIdeal   Int
  deskripsi       String
  silabus         String
  prerequisites   Course[]      @relation("CoursePrerequisites")
  prerequisiteOf  Course[]      @relation("CoursePrerequisites")
  embedding       Unsupported("vector(1536)")?
  consultations   Consultation[]
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model Consultation {
  id                Int             @id @default(autoincrement())
  student           Student         @relation(fields: [studentId], references: [id])
  studentId         Int
  course            Course?         @relation(fields: [courseId], references: [id])
  courseId          Int?
  pertanyaan        String
  aiRecommendation  String
  aiReasoning       Json
  confidenceScore   Float
  statusValidasi    StatusValidasi  @default(PENDING)
  catatanRevisi     String?
  conversationCtx   Json?
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt
}

## 11. INTEGRASI AI / LLM (RAG PIPELINE)
### 11.1 Embedding Strategy
Aspek
Detail
Model Embedding
text-embedding-3-small (OpenAI)
Dimensi
1536
Sumber Teks (Course)
nama_mk + " - " + deskripsi + " - Silabus: " + silabus
Sumber Teks (Student)
minat_karir + " - Semester " + semester + " - IPK " + ipk
Kapan Generate
Saat seed data awal + saat admin tambah/edit MK
Storage
Kolom embedding di PostgreSQL via pgvector

### 11.2 Vector Search Query (pgvector)
-- Cari top-5 mata kuliah paling relevan dengan query mahasiswa
SELECT 
  c.id, 
  c.kode_mk, 
  c.nama_mk, 
  c.sks, 
  c.deskripsi,
  1 - (c.embedding <=> $1) AS similarity_score
FROM courses c
WHERE c.semester_ideal <= $2 + 2  -- Filter: tidak terlalu jauh dari semester mahasiswa
ORDER BY c.embedding <=> $1
LIMIT 5;

### 11.3 System Prompt Template
Anda adalah Academic Advisor AI untuk Program Studi S1 Teknologi Informasi.
Tugas Anda adalah membantu mahasiswa memilih mata kuliah yang sesuai dengan 
profil akademik, minat karir, dan progress studi mereka.

ATURAN:
1. Hanya rekomendasikan mata kuliah yang ada dalam KNOWLEDGE BASE yang diberikan.
2. Setiap rekomendasi WAJIB disertai minimal 2 alasan spesifik.
3. Alasan harus merujuk pada: (a) kesesuaian minat, (b) status prasyarat, (c) manfaat karir.
4. Berikan confidence score 0-1 berdasarkan keyakinan Anda.
5. Jika tidak ada MK yang cocok, katakan jujur dan berikan alternatif.
6. Gunakan bahasa Indonesia yang formal tapi ramah.
7. JANGAN mengarang mata kuliah yang tidak ada di knowledge base.

PROFIL MAHASISWA:
- Nama: {student.nama}
- Semester: {student.semester}
- IPK: {student.ipk}
- Minat Karir: {student.minat_karir}

KNOWLEDGE BASE (Mata Kuliah Relevan):
{top_k_courses_json}

RIWAYAT PERCAKAPAN SEBELUMNYA:
{conversation_history}

PERTANYAAN MAHASISWA:
{user_query}

FORMAT OUTPUT (JSON, tanpa markdown code block):
{
  "recommendations": [
    {
      "kode_mk": "TI301",
      "nama_mk": "Machine Learning",
      "alasan": [
        "Sesuai dengan minat Anda di bidang AI & Data Science",
        "Prasyarat 'Basis Data' dan 'Statistika' sudah Anda lulusi"
      ],
      "manfaat_karir": "Membuka jalur karir sebagai ML Engineer",
      "confidence": 0.92
    }
  ],
  "general_advice": "Berdasarkan profil Anda, fokus pada track AI sangat tepat...",
  "study_path_impact": "Mengambil MK ini akan melengkapi 15 SKS tersisa di track AI"
}

### 11.4 Multi-turn Conversation Memory
Aspek
Implementasi
Storage
Kolom conversation_ctx (JSONB) di tabel Consultations
Format
Array of {role: "user"/"assistant", content: "..."}
Max Turns
10 turns (untuk menghemat token)
Truncation
Jika total token > 2000, hapus turns tertua
Reset
Tombol "Mulai Percakapan Baru" mengosongkan context

### 11.5 Explainable AI Output Requirements
Setiap rekomendasi AI WAJIB menyertakan:
Kode & Nama MK - Identitas mata kuliah
Minimal 2 Alasan Spesifik - Bukan generik seperti "MK ini bagus"
Manfaat Karir - Hubungan dengan jalur karir mahasiswa
Confidence Score - Angka 0-1 yang menunjukkan keyakinan AI
Status Prasyarat - ✅ (terpenuhi) atau ❌ (belum) untuk setiap prasyarat
### 11.6 Post-Processing & Validation
Setelah menerima respons dari LLM:
Parse JSON response
Validasi: setiap kode_mk harus ada di tabel Courses
Jika ada MK yang tidak ada di DB → hapus dari rekomendasi
Hitung ulang confidence berdasarkan: (similarity_score * 0.4) + (prasyarat_terpenuhi * 0.3) + (kesesuaian_minat * 0.3)
Simpan ke tabel Consultations

## 12. ALUR PROSES UTAMA
### 12.1 Use Case Diagram
                    ┌─────────────────────────────────┐
                    │   AcademicAI Advisor System     │
                    │                                 │
  ┌─────────┐      │  ┌─────────────────────────┐   │
  │Mahasiswa│──────┼─►│ UC-01: Login            │   │
  │  (Budi) │      │  └─────────────────────────┘   │
  │         │      │  ┌─────────────────────────┐   │
  │         │──────┼─►│ UC-02: Isi Profil       │   │
  │         │      │  └─────────────────────────┘   │
  │         │      │  ┌─────────────────────────┐   │
  │         │──────┼─►│ UC-03: Konsultasi AI    │   │
  │         │      │  └─────────────────────────┘   │
  │         │      │  ┌─────────────────────────┐   │
  │         │──────┼─►│ UC-04: Lihat Study Path │   │
  │         │      │  └─────────────────────────┘   │
  │         │      │  ┌─────────────────────────┐   │
  │         │──────┼─►│ UC-05: Simulasi What-if │   │
  │         │      │  └─────────────────────────┘   │
  └─────────┘      │  ┌─────────────────────────┐   │
                    │  │ UC-06: Lihat Riwayat    │   │
  ┌─────────┐      │  └─────────────────────────┘   │
  │Admin/   │      │                                 │
  │Dosen    │──────┼─►┌─────────────────────────┐   │
  │(Dr. Ani)│      │  │ UC-07: Kelola Kurikulum │   │
  │         │      │  └─────────────────────────┘   │
  │         │──────┼─►┌─────────────────────────┐   │
  │         │      │  │ UC-08: Validasi Rekom.  │   │
  │         │      │  └─────────────────────────┘   │
  │         │──────┼─►┌─────────────────────────┐   │
  └─────────┘      │  │ UC-09: Lihat Laporan    │   │
                    │  └─────────────────────────┘   │
                    └─────────────────────────────────┘

### 12.2 Activity Diagram - Proses Konsultasi AI (Alur Utama)
[Mulai]
    │
    ▼
[Mahasiswa Login]
    │
    ▼
[Dashboard Mahasiswa Tampil]
    │
    ▼
[Mahasiswa klik "Konsultasi AI"]
    │
    ▼
[Chat Interface Tampil]
    │
    ▼
[Mahasiswa input pertanyaan]
    │
    ▼
◇ [Validasi: pertanyaan tidak kosong?]
    │
    ├── TIDAK ──► [Tampilkan error: "Pertanyaan tidak boleh kosong"] ──► [Kembali ke input]
    │
    ▼ YA
[Frontend kirim POST /api/consult]
    │
    ▼
[Backend: Generate query embedding via OpenAI]
    │
    ▼
[Backend: Vector search top-5 courses di pgvector]
    │
    ▼
[Backend: Assemble context (profil + courses + history)]
    │
    ▼
[Backend: Call OpenAI GPT-4o-mini dengan structured prompt]
    │
    ▼
◇ [AI response valid?]
    │
    ├── TIDAK ──► [Return error message ke frontend] ──► [Selesai]
    │
    ▼ YA
[Backend: Post-processing & validasi MK ada di DB]
    │
    ▼
[Backend: Simpan Consultation ke DB (status PENDING)]
    │
    ▼
[Backend: Return structured response]
    │
    ▼
[Frontend: Render rekomendasi + alasan + confidence]
    │
    ▼
[Frontend: Update conversation context]
    │
    ▼
[Selesai]

### 12.3 Activity Diagram - Proses Validasi Admin
[Mulai]
    │
    ▼
[Admin Login]
    │
    ▼
[Dashboard Admin Tampil]
    │
    ▼
[Admin lihat daftar konsultasi PENDING]
    │
    ▼
[Admin klik salah satu konsultasi]
    │
    ▼
[Detail View: pertanyaan + rekomendasi AI + alasan]
    │
    ▼
◇ [Admin setuju dengan rekomendasi?]
    │
    ├── YA ──► [Klik "Approve"] ──► [Status → APPROVED] ──► [Selesai]
    │
    └── TIDAK ──► [Klik "Revise"] ──► [Input catatan revisi] ──► [Status → REVISED] ──► [Selesai]

## 13. DESAIN ANTARMUKA
### 13.1 Daftar Halaman Kunci
No
Halaman
Role
Fitur Utama
1
Login
Semua
Form email/password, pilihan role
2
Dashboard Mahasiswa
Mahasiswa
Quick stats (IPK, semester, MK tersisa), entry point ke chat & study path
3
Chat Konsultasi
Mahasiswa
Interface chat dengan bubble AI, rekomendasi + alasan + confidence
4
Study Path
Mahasiswa
Grafik interaktif progress MK
5
What-if Simulator
Mahasiswa
Form pilih MK + preview dampak
6
Riwayat Konsultasi
Mahasiswa
List semua percakapan sebelumnya
7
Dashboard Admin
Admin
Tabel konsultasi + filter + tombol approve/revise
8
Kelola Kurikulum
Admin
CRUD mata kuliah
9
Detail Konsultasi
Admin
View lengkap: pertanyaan, rekomendasi, alas an

### 13.2 Wireframe - Chat Konsultasi (Halaman Utama)
┌─────────────────────────────────────────────────────────────────┐
│  AcademicAI Advisor          [Dashboard] [Chat] [Study Path]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🤖 AI Advisor                                           │   │
│  │ Halo Budi! Saya siap membantu Anda merencanakan studi.  │   │
│  │ Silakan tanyakan tentang mata kuliah yang sesuai dengan │   │
│  │ minat dan tujuan karir Anda.                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 👤 Budi                                                 │   │
│  │ MK apa yang cocok untuk saya semester depan jika saya   │   │
│  │ ingin fokus di bidang Machine Learning?                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🤖 AI Advisor                          Confidence: 92%  │   │
│  │                                                         │   │
│  │ Berdasarkan profil Anda (Semester 5, IPK 3.52, minat   │   │
│  │ AI & Data Science), saya merekomendasikan:              │   │
│  │                                                         │   │
│  │ ┌───────────────────────────────────────────────────┐   │   │
│  │ │ 📚 TI301 - Machine Learning (3 SKS)               │   │   │
│  │ │ Alasan:                                           │   │   │
│  │ │ ✅ Sesuai minat Anda di AI & Data Science         │   │   │
│  │ │ ✅ Prasyarat 'Basis Data' & 'Statistika' lulus    │   │   │
│  │ │ 🎯 Karir: ML Engineer, Data Scientist             │   │   │
│  │ └───────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │ ┌───────────────────────────────────────────────────┐   │   │
│  │ │ 📚 TI302 - Deep Learning (3 SKS)                  │   │   │
│  │ │ Alasan:                                           │   │   │
│  │ │ ✅ Kelanjutan langsung dari Machine Learning      │   │   │
│  │ │ ✅ Membuka jalur karir di Computer Vision/NLP     │   │   │
│  │ │ ⚠️ Prasyarat: TI301 (belum diambil, ambil dulu)   │   │   │
│  │ └───────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │ 💡 Saran umum: Dengan IPK 3.52 dan progress Anda,      │   │
│  │ track AI sangat achievable. Fokus di semester 5-6...   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Ketik pertanyaan Anda...]                    [Kirim ➤] │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

### 13.3 Wireframe - Study Path Visualization
┌─────────────────────────────────────────────────────────────────┐
│  Study Path - Budi Santoso (Semester 5)                         │
│  Progress: 45/144 SKS (31%)                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Semester 1          Semester 2          Semester 3             │
│  ┌──────────┐       ┌──────────┐       ┌──────────┐           │
│  │🟢 Algo   │──────►│🟢 Struk  │──────►│🟢 Basis  │           │
│  │  Dasar   │       │  Data    │       │  Data    │           │
│  │  3 SKS   │       │  3 SKS   │       │  3 SKS   │           │
│  └──────────┘       └──────────┘       └──────────┘           │
│       │                   │                   │                 │
│       ▼                   ▼                   ▼                 │
│  Semester 4          Semester 5          Semester 6             │
│  ┌──────────┐       ┌──────────┐       ┌──────────┐           │
│  │🟢 Statistik│     │🟡 ML     │──────►│🔵 Deep   │           │
│  │  3 SKS   │       │  3 SKS   │       │ Learning │           │
│  └──────────┘       └──────────┘       │  3 SKS   │           │
│                                          └──────────┘           │
│                                                                 │
│  Legenda:                                                       │
│  🟢 Lulus    🟡 Sedang Diambil    🔵 Rekomendasi AI    ⚪ Belum │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

### 13.4 Prinsip Desain
Prinsip
Implementasi
Clean & Academic
Warna utama biru navy (#1e3a8a), aksen hijau (#10b981)
Explainability First
Alasan AI selalu tampil eksplisit, tidak disembunyikan
Progressive Disclosure
Detail muncul saat hover/klik, tidak overwhelming
Mobile Responsive
Tailwind breakpoints (sm, md, lg)
Loading States
Skeleton loader saat AI memproses (max 5 detik)
Error Handling
Pesan error jelas, tidak menampilkan stack trace ke user

## 14. SKENARIO PENGUJIAN
### 14.1 Tabel Skenario Uji
ID Uji
Kebutuhan
Skenario / Input
Hasil Diharapkan
Hasil Aktual
Status
TC-01
FR-01, FR-02
Mahasiswa login (budi@student.ac.id / password123), mengisi profil (semester 5, IPK 3.52, minat "AI & Data Science"), bertanya: "MK apa yang cocok untuk saya semester depan jika ingin fokus di Machine Learning?"
AI memberikan ≥ 2 rekomendasi MK dengan alasan eksplisit (minat, prasyarat, karir) dan confidence score dalam ≤ 5 detik. Data tersimpan di tabel Consultations dengan status PENDING.
[Diisi saat pengujian]
[Lulus/Gagal]
TC-02
FR-01 (Invalid)
Mahasiswa mengirim pertanyaan kosong (hanya spasi) atau kurang dari 10 karakter
Sistem menampilkan pesan validasi "Pertanyaan tidak boleh kosong atau terlalu pendek (minimal 10 karakter)". AI tidak dipanggil. Tidak ada data tersimpan di DB.
[Diisi saat pengujian]
[Lulus/Gagal]
TC-03
NFR-01 (Security)
Mahasiswa (role: MAHASISWA, JWT token mahasiswa) mencoba akses endpoint GET /api/admin/consultations menggunakan token JWT-nya
Sistem menolak request dengan HTTP 403 Forbidden dan pesan "Access denied: Admin role required". Tidak ada data konsultasi yang dikembalikan.
[Diisi saat pengujian]
[Lulus/Gagal]
TC-04
FR-03
Mahasiswa membuka halaman Study Path setelah login
Grafik interaktif tampil dengan node MK berwarna sesuai status (hijau=lulus, kuning=sedang, biru=rekomendasi). Hover menampilkan detail MK.
[Diisi saat pengujian]
[Lulus/Gagal]
TC-05
FR-05
Admin login (ani@dosen.ac.id / admin123), membuka dashboard, melihat konsultasi TC-01, mengklik tombol "Approve"
Status konsultasi berubah dari PENDING ke APPROVED. Timestamp updated_at berubah. Dashboard admin merefleksikan perubahan.

Catatan: TC-01, TC-02, dan TC-03 adalah WAJIB sesuai ketentuan UAS (minimal 3 skenario, termasuk 1 input tidak valid). TC-04 dan TC-05 sebagai tambahan untuk cakupan lebih lengkap.

### 14.2 Bukti Pengujian
Setiap skenario uji wajib didokumentasikan dengan:
Screenshot input (form yang diisi)
Screenshot output (hasil yang diharapkan)
Screenshot database (row yang tersimpan)
Screenshot network tab (untuk TC-03: HTTP 403)

## 15. TIMELINE 30 HARI
### Minggu 1 (Hari 1-7): Foundation & Basic CRUD
Hari
Task
Output
PIC
1
Setup monorepo (FE: Next.js, BE: Express), inisialisasi DB PostgreSQL + enable pgvector extension
Repo GitHub, DB running
Semua
2
Desain & push Prisma schema (3 entitas), jalankan migration
Tabel students, courses, consultations
Backend
3
Implementasi seed script: 25 mahasiswa dummy, 30 MK dummy dengan silabus lengkap, 5 konsultasi dummy
Data terisi di DB
Backend
4
API autentikasi: register, login, JWT generation, middleware RBAC (verifyToken, verifyRole)
Endpoint /api/auth/login, middleware berfungsi
Backend
5
API CRUD Students (get profile, update profile) & Courses (list, get by id)
Endpoint /api/students, /api/courses
Backend
6
Setup Next.js FE: layout, routing, halaman Login, Dashboard Mahasiswa (static)
Halaman login & dashboard tampil
Frontend
7
Testing basic flow (login → dashboard), debug, review minggu 1
Semua basic flow berfungsi
Semua

### Minggu 2 (Hari 8-14): AI Integration Basic
Hari
Task
Output
PIC
8
Setup OpenAI API client, generate embeddings untuk 30 MK menggunakan text-embedding-3-small
30 vectors tersimpan di kolom embedding
Backend
9
Implementasi vector similarity search menggunakan pgvector, test dengan 5 query berbeda
Fungsi searchCourses(query) berfungsi
Backend
10
Implementasi endpoint POST /api/consult (basic RAG tanpa memory): embedding → search → LLM → response
Endpoint konsultasi berfungsi
Backend
11
Prompt engineering iteration: test 10 skenario pertanyaan berbeda, refine system prompt
Prompt final yang menghasilkan output konsisten
Backend
12
Implementasi structured output (JSON mode) untuk explainability, post-processing validation
Response terstruktur, hanya MK valid yang tampil
Backend
13
FE Chat interface: bubble chat, input area, loading state, render rekomendasi + alasan
Chat UI berfungsi dengan data dummy
Frontend
14
Testing integrasi AI end-to-end (frontend → backend → OpenAI → response), review minggu 2
Full flow konsultasi berfungsi
Semua

### Minggu 3 (Hari 15-21): Advanced Features
Hari
Task
Output
PIC
15
Implementasi multi-turn conversation memory: simpan context di DB, append tiap turn
AI ingat konteks percakapan sebelumnya
Backend
16
Streaming response (SSE atau polling) ke frontend, UX improvement
Respons AI muncul secara bertahap
Fullstack
17
Study Path visualization: pilih library (Recharts/React Flow), implementasi grafik node-based
Halaman Study Path tampil dengan data
Frontend
18
What-if simulator: form pilih MK, preview dampak ke study path (frontend state only)
Simulator berfungsi tanpa simpan ke DB
Frontend
19
Dashboard Admin: tabel konsultasi dengan filter (status, tanggal), detail view
Admin bisa lihat daftar konsultasi
Frontend
20
API validasi admin: PATCH /api/admin/consultations/:id/status, FE integration (tombol Approve/Revise)
Status validasi berfungsi
Fullstack
21
Halaman riwayat konsultasi mahasiswa, review minggu 3
Semua fitur utama berfungsi
Semua

### Minggu 4 (Hari 22-30): Polish, Testing & Documentation
Hari
Task
Output
PIC
22
UI/UX polish: loading states, error handling, responsive design, empty states
UI rapi dan profesional
Frontend
23
Edge case handling: AI timeout, invalid JSON response, empty result, DB connection error
Sistem tidak crash di edge cases
Backend
24
Comprehensive testing: jalankan 5 skenario TC, screenshot bukti, catat hasil aktual
Tabel pengujian terisi
QA/Testing
25
Tulis Bab 1-2 laporan (Pendahuluan, Analisis Sistem & Studi Kelayakan)
Draft Bab 1-2 selesai
Semua
26
Tulis Bab 3 (Analisis Kebutuhan & Perancangan) + buat diagram (draw.io): Use Case, Activity, ERD
Draft Bab 3 + diagram selesai
Semua
27
Tulis Bab 4 (Implementasi & Pengujian) + masukkan screenshot pengujian
Draft Bab 4 selesai
Semua
28
Tulis Bab 5 (Penutup) + Daftar Pustaka + Lampiran A-E
Laporan lengkap
Semua
29
README.md GitHub (fitur, cara install, screenshot, arsitektur), final review, PPT presentasi
Repo siap presentasi
Semua
30
Final check format (Calibri 11pt, spasi 1.15, margin), export PDF, submit
Semua deliverables terkumpul
Semua

## 16. METRIK KESUKSESAN
No
Metrik
Target
Cara Pengukuran
Status
1
Waktu respons AI
≤ 5 detik
Logging timestamp request-response di backend
[ ]
2
Akurasi rekomendasi
≥ 80% APPROVED
Hitung rasio APPROVED vs REVISED di DB
[ ]
3
Semua FR terimplementasi
5/5
Checklist testing manual
[ ]
4
Semua NFR terpenuhi
3/3
Verifikasi sesuai indikator
[ ]
5
Skenario uji lulus
5/5 (min 3)
Tabel hasil pengujian
[ ]
6
Kepuasan persona
≥ 4/5
Evaluasi simulasi persona
[ ]
7
Laporan sesuai template
100%
Checklist format UAS
[ ]
8
Repo GitHub publik
Ya
Link di laporan
[ ]

## 17. RISIKO & MITIGASI
No
Risiko
Dampak
Probabilitas
Mitigasi
R1
OpenAI API quota habis / rate limit
AI tidak bisa dipanggil, fitur utama mati
Sedang
Gunakan model gpt-4o-mini (lebih murah); implementasi retry dengan exponential backoff; batasi max 20 konsultasi/mahasiswa/hari; siapkan fallback message
R2
pgvector tidak didukung di hosting DB
RAG pipeline tidak bisa jalan
Rendah
Fallback ke in-memory vector search menggunakan library vectra atau hnswlib-node; atau gunakan Supabase yang support pgvector
R3
AI hallucinate (rekomendasikan MK yang tidak ada)
User trust turun, nilai UAS turun
Sedang
Post-processing validation: filter hanya MK yang ada di DB; prompt engineering dengan instruksi eksplisit "JANGAN mengarang"; test dengan 10+ skenario
R4
Timeline mepet, fitur tidak selesai
Proyek tidak lengkap
Sedang
Prioritaskan FR-01 s.d. FR-05 (wajib); fitur nice-to-have (what-if simulator) bisa disederhanakan atau ditunda; daily standup 10 menit
R5
Dosen penguji tidak familiar dengan RAG
Nilai turun karena tidak paham
Rendah
Jelaskan di Bab 2 dengan referensi akademik; sertakan diagram pipeline yang jelas; siapkan demo langsung saat presentasi
R6
Frontend rendering lambat (study path)
UX buruk
Rendah
Gunakan React.memo untuk node; lazy load grafik; batasi jumlah node yang di-render (max 30 MK)
R7
Konflik merge di GitHub
Kehilangan kode
Rendah
Branching strategy: main, develop, feature/*; PR review sebelum merge; backup lokal

## 18. DELIVERABLES
No
Deliverable
Format
Deadline
Status
1
Prototipe aplikasi (Frontend + Backend)
GitHub repository (public)
Hari 23
[ ]
2
Database schema + seed script
Prisma files di repo
Hari 3
[ ]
3
Laporan UAS (Bab 1-5 + Lampiran)
DOCX/PDF, Calibri 11pt, spasi 1.15
Hari 28
[ ]
4
Berkas presentasi
PPTX (10-15 slide)
Hari 29
[ ]
5
Bukti pengujian (screenshot)
Lampiran D di laporan
Hari 24
[ ]
6
README.md profesional
Markdown di GitHub
Hari 29
[ ]
7
Nama berkas laporan
UAS_SI_KelompokXX_AcademicAI.docx
Hari 30

## 19. KEPUTUSAN DESAIN PENTING
No
Keputusan
Alasan
D1
Menggunakan RAG, bukan fine-tuning model
Fine-tuning butuh data latih banyak & mahal; RAG memungkinkan update kurikulum tanpa re-train; lebih mudah di-debug karena bisa lihat context yang dipakai AI
D2
Menggunakan pgvector, bukan Pinecone/Weaviate
Satu database untuk semua (relational + vector); free tier lebih generous (Neon, Supabase); tidak perlu manage 2 service terpisah
D3
Structured output (JSON mode) untuk respons AI
Memudahkan parsing di backend; menjamin format konsisten untuk explainability; lebih reliable daripada regex parsing dari free text
D4
In-memory conversation, bukan Redis
Mengurangi kompleksitas deployment; cukup untuk skala demo UAS; bisa upgrade ke Redis nanti jika perlu persistence
D5
GPT-4o-mini, bukan GPT-4o
Cost-effective (10x lebih murah); kualitas cukup untuk use case rekomendasi; latency lebih rendah
D6
Next.js, bukan React SPA biasa
SSR untuk performa; file-based routing mempercepat development; mudah deploy di Vercel
D7
Tidak ada fitur chat real-time dengan dosen (human)
Fokus pada AI advisory dulu; fitur human chat menambah kompleksitas WebSocket; bisa ditambahkan di pengembangan lanjutan

## 20. KRITERIA PENERIMAAN (DEFINITION OF DONE)
Proyek dianggap SELESAI dan siap dikumpulkan jika SEMUA item berikut terpenuhi:
Fungsional
FR-01: Chat konsultasi berfungsi, AI merespons dalam ≤ 5 detik
FR-02: Setiap rekomendasi punya ≥ 2 alasan spesifik + confidence score
FR-03: Study Path visualization tampil dengan data yang benar
FR-04: What-if simulator berfungsi (frontend state)
FR-05: Admin bisa approve/revise konsultasi
Non-Fungsional
NFR-01: RBAC berfungsi, mahasiswa tidak bisa akses endpoint admin
NFR-02: Respons AI ≤ 5 detik (terverifikasi via logging)
NFR-03: Semua data dummy, tidak ada PII nyata
Pengujian
Minimal 3 skenario pengujian lulus (termasuk 1 invalid)
Screenshot bukti pengujian lengkap
Hasil aktual tercatat di tabel pengujian
Dokumentasi
Laporan DOCX/PDF sesuai template UAS (Calibri 11pt, spasi 1.15, margin kiri 3cm)
Semua bagian [isi...] sudah diganti
Abstrak 150-250 kata
Daftar Pustaka dengan gaya sitasi konsisten (IEEE)
Lampiran A-E lengkap
Repositori
GitHub repo publik
README.md dengan: deskripsi, fitur, cara install, screenshot, arsitektur
Seed script berfungsi
.env.example tersedia (tanpa API key asli)
Presentasi
PPTX 10-15 slide siap dibawakan
Demo aplikasi disiapkan (live atau video)
