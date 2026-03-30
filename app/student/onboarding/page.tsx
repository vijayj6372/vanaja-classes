'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { STANDARDS, SUBJECTS } from '@/lib/types';
import { GraduationCap, CheckCircle } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [standard, setStandard] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/student/login'); return; }
      setName(user.user_metadata?.full_name || '');
      setEmail(user.email || '');
    });
  }, [router]);

  const toggleSubject = (sub: string) => {
    setSubjects(prev => prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]);
  };

  const handleSubmit = async () => {
    if (!standard || subjects.length === 0) {
      setError('Please select your standard and at least one subject.');
      return;
    }
    setLoading(true);
    setError('');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/student/login'); return; }

    const { error: dbErr } = await supabase.from('students').insert({
      id: user.id,
      email,
      name,
      standard,
      subjects,
      coins: 0,
      streak_days: 0,
    });

    if (dbErr) {
      setError(dbErr.message);
      setLoading(false);
    } else {
      router.push('/student/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0ea5e9] to-[#22c55e] rounded-xl flex items-center justify-center shadow">
            <GraduationCap size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Complete Your Profile</h1>
            <p className="text-slate-500 text-sm">Just a few details to get started</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:border-[#0ea5e9] transition-colors"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">Standard</label>
            <select
              value={standard}
              onChange={e => setStandard(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:border-[#0ea5e9] transition-colors bg-white"
            >
              <option value="">Select your standard</option>
              {STANDARDS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-600 mb-3">Subjects <span className="text-slate-400 font-normal">(select all that apply)</span></label>
            <div className="grid grid-cols-2 gap-2">
              {SUBJECTS.map(sub => (
                <button
                  key={sub}
                  onClick={() => toggleSubject(sub)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                    subjects.includes(sub)
                      ? 'border-[#0ea5e9] bg-sky-50 text-[#0ea5e9]'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {subjects.includes(sub) && <CheckCircle size={14} />}
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#22c55e] text-white font-black py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 text-lg"
          >
            {loading ? 'Saving...' : 'Go to Dashboard →'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
