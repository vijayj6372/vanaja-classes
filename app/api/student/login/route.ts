import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { signStudentToken } from '@/lib/student-auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: student, error } = await supabase
    .from('students')
    .select('*')
    .eq('username', username.trim().toLowerCase())
    .single();

  if (error || !student) {
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, student.password_hash);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  }

  const token = signStudentToken({
    id: student.id,
    username: student.username,
    name: student.name,
    standard: student.standard,
  });

  const cookieStore = await cookies();
  cookieStore.set('student_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return NextResponse.json({ success: true, student: { id: student.id, name: student.name, standard: student.standard } });
}
