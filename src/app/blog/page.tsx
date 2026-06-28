"use client";

import { useState, useEffect } from 'react';
import { supabase, mockBlogs } from '@/lib/supabase';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  const [blogs, setBlogs] = useState(mockBlogs);

  useEffect(() => {
    async function fetchBlogs() {
      if (!supabase) return;
      try {
        const { data } = await supabase.from('blogs').select('*');
        if (data && data.length > 0) {
          setBlogs(data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="relative min-h-screen py-16 px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="absolute top-20 right-10 w-[400px] h-[400px] glow-bg opacity-10 pointer-events-none z-0"></div>

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Artikel & Berita</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Kanal Informasi & Edukasi</h1>
        <p className="text-slate-655 font-medium">
          Dapatkan tips dan panduan seputar optimasi website, digital marketing, dan teknologi terkini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <div 
            key={blog.id} 
            className="glass-card rounded-2xl overflow-hidden p-0 border border-slate-200 hover:border-slate-350 transition-all flex flex-col md:flex-row"
          >
            <div 
              className="h-48 md:h-auto md:w-2/5 bg-cover bg-center shrink-0" 
              style={{ backgroundImage: `url(${blog.image_url})` }}
            ></div>
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <span className="flex items-center">
                    <Calendar className="mr-1.5 h-3.5 w-3.5 text-blue-600" />
                    {blog.date}
                  </span>
                  <span className="flex items-center">
                    <Tag className="mr-1.5 h-3.5 w-3.5 text-blue-600" />
                    {blog.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight hover:text-blue-600 transition-colors">
                  <a href="#">{blog.title}</a>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {blog.description}
                </p>
              </div>
              <div>
                <a href="#" className="inline-flex items-center text-sm font-bold text-blue-650 hover:text-blue-750">
                  Baca Selengkapnya <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
