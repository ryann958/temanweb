"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Tag } from "lucide-react";
import { mockBlogs, supabase } from "@/lib/supabase";
import { createWhatsAppUrl } from "@/lib/whatsapp";

type BlogPost = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image_url: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogs);
  useEffect(() => {
    async function fetchBlogs() {
      if (!supabase) return;
      const { data, error } = await supabase.from("blogs").select("*").order("date", { ascending: false });
      if (error) {
        console.error("Gagal memuat artikel:", error);
        return;
      }
      if (data?.length) setBlogs(data as BlogPost[]);
    }

    void fetchBlogs().catch((error: unknown) => console.error("Gagal memuat artikel:", error));
  }, []);

  return (
    <div className="page-shell">
      <section className="section-space">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Catatan TemanWeb</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Ide praktis tentang website dan dunia digital.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Bacaan ringkas seputar website, SEO, dan langkah membangun kehadiran digital untuk usaha dan organisasi.
            </p>
          </div>

          <div className="mt-11 grid gap-6 md:grid-cols-2">
            {blogs.map((blog) => (
              <article key={blog.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white sm:flex">
                <div className="relative aspect-[16/9] overflow-hidden bg-blue-50 sm:aspect-auto sm:min-h-[250px] sm:w-[42%] sm:shrink-0">
                  <Image
                    src="/hero-light-bg.png"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-4 left-4 rounded-lg border border-white/80 bg-white/90 px-3 py-2 text-xs font-bold text-blue-800">
                    {blog.category}
                  </span>
                </div>
                <div className="flex flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-blue-700" /> {blog.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-blue-700" /> {blog.category}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold leading-snug text-slate-950">{blog.title}</h2>
                  <p className="mt-3 flex-grow text-sm leading-6 text-slate-600">{blog.description}</p>
                  <a
                    href={createWhatsAppUrl(`diskusi topik: ${blog.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
                  >
                    Tanyakan topik ini <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
