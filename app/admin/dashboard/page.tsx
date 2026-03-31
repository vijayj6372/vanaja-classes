'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, BookOpen, Trophy, Coins } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function AdminDashboard() {
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

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-black mb-6">Dashboard Overview</h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6">
          {[
            { icon: <Users size={20} />, label: 'Total Students', value: totalStudents, color: 'from-sky-500 to-sky-600' },
            { icon: <BookOpen size={20} />, label: 'Subjects', value: subjectCoins.length, color: 'from-green-500 to-green-600' },
            { icon: <Trophy size={20} />, label: 'Top Coins', value: topStudents[0]?.coins || 0, color: 'from-yellow-500 to-orange-500' },
            { icon: <Coins size={20} />, label: 'Quiz Attempts', value: attemptsPerStandard.reduce((a, b) => a + b.attempts, 0), color: 'from-purple-500 to-indigo-600' },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${card.color} rounded-2xl p-4 sm:p-5 shadow-lg`}>
              <div className="opacity-80 mb-2">{card.icon}</div>
              <div className="text-2xl sm:text-3xl font-black">{card.value}</div>
              <div className="text-white/70 text-xs sm:text-sm font-semibold mt-1">{card.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-700">
            <h3 className="font-black text-white mb-4 text-sm sm:text-base">Coins by Subject</h3>
            {subjectCoins.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={subjectCoins}>
                  <XAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }} />
                  <Bar dataKey="coins" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <p className="text-slate-400 text-sm text-center py-16">No data yet</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-700">
            <h3 className="font-black text-white mb-4 text-sm sm:text-base">Quiz Attempts by Standard</h3>
            {attemptsPerStandard.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={attemptsPerStandard} dataKey="attempts" nameKey="standard" cx="50%" cy="50%" outerRadius={70} label>
                    {attemptsPerStandard.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="text-slate-400 text-sm text-center py-16">No attempts yet</p>}
          </motion.div>
        </div>

        {/* Top Students */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-700 overflow-x-auto">
          <h3 className="font-black text-white mb-4 text-sm sm:text-base">Top 5 Students</h3>
          <table className="w-full text-sm min-w-[400px]">
            <thead>
              <tr className="text-slate-400 text-left border-b border-slate-700">
                <th className="pb-3 font-semibold">Rank</th>
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold hidden sm:table-cell">Standard</th>
                <th className="pb-3 font-semibold">Coins</th>
                <th className="pb-3 font-semibold">Streak</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((s, i) => (
                <tr key={s.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 font-black text-slate-300">#{i + 1}</td>
                  <td className="py-3 font-bold text-white">{s.name}</td>
                  <td className="py-3 text-slate-400 hidden sm:table-cell">{s.standard}</td>
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
    </AdminLayout>
  );
}
