import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio dan Demo Website",
  description: "Lihat konsep website TemanWeb untuk UMKM, pendidikan, perusahaan, dan toko online. Karya demo ditandai secara transparan.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portofolio dan Demo Website TemanWeb",
    description: "Jelajahi konsep website dan contoh fitur yang dapat disesuaikan dengan kebutuhan Anda.",
    url: "/portfolio",
  },
};

export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
