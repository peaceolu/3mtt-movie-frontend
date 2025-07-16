import { MovieType } from "./movie.types";
import { ResponseType } from "./response.types";
import { UserType } from "./user.types";

export interface WatchlistType {
	_id: string;
	name: string;
	description?: string;
	type: "movie" | "tv";
	items?: MovieType[]; // Array of movie or TV show IDs
	createdAt: string;
	updatedAt: string;
	user: UserType;
	isPublic: boolean;
	image?: string; // Optional image URL for the watchlist
}

export interface WatchlistAllResponse extends ResponseType<WatchlistType[]> {
	data: WatchlistType[];
}
export interface CreateWatchlistPayload {
	name: string;
	description?: string;
	type?: "movie" | "tv";
}

export interface CreateWatchlistResponse extends ResponseType<WatchlistType> {
	data: WatchlistType;
}

export type GetWatchlistResponse = CreateWatchlistResponse;
export type UpdateWatchlistResponse = CreateWatchlistResponse;
export type DeleteWatchlistResponse = CreateWatchlistResponse;
