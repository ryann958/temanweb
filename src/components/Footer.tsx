import Link from 'next/link';
import { Github, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
              <div className="w-9 h-9 rounded-xl bg-slate-950 relative overflow-hidden border border-slate-200/80 shadow-sm shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Logo TemanWeb" 
                  className="absolute top-[-6px] left-[-18px] w-[72px] h-[72px] max-w-none" 
                />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[22px] font-black tracking-tight text-white uppercase" style={{
                  WebkitTextStroke: "1.2px #0a2540",
                  textShadow: "1px 1px 0px #0a2540",
                }}>
                  Teman<span style={{ WebkitTextStroke: "1.2px #0a2540", color: "#0055ff" }}>Web</span>
                </span>
                <span className="text-[9px] font-semibold text-slate-500 mt-0.5 tracking-wider">
                  Website, domain, and more...
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-600">
              TemanWeb menghadirkan solusi pembuatan website premium, responsif, cepat, dan teroptimasi SEO untuk melejitkan kredibilitas bisnis Anda di dunia digital.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm" aria-label="Linkedin">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Layanan Jasa</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Portofolio</Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Daftar Harga</Link>
              </li>
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Informasi</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Artikel & Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Hubungi Kontak</Link>
              </li>
              <li>
                <a href="#faq" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Kontak Kami</h4>
            <div className="flex items-center space-x-3 text-slate-600 text-sm">
              <Mail className="h-5 w-5 text-blue-600 shrink-0" />
              <span>Ryannn0302@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600 text-sm">
              <Phone className="h-5 w-5 text-blue-600 shrink-0" />
              <span>+62 813-6379-9776</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600 text-sm">
              <MapPin className="h-5 w-5 text-blue-600 shrink-0" />
              <span>Kepulauan Meranti, Riau, Indonesia</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} TemanWeb. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-slate-800 transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-slate-800 transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
