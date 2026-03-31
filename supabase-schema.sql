-- ============================================
-- VANAJA COACHING CLASSES - STUDENT QUIZ PLATFORM
-- Updated Schema: Username/Password Login (No Google OAuth)
-- Run this in your Supabase SQL Editor
-- ============================================

-- Drop existing tables if rebuilding
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS quiz_attempts CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS students CASCADE;

-- Drop existing function
DROP FUNCTION IF EXISTS increment_coins(uuid, integer);

-- ============================================
-- STUDENTS TABLE (username/password auth)
-- ============================================
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  standard text NOT NULL,
  subjects text[] NOT NULL DEFAULT '{}',
  coins integer NOT NULL DEFAULT 0,
  streak_days integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================
-- QUIZ QUESTIONS TABLE
-- ============================================
CREATE TABLE quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  standard text NOT NULL,
  subject text NOT NULL,
  question text NOT NULL,
  options jsonb NOT NULL DEFAULT '[]',
  correct_answer text NOT NULL,
  coins_reward integer NOT NULL DEFAULT 5,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================
-- QUIZ ATTEMPTS TABLE
-- ============================================
CREATE TABLE quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  is_correct boolean NOT NULL DEFAULT false,
  coins_earned integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================
-- ACTIVITY LOGS TABLE (GitHub-style heatmap)
-- ============================================
CREATE TABLE activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  date date NOT NULL,
  activity_count integer NOT NULL DEFAULT 0,
  UNIQUE(student_id, date)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_students_username ON students(username);
CREATE INDEX idx_students_coins ON students(coins DESC);
CREATE INDEX idx_quiz_questions_standard_subject ON quiz_questions(standard, subject);
CREATE INDEX idx_quiz_attempts_student_id ON quiz_attempts(student_id);
CREATE INDEX idx_activity_logs_student_date ON activity_logs(student_id, date);

-- ============================================
-- RLS POLICIES
-- Auth is handled server-side via JWT cookies.
-- Anon key is used from server-side API routes only.
-- ============================================
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Allow all operations for anon key (server-side API routes use anon key)
CREATE POLICY "Allow all for anon" ON students FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON quiz_questions FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON quiz_attempts FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON activity_logs FOR ALL TO anon USING (true) WITH CHECK (true);

-- ============================================
-- INCREMENT COINS FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION increment_coins(student_id uuid, amount integer)
RETURNS void AS $$
BEGIN
  UPDATE students SET coins = coins + amount WHERE id = student_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
