import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  try {
    const response = await fetch("http://localhost:4000/api/auth", {
      credentials: "include",
      method: "GET",
      headers: {
        authorization: `Bearer ${request.cookies.get("jwt")?.value}`,
      },
    });

    const json = await response.json();

    if (json.message !== "OK" && path !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    } else {
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/account/:path*",
};
