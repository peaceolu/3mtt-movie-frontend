import MovieserviceAPI from "@/services/movie.service";
import { useQuery } from "@tanstack/react-query";

export const useGetMovies = ({ page }: { page: number }) => {
	return useQuery({
		queryFn: () => MovieserviceAPI.getMovies({ page }),
		queryKey: ["Movies", page],
	});
};

export const useGetSingleMovieById = ({ id }: { id: number }) => {
	return useQuery({
		queryFn: () => MovieserviceAPI.getMovieById({ id }),
		queryKey: ["movie", id],
	});
};

export const useGetPopularMovies = ({ page }: { page: number }) => {
	return useQuery({
		queryFn: () => MovieserviceAPI.getPopularMovies({ page }),
		queryKey: ["Movies", "popular", page],
	});
};

export const useSearchMovies = ({
	page,
	query,
	sort_by = "popularity",
}: {
	page: number;
	query: string;
	sort_by?: "popularity" | "rating" | "release_date";
}) => {
	return useQuery({
		queryFn: () => MovieserviceAPI.searchMovies({ page, query, sort_by }),
		queryKey: ["Movies", query, page],
	});
};

export const useGetDiscoverMovies = ({
	page = 1,
	with_genres = "",
	include_adult = false,
	include_video = false,
}: {
	page: number;
	with_genres?: string;
	include_adult?: boolean;
	include_video?: boolean;
}) => {
	return useQuery({
		queryFn: () =>
			MovieserviceAPI.getDiscoverMovies({
				page,
				include_adult,
				with_genres,
				include_video,
			}),
		queryKey: ["Movies", page, include_adult, with_genres, include_video],
	});
};

export const useGetMoviesGenres = () => {
	return useQuery({
		queryFn: () => MovieserviceAPI.getMoviesGenres(),
		queryKey: ["genres"],
	});
};

export const useGetMovieTrailers = ({ id }: { id: number }) => {
	return useQuery({
		queryFn: () => MovieserviceAPI.getMovieTrailers({ id }),
		queryKey: ["movie", "trailers", id],
	});
};
