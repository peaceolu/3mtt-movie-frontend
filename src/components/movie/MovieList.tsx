import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Movie from "./Movie";

export default function MovieList({ movies }: { movies: any[] }) {
	return (
		// <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-5 w-full">
		<ScrollArea className="w-full ">
			<div className="flex  w-max gap-2 overflow-x-auto p-2">
				{/* Movie cards will go here */}
				{movies.map((movie) => (
					<Movie key={movie.id} data={movie} />
				))}
			</div>
			<ScrollBar orientation="horizontal" className="h-2" />
		</ScrollArea>
	);
}
