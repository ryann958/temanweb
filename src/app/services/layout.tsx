import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Pembuatan Website",
  description: "Jasa pembuatan website UMKM, sekolah, company profile, desa, e-commerce, dan aplikasi web kustom bersama TemanWeb.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Layanan Pembuatan Website TemanWeb",
    description: "Pilih solusi website sesuai kebutuhan bisnis, pendidikan, dan organisasi Anda.",
    url: "/services",
  },
};

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
