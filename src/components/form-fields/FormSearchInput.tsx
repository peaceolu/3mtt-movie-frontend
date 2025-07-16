import React from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";

interface FormInputProps {
	id: string;
	label?: string;
	description?: string;
	placeholder: string;
	accept?: string;
	disabled?: boolean;
	className?: string;
	value?: string;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	control: Control<any>;
	step?: number;
	name: string;
}

export default function FormSearchInputField({
	placeholder,
	control,
	label,
	name,
	...props
}: FormInputProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormControl>
						<Input
							placeholder={placeholder}
							type={"search"}
							{...field}
							{...props}
						/>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
