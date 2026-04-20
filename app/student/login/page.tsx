'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GraduationCap, User, Lock, Eye, EyeOff, CheckCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { STANDARDS, SUBJECTS } from '@/lib/types';

export default function StudentLoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [signName, setSignName] = useState('');
  const [signUsername, setSignUsername] = useState('');
  const [signPassword, setSignPassword] = useState('');
  const [showSignPw, setShowSignPw] = useState(false);
  const [signStandard, setSignStandard] = useState('');
  const [signSubjects, setSignSubjects] = useState<string[]>([]);
  const [signLoading, setSignLoading] = useState(false);
  const [signError, setSignError] = useState('');

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

  const toggleSignSubject = (sub: string) => {
    setSignSubjects(prev => prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]);
  };

  const handleSignup = async () => {
    if (!signName || !signUsername || !signPassword || !signStandard || signSubjects.length === 0) {
      setSignError('Please fill in all fields and select at least one subject.');
      return;
    }
    setSignLoading(true);
    setSignError('');
    const res = await fetch('/api/student/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: signName,
        username: signUsername,
        password: signPassword,
        standard: signStandard,
        subjects: signSubjects,
      }),
    });
    const data = await res.json();
    if (data.success) {
      router.push('/student/dashboard');
    } else {
      setSignError(data.error || 'Registration failed. Please try again.');
      setSignLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#0ea5e9] to-[#22c55e] p-8 text-center">
          <Link href="/" className="inline-block mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <GraduationCap size={28} className="text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-white">Vanaja Coaching Classes</h1>
          <p className="text-sky-100 text-sm mt-1">Student Portal</p>
        </div>

        <div className="flex border-b border-slate-100">
          {(['login', 'signup'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); setSignError(''); }}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-all ${
                tab === t
                  ? 'text-[#0ea5e9] border-b-2 border-[#0ea5e9]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {t === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'login' ? (
            <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-8 space-y-4">
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
                  <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl">
                  {error}
                </motion.p>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleLogin} disabled={loading}
                className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#22c55e] text-white font-black py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 text-lg mt-2"
              >
                {loading ? 'Logging in...' : 'Login →'}
              </motion.button>
              <p className="text-center text-slate-400 text-xs pt-2">
                Don't have an account?{' '}
                <button onClick={() => setTab('signup')} className="text-[#0ea5e9] font-bold hover:underline">Sign up here</button>
              </p>
            </motion.div>
          ) : (
            <motion.div key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={signName}
                    onChange={e => setSignName(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 font-medium focus:outline-none focus:border-[#0ea5e9] transition-colors"
                    placeholder="Your full name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Username</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={signUsername}
                    onChange={e => setSignUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                    className="w-full border-2 border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 font-medium focus:outline-none focus:border-[#0ea5e9] transition-colors"
                    placeholder="Choose a username"
                    autoComplete="username"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showSignPw ? 'text' : 'password'}
                    value={signPassword}
                    onChange={e => setSignPassword(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl pl-10 pr-12 py-3 text-slate-800 font-medium focus:outline-none focus:border-[#0ea5e9] transition-colors"
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                  />
                  <button onClick={() => setShowSignPw(!showSignPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showSignPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Standard</label>
                <div className="relative">
                  <BookOpen size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={signStandard}
                    onChange={e => setSignStandard(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 font-medium focus:outline-none focus:border-[#0ea5e9] transition-colors bg-white appearance-none"
                  >
                    <option value="">Select your standard</option>
                    {STANDARDS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">
                  Subjects <span className="text-slate-400 font-normal">(select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SUBJECTS.map(sub => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleSignSubject(sub)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${
                        signSubjects.includes(sub)
                          ? 'border-[#0ea5e9] bg-sky-50 text-[#0ea5e9]'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {signSubjects.includes(sub) && <CheckCircle size={12} />}
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
              {signError && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl">
                  {signError}
                </motion.p>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleSignup} disabled={signLoading}
                className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#22c55e] text-white font-black py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 text-lg"
              >
                {signLoading ? 'Creating account...' : 'Create Account →'}
              </motion.button>
              <p className="text-center text-slate-400 text-xs pb-2">
                Already have an account?{' '}
                <button onClick={() => setTab('login')} className="text-[#0ea5e9] font-bold hover:underline">Login here</button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
