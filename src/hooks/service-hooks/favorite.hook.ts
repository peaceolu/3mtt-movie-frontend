import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../use-axios";
import FavoriteServiceAPI from "@/services/favorite.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

// movie Favorite hooks are not implemented in the client side
export const useAddToFavorite = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: FavoriteServiceAPI.addToFavorite,
		onSuccess: () => {
			toast.success("Movie added to favorite");
			queryClient.invalidateQueries({
				queryKey: ["favorite"],
			});
		},
		onError: (error: AxiosError<{ message: string }>) => {
			console.error("Failed to add movie to Favorite:", error);
			toast.error(
				error.response?.data.message || "Failed to add movie to favorite"
			);
		},
	});
};

export const useGetFavorite = () => {
	const { protectedRequest } = useAxios();
	return useQuery({
		queryFn: () => FavoriteServiceAPI.getFavorite({ protectedRequest }),
		queryKey: ["favorite"],
	});
};

export const useRemoveFromFavorite = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: FavoriteServiceAPI.removeFromFavorite,
		onSuccess: () => {
			toast.success("Movie removed from favorite");
			queryClient.invalidateQueries({
				queryKey: ["favorite"],
			});
		},
		onError: (error: AxiosError<{ message: string }>) => {
			console.error("Failed to add movie to Favorite:", error);
			toast.error(
				error.response?.data.message || "Failed to remove from favorite"
			);
		},
	});
};

export const useClearFavorite = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: FavoriteServiceAPI.clearFavorite,
		onSuccess: () => {
			toast.success("Favorite cleared");
			queryClient.invalidateQueries({
				queryKey: ["favorite"],
			});
		},
		onError: () => {
			toast.error("Failed to clear favorite");
		},
	});
};
