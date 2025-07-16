// handlers for mutating and querying session data

import {
	TmdbSessionData,
	defaultTmdbSession,
	tmdbSessionOptions,
} from "@/lib/session/session.tmdb.lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

// POST /api/session
// login user
export async function POST(request: Request) {
	try {
		const userData = await request.json();

		const session = await getIronSession<TmdbSessionData>(
			await cookies(),
			tmdbSessionOptions
		);

		session.user = userData.user;
		session.expires_at = userData.expiresIn;
		session.request_token = userData.requestToken;
		session.success = true;
		await session.save();

		return Response.json(session);
	} catch (error) {
		const err = error as Error;
		return new Response(err.message, { status: 500 });
	}
}

// DELETE /api/session
// logout user
export async function DELETE() {
	try {
		const session = await getIronSession<TmdbSessionData>(
			await cookies(),
			tmdbSessionOptions
		);
		session.destroy();
		return Response.json(defaultTmdbSession);
	} catch (error) {
		const err = error as Error;
		return new Response(err.message, { status: 500 });
	}
}

// GET /api/session
// get session data
export async function GET() {
	try {
		const session = await getIronSession<TmdbSessionData>(
			await cookies(),
			tmdbSessionOptions
		);

		if (!session.request_token || !session.success) {
			return Response.json(defaultTmdbSession);
		}
		return Response.json(session);
	} catch (error) {
		const err = error as Error;
		return new Response(err.message, { status: 500 });
	}
}
