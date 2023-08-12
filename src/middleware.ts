import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// import { getDataFromToken } from './utils/getDataFromToken'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  try {
    const token = request.cookies.get("token")?.value || "";

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_TOKEN!);
    let decoded;
    if (token) {
      const { payload } = await jose.jwtVerify(token, secret, {
        issuer: "XHost",
        audience: "urn:example:audience",
      });
      decoded = payload;
    }

    if (path !== "/" && !decoded?.id) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (path !== "/" && !decoded?.isVerified && path !== "/verify-email") {
      return NextResponse.redirect(new URL("/verify-email", request.nextUrl));
    }

    if (path === "/" && decoded?.isVerified ) {
      return NextResponse.redirect(new URL("/home", request.nextUrl));
    }

  } catch (error) {
    console.log(error);
  }
}

//match all route except _next, static, image and api
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
