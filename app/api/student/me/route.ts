import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyStudentToken } from '@/lib/student-auth';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('student_session')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const payload = verifyStudentToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('id', payload.id)
    .single();

  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  return NextResponse.json({ student });
}
