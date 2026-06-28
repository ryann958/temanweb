"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock Authentication
    setTimeout(() => {
      if (username === 'admin' && password === 'password123') {
        // Save session locally
        localStorage.setItem('temanweb_admin_session', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('Username atau password salah.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-6 grid-bg">
      <div className="absolute top-10 left-10 w-[300px] h-[300px] glow-bg opacity-10 pointer-events-none z-0"></div>

      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-slate-200 shadow-xl relative z-10">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900">Admin Portal</h1>
          <p className="text-xs text-slate-500">Masuk untuk mengelola portofolio, pesan masuk, dan konten CMS.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-550 uppercase tracking-wider">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-450">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-white border border-slate-250 rounded-lg pl-10 pr-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-550 uppercase tracking-wider">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-450">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-slate-250 rounded-lg pl-10 pr-4 py-2.5 text-slate-850 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center">
              <AlertCircle className="mr-2 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98 disabled:opacity-50"
          >
            {loading ? 'Memvalidasi...' : 'Masuk Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center text-[10px] text-slate-400">
          Gunakan kredensial pengujian:<br />
          Username: <span className="font-mono text-slate-600 font-bold">admin</span> | Password: <span className="font-mono text-slate-600 font-bold">password123</span>
        </div>
      </div>
    </div>
  );
}
