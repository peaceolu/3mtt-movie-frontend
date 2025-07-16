"use client";

import InvalidDataMessage from "@/components/InvalidDataMessage";
import Loader from "@/components/Loader";
import MovieList from "@/components/movie/MovieList";
import { Button } from "@/components/ui/button";
import {
	useClearFavorite,
	useGetFavorite,
} from "@/hooks/service-hooks/favorite.hook";
import { useAxios } from "@/hooks/use-axios";

import { Heart } from "lucide-react";

export default function FavoritesPage() {
	const { data, isLoading } = useGetFavorite();
	const { mutate, isPending } = useClearFavorite();
	const { protectedRequest } = useAxios();

	const handleClearFavorite = () => {
		mutate({ protectedRequest });
	};
	return (
		<div className="relative flex flex-col items-start justify-start gap-10 w-full md:p-0 text-center">
			<header className="p-2 rounded-md shadow-2xl bg-white/30 border-2 w-full h-[100px] gap-2 flex items-center justify-center">
				<Heart size={30} />
				<h1 className="text-3xl font-bold">Favorites</h1>
			</header>
			<Button onClick={handleClearFavorite} disabled={isPending}>
				Clear Favorite
			</Button>

			<div className="w-full flex flex-col items-start justify-start gap-5">
				{isLoading ? (
					<Loader className="w-full" />
				) : data && data?.movies?.length > 0 ? (
					<MovieList movies={data.movies} />
				) : (
					<InvalidDataMessage className="mx-auto w-fit bg-white/0" />
				)}
			</div>
		</div>
	);
}
