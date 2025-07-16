import DashboardNav from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="p-5 py-14 md:p-20 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
			<div className="col-span-0 md:col-span-1 hidden md:block">
				<DashboardNav />
			</div>
			<div className="col-span-4 md:col-span-4 w-full">{children}</div>
		</div>
	);
}
