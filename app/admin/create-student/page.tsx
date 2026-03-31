'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { STANDARDS, SUBJECTS } from '@/lib/types';
import { UserPlus, CheckCircle, LayoutDashboard, Users, BookOpen, BarChart2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Sidebar() {
  const router = useRouter();
  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };
  const links = [
    { href: '/admin/dashboard', icon: <BarChart2 size={18} />, label: 'Dashboard' },
    { href: '/admin/create-student', icon: <UserPlus size={18} />, label: 'Create Student' },
    { href: '/admin/students', icon: <Users size={18} />, label: 'Students' },
    { href: '/admin/questions', icon: <BookOpen size={18} />, label: 'Questions' },
  ];
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={18} className="text-white" />
          </div>
          <div>
            <p className="font-black text-sm">Vanaja Admin</p>
            <p className="text-slate-400 text-xs">Coaching Classes</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(l => (
          <Link key={l.href} href={l.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all font-medium text-sm">
            {l.icon} {l.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-all font-medium text-sm w-full">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}

export default function CreateStudentPage() {
  const [form, setForm] = useState({ name: '', username: '', password: '', standard: '' });
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const toggleSubject = (s: string) => {
    setSelectedSubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.username || !form.password || !form.standard || selectedSubjects.length === 0) {
      setError('Please fill in all fields and select at least one subject.'); return;
    }
    setLoading(true); setError(''); setSuccess('');
    const res = await fetch('/api/admin/create-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, subjects: selectedSubjects }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      setSuccess(`Student "${form.name}" (username: ${form.username}) created successfully!`);
      setForm({ name: '', username: '', password: '', standard: '' });
      setSelectedSubjects([]);
    } else {
      setError(data.error || 'Failed to create student.');
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow">
              <UserPlus size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">Create Student</h1>
              <p className="text-slate-500 text-sm">Add a new student account to the platform.</p>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-5">
            {[
              { field: 'name', label: 'Student Name', placeholder: 'e.g. Rahul Patel', type: 'text' },
              { field: 'username', label: 'Username', placeholder: 'e.g. rahul10 (lowercase, no spaces)', type: 'text' },
              { field: 'password', label: 'Password', placeholder: 'e.g. rahul@123', type: 'password' },
            ].map(({ field, label, placeholder, type }) => (
              <div key={field}>
                <label className="block text-sm font-bold text-slate-600 mb-2">{label}</label>
                <input type={type} value={form[field as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-sky-400 transition-colors" />
              </div>
            ))}

            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Standard</label>
              <select value={form.standard} onChange={e => setForm(f => ({ ...f, standard: e.target.value }))}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-sky-400 bg-white">
                <option value="">Select standard</option>
                {STANDARDS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-600 mb-3">Subjects</label>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map(s => (
                  <button key={s} onClick={() => toggleSubject(s)} type="button"
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${selectedSubjects.includes(s) ? 'bg-sky-500 text-white border-sky-500' : 'border-slate-200 text-slate-600 hover:border-sky-300'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl">{error}</p>}

            {success && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 bg-green-50 border border-green-100 px-4 py-3 rounded-xl">
                <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                <p className="text-green-700 text-sm font-medium">{success}</p>
              </motion.div>
            )}

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleSubmit} disabled={loading}
              className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-black py-4 rounded-2xl shadow-lg disabled:opacity-50 text-base">
              {loading ? 'Creating...' : 'Create Student Account'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
