'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GraduationCap, User, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function StudentLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) { setError('Please enter your username and password.'); return; }
    setLoading(true);
    setError('');

    const res = await fetch('/api/student/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.success) {
      router.push('/student/dashboard');
    } else {
      setError(data.error || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
      >
        <Link href="/" className="inline-block mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0ea5e9] to-[#22c55e] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <GraduationCap size={32} className="text-white" />
          </div>
        </Link>

        <h1 className="text-3xl font-black text-slate-800 mb-1 text-center">Student Login</h1>
        <p className="text-slate-500 mb-8 text-sm text-center">
          Vanaja Coaching Classes — Enter your username and password.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">Username</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full border-2 border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 font-medium focus:outline-none focus:border-[#0ea5e9] transition-colors"
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full border-2 border-slate-200 rounded-xl pl-10 pr-12 py-3 text-slate-800 font-medium focus:outline-none focus:border-[#0ea5e9] transition-colors"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl">
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#22c55e] text-white font-black py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 text-lg mt-2"
          >
            {loading ? 'Logging in...' : 'Login →'}
          </motion.button>
        </div>

        <p className="text-center text-slate-400 text-xs mt-6">
          Your account is created by your coaching institute admin.
        </p>
      </motion.div>
    </div>
  );
}
