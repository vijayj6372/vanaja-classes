'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Student } from '@/lib/types';
import { Trophy, Flame, Coins, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [myId, setMyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch('/api/student/me');
      if (meRes.ok) {
        const { student } = await meRes.json();
        setMyId(student?.id || null);
      }
      const { data } = await supabase.from('students').select('*').order('coins', { ascending: false }).limit(50);
      setStudents(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const medal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/student/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 font-medium">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow">
            <Trophy size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800">Leaderboard</h1>
            <p className="text-slate-500 text-sm">Top students ranked by coins earned</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {students.map((student, i) => (
              <motion.div key={student.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Link href={`/student/profile/${student.id}`}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all hover:shadow-md ${student.id === myId ? 'bg-sky-50 border-sky-200' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                  <div className="w-10 text-center">
                    {medal(i + 1) ? <span className="text-2xl">{medal(i + 1)}</span> : <span className="text-slate-400 font-black text-lg">#{i + 1}</span>}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0ea5e9] to-[#22c55e] rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">
                    {student.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-800 truncate">
                      {student.name}
                      {student.id === myId && <span className="ml-2 text-xs bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full font-bold">You</span>}
                    </p>
                    <p className="text-slate-400 text-sm">{student.standard}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Coins size={15} />
                      <span className="font-black text-slate-700 text-sm">{student.coins}</span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-400">
                      <Flame size={15} />
                      <span className="font-bold text-slate-600 text-sm">{student.streak_days}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {students.length === 0 && <div className="text-center py-20 text-slate-400 font-medium">No students yet.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
