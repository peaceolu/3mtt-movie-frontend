import WatchlistServiceAPI from "@/services/watchlist.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../use-axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useGetAllWatchlists = () => {
	const { protectedRequest } = useAxios();
	return useQuery({
		queryFn: () => WatchlistServiceAPI.getAllWatchlists({ protectedRequest }),
		queryKey: ["watchlists"],
	});
};

export const useCreateWatchlist = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: WatchlistServiceAPI.createWatchlist,
		onSuccess: () => {
			toast.success("Watchlist created successfully");
			queryClient.invalidateQueries({
				queryKey: ["watchlists"],
			});
		},
		onError: (error: AxiosError<{ message: string }>) => {
			toast.error(error.response?.data.message || "Failed to create watchlist");
		},
	});
};

export const useGetWatchlistById = (watchlistId: string) => {
	const { protectedRequest } = useAxios();
	return useQuery({
		queryFn: () =>
			WatchlistServiceAPI.getWatchlist({ protectedRequest, watchlistId }),
		queryKey: ["watchlist", watchlistId],
	});
};

export const useUpdateWatchlist = (watchlistId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: WatchlistServiceAPI.updateWatchlist,
		onSuccess: () => {
			toast.success("Watchlist updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["watchlist", watchlistId],
			});
		},
		onError: (error: AxiosError<{ message: string }>) => {
			toast.error(error.response?.data.message || "Failed to update watchlist");
		},
	});
};

export const useDeleteWatchlist = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: WatchlistServiceAPI.deleteWatchlist,
		onSuccess: () => {
			toast.success("Watchlist deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["watchlists"],
			});
		},
		onError: (error: AxiosError<{ message: string }>) => {
			toast.error(error.response?.data.message || "Failed to delete watchlist");
		},
	});
};

// add item to watchlist
export const useAddToWatchlist = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: WatchlistServiceAPI.addItemToWatchlist,
		onSuccess: (data) => {
			toast.success("Movie added to watchlist");
			queryClient.invalidateQueries({
				queryKey: ["watchlist", data._id],
			});
		},
		onError: (error: AxiosError<{ message: string }>) => {
			toast.error(
				error.response?.data.message || "Failed to add movie to watchlist"
			);
		},
	});
};

// remove item from watchlist
export const useRemoveFromWatchlist = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: WatchlistServiceAPI.removeItemFromWatchlist,
		onSuccess: (data) => {
			console.log(data);
			toast.success("Movie removed from watchlist");
			queryClient.invalidateQueries({
				queryKey: ["watchlist", data._id],
			});
		},
		onError: (error: AxiosError<{ message: string }>) => {
			toast.error(
				error.response?.data.message || "Failed to remove movie from watchlist"
			);
		},
	});
};
