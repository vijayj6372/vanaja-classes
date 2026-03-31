import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ logs: [] });

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('student_id', id);

  return NextResponse.json({ logs: data || [] });
}
