import Link from "next/link";
import { ArrowRight, Eye, Handshake, HeartHandshake, Lightbulb, ShieldCheck, Target } from "lucide-react";

const principles = [
  {
    icon: <Handshake className="h-5 w-5" />,
    title: "Komunikasi terbuka",
    description: "Tujuan, ruang lingkup, biaya, dan jadwal dibahas bersama sebelum pekerjaan dimulai.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Informasi yang jujur",
    description: "Kami membedakan konsep demo dari proyek klien dan menjelaskan hal yang termasuk maupun di luar paket.",
  },
  {
    icon: <HeartHandshake className="h-5 w-5" />,
    title: "Sesuai kebutuhan",
    description: "Solusi dan fitur dipilih berdasarkan kebutuhan nyata, bukan sekadar menambah kompleksitas.",
  },
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <section className="section-space">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-3xl">
            <p className="eyebrow">Tentang TemanWeb</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Membuat langkah digital terasa lebih dekat.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              TemanWeb adalah brand layanan digital yang sedang bertumbuh. Kami membantu UMKM, sekolah, dan organisasi membangun website profesional yang informatif, mudah diakses, dan disusun sesuai kebutuhan.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              TemanWeb hadir karena membuat website seharusnya tidak terasa rumit atau penuh istilah teknis. Setiap proyek dimulai dengan mendengarkan tujuan Anda, lalu menyusun pilihan solusi dan estimasi yang dapat dipahami sebelum ada keputusan untuk melanjutkan.
            </p>
            <Link href="/contact" className="button-primary mt-8 px-5 py-3">
              Ceritakan kebutuhan Anda <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-7 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-xl font-bold text-slate-950">Mengapa TemanWeb ada?</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Banyak usaha dan lembaga punya layanan yang bermanfaat, tetapi belum memiliki ruang digital yang rapi untuk menjelaskannya. Kami ingin membantu membuat informasi mereka lebih mudah ditemukan dan dipahami.
            </p>
            <div className="mt-7 border-t border-blue-200 pt-6">
              <p className="text-sm font-bold text-slate-800">Posisi kami</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Solusi Website Profesional untuk Bisnis dan Pendidikan Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">Komitmen kami</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Kerja yang jelas, dari awal hingga peluncuran.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  {principle.icon}
                </div>
                <h3 className="mt-5 font-bold text-slate-950">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-950">Cara kami bekerja</h2>
            <ol className="mt-6 space-y-4">
              {[
                "Konsultasi untuk memahami tujuan, pengguna, dan kebutuhan website.",
                "Perencanaan ruang lingkup, penawaran, dan jadwal untuk disepakati.",
                "Desain dan pengembangan dengan pembaruan selama proses berjalan.",
                "Review, revisi sesuai kesepakatan, lalu persiapan peluncuran.",
              ].map((step, index) => (
                <li key={step} className="flex gap-4 text-sm leading-6 text-slate-600">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-slate-200 p-7 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Eye className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-950">Visi kami</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Membantu bisnis dan organisasi Indonesia menjangkau lebih banyak orang melalui informasi digital yang mudah diakses dan dikelola.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Sebagai brand yang baru tumbuh, TemanWeb memilih membangun kepercayaan melalui pekerjaan yang jelas, demo yang diberi label apa adanya, serta komunikasi terbuka. Kami tidak memakai klaim angka atau pengalaman yang belum dapat dibuktikan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
