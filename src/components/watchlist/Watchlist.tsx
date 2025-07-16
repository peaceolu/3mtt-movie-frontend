import { formatDate } from "@/lib/timedate";
import { cn } from "@/lib/utils";
import { WatchlistType } from "@/types/watchlist.types";
import { Badge } from "../ui/badge";
import Image from "next/image";
import WatchlistDialog from "./WatchlistDialog";
import Link from "next/link";

interface WatchlistProps {
	data: WatchlistType;
	className?: string;
}
export default function Watchlist({ data, className }: WatchlistProps) {
	const { name, description, createdAt, type, image, items, _id } = data;
	return (
		<li
			className={cn(
				"relative flex text-left flex-col items-start justify-start rounded-md shadow-md p-2 w-full gap-4 bg-white",
				className
			)}
		>
			<Image
				src={image || "/movie-placeholder.jpg"}
				width={300}
				height={300}
				alt={name}
				className="w-full h-[200px] object-cover rounded-md shadow-md"
			/>
			<div className="flex flex-col items-start justify-start gap-2 p-2">
				<Link
					href={"/dashboard/watchlists/" + _id}
					className="w-full underline"
				>
					<h1 className="font-semibold">{name}</h1>
				</Link>
				<p className="mt-4">{description}</p>
				<small className="mt-2 text-gray-500">
					{formatDate(createdAt as string)}
				</small>
				<Badge className="text-[#ADF802] absolute top-0 left-0 font-semibold">
					{items?.length} {type === "movie" ? "Movies" : "TV Shows"}
				</Badge>
				<Badge>{type}</Badge>
				<WatchlistDialog id={_id} name={name} />
			</div>
		</li>
	);
}
