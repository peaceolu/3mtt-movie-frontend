import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useAxios } from "@/hooks/use-axios";
import { useDeleteWatchlist } from "@/hooks/service-hooks/watchlist.types";
import WatchlistForm from "./WatchlistForm";

export default function WatchlistDialog({
	id,
	name,
	updateHandler,
}: {
	id: string;
	name: string;
	updateHandler?: () => void;
}) {
	const { mutateAsync: deleteWatchlist, isPending: deleting } =
		useDeleteWatchlist();
	const { protectedRequest } = useAxios();

	const handleDelete = async () => {
		if (deleting) return;
		await deleteWatchlist({
			watchlistId: id,
			protectedRequest,
		});
	};

	return (
		<Dialog>
			<DialogTrigger className="absolute top-2 right-2 z-10">
				<MoreHorizontal
					size={30}
					className="text-[#ADF802]  text-3xl p-1 px-2 rounded-full bg-black"
				/>
			</DialogTrigger>

			<DialogContent className="w-[400px] bg-black text-[#ADF802] p-5 rounded-lg">
				<DialogHeader className="text-white text-xl font-semibold">
					{name}
				</DialogHeader>
				<div className="flex flex-col items-start justify-start gap-2">
					<WatchlistForm />
					<Button
						onClick={handleDelete}
						disabled={deleting}
						className="flex items-center justify-between  shadow-sm shadow-gray-300/50"
					>
						<Trash size={20} className="text-[#ADF802]" />
						<span className="text-red-500">Delete</span>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
