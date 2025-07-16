"use client";

import Hero from "@/components/landing/Hero";
import MovieFilterGroup from "@/components/movie/MovieFilterGroup";
import MovieGroup from "@/components/movie/MoviesGroup";
import {
	useGetDiscoverMovies,
	useGetMovies,
	useGetPopularMovies,
} from "@/hooks/service-hooks/movie.hook";
import { useState } from "react";

export default function Home() {
	const [genres, setGenres] = useState<number[] | []>([]);
	const { data, isLoading } = useGetMovies({ page: 1 });
	const { data: popularMovies, isLoading: loading } = useGetPopularMovies({
		page: 1,
	});

	const { data: discoverMovies, isLoading: loadingDiscover } =
		useGetDiscoverMovies({ page: 1, with_genres: genres.join(",") });
	return (
		<main className="relative flex flex-col items-start justify-start gap-5 w-full md:p-0 text-center">
			<Hero />
			<MovieGroup
				groupTitle="Discover"
				data={discoverMovies}
				isLoading={loadingDiscover}
				filter={<MovieFilterGroup genres={genres} setGenres={setGenres} />}
			/>
			<MovieGroup groupTitle="trending" data={data} isLoading={isLoading} />
			<MovieGroup
				groupTitle="popular"
				data={popularMovies}
				isLoading={loading}
			/>
		</main>
	);
}
