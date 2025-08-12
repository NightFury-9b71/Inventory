import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware running for', request.nextUrl.pathname);

  const token = request.cookies.get('authToken')?.value;
  const pathname = request.nextUrl.pathname;

  // Public paths (no auth required)
  const publicPaths = ['/login', '/register', '/_next', '/favicon.ico'];

  // If path is public, allow access
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Authenticated, allow
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], // run for all routes
};
