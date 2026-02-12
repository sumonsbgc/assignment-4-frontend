"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash2, Eye } from "lucide-react";
import type { Medicine } from "../types";
import { dispatchOpenEditMedicine } from "../events/medicineModalEvents";
import { useDeleteMedicine } from "../hooks";
import Link from "next/link";

type ActionProps = {
	medicine: Medicine;
};

export const Action = ({ medicine }: ActionProps) => {
	const { handleDelete, isPending } = useDeleteMedicine();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" disabled={isPending}>
					<MoreVertical className="w-4 h-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href={`/shop/${medicine.slug}`}>
						<Eye className="w-4 h-4 mr-2" />
						View
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => dispatchOpenEditMedicine(medicine)}
					disabled={isPending}
				>
					<Edit className="w-4 h-4 mr-2" />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem
					className="text-red-600 cursor-pointer"
					onClick={() => handleDelete(medicine)}
					disabled={isPending}
				>
					<Trash2 className="w-4 h-4 mr-2" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
