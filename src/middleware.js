import { NextResponse } from "next/server";

const privateRoutes = ["/dashboard", "/dashboard/:path*"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const userCookie = request.cookies.get("user")?.value;
  let user = null;

  try {
    user = userCookie ? JSON.parse(userCookie) : null;
  } catch {
    user = null;
  }

  if (privateRoutes.some((route) => pathname.startsWith(route))) {
    if (!user?.id) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname === "/") {
    if (user?.id) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}
