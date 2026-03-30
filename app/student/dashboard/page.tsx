'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Student, ActivityLog } from '@/lib/types';
import { Coins, Flame, Trophy, BookOpen, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';

function ActivityGrid({ logs }: { logs: ActivityLog[] }) {
  const today = new Date();
  const cells: { date: string; count: number }[] = [];
  for (let i = 34; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const log = logs.find(l => l.date === dateStr);
    cells.push({ date: dateStr, count: log?.activity_count || 0 });
  }

  const getColor = (count: number) => {
    if (count === 0) return 'bg-slate-100';
    if (count <= 3) return 'bg-green-200';
    if (count <= 6) return 'bg-green-400';
    return 'bg-green-600';
  };

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {cells.map((cell, i) => (
        <div
          key={i}
          title={`${cell.date}: ${cell.count} activities`}
          className={`w-full aspect-square rounded-sm ${getColor(cell.count)} transition-colors`}
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [rank, setRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/student/login'); return; }

      const { data: studentData } = await supabase
        .from('students')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!studentData) { router.push('/student/onboarding'); return; }
      setStudent(studentData);

      const { data: logData } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('student_id', user.id);
      setLogs(logData || []);

      const { data: allStudents } = await supabase
        .from('students')
        .select('id, coins')
        .order('coins', { ascending: false });

      if (allStudents) {
        const idx = allStudents.findIndex(s => s.id === user.id);
        setRank(idx + 1);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-[Inter,sans-serif]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0ea5e9] to-[#22c55e] text-white px-6 py-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sky-100 text-sm font-medium">Welcome back,</p>
            <h1 className="text-2xl font-black">{student?.name}</h1>
            <p className="text-sky-100 text-sm mt-0.5">{student?.standard} · {student?.subjects?.join(', ')}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Coins size={22} className="text-yellow-500" />, label: 'Coins', value: student?.coins || 0, bg: 'bg-yellow-50 border-yellow-100' },
            { icon: <Flame size={22} className="text-orange-500" />, label: 'Streak', value: `${student?.streak_days || 0} days`, bg: 'bg-orange-50 border-orange-100' },
            { icon: <Trophy size={22} className="text-purple-500" />, label: 'Rank', value: rank ? `#${rank}` : '—', bg: 'bg-purple-50 border-purple-100' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${stat.bg} border-2 rounded-2xl p-5 text-center`}
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-slate-800">{stat.value}</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Activity Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-black text-slate-800 mb-4">Monthly Activity</h2>
          <ActivityGrid logs={logs} />
          <div className="flex items-center gap-3 mt-4 text-xs text-slate-400">
            <span>Less</span>
            {['bg-slate-100','bg-green-200','bg-green-400','bg-green-600'].map(c => (
              <div key={c} className={`w-4 h-4 rounded-sm ${c}`} />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-3">
          {[
            { href: '/student/quiz', icon: <BookOpen size={20} />, label: 'Start a Quiz', desc: 'Practice and earn coins', color: 'text-sky-600 bg-sky-50' },
            { href: '/student/leaderboard', icon: <Trophy size={20} />, label: 'Leaderboard', desc: 'See top students', color: 'text-purple-600 bg-purple-50' },
          ].map((action, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
              <Link href={action.href} className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${action.color}`}>{action.icon}</div>
                  <div>
                    <p className="font-bold text-slate-800">{action.label}</p>
                    <p className="text-slate-400 text-sm">{action.desc}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
