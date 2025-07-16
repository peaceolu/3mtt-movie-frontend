import { MovieListResponse } from "@/types/movie.types";

import { NextRequest, NextResponse } from "next/server";
import { publicTMDBRequest } from "@/lib/axios";

export async function GET(req: NextRequest) {
	try {
		const with_genres = req.nextUrl.searchParams.get("with_genres") || "";
		const page = req.nextUrl.searchParams.get("page") || 1;
		const include_adult =
			req.nextUrl.searchParams.get("include_adult") || false;
		const include_video =
			req.nextUrl.searchParams.get("include_video") || false;

		const api_key = process.env.TBDM_API_KEY;
		if (!api_key) {
			return NextResponse.json(
				{
					error: "API key is missing",
				},
				{ status: 400 }
			);
		}
		const movies = await publicTMDBRequest.get<MovieListResponse>(
			// /discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc
			`/discover/movie?include_adult=${include_adult}&include_video=${include_video}&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${with_genres}&api_key=${api_key}`
		);
		return NextResponse.json(
			{
				data: movies.data,
				message: "Movies fetched successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: "An error occurred while fetching movies",
			},
			{ status: 500 }
		);
	}
}
