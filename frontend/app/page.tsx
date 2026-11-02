import AdvisorChat from '@/components/AdvisorChat';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    🎓 AcademicAI Advisor
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Asisten pintar untuk perencanaan akademik dan konsultasi jurusan.
                </p>
                <AdvisorChat studentId="demo-student-123" />
            </div>
        </main>
    );
}