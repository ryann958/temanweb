"use client";

import { useState, useEffect } from 'react';
import { supabase, mockProjects } from '@/lib/supabase';
import { ArrowUpRight } from 'lucide-react';

export default function PortfolioPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Company', 'Dashboard', 'School', 'E-Commerce'];

  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) return;
      try {
        const { data } = await supabase.from('projects').select('*');
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="relative min-h-screen py-16 px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Background blur */}
      <div className="absolute top-40 right-10 w-[400px] h-[400px] glow-bg opacity-15 pointer-events-none z-0"></div>

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Portofolio</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Karya Kreatif & Sistem Unggulan</h1>
        <p className="text-slate-655 font-medium">
          Daftar beberapa proyek pilihan yang telah kami bangun dengan kepuasan klien maksimal.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all focus:outline-none ${
              activeFilter === filter
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-350'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          Belum ada proyek portofolio untuk kategori ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="glass-card rounded-xl overflow-hidden p-0 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div 
                className="h-56 bg-cover bg-center" 
                style={{ backgroundImage: `url(${project.image_url})` }}
              >
                <div className="w-full h-full bg-slate-950/20 backdrop-blur-[0.5px] hover:backdrop-blur-none transition-all flex items-end p-4">
                  <span className="px-3 py-1 text-xs font-bold bg-blue-650/90 text-white rounded-full uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-200/60 mt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technology.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded text-xs bg-slate-50 border border-slate-200 text-slate-600 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.live_url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-bold text-blue-650 hover:text-blue-750"
                  >
                    Kunjungi Website <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
