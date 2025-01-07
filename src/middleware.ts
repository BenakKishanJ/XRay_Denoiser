import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse, type NextRequest } from "next/server";

export default withAuth(
  async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow root path without authentication
    if (pathname === "/") {
      return NextResponse.next();
    }

}
);

export const config = {
  matcher: [
    // Exclude root path from matcher
    "/((?!api|_next/static|_next/image|favicon.ico|$).*)",
//    "/homepage",
  ],
};