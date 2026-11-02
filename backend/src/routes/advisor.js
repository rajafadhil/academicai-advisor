import express from 'express';
import { PrismaClient } from '@prisma/client';
// import { getAIResponse } from '../services/aiService.js'; 

const router = express.Router();
const prisma = new PrismaClient();

// Endpoint untuk konsultasi akademik
router.post('/chat', async (req, res) => {
    try {
        const { studentId, message } = req.body;

        // 1. Ambil konteks mahasiswa dari DB
        const student = await prisma.student.findUnique({ where: { id: studentId } });

        // 2. Panggil AI Service (Mock untuk keperluan slide)
        // const aiReply = await getAIResponse(student, message); 
        const aiReply = `Halo ${student.name}, berdasarkan IPK ${student.gpa} di jurusan ${student.major}, saya sarankan...`;

        // 3. Simpan riwayat chat ke DB
        await prisma.chatMessage.createMany({
            data: [
                { role: 'user', content: message, studentId },
                { role: 'assistant', content: aiReply, studentId }
            ]
        });

        res.json({ success: true, reply: aiReply });
    } catch (error) {
        res.status(500).json({ error: "Gagal memproses permintaan AI" });
    }
});

export default router;