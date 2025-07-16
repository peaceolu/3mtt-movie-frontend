import { MovieDetailResponse, MovieListResponse } from "@/types/movie.types";

import { NextRequest, NextResponse } from "next/server";
import { publicTMDBRequest } from "@/lib/axios";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const api_key = process.env.TBDM_API_KEY;
		if (!api_key) {
			return NextResponse.json(
				{
					error: "API key is missing",
				},
				{ status: 400 }
			);
		}
		console.log(id);
		const movie = await publicTMDBRequest.get<MovieDetailResponse>(
			// /discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc
			`/movie/${id}?language=en-US&api_key=${api_key}`
		);
		return NextResponse.json(
			{
				data: movie.data,
				message: "Movie fetched successfully",
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
