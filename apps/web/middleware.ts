import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "./lib/crypto/getAuth";

export async function middleware(request: NextRequest) {
  const token = await getAuth();
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/about/:path*",
    "/",
    "/curriculum/:path*",
    "/assessment/:path*",
    "/section/:path*",
    "/verification/:path*",
    "/student-fee/:path*",
    "/subjects/:path*",
    "/tuition/:path*",
    "/access-control/:path*",
    "/settings/:path*",
    "/documents/:path*",
    "/access-control/:path*",
  ],
};
