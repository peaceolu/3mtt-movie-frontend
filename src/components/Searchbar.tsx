"use client";
import { useForm } from "react-hook-form";
// import { producCategoryAndFilterSchema } from "@/schemas/product.validation.schema";
import { Form } from "@/components/ui/form";
import SearchInput from "@/components/form-fields/SearchInput";
import {
	movieSearchBarVaidation,
	MovieSearchBarValidationType,
} from "@/schemas/movie.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function Searchbar() {
	const form = useForm({
		resolver: zodResolver(movieSearchBarVaidation),
	});
	const router = useRouter();
	const { handleSubmit } = form;

	const onSubmit = (data: MovieSearchBarValidationType) => {
		const searchTerm = data.searchTerm.trim();
		if (searchTerm) {
			// Redirect to search page with the search key
			router.push(`/search?${encodeURIComponent(searchTerm)}`);
		} else {
			// Optionally handle empty search key case
			console.warn("Search key is empty");
		}
	};
	const { register, control } = form;

	return (
		<header className="w-full flex justify-center items-center h-fit">
			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex justify-center items-center gap-4 p-5 w-full"
				>
					<div className="flex flex-col-reverse md:flex-row items-center justify-center gap-5 capitalize w-full">
						<SearchInput
							id="searchTerm"
							name="searchTerm"
							control={control}
							placeholder="Search for movies, actors, directors..."
							className="w-full md:w-1/4"
						/>
					</div>
				</form>
			</Form>
		</header>
	);
}
