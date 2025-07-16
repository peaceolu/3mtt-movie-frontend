import { cn } from "@/lib/utils";
import { MovieType } from "@/types/movie.types";
import { Star } from "lucide-react";
import Image from "next/image";
import MovieDialog from "./MovieDialog";
import Link from "next/link";

interface MovieProps {
	// Define any props that Movie component might need
	className?: string;
	data: MovieType;
}
export default function Movie({ className, data }: MovieProps) {
	const { poster_path, title, vote_average, release_date, id } = data;
	return (
		<div
			className={cn(
				"w-[200px] flex flex-col items-start justify-start gap-1 relative",
				className
			)}
		>
			<Image
				src={
					poster_path
						? "http://image.tmdb.org/t/p/w500" + poster_path
						: "/movie-placeholder.jpg"
				}
				alt={title}
				width={200}
				height={200}
				className="w-full rounded-lg h-full shadow-md object-cover"
			/>
			<MovieDialog movieData={data} />
			<div className="absolute top-2 left-2 flex items-center gap-1 text-[#ADF802] bg-black/30  px-2 py-1 rounded-full">
				<Star className="text-[#ADF802]" size={16} />
				<h3> {Math.ceil(vote_average)}</h3>
			</div>
			{/* Movie details will be displayed here */}
			<div className="absolute top-0 left-0 right-0 bg-[#ADF802]/10 hover:bg-black/0 group h-full rounded-lg text-black flex flex-col items-start justify-end p-1">
				<div className="w-full text-left flex flex-col items-start justify-end gap-1 h-[26%] shadow-2xl shadow-slate-100 group-hover:h-fit bg-[#ADF802]/60 group-hover:bg-black/40 group-hover:text-white p-1 rounded-lg">
					<Link
						href={`movies/${id}`}
						className="text-sm underline capitalize bg-[#ADF802]/80 rounded-xl px-2"
					>
						{title}
					</Link>
					<small className="text-[#ADF802] text-sm flex items-center gap-1">
						{(release_date.split("-") || [])[0] || "Unknown"}
					</small>
				</div>
			</div>
		</div>
	);
}
