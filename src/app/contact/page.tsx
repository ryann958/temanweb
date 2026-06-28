"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    businessName: '',
    budget: 'Rp 350 Ribu - Rp 1 Juta',
    description: '',
    timeline: '1-2 Minggu'
  });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus({ type: null, message: '' });

    try {
      if (supabase) {
        const { error } = await supabase.from('messages').insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            whatsapp: formData.whatsapp,
            business_name: formData.businessName,
            budget: formData.budget,
            description: formData.description,
            timeline: formData.timeline
          }
        ]);
        if (error) throw error;
      } else {
        // Simulate local submission
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setFormStatus({
        type: 'success',
        message: `Halo ${formData.name}, pengajuan brief proyek Anda telah berhasil kami terima! Kami akan segera menghubungi Anda.`
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        businessName: '',
        budget: 'Rp 350 Ribu - Rp 1 Juta',
        description: '',
        timeline: '1-2 Minggu'
      });
    } catch (err) {
      console.error(err);
      setFormStatus({
        type: 'error',
        message: 'Gagal mengirim pesan. Silakan coba kembali atau hubungi kami langsung via WhatsApp.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen py-16 px-6 lg:px-8 max-w-7xl mx-auto z-10 grid-bg">
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] glow-bg opacity-10 pointer-events-none z-0"></div>

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Hubungi Kami</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Diskusikan Ide Hebat Anda</h1>
        <p className="text-slate-655 font-medium">
          Kami siap membantu mewujudkan rancangan website terbaik untuk menunjang branding bisnis Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-card rounded-2xl p-8 border border-slate-200 space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Informasi Kontak</h3>
            <p className="text-sm text-slate-650">
              Jangan ragu untuk mengirim brief atau sekadar berkonsultasi mengenai kelayakan teknis proyek Anda.
            </p>
            <hr className="border-slate-200" />
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-slate-700 text-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Surel / Email</h4>
                  <p className="text-xs text-slate-500">Ryannn0302@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-slate-700 text-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Nomor WhatsApp</h4>
                  <p className="text-xs text-slate-500">+62 813-6379-9776</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-slate-700 text-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Kantor Pusat</h4>
                  <p className="text-xs text-slate-500">Kepulauan Meranti, Riau, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WA CTA */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200 text-center space-y-4 bg-slate-50 shadow-sm">
            <h4 className="font-bold text-slate-900 text-base">Konsultasi Express via WA?</h4>
            <p className="text-xs text-slate-600">Hubungi langsung via chat WhatsApp dengan respon cepat kurang dari 1 jam.</p>
            <a 
              href="https://wa.me/6281363799776?text=Halo%20TemanWeb%2C%20saya%20tertarik%20untuk%20berkonsultasi%20mengenai%20jasa%20pembuatan%20website.%0A%0ABerikut%20detail%20rencana%20proyek%20saya%3A%0A-%20Nama%3A%20%0A-%20Nama%20Bisnis%3A%20%0A-%20Estimasi%20Budget%3A%20%0A-%20Deskripsi%20Kebutuhan%3A%20%0A%0AMohon%20informasi%20lebih%20lanjut.%20Terima%20kasih%21" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center w-full justify-center px-5 py-3 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-md shadow-emerald-500/10"
            >
              <MessageSquare className="mr-2 h-4 w-4 fill-current" /> Chat WhatsApp Sekarang
            </a>
          </div>
        </div>

        {/* Project Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl p-8 border border-slate-200/80 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Formulir Pengajuan Proyek</h3>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Lengkap</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nama Anda"
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Alamat Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@contoh.com"
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="whatsapp" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nomor WhatsApp</label>
                  <input 
                    type="text" 
                    id="whatsapp" 
                    required 
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="0812xxxxxx"
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="businessName" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Bisnis</label>
                  <input 
                    type="text" 
                    id="businessName" 
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Nama Perusahaan (opsional)"
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimasi Budget</label>
                  <select 
                    id="budget" 
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  >
                    <option>Rp 350 Ribu - Rp 1 Juta</option>
                    <option>Rp 1 Juta - Rp 3 Juta</option>
                    <option>Rp 3 Juta - Rp 7 Juta</option>
                    <option>Rp 7 Juta - Rp 15 Juta</option>
                    <option>Di atas Rp 15 Juta</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="timeline" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Batas Waktu Proyek</label>
                  <select 
                    id="timeline" 
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  >
                    <option>1-2 Minggu</option>
                    <option>2-4 Minggu</option>
                    <option>1-2 Bulan</option>
                    <option>2 Bulan+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deskripsi Kebutuhan</label>
                <textarea 
                  id="description" 
                  required 
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detail fitur-fitur website yang Anda butuhkan..."
                  className="w-full bg-white border border-slate-250 rounded-lg px-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                ></textarea>
              </div>

              {formStatus.type && (
                <div className={`p-4 rounded-lg text-sm ${
                  formStatus.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  {formStatus.message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98 transition-all disabled:opacity-50"
              >
                {loading ? 'Mengirim...' : 'Kirim Brief Proyek'} <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
