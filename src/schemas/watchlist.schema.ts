import { z } from "zod";

export const WatchlistValidationSchema = z.object({
	name: z.string().min(5, "Name must be at least 5 characters long"),
	description: z.string(),
});

export type IWatchlistDataType = z.infer<typeof WatchlistValidationSchema>;

export const WatchlistInviteValidationSchema = z.object({
	email: z.string().email(),
	message: z.string(),
});

export type IWatchlistInviteDataType = z.infer<
	typeof WatchlistInviteValidationSchema
>;

// // Schema for Watchlist invitation
export const WatchlistInvitationValidationSchema = z.object({
	name: z.string().min(5, "Name must be at least 5 characters long"),
	message: z.string().min(5, "Message must be at least 5 characters long"),
});
export type IWatchlistInvitationDataType = z.infer<
	typeof WatchlistInvitationValidationSchema
>;

export const addItemToWatchlistSchema = z.object({
	watchlistId: z.string().min(1, "Watchlist ID is required"),
});

export type IAddItemToWatchlistDataType = z.infer<
	typeof addItemToWatchlistSchema
>;
