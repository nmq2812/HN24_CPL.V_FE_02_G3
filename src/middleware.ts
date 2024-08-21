import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated");

  if (isAuthenticated && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isAuthenticated && request.nextUrl.pathname !== "/login") {
    const response = NextResponse.redirect(new URL("/login", request.url));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/editor", "/setting", "/login"],
};
