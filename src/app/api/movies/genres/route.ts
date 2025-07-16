import { publicTMDBRequest } from "@/lib/axios";
import { GenreListResponse } from "@/types/genre.types";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const api_key = process.env.TBDM_API_KEY;
		if (!api_key) {
			return NextResponse.json(
				{
					error: "API key is missing",
				},
				{ status: 400 }
			);
		}
		const movies = await publicTMDBRequest.get<GenreListResponse>(
			`/genre/movie/list?language=en&api_key=${api_key}`
		);

		return NextResponse.json(
			{
				data: movies.data,
				message: "Movies fetched successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching genres:", error);
		return NextResponse.json(
			{
				error: "An error occurred while fetching movies" + error,
			},
			{ status: 500 }
		);
	}
}
