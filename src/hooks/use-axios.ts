"use client";

import useSession from "@/lib/session/use-session";
import axios from "axios";
import { useRouter } from "next/navigation";

const BACKEND_BASE_URL =
	process.env.NODE_ENV === "development"
		? process.env.NEXT_PUBLIC_BACKEND_BASE_URL
		: process.env.NEXT_PUBLIC_PROD_BACKEND_BASE_URL;

export const useAxios = () => {
	const { session, logout } = useSession();
	const router = useRouter();
	const token = session.token || "";
	const protectedRequest = axios.create({
		baseURL: BACKEND_BASE_URL,
	});
	const publicRequest = axios.create({ baseURL: BACKEND_BASE_URL });
	protectedRequest.interceptors.request.use(
		(request) => {
			request.headers["Authorization"] = `Bearer ${token}`;
			// request.headers['Content-Type'] = 'Application/json'
			return request;
		},
		(error) => {
			Promise.reject(error);
		}
	);

	protectedRequest.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error?.response?.status === 401) {
				// logout when unauthenitcated error occurs
				logout();
				router.push("/login");
			}
			return Promise.reject(error);
		}
	);

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

	const protectedTMDBRequest = axios.create({
		baseURL: TMDB_BASE_URL,
	});
	return {
		protectedRequest,
		publicRequest,
		publicTMDBRequest,
		protectedTMDBRequest,
	};
};
