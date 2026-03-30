import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && user) {
      // Check if student already exists
      const { data: existing } = await supabase
        .from('students')
        .select('id')
        .eq('id', user.id)
        .single();

      if (existing) {
        return NextResponse.redirect(`${origin}/student/dashboard`);
      } else {
        return NextResponse.redirect(`${origin}/student/onboarding`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/student/login?error=auth_failed`);
}
