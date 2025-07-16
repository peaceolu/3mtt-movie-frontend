import { SessionOptions } from "iron-session";
interface TmdbUserType {
	user: {
		id: number;
	};
}

export interface TmdbSessionData extends TmdbUserType {
	success: boolean;
	expires_at: string;
	request_token: string;
}

export const defaultTmdbSession: TmdbSessionData = {
	user: {
		id: 0,
	},
	success: false,
	expires_at: "",
	request_token: "",
};

export const tmdbSessionOptions: SessionOptions = {
	password: process.env.TMDB_SESSION_SECRET!,
	cookieName: "TMDB_SESSION",
	cookieOptions: {
		// secure only works in `https` environments
		// if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
		secure: process.env.NODE_ENV === "production",
		// httpOnly: true,
		httpOnly: process.env.NODE_ENV === "production",
		// sameSite: "lax",
		sameSite: "lax",
	},
};
