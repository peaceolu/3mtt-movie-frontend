import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "./lib/session/session.lib";

// 1. Specify protected and public routes
const protectedRoutes = ["/studio", "/studio/:path*"];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
	// 2. get session from cookies

	const session = await getIronSession<SessionData>(
		await cookies(),
		sessionOptions
	);
	const isValidSession = session?.isLoggedIn && session?.expiresIn > Date.now();

	// 3. Check if the current route is protected or public
	const path = req.nextUrl.pathname;
	const isProtectedRoute =
		protectedRoutes.includes(path) || path.startsWith("/studio");
	const isPublicRoute = publicRoutes.includes(path);

	// 4. Redirect to /login if the user is not authenticated
	// to prevent unauthenticated user from visiting protected routes
	if (isProtectedRoute && !isValidSession) {
		return NextResponse.redirect(new URL("/login", req.url));
	}
	// 5. Redirect to /studio if the user is authenticated
	// to prevent authenticated user from visiting login or signup page
	if (isPublicRoute && isValidSession) {
		const redirectUrl = "/studio";
		return NextResponse.redirect(new URL(redirectUrl, req.url));
	}

	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	// matcher: ["/((?!api|_next/static|_next/image|.*\\.jpg$).*)"],
	matcher: ["/login", "/signup"],
};
