import { cn } from "@/lib/utils";
import { WatchlistType } from "@/types/watchlist.types";
import Watchlist from "./Watchlist";

interface WatchlistListProps {
	data: WatchlistType[];
	className?: string;
}
export default function WatchlistList({ data, className }: WatchlistListProps) {
	return (
		<ul
			className={cn(
				"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full",
				className
			)}
		>
			{data.map((watchlist) => (
				<Watchlist key={watchlist._id} data={watchlist} />
			))}
		</ul>
	);
}
