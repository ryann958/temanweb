import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const links = [
  { href: "/services", label: "Layanan" },
  { href: "/portfolio", label: "Portofolio" },
  { href: "/pricing", label: "Harga" },
  { href: "/about", label: "Tentang TemanWeb" },
  { href: "/blog", label: "Artikel" },
  { href: "/contact", label: "Hubungi kami" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr]">
        <div className="space-y-5">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/logo.png" alt="" width={42} height={42} className="h-10 w-10 rounded-xl object-cover" />
            <span className="text-xl font-extrabold tracking-tight">
              Teman<span className="text-blue-300">Web</span>
            </span>
          </Link>
          <p className="max-w-md text-sm leading-7 text-slate-300">
            Solusi website profesional untuk bisnis dan pendidikan Indonesia. Kami membantu Anda merencanakan kehadiran digital yang sesuai kebutuhan.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-200 hover:text-white">
            Konsultasi awal gratis <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Jelajahi</h2>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Kontak</h2>
          <a href="mailto:Ryannn0302@gmail.com" className="flex items-center gap-3 text-sm text-slate-300 hover:text-white">
            <Mail className="h-4 w-4 shrink-0 text-blue-300" /> Ryannn0302@gmail.com
          </a>
          <a href="tel:+6281363799776" className="flex items-center gap-3 text-sm text-slate-300 hover:text-white">
            <Phone className="h-4 w-4 shrink-0 text-blue-300" /> +62 813-6379-9776
          </a>
          <p className="flex items-start gap-3 text-sm leading-6 text-slate-300">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-300" />
            Kepulauan Meranti, Riau, Indonesia
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-slate-400 sm:px-8">
          © {new Date().getFullYear()} TemanWeb. Informasi layanan dan estimasi dikonfirmasi sebelum pengerjaan.
        </p>
      </div>
    </footer>
  );
}
