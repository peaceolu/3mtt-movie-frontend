"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "@/hooks/use-axios";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ListMusic } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useMemo, useRef } from "react";
import {
	addItemToWatchlistSchema,
	IAddItemToWatchlistDataType,
} from "@/schemas/watchlist.schema";
import {
	useAddToWatchlist,
	useGetAllWatchlists,
	useRemoveFromWatchlist,
} from "@/hooks/service-hooks/watchlist.types";
import { MovieType } from "@/types/movie.types";
import FormSelect from "../form-fields/FormSelect";

interface WorkspaceFormProps {
	movieData: MovieType;
}
export default function AddItemToWatchlistForm({
	movieData,
}: WorkspaceFormProps) {
	const { mutateAsync, isPending, isSuccess: addSuccess } = useAddToWatchlist();
	const {
		mutateAsync: removeFromWatchlist,
		isPending: isUpdating,
		isSuccess,
	} = useRemoveFromWatchlist();
	const { protectedRequest } = useAxios();
	const closeBtnRef = useRef<HTMLButtonElement>(null);
	const { data: watchlist, isLoading } = useGetAllWatchlists();

	const form = useForm({
		resolver: zodResolver(addItemToWatchlistSchema),
	});

	const isInWatchlistFn = useCallback(() => {
		if (!watchlist || watchlist.length === 0) return false;
		// check for the items property in each watchlist to see if a movie inside
		return watchlist.some((item) =>
			item.items?.some((movie) => movie.id === movieData.id)
		);
	}, [isSuccess, addSuccess, watchlist, movieData?._id]);

	const isInWatchlist = useMemo(isInWatchlistFn, [watchlist, movieData.id]);

	const onSubmit = async (data: IAddItemToWatchlistDataType) => {
		if (isInWatchlist) {
			await removeFromWatchlist({
				protectedRequest,
				itemId: movieData.id,
				watchlistId: data.watchlistId,
			});
		} else {
			await mutateAsync({
				protectedRequest,
				item: movieData,
				watchlistId: data.watchlistId,
			});
		}
		// Reset the form after submission
		form.reset();
		// Close the dialog after submission
		if (closeBtnRef.current) {
			closeBtnRef.current.click();
		}
	};
	const {
		handleSubmit,
		control,
		register,
		watch,
		formState: { errors },
		getValues,
	} = form;

	return (
		<Dialog>
			<DialogTrigger asChild>
				{isInWatchlist ? (
					<Button className="w-full flex items-center justify-between  shadow-sm shadow-gray-300/50">
						<ListMusic size={20} className="text-red-500" />
						<span className="text-gray-200">Remove</span>
					</Button>
				) : (
					<Button>
						<ListMusic /> New Watchlist
					</Button>
				)}
			</DialogTrigger>

			<DialogContent className="w-full md:w-1/2 lg:w-1/3">
				<DialogHeader>
					<DialogTitle>
						{isInWatchlist ? "Remove" : "Add"} Item to Watchlist
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="rounded-md space-y-5 p-5  w-full"
					>
						{watchlist && watchlist.length > 0 && (
							<FormSelect
								control={control}
								label="Watchlist"
								placeholder="Select watchlist"
								register={register("watchlistId")}
								className="w-full"
								emptyMessage=""
								options={watchlist.map((item) => ({
									label: item.name,
									value: item._id,
								}))}
							/>
						)}

						{isInWatchlist ? (
							<Button
								disabled={isPending}
								className={cn("btn bg-black w-full", {
									"animate-pulse": isUpdating,
								})}
								type="submit"
							>
								{isUpdating ? "Removing" : "Remove"}
							</Button>
						) : (
							<Button
								disabled={isPending}
								className={cn("btn bg-black w-full", {
									"animate-pulse": isPending,
								})}
								type="submit"
							>
								{isPending ? "Adding" : "Add"}
							</Button>
						)}
					</form>
				</Form>
				<DialogClose asChild>
					<button ref={closeBtnRef} hidden></button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}
