import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang TemanWeb",
  description: "Kenali TemanWeb, brand layanan digital yang bertumbuh dengan komitmen pada proses kerja jelas, komunikasi terbuka, dan website sesuai kebutuhan.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Tentang TemanWeb",
    description: "Mitra digital yang ramah dan transparan untuk bisnis, sekolah, dan organisasi Indonesia.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
