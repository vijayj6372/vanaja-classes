import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { signStudentToken } from '@/lib/student-auth';

export async function POST(request: Request) {
  const { name, username, password, standard, subjects } = await request.json();

  if (!name || !username || !password || !standard || !subjects?.length) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const supabase = await createSupabaseServerClient();

  const { data: student, error } = await supabase
    .from('students')
    .insert({
      id: crypto.randomUUID(),
      username: username.trim().toLowerCase(),
      password_hash: passwordHash,
      name: name.trim(),
      standard,
      subjects,
      coins: 0,
      streak_days: 0,
    })
    .select('id, username, name, standard, subjects, coins, streak_days, created_at')
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Username already taken. Please choose another.' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const token = signStudentToken({ id: student.id, username: student.username, name: student.name });

  const response = NextResponse.json({ success: true, student });
  response.cookies.set('student_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
  });

  return response;
}
