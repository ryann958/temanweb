"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  mockProjects, mockServices
} from '@/lib/supabase';
import { 
  FolderGit2, MessageSquare, Database,
  Trash2, Plus, LogOut, CheckCircle, Clock 
} from 'lucide-react';

type Message = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  business_name: string;
  budget: string;
  description: string;
  timeline: string;
  status: string;
  created_at: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'messages' | 'portfolio' | 'services'>('messages');

  const [messages, setMessages] = useState<Message[]>([]);

  const [projectsList, setProjectsList] = useState(mockProjects);
  const servicesList = mockServices;

  // Form States for adding new items
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Company',
    description: '',
    client: '',
    technology: '',
    image_url: '/hero-light-bg.png'
  });

  // Verify Session
  useEffect(() => {
    const session = localStorage.getItem('temanweb_admin_session');
    if (!session) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('temanweb_admin_session');
    router.push('/admin');
  };

  // Messages operations
  const toggleMessageStatus = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id 
        ? { ...msg, status: msg.status === 'New' ? 'Resolved' : 'New' } 
        : msg
    ));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  // Projects operations
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;

    const project = {
      id: (projectsList.length + 1).toString(),
      title: newProject.title,
      category: newProject.category,
      description: newProject.description,
      project_type: 'Demo Concept',
      features: [],
      client: 'Demo concept',
      technology: newProject.technology.split(',').map(t => t.trim()).filter(Boolean),
      image_url: newProject.image_url,
      live_url: ''
    };

    // Save project
    const updated = [project, ...projectsList];
    setProjectsList(updated);
    
    // Reset Form
    setNewProject({
      title: '',
      category: 'Company',
      description: '',
      client: '',
      technology: '',
      image_url: '/hero-light-bg.png'
    });

    alert('Portofolio baru berhasil ditambahkan secara lokal!');
  };

  const deleteProject = (id: string) => {
    setProjectsList(projectsList.filter(proj => proj.id !== id));
  };

  return (
    <div className="min-h-screen py-10 px-6 lg:px-8 max-w-7xl mx-auto space-y-8 grid-bg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Dashboard CMS</h1>
          <p className="text-xs text-slate-600">Selamat datang, Anda memiliki akses penuh ke manajemen konten TemanWeb.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" /> Keluar Sesi
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-5 border border-slate-200 flex justify-between items-center shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase">Pesan Masuk</span>
            <div className="text-2xl font-bold text-slate-900">{messages.filter(m => m.status === 'New').length} Baru</div>
          </div>
          <MessageSquare className="h-8 w-8 text-blue-600 opacity-80" />
        </div>
        <div className="glass-card rounded-xl p-5 border border-slate-200 flex justify-between items-center shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase">Portofolio</span>
            <div className="text-2xl font-bold text-slate-900">{projectsList.length} Proyek</div>
          </div>
          <FolderGit2 className="h-8 w-8 text-blue-600 opacity-80" />
        </div>
        <div className="glass-card rounded-xl p-5 border border-slate-200 flex justify-between items-center shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase">Layanan Jasa</span>
            <div className="text-2xl font-bold text-slate-900">{servicesList.length} Paket</div>
          </div>
          <Database className="h-8 w-8 text-blue-600 opacity-80" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200 flex space-x-6">
        <button
          onClick={() => setActiveTab('messages')}
          className={`pb-4 text-sm font-bold transition-colors focus:outline-none border-b-2 ${
            activeTab === 'messages' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Pesan Masuk ({messages.length})
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`pb-4 text-sm font-bold transition-colors focus:outline-none border-b-2 ${
            activeTab === 'portfolio' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Kelola Portofolio ({projectsList.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-400">Tidak ada pesan masuk.</div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className="glass-card rounded-xl p-6 border border-slate-200 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{msg.name} <span className="text-xs font-normal text-slate-500">({msg.business_name})</span></h3>
                      <p className="text-xs text-slate-500">{msg.email} | WA: {msg.whatsapp} | {msg.created_at}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        msg.status === 'New' 
                          ? 'bg-blue-50 border border-blue-200 text-blue-600' 
                          : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                      }`}>
                        {msg.status}
                      </span>
                      <button 
                        onClick={() => toggleMessageStatus(msg.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
                        title={msg.status === 'New' ? 'Tandai Selesai' : 'Tandai Baru'}
                      >
                        {msg.status === 'New' ? <CheckCircle className="h-4.5 w-4.5" /> : <Clock className="h-4.5 w-4.5" />}
                      </button>
                      <button 
                        onClick={() => deleteMessage(msg.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-650 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                  <hr className="border-slate-200" />
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><span className="font-bold text-slate-500 text-[10px] uppercase tracking-wider block mb-1">Kebutuhan Proyek:</span> {msg.description}</p>
                    <div className="flex gap-6 text-xs text-slate-500">
                      <span>Budget: <strong className="text-slate-900">{msg.budget}</strong></span>
                      <span>Batas Waktu: <strong className="text-slate-900">{msg.timeline}</strong></span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Add portfolio form */}
            <div className="lg:col-span-5 glass-card rounded-xl p-6 border border-slate-200 space-y-4 bg-slate-50 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Tambah Portofolio</h3>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-550 font-bold uppercase">Nama Proyek</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="Contoh: Konsep Kedai Kopi"
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-550 font-bold uppercase">Kategori</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  >
                    <option>Company</option>
                    <option>Dashboard</option>
                    <option>School</option>
                    <option>E-Commerce</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-550 font-bold uppercase">Teknologi (Pisahkan Koma)</label>
                  <input
                    type="text"
                    value={newProject.technology}
                    onChange={(e) => setNewProject({ ...newProject, technology: e.target.value })}
                    placeholder="Next.js, React, Tailwind CSS"
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-550 font-bold uppercase">Deskripsi Proyek</label>
                  <textarea
                    required
                    rows={3}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Jelaskan secara ringkas fitur dan tujuan website..."
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98"
                >
                  <Plus className="mr-2 h-4 w-4" /> Tambah ke Portofolio
                </button>
              </form>
            </div>

            {/* Right: Portfolio list */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Daftar Portofolio Saat Ini</h3>
              {projectsList.map(proj => (
                <div key={proj.id} className="glass-card rounded-xl p-4 border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 border border-slate-200"
                      style={{ backgroundImage: `url(${proj.image_url})` }}
                    ></div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{proj.title}</h4>
                      <p className="text-xs text-slate-500 uppercase font-bold">{proj.category}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteProject(proj.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
