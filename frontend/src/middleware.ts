import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { KEY } from "@/lib/api";
import { canAccessRoute } from "./lib/policies";
import { UserRole } from "./services/auth_service";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const userCookie = req.cookies.get(KEY.user_info)?.value;

  let role = 'GUEST'; // default for unauthenticated

  if (userCookie) {
    try {
      // Cookies set on client are encoded; decode before parse
      let parsedUser;
      try {
        parsedUser = JSON.parse(decodeURIComponent(userCookie));
      } catch (e) {
        // Fallback if cookie wasn't encoded
        parsedUser = JSON.parse(userCookie);
      }
  // Normalize role: backend may return 'ROLE_ADMIN' or 'ADMIN'
  role = (parsedUser?.role || 'GUEST').replace(/^ROLE_/, '');
    } catch (error) {
      // Invalid cookie, treat as guest
      role = 'GUEST';
    }
  }

  // If we don't have user info but we do have an auth token, try to resolve
  // the user by calling the backend. This helps when the client sets cookies
  // after login but the server-side middleware is hit on the next request
  // before `user_info` is available.
  if (!userCookie) {
    const token = req.cookies.get(KEY.auth_token)?.value;
    if (token) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
        const res = await fetch(`${apiUrl}/user/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (res.ok) {
          const json = await res.json();
          // The API returns username & roles. Pick the primary role and normalize it.
          const roleFromApi = (json?.roles?.[0] || 'GUEST').replace(/^ROLE_/, '');
          // Create a minimal user object the frontend expects
          const userObj = { username: json.username, role: roleFromApi, permissions: [] };
          const encoded = encodeURIComponent(JSON.stringify(userObj));

          // Attach cookie so subsequent middleware checks pass
          const nextRes = NextResponse.next();
          nextRes.cookies.set(KEY.user_info, encoded, { path: '/', sameSite: 'lax' });
          if (process.env.NODE_ENV === 'development') {
            console.debug('[middleware] resolved user from token', { userObj });
          }

          // Re-evaluate role for the rest of this function
          role = roleFromApi;
          // Continue to access check with updated role
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.debug('[middleware] failed to resolve user from token', { error });
        }
      }
    }
  }

  // If unauthorized route → redirect to login
  if (!canAccessRoute(role as UserRole, url)) {
    // dev helper: show role for debugging
    if (process.env.NODE_ENV === 'development') {
      console.debug('[middleware] Blocked route', { url, role, userCookie });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Protect only internal routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\..*|favicon.ico|login|register|forgot-password|reset-password).*)",
  ],
};
