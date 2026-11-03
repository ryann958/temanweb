-- Schema for RD Studio Database in Supabase

-- Projects (Portfolio) Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    client VARCHAR(255),
    technology VARCHAR(100)[],
    features TEXT[],
    image_url TEXT,
    live_url TEXT,
    project_type VARCHAR(50) NOT NULL DEFAULT 'Demo Concept',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE projects ADD COLUMN IF NOT EXISTS features TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type VARCHAR(50) NOT NULL DEFAULT 'Demo Concept';

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price VARCHAR(100) NOT NULL,
    features TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    business_name VARCHAR(255),
    budget VARCHAR(100),
    description TEXT NOT NULL,
    timeline VARCHAR(100),
    status VARCHAR(50) DEFAULT 'New', -- 'New', 'In Progress', 'Resolved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy data for Services
INSERT INTO services (title, description, price, features) VALUES
('Starter (Landing Page)', 'Halaman promosi satu halaman, cocok untuk produk tunggal atau layanan.', 'Rp 359.000', ARRAY['1 Halaman Responsif', 'Desain UI Kustom', 'Integrasi Chat WhatsApp', 'Hosting & Domain .my.id selama 1 Tahun', 'SEO Dasar', 'Maksimal 2 Kali Revisi']),
('Business (Company Profile)', 'Website profil bisnis hingga lima halaman dengan informasi layanan dan kontak.', 'Rp 1.099.000', ARRAY['Hingga 5 Halaman', 'Desain UI/UX Kustom', 'CMS Blog sesuai ruang lingkup', 'Hosting & Domain Premium selama 1 Tahun', 'SEO On-Page', 'Dukungan Pemeliharaan 3 Bulan', 'Maksimal 4 Kali Revisi']),
('Premium (E-Commerce / Custom)', 'Website dengan fitur, database, dashboard, atau toko online yang direncanakan sesuai kebutuhan.', 'Rp 2.000.000+', ARRAY['Jumlah Halaman dan Fitur sesuai Ruang Lingkup', 'Autentikasi sesuai kebutuhan', 'Integrasi Pembayaran sesuai Penawaran', 'Dashboard Kelola Data sesuai kebutuhan', 'Dukungan Pemeliharaan 6 Bulan', 'Batas Revisi disepakati dalam Penawaran']);

-- Insert dummy data for Projects
INSERT INTO projects (title, category, description, client, technology, features, image_url, live_url, project_type) VALUES
('Nexus Corporate', 'Company', 'Konsep website company profile untuk menunjukkan struktur informasi layanan, profil, dan kanal kontak. Bukan proyek klien.', 'Demo concept', ARRAY['Next.js', 'Tailwind CSS', 'Framer Motion'], ARRAY['Profil perusahaan', 'Informasi layanan', 'Kontak bisnis'], '/hero-light-bg.png', NULL, 'Demo Concept'),
('Rdev Shop', 'E-Commerce', 'Konsep katalog produk dengan penjelajahan kategori dan alur pemesanan. Demo ini bukan proyek klien.', 'Demo concept', ARRAY['React', 'Supabase', 'Tailwind CSS'], ARRAY['Katalog produk', 'Kategori barang', 'Alur pemesanan'], '/hero-light-bg.png', NULL, 'Demo Concept'),
('EduGrade School', 'School', 'Konsep portal sekolah untuk menyajikan profil, program pendidikan, pengumuman, dan informasi pendaftaran. Bukan proyek klien.', 'Demo concept', ARRAY['Next.js', 'PostgreSQL'], ARRAY['Profil sekolah', 'Pengumuman', 'Informasi pendaftaran'], '/hero-light-bg.png', NULL, 'Demo Concept'),
('Katalog UMKM Lokal', 'UMKM', 'Konsep halaman usaha untuk mengenalkan cerita, pilihan produk, dan cara memesan.', 'Demo concept', ARRAY['Next.js', 'Tailwind CSS'], ARRAY['Profil usaha', 'Katalog produk', 'Tautan pemesanan'], '/hero-light-bg.png', NULL, 'Demo Concept');

-- Insert dummy data for FAQs
INSERT INTO faqs (question, answer, category) VALUES
('Berapa biaya pembuatan website?', 'Harga awal mulai dari Rp 359.000 untuk landing page, Rp 1.099.000 untuk company profile, dan Rp 2.000.000+ untuk kebutuhan custom. Harga akhir mengikuti ruang lingkup yang disepakati.', 'Harga'),
('Apakah harga sudah termasuk domain dan hosting?', 'Paket Starter mencakup domain .my.id dan hosting selama 1 tahun. Paket Business mencakup domain premium dan hosting selama 1 tahun; pilihan domain dikonfirmasi terlebih dahulu.', 'Harga'),
('Berapa lama proses pengerjaan?', 'Jadwal pengerjaan bergantung pada ruang lingkup dan kesiapan materi. Estimasi jadwal akan disampaikan bersama penawaran sebelum pekerjaan dimulai.', 'Timeline');
