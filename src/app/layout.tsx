import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.temanweb.my.id"),
  title: {
    default: "TemanWeb | Jasa Pembuatan Website Profesional",
    template: "%s | TemanWeb",
  },
  description: "TemanWeb membantu UMKM, sekolah, dan organisasi membangun website profesional yang modern, responsif, dan sesuai kebutuhan.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TemanWeb | Jasa Pembuatan Website Profesional",
    description: "Solusi website profesional untuk bisnis dan pendidikan Indonesia. Konsultasi awal gratis tanpa kewajiban memesan.",
    type: "website",
    locale: "id_ID",
    url: "https://www.temanweb.my.id",
    siteName: "TemanWeb",
    images: [{ url: "/mockup-screen.jpg", width: 1200, height: 630, alt: "Contoh tampilan website TemanWeb" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TemanWeb | Jasa Pembuatan Website Profesional",
    description: "Solusi website profesional untuk bisnis dan pendidikan Indonesia.",
    images: ["/mockup-screen.jpg"],
  },
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
        <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
          <Navbar />
          <main className="flex-grow pt-[76px]">
            {children}
          </main>
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "TemanWeb",
                url: "https://www.temanweb.my.id",
                description: "Jasa pembuatan website profesional untuk bisnis, sekolah, dan organisasi di Indonesia.",
                email: "Ryannn0302@gmail.com",
                telephone: "+6281363799776",
                address: {
                  "@type": "PostalAddress",
                  addressRegion: "Riau",
                  addressCountry: "ID",
                },
                areaServed: {
                  "@type": "Country",
                  name: "Indonesia",
                },
              }),
            }}
          />
        </body>
    </html>
  );
}
