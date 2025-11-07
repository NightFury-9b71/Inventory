import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { KEY } from "@/lib/api";
import { canAccessRoute } from "./lib/polices";
import { UserRole } from "./services/auth_service";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const userCookie = req.cookies.get(KEY.user_info)?.value;

  let role = 'GUEST'; // default for unauthenticated

  if (userCookie) {
    try {
      const user = JSON.parse(userCookie);
      role = user.role || 'GUEST';
    } catch (error) {
      // Invalid cookie, treat as guest
      role = 'GUEST';
    }
  }

  // If unauthorized route → redirect to login
  if (!canAccessRoute(role as UserRole, url)) {
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
