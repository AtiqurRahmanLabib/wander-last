import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;

  // User is not logged in
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // User is authenticated, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/my-bookings", "/destinations/:path", "/add-destination"],
};
