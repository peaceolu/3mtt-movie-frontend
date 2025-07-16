"use client";
import { usePathname } from "next/navigation";
import Brand from "./Brand";

export default function Footer() {
	const pathname = usePathname();
	if (pathname.includes("studio") || pathname.includes("trial")) {
		return null;
	}

	return (
		<footer className="p-5 bg-gray-900 text-white">
			<Brand />
			<div className="flex items-center justify-between">
				<p>&copy; {new Date().getFullYear()} dekostudio</p>
				<p>
					Created by{" "}
					<a href=" " className="text-green-500">
						Sightek
					</a>
				</p>
			</div>
		</footer>
	);
}
