'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { QuizQuestion, STANDARDS, SUBJECTS } from '@/lib/types';
import { ArrowLeft, CheckCircle, XCircle, Coins } from 'lucide-react';
import Link from 'next/link';

export default function QuizPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [standard, setStandard] = useState('');
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<'select' | 'quiz' | 'done'>('select');
  const [score, setScore] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/student/login');
      else setUserId(user.id);
    });
  }, [router]);

  const startQuiz = async () => {
    if (!standard || !subject) return;
    setLoading(true);
    const { data } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('standard', standard)
      .eq('subject', subject)
      .limit(10);
    setLoading(false);
    if (!data || data.length === 0) {
      alert('No questions available for this selection yet. Please try another standard or subject.');
      return;
    }
    setQuestions(data);
    setPhase('quiz');
    setCurrent(0);
    setScore(0);
    setTotalCoins(0);
    setSelected(null);
  };

  const handleAnswer = async (option: string) => {
    if (selected || !userId) return;
    setSelected(option);
    const q = questions[current];
    const isCorrect = option === q.correct_answer;
    const coinsEarned = isCorrect ? (q.coins_reward || 5) : 0;

    if (isCorrect) setScore(s => s + 1);
    setTotalCoins(t => t + coinsEarned);

    await supabase.from('quiz_attempts').insert({
      student_id: userId,
      question_id: q.id,
      is_correct: isCorrect,
      coins_earned: coinsEarned,
    });

    if (coinsEarned > 0) {
      await supabase.rpc('increment_coins', { student_id: userId, amount: coinsEarned });
    }

    // Update activity log
    const today = new Date().toISOString().split('T')[0];
    const { data: existingLog } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('student_id', userId)
      .eq('date', today)
      .single();

    if (existingLog) {
      await supabase.from('activity_logs')
        .update({ activity_count: existingLog.activity_count + 1 })
        .eq('id', existingLog.id);
    } else {
      await supabase.from('activity_logs').insert({ student_id: userId, date: today, activity_count: 1 });
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        setPhase('done');
        // Update streak
        updateStreak();
      }
    }, 1200);
  };

  const updateStreak = async () => {
    if (!userId) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const { data: log } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('student_id', userId)
      .eq('date', yesterdayStr)
      .single();

    const { data: student } = await supabase.from('students').select('streak_days').eq('id', userId).single();
    const newStreak = log ? (student?.streak_days || 0) + 1 : 1;
    await supabase.from('students').update({ streak_days: newStreak }).eq('id', userId);
  };

  if (phase === 'select') return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-lg mx-auto">
        <Link href="/student/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-8 font-medium">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-black text-slate-800 mb-2">Start a Quiz</h1>
          <p className="text-slate-500 mb-8">Select your standard and subject to begin.</p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Standard</label>
              <select value={standard} onChange={e => setStandard(e.target.value)}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-[#0ea5e9] bg-white">
                <option value="">Select standard</option>
                {STANDARDS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Subject</label>
              <select value={subject} onChange={e => setSubject(e.target.value)}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-[#0ea5e9] bg-white">
                <option value="">Select subject</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startQuiz}
              disabled={!standard || !subject || loading}
              className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#22c55e] text-white font-black py-4 rounded-2xl shadow-lg disabled:opacity-50 text-lg"
            >
              {loading ? 'Loading...' : 'Start Quiz →'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  if (phase === 'done') return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md w-full">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">Quiz Complete!</h2>
        <p className="text-slate-500 mb-6">You answered {score} out of {questions.length} correctly.</p>
        <div className="flex items-center justify-center gap-2 bg-yellow-50 border-2 border-yellow-100 rounded-2xl py-4 mb-8">
          <Coins size={22} className="text-yellow-500" />
          <span className="text-2xl font-black text-yellow-600">+{totalCoins} coins earned!</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setPhase('select')} className="flex-1 border-2 border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:border-slate-300 transition-all">
            Play Again
          </button>
          <Link href="/student/dashboard" className="flex-1 bg-[#0ea5e9] text-white font-bold py-3 rounded-xl hover:bg-sky-600 transition-all text-center">
            Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );

  const q = questions[current];
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <span className="text-slate-500 font-medium text-sm">Question {current + 1} of {questions.length}</span>
          <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
            <Coins size={16} className="text-yellow-500" />
            <span className="font-bold text-yellow-600 text-sm">{totalCoins} coins</span>
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-1.5 mb-8">
          <div className="bg-gradient-to-r from-[#0ea5e9] to-[#22c55e] h-1.5 rounded-full transition-all" style={{ width: `${((current) / questions.length) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            className="bg-white rounded-3xl shadow-lg p-8">
            <p className="text-xs font-bold text-[#0ea5e9] uppercase tracking-widest mb-3">{q.subject} · {q.standard}</p>
            <h2 className="text-xl font-black text-slate-800 mb-8 leading-snug">{q.question}</h2>

            <div className="grid grid-cols-1 gap-3">
              {(q.options as string[]).map((opt, i) => {
                let style = 'border-slate-200 text-slate-700 hover:border-[#0ea5e9]';
                if (selected) {
                  if (opt === q.correct_answer) style = 'border-green-400 bg-green-50 text-green-700';
                  else if (opt === selected) style = 'border-red-400 bg-red-50 text-red-700';
                  else style = 'border-slate-200 text-slate-400';
                }
                return (
                  <button key={i} onClick={() => handleAnswer(opt)} disabled={!!selected}
                    className={`w-full text-left px-5 py-4 border-2 rounded-xl font-semibold transition-all flex items-center justify-between ${style}`}>
                    <span>{opt}</span>
                    {selected && opt === q.correct_answer && <CheckCircle size={18} className="text-green-500" />}
                    {selected && opt === selected && opt !== q.correct_answer && <XCircle size={18} className="text-red-500" />}
                  </button>
                );
              })}
            </div>

            {selected && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`mt-5 text-center font-bold text-sm ${selected === q.correct_answer ? 'text-green-600' : 'text-red-500'}`}>
                {selected === q.correct_answer ? `✓ Correct! +${q.coins_reward || 5} coins` : `✗ Incorrect. The answer was: ${q.correct_answer}`}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
