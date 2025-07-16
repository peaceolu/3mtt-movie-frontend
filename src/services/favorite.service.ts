import {
	AddToFavoritePayloadType,
	FavoriteResponseType,
} from "@/types/favorite.types";
import { AxiosInstance } from "axios";

class FavoriteserviceAPI {
	static addToFavorite = async ({
		protectedRequest,
		payload,
	}: {
		protectedRequest: AxiosInstance;
		payload: AddToFavoritePayloadType;
	}) => {
		const { data } = await protectedRequest.post<FavoriteResponseType>(
			"/favorites/add",
			payload
		);
		return data.data;
	};

	static getFavorite = async ({
		protectedRequest,
	}: {
		protectedRequest: AxiosInstance;
	}) => {
		const { data } = await protectedRequest.get<FavoriteResponseType>(
			"/favorites"
		);
		return data.data;
	};

	static removeFromFavorite = async ({
		protectedRequest,
		movieId,
	}: {
		protectedRequest: AxiosInstance;
		movieId: number;
	}) => {
		const { data } = await protectedRequest.delete<FavoriteResponseType>(
			`/favorites/remove/${movieId}`
		);
		return data.data;
	};

	static clearFavorite = async ({
		protectedRequest,
	}: {
		protectedRequest: AxiosInstance;
	}) => {
		const { data } = await protectedRequest.delete<FavoriteResponseType>(
			"/favorites/clear"
		);
		return data.data;
	};
}

export default FavoriteserviceAPI;
