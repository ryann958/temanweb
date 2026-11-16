type WebsitePreviewProps = {
  title: string;
  category: string;
  compact?: boolean;
};

type PreviewContent = {
  label: string;
  headline: string;
  description: string;
  modules: string[];
  kind: "school" | "shop" | "business";
};

function getPreviewContent(category: string): PreviewContent {
  const value = category.toLowerCase();
  if (value.includes("school") || value.includes("education") || value.includes("sekolah")) {
    return {
      label: "Pendidikan",
      headline: "Informasi sekolah dalam satu tempat.",
      description: "Profil, program belajar, kegiatan, dan pendaftaran.",
      modules: ["Profil", "Program", "Pendaftaran"],
      kind: "school",
    };
  }
  if (value.includes("e-commerce") || value.includes("ecommerce") || value.includes("shop")) {
    return {
      label: "Katalog usaha",
      headline: "Produk dan cara memesan.",
      description: "Susun katalog sesuai pilihan dan alur pesanan usaha.",
      modules: ["Produk", "Kategori", "Pesanan"],
      kind: "shop",
    };
  }
  return {
    label: "Profil bisnis",
    headline: "Layanan usaha, lebih mudah dipahami.",
    description: "Ceritakan usaha, layanan utama, dan cara menghubungi Anda.",
    modules: ["Tentang", "Layanan", "Kontak"],
    kind: "business",
  };
}

function ModulePreview({ content }: { content: PreviewContent }) {
  if (content.kind === "shop") {
    return (
      <div className="grid grid-cols-2 gap-2" aria-hidden="true">
        {content.modules.map((module, index) => (
          <div
            key={module}
            className={`rounded-lg border border-slate-200 bg-white p-2.5 ${index === 0 ? "row-span-2" : ""}`}
          >
            <span className={`mb-2 block rounded bg-blue-50 ${index === 0 ? "h-20" : "h-7"}`} />
            <span className="block text-[10px] font-semibold text-slate-800">{module}</span>
          </div>
        ))}
      </div>
    );
  }

  if (content.kind === "school") {
    return (
      <div className="space-y-2" aria-hidden="true">
        <div className="rounded-lg bg-blue-900 p-3 text-white">
          <span className="text-[9px] font-bold uppercase tracking-wider text-blue-200">Informasi utama</span>
          <span className="mt-1 block text-sm font-bold">Profil & program</span>
        </div>
        {content.modules.slice(1).map((module, index) => (
          <div key={module} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-2.5">
            <span className="text-xs font-bold text-blue-700">0{index + 2}</span>
            <span className="text-[10px] font-semibold text-slate-800">{module}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2" aria-hidden="true">
      {content.modules.map((module, index) => (
        <div key={module} className="flex items-center gap-3 border-b border-slate-200 py-2.5 last:border-0">
          <span className="w-6 text-xs font-bold text-blue-700">0{index + 1}</span>
          <span className="text-[10px] font-semibold text-slate-800">{module}</span>
          <span className="ml-auto h-1 w-8 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export default function WebsitePreview({ title, category, compact = false }: WebsitePreviewProps) {
  const content = getPreviewContent(category);

  return (
    <div
      role="img"
      aria-label={`Pratinjau konsep ${content.label}: ${title}`}
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white text-left ${compact ? "aspect-[4/3]" : ""}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 sm:px-4">
        <div className="min-w-0">
          <p className="text-[8px] font-bold uppercase tracking-wider text-blue-700 sm:text-[9px]">Pratinjau konsep</p>
          <p className="mt-0.5 truncate text-xs font-bold text-slate-950 sm:text-sm">{title}</p>
        </div>
        <span className="shrink-0 text-[9px] font-semibold text-slate-600 sm:text-[10px]">{content.label}</span>
      </div>
      <div className={`grid h-[calc(100%-49px)] items-center gap-3 bg-slate-50 p-3 sm:gap-5 sm:p-5 ${compact ? "grid-cols-[1fr_0.9fr]" : "sm:grid-cols-[1fr_0.9fr]"}`}>
        <div className="min-w-0">
          <p className={`font-extrabold leading-tight tracking-tight text-slate-950 ${compact ? "text-xs sm:text-sm" : "text-lg sm:text-2xl"}`}>
            {content.headline}
          </p>
          <p className={`mt-2 leading-relaxed text-slate-600 ${compact ? "line-clamp-2 text-[8px] sm:text-[9px]" : "text-xs sm:text-sm"}`}>
            {content.description}
          </p>
          {!compact && (
            <p className="mt-3 text-[9px] font-semibold text-blue-800 sm:text-xs">
              {content.modules.join(" · ")}
            </p>
          )}
        </div>
        <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-2.5 sm:p-3">
          <p className="mb-2 text-[8px] font-bold uppercase tracking-wider text-slate-500 sm:text-[9px]">Susunan halaman</p>
          <ModulePreview content={content} />
        </div>
      </div>
    </div>
  );
}
