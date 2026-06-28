"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Search } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Layanan', href: '/services' },
    { name: 'Portofolio', href: '/portfolio' },
    { name: 'Harga', href: '/pricing' },
    { name: 'Tentang', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'py-3.5 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm shadow-slate-100/50'
        : 'py-6 bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Matching Reference Image */}
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
                Website and more...
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === item.href ? 'text-blue-600 font-semibold' : 'text-slate-600'
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <button className="text-slate-600 hover:text-slate-900 p-1" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all hover:-translate-y-0.5"
            >
              Mulai Proyek <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button className="text-slate-600 hover:text-slate-900 p-1" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 py-6 px-6 space-y-4 shadow-lg shadow-slate-100/50">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block text-base font-medium transition-colors hover:text-blue-600 ${pathname === item.href ? 'text-blue-600 font-semibold' : 'text-slate-600'
                }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-center px-5 py-3 rounded-full text-base font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Mulai Proyek
          </Link>
        </div>
      )}
    </nav>
  );
}
