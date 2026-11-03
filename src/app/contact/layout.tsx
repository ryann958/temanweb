import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konsultasi dan Kontak",
  description: "Diskusikan kebutuhan website Anda dengan TemanWeb. Konsultasi awal gratis dan tanpa kewajiban untuk memesan.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Konsultasi Website dengan TemanWeb",
    description: "Hubungi TemanWeb atau kirim brief website Anda untuk memulai konsultasi.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
