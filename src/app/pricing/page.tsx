"use client";

import { Check, PhoneCall, GraduationCap, School, Store, Building2, ShoppingCart, Database } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PricingPage() {
  const plans = [
    {
      name: "Starter (Landing Page)",
      price: "Rp 359.000",
      originalPrice: "Rp 450.000",
      discountLabel: "Hemat 20%",
      description: "Satu halaman profesional, cocok untuk peluncuran produk tunggal atau promosi jasa.",
      features: [
        "1 Halaman Responsif",
        "Desain UI Kustom (Bukan Template)",
        "Integrasi Chat WhatsApp",
        "Formulir Kontak Dasar",
        "Basic SEO Setup",
        "Free Hosting & Domain .my.id 1 Thn",
        "Revisi 2 Kali"
      ]
    },
    {
      name: "Business (Company Profile)",
      price: "Rp 1.099.000",
      originalPrice: "Rp 1.500.000",
      discountLabel: "Hemat 26%",
      description: "Website profil lengkap untuk memperkuat citra perusahaan Anda di mesin pencari.",
      popular: true,
      features: [
        "Hingga 5 Halaman Informasi",
        "Desain UI/UX Premium & Animasi",
        "CMS Blog (Kelola Konten)",
        "Google Analytics Integration",
        "Advance SEO Setup (On-Page)",
        "Free Hosting & Domain Premium 1 Thn",
        "Dukungan Pemeliharaan 3 Bulan",
        "Revisi 4 Kali"
      ]
    },
    {
      name: "Premium (Custom / E-Commerce)",
      price: "Rp 2.000.000+",
      description: "Website dengan fungsionalitas kompleks, database kustom, dashboard, atau sistem toko online.",
      features: [
        "Jumlah Halaman Tak Terbatas",
        "Sistem Autentikasi User & Admin",
        "Integrasi Payment Gateway / Ongkir",
        "Dashboard Kelola Data Kustom",
        "Keamanan Database Supabase",
        "SEO Khusus & Optimasi Kecepatan Ekstrem",
        "Dukungan Pemeliharaan 6 Bulan",
        "Revisi Tak Terbatas"
      ]
    }
  ];
  const specialties = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Web Portofolio Kuliah & Biodata CV",
      desc: "Halaman portofolio digital mahasiswa/profesional untuk menampilkan biodata, riwayat pendidikan, keahlian, tugas besar, sertifikat, dan CV interaktif agar terlihat menonjol bagi perekrut kerja."
    },
    {
      icon: <School className="h-6 w-6" />,
      title: "Portal Sekolah & Akademi",
      desc: "Website resmi sekolah, pesantren, bimbel, yayasan, atau institusi akademik lainnya lengkap dengan profil, direktori guru, informasi pendaftaran siswa baru, info berita kegiatan, dan galeri."
    },
    {
      icon: <Store className="h-6 w-6" />,
      title: "Landing Page Jasa & UMKM",
      desc: "Halaman promosi cepat saji berfokus konversi tinggi untuk mengenalkan produk fisik tunggal, jasa konsultasi, e-book, atau rintisan awal startup agar prospek langsung terhubung ke WhatsApp."
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Company Profile Bisnis",
      desc: "Website resmi profil perusahaan untuk meningkatkan kredibilitas brand, mempresentasikan produk/layanan utama, galeri proyek selesai, tim, kisah pendirian, serta halaman kontak resmi."
    },
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Toko Online & E-Commerce",
      desc: "Sistem katalog penjualan online lengkap dengan keranjang belanja, integrasi penghitungan ongkir otomatis, checkout via WhatsApp dinamis, hingga integrasi payment gateway (Midtrans)."
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Aplikasi Web & Dashboard Custom",
      desc: "Sistem pengelolaan data berbasis web, ERP sederhana, manajemen inventori gudang, dashboard visual analisis data penjualan, hingga portal komunitas berlisensi database terstruktur."
    }
  ];

  const bounceCardVariants = {
    offscreen: {
      y: 40,
      opacity: 0,
      scale: 0.95
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.35,
        duration: 0.8
      }
    }
  };

  return (
    <div className="relative min-h-screen py-16 px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] glow-bg opacity-10 pointer-events-none z-0"></div>

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Rencana Harga</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Investasi Terbaik Untuk Bisnis Anda</h1>
        <p className="text-slate-655 font-medium">
          Daftar harga pembuatan website transparan tanpa biaya tersembunyi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div 
            key={idx} 
            className={`glass-card rounded-2xl p-8 flex flex-col justify-between border relative transition-all ${
              plan.popular 
                ? 'border-blue-550 shadow-xl shadow-blue-550/15 scale-105 md:-translate-y-2 bg-white/90' 
                : 'border-slate-200 hover:border-slate-350'
            }`}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            variants={bounceCardVariants}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-650 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                Paling Populer
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-sm text-slate-450 line-through font-medium">{plan.originalPrice}</span>
                  )}
                </div>
                {plan.discountLabel && (
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold bg-red-50 text-red-600 rounded-full border border-red-100">
                    {plan.discountLabel}
                  </span>
                )}
                <p className="text-xs text-slate-500 font-bold">Sekali bayar</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{plan.description}</p>
              <hr className="border-slate-200" />
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-slate-655">
                    <Check className="h-4.5 w-4.5 text-emerald-650 mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Link 
                href="/contact" 
                className={`block text-center py-3 rounded-lg text-sm font-bold transition-all ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10'
                    : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 hover:border-slate-350'
                }`}
              >
                Pesan Sekarang
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Specialized Web Types Section */}
      <div className="mt-24 border-t border-slate-200/80 pt-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Spesialisasi Kami</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tipe Website Yang Kami Kerjakan</h2>
          <p className="text-slate-605">
            Berikut adalah detail kategori website spesifik yang sering dipesan oleh klien kami:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((specialty, idx) => (
            <motion.div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-slate-200 hover:border-slate-350 flex flex-col justify-between"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
              variants={bounceCardVariants}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  {specialty.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{specialty.title}</h3>
                <p className="text-sm text-slate-655 leading-relaxed">{specialty.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enterprise section */}
      <div className="glass-card rounded-2xl p-8 lg:p-12 border border-slate-200 mt-16 max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-slate-900">Butuh Solusi Custom / Enterprise?</h3>
          <p className="text-sm text-slate-600 max-w-md">
            Jika Anda membutuhkan website berskala besar, portal dinamis, atau sistem e-commerce berskala korporat, mari diskusikan kebutuhan Anda secara mendalam.
          </p>
        </div>
        <a 
          href="https://wa.me/6281363799776?text=Halo%20TemanWeb%2C%20saya%20tertarik%20untuk%20berkonsultasi%20mengenai%20jasa%20pembuatan%20website%20kustom%20%28Custom%20%2F%20Enterprise%29.%0A%0AMohon%20informasi%20lebih%20lanjut%20mengenai%20langkah%20selanjutnya.%20Terima%20kasih%21"
          target="_blank"
          rel="noopener noreferrer" 
          className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
        >
          <PhoneCall className="mr-2 h-4.5 w-4.5" /> Konsultasi Custom
        </a>
      </div>
    </div>
  );
}
