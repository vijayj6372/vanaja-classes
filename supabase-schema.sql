-- ============================================
-- Vanaja Coaching Classes - Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  standard TEXT NOT NULL,
  subjects TEXT[] DEFAULT '{}',
  coins INT DEFAULT 0,
  streak_days INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz Questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  standard TEXT NOT NULL,
  subject TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  coins_reward INT DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz Attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  coins_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Logs table (GitHub-style heatmap)
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  activity_count INT DEFAULT 1,
  UNIQUE(student_id, date)
);

-- ============================================
-- RPC: Increment coins safely
-- ============================================
CREATE OR REPLACE FUNCTION increment_coins(student_id UUID, amount INT)
RETURNS VOID AS $$
BEGIN
  UPDATE students SET coins = coins + amount WHERE id = student_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Students: can read their own data + leaderboard (all students)
CREATE POLICY "Students can read all students (leaderboard)" ON students
  FOR SELECT USING (true);

CREATE POLICY "Students can insert own data" ON students
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Students can update own data" ON students
  FOR UPDATE USING (auth.uid() = id);

-- Quiz Questions: anyone authenticated can read
CREATE POLICY "Authenticated users can read questions" ON quiz_questions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Admin full access to questions (via service role)
CREATE POLICY "Service role full access to questions" ON quiz_questions
  USING (true) WITH CHECK (true);

-- Quiz Attempts: students can insert own, read own
CREATE POLICY "Students can insert own attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can read own attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() = student_id);

-- Activity Logs: students can manage own
CREATE POLICY "Students can manage own activity logs" ON activity_logs
  FOR ALL USING (auth.uid() = student_id);

-- ============================================
-- Cron Job: Delete logs older than 30 days
-- Enable pg_cron extension first in Supabase
-- ============================================
-- SELECT cron.schedule(
--   'delete-old-activity-logs',
--   '0 0 * * *',
--   $$DELETE FROM activity_logs WHERE date < CURRENT_DATE - INTERVAL '30 days';$$
-- );
