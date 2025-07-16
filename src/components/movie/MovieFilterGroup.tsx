"use client";

import { useGetMoviesGenres } from "@/hooks/service-hooks/movie.hook";
import Loader from "../Loader";
import Genre from "./Genre";
import { cn } from "@/lib/utils";

interface MovieFilterGroupProps {
	// Define any props if needed
	genres?: number[];
	setGenres?: React.Dispatch<React.SetStateAction<number[]>>;
	className?: string;
}
export default function MovieFilterGroup({
	genres,
	setGenres,
	className,
}: MovieFilterGroupProps) {
	const { data, isLoading } = useGetMoviesGenres();
	if (isLoading) return <Loader message="loading genres" />;
	if (!data || data?.genres.length === 0) return <div>No genres available</div>;

	const handleGenreClick = (genreId: number) => {
		// Handle genre click logic here, e.g., filter movies by genre
		if (setGenres && genres) {
			if (genres.includes(genreId as never)) {
				setGenres && setGenres(genres.filter((id) => id !== genreId)); // Remove genre if already selected
			} else {
				setGenres && setGenres([...genres, genreId]); // Add genre to selected genres
			}
		}
	};

	return (
		<div
			className={cn(
				"flex flex-wrap gap-2 items-center justify-start p-2 rounded-md bg-[#ADF802]/20 w-full",
				className
			)}
		>
			{data.genres.map((genre) => (
				<Genre
					key={genre.id}
					{...genre}
					handleClick={handleGenreClick}
					selected={genres && genres.includes(genre.id as never)}
				/>
			))}
		</div>
	);
}
