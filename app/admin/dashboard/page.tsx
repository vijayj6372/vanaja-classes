'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, BookOpen, Trophy, Coins, LogOut, ClipboardList, BarChart2 } from 'lucide-react';
import Link from 'next/link';

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function AdminDashboard() {
  const router = useRouter();
  const [totalStudents, setTotalStudents] = useState(0);
  const [subjectCoins, setSubjectCoins] = useState<{ subject: string; coins: number }[]>([]);
  const [attemptsPerStandard, setAttemptsPerStandard] = useState<{ standard: string; attempts: number }[]>([]);
  const [topStudents, setTopStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { count } = await supabase.from('students').select('*', { count: 'exact', head: true });
      setTotalStudents(count || 0);

      const { data: students } = await supabase.from('students').select('subjects, coins');
      const coinMap: Record<string, number> = {};
      students?.forEach(s => {
        s.subjects?.forEach((sub: string) => {
          coinMap[sub] = (coinMap[sub] || 0) + (s.coins || 0);
        });
      });
      setSubjectCoins(Object.entries(coinMap).map(([subject, coins]) => ({ subject, coins })));

      const { data: attempts } = await supabase.from('quiz_attempts').select('question_id');
      const { data: questions } = await supabase.from('quiz_questions').select('id, standard');
      const standardMap: Record<string, number> = {};
      attempts?.forEach(a => {
        const q = questions?.find(q => q.id === a.question_id);
        if (q) standardMap[q.standard] = (standardMap[q.standard] || 0) + 1;
      });
      setAttemptsPerStandard(Object.entries(standardMap).map(([standard, attempts]) => ({ standard, attempts })));

      const { data: top } = await supabase.from('students').select('*').order('coins', { ascending: false }).limit(5);
      setTopStudents(top || []);
      setLoading(false);
    }
    load();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-sm">
              {item.icon}{item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold transition-colors px-4 py-2">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="ml-60 p-8">
        <h2 className="text-2xl font-black mb-8">Dashboard Overview</h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {[
            { icon: <Users size={22} />, label: 'Total Students', value: totalStudents, color: 'from-sky-500 to-sky-600' },
            { icon: <BookOpen size={22} />, label: 'Questions', value: '—', color: 'from-green-500 to-green-600' },
            { icon: <Trophy size={22} />, label: 'Top Coins', value: topStudents[0]?.coins || 0, color: 'from-yellow-500 to-orange-500' },
            { icon: <Coins size={22} />, label: 'Subjects Tracked', value: subjectCoins.length, color: 'from-purple-500 to-indigo-600' },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${card.color} rounded-2xl p-5 shadow-lg`}>
              <div className="flex items-center justify-between mb-3">
                <div className="opacity-80">{card.icon}</div>
              </div>
              <div className="text-3xl font-black">{card.value}</div>
              <div className="text-white/70 text-sm font-semibold mt-1">{card.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="font-black text-white mb-4">Coins by Subject</h3>
            {subjectCoins.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={subjectCoins}>
                  <XAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, color: '#fff' }} />
                  <Bar dataKey="coins" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <p className="text-slate-400 text-sm text-center py-16">No data yet</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="font-black text-white mb-4">Quiz Attempts by Standard</h3>
            {attemptsPerStandard.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={attemptsPerStandard} dataKey="attempts" nameKey="standard" cx="50%" cy="50%" outerRadius={80} label>
                    {attemptsPerStandard.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, color: '#fff' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="text-slate-400 text-sm text-center py-16">No attempts yet</p>}
          </motion.div>
        </div>

        {/* Top Students */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="font-black text-white mb-4">Top 5 Students</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-left border-b border-slate-700">
                <th className="pb-3 font-semibold">Rank</th>
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Standard</th>
                <th className="pb-3 font-semibold">Coins</th>
                <th className="pb-3 font-semibold">Streak</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((s, i) => (
                <tr key={s.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 font-black text-slate-300">#{i + 1}</td>
                  <td className="py-3 font-bold text-white">{s.name}</td>
                  <td className="py-3 text-slate-400">{s.standard}</td>
                  <td className="py-3 text-yellow-400 font-bold">{s.coins}</td>
                  <td className="py-3 text-orange-400 font-bold">{s.streak_days}d</td>
                </tr>
              ))}
              {topStudents.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">No students yet</td></tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
