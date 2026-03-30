'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { QuizQuestion, STANDARDS, SUBJECTS } from '@/lib/types';
import { Plus, Pencil, Trash2, X, ClipboardList, BarChart2, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const emptyForm = { standard: '', subject: '', question: '', options: ['', '', '', ''], correct_answer: '', coins_reward: 5 };

export default function QuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterStd, setFilterStd] = useState('');
  const [filterSub, setFilterSub] = useState('');

  const load = async () => {
    let query = supabase.from('quiz_questions').select('*').order('created_at', { ascending: false });
    if (filterStd) query = query.eq('standard', filterStd);
    if (filterSub) query = query.eq('subject', filterSub);
    const { data } = await query;
    setQuestions(data || []);
  };

  useEffect(() => { load(); }, [filterStd, filterSub]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleSave = async () => {
    if (!form.standard || !form.subject || !form.question || form.options.some(o => !o) || !form.correct_answer) return;
    setLoading(true);
    if (editId) {
      await supabase.from('quiz_questions').update({ ...form }).eq('id', editId);
    } else {
      await supabase.from('quiz_questions').insert({ ...form });
    }
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
    await load();
    setLoading(false);
  };

  const handleEdit = (q: QuizQuestion) => {
    setForm({ standard: q.standard, subject: q.subject, question: q.question, options: q.options as string[], correct_answer: q.correct_answer, coins_reward: q.coins_reward });
    setEditId(q.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this question?')) return;
    await supabase.from('quiz_questions').delete().eq('id', id);
    await load();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-60 bg-slate-800 border-r border-slate-700 flex flex-col z-10">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-lg font-black text-white">Admin Panel</h1>
          <p className="text-slate-400 text-xs mt-0.5">Vanaja Coaching Classes</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/admin/dashboard', icon: <BarChart2 size={18} />, label: 'Dashboard' },
            { href: '/admin/questions', icon: <ClipboardList size={18} />, label: 'Questions' },
            { href: '/admin/students', icon: <Users size={18} />, label: 'Students' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-sm ${item.href === '/admin/questions' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
              {item.icon}{item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button onClick={handleLogout} className="text-slate-400 hover:text-white text-sm font-semibold px-4 py-2">Logout</button>
        </div>
      </div>

      <div className="ml-60 p-8 flex-1">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black">Question Manager</h2>
          <button onClick={() => { setForm(emptyForm); setEditId(null); setShowModal(true); }}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-3 rounded-xl transition-all">
            <Plus size={18} /> Add Question
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <select value={filterStd} onChange={e => setFilterStd(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-purple-500">
            <option value="">All Standards</option>
            {STANDARDS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterSub} onChange={e => setFilterSub(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-purple-500">
            <option value="">All Subjects</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          {questions.map((q, i) => (
            <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded-full font-semibold">{q.standard}</span>
                  <span className="text-xs bg-sky-900/60 text-sky-300 px-2 py-0.5 rounded-full font-semibold">{q.subject}</span>
                  <span className="text-xs bg-yellow-900/60 text-yellow-300 px-2 py-0.5 rounded-full font-semibold">+{q.coins_reward} coins</span>
                </div>
                <p className="text-white font-semibold text-sm leading-snug">{q.question}</p>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {(q.options as string[]).map((opt, j) => (
                    <span key={j} className={`text-xs px-2 py-1 rounded-lg ${opt === q.correct_answer ? 'bg-green-900/50 text-green-300 font-bold' : 'text-slate-400'}`}>
                      {opt === q.correct_answer && '✓ '}{opt}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(q)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(q.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
          {questions.length === 0 && (
            <div className="text-center py-20 text-slate-500 font-medium">No questions yet. Add your first one!</div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-800 rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black">{editId ? 'Edit Question' : 'Add Question'}</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white"><X size={22} /></button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-1">Standard</label>
                    <select value={form.standard} onChange={e => setForm(f => ({ ...f, standard: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500">
                      <option value="">Select</option>
                      {STANDARDS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-1">Subject</label>
                    <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500">
                      <option value="">Select</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-1">Question</label>
                  <textarea value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} rows={3}
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 resize-none"
                    placeholder="Enter the question" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Options</label>
                  <div className="space-y-2">
                    {form.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-slate-500 text-sm font-bold w-6">{String.fromCharCode(65 + i)}.</span>
                        <input value={opt} onChange={e => {
                          const opts = [...form.options];
                          opts[i] = e.target.value;
                          setForm(f => ({ ...f, options: opts }));
                        }} className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                          placeholder={`Option ${String.fromCharCode(65 + i)}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-1">Correct Answer</label>
                    <select value={form.correct_answer} onChange={e => setForm(f => ({ ...f, correct_answer: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500">
                      <option value="">Select</option>
                      {form.options.filter(o => o).map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-1">Coins Reward</label>
                    <input type="number" value={form.coins_reward} onChange={e => setForm(f => ({ ...f, coins_reward: parseInt(e.target.value) || 5 }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500" min={1} />
                  </div>
                </div>

                <button onClick={handleSave} disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-3.5 rounded-2xl transition-all disabled:opacity-50 mt-2">
                  {loading ? 'Saving...' : editId ? 'Update Question' : 'Add Question'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
