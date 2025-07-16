"use client";

import InvalidDataMessage from "@/components/InvalidDataMessage";
import Loader from "@/components/Loader";
import MovieList from "@/components/movie/MovieList";
import { Button } from "@/components/ui/button";
import WatchlistForm from "@/components/watchlist/WatchlistForm";
import WatchlistList from "@/components/watchlist/WatchlistList";
import { useGetAllWatchlists } from "@/hooks/service-hooks/watchlist.types";

import { ListMusic } from "lucide-react";

export default function WatchlistPage() {
	const { data, isLoading } = useGetAllWatchlists();

	return (
		<div className="relative flex flex-col items-start justify-start gap-10 w-full md:p-0 text-center">
			<header className="p-2 rounded-md shadow-2xl bg-white/30 border-2 w-full h-[100px] gap-2 flex items-center justify-center">
				<ListMusic size={30} />
				<h1 className="text-3xl font-bold">Watchlists</h1>
			</header>
			<WatchlistForm />

			<div className="w-full flex flex-col items-start justify-start gap-5">
				{isLoading ? (
					<Loader className="w-full" />
				) : data && data?.length > 0 ? (
					<WatchlistList data={data} />
				) : (
					<InvalidDataMessage className="mx-auto w-fit bg-white/0" />
				)}
			</div>
		</div>
	);
}
