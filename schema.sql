-- Schema for RD Studio Database in Supabase

-- Projects (Portfolio) Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    client VARCHAR(255),
    technology VARCHAR(100)[],
    image_url TEXT,
    live_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

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
('Starter (Landing Page)', 'Halaman promosi satu halaman, cocok untuk produk tunggal atau startup awal.', 'Rp 250.000', ARRAY['1 Halaman Responsif', 'Desain UI Kustom', 'Integrasi Chat WhatsApp', 'Free Hosting & Domain (.com) 1 Thn', 'Basic SEO Setup']),
('Business (Company Profile)', 'Website profil bisnis lengkap dengan halaman layanan, kontak, dan blog untuk melebarkan pasar.', 'Rp 750.000', ARRAY['Hingga 10 Halaman', 'Desain Premium & Animasi', 'Admin Panel (Kelola Konten)', 'Free Hosting & Domain Premium 1 Thn', 'Advance SEO & Analytics']),
('Premium (E-Commerce / Custom)', 'Sistem dashboard, autentikasi user, kelola inventori, dan pemesanan online kustom.', 'Rp 2.000.000+', ARRAY['Halaman Tak Terbatas', 'Dashboard Admin & User', 'Sistem Pembayaran / Autentikasi', 'Desain UI/UX Eksklusif', 'Dukungan Maintenance 6 Bulan']);

-- Insert dummy data for Projects
INSERT INTO projects (title, category, description, client, technology, image_url, live_url) VALUES
('Nexus Corporate', 'Company', 'Website perusahaan teknologi tinggi dengan animasi transisi yang sangat halus dan layout minimalis.', 'Nexus Tech', ARRAY['Next.js', 'Tailwind CSS', 'Framer Motion'], 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600', '#'),
('Rdev Shop', 'Dashboard', 'Platform belanja online dengan integrasi pembayaran otomatis dan desain elegan.', 'Rdev Shop Inc', ARRAY['React', 'Supabase', 'Tailwind CSS'], 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600', '#'),
('EduGrade School', 'School', 'Sistem portal web sekolah interaktif untuk data guru, murid, dan pengumuman kegiatan sekolah.', 'EduGrade Academic', ARRAY['Next.js', 'PostgreSQL'], 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600', '#');

-- Insert dummy data for FAQs
INSERT INTO faqs (question, answer, category) VALUES
('Berapa lama waktu pengerjaan website?', 'Untuk Landing Page berkisar antara 3-7 hari, sedangkan Company Profile biasa memakan waktu 7-14 hari kerja tergantung dari kelengkapan konten dan tingkat kerumitan desain.', 'Timeline'),
('Apakah harga sudah termasuk domain dan hosting?', 'Ya, semua paket yang kami sediakan sudah termasuk lisensi domain (.com / .id) dan hosting cloud premium selama 1 tahun pertama.', 'Harga'),
('Bagaimana jika saya ingin menambahkan fitur kustom di kemudian hari?', 'Website kami dibangun menggunakan Next.js dan Supabase yang sangat modular (scalable), sehingga memudahkan penambahan fitur baru di masa mendatang tanpa perlu membuat ulang dari awal.', 'Lainnya');
