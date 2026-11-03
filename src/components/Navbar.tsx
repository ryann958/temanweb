"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Layanan", href: "/services" },
  { name: "Portofolio", href: "/portfolio" },
  { name: "Harga", href: "/pricing" },
  { name: "Tentang", href: "/about" },
  { name: "Artikel", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-900/[0.03] backdrop-blur-md">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="TemanWeb, beranda">
          <Image src="/logo.png" alt="" width={42} height={42} className="h-10 w-10 rounded-xl object-cover" priority />
          <span className="text-xl font-extrabold tracking-tight text-slate-950">
            Teman<span className="text-blue-700">Web</span>
            <span className="mt-0.5 block text-[10px] font-medium tracking-wide text-slate-500">
              Solusi digital untuk bertumbuh
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-blue-700 ${
                pathname === item.href ? "text-blue-700" : "text-slate-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/contact" className="button-primary px-4 py-2.5 text-sm">
            Konsultasi Gratis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-navigation" className="border-t border-slate-200 bg-white px-5 py-4 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`rounded-lg px-3 py-3 text-sm font-medium ${
                  pathname === item.href ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsOpen(false)} className="button-primary mt-2 justify-center px-4 py-3 text-sm">
              Konsultasi Gratis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
