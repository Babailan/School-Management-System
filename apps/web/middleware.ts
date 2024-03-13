import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession, unsealData } from "iron-session";

export const getAuth = async () => {
  if (process.env.iron_key === undefined) {
    throw new Error("Missing iron_key environment variable");
  }
  const token = cookies().get("user_token")?.value;
  if (!token) return null;

  return await unsealData<any>(token as string, {
    password: process.env.iron_key,
  });
};

// This function can be marked `async` if using `await` inside
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
    "/subject/:path*",
    "/tuition/:path*",
  ],
};
