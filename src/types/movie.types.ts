import { Genre } from "./genre.types";

export interface MovieType {
	_id?: string; // Optional, defaults to empty string
	adult: boolean; // Defaults to false
	backdrop_path: string; // Defaults to empty string
	genre_ids: number[]; // Array of integers
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
export interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface MovieDetailType {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: boolean;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: number;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: [
		{
			iso_3166_1: string;
			name: string;
		}
	];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: [
		{
			english_name: string;
			iso_639_1: string;
			name: string;
		}
	];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
export interface MovieListType {
	page: number; // Defaults to 1
	results: MovieType[]; // Array of Movie objects
	total_pages: number; // Defaults to 0
	total_results: number; // Defaults to 0
}

export interface MovieListResponse {
	data: MovieListType; // The main data object containing the list of movies
	message: string; // A message indicating the status of the response
	error?: string; // An optional error message if something went wrong
}

export interface MovieDetailResponse {
	data: MovieDetailType; // The main data object containing a single movie
	message: string; // A message indicating the status of the response
	error?: string; // An optional error message if something went wrong
}

export interface MovieVideoType {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	published_at: string;
	site: "YouTube";
	size: number;
	type: string;
	official: boolean;
	id: string;
}

export interface MovieVideoResponse {
	data: MovieDetailType; // The main data object containing a single movie
	message: string; // A message indicating the status of the response
	error?: string; // An optional error message if something went wrong
}

export interface MovieVideoListResponse {
	data: { id: string; results: MovieVideoType[] }; // An array of movie video objects
	message: string; // A message indicating the status of the response
	error?: string; // An optional error message if something went wrong
}
