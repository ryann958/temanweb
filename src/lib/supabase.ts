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
    description: 'Website perusahaan teknologi tinggi dengan animasi transisi yang sangat halus dan layout minimalis.',
    client: 'Nexus Tech',
    technology: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600',
    live_url: '#'
  },
  {
    id: '2',
    title: 'Rdev Shop',
    category: 'Dashboard',
    description: 'Platform belanja online dengan integrasi pembayaran otomatis dan desain elegan.',
    client: 'Rdev Shop Inc',
    technology: ['React', 'Supabase', 'Tailwind CSS'],
    image_url: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600',
    live_url: '#'
  },
  {
    id: '3',
    title: 'EduGrade School',
    category: 'School',
    description: 'Sistem portal web sekolah interaktif untuk data guru, murid, dan pengumuman kegiatan sekolah.',
    client: 'EduGrade Academic',
    technology: ['Next.js', 'PostgreSQL'],
    image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600',
    live_url: '#'
  }
];

export const mockServices = [
  {
    id: '1',
    title: 'Starter (Landing Page)',
    description: 'Halaman promosi satu halaman, cocok untuk produk tunggal atau startup awal.',
    price: 'Rp 359.000',
    original_price: 'Rp 450.000',
    discount_label: 'Hemat 20%',
    features: ['1 Halaman Responsif', 'Desain UI Kustom', 'Integrasi Chat WhatsApp', 'Free Hosting & Domain (.my.id) 1 Thn', 'Basic SEO Setup']
  },
  {
    id: '2',
    title: 'Business (Company Profile)',
    description: 'Website profil bisnis lengkap dengan halaman layanan, kontak, dan blog untuk melebarkan pasar.',
    price: 'Rp 1.099.000',
    original_price: 'Rp 1.500.000',
    discount_label: 'Hemat 26%',
    features: ['Hingga 5 Halaman', 'Desain Premium & Animasi', 'Admin Panel (Kelola Konten)', 'Free Hosting & Domain Premium 1 Thn', 'Advance SEO & Analytics']
  },
  {
    id: '3',
    title: 'Premium (E-Commerce / Custom)',
    description: 'Sistem dashboard, autentikasi user, kelola inventori, dan pemesanan online kustom.',
    price: 'Rp 2.000.000+',
    features: ['Halaman Tak Terbatas', 'Dashboard Admin & User', 'Sistem Pembayaran / Autentikasi', 'Desain UI/UX Eksklusif', 'Dukungan Maintenance 6 Bulan']
  }
];

export const mockFaqs = [
  {
    id: '1',
    question: 'Berapa lama waktu pengerjaan website?',
    answer: 'Untuk Landing Page berkisar antara 3-7 hari, sedangkan Company Profile biasa memakan waktu 7-14 hari kerja tergantung dari kelengkapan konten dan tingkat kerumitan desain.',
    category: 'Timeline'
  },
  {
    id: '2',
    question: 'Apakah harga sudah termasuk domain dan hosting?',
    answer: 'Ya, semua paket yang kami sediakan sudah termasuk lisensi domain (.my.id / .com / .id) dan hosting cloud premium selama 1 tahun pertama.',
    category: 'Harga'
  },
  {
    id: '3',
    question: 'Bagaimana jika saya ingin menambahkan fitur kustom di kemudian hari?',
    answer: 'Website kami dibangun menggunakan Next.js dan Supabase yang sangat modular (scalable), sehingga memudahkan penambahan fitur baru di masa mendatang tanpa perlu membuat ulang dari awal.',
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
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600'
  },
  {
    id: '2',
    title: 'Panduan Memilih Domain Terbaik untuk Brand Baru',
    description: 'Domain adalah identitas digital Anda. Temukan tips memilih nama yang memorable dan profesional.',
    category: 'Website',
    date: '2026-06-20',
    image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600'
  }
];
