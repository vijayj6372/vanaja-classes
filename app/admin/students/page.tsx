'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Student } from '@/lib/types';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '@/components/AdminLayout';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selected, setSelected] = useState<Student | null>(null);
  const [subjectCoins, setSubjectCoins] = useState<{ subject: string; coins: number }[]>([]);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [lastActive, setLastActive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadStudents = async () => {
    const { data } = await supabase.from('students').select('*').order('coins', { ascending: false });
    setStudents(data || []);
    setLoading(false);
  };

  useEffect(() => { loadStudents(); }, []);

  const openStudent = async (student: Student) => {
    setSelected(student);
    setSubjectCoins([]);
    setAccuracy(null);
    setLastActive(null);

    const { data: attempts } = await supabase
      .from('quiz_attempts')
      .select('is_correct, coins_earned, question_id')
      .eq('student_id', student.id);

    if (attempts && attempts.length > 0) {
      const correct = attempts.filter(a => a.is_correct).length;
      setAccuracy(Math.round((correct / attempts.length) * 100));
    }

    const { data: logs } = await supabase
      .from('activity_logs').select('date').eq('student_id', student.id)
      .order('date', { ascending: false }).limit(1);
    setLastActive(logs?.[0]?.date || null);

    const sc = student.subjects?.map(sub => ({
      subject: sub,
      coins: Math.floor((student.coins || 0) / Math.max(student.subjects?.length || 1, 1)),
    })) || [];
    setSubjectCoins(sc);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch('/api/admin/delete-student', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: deleteTarget.id }),
    });
    setDeleting(false);
    if (res.ok) {
      setDeleteTarget(null);
      setSelected(null);
      setStudents(prev => prev.filter(s => s.id !== deleteTarget.id));
    } else {
      alert('Failed to delete student. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-black mb-6">Student Analytics</h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Mobile: cards */}
            <div className="space-y-3 lg:hidden">
              {students.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0ea5e9] to-[#22c55e] rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">
                    {s.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm truncate">{s.name}</p>
                    <p className="text-slate-400 text-xs">{s.standard} · <span className="text-yellow-400">{s.coins} coins</span> · <span className="text-orange-400">{s.streak_days}d</span></p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openStudent(s)}
                      className="text-xs bg-purple-900/60 text-purple-300 hover:bg-purple-700 px-3 py-1.5 rounded-lg font-bold transition-all">
                      Details
                    </button>
                    <button onClick={() => setDeleteTarget(s)}
                      className="text-xs bg-red-900/60 text-red-300 hover:bg-red-700 px-2 py-1.5 rounded-lg font-bold transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              ))}
              {students.length === 0 && <div className="text-center py-20 text-slate-500">No students yet.</div>}
            </div>

            {/* Desktop: table */}
            <div className="hidden lg:block bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 text-left border-b border-slate-700 bg-slate-800/80">
                      <th className="px-6 py-4 font-semibold">Student</th>
                      <th className="px-6 py-4 font-semibold">Standard</th>
                      <th className="px-6 py-4 font-semibold">Coins</th>
                      <th className="px-6 py-4 font-semibold">Streak</th>
                      <th className="px-6 py-4 font-semibold">Joined</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, i) => (
                      <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                        className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#0ea5e9] to-[#22c55e] rounded-full flex items-center justify-center text-white font-black text-xs">
                              {s.name?.charAt(0).toUpperCase()}
                            </div>
                            <p className="font-bold text-white">{s.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{s.standard}</td>
                        <td className="px-6 py-4 text-yellow-400 font-bold">{s.coins}</td>
                        <td className="px-6 py-4 text-orange-400 font-bold">{s.streak_days}d</td>
                        <td className="px-6 py-4 text-slate-400">{new Date(s.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openStudent(s)}
                              className="text-xs bg-purple-900/60 text-purple-300 hover:bg-purple-700 px-3 py-1.5 rounded-lg font-bold transition-all">
                              Details
                            </button>
                            <button onClick={() => setDeleteTarget(s)}
                              className="text-xs bg-red-900/60 text-red-300 hover:bg-red-700 px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1">
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                    {students.length === 0 && (
                      <tr><td colSpan={6} className="px-6 py-20 text-center text-slate-500">No students registered yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-800 rounded-3xl p-5 sm:p-8 w-full max-w-lg border border-slate-700 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#0ea5e9] to-[#22c55e] rounded-xl flex items-center justify-center text-white font-black text-lg">
                    {selected.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-black text-white">{selected.name}</h3>
                    <p className="text-slate-400 text-sm">{selected.standard}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setDeleteTarget(selected)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/40 p-2 rounded-lg transition-all">
                    <Trash2 size={17} />
                  </button>
                  <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white p-1"><X size={20} /></button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-slate-700 rounded-xl p-3 text-center">
                  <div className="text-xl font-black text-yellow-400">{selected.coins}</div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">Coins</div>
                </div>
                <div className="bg-slate-700 rounded-xl p-3 text-center">
                  <div className="text-xl font-black text-orange-400">{selected.streak_days}d</div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">Streak</div>
                </div>
                <div className="bg-slate-700 rounded-xl p-3 text-center">
                  <div className="text-xl font-black text-green-400">{accuracy !== null ? `${accuracy}%` : '—'}</div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">Accuracy</div>
                </div>
              </div>

              {lastActive && (
                <p className="text-slate-400 text-sm mb-4">Last active: <span className="text-white font-semibold">{lastActive}</span></p>
              )}

              <div className="mb-4">
                <p className="text-sm font-bold text-slate-400 mb-2">Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {selected.subjects?.map(s => (
                    <span key={s} className="text-xs bg-sky-900/50 text-sky-300 px-3 py-1 rounded-full font-semibold">{s}</span>
                  ))}
                </div>
              </div>

              {subjectCoins.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-slate-400 mb-3">Coins by Subject</p>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={subjectCoins}>
                      <XAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, color: '#fff' }} />
                      <Bar dataKey="coins" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] px-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-3xl p-8 w-full max-w-sm border border-red-900/50 text-center">
              <div className="w-14 h-14 bg-red-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={28} className="text-red-400" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">Delete Student?</h3>
              <p className="text-slate-400 text-sm mb-1">
                You are about to permanently delete <span className="text-white font-bold">{deleteTarget.name}</span>.
              </p>
              <p className="text-slate-500 text-xs mb-6">
                All their quiz attempts, activity logs, and coins will also be deleted. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)} disabled={deleting}
                  className="flex-1 border-2 border-slate-600 text-slate-300 hover:border-slate-500 font-bold py-3 rounded-xl transition-all">
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={deleting}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                  {deleting ? (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Trash2 size={15} /> Delete</>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
