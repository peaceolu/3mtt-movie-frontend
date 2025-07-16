export interface Genre {
	id: number;
	name: string;
}
export interface GenreResponse {
	genres: Genre[];
}
export interface GenreListResponse {
	data: GenreResponse;
	status: string;
	message?: string;
}
