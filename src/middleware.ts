import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin';

  if (isAdminPath) {
    const authCookie = request.cookies.get('admin_auth');
    const isAuthenticated = authCookie?.value === 'true';

    // If trying to access protected admin routes without auth
    if (!isAuthenticated && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // If authenticated and trying to access the login page
    if (isAuthenticated && isLoginPage) {
      return NextResponse.redirect(new URL('/admin/orders', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
