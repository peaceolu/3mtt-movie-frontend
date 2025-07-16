import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { defaultTmdbSession, TmdbSessionData } from "./session.tmdb.lib";
import { RefreshTokenType, UserAuthType } from "@/types/user.types";
const sessionAPIRoute = "/api/session/tmdb";

async function fetchJson<JSON = unknown>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	return fetch(input, {
		headers: {
			accept: "application/json",
			"content-type": "application/json",
		},
		...init,
	}).then((res) => res.json());
}

function tmdbLogin(
	url: string,
	{ arg }: { arg: UserAuthType & RefreshTokenType }
) {
	return fetchJson<TmdbSessionData>(url, {
		method: "POST",
		body: JSON.stringify({ ...arg }),
	});
}

function tmdbLogout(url: string) {
	return fetchJson<TmdbSessionData>(url, {
		method: "DELETE",
	});
}

function tmdbUpdate(url: string) {
	return fetchJson<TmdbSessionData>(url, {
		method: "PATCH",
	});
}

export default function useSession() {
	const { isLoading, data: session } = useSWR(
		sessionAPIRoute,
		fetchJson<TmdbSessionData>,
		{
			fallbackData: defaultTmdbSession,
		}
	);
	const { trigger: loginTmdb } = useSWRMutation(sessionAPIRoute, tmdbLogin);
	const { trigger: logoutTmdb } = useSWRMutation(sessionAPIRoute, tmdbLogout);
	const { trigger: updateTokenTmdb } = useSWRMutation(
		sessionAPIRoute,
		tmdbUpdate
	);
	return { loginTmdb, logoutTmdb, updateTokenTmdb, isLoading, session };
}
