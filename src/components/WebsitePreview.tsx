import { ArrowUpRight, GraduationCap, Store } from "lucide-react";

type WebsitePreviewProps = {
  title: string;
  category: string;
  compact?: boolean;
};

function getPreviewContent(category: string) {
  const value = category.toLowerCase();
  if (value.includes("school") || value.includes("education") || value.includes("sekolah")) {
    return {
      label: "PENDIDIKAN",
      headline: "Ruang belajar untuk bertumbuh bersama.",
      description: "Informasi program, kegiatan, dan pendaftaran tersaji dalam satu tempat.",
      action: "Lihat program",
      cards: ["Program belajar", "Kegiatan sekolah", "Info pendaftaran"],
      icon: <GraduationCap className="h-7 w-7" />,
    };
  }
  if (value.includes("e-commerce") || value.includes("ecommerce") || value.includes("shop")) {
    return {
      label: "KATALOG USAHA",
      headline: "Temukan pilihan yang sesuai untuk Anda.",
      description: "Jelajahi produk dan temukan informasi pemesanan dengan mudah.",
      action: "Jelajahi produk",
      cards: ["Pilihan produk", "Kategori", "Cara memesan"],
      icon: <Store className="h-7 w-7" />,
    };
  }
  return {
    label: "PROFIL BISNIS",
    headline: "Cerita dan layanan Anda, lebih mudah ditemukan.",
    description: "Kenalkan usaha, layanan, dan cara menghubungi Anda secara jelas.",
    action: "Kenali layanan",
    cards: ["Tentang usaha", "Layanan utama", "Hubungi kami"],
    icon: <Store className="h-7 w-7" />,
  };
}

export default function WebsitePreview({ title, category, compact = false }: WebsitePreviewProps) {
  const content = getPreviewContent(category);

  return (
    <div
      role="img"
      aria-label={`Pratinjau visual demo website ${title}`}
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm ${compact ? "aspect-[16/10] text-[8px]" : "text-[10px]"}`}
    >
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-red-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
        <span className="ml-2 h-3 flex-1 rounded bg-white" />
      </div>
      <div className={compact ? "p-3" : "p-4 sm:p-5"}>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5 font-extrabold tracking-wide text-slate-900">
            <span className={`flex items-center justify-center rounded-md bg-blue-700 text-white ${compact ? "h-5 w-5" : "h-6 w-6"}`}>
              <span className="text-[8px]">TW</span>
            </span>
            BRAND ANDA
          </div>
          <div className="flex gap-2 text-[7px] font-medium text-slate-500 sm:gap-3">
            <span>Profil</span><span>Layanan</span><span>Kontak</span>
          </div>
        </div>
        <div className={`grid items-center gap-3 ${compact ? "grid-cols-[1.15fr_0.85fr] py-4" : "grid-cols-[1.1fr_0.9fr] py-6 sm:gap-5 sm:py-8"}`}>
          <div>
            <p className="font-bold tracking-[0.12em] text-blue-700">{content.label}</p>
            <p className={`mt-2 font-extrabold leading-tight tracking-tight text-slate-950 ${compact ? "text-sm" : "text-base sm:text-xl"}`}>
              {content.headline}
            </p>
            <p className={`mt-2 leading-relaxed text-slate-500 ${compact ? "line-clamp-2 text-[7px]" : "text-[8px] sm:text-[10px]"}`}>
              {content.description}
            </p>
            <span className={`mt-3 inline-flex items-center gap-1 rounded-md bg-blue-700 font-bold text-white ${compact ? "px-2 py-1 text-[7px]" : "px-2.5 py-1.5 text-[8px]"}`}>
              {content.action} <ArrowUpRight className="h-2.5 w-2.5" />
            </span>
          </div>
          <div className="relative flex aspect-[0.9] items-center justify-center overflow-hidden rounded-lg bg-blue-50">
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-100" />
            <div className="absolute -bottom-5 -left-2 h-16 w-16 rounded-full bg-cyan-100" />
            <div className="relative flex h-3/4 w-3/4 flex-col justify-between rounded-md border border-white bg-white p-2 text-slate-700 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="h-1.5 w-10 rounded bg-blue-200" />
                <span className="h-3 w-3 rounded-full bg-blue-700" />
              </div>
              <div className="flex flex-1 items-center justify-center text-blue-700">
                {content.icon}
              </div>
              <div className="space-y-1">
                <span className="block h-1.5 w-4/5 rounded bg-slate-200" />
                <span className="block h-1.5 w-3/5 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
          {content.cards.map((card, index) => (
            <div key={card} className="rounded-md bg-slate-50 p-2">
              <span className="block h-1 w-4 rounded bg-blue-300" />
              <span className="mt-1.5 block truncate font-semibold text-slate-700">{card}</span>
              <span className={`mt-1 block h-1 rounded bg-slate-200 ${index === 1 ? "w-3/4" : "w-full"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
