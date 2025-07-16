import { MovieListResponse } from "@/types/movie.types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

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
		const movies = await axios.get<MovieListResponse>(
			`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${1}&api_key=${api_key}`
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
