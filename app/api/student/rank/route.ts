import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ rank: null });

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('students')
    .select('id, coins')
    .order('coins', { ascending: false });

  if (!data) return NextResponse.json({ rank: null });
  const idx = data.findIndex(s => s.id === id);
  return NextResponse.json({ rank: idx >= 0 ? idx + 1 : null });
}
