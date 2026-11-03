"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  GraduationCap,
  Map,
  MonitorSmartphone,
  ShieldCheck,
  ShoppingBag,
  Store,
  Workflow,
} from "lucide-react";
import ProjectInquiryForm from "@/components/ProjectInquiryForm";
import WebsitePreview from "@/components/WebsitePreview";
import { mockProjects, mockServices, supabase } from "@/lib/supabase";
import { createWhatsAppUrl } from "@/lib/whatsapp";

type HomeProject = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string | null;
  live_url: string | null;
  project_type?: string | null;
};

const serviceCards = [
  {
    title: "Website UMKM",
    description: "Kenalkan produk, layanan, lokasi, dan cara memesan dalam halaman yang mudah dibuka.",
    features: ["Profil dan katalog", "Tombol WhatsApp", "Ramah perangkat mobile"],
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Website Sekolah",
    description: "Bantu orang tua dan calon siswa menemukan informasi sekolah melalui kanal resmi.",
    features: ["Profil dan program", "Berita dan pengumuman", "Info pendaftaran"],
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Company Profile",
    description: "Sajikan profil, layanan, dan informasi kontak perusahaan dengan lebih terstruktur.",
    features: ["Profil organisasi", "Ruang lingkup layanan", "Formulir kontak"],
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Website Desa",
    description: "Bagikan potensi wilayah, pengumuman, serta informasi layanan kepada masyarakat.",
    features: ["Profil dan potensi desa", "Informasi publik", "Kabar kegiatan"],
    icon: <Map className="h-5 w-5" />,
  },
  {
    title: "E-commerce",
    description: "Susun katalog dan alur pemesanan online sesuai produk serta proses usaha Anda.",
    features: ["Katalog produk", "Alur pesanan", "Pembayaran sesuai lingkup"],
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    title: "Custom Web Application",
    description: "Bangun sistem web untuk proses kerja khusus seperti dashboard dan pengelolaan data.",
    features: ["Fitur sesuai kebutuhan", "Alur kerja terencana", "Lingkup disepakati"],
    icon: <Workflow className="h-5 w-5" />,
  },
];

const trustPoints = [
  { title: "Desain sesuai kebutuhan", icon: <MonitorSmartphone className="h-5 w-5" /> },
  { title: "Responsif di berbagai perangkat", icon: <Check className="h-5 w-5" /> },
  { title: "Harga dan lingkup transparan", icon: <ShieldCheck className="h-5 w-5" /> },
  { title: "Konsultasi sebelum pengerjaan", icon: <ArrowRight className="h-5 w-5" /> },
];

const processSteps = [
  {
    title: "Konsultasi kebutuhan",
    description: "Ceritakan tujuan website, siapa penggunanya, dan hal yang ingin Anda sampaikan.",
  },
  {
    title: "Perencanaan dan penawaran",
    description: "Kami menyusun ruang lingkup, estimasi biaya, dan jadwal untuk Anda tinjau.",
  },
  {
    title: "Desain dan pengembangan",
    description: "Tampilan dan fitur dikerjakan sesuai rencana dengan pembaruan selama proses.",
  },
  {
    title: "Review dan revisi",
    description: "Anda meninjau hasil dan memberikan masukan sesuai jumlah revisi yang disepakati.",
  },
  {
    title: "Peluncuran website",
    description: "Setelah persetujuan akhir, website disiapkan untuk diluncurkan.",
  },
];

const faqs = [
  {
    question: "Berapa biaya pembuatan website?",
    answer: "Harga awal paket saat ini mulai dari Rp 359.000 untuk landing page, Rp 1.099.000 untuk company profile, dan Rp 2.000.000+ untuk kebutuhan custom. Harga akhir mengikuti ruang lingkup yang disepakati.",
  },
  {
    question: "Berapa lama proses pengerjaan?",
    answer: "Waktu pengerjaan bergantung pada fitur, jumlah halaman, dan kesiapan materi. Estimasi jadwal akan disampaikan bersama penawaran sebelum pekerjaan dimulai.",
  },
  {
    question: "Apakah website bisa dibuka melalui HP?",
    answer: "Ya. Tampilan responsif untuk ponsel dan perangkat lain menjadi bagian dari perencanaan website.",
  },
  {
    question: "Apakah saya bisa mengelola konten sendiri?",
    answer: "Bisa jika kebutuhan CMS termasuk dalam ruang lingkup yang dipilih. Fitur pengelolaan konten dan cara penggunaannya akan dibahas di awal.",
  },
  {
    question: "Apakah domain dan hosting sudah termasuk?",
    answer: "Paket Starter mencakup domain .my.id dan hosting selama 1 tahun. Paket Business mencakup domain premium dan hosting selama 1 tahun; pilihan domain dikonfirmasi terlebih dahulu. Untuk paket Premium, kebutuhan ditentukan berdasarkan proyek.",
  },
  {
    question: "Bagaimana biaya perpanjangan?",
    answer: "Biaya perpanjangan mengikuti harga domain dan hosting dari penyedia pada saat perpanjangan. Kami akan menjelaskan biaya tersebut sebelum pemesanan layanan.",
  },
  {
    question: "Apakah tersedia layanan maintenance?",
    answer: "Paket Business mencakup dukungan pemeliharaan 3 bulan dan paket Premium 6 bulan. Kebutuhan setelah masa tersebut dapat dibahas sebagai layanan terpisah.",
  },
  {
    question: "Bagaimana proses pemesanan?",
    answer: "Mulai dari konsultasi gratis, lalu kami siapkan ruang lingkup dan penawaran. Pengerjaan dimulai setelah detail dan kesepakatan dikonfirmasi.",
  },
];

export default function Home() {
  const [projects, setProjects] = useState<HomeProject[]>(mockProjects);
  const packages = mockServices;
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    async function fetchHomeData() {
      if (!supabase) return;

      const projectResult = await supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(3);

      if (projectResult.error) console.error("Gagal memuat contoh portofolio:", projectResult.error);
      else if (projectResult.data?.length) setProjects(projectResult.data as HomeProject[]);
    }

    void fetchHomeData().catch((error: unknown) => {
      console.error("Gagal memuat konten beranda:", error);
    });
  }, []);

  return (
    <div className="page-shell">
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(255,255,255,.1), rgba(255,255,255,.48) 56%, rgba(255,255,255,.78)), url('/hero-light-bg.png')",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: 0.78,
          }}
        />
        <div className="pointer-events-none absolute -right-36 -top-20 h-[460px] w-[460px] rounded-full bg-blue-50 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:min-h-[640px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-16">
          <div className="relative z-10 max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1.5 text-xs font-bold text-blue-800">
              Solusi digital untuk bisnis dan pendidikan Indonesia
            </p>
            <h1 className="mt-6 text-[2.55rem] font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.55rem]">
              Website Profesional untuk Membawa Bisnis Anda Lebih Berkembang.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Bangun identitas digital bisnis, sekolah, dan organisasi Anda bersama TemanWeb. Kami membantu mewujudkan website yang modern, responsif, dan sesuai kebutuhan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="button-primary justify-center px-6 py-3.5">
                Konsultasi Gratis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/portfolio" className="button-secondary justify-center px-6 py-3.5">
                Lihat Portofolio
              </Link>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              Konsultasi awal gratis, tanpa kewajiban untuk memesan.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
            <div className="absolute -left-3 top-8 h-40 w-40 rounded-full bg-cyan-100/70 blur-3xl" />
            <div className="relative rounded-[1.5rem] border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10 sm:rounded-[2rem] sm:p-3">
              <WebsitePreview title="Konsep website bisnis" category="Company" />
            </div>
            <div className="absolute -bottom-5 right-1 w-[105px] rounded-[1.2rem] border-[5px] border-white bg-slate-900 p-1 shadow-xl sm:-bottom-8 sm:-right-4 sm:w-[132px]">
              <div className="min-h-40 rounded-[0.85rem] bg-white p-2.5 text-center sm:min-h-48 sm:p-3">
                <span className="mx-auto block h-1 w-6 rounded-full bg-slate-300" />
                <span className="mt-4 block text-[6px] font-extrabold tracking-wide text-blue-800 sm:text-[7px]">BRAND ANDA</span>
                <span className="mt-3 block text-[8px] font-extrabold leading-tight text-slate-900 sm:text-[10px]">Informasi penting, mudah diakses.</span>
                <span className="mt-2 block text-[6px] leading-relaxed text-slate-500 sm:text-[7px]">Contoh tampilan website mobile.</span>
                <span className="mt-3 block rounded bg-blue-700 px-1 py-1 text-[6px] font-bold text-white sm:text-[7px]">Hubungi kami</span>
              </div>
            </div>
            <div className="absolute -bottom-4 left-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg sm:bottom-4 sm:-left-5 sm:px-4 sm:py-3">
              <p className="text-[10px] font-semibold text-slate-500 sm:text-xs">Dibuat dengan</p>
              <p className="text-xs font-bold text-slate-900 sm:text-sm">kebutuhan Anda sebagai fokus</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Komitmen TemanWeb" className="border-y border-slate-200 bg-slate-50/80">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:px-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.title} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm ring-1 ring-slate-200">
                {point.icon}
              </span>
              {point.title}
            </div>
          ))}
        </div>
      </section>

      <section id="layanan" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Layanan</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Satu partner untuk berbagai kebutuhan web.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Pilih titik awalnya. Fitur dan ruang lingkup akhir selalu dibahas sebelum pengerjaan.
              </p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">
              Lihat semua layanan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <article key={service.title} className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-slate-900/[0.04] sm:p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">{service.icon}</div>
                <h3 className="mt-5 text-lg font-bold text-slate-950">{service.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" /> {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={createWhatsAppUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-900"
                >
                  Konsultasi <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Konsep dan demo</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Contoh pendekatan desain dan fitur.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Karya yang ditampilkan merupakan demo konsep, bukan klaim proyek klien atau hasil komersial.
              </p>
            </div>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">
              Jelajahi portofolio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {projects.slice(0, 3).map((project) => {
              const projectType = project.project_type?.toLowerCase();
              const isDemo = !projectType || !["client", "client project"].includes(projectType);
              return (
                <article key={project.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="relative bg-slate-50 p-3">
                    <WebsitePreview title={project.title} category={project.category} compact />
                    <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-800 shadow-sm">
                      {isDemo ? "Demo Concept" : "Proyek klien"}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-700">{project.category}</p>
                    <h3 className="mt-2 text-lg font-bold text-slate-950">{project.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{project.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Cara kerja</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Lima langkah menuju website Anda.</h2>
            <p className="mt-4 leading-7 text-slate-600">Alurnya sederhana dan setiap keputusan penting dibicarakan bersama.</p>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <span className="text-sm font-extrabold text-blue-700">0{index + 1}</span>
                <h3 className="mt-4 font-bold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Paket dan harga awal</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Pilih titik awal yang paling sesuai.</h2>
              <p className="mt-4 leading-7 text-slate-600">Harga akhir dan lingkup layanan dikonfirmasi dalam penawaran.</p>
            </div>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">
              Rincian harga <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {packages.slice(0, 3).map((plan) => (
              <article key={plan.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-bold text-slate-950">{plan.title}</h3>
                <p className="mt-3 text-2xl font-extrabold text-slate-950">{plan.price}</p>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{plan.description}</p>
                <ul className="mt-4 flex-grow space-y-2">
                  {(plan.features || []).slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" /> {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">
                  Lihat detail paket <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-500">
            Domain dan hosting yang tercantum berlaku selama 1 tahun pertama. Biaya perpanjangan mengikuti penyedia dan dikonfirmasi sebelum pemesanan.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="eyebrow">Pertanyaan umum</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Hal yang sering ditanyakan.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Belum menemukan jawaban? Silakan tanyakan langsung, kami akan bantu menjelaskannya.
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">
              Tanya TemanWeb <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const expanded = activeFaq === index;
              return (
                <article key={faq.question} className="rounded-xl border border-slate-200 bg-white">
                  <h3>
                    <button
                      type="button"
                      id={`faq-question-${index}`}
                      aria-expanded={expanded}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setActiveFaq(expanded ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900"
                    >
                      {faq.question}
                      <ChevronDown className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                  </h3>
                  {expanded && (
                    <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">
                      {faq.answer}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Mulai dengan percakapan</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Sudah Siap Membawa Bisnis Anda ke Dunia Digital?
            </h2>
            <p className="mt-5 leading-7 text-slate-300">
              Diskusikan kebutuhan website Anda bersama TemanWeb. Konsultasi awal gratis tanpa kewajiban memesan.
            </p>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition-colors hover:bg-blue-50">
              Hubungi Kami <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={createWhatsAppUrl("konsultasi website")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-sm font-semibold text-emerald-300 hover:text-emerald-200"
            >
              Atau mulai percakapan melalui WhatsApp <ArrowUpRight className="inline h-4 w-4" />
            </a>
          </div>
          <div className="rounded-2xl bg-white p-5 text-slate-950 shadow-xl sm:p-7">
            <h3 className="text-xl font-bold">Ceritakan kebutuhan website Anda</h3>
            <p className="mt-2 mb-6 text-sm leading-6 text-slate-600">Informasi ini membantu kami memulai konsultasi dengan lebih terarah.</p>
            <ProjectInquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
