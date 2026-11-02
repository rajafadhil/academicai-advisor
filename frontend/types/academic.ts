// types/academic.ts

export type NodeStatus = "COMPLETED" | "CURRENT" | "RECOMMENDED" | "UNTAKEN";

export interface Prerequisite {
  code: string;
  name: string;
  isFulfilled: boolean;
}

export interface RecommendationItem {
  courseCode: string;
  courseName: string;
  credits: number;
  semester: number;
  confidenceScore: number; // 0 - 100
  reasons: string[];
  careerBenefit: string;
  prerequisites: Prerequisite[];
  syllabusSnippet?: string;
}

export interface CourseNode {
  code: string;
  name: string;
  credits: number;
  semester: number;
  status: NodeStatus;
  grade?: string;
  prerequisites: string[];
  aiReason?: string;
  category?: "Wajib" | "Pilihan Peminatan" | "Umum";
}

export interface ConsultationHistoryItem {
  id: string;
  date: string;
  question: string;
  responsePreview: string;
  status: "PENDING" | "APPROVED" | "REVISED";
  dosenNotes?: string;
  dosenName?: string;
  recommendations: RecommendationItem[];
}

export const DUMMY_STUDENT = {
  nim: "2021080112",
  name: "Budi Santoso",
  major: "Teknik Informatika",
  currentSemester: 5,
  gpa: 3.52,
  completedCredits: 88,
  targetCredits: 144,
  careerInterest: "Machine Learning Engineer & Data Scientist",
  dosenWali: "Dr. Ani, M.Kom",
};

export const DUMMY_RECOMMENDATIONS: RecommendationItem[] = [
  {
    courseCode: "TI301",
    courseName: "Machine Learning",
    credits: 3,
    semester: 5,
    confidenceScore: 94,
    reasons: [
      "Sangat selaras dengan target minat karir Anda di bidang AI & Data Science.",
      "Prasyarat 'Basis Data' (A) dan 'Statistika & Probabilitas' (A) sudah Anda lulusi dengan predikat sangat baik.",
    ],
    careerBenefit: "Membuka jalur karir spesifik sebagai ML Engineer, Data Scientist, dan AI Researcher.",
    prerequisites: [
      { code: "TI201", name: "Struktur Data & Algoritma", isFulfilled: true },
      { code: "MAT202", name: "Statistika & Probabilitas", isFulfilled: true },
    ],
    syllabusSnippet: "Supervised Learning (Linear/Logistic Regression, Decision Tree, SVM), Unsupervised Learning (K-Means, PCA), Intro to Neural Networks & Scikit-Learn.",
  },
  {
    courseCode: "TI305",
    courseName: "Pemrosesan Bahasa Alami (NLP)",
    credits: 3,
    semester: 5,
    confidenceScore: 88,
    reasons: [
      "Mendukung fokus AI track Anda untuk riset tugas akhir di bidang Text Analytics.",
      "Prasyarat 'Kecerdasan Buatan Dasar' telah tuntas di Semester 4.",
    ],
    careerBenefit: "Kompetensi utama untuk industri LLM, Chatbot Engineer, dan Computational Linguist.",
    prerequisites: [
      { code: "TI208", name: "Kecerdasan Buatan Dasar", isFulfilled: true },
    ],
    syllabusSnippet: "Tokenization, N-Gram, Word Embeddings (Word2Vec), RNN/LSTM, Attention Mechanism, dan Fine-Tuning Transformer (BERT).",
  },
];

export const DUMMY_STUDY_PATH: CourseNode[] = [
  // Semester 1
  { code: "IF101", name: "Dasar Pemrograman", credits: 4, semester: 1, status: "COMPLETED", grade: "A", prerequisites: [] },
  { code: "MAT101", name: "Kalkulus I", credits: 3, semester: 1, status: "COMPLETED", grade: "B+", prerequisites: [] },
  { code: "IF102", name: "Sistem Komputer", credits: 3, semester: 1, status: "COMPLETED", grade: "A", prerequisites: [] },

  // Semester 2
  { code: "TI201", name: "Struktur Data & Algoritma", credits: 4, semester: 2, status: "COMPLETED", grade: "A", prerequisites: ["IF101"] },
  { code: "MAT202", name: "Statistika & Probabilitas", credits: 3, semester: 2, status: "COMPLETED", grade: "A", prerequisites: ["MAT101"] },
  { code: "IF203", name: "Aljabar Linear Matriks", credits: 3, semester: 2, status: "COMPLETED", grade: "B+", prerequisites: ["MAT101"] },

  // Semester 3
  { code: "TI204", name: "Basis Data Relasional", credits: 4, semester: 3, status: "COMPLETED", grade: "A", prerequisites: ["TI201"] },
  { code: "TI208", name: "Kecerdasan Buatan Dasar", credits: 3, semester: 3, status: "COMPLETED", grade: "A", prerequisites: ["TI201", "MAT202"] },
  { code: "IF206", name: "Pemrograman Web", credits: 3, semester: 3, status: "COMPLETED", grade: "A", prerequisites: ["TI201"] },

  // Semester 4
  { code: "TI210", name: "Rekayasa Perangkat Lunak", credits: 3, semester: 4, status: "COMPLETED", grade: "A", prerequisites: ["IF206"] },
  { code: "TI212", name: "Jaringan Komputer", credits: 3, semester: 4, status: "COMPLETED", grade: "B+", prerequisites: ["IF102"] },

  // Semester 5 (Berjalan & Rekomendasi)
  { code: "TI301", name: "Machine Learning", credits: 3, semester: 5, status: "RECOMMENDED", prerequisites: ["TI201", "MAT202"], aiReason: "Sangat direkomendasikan sesuai target karir ML Engineer dan nilai prasyarat A." },
  { code: "TI305", name: "Pemrosesan Bahasa Alami", credits: 3, semester: 5, status: "RECOMMENDED", prerequisites: ["TI208"], aiReason: "Mendukung kelanjutan topik tugas akhir bidang Natural Language Processing." },
  { code: "TI303", name: "Analisis & Perancangan Algoritma", credits: 3, semester: 5, status: "CURRENT", prerequisites: ["TI201"] },
  { code: "TI304", name: "Sistem Basis Data Lanjut", credits: 3, semester: 5, status: "CURRENT", prerequisites: ["TI204"] },

  // Semester 6 - 8 (Masa Depan)
  { code: "TI401", name: "Deep Learning & Vision", credits: 3, semester: 6, status: "UNTAKEN", prerequisites: ["TI301"] },
  { code: "TI402", name: "Big Data Analytics", credits: 3, semester: 6, status: "UNTAKEN", prerequisites: ["TI304"] },
  { code: "TI499", name: "Tugas Akhir / Skripsi", credits: 6, semester: 8, status: "UNTAKEN", prerequisites: ["TI301", "TI210"] },
];

export const DUMMY_CONSULTATIONS: ConsultationHistoryItem[] = [
  {
    id: "CONS-001",
    date: "28 Okt 2026",
    question: "Apakah saya sebaiknya mengambil Machine Learning dan NLP sekaligus di semester 5 ini?",
    responsePreview: "Direkomendasikan mengambil TI301 (Machine Learning) terlebih dahulu karena menjadi pondasi utama untuk TI401 di semester depan...",
    status: "APPROVED",
    dosenName: "Dr. Ani, M.Kom",
    dosenNotes: "Pilihan yang sangat tepat untuk persiapan skripsi bidang AI. Silakan diambil.",
    recommendations: DUMMY_RECOMMENDATIONS,
  },
  {
    id: "CONS-002",
    date: "15 Okt 2026",
    question: "Bagaimana jika saya ingin beralih fokus ke Cyber Security daripada Data Science?",
    responsePreview: "Jika berpindah ke Security, Anda perlu mengejar mata kuliah Kriptografi dan Keamanan Jaringan...",
    status: "REVISED",
    dosenName: "Dr. Ani, M.Kom",
    dosenNotes: "Pertimbangkan beban SKS karena prasyarat keamanan jaringan Anda baru lulus dengan nilai B.",
    recommendations: [],
  },
  {
    id: "CONS-003",
    date: "02 Nov 2026",
    question: "Rekomendasi mata kuliah pilihan untuk mendukung karir MLOps Engineer di semester 6",
    responsePreview: "AI merekomendasikan Cloud Computing & MLOps Pipeline dengan tingkat kesesuaian 92%...",
    status: "PENDING",
    recommendations: DUMMY_RECOMMENDATIONS,
  },
];
