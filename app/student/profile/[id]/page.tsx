'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Student, ActivityLog } from '@/lib/types';
import { Coins, Flame, Trophy, ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

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
        <div key={i} title={`${cell.date}: ${cell.count}`} className={`w-full aspect-square rounded-sm ${getColor(cell.count)}`} />
      ))}
    </div>
  );
}

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [student, setStudent] = useState<Student | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [studentRes, logsRes, attemptsRes, rankRes] = await Promise.all([
        supabase.from('students').select('*').eq('id', id).single(),
        supabase.from('activity_logs').select('*').eq('student_id', id),
        supabase.from('quiz_attempts').select('is_correct').eq('student_id', id),
        fetch('/api/student/rank?id=' + id),
      ]);
      setStudent(studentRes.data);
      setLogs(logsRes.data || []);
      if (attemptsRes.data && attemptsRes.data.length > 0) {
        const correct = attemptsRes.data.filter(a => a.is_correct).length;
        setAccuracy(Math.round((correct / attemptsRes.data.length) * 100));
      }
      if (rankRes.ok) setRank((await rankRes.json()).rank);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!student) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-500 font-medium mb-4">Student not found.</p>
        <Link href="/student/leaderboard" className="text-[#0ea5e9] font-bold">← Back to Leaderboard</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/student/leaderboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-8 font-medium">
          <ArrowLeft size={18} /> Back to Leaderboard
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#0ea5e9] to-[#22c55e] rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-lg">
              {student.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">{student.name}</h1>
              <p className="text-slate-500">{student.standard}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {student.subjects?.map(s => (
                  <span key={s} className="text-xs bg-sky-50 text-sky-600 border border-sky-100 px-2 py-0.5 rounded-full font-semibold">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <Coins size={18} className="text-yellow-500" />, label: 'Coins', value: student.coins },
              { icon: <Flame size={18} className="text-orange-500" />, label: 'Streak', value: `${student.streak_days}d` },
              { icon: <Trophy size={18} className="text-purple-500" />, label: 'Rank', value: rank ? `#${rank}` : '—' },
              { icon: <BookOpen size={18} className="text-sky-500" />, label: 'Accuracy', value: accuracy !== null ? `${accuracy}%` : '—' },
            ].map((stat, i) => (
              <div key={i} className="text-center bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex justify-center mb-1">{stat.icon}</div>
                <div className="text-xl font-black text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-400 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-lg font-black text-slate-800 mb-4">Monthly Activity</h2>
          <ActivityGrid logs={logs} />
        </motion.div>
      </div>
    </div>
  );
}
