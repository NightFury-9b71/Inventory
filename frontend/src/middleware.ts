import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTE_ACCESS_CONFIG } from '@/lib/auth-config';
import { decodeToken, isPublicPath, hasMinimumRole } from '@/lib/auth-helpers';


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  // Allow access to public paths
  if (isPublicPath(pathname)) {
    // If authenticated user tries to access login/register, redirect to dashboard
    if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // For root path, redirect based on auth status
    if (pathname === '/') {
      if (token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      // Allow unauthenticated access to landing page
      return NextResponse.next();
    }
    return NextResponse.next();
  }

  // Protected routes - require authentication
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    // Store the attempted URL to redirect back after login
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Decode token and extract user role
  const decodedToken = decodeToken(token);
  const userRole = decodedToken?.role;

  // Check role-based access for protected routes
  const routeConfig = ROUTE_ACCESS_CONFIG.find(route => pathname.startsWith(route.path));
  
  if (routeConfig && !hasMinimumRole(userRole, routeConfig.minRole)) {
    // User doesn't have required role for this route
    return NextResponse.redirect(new URL('/dashboard?error=unauthorized', request.url));
  }

  // User is authenticated and authorized, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|.*\\..*|favicon.ico).*)',
  ],
};
