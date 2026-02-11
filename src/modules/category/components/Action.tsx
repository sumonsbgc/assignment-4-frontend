"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { ICategory } from "@/models/Models";
import { dispatchOpenEditCategory } from "../events/categoryModalEvents";
import { useDeleteCategory } from "../hooks";

type ActionProps = {
	category: ICategory;
};

export const Action = ({ category }: ActionProps) => {
	const { handleDelete, isPending } = useDeleteCategory();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" disabled={isPending}>
					<MoreVertical className="w-4 h-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => dispatchOpenEditCategory(category)}
					disabled={isPending}
				>
					<Edit className="w-4 h-4 mr-2" />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem
					className="text-red-600 cursor-pointer"
					onClick={() => handleDelete(category)}
					disabled={isPending}
				>
					<Trash2 className="w-4 h-4 mr-2" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
