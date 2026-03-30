# Vanaja Coaching Classes — Student Quiz Platform

## Project Overview
Next.js 16 (App Router) website for Vanaja Coaching Classes, Bharuch. Includes the main marketing site plus a full Student Quiz Platform with admin panel.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database + Auth**: Supabase (PostgreSQL, Google OAuth, RLS)
- **State**: Zustand
- **Charts**: Recharts
- **Animations**: Framer Motion

## Environment Variables / Secrets
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key
- `ADMIN_USERNAME` — Admin panel username
- `ADMIN_PASSWORD` — Admin panel password

## Project Structure

```
app/
  page.tsx               — Main marketing homepage
  layout.tsx             — Root layout
  auth/callback/         — Supabase OAuth callback handler
  student/
    login/               — Google OAuth login page
    onboarding/          — First-time setup (name, standard, subjects)
    dashboard/           — Student home (coins, streak, activity grid)
    quiz/                — MCQ quiz with instant feedback + coins
    leaderboard/         — Top students ranked by coins
    profile/[id]/        — Public student profile page
  admin/
    login/               — Cookie-based admin login
    dashboard/           — Analytics with Recharts charts
    questions/           — CRUD question manager
    students/            — Student analytics table + detail modal
  api/
    admin/login/         — POST: validates credentials, sets cookie
    admin/logout/        — POST: clears admin_session cookie

components/              — Marketing site components (Navbar, Hero, etc.)
lib/
  supabase.ts            — Browser Supabase client (@supabase/ssr)
  supabase-server.ts     — Server-side Supabase client (SSR)
  types.ts               — Shared TypeScript types + constants
proxy.ts                 — Route protection (student + admin routes)
supabase-schema.sql      — Full SQL schema to run in Supabase dashboard
```

## Supabase Setup Required
Run `supabase-schema.sql` in the Supabase SQL Editor to create:
- `students` table
- `quiz_questions` table
- `quiz_attempts` table
- `activity_logs` table
- `increment_coins` RPC function
- RLS policies

Also configure Google OAuth in Supabase Auth settings:
- Add redirect URL: `https://<your-domain>/auth/callback`

## Admin Panel
- URL: `/admin/login`
- Credentials stored in env secrets (ADMIN_USERNAME, ADMIN_PASSWORD)
- Protected by httpOnly cookie session (8-hour expiry)

## Development
```bash
npm run dev   # Runs on port 5000
```
