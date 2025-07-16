import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Control } from "react-hook-form";
import FormSearchInputField from "./FormSearchInput";

type SearchInputProps = {
	// Props type definition
	placeholder: string;
	className?: string;
	value?: string;
	disabled?: boolean;
	id: string;
	name: string;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	control: Control<any>;
};

export default function SearchInput({
	className,
	control,
	...props
}: SearchInputProps) {
	const isMobile = useIsMobile();
	return (
		<div
			className={cn(
				"flex items-center justify-center rounded-full border border-[#ADF802] hover:shadow-xl hover:shadow-slate-400 hover:drop-shadow-2xl bg-white w-full",
				{ "w-full": isMobile },
				className
			)}
		>
			<FormSearchInputField
				control={control}
				{...props}
				className={cn(
					"outline-none border-none active:outline-none active:border-none rounded-full focus-visible:ring-[0px] bg-none focus-visible:ring-offset-[0px] w-full"
				)}
			/>

			<Button
				variant={"ghost"}
				className="outline-none bg-[#ADF802] rounded-full m-[1px] p-1 px-3"
				size={"icon"}
			>
				<Search className="text-white" />
				<span className="sr-only">Search Button</span>
			</Button>
		</div>
	);
}
