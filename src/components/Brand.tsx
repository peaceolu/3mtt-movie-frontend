import Link from "next/link";

export default function Brand() {
	return (
		<Link className="flex items-center gap-5" href={"/"}>
			<h3 className="text-xl first-letter:bg-[#ADF802] first-letter:text-white first-letter:p-1 first-letter:rounded-md text-[#ADF802]">
				Moovix
			</h3>
		</Link>
	);
}
