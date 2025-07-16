import { z } from "zod";

export const movieSearchBarVaidation = z.object({
	searchTerm: z
		.string()
		.min(1, { message: "Search term must be at least 1 character long" })
		.max(100, { message: "Search term must be at most 100 characters long" }),
	sortBy: z
		.string()
		.optional()
		.refine(
			(val) =>
				val === undefined ||
				["popularity", "rating", "release_date"].includes(val),
			{
				message:
					"Sort by must be one of 'popularity', 'rating', or 'release_date' if provided",
			}
		),
});

export type MovieSearchBarValidationType = z.infer<
	typeof movieSearchBarVaidation
>;
