# Struktur Repositori AcademicAI Advisor

Dokumen ini memberikan gambaran singkat mengenai struktur repositori
**AcademicAI Advisor**, yaitu aplikasi konsultasi akademik berbasis AI.

## Struktur Tingkat Atas

```text
AcademicAI Advisor/
├── backend/
├── frontend/
├── .gitignore
├── README.md
├── AcademicAI Advisor.md
├── STRUKTUR-REPOSITORI.md
└── arsitektur hi level academicai sisfor.drawio.png
```

> Direktori `node_modules/` dan `.next/` tidak ditampilkan karena merupakan
> hasil instalasi atau build lokal, bukan bagian dari source code utama.

## Backend

Backend adalah REST API berbasis Node.js dan Express.js. Backend menangani
endpoint konsultasi, komunikasi dengan database PostgreSQL melalui Prisma, dan
logika integrasi AI.

```text
backend/
├── package.json
├── package-lock.json
├── prisma.config.ts
├── test-db.js
├── prisma/
│   └── schema.prisma
└── src/
    ├── index.js
    └── routes/
        └── advisor.js
```

### File dan Direktori Backend

| Path | Fungsi |
| --- | --- |
| `backend/package.json` | Manifest dependency dan konfigurasi package backend. |
| `backend/package-lock.json` | Mengunci versi dependency hasil instalasi npm. |
| `backend/prisma.config.ts` | Konfigurasi Prisma. |
| `backend/prisma/schema.prisma` | Definisi model database `Student` dan `ChatMessage`. |
| `backend/src/index.js` | Entry point server Express, middleware, routing, dan port aplikasi. |
| `backend/src/routes/advisor.js` | Route konsultasi AI, termasuk endpoint `POST /api/advisor/chat`. |
| `backend/test-db.js` | Script untuk pengujian koneksi atau operasi database. |

### Endpoint Utama

- `GET /` — Memeriksa status API.
- `POST /api/advisor/chat` — Mengirim pesan konsultasi dan menyimpan riwayat
  percakapan.

## Frontend

Frontend adalah aplikasi Next.js dengan App Router. Halaman aplikasi berada di
direktori `app/`, sedangkan komponen UI yang dapat digunakan kembali berada di
direktori `components/`.

```text
frontend/
├── package.json
├── package-lock.json
├── next.config.js
├── next-env.d.ts
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── consultation/
│   │   └── page.tsx
│   ├── history/
│   │   └── page.tsx
│   ├── simulation/
│   │   └── page.tsx
│   ├── study-path/
│   │   └── page.tsx
│   └── admin/
│       ├── curriculum/
│       │   └── page.tsx
│       ├── dashboard/
│       │   └── page.tsx
│       └── validations/
│           └── page.tsx
├── components/
│   ├── AdvisorChat.tsx
│   ├── consultation/
│   │   ├── AIRecommendationCard.tsx
│   │   └── AISkeletonLoader.tsx
│   ├── shared/
│   │   ├── AppShell.tsx
│   │   └── Navigation.tsx
│   └── study-path/
│       └── StudyPathNode.tsx
└── types/
    └── academic.ts
```

### Halaman Frontend

| Path | Fungsi |
| --- | --- |
| `frontend/app/page.tsx` | Halaman utama aplikasi. |
| `frontend/app/login/page.tsx` | Halaman login pengguna. |
| `frontend/app/dashboard/page.tsx` | Dashboard mahasiswa. |
| `frontend/app/consultation/page.tsx` | Halaman konsultasi dengan advisor AI. |
| `frontend/app/history/page.tsx` | Riwayat konsultasi pengguna. |
| `frontend/app/simulation/page.tsx` | Simulasi atau perencanaan akademik. |
| `frontend/app/study-path/page.tsx` | Visualisasi jalur studi mahasiswa. |
| `frontend/app/admin/dashboard/page.tsx` | Dashboard untuk admin atau dosen. |
| `frontend/app/admin/curriculum/page.tsx` | Pengelolaan data kurikulum. |
| `frontend/app/admin/validations/page.tsx` | Validasi atau pemeriksaan data akademik. |

### Komponen dan Tipe Data

| Path | Fungsi |
| --- | --- |
| `frontend/components/AdvisorChat.tsx` | Komponen percakapan dengan advisor. |
| `frontend/components/consultation/AIRecommendationCard.tsx` | Menampilkan rekomendasi AI. |
| `frontend/components/consultation/AISkeletonLoader.tsx` | Tampilan loading saat rekomendasi diproses. |
| `frontend/components/shared/AppShell.tsx` | Layout umum halaman aplikasi. |
| `frontend/components/shared/Navigation.tsx` | Navigasi utama dan pemilihan menu. |
| `frontend/components/study-path/StudyPathNode.tsx` | Node pada visualisasi jalur studi. |
| `frontend/types/academic.ts` | Tipe TypeScript dan data akademik contoh. |

## Model Data

Skema database saat ini didefinisikan di
`backend/prisma/schema.prisma` dan menggunakan PostgreSQL.

```text
Student
├── id
├── name
├── email
├── major
├── gpa
├── createdAt
└── chats[]

ChatMessage
├── id
├── role
├── content
├── studentId
└── createdAt
```

Relasi antara kedua model adalah satu mahasiswa dapat memiliki banyak pesan
percakapan (`Student 1:N ChatMessage`).

## Alur Singkat Aplikasi

1. Pengguna membuka halaman pada frontend Next.js.
2. Pengguna mengakses halaman konsultasi dan mengirim pesan.
3. Frontend mengirim request ke `POST /api/advisor/chat` pada backend.
4. Backend mengambil data mahasiswa dari PostgreSQL melalui Prisma.
5. Backend menghasilkan balasan advisor dan menyimpan pesan pengguna serta
   balasan assistant ke database.
6. Frontend menampilkan balasan dan riwayat konsultasi kepada pengguna.

## Teknologi Utama

| Bagian | Teknologi |
| --- | --- |
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Integrasi AI | OpenAI API |
| Bahasa | JavaScript dan TypeScript |

## Dokumentasi dan Aset Root

- `README.md` berisi deskripsi singkat, tech stack, dan panduan quick start.
- `AcademicAI Advisor.md` berisi Product Requirements Document (PRD) yang
  menjelaskan kebutuhan, rancangan, alur, dan kriteria penerimaan sistem.
- `arsitektur hi level academicai sisfor.drawio.png` adalah diagram arsitektur
  tingkat tinggi.
- `STRUKTUR-REPOSITORI.md` adalah dokumen ini.

## Menjalankan Project Secara Lokal

Install dependency dan jalankan backend:

```powershell
cd backend
npm install
node src/index.js
```

Jalankan frontend pada terminal lain:

```powershell
cd frontend
npm install
npm run dev
```

Frontend secara default dapat diakses melalui `http://localhost:3000`, sedangkan
backend menggunakan port `5000` apabila tidak ada konfigurasi `PORT`.
