import { MovieListResponse } from "@/types/movie.types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams.get("query");
		const page = req.nextUrl.searchParams.get("page") || "1";
		const sort_by = req.nextUrl.searchParams.get("sort_by") || "1";

		const api_key = process.env.TBDM_API_KEY;
		if (!api_key) {
			return NextResponse.json(
				{
					error: "API key is missing",
				},
				{ status: 400 }
			);
		}
		const movies = await axios.get<MovieListResponse>(
			`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&api_key=${api_key}&query=${query}&page=${page}&sort_by=${sort_by}`
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
				error: "An error occurred while fetching movies" + error,
			},
			{ status: 500 }
		);
	}
}
