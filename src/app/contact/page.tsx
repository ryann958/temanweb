import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ProjectInquiryForm from "@/components/ProjectInquiryForm";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactPage() {
  return (
    <div className="page-shell">
      <section className="section-space">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Hubungi TemanWeb</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Mari mulai dari kebutuhan Anda.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Konsultasikan ide website, tanyakan paket, atau kirim gambaran proyek. Konsultasi awal gratis dan tidak mewajibkan pemesanan.
            </p>
          </div>

          <div className="mt-11 grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                <h2 className="text-xl font-bold text-slate-950">Kontak langsung</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Pilih kanal yang nyaman. Saat mengirim brief, hindari memasukkan kata sandi atau informasi sensitif.
                </p>
                <div className="mt-6 space-y-5">
                  <a href="mailto:Ryannn0302@gmail.com" className="flex items-start gap-3 text-sm text-slate-700 hover:text-blue-800">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Mail className="h-5 w-5" /></span>
                    <span><span className="block font-bold text-slate-900">Email</span><span className="mt-1 block">Ryannn0302@gmail.com</span></span>
                  </a>
                  <a href="tel:+6281363799776" className="flex items-start gap-3 text-sm text-slate-700 hover:text-blue-800">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Phone className="h-5 w-5" /></span>
                    <span><span className="block font-bold text-slate-900">Telepon / WhatsApp</span><span className="mt-1 block">+62 813-6379-9776</span></span>
                  </a>
                  <div className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><MapPin className="h-5 w-5" /></span>
                    <span><span className="block font-bold text-slate-900">Lokasi</span><span className="mt-1 block leading-6">Kepulauan Meranti, Riau, Indonesia</span></span>
                  </div>
                </div>
                <a
                  href={createWhatsAppUrl("konsultasi website")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" /> Chat melalui WhatsApp
                </a>
              </div>
              <div className="rounded-2xl bg-blue-50 p-6">
                <h2 className="font-bold text-slate-950">Apa yang perlu disiapkan?</h2>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  <li>Tujuan website dan siapa yang akan menggunakannya.</li>
                  <li>Fitur atau informasi yang ingin ditampilkan.</li>
                  <li>Perkiraan waktu dan anggaran, jika sudah ada.</li>
                </ul>
              </div>
            </aside>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:p-8">
              <h2 className="text-xl font-bold text-slate-950">Kirim brief konsultasi</h2>
              <p className="mt-2 mb-6 text-sm leading-6 text-slate-600">
                Isi formulir ini untuk menjelaskan kebutuhan. Jika penyimpanan pesan belum tersedia, Anda akan mendapat tautan WhatsApp dengan detail yang sudah diisi.
              </p>
              <ProjectInquiryForm />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Ingin melihat ruang lingkup dan harga lebih dahulu?{" "}
            <Link href="/pricing" className="font-semibold text-blue-700 hover:text-blue-900">Lihat paket harga</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
