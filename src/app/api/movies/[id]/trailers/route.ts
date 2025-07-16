import { MovieVideoListResponse } from "@/types/movie.types";

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

		const movie = await publicTMDBRequest.get<MovieVideoListResponse>(
			`/movie/${id}/videos?language=en-US&api_key=${api_key}`
		);

		console.log("Movie trailers fetched successfully:", movie.data);
		return NextResponse.json(
			{
				data: movie.data,
				message: "Video fetched successfully",
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
