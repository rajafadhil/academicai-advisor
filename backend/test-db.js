import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ connectionString: process.env.DATABASE_URL });

async function test() {
    console.log('🔌 Mencoba koneksi ke Supabase...');
    try {
        await client.connect();
        console.log('✅ SUKSES! Koneksi ke database berhasil.');

        const res = await client.query('SELECT NOW()');
        console.log('⏰ Waktu Server:', res.rows[0].now);
    } catch (err) {
        console.error('❌ GAGAL! Error:', err.message);
    } finally {
        await client.end();
    }
}
test();