"use client";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import Brand from "@/components/Brand";
import { cn, isActivePath } from "@/lib/utils";
import NavigationDrawer from "./NavigationDrawer";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/navigation";
import useSession from "@/lib/session/use-session";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import { useGetFavorite } from "@/hooks/service-hooks/favorite.hook";
import { Heart, ListMusic } from "lucide-react";
import { Badge } from "./ui/badge";
import { useGetAllWatchlists } from "@/hooks/service-hooks/watchlist.types";

export default function Header() {
	const isMobile = useIsMobile();
	const pathname = usePathname();
	const { session } = useSession();
	const { data, isLoading } = useGetFavorite();
	const { data: watchlists, isLoading: loadingWatchlist } =
		useGetAllWatchlists();

	if (pathname === "/auth/login" || pathname === "/auth/signup") return null;
	return (
		<header
			className={cn(
				"flex items-center justify-between p-0 px-5 gap-10 shadow-none md:px-10 fixed left-0 z-50 bg-black/50 text-[#ADF802] w-screen",
				{ "shadow-none": isMobile }
			)}
		>
			<Brand />

			<nav className="items-center gap-5 hidden md:flex flex-1 p-2">
				{navItems.map(({ name, path }) => {
					return (
						<Link
							key={path}
							className={cn("hover:bg-white p-2 rounded-md", {
								"bg-blue-100 rounded-sm py-2 px-5": isActivePath(
									path,
									pathname
								),
								"bg-blue-200 rounded-sm py-2 px-5":
									pathname.includes(path) === true,
							})}
							href={path}
						>
							{name}
						</Link>
					);
				})}
			</nav>

			{!isLoading && data && data.movies && data.movies.length > 0 && (
				<div className="relative flex items-center justify-center gap-2">
					<Heart />
					<Badge className="absolute top-[-4] left-[80%] bg-white text-black">
						{data.movies.length || 0}
					</Badge>
				</div>
			)}
			{!loadingWatchlist && watchlists && watchlists.length > 0 && (
				<div className="relative flex items-center justify-center gap-2">
					<ListMusic />
					<Badge className="absolute top-[-4] left-[80%] bg-white text-black">
						{watchlists?.length || 0}
					</Badge>
				</div>
			)}

			{!isMobile &&
				(session?.isLoggedIn ? (
					<ProfileDropdownMenu />
				) : (
					<Link href="/auth/login">
						<Button variant={"default"} size={"lg"} className="bg-[#ADF802]">
							Login
						</Button>
					</Link>
				))}
			{isMobile && (
				// if the user is on mobile, show the main drawer
				// user can open the user drawer from the main drawer
				<NavigationDrawer />
			)}
		</header>
	);
}
