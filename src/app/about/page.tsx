"use client";

import { Compass, Target, Code, Cpu, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    { icon: <Compass className="h-6 w-6 text-blue-600" />, title: "Visi Kami", desc: "Menjadi mitra terpercaya dalam mendigitalisasi bisnis di Indonesia dengan standard global, estetik, dan performa tinggi." },
    { icon: <Target className="h-6 w-6 text-blue-600" />, title: "Misi Kami", desc: "Membangun produk digital berkualitas tinggi yang memberikan konversi nyata dan mendongkrak omset pemasaran bagi mitra kami." },
    { icon: <Heart className="h-6 w-6 text-blue-600" />, title: "Nilai Kami", desc: "Kejujuran dalam penawaran harga, ketepatan waktu rilis, kerapian struktur kode, dan ketanggapan bantuan teknis." }
  ];

  const technologies = [
    { name: "Next.js & React", type: "Frontend Framework" },
    { name: "TypeScript", type: "Programming Language" },
    { name: "Tailwind CSS", type: "CSS Styling Utility" },
    { name: "Framer Motion", type: "Animation Library" },
    { name: "Supabase & Postgres", type: "Database & Backend Service" },
    { name: "Vercel", type: "Deployment & CDN" }
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
      <div className="absolute top-20 left-10 w-[400px] h-[400px] glow-bg opacity-15 pointer-events-none z-0"></div>

      {/* Hero / Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Tentang Kami</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Kisah TemanWeb</h1>
          <p className="text-slate-650 text-base md:text-lg leading-relaxed">
            TemanWeb didirikan sekitar 1 tahun yang lalu atas dasar hasrat besar terhadap teknologi web yang bersih, cepat, dan bernilai jual tinggi. Berawal dari sekumpulan pengembang independen di Kepulauan Meranti yang sering membantu UMKM lokal mendigitalisasi usaha mereka secara sukarela, kami melihat banyak pemilik bisnis memiliki produk hebat namun kesulitan mempresentasikannya secara profesional di media online.
          </p>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Melihat kebutuhan pasar yang sangat tinggi akan website berkualitas dengan harga bersahabat, kami memutuskan untuk resmi mendirikan TemanWeb. Kami memadukan keahlian desain antarmuka modern (UI/UX) dengan kehandalan backend Next.js & Supabase untuk melahirkan website berkecepatan kilat yang mengubah pengunjung biasa menjadi pelanggan setia. Kini, kami berfokus membantu ratusan bisnis di seluruh Indonesia bertumbuh secara digital dengan sistem yang tangguh, responsif, dan aman.
          </p>
        </div>
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6 text-center shadow-sm">
          <div className="text-4xl font-extrabold text-slate-900">1+ Tahun</div>
          <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Membantu Bisnis Go Digital</div>
          <hr className="border-slate-200" />
          <div className="text-4xl font-extrabold text-slate-900">50+</div>
          <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Proyek Sukses Diluncurkan</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {values.map((val, idx) => (
          <motion.div 
            key={idx} 
            className="glass-card rounded-xl p-8 border border-slate-200 text-center space-y-4"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            variants={bounceCardVariants}
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2">
              {val.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{val.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{val.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 lg:p-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Teknologi Modern Yang Kami Gunakan</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {technologies.map((tech, idx) => (
            <motion.div 
              key={idx} 
              className="glass-card rounded-xl p-5 border border-slate-200 text-center space-y-2"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
              variants={bounceCardVariants}
            >
              <div className="text-sm font-bold text-slate-900 leading-tight">{tech.name}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{tech.type}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
