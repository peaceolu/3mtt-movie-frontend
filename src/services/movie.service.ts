import { GenreListResponse } from "@/types/genre.types";
import {
	MovieListResponse,
	MovieDetailResponse,
	MovieVideoListResponse,
} from "@/types/movie.types";
import axios, { AxiosInstance } from "axios";

class MovieServiceAPI {
	static async getMovies({ page = 1 }: { page?: number }) {
		const { data } = await axios.get<MovieListResponse>(
			"/api/movies/trending",
			{
				params: { page },
			}
		);
		return data.data;
	}

	static async getPopularMovies({ page = 1 }: { page?: number }) {
		const { data } = await axios.get<MovieListResponse>("/api/movies/popular", {
			params: { page },
		});
		return data.data;
	}

	static async searchMovies({
		page = 1,
		query,
		sort_by = "popularity",
	}: {
		page?: number;
		query?: string;
		sort_by?: "popularity" | "rating" | "release_date";
	}) {
		const { data } = await axios.get<MovieListResponse>("/api/movies/search", {
			params: { page, query, sort_by },
		});
		return data.data;
	}

	static async getMovieById({ id }: { id: number }) {
		const { data } = await axios.get<MovieDetailResponse>(`/api/movies/${id}`);
		return data.data;
	}

	static async getDiscoverMovies({
		page = 1,
		with_genres = "",
		include_adult = false,
		include_video = false,
	}: {
		page?: number;
		with_genres?: string;
		include_adult?: boolean;
		include_video?: boolean;
	}) {
		const { data } = await axios.get<MovieListResponse>(
			"/api/movies/discover",
			{
				params: {
					page,
					with_genres,
					include_adult,
					include_video,
				},
			}
		);
		return data.data;
	}

	// get list of genres
	static async getMoviesGenres() {
		const { data } = await axios.get<GenreListResponse>("/api/movies/genres");
		return data.data;
	}

	// get movie trailers
	static async getMovieTrailers({ id }: { id: number }) {
		const { data } = await axios.get<MovieVideoListResponse>(
			`/api/movies/${id}/trailers`
		);
		return data.data;
	}

	static async getMovieRecommendations({ id }: { id: number }) {
		const { data } = await axios.get<MovieVideoListResponse>(
			`/api/movies/${id}/recommendations`
		);
		return data.data;
	}
}

export default MovieServiceAPI;
