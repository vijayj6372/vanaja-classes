import { NextResponse, type NextRequest } from 'next/server';
import { verifyStudentToken } from '@/lib/student-auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect student routes (except login)
  const protectedStudentRoutes = [
    '/student/dashboard',
    '/student/quiz',
    '/student/leaderboard',
    '/student/profile',
  ];

  if (protectedStudentRoutes.some(r => pathname.startsWith(r))) {
    const token = request.cookies.get('student_session')?.value;
    const payload = token ? verifyStudentToken(token) : null;
    if (!payload) {
      return NextResponse.redirect(new URL('/student/login', request.url));
    }
  }

  // Protect admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminSession = request.cookies.get('admin_session');
    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*', '/admin/:path*'],
};
