"use client";

import Loader from "@/components/Loader";
import MovieVideo from "@/components/movie/MovieVideo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	useGetMovieTrailers,
	useGetSingleMovieById,
} from "@/hooks/service-hooks/movie.hook";
import { useAddToFavorite } from "@/hooks/service-hooks/favorite.hook";
import { useAxios } from "@/hooks/use-axios";
import { Banknote, Clock, Heart, List, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function MovieDetailPage() {
	const { protectedRequest } = useAxios();
	const { id } = useParams();
	const { data, isLoading } = useGetSingleMovieById({
		id: parseInt(id as string),
	});
	const { isPending, mutateAsync } = useAddToFavorite();
	const { data: trailersData, isLoading: loadingTrailers } =
		useGetMovieTrailers({
			id: parseInt(id as string),
		});
	if (isLoading) return <Loader className="h-[50vh] pt-20" />;
	if (!data)
		return (
			<div className="h-[50vh] flex items-center justify-center">
				<h2>Failed to get detail for movie with id {id}</h2>
			</div>
		);
	const {
		title,
		poster_path,
		release_date,
		genres,
		vote_count,
		runtime,
		overview,
		budget,
		production_companies,
		production_countries,
		adult,
	} = data;

	const handleAddToFavorite = async () => {
		try {
			await mutateAsync({ payload: data, protectedRequest });
		} catch (error) {
			console.error("Failed to add movie to Favorite:", error);
		}
	};
	return (
		<div className="w-full flex flex-col gap-10 p-5 pt-10 md:p-30">
			<div className="relative flex flex-col md:flex-row items-start justify-start gap-10 w-full text-center h-fit h-min-[50vh]">
				<div className="w-full flex flex-col items-center justify-start gap-5 md:w-fit">
					<Image
						src={
							poster_path
								? "http://image.tmdb.org/t/p/w500" + poster_path
								: "/movie-placeholder.jpg"
						}
						height={400}
						width={300}
						alt={title}
						className="w-full md:w-fit h-[300px] md:h-[400px] object-cover rounded-md"
					/>
				</div>
				<div className="flex flex-col items-start justify-start gap-5 w-full">
					<h2 className="font-semibold md:text-2xl">
						{title}({release_date.split("-")[0]})
					</h2>
					<span className="p-2 bg-gray-200 rounded-md">
						{adult ? "18+" : "Parental guide applies"}
					</span>
					<section className="flex items-center gap-5">
						<div className="flex items-center gap-2 bg-black/30 p-2 text-white rounded-md">
							<ThumbsUp /> <span>{vote_count}</span>
						</div>
						<div className="flex items-center gap-2 bg-black/30 p-2 text-white rounded-md">
							<Clock /> <span>{runtime} minutes</span>
						</div>
						<div className="flex items-center gap-2 bg-black/30 shadow-sm p-2 text-white rounded-md">
							<Banknote /> <span>${Math.ceil(budget / 1000000)}m</span>
						</div>
					</section>
					<section className="flex gap-2 items-center flex-wrap justify-start">
						<Button onClick={handleAddToFavorite} disabled={isPending}>
							<Heart />
						</Button>
						<Button>
							<List />
						</Button>
					</section>
					<div className="flex items-start justify-start flex-wrap gap-2 w-fit  bg-black/20 p-2 rounded-md">
						{genres.map((item) => (
							<Badge className="p-4 py-0 bg-amber-200 text-black" key={item.id}>
								{item.name}
							</Badge>
						))}
					</div>

					<section className="text-left">
						<h2 className="font-semibold mb-2">Overview</h2>
						<p>{overview}</p>
					</section>

					{/* production companies that produced it */}
					{production_companies && production_companies.length > 0 && (
						<section className="text-left">
							<h2 className="font-semibold mb-2">Produced By</h2>
							<ol className="list-disc px-5">
								{production_companies.map((item) => (
									<li key={item.id}>{item.name}</li>
								))}
							</ol>
						</section>
					)}

					{/* Production countries where the movie was produced */}
					{production_countries && production_countries.length > 0 && (
						<section className="text-left">
							<h2 className="font-semibold mb-2">Produced In</h2>
							<ol className="list-disc px-5">
								{production_countries.map((item) => (
									<li key={item.iso_3166_1}>{item.name}</li>
								))}
							</ol>
						</section>
					)}
				</div>
			</div>
			<section className="w-full ">
				{loadingTrailers ? (
					<Loader className="h-[50vh] pt-20" />
				) : trailersData?.results && trailersData.results.length > 0 ? (
					<MovieVideo videoId={trailersData.results[0].key} />
				) : (
					<h2 className="bg-red-300 p-2 rounded-md">
						No trailers available for this movie.
					</h2>
				)}
			</section>
		</div>
	);
}
