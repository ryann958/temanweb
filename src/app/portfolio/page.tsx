"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, ExternalLink, X } from "lucide-react";
import { supabase, mockProjects } from "@/lib/supabase";
import WebsitePreview from "@/components/WebsitePreview";

type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  technology: string[] | null;
  image_url: string | null;
  live_url: string | null;
  project_type?: string | null;
  features?: string[] | null;
};

const filters = ["Semua", "UMKM", "Education", "Corporate", "E-commerce", "Other"];

function getCategory(category: string) {
  const value = category.toLowerCase();
  if (value.includes("school") || value.includes("education") || value.includes("sekolah")) return "Education";
  if (value.includes("company") || value.includes("corporate")) return "Corporate";
  if (value.includes("e-commerce") || value.includes("ecommerce") || value.includes("shop")) return "E-commerce";
  if (value.includes("umkm") || value.includes("business") || value.includes("store")) return "UMKM";
  return "Other";
}

function isValidLiveUrl(url: string | null): url is string {
  return Boolean(url && /^https?:\/\//i.test(url));
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>(mockProjects);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [previewProject, setPreviewProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) return;

      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) {
        console.error("Gagal memuat portofolio:", error);
        return;
      }

      if (data?.length) setProjects(data as PortfolioProject[]);
    }

    void fetchProjects();
  }, []);

  useEffect(() => {
    if (!previewProject) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [previewProject]);

  const visibleProjects = activeFilter === "Semua"
    ? projects
    : projects.filter((project) => getCategory(project.category) === activeFilter);

  return (
    <div className="page-shell">
      <section className="section-space">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Portofolio</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Lihat pendekatan dan ide yang bisa diwujudkan.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Contoh di halaman ini adalah konsep demo untuk menggambarkan arah desain dan fitur. Demo bukan klaim pekerjaan berbayar atau proyek klien.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-2" aria-label="Filter kategori portofolio">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                  activeFilter === filter
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-800"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {visibleProjects.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
              <p className="font-semibold text-slate-800">Belum ada contoh di kategori ini.</p>
              <p className="mt-2 text-sm text-slate-500">Hubungi kami untuk membahas konsep yang sesuai dengan kebutuhan Anda.</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => {
                const projectType = project.project_type?.toLowerCase();
                const isDemo = !projectType || !["client", "client project"].includes(projectType);
                const features = project.features?.length ? project.features : project.technology || [];

                return (
                  <article key={project.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.03]">
                    <div className="relative bg-slate-50 p-3">
                      <WebsitePreview title={project.title} category={project.category} compact />
                      <span className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-800 shadow-sm">
                        {isDemo ? "Demo Concept" : "Proyek klien"}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-700">{getCategory(project.category)}</p>
                      <h2 className="mt-2 text-xl font-bold text-slate-950">{project.title}</h2>
                      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{project.description}</p>
                      {features.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {features.slice(0, 3).map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-xs text-slate-600">
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      {project.technology?.length ? (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.technology.slice(0, 3).map((tech) => (
                            <span key={tech} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">{tech}</span>
                          ))}
                        </div>
                      ) : null}
                      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-100 pt-4">
                        <button
                          type="button"
                          onClick={() => setPreviewProject(project)}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-900"
                        >
                          Lihat pratinjau <ArrowUpRight className="h-4 w-4" />
                        </button>
                        {isValidLiveUrl(project.live_url) && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-950"
                          >
                            Website live <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-600">Punya kebutuhan serupa atau berbeda?</p>
            <a href="/contact" className="button-primary mt-4 px-5 py-3">
              Diskusikan ide Anda <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {previewProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPreviewProject(null);
          }}
        >
          <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Demo Concept</p>
                <h2 id="preview-title" className="mt-1 font-bold text-slate-950">{previewProject.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setPreviewProject(null)}
                aria-label="Tutup pratinjau"
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-slate-50 p-4 sm:p-8">
              <WebsitePreview title={previewProject.title} category={previewProject.category} />
            </div>
            <p className="px-5 py-4 text-sm leading-6 text-slate-600">{previewProject.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
