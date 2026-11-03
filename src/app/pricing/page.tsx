import Link from "next/link";
import { ArrowRight, Check, CircleHelp } from "lucide-react";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const plans = [
  {
    name: "Starter",
    subtitle: "Landing page",
    price: "Rp 359.000",
    description: "Untuk mengenalkan satu produk, layanan, atau kampanye.",
    features: [
      "1 halaman responsif",
      "Desain UI kustom",
      "Integrasi WhatsApp dan formulir kontak dasar",
      "Pengaturan SEO dasar",
      "Hosting dan domain .my.id selama 1 tahun",
      "Maksimal 2 kali revisi",
      "Estimasi jadwal disepakati sebelum mulai",
    ],
  },
  {
    name: "Business",
    subtitle: "Company profile",
    price: "Rp 1.099.000",
    description: "Untuk usaha atau organisasi yang perlu menjelaskan beberapa layanan dan informasi.",
    popular: true,
    features: [
      "Hingga 5 halaman informasi",
      "Desain UI/UX kustom",
      "CMS blog sesuai lingkup yang disepakati",
      "Integrasi Google Analytics",
      "Pengaturan SEO on-page",
      "Hosting dan domain premium selama 1 tahun",
      "Dukungan pemeliharaan 3 bulan",
      "Maksimal 4 kali revisi",
      "Estimasi jadwal disepakati sebelum mulai",
    ],
  },
  {
    name: "Premium",
    subtitle: "Custom / e-commerce",
    price: "Rp 2.000.000+",
    description: "Untuk toko online, dashboard, atau aplikasi yang membutuhkan fitur khusus.",
    features: [
      "Jumlah halaman dan fitur sesuai lingkup",
      "Perencanaan database dan autentikasi sesuai kebutuhan",
      "Integrasi pembayaran atau layanan pihak ketiga sesuai penawaran",
      "Pengaturan SEO dan performa sesuai lingkup",
      "Hosting dan domain ditentukan berdasarkan kebutuhan",
      "Dukungan pemeliharaan 6 bulan",
      "Revisi dan jadwal disepakati dalam penawaran",
    ],
  },
];

const terms = [
  {
    title: "Apa yang termasuk di harga?",
    description: "Daftar fitur di tiap paket menjadi acuan awal. Kebutuhan di luar daftar dibahas dan dicantumkan dalam penawaran sebelum pekerjaan dimulai.",
  },
  {
    title: "Bagaimana biaya perpanjangan?",
    description: "Hosting dan domain pada paket yang mencantumkannya berlaku selama 1 tahun pertama. Tarif perpanjangan mengikuti harga penyedia saat itu dan dikonfirmasi sebelum pemesanan.",
  },
  {
    title: "Kapan website selesai?",
    description: "Jadwal pengerjaan bergantung pada ruang lingkup dan kesiapan materi. Estimasi tanggal mulai dan peluncuran disepakati dalam penawaran.",
  },
  {
    title: "Bagaimana maintenance setelah masa dukungan?",
    description: "Kebutuhan maintenance setelah masa yang termasuk paket dapat dibahas sebagai layanan lanjutan dengan ruang lingkup dan biaya terpisah.",
  },
];

export default function PricingPage() {
  return (
    <div className="page-shell">
      <section className="section-space">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Harga yang transparan</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Mulai dengan paket yang sesuai.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Harga berikut adalah titik awal. Ruang lingkup akhir, jadwal, dan kebutuhan tambahan dibahas sebelum Anda memutuskan.
            </p>
          </div>

          <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border bg-white p-6 sm:p-8 ${
                  plan.popular ? "border-blue-300 shadow-xl shadow-blue-900/[0.08]" : "border-slate-200 shadow-sm shadow-slate-900/[0.03]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-blue-700 px-3 py-1 text-xs font-bold text-white">
                    Pilihan bisnis
                  </span>
                )}
                <p className="text-sm font-bold text-blue-700">{plan.subtitle}</p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-950">{plan.name}</h2>
                <p className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950">{plan.price}</p>
                <p className="mt-1 text-xs text-slate-500">Harga awal · sekali bayar sesuai lingkup penawaran</p>
                <p className="mt-5 min-h-12 text-sm leading-6 text-slate-600">{plan.description}</p>
                <div className="my-6 border-t border-slate-200" />
                <h3 className="text-sm font-bold text-slate-900">Termasuk dalam paket</h3>
                <ul className="mt-4 flex-grow space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm leading-5 text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={createWhatsAppUrl(`paket ${plan.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors ${
                    plan.popular ? "bg-blue-700 text-white hover:bg-blue-800" : "border border-slate-300 text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Tanyakan paket ini <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <div className="text-center">
              <p className="eyebrow">Sebelum memesan</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">Hal penting tentang biaya dan layanan</h2>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {terms.map((term) => (
                <article key={term.title} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="flex items-center gap-2 font-bold text-slate-900">
                    <CircleHelp className="h-4 w-4 text-blue-700" /> {term.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{term.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center text-xs leading-5 text-slate-500">
              Ketersediaan domain dan harga layanan pihak ketiga dapat berubah. Semua biaya yang relevan dikonfirmasi terlebih dahulu.
            </p>
            <div className="mt-8 text-center">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">
                Tanyakan kebutuhan khusus <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
