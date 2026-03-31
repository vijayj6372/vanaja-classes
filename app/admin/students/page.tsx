'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Student } from '@/lib/types';
import { X, ClipboardList, BarChart2, Users, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function StudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [selected, setSelected] = useState<Student | null>(null);
  const [subjectCoins, setSubjectCoins] = useState<{ subject: string; coins: number }[]>([]);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [lastActive, setLastActive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('students').select('*').order('coins', { ascending: false }).then(({ data }) => {
      setStudents(data || []);
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

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
      .from('activity_logs')
      .select('date')
      .eq('student_id', student.id)
      .order('date', { ascending: false })
      .limit(1);
    setLastActive(logs?.[0]?.date || null);

    const sc = student.subjects?.map(sub => ({
      subject: sub,
      coins: Math.floor((student.coins || 0) / Math.max(student.subjects?.length || 1, 1)),
    })) || [];
    setSubjectCoins(sc);
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
            { href: '/admin/create-student', icon: <UserPlus size={18} />, label: 'Create Student' },
            { href: '/admin/students', icon: <Users size={18} />, label: 'Students' },
            { href: '/admin/questions', icon: <ClipboardList size={18} />, label: 'Questions' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-sm ${item.href === '/admin/students' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
              {item.icon}{item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button onClick={handleLogout} className="text-slate-400 hover:text-white text-sm font-semibold px-4 py-2">Logout</button>
        </div>
      </div>

      <div className="ml-60 p-8 flex-1">
        <h2 className="text-2xl font-black mb-8">Student Analytics</h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-left border-b border-slate-700 bg-slate-800/80">
                  <th className="px-6 py-4 font-semibold">Student</th>
                  <th className="px-6 py-4 font-semibold">Standard</th>
                  <th className="px-6 py-4 font-semibold">Coins</th>
                  <th className="px-6 py-4 font-semibold">Streak</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
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
                        <div>
                          <p className="font-bold text-white">{s.name}</p>
                          <p className="text-slate-400 text-xs">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{s.standard}</td>
                    <td className="px-6 py-4 text-yellow-400 font-bold">{s.coins}</td>
                    <td className="px-6 py-4 text-orange-400 font-bold">{s.streak_days}d</td>
                    <td className="px-6 py-4 text-slate-400">{new Date(s.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => openStudent(s)}
                        className="text-xs bg-purple-900/60 text-purple-300 hover:bg-purple-700 px-3 py-1.5 rounded-lg font-bold transition-all">
                        Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {students.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-20 text-center text-slate-500">No students registered yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-800 rounded-3xl p-8 w-full max-w-lg border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0ea5e9] to-[#22c55e] rounded-xl flex items-center justify-center text-white font-black text-xl">
                    {selected.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg">{selected.name}</h3>
                    <p className="text-slate-400 text-sm">{selected.standard}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white"><X size={22} /></button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-yellow-400">{selected.coins}</div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">Coins</div>
                </div>
                <div className="bg-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-orange-400">{selected.streak_days}d</div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">Streak</div>
                </div>
                <div className="bg-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-green-400">{accuracy !== null ? `${accuracy}%` : '—'}</div>
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
                  <p className="text-sm font-bold text-slate-400 mb-3">Coins by Subject (estimated)</p>
                  <ResponsiveContainer width="100%" height={150}>
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
    </div>
  );
}
