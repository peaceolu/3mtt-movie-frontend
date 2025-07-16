import { MovieType } from "@/types/movie.types";
import {
	CreateWatchlistPayload,
	CreateWatchlistResponse,
	DeleteWatchlistResponse,
	GetWatchlistResponse,
	UpdateWatchlistResponse,
	WatchlistAllResponse,
} from "@/types/watchlist.types";
import { AxiosInstance } from "axios";

class WatchlistServiceAPI {
	static async createWatchlist({
		protectedRequest,
		payload,
	}: {
		protectedRequest: AxiosInstance;
		payload: CreateWatchlistPayload;
	}) {
		const { data } = await protectedRequest.post<CreateWatchlistResponse>(
			"/watchlists",
			payload
		);
		return data.data;
	}

	static async getWatchlist({
		protectedRequest,
		watchlistId,
	}: {
		protectedRequest: AxiosInstance;
		watchlistId: string;
	}) {
		const { data } = await protectedRequest.get<GetWatchlistResponse>(
			`/watchlists/${watchlistId}`
		);
		return data.data;
	}

	static async getAllWatchlists({
		protectedRequest,
	}: {
		protectedRequest: AxiosInstance;
	}) {
		const { data } = await protectedRequest.get<WatchlistAllResponse>(
			"/watchlists"
		);
		return data.data;
	}

	static async updateWatchlist({
		protectedRequest,
		watchlistId,
		payload,
	}: {
		protectedRequest: AxiosInstance;
		watchlistId: string;
		payload: CreateWatchlistPayload;
	}) {
		const { data } = await protectedRequest.put<UpdateWatchlistResponse>(
			`/watchlists/${watchlistId}`,
			payload
		);
		return data.data;
	}

	static async deleteWatchlist({
		protectedRequest,
		watchlistId,
	}: {
		protectedRequest: AxiosInstance;
		watchlistId: string;
	}) {
		const { data } = await protectedRequest.delete<DeleteWatchlistResponse>(
			`/watchlists/${watchlistId}`
		);
		return data.data;
	}

	static async addItemToWatchlist({
		protectedRequest,
		watchlistId,
		item,
	}: {
		protectedRequest: AxiosInstance;
		watchlistId: string;
		item: MovieType;
	}) {
		const { data } = await protectedRequest.post<CreateWatchlistResponse>(
			`/watchlists/${watchlistId}/add`,
			item
		);
		return data.data;
	}

	static async removeItemFromWatchlist({
		protectedRequest,
		watchlistId,
		itemId,
	}: {
		protectedRequest: AxiosInstance;
		watchlistId: string;
		itemId: number;
	}) {
		const { data } = await protectedRequest.delete<DeleteWatchlistResponse>(
			`/watchlists/${watchlistId}/remove/${itemId}`
		);
		return data.data;
	}
}

export default WatchlistServiceAPI;
