import { NextResponse } from "next/server";

export const middleware = (request) => {
  const token = request.cookies.get("next-auth.session-token");
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/dashboard",
};
