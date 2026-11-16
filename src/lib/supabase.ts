import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client if credentials exist, otherwise log warning and return mock
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Mock Data for Local testing/fallback
export const mockProjects = [
  {
    id: '1',
    title: 'Nexus Corporate',
    category: 'Company',
    description: 'Konsep website company profile untuk menunjukkan struktur informasi layanan, profil, dan kanal kontak. Bukan proyek klien.',
    project_type: 'Demo Concept',
    features: ['Profil perusahaan', 'Informasi layanan', 'Kontak bisnis'],
    client: 'Demo concept',
    technology: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    image_url: '/hero-light-bg.png',
    live_url: ''
  },
  {
    id: '2',
    title: 'Rdev Shop',
    category: 'E-Commerce',
    description: 'Konsep katalog produk dengan penjelajahan kategori dan alur pemesanan. Demo ini bukan proyek klien.',
    project_type: 'Demo Concept',
    features: ['Katalog produk', 'Kategori barang', 'Alur pemesanan'],
    client: 'Demo concept',
    technology: ['React', 'Supabase', 'Tailwind CSS'],
    image_url: '/hero-light-bg.png',
    live_url: ''
  },
  {
    id: '3',
    title: 'EduGrade School',
    category: 'School',
    description: 'Konsep portal sekolah untuk menyajikan profil, program pendidikan, pengumuman, dan informasi pendaftaran. Bukan proyek klien.',
    project_type: 'Demo Concept',
    features: ['Profil sekolah', 'Pengumuman', 'Informasi pendaftaran'],
    client: 'Demo concept',
    technology: ['Next.js', 'PostgreSQL'],
    image_url: '/hero-light-bg.png',
    live_url: ''
  },
  {
    id: '4',
    title: 'Katalog UMKM Lokal',
    category: 'UMKM',
    description: 'Konsep halaman usaha untuk mengenalkan cerita, pilihan produk, dan cara memesan.',
    project_type: 'Demo Concept',
    features: ['Profil usaha', 'Katalog produk', 'Tautan pemesanan'],
    client: 'Demo concept',
    technology: ['Next.js', 'Tailwind CSS'],
    image_url: '/hero-light-bg.png',
    live_url: ''
  }
];

export const mockServices = [
  {
    id: '1',
    title: 'Starter (Landing Page)',
    description: 'Halaman promosi satu halaman, cocok untuk produk tunggal atau startup awal.',
    price: 'Rp 359.000',
    features: ['1 Halaman Responsif', 'Desain UI Kustom', 'Integrasi Chat WhatsApp', 'Hosting & Domain .my.id selama 1 Tahun', 'SEO Dasar', 'Maksimal 2 Kali Revisi']
  },
  {
    id: '2',
    title: 'Business (Company Profile)',
    description: 'Website profil bisnis lengkap dengan halaman layanan, kontak, dan blog untuk melebarkan pasar.',
    price: 'Rp 1.099.000',
    features: ['Hingga 5 Halaman', 'Desain UI/UX Kustom', 'CMS Blog sesuai ruang lingkup', 'Hosting & Domain Premium selama 1 Tahun', 'SEO On-Page & Analytics', 'Dukungan Pemeliharaan 3 Bulan', 'Maksimal 4 Kali Revisi']
  },
  {
    id: '3',
    title: 'Premium (E-Commerce / Custom)',
    description: 'Sistem dashboard, autentikasi user, kelola inventori, dan pemesanan online kustom.',
    price: 'Rp 2.000.000+',
    features: ['Jumlah Halaman dan Fitur sesuai Ruang Lingkup', 'Dashboard sesuai kebutuhan', 'Integrasi Pembayaran sesuai Penawaran', 'Domain & Hosting ditentukan berdasarkan kebutuhan', 'Dukungan Pemeliharaan 6 Bulan', 'Batas Revisi disepakati dalam Penawaran']
  }
];

export const mockFaqs = [
  {
    id: '1',
    question: 'Berapa biaya pembuatan website?',
    answer: 'Harga awal mulai dari Rp 359.000 untuk landing page, Rp 1.099.000 untuk company profile, dan Rp 2.000.000+ untuk kebutuhan custom. Harga akhir mengikuti ruang lingkup yang disepakati.',
    category: 'Timeline'
  },
  {
    id: '2',
    question: 'Apakah harga sudah termasuk domain dan hosting?',
    answer: 'Paket Starter mencakup domain .my.id dan hosting selama 1 tahun. Paket Business mencakup domain premium dan hosting selama 1 tahun; pilihan domain dikonfirmasi terlebih dahulu.',
    category: 'Harga'
  },
  {
    id: '3',
    question: 'Berapa lama proses pengerjaan?',
    answer: 'Jadwal pengerjaan bergantung pada ruang lingkup dan kesiapan materi. Estimasi jadwal akan disampaikan bersama penawaran sebelum pekerjaan dimulai.',
    category: 'Lainnya'
  }
];

export const mockBlogs = [
  {
    id: '1',
    title: 'Pentingnya Kecepatan Website untuk Konversi Bisnis Anda',
    description: 'Kecepatan website memengaruhi peringkat Google dan kenyamanan pengunjung. Pelajari cara memperbaikinya.',
    category: 'SEO',
    date: '2026-06-25',
    image_url: '/hero-light-bg.png'
  },
  {
    id: '2',
    title: 'Panduan Memilih Domain Terbaik untuk Brand Baru',
    description: 'Domain adalah identitas digital Anda. Temukan tips memilih nama yang memorable dan profesional.',
    category: 'Website',
    date: '2026-06-20',
    image_url: '/mockup-screen.jpg'
  }
];
