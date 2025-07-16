"use client";

import InvalidDataMessage from "@/components/InvalidDataMessage";
import Loader from "@/components/Loader";
import MovieList from "@/components/movie/MovieList";
import { Button, buttonVariants } from "@/components/ui/button";
import { useGetWatchlistById } from "@/hooks/service-hooks/watchlist.types";
import { formatDate } from "@/lib/timedate";
import { MovieType } from "@/types/movie.types";
import { ListMusic, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function WatchlistDetailPage() {
	const { id } = useParams() as { id: string };
	const { data, isLoading } = useGetWatchlistById(id);

	if (isLoading) return <Loader className="w-full " />;
	if (!data)
		return (
			<InvalidDataMessage
				className="w-full"
				message="Failed to load watchlist details"
			/>
		);
	const { image, name, createdAt, items, description } = data;
	return (
		<div className="w-full flex flex-col gap-10">
			<div className="w-full space-y-2">
				<Image
					src={
						image
							? "http://image.tmdb.org/t/p/w500" + image
							: "/movie-placeholder.jpg"
					}
					height={200}
					width={300}
					alt={name}
					className="w-full  h-[200px] md:h-[200px] object-cover rounded-md shadow-2xl"
				/>
				<div className="flex flex-col items-start justify-start gap-5 w-full">
					<h2 className="font-semibold md:text-2xl">{name}</h2>
					<p>{formatDate(createdAt)}</p>

					{description && (
						<section className="text-left">
							<h2 className="font-semibold mb-2">Description</h2>
							<p>{description}</p>
						</section>
					)}
				</div>
			</div>

			<section className="w-full bg-white/30 p-5 rounded-md shadow-md">
				<div className=" flex items-center justify-between w-full">
					<h2 className="text-xl font-semibold mb-5 flex gap-2 items-center">
						<ListMusic /> Movies/items in this Watchlist
					</h2>
					<Link href={"/"} className={buttonVariants({ variant: "outline" })}>
						<Play /> Add Item
					</Link>
				</div>
				<MovieList movies={items as MovieType[]} />
			</section>
		</div>
	);
}
