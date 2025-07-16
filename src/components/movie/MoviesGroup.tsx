"use client";
import MovieList from "./MovieList";
import { MovieListType } from "@/types/movie.types";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type GroupType =
	| "popular"
	| "top-rate"
	| "upcoming"
	| "now-playing"
	| "trending";
interface MovieGroupProps {
	// Define any props that MovieGroup component might need
	groupTitle: string;
	groupDescription?: string;
	data: MovieListType | undefined;
	isLoading: boolean;
	className?: string;
	filter?: React.ReactNode;
}
export default function MovieGroup({
	groupTitle,
	data,
	isLoading,
	className,
	filter,
}: MovieGroupProps) {
	return (
		<section
			className={cn(
				"w-full flex flex-col items-start justify-start gap-5 p-5 md:px-10",
				className
			)}
		>
			<div className="flex items-center justify-between w-full mb-2 bg-slate-100/60 border-[1px] p-2 rounded-xl">
				<h2
					className={`font-normal md:text-lg md:font-semibold capitalize border-b-0 border-[#ADF802] mb-0 text-black`}
				>
					{groupTitle} ({data?.results.length || 0})
				</h2>
				<div className="flex items-center gap-2">
					<h3>
						<span className="bg-[#ADF802] px-1 rounded-md">{data?.page}</span>
						... {data?.total_pages || 0}
					</h3>
					<Button className="text-[#ADF802]">
						<LoaderCircle /> More
					</Button>
				</div>
			</div>
			{filter && filter}
			{/* Placeholder for movie cards */}
			{isLoading ? (
				<p className="text-gray-500">Loading movies...</p>
			) : !data || data?.results?.length === 0 ? (
				<p className="text-gray-500">
					No popular movies available at the moment.
				</p>
			) : (
				<MovieList movies={data?.results} />
			)}
		</section>
	);
}
