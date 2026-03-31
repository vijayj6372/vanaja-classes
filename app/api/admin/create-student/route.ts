import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { createSupabaseServerClient } from '@/lib/supabase-server';
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  if (!adminSession || adminSession.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, username, password, standard, subjects } = await request.json();

  if (!name || !username || !password || !standard || !subjects?.length) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from('students').insert({
    id: crypto.randomUUID(),
    username: username.trim().toLowerCase(),
    password_hash: passwordHash,
    name: name.trim(),
    standard,
    subjects,
    coins: 0,
    streak_days: 0,
  });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Username already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
