import { cn } from "@/lib/utils";

export default function InvalidDataMessage({
	className = "",
	title = "Error",
	message = "The data you are trying to access is invalid or unavailable.",
}: {
	className?: string;
	title?: string;
	message?: string;
}) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center h-full p-4 bg-white/30 border-[1px] rounded-md shadow-md w-full",
				className
			)}
		>
			<h1 className="text-2xl font-bold mb-4">
				{title ? title : "Invalid data"}
			</h1>
			<p className="text-gray-600">{message}</p>
			<p className="text-gray-600">Please try again later .</p>
		</div>
	);
}
