import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harga Jasa Pembuatan Website",
  description: "Lihat paket harga website TemanWeb secara transparan. Ruang lingkup, biaya perpanjangan, dan kebutuhan tambahan dibahas sebelum pengerjaan.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Harga Jasa Pembuatan Website TemanWeb",
    description: "Bandingkan paket dan konsultasikan kebutuhan website Anda sebelum memesan.",
    url: "/pricing",
  },
};

export default function PricingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
