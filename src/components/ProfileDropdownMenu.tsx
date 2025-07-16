import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "lucide-react";
import useSession from "@/lib/session/use-session";
import { useLogout } from "@/hooks/service-hooks/auth.hook";
import { useAxios } from "@/hooks/use-axios";
import useCreateNavbar from "@/hooks/use-nav-items";
import { NavigationItemType } from "@/types/navigation.types";
import Link from "next/link";

export default function ProfileDropdownMenu() {
	const {
		session: {
			user: { firstName, lastName, email, role },
		},
	} = useSession();
	const { mutateAsync } = useLogout();
	const { protectedRequest } = useAxios();
	const { session } = useSession();
	const renderNavItems = useCreateNavbar(
		session.user.role,
		(navItems: NavigationItemType[]) => {
			console.log(navItems);
			return navItems
				.filter((item) => item.active)
				.map((item, index) => {
					return (
						<DropdownMenuItem key={index}>
							<Link className="text-left" href={item.path}>
								{item.name}
							</Link>
						</DropdownMenuItem>
					);
				});
		}
	);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserCircle
					size={34}
					className=" hover:scale-105 duration-300 transition-all text-[#ADF802]"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel className="flex items-center gap-2 p-2">
					<UserCircle size={30} className="text-blue-500" />
					<div className="flex flex-col">
						<span className=" text-gray-900">
							{firstName} {lastName} <small>({role})</small>
						</span>
						<span className="text-xs text-gray-500">{email}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{renderNavItems}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={async () => {
						mutateAsync({ protectedRequest: protectedRequest });
					}}
				>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
