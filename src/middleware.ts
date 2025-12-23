import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Define the URL paths that correspond to your protected folder group.
const protectedRoutes = ["/blogs", "/courses", "/home"];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // 1. If a logged-in user tries to access sign-in/sign-up pages,
  //    redirect them to the main protected page (e.g., /home).
  if (sessionCookie && ["/sign-in", "/sign-up"].includes(pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 2. If a logged-out user tries to access any of the protected routes,
  //    redirect them to the login page.
  if (!sessionCookie && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 3. If none of the above conditions are met, allow the request to proceed.
  return NextResponse.next();
}

// The matcher defines which routes the middleware will run on.
export const config = {
  matcher: [
    /*
     * Match all routes from your protected folder group.
     * The `/:path*` ensures all sub-pages are also matched
     * (e.g., /blogs/my-first-post).
     */
    "/blogs/:path*",
    "/courses/:path*",
    "/home/:path*",

    // Also include the authentication routes.
    "/sign-in",
    "/sign-up",
  ],
};