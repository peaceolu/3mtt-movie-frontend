"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "@/hooks/use-axios";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import FormInputField from "@/components/form-fields/FormInput";

import FormTextarea from "@/components/form-fields/FormTextarea";
import { ListMusic, Pencil } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useRef } from "react";
import { WatchlistValidationSchema } from "@/schemas/watchlist.schema";
import { IWatchlistDataType } from "@/schemas/watchlist.schema";
import {
	useCreateWatchlist,
	useUpdateWatchlist,
} from "@/hooks/service-hooks/watchlist.types";

interface WorkspaceFormProps {
	// Define any props you need here
	defaultValues?: {
		name?: string;
		description?: string;
		_id?: string;
	} | null;
}
export default function WatchlistForm({
	defaultValues = null,
}: WorkspaceFormProps) {
	const { mutateAsync, isPending } = useCreateWatchlist();
	const { mutateAsync: updateWorkspace, isPending: isUpdating } =
		useUpdateWatchlist(defaultValues?._id as string);
	const { protectedRequest } = useAxios();
	const closeBtnRef = useRef<HTMLButtonElement>(null);

	const form = useForm({
		resolver: zodResolver(WatchlistValidationSchema),
		defaultValues: {
			name: defaultValues?.name || "",
			description: defaultValues?.description || "",
		},
	});

	const onSubmit = async (data: IWatchlistDataType) => {
		if (defaultValues) {
			await updateWorkspace({
				protectedRequest,
				payload: data,
				watchlistId: defaultValues._id as string,
			});
		} else {
			await mutateAsync({ protectedRequest, payload: data });
		}
		// Reset the form after submission
		form.reset();
		// Close the dialog after submission
		if (closeBtnRef.current) {
			closeBtnRef.current.click();
		}
	};
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = form;

	return (
		<Dialog>
			<DialogTrigger asChild>
				{defaultValues?._id ? (
					<Button className="w-full flex items-center justify-between  shadow-sm shadow-gray-300/50">
						<Pencil size={20} className="text-[#ADF802]" />
						<span className="text-gray-200">Update</span>
					</Button>
				) : (
					<Button>
						<ListMusic /> New Watchlist
					</Button>
				)}
			</DialogTrigger>

			<DialogContent className="w-full md:w-1/2 lg:w-1/3">
				<DialogHeader>
					<DialogTitle>
						Watchlist {defaultValues?._id ? "update" : "create"}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="rounded-md space-y-5 p-5  w-full"
					>
						<FormInputField
							control={control}
							name="name"
							type="text"
							id="name"
							placeholder="Watchlist name"
							errorMessage={errors.name?.message}
						/>

						<FormTextarea
							control={control}
							name="description"
							id="description"
							placeholder="Description"
							errorMessage={errors.description?.message}
							className="w-full max-w-full p-2 border-[1px] flex items-center"
							rows={10}
						/>
						{defaultValues?._id ? (
							<Button
								disabled={isPending}
								className={cn("btn bg-black w-full", {
									"animate-pulse": isUpdating,
								})}
								type="submit"
							>
								{isUpdating ? "Updating" : "Update"}
							</Button>
						) : (
							<Button
								disabled={isPending}
								className={cn("btn bg-black w-full", {
									"animate-pulse": isPending,
								})}
								type="submit"
							>
								{isPending ? "Saving" : "Save"}
							</Button>
						)}
					</form>
				</Form>
				<DialogClose asChild>
					<button ref={closeBtnRef} hidden></button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}
