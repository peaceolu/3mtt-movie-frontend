"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSession from "@/lib/session/use-session";
import { Heart, List } from "lucide-react";

export default function Dashboard() {
	const {
		session: { user },
	} = useSession();
	return (
		<div className="relative flex flex-col items-start justify-start gap-10 w-full md:p-0 text-center">
			<header className="p-2 rounded-md shadow-2xl bg-black w-full h-[200px] flex items-center justify-center">
				<h1 className="text-3xl font-bold text-[#ADF802]">
					{user.firstName} {user.lastName}
				</h1>
			</header>

			<div className="w-full flex flex-col items-start justify-start gap-5">
				<h2 className="font-semibold flex gap-2">
					<Heart /> My Favorites
				</h2>
				<ScrollArea className="w-full h-[200px] p-2 rounded-md border-[1px] ">
					<div>
						<p className="text-gray-500">No favorites added yet.</p>
					</div>
				</ScrollArea>
			</div>

			<div className="w-full flex flex-col items-start justify-start gap-5">
				<h2 className="font-semibold flex gap-2">
					<List />
					My Watchlist
				</h2>
				<ScrollArea className="w-full h-[200px] p-2 rounded-md border-[1px] bg-black/40">
					<div>
						<p className="text-gray-500">No watchlist added yet.</p>
					</div>
				</ScrollArea>
			</div>

			<div className="w-full flex flex-col items-start justify-start gap-5">
				<div className="flex items-center justify-between w-full">
					<h2 className="font-semibold flex gap-2">
						<List />
						My Other lists
					</h2>
					<Button>Add list</Button>
				</div>
				<ScrollArea className="w-full h-[200px] p-2 rounded-md border-[1px]">
					<div>
						<p className="text-gray-500">No watchlists added yet.</p>
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
