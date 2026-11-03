import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  GraduationCap,
  Map,
  ShoppingBag,
  Store,
  Workflow,
  Check,
} from "lucide-react";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const services = [
  {
    title: "Website UMKM",
    category: "Bisnis lokal",
    description: "Tampilkan produk, layanan, lokasi, dan cara menghubungi usaha Anda dalam satu tempat yang mudah dibuka.",
    features: ["Profil dan katalog usaha", "Tombol WhatsApp", "Tampilan mobile"],
    icon: <Store className="h-6 w-6" />,
  },
  {
    title: "Website Sekolah",
    category: "Pendidikan",
    description: "Sampaikan profil sekolah, program, informasi penerimaan, berita, serta kontak resmi kepada orang tua dan calon siswa.",
    features: ["Profil dan program", "Informasi kegiatan", "Kontak dan pendaftaran"],
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    title: "Company Profile",
    category: "Organisasi",
    description: "Jelaskan siapa Anda, apa yang ditawarkan, dan bagaimana calon mitra dapat menghubungi perusahaan.",
    features: ["Profil organisasi", "Layanan dan portofolio", "Formulir kontak"],
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    title: "Website Desa",
    category: "Layanan publik",
    description: "Sediakan ruang digital untuk profil desa, potensi lokal, pengumuman, dan informasi layanan masyarakat.",
    features: ["Profil dan potensi desa", "Berita dan pengumuman", "Informasi layanan"],
    icon: <Map className="h-6 w-6" />,
  },
  {
    title: "E-commerce",
    category: "Penjualan online",
    description: "Bangun katalog dan pengalaman belanja yang sesuai dengan produk, alur pemesanan, serta operasional usaha Anda.",
    features: ["Katalog produk", "Alur pesanan", "Pembayaran sesuai kebutuhan"],
    icon: <ShoppingBag className="h-6 w-6" />,
  },
  {
    title: "Custom Web Application",
    category: "Sistem khusus",
    description: "Rancang aplikasi web untuk proses kerja tertentu seperti dashboard, pengelolaan data, atau portal internal.",
    features: ["Fitur berdasarkan kebutuhan", "Pengelolaan data", "Ruang lingkup disepakati"],
    icon: <Workflow className="h-6 w-6" />,
  },
];

export default function ServicesPage() {
  return (
    <div className="page-shell">
      <section className="section-space">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Layanan TemanWeb</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Website yang dirancang untuk kebutuhan Anda.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Dari memperkenalkan usaha hingga merapikan proses kerja, kita mulai dengan memahami tujuan dan menentukan lingkup yang tepat.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article key={service.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.03]">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    {service.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-300">0{index + 1}</span>
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-blue-700">{service.category}</p>
                <h2 className="mt-2 text-xl font-bold text-slate-950">{service.title}</h2>
                <p className="mt-3 flex-grow text-sm leading-6 text-slate-600">{service.description}</p>
                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={createWhatsAppUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
                >
                  Konsultasikan layanan ini <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-slate-950 p-7 text-white sm:flex-row sm:p-9">
            <div>
              <h2 className="text-xl font-bold">Belum yakin mulai dari mana?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Ceritakan tujuan Anda. Kami bantu membahas pilihan ruang lingkup dan estimasi sebelum Anda memutuskan.
              </p>
            </div>
            <Link href="/contact" className="button-primary shrink-0 px-5 py-3">
              Konsultasi gratis <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            Fitur, jadwal, biaya, dan layanan berulang ditentukan berdasarkan kebutuhan dan dikonfirmasi dalam penawaran.
          </p>
        </div>
      </section>
    </div>
  );
}
