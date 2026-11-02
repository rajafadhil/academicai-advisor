'use client';
import { useState } from 'react';

interface Message { role: 'user' | 'assistant'; content: string; }

export default function AdvisorChat({ studentId }: { studentId: string }) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Halo! Saya AcademicAI. Ada yang bisa saya bantu terkait rencana studi Anda?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/advisor/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId, message: input })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-4 py-2 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && <div className="text-gray-500 italic">AI sedang mengetik...</div>}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text" value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder="Tanyakan tentang KRS, skripsi, dll..."
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    Kirim
                </button>
            </form>
        </div>
    );
}