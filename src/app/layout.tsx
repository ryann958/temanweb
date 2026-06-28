import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TemanWeb - Jasa Pembuatan Website Profesional & Premium",
  description: "Membangun website profil bisnis (company profile), landing page, dan sistem dashboard kustom dengan desain mewah, performa cepat (SEO-friendly), dan proses pengerjaan cepat oleh TemanWeb.",
  openGraph: {
    title: "TemanWeb - Jasa Pembuatan Website Profesional & Premium",
    description: "Website modern, responsif, cepat, teroptimasi SEO, dan aman untuk melejitkan bisnis Anda.",
    type: "website",
    locale: "id_ID",
    url: "https://temanweb.com",
    siteName: "TemanWeb",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="h-full scroll-smooth antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        <Navbar />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
