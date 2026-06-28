"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Check, Zap, Monitor, Search, Lock, Paintbrush,
  Settings, MessageSquare, ChevronDown, Send, PhoneCall, Star,
  GraduationCap, School, Store, Building2, ShoppingCart, Database
} from 'lucide-react';
import { supabase, mockProjects, mockServices, mockFaqs } from '@/lib/supabase';

export default function Home() {
  // Database States
  const [projects, setProjects] = useState(mockProjects);
  const [services, setServices] = useState(mockServices);
  const [faqs, setFaqs] = useState(mockFaqs);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    businessName: '',
    budget: 'Rp 350 Ribu - Rp 1 Juta',
    description: '',
    timeline: '1-2 Minggu'
  });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  // FAQ Accordion Active Index
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Scroll Listener for High Performance Fade (No React state re-renders)
  useEffect(() => {
    const bgElement = document.getElementById('hero-fading-bg');
    if (!bgElement) return;

    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / 600);
      bgElement.style.opacity = opacity.toString();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to sync state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch data on load
  useEffect(() => {
    async function fetchData() {
      if (!supabase) return;

      try {
        // Fetch projects
        const { data: dbProjects } = await supabase.from('projects').select('*').limit(3);
        if (dbProjects && dbProjects.length > 0) setProjects(dbProjects);

        // Fetch services
        const { data: dbServices } = await supabase.from('services').select('*');
        if (dbServices && dbServices.length > 0) setServices(dbServices);

        // Fetch faqs
        const { data: dbFaqs } = await supabase.from('faqs').select('*');
        if (dbFaqs && dbFaqs.length > 0) setFaqs(dbFaqs);
      } catch (err) {
        console.error("Error fetching data from Supabase:", err);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus({ type: null, message: '' });

    try {
      if (supabase) {
        const { error } = await supabase.from('messages').insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            whatsapp: formData.whatsapp,
            business_name: formData.businessName,
            budget: formData.budget,
            description: formData.description,
            timeline: formData.timeline
          }
        ]);
        if (error) throw error;
      } else {
        // Simulate local submission
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setFormStatus({
        type: 'success',
        message: `Halo ${formData.name}, pesan konsultasi Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.`
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        businessName: '',
        budget: 'Rp 350 Ribu - Rp 1 Juta',
        description: '',
        timeline: '1-2 Minggu'
      });
    } catch (err) {
      console.error(err);
      setFormStatus({
        type: 'error',
        message: 'Gagal mengirim pesan. Silakan coba kembali atau hubungi kami langsung via WhatsApp.'
      });
    } finally {
      setLoading(false);
    }
  };

  const whyChooseUs = [
    { icon: <Zap className="h-6 w-6 text-blue-500" />, title: "Development Cepat", desc: "Pengerjaan website terjadwal dengan rapi menggunakan workflow tangkas dan efisien." },
    { icon: <Monitor className="h-6 w-6 text-blue-500" />, title: "Desain Responsif", desc: "Tampilan otomatis menyesuaikan dengan sempurna baik di HP, tablet, maupun layar PC." },
    { icon: <Search className="h-6 w-6 text-blue-500" />, title: "Optimasi SEO", desc: "Struktur website modern yang ramah mesin pencari untuk mendongkrak visibilitas di Google." },
    { icon: <Lock className="h-6 w-6 text-blue-500" />, title: "Website Aman", desc: "Perlindungan database terenskripsi dan protokol SSL terintegrasi untuk keamanan website." },
    { icon: <Paintbrush className="h-6 w-6 text-blue-500" />, title: "Modern UI/UX", desc: "Interaksi antarmuka bergaya masa kini, estetik, dan berorientasi pada kepuasan pengguna." },
    { icon: <Settings className="h-6 w-6 text-blue-500" />, title: "Maintenance Support", desc: "Bantuan teknis pemeliharaan pasca-rilis untuk menjaga performa website selalu optimal." },
  ];

  const stats = [
    { number: "50+", label: "Proyek Selesai" },
    { number: "98%", label: "Klien Puas" },
    { number: "1+", label: "Tahun Pengalaman" },
    { number: "24/7", label: "Layanan Dukungan" }
  ];

  const processSteps = [
    { number: "01", title: "Konsultasi", desc: "Diskusikan ide, kebutuhan fitur, sitemap, dan sasaran bisnis yang ingin dicapai." },
    { number: "02", title: "Perencanaan", desc: "Penyusunan alur proyek, perumusan arsitektur website, dan penentuan timeline." },
    { number: "03", title: "Desain UI/UX", desc: "Pembuatan mockup visual web yang premium, modern, dan disetujui oleh klien." },
    { number: "04", title: "Development", desc: "Proses coding menggunakan Next.js & Supabase untuk performa secepat kilat." },
    { number: "05", title: "Pengujian", desc: "Audit kecepatan (PageSpeed), pengujian link, validasi form, dan pengecekan responsivitas." },
    { number: "06", title: "Peluncuran", desc: "Website di-onlinekan dengan domain utama dan didaftarkan ke Google Search Console." }
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
    <div className="relative min-h-screen grid-bg">

      {/* Hero Fading Background Image */}
      <div
        id="hero-fading-bg"
        className="absolute top-0 left-0 w-full h-[780px] pointer-events-none overflow-hidden z-0 transition-opacity duration-75 ease-out"
        style={{
          backgroundImage: "url('/hero-light-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      ></div>

      {/* Hero Background Accents */}
      <div className="absolute top-0 left-0 w-full h-[700px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-blue-100/40 blur-3xl opacity-60"></div>
        <div className="absolute top-[15%] left-[-10%] w-[450px] h-[450px] rounded-full bg-indigo-50/50 blur-3xl opacity-50"></div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] glow-bg opacity-15 pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] glow-bg opacity-10 pointer-events-none z-0"></div>

      {/* Hero Section - Matched to Reference Image */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight flex flex-col">
              <span className="stroke-title-white uppercase">Jasa Pembuatan</span>
              <span className="stroke-title-blue uppercase mt-1">Website</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              &ldquo;TemanWeb adalah partner terpercaya yang menyediakan layanan jasa pembuatan website profesional. Kami siap membantu mewujudkan website impian Anda, baik untuk kebutuhan personal maupun bisnis yang terus berkembang.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-base font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98"
              >
                Konsultasi Gratis <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-base font-bold bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 transition-all hover:border-slate-400 active:scale-98"
              >
                Lihat Portfolio <ArrowRight className="ml-2 h-5 w-5 text-slate-800" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative select-none">
            {/* Custom Responsive HTML/CSS Laptop Mockup - Matches Reference Image */}
            <div className="relative mx-auto w-full max-w-[460px] aspect-[16/10] bg-[#0d0e10] rounded-t-2xl p-[3.5%] shadow-2xl border border-slate-700/30">
              <div className="relative w-full h-full bg-white rounded overflow-hidden border border-black/80 flex">
                <img 
                  src="/mockup-screen.jpg" 
                  alt="Workspace Mockup" 
                  className="w-full h-full object-cover object-center" 
                />

              </div>
            </div>
            {/* Laptop Base */}
            <div className="relative mx-auto w-[114%] left-[-7%] h-[12px] bg-gradient-to-b from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] rounded-b-xl shadow-lg border-t border-white/20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[16%] h-[4px] bg-[#64748b] rounded-b-sm"></div>
            </div>
            <div className="relative mx-auto w-[100%] h-[6px] bg-black/10 blur-sm rounded-full mt-1"></div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-12 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">{stat.number}</div>
              <div className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Kelebihan Kami</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Mengapa Memilih Jasa Pembuatan Website Kami?</h2>
          <p className="text-slate-600 text-sm sm:text-base">Kami tidak hanya membuat website yang indah, tetapi juga berfokus pada kecepatan akses, keamanan, dan kepuasan pengunjung.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((feature, idx) => (
            <motion.div
              key={idx}
              className="glass-card rounded-xl p-6 border border-slate-200 hover:border-slate-350"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
              variants={bounceCardVariants}
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Specialized Web Types Section */}
      <section className="py-24 bg-white border-t border-slate-200/80 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Spesialisasi Kami</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Tipe Website Yang Kami Kerjakan</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Kami merancang dan mengembangkan berbagai kategori website spesifik untuk memenuhi berbagai kebutuhan digital Anda.
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
                  <p className="text-sm text-slate-600 leading-relaxed">{specialty.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Daftar Layanan</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Layanan Solusi Digital Terbaik</h2>
            <p className="text-slate-600 text-sm sm:text-base">Pilihan paket pembuatan website transparan yang disesuaikan untuk skala bisnis Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="glass-card rounded-2xl p-8 flex flex-col justify-between border border-slate-200"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}
                variants={bounceCardVariants}
              >
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl font-extrabold text-blue-600">{service.price}</span>
                      {service.original_price && (
                        <span className="text-sm text-slate-450 line-through font-medium">{service.original_price}</span>
                      )}
                    </div>
                    {service.discount_label && (
                      <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold bg-red-50 text-red-600 rounded-full border border-red-100">
                        {service.discount_label}
                      </span>
                    )}
                  </div>
                  <hr className="border-slate-200" />
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-slate-700">
                        <Check className="h-4 w-4 text-emerald-650 mr-3 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="block text-center py-3 rounded-lg text-sm font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 hover:border-slate-350 transition-colors shadow-sm"
                  >
                    Pilih Paket
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Karya Kami</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Hasil Pekerjaan Portofolio Terbaru</h2>
            <p className="text-slate-600 text-sm sm:text-base">Lihat bagaimana kami membantu bisnis berkembang dengan antarmuka digital yang memukau.</p>
          </div>
          <Link
            href="/portfolio"
            className="mt-4 md:mt-0 inline-flex items-center text-blue-650 hover:text-blue-750 font-bold"
          >
            Lihat Semua Portofolio <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="glass-card rounded-xl overflow-hidden p-0 border border-slate-200 hover:border-slate-300 transition-all"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
              variants={bounceCardVariants}
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image_url})` }}
              >
                <div className="w-full h-full bg-slate-950/20 backdrop-blur-[0.5px] hover:backdrop-blur-none transition-all flex items-end p-4">
                  <span className="px-3 py-1 text-xs font-bold bg-blue-650/90 text-white rounded-full uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technology.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded text-xs bg-slate-50 border border-slate-200 text-slate-655 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Alur Kerja</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Proses Pembuatan Website Rapi</h2>
            <p className="text-slate-600 text-sm sm:text-base">Dari diskusi konsep hingga website online secara bertahap dan teratur.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative glass-card rounded-xl p-6 border border-slate-200">
                <div className="text-4xl font-extrabold text-blue-600/15 mb-4">{step.number}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Review Klien</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Apa Kata Klien Kami?</h2>
          <p className="text-slate-600 text-sm sm:text-base">Ulasan tulus dari para pelaku bisnis yang telah mempercayakan pembuatan websitenya kepada kami.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 border border-slate-200 space-y-6">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <p className="text-slate-600 italic text-sm md:text-base leading-relaxed">
              &quot;Pembuatan Landing Page untuk bisnis kopi saya selesai lebih cepat dari estimasi. Hasil websitenya modern banget dan speed-nya kencang. Penjualan kami lewat chat WhatsApp naik signifikan sejak pakai web baru ini.&quot;
            </p>
            <div>
              <h4 className="font-bold text-slate-900">Andi Wibowo</h4>
              <p className="text-xs text-slate-500">Pemilik Kopi Seduh Premium</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-slate-200 space-y-6">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <p className="text-slate-600 italic text-sm md:text-base leading-relaxed">
              &quot;Sangat puas dengan pembuatan website Company Profile perusahaan kami. TemanWeb sangat sabar mendengarkan revisi desain dari kami dan responsif dalam memecahkan kendala domain/hosting.&quot;
            </p>
            <div>
              <h4 className="font-bold text-slate-900">Indah Safitri</h4>
              <p className="text-xs text-slate-500">CEO Nexus Corporate</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 px-6 lg:px-8" id="faq">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Tanya Jawab</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-sm sm:text-base">Pertanyaan umum seputar layanan pembuatan website di TemanWeb.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={faq.id}
                className="glass-card rounded-xl p-0 overflow-hidden border border-slate-200 hover:border-slate-350 transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-900 text-base md:text-lg">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform ${activeFaq === idx ? 'transform rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm md:text-base border-t border-slate-200/60 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section / Form */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Konsultasi Gratis</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Kirimkan Brief Proyek Anda</h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Hubungi kami untuk mendapatkan analisis gratis dan perkiraan anggaran terbaik untuk website Anda. Anda juga bisa langsung chat kami via WhatsApp.
            </p>
            <div className="space-y-4 pt-4">
              <a
                href="https://wa.me/6281363799776?text=Halo%20TemanWeb%2C%20saya%20tertarik%20untuk%20berkonsultasi%20mengenai%20jasa%20pembuatan%20website.%0A%0ABerikut%20detail%20rencana%20proyek%20saya%3A%0A-%20Nama%3A%20%0A-%20Nama%20Bisnis%3A%20%0A-%20Estimasi%20Budget%3A%20%0A-%20Deskripsi%20Kebutuhan%3A%20%0A%0AMohon%20informasi%20lebih%20lanjut.%20Terima%20kasih%21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/10 transition-colors"
              >
                <PhoneCall className="mr-2 h-4 w-4" /> Hubungi via WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 border border-slate-200/80 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Formulir Pengajuan Proyek</h3>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Lengkap</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nama Anda"
                      className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Alamat Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@contoh.com"
                      className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nomor WhatsApp</label>
                    <input
                      type="text"
                      id="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="0812xxxxxx"
                      className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="businessName" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Perusahaan / Bisnis</label>
                    <input
                      type="text"
                      id="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Nama Bisnis Anda (opsional)"
                      className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimasi Budget</label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    >
                      <option>Rp 350 Ribu - Rp 1 Juta</option>
                      <option>Rp 1 Juta - Rp 3 Juta</option>
                      <option>Rp 3 Juta - Rp 7 Juta</option>
                      <option>Rp 7 Juta - Rp 15 Juta</option>
                      <option>Di atas Rp 15 Juta</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="timeline" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Batas Waktu Proyek</label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    >
                      <option>1-2 Minggu</option>
                      <option>2-4 Minggu</option>
                      <option>1-2 Bulan</option>
                      <option>2 Bulan+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deskripsi Kebutuhan</label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Deskripsikan fitur-fitur website yang Anda perlukan..."
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  ></textarea>
                </div>

                {formStatus.type && (
                  <div className={`p-4 rounded-lg text-sm ${formStatus.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-750'
                    }`}>
                    {formStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98"
                >
                  {loading ? 'Mengirim...' : 'Kirim Pengajuan'} <Send className="ml-2 h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6281363799776?text=Halo%20TemanWeb%2C%20saya%20tertarik%20untuk%20berkonsultasi%20mengenai%20jasa%20pembuatan%20website.%0A%0ABerikut%20detail%20rencana%20proyek%20saya%3A%0A-%20Nama%3A%20%0A-%20Nama%20Bisnis%3A%20%0A-%20Estimasi%20Budget%3A%20%0A-%20Deskripsi%20Kebutuhan%3A%20%0A%0AMohon%20informasi%20lebih%20lanjut.%20Terima%20kasih%21"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-transform hover:scale-110 focus:outline-none flex items-center justify-center"
        aria-label="Chat WhatsApp"
      >
        <MessageSquare className="h-6 w-6 fill-current" />
      </a>
    </div>
  );
}
