'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { STANDARDS, SUBJECTS } from '@/lib/types';
import { UserPlus, CheckCircle } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

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
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow shrink-0">
              <UserPlus size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">Create Student</h1>
              <p className="text-slate-400 text-sm">Add a new student account.</p>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-2xl border border-slate-700 p-5 sm:p-8 space-y-5">
            {[
              { field: 'name', label: 'Student Name', placeholder: 'e.g. Rahul Patel', type: 'text' },
              { field: 'username', label: 'Username', placeholder: 'e.g. rahul10 (lowercase, no spaces)', type: 'text' },
              { field: 'password', label: 'Password', placeholder: 'e.g. rahul@123', type: 'password' },
            ].map(({ field, label, placeholder, type }) => (
              <div key={field}>
                <label className="block text-sm font-bold text-slate-400 mb-2">{label}</label>
                <input type={type} value={form[field as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full bg-slate-700 border-2 border-slate-600 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-sky-400 transition-colors text-white placeholder:text-slate-500" />
              </div>
            ))}

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Standard</label>
              <select value={form.standard} onChange={e => setForm(f => ({ ...f, standard: e.target.value }))}
                className="w-full bg-slate-700 border-2 border-slate-600 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-sky-400 text-white">
                <option value="">Select standard</option>
                {STANDARDS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-3">Subjects</label>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map(s => (
                  <button key={s} onClick={() => toggleSubject(s)} type="button"
                    className={`px-3 py-2 rounded-xl text-sm font-bold transition-all border-2 ${selectedSubjects.includes(s) ? 'bg-sky-500 text-white border-sky-500' : 'border-slate-600 text-slate-300 hover:border-sky-400'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-sm font-medium bg-red-900/30 px-4 py-2 rounded-xl border border-red-700/50">{error}</p>}

            {success && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 bg-green-900/30 border border-green-700/50 px-4 py-3 rounded-xl">
                <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
                <p className="text-green-300 text-sm font-medium">{success}</p>
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
    </AdminLayout>
  );
}
