import SearchPageWrapper from "@/components/SearchPageWrapper";
import { Suspense } from "react";

export default function SearchPage() {
	return (
		<Suspense>
			<SearchPageWrapper />
		</Suspense>
	);
}
