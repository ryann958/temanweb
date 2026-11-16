"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, MessageCircle, RotateCw } from "lucide-react";
import BlogCover from "@/components/BlogCover";
import { mockBlogs, supabase } from "@/lib/supabase";
import { createWhatsAppUrl } from "@/lib/whatsapp";

type BlogPost = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image_url: string | null;
};

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const visiblePost = supabase ? post : mockBlogs.find((blog) => blog.id === id) ?? null;

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    let active = true;
    async function fetchPost() {
      if (!client) return;
      setLoading(true);
      setLoadError(false);
      const { data, error } = await client.from("blogs").select("*").eq("id", id).maybeSingle();
      if (!active) return;

      if (error) {
        console.error("Gagal memuat artikel:", error);
        setLoadError(true);
      } else {
        setPost(data as BlogPost | null);
      }
      setLoading(false);
    }

    void fetchPost().catch((error: unknown) => {
      console.error("Gagal memuat artikel:", error);
      if (active) {
        setLoadError(true);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [id, retryCount]);

  return (
    <div className="page-shell">
      <article className="section-space">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
            <ArrowLeft className="h-4 w-4" /> Kembali ke artikel
          </Link>

          {loading ? (
            <p className="mt-10 border-y border-slate-200 py-10 text-sm text-slate-600" role="status" aria-live="polite">
              Memuat artikel...
            </p>
          ) : loadError ? (
            <div className="mt-10 border-y border-red-200 py-8" role="alert">
              <p className="font-semibold text-slate-950">Artikel belum berhasil dimuat.</p>
              <p className="mt-2 text-sm text-slate-600">Periksa koneksi, lalu coba lagi.</p>
              <button
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Coba lagi <RotateCw className="h-4 w-4" />
              </button>
            </div>
          ) : !visiblePost ? (
            <div className="mt-10 border-y border-slate-200 py-10">
              <h1 className="text-2xl font-bold text-slate-950">Artikel tidak ditemukan.</h1>
              <p className="mt-2 text-sm text-slate-600">Artikel ini mungkin sudah tidak tersedia.</p>
            </div>
          ) : (
            <>
              <header className="mt-8 border-b border-slate-300 pb-7">
                <p className="eyebrow">{visiblePost.category}</p>
                <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  {visiblePost.title}
                </h1>
                <time className="mt-5 inline-flex items-center gap-2 text-sm text-slate-600" dateTime={visiblePost.date}>
                  <CalendarDays className="h-4 w-4 text-blue-800" /> {visiblePost.date}
                </time>
              </header>
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-slate-100">
                <BlogCover imageUrl={visiblePost.image_url} sizes="(max-width: 768px) 100vw, 768px" />
              </div>
              <section className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-600">Ringkasan</h2>
                <p className="mt-3 text-lg leading-8 text-slate-700">{visiblePost.description}</p>
              </section>
              <a
                href={createWhatsAppUrl(`diskusi topik: ${visiblePost.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary mt-8 px-5 py-3"
              >
                <MessageCircle className="h-4 w-4" /> Diskusikan topik ini
              </a>
              {!supabase && (
                <p className="mt-4 text-xs text-slate-600">
                  Ini contoh lokal. Ringkasan artikel lengkap belum tersedia.
                </p>
              )}
            </>
          )}
        </div>
      </article>
    </div>
  );
}
