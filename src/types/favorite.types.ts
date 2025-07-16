import { MovieType } from "./movie.types";

export interface FavoriteType {
	_id: string; // Defaults to empty string
	user: string; // Defaults to empty string
	movies: MovieType[]; // Array of MovieType
	createdAt: string; // Defaults to empty string
	updatedAt: string; // Defaults to empty string
}

export interface AddToFavoritePayloadType {
	adult: boolean; // Defaults to false
	backdrop_path: string; // Defaults to empty string
	genre_ids?: number[]; // Array of integers
	id: number; // Defaults to 0
	original_language: string; // Defaults to empty string
	original_title: string; // Defaults to empty string
	overview: string; // Defaults to empty string
	popularity: number; // Defaults to 0
	poster_path: string; // Defaults to empty string
	release_date: string; // Defaults to empty string
	title: string; // Defaults to empty string
	video: boolean; // Defaults to true
	vote_average: number; // Defaults to 0
	vote_count: number; // Defaults to 0
}

export type RemoveFromFavoritePayloadType = MovieType; // MovieType object

export interface FavoriteResponseType {
	data: FavoriteType; // The main data object containing the Favorite
	message: string; // A message indicating the status of the response
	error?: string; // An optional error message if something went wrong
}
