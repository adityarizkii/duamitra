import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const authToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  // console.log(authToken);

  if (
    pathname === "https://duamitra.vercel.app/" ||
    pathname === "https://duamitra.vercel.app/balance" ||
    pathname === "https://duamitra.vercel.app/history"
  ) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "https://duamitra.vercel.app/",
    "https://duamitra.vercel.app/balance",
    "https://duamitra.vercel.app/history",
  ],
};
