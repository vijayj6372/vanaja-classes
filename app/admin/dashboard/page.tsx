'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid,
} from 'recharts';
import { Users, BookOpen, Trophy, Zap, Target, TrendingUp } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 shadow-xl text-sm">
        <p className="text-slate-300 font-semibold mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || p.fill }} className="font-bold">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [avgAccuracy, setAvgAccuracy] = useState(0);

  const [coinsBySubject, setCoinsBySubject] = useState<{ subject: string; coins: number }[]>([]);
  const [attemptsByStandard, setAttemptsByStandard] = useState<{ standard: string; attempts: number }[]>([]);
  const [accuracyBySubject, setAccuracyBySubject] = useState<{ subject: string; accuracy: number; total: number }[]>([]);
  const [studentsByStandard, setStudentsByStandard] = useState<{ standard: string; count: number }[]>([]);
  const [dailyActivity, setDailyActivity] = useState<{ date: string; activities: number }[]>([]);
  const [topStudents, setTopStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // --- Basic counts ---
      const [studentsCount, questionsCount] = await Promise.all([
        supabase.from('students').select('*', { count: 'exact', head: true }),
        supabase.from('quiz_questions').select('*', { count: 'exact', head: true }),
      ]);
      setTotalStudents(studentsCount.count || 0);
      setTotalQuestions(questionsCount.count || 0);

      // --- Accurate: quiz_attempts joined with quiz_questions for subject & standard ---
      const { data: attemptsRaw } = await supabase
        .from('quiz_attempts')
        .select('is_correct, coins_earned, quiz_questions(subject, standard)');

      const attempts = attemptsRaw || [];
      setTotalAttempts(attempts.length);

      // Accuracy overall
      if (attempts.length > 0) {
        const correct = attempts.filter((a: any) => a.is_correct).length;
        setAvgAccuracy(Math.round((correct / attempts.length) * 100));
      }

      // Coins by subject — accurate sum of actual coins earned per subject
      const subjectCoinMap: Record<string, number> = {};
      const subjectAttemptMap: Record<string, { correct: number; total: number }> = {};
      const standardAttemptMap: Record<string, number> = {};

      attempts.forEach((a: any) => {
        const subject = a.quiz_questions?.subject;
        const standard = a.quiz_questions?.standard;
        if (subject) {
          subjectCoinMap[subject] = (subjectCoinMap[subject] || 0) + (a.coins_earned || 0);
          if (!subjectAttemptMap[subject]) subjectAttemptMap[subject] = { correct: 0, total: 0 };
          subjectAttemptMap[subject].total += 1;
          if (a.is_correct) subjectAttemptMap[subject].correct += 1;
        }
        if (standard) {
          standardAttemptMap[standard] = (standardAttemptMap[standard] || 0) + 1;
        }
      });

      setCoinsBySubject(
        Object.entries(subjectCoinMap)
          .map(([subject, coins]) => ({ subject, coins }))
          .sort((a, b) => b.coins - a.coins)
      );

      setAccuracyBySubject(
        Object.entries(subjectAttemptMap)
          .map(([subject, { correct, total }]) => ({
            subject,
            accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
            total,
          }))
          .sort((a, b) => b.accuracy - a.accuracy)
      );

      setAttemptsByStandard(
        Object.entries(standardAttemptMap)
          .map(([standard, attempts]) => ({ standard, attempts }))
          .sort((a, b) => a.standard.localeCompare(b.standard))
      );

      // Students by standard
      const { data: studentsData } = await supabase.from('students').select('standard');
      const stdMap: Record<string, number> = {};
      studentsData?.forEach(s => {
        if (s.standard) stdMap[s.standard] = (stdMap[s.standard] || 0) + 1;
      });
      setStudentsByStandard(
        Object.entries(stdMap)
          .map(([standard, count]) => ({ standard, count }))
          .sort((a, b) => a.standard.localeCompare(b.standard))
      );

      // Daily activity — last 14 days
      const today = new Date();
      const days: { date: string; label: string }[] = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        days.push({ date: dateStr, label: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }) });
      }
      const cutoff = days[0].date;
      const { data: activityLogs } = await supabase
        .from('activity_logs')
        .select('date, activity_count')
        .gte('date', cutoff);

      const activityByDate: Record<string, number> = {};
      activityLogs?.forEach(l => {
        activityByDate[l.date] = (activityByDate[l.date] || 0) + l.activity_count;
      });
      setDailyActivity(days.map(d => ({ date: d.label, activities: activityByDate[d.date] || 0 })));

      // Top students
      const { data: top } = await supabase.from('students').select('*').order('coins', { ascending: false }).limit(5);
      setTopStudents(top || []);

      setLoading(false);
    }
    load();
  }, []);

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading analytics...</p>
        </div>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Dashboard Overview</h2>
          <p className="text-slate-400 text-sm mt-1">Real-time analytics from your student portal</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {[
            { icon: <Users size={18} />, label: 'Students', value: totalStudents, color: 'from-sky-500 to-sky-600' },
            { icon: <BookOpen size={18} />, label: 'Questions', value: totalQuestions, color: 'from-emerald-500 to-green-600' },
            { icon: <Zap size={18} />, label: 'Attempts', value: totalAttempts, color: 'from-violet-500 to-purple-600' },
            { icon: <Target size={18} />, label: 'Avg Accuracy', value: `${avgAccuracy}%`, color: 'from-orange-500 to-amber-500' },
            { icon: <Trophy size={18} />, label: 'Top Coins', value: topStudents[0]?.coins || 0, color: 'from-yellow-500 to-orange-500' },
            { icon: <TrendingUp size={18} />, label: 'Subjects', value: coinsBySubject.length, color: 'from-pink-500 to-rose-500' },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`bg-gradient-to-br ${card.color} rounded-2xl p-4 shadow-lg text-white`}>
              <div className="opacity-80 mb-2">{card.icon}</div>
              <div className="text-2xl font-black">{card.value}</div>
              <div className="text-white/70 text-xs font-semibold mt-0.5">{card.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Row 1: Coins by Subject + Accuracy by Subject */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <div className="mb-4">
              <h3 className="font-black text-white text-base">Coins Earned by Subject</h3>
              <p className="text-slate-400 text-xs mt-0.5">Total coins earned from correct answers per subject</p>
            </div>
            {coinsBySubject.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={coinsBySubject} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="coins" name="Coins" radius={[6, 6, 0, 0]}>
                    {coinsBySubject.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                <Zap size={32} className="mb-2 opacity-30" />
                <p className="text-sm">No quiz attempts yet</p>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <div className="mb-4">
              <h3 className="font-black text-white text-base">Accuracy by Subject</h3>
              <p className="text-slate-400 text-xs mt-0.5">Percentage of correct answers per subject</p>
            </div>
            {accuracyBySubject.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={accuracyBySubject} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="accuracy" name="Accuracy %" radius={[6, 6, 0, 0]}>
                    {accuracyBySubject.map((entry, i) => (
                      <Cell key={i} fill={entry.accuracy >= 70 ? '#22c55e' : entry.accuracy >= 40 ? '#f59e0b' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                <Target size={32} className="mb-2 opacity-30" />
                <p className="text-sm">No attempts yet</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Row 2: Attempts by Standard (pie) + Students by Standard (bar) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <div className="mb-4">
              <h3 className="font-black text-white text-base">Quiz Attempts by Standard</h3>
              <p className="text-slate-400 text-xs mt-0.5">Distribution of attempts across class levels</p>
            </div>
            {attemptsByStandard.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={attemptsByStandard} dataKey="attempts" nameKey="standard"
                    cx="50%" cy="50%" outerRadius={80} innerRadius={40}
                    paddingAngle={3}
                    label={({ standard, percent }) => `${standard.replace('Standard ', 'Std ')} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {attemptsByStandard.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => active && payload?.[0] ? (
                      <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 shadow-xl text-sm">
                        <p className="text-white font-bold">{payload[0].name}</p>
                        <p className="text-slate-300">{payload[0].value} attempts</p>
                      </div>
                    ) : null}
                  />
                  <Legend formatter={(v) => <span className="text-slate-300 text-xs">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                <BookOpen size={32} className="mb-2 opacity-30" />
                <p className="text-sm">No attempts yet</p>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <div className="mb-4">
              <h3 className="font-black text-white text-base">Students by Standard</h3>
              <p className="text-slate-400 text-xs mt-0.5">How many students are enrolled per class</p>
            </div>
            {studentsByStandard.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={studentsByStandard} barSize={36}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="standard" tickFormatter={v => v.replace('Standard ', 'Std ')} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Students" radius={[6, 6, 0, 0]}>
                    {studentsByStandard.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                <Users size={32} className="mb-2 opacity-30" />
                <p className="text-sm">No students yet</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Row 3: Daily Activity Line Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <div className="mb-4">
            <h3 className="font-black text-white text-base">Daily Student Activity — Last 14 Days</h3>
            <p className="text-slate-400 text-xs mt-0.5">Total quiz interactions across all students per day</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="activities" name="Activities" stroke="#0ea5e9" strokeWidth={2.5}
                dot={{ fill: '#0ea5e9', r: 4 }} activeDot={{ r: 6, fill: '#0ea5e9' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Row 4: Top Students table + Subject accuracy detail */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <h3 className="font-black text-white text-base mb-4">Top 5 Students</h3>
            <div className="space-y-2">
              {topStudents.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-colors">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white
                    ${i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-slate-400' : i === 2 ? 'bg-orange-600' : 'bg-slate-600'}`}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm truncate">{s.name}</p>
                    <p className="text-slate-400 text-xs">{s.standard}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-yellow-400 font-black text-sm">{s.coins} coins</p>
                    <p className="text-orange-400 text-xs font-semibold">{s.streak_days}d streak</p>
                  </div>
                </div>
              ))}
              {topStudents.length === 0 && (
                <div className="text-center py-10 text-slate-500 text-sm">No students yet</div>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <h3 className="font-black text-white text-base mb-4">Subject Performance Breakdown</h3>
            {accuracyBySubject.length > 0 ? (
              <div className="space-y-3">
                {accuracyBySubject.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300 text-sm font-semibold">{item.subject}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-xs">{item.total} attempts</span>
                        <span className={`text-sm font-black ${item.accuracy >= 70 ? 'text-green-400' : item.accuracy >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {item.accuracy}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${item.accuracy >= 70 ? 'bg-green-500' : item.accuracy >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${item.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-slate-500">
                <Target size={32} className="mb-2 opacity-30" />
                <p className="text-sm">No data yet</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
