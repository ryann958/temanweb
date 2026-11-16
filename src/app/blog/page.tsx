"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, MessageCircle, RotateCw, Tag } from "lucide-react";
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(supabase ? [] : mockBlogs);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    let active = true;

    async function fetchBlogs() {
      if (!client) return;
      setLoading(true);
      setLoadError(false);
      const { data, error } = await client.from("blogs").select("*").order("date", { ascending: false });
      if (!active) return;

      if (error) {
        console.error("Gagal memuat artikel:", error);
        setLoadError(true);
      } else {
        setBlogs((data ?? []) as BlogPost[]);
      }
      setLoading(false);
    }

    void fetchBlogs().catch((error: unknown) => {
      console.error("Gagal memuat artikel:", error);
      if (active) {
        setLoadError(true);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [retryCount]);

  return (
    <div className="page-shell">
      <section className="section-space">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <header className="max-w-3xl border-b border-slate-300 pb-8">
            <p className="eyebrow">Catatan TemanWeb</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Topik seputar website sebelum Anda mulai.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Baca ringkasan, lalu buka catatan untuk melihat topik dan menghubungi kami jika ingin berdiskusi.
            </p>
          </header>

          {!supabase && (
            <p className="mt-6 border-l-2 border-blue-700 pl-3 text-sm text-slate-600">
              Artikel yang tampil adalah contoh lokal.
            </p>
          )}

          {loading ? (
            <div className="mt-10 border-y border-slate-200 py-10 text-sm text-slate-600" role="status" aria-live="polite">
              Memuat artikel...
            </div>
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
          ) : blogs.length === 0 ? (
            <div className="mt-10 border-y border-slate-200 py-10">
              <p className="font-semibold text-slate-950">Belum ada artikel.</p>
              <p className="mt-2 text-sm text-slate-600">Silakan kembali lagi nanti atau tanyakan langsung kepada TemanWeb.</p>
            </div>
          ) : (
            <div className="mt-8 divide-y divide-slate-200">
              {blogs.map((blog) => (
                <article key={blog.id} className="grid gap-5 py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
                  <Link
                    href={`/blog/${encodeURIComponent(blog.id)}`}
                    className="relative block aspect-[16/10] overflow-hidden rounded-lg bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    aria-label={`Buka ringkasan: ${blog.title}`}
                  >
                    <BlogCover imageUrl={blog.image_url} sizes="(max-width: 640px) 100vw, 200px" />
                  </Link>
                  <div className="flex flex-col items-start">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
                      <time className="inline-flex items-center gap-1.5" dateTime={blog.date}>
                        <CalendarDays className="h-3.5 w-3.5 text-blue-800" /> {blog.date}
                      </time>
                      <span className="inline-flex items-center gap-1.5">
                        <Tag className="h-3.5 w-3.5 text-blue-800" /> {blog.category}
                      </span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold leading-snug text-slate-950">
                      <Link href={`/blog/${encodeURIComponent(blog.id)}`} className="hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                        {blog.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{blog.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <Link href={`/blog/${encodeURIComponent(blog.id)}`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                        Baca ringkasan <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={createWhatsAppUrl(`diskusi topik: ${blog.title}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                      >
                        Diskusikan topik <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
