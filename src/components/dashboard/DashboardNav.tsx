"use client";
import { dashboardNavItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";

export default function DashboardNav({ className }: { className?: string }) {
	const pathname = usePathname();
	return (
		<nav
			className={cn(
				"fixed flex flex-col gap-2 items-center justify-between mb-5 min-h-[50vh] h-fit w-full md:w-[200px] bg-white/40 border-[1px] p-4 rounded-md shadow-md",
				className
			)}
		>
			<ul className="p-0 m-0 list-none flex flex-col gap-2">
				{dashboardNavItems.map((item) => (
					<li key={item.path} className="text-gray-500 hover:text-gray-900">
						<Link
							href={item.path}
							className={
								buttonVariants({ variant: "outline" }) +
								(pathname === item.path ? " bg-black text-white" : "")
							}
						>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
