import { NavigationItemType } from "@/types/navigation.types";

export const navItems: NavigationItemType[] = [
	{ path: "#features", name: "Features" },
	{ path: "#pricing", name: "Pricing" },
];

export const studioNavItems: NavigationItemType[] = [
	{
		name: "Decoration",
		path: "/decoration",
	},
	{
		name: "Saved",
		path: "/saved",
	},
	{
		name: "members",
		path: "/members",
	},
];

export const dashboardNavItems: NavigationItemType[] = [
	{
		name: "Watchlists",
		path: "/dashboard/watchlists",
		active: true,
	},
	{
		name: "Favorites",
		path: "/dashboard/favorites",
		active: true,
	},
	{
		name: "Followers",
		path: "/dashboard/followers",
		active: true,
	},
	{
		name: "Profile",
		path: "/dashboard/profile",
		active: true,
	},
];

export const userNavItems: NavigationItemType[] = [
	...dashboardNavItems,
	{
		name: "Messages",
		path: "#",
		active: false,
	},
	{
		name: "Notifications",
		path: "#",
		active: true,
	},
];

export const adminNavItems: NavigationItemType[] = [
	...dashboardNavItems,
	{
		name: "Users",
		path: "/users",
		active: true,
	},
];
