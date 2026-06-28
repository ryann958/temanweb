"use client";

import { useState } from 'react';
import { Check, ArrowRight, Zap, Code, Shield, Sparkles, Database, Layout, GraduationCap, School, Store, Building2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  const services = [
    {
      title: "Landing Page Jasa / Produk",
      icon: <Zap className="h-8 w-8 text-blue-650" />,
      price: "Mulai dari Rp 359.000",
      originalPrice: "Rp 450.000",
      discountLabel: "Hemat 20%",
      description: "Halaman satu kolom teroptimasi tinggi yang dirancang khusus untuk meningkatkan rasio konversi produk atau jasa Anda.",
      features: [
        "Desain Kustom Eksklusif (Tidak pakai template pasaran)",
        "Responsif Sempurna di HP & Tablet",
        "Formulir Kontak Terintegrasi ke Email/WhatsApp",
        "Pemuatan Halaman Cepat (< 1.5 Detik)",
        "Setup Google Analytics & Tag Manager",
        "Gratis Hosting & Domain .my.id selama 1 Tahun"
      ]
    },
    {
      title: "Company Profile (Profil Bisnis)",
      icon: <Layout className="h-8 w-8 text-blue-650" />,
      price: "Mulai dari Rp 1.099.000",
      originalPrice: "Rp 1.500.000",
      discountLabel: "Hemat 26%",
      description: "Website profesional multi-halaman untuk merepresentasikan visi, misi, portofolio, dan jasa lengkap perusahaan Anda.",
      features: [
        "Desain UI/UX Eksklusif & Animasi Transisi",
        "Hingga 5 Halaman Informasi Lengkap",
        "CMS Sederhana untuk Kelola Artikel/Berita Perusahaan",
        "Struktur Navigasi Bersih & Profesional",
        "Integrasi Peta Google & Kontak WhatsApp",
        "Konsultasi & Garansi Pemeliharaan 3 Bulan"
      ]
    },
    {
      title: "Aplikasi Web Kustom & Dashboard",
      icon: <Database className="h-8 w-8 text-blue-650" />,
      price: "Mulai dari Rp 2.000.000+",
      description: "Sistem aplikasi backend kompleks, dashboard pengelolaan data, integrasi API, dan autentikasi pengguna yang aman.",
      features: [
        "Arsitektur database PostgreSQL berkinerja tinggi",
        "Sistem Autentikasi User & Hak Akses Admin",
        "Dashboard Panel Kontrol & Grafik Analitik Visual",
        "Keamanan Data Terenkripsi",
        "Integrasi Layanan Pihak Ketiga (Midtrans, Cloudinary, dll.)",
        "Dukungan Skalabilitas & Maintenance Berkelanjutan"
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
      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] glow-bg opacity-15 pointer-events-none z-0"></div>

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Layanan Kami</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Solusi Digital Pembuatan Website Premium</h1>
        <p className="text-slate-600">
          Kami menyediakan jasa pembuatan website end-to-end yang dibangun menggunakan teknologi modern Next.js dan Supabase untuk performa secepat kilat.
        </p>
      </div>

      {/* Services Grid */}
      <div className="space-y-12">
        {services.map((service, idx) => (
          <motion.div 
            key={idx} 
            className="glass-card rounded-2xl p-8 lg:p-12 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            variants={bounceCardVariants}
          >
            <div className="lg:col-span-7 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                {service.icon}
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900">{service.title}</h2>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-lg font-extrabold text-blue-600">{service.price}</span>
                  {service.originalPrice && (
                    <span className="text-xs text-slate-450 line-through font-medium">{service.originalPrice}</span>
                  )}
                  {service.discountLabel && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-red-50 text-red-600 rounded-full border border-red-100">
                      {service.discountLabel}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-slate-600 text-sm lg:text-base leading-relaxed">{service.description}</p>
              
              <div className="flex pt-2">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/10"
                >
                  Konsultasikan Proyek <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 rounded-xl p-6 lg:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Fitur & Keuntungan Utama:</h3>
              <ul className="space-y-3.5">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-slate-600">
                    <Check className="h-4.5 w-4.5 text-emerald-650 mr-3 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
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
            Selain paket utama di atas, kami memiliki keahlian mendalam untuk membangun website dengan fungsionalitas dan kategori spesifik berikut:
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
                <p className="text-sm text-slate-650 leading-relaxed">{specialty.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
