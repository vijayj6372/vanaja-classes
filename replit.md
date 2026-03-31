# Vanaja Coaching Classes — Student Quiz Platform

## Project Overview
Next.js 16 (App Router) website for Vanaja Coaching Classes, Bharuch. Includes the main marketing site plus a full Student Quiz Platform with admin panel.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL, RLS with anon-key open policies)
- **Auth**: Custom JWT (bcryptjs + jsonwebtoken) — no Google OAuth
- **State**: Zustand
- **Charts**: Recharts
- **Animations**: Framer Motion

## Environment Variables / Secrets
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key
- `ADMIN_USERNAME` — Admin panel username
- `ADMIN_PASSWORD` — Admin panel password
- `SESSION_SECRET` — JWT secret for student sessions (set to any long random string)

## Auth Model
- **Students**: Username + Password login. Admin creates accounts. Sessions stored as httpOnly JWT cookie (`student_session`).
- **Admin**: Username + Password from env secrets. Session stored as httpOnly cookie (`admin_session`).
- No Google OAuth. No Supabase Auth.

## Project Structure

```
app/
  page.tsx               — Main marketing homepage
  layout.tsx             — Root layout
  student/
    login/               — Username/password login form
    dashboard/           — Student home (coins, streak, activity grid)
    quiz/                — MCQ quiz with instant feedback + coins
    leaderboard/         — Top students ranked by coins
    profile/[id]/        — Public student profile page
  admin/
    login/               — Cookie-based admin login
    dashboard/           — Analytics with Recharts charts
    create-student/      — Admin creates student accounts (name/username/password/standard/subjects)
    questions/           — CRUD question manager
    students/            — Student analytics table + detail modal
  api/
    admin/login/         — POST: validates credentials, sets cookie
    admin/logout/        — POST: clears admin_session cookie
    admin/create-student/— POST: hashes password, inserts student into DB
    student/login/       — POST: validates credentials, sets JWT cookie
    student/logout/      — POST: clears student_session cookie
    student/me/          — GET: returns current student from JWT
    student/activity/    — GET: returns activity logs for heatmap
    student/rank/        — GET: returns student rank by coins

components/              — Marketing site components (Navbar, Hero, etc.)
lib/
  supabase.ts            — Browser Supabase client (@supabase/ssr)
  supabase-server.ts     — Server-side Supabase client (SSR)
  student-auth.ts        — JWT sign/verify helpers (jsonwebtoken)
  types.ts               — Shared TypeScript types + STANDARDS/SUBJECTS constants
proxy.ts                 — Route protection (student + admin routes via cookies)
supabase-schema.sql      — Full SQL schema to run in Supabase dashboard
```

## Supabase Setup Required
Run `supabase-schema.sql` in the Supabase SQL Editor to create:
- `students` table (id, username, password_hash, name, standard, subjects, coins, streak_days)
- `quiz_questions` table
- `quiz_attempts` table
- `activity_logs` table (date + count, unique per student per day)
- `increment_coins` RPC function
- Open RLS policies for anon key (server-side auth validated via JWT)

## Subjects (8 total)
Mathematics, Science, Physics, Chemistry, Biology, Social Studies, English, Hindi

## Admin Panel
- URL: `/admin/login`
- After login: Dashboard → Create Student → Students → Questions
- Create Student: fills name, username, password, standard, subjects → bcrypt hash → saved to DB

## Development
```bash
npm run dev   # Runs on port 5000
```
