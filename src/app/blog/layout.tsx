import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel Website dan Digital",
  description: "Artikel TemanWeb tentang website, SEO, dan langkah praktis membangun kehadiran digital untuk bisnis dan organisasi.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Artikel Website dan Digital TemanWeb",
    description: "Panduan ringkas seputar website dan kehadiran digital.",
    url: "/blog",
  },
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
