import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function Genre({
	handleClick,
	name,
	id,
	selected,
	className,
}: {
	handleClick?: (id: number) => void;
	name: string;
	id: number;
	selected?: boolean;
	className?: string;
}) {
	return (
		<Button
			onClick={() => handleClick && handleClick(id)}
			className={cn(
				"bg-slate-300/20 border-[1px] border-white text-black px-4 py-2 rounded-full hover:bg-[#ADF802]/80 transition-colors",
				{
					"bg-black hover:bg-black/80 text-[#ADF802]": selected,
				},
				className
			)}
		>
			{name}
		</Button>
	);
}
