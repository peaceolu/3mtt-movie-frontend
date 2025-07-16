import axios from "axios";

// tmdb request
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const publicTMDBRequest = axios.create({
	baseURL: TMDB_BASE_URL,
});

publicTMDBRequest.interceptors.request.use(
	(request) => {
		// request.headers[
		// 	"Authorization"
		// ] = `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
		request.headers["Content-Type"] = "Application/json";
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { publicTMDBRequest, TMDB_BASE_URL };
