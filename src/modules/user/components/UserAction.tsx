"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, ShieldOff, Shield, UserX } from "lucide-react";
import Link from "next/link";
import type { User } from "../types";
import { UserStatus } from "../types";
import { useUpdateUserStatus } from "../hooks/useUpdateUserStatus";
import { useDeleteUser } from "../hooks/useDeleteUser";

type UserActionProps = {
	user: User;
};

export const UserAction = ({ user }: UserActionProps) => {
	const { handleStatusChange, isPending: isStatusPending } =
		useUpdateUserStatus();
	const { handleDelete, isPending: isDeletePending } = useDeleteUser();

	const isPending = isStatusPending || isDeletePending;
	const isActive = user.status === "ACTIVE";
	const isSuspended = user.status === "SUSPENDED";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" disabled={isPending}>
					<MoreVertical className="w-4 h-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild>
					<Link href={`/admin/users/${user.id}`}>
						<Eye className="w-4 h-4 mr-2" />
						View Details
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				{isActive && (
					<DropdownMenuItem
						className="text-yellow-600"
						onClick={() => handleStatusChange(user, UserStatus.SUSPENDED)}
					>
						<ShieldOff className="w-4 h-4 mr-2" />
						Suspend Account
					</DropdownMenuItem>
				)}

				{isSuspended && (
					<DropdownMenuItem
						className="text-green-600"
						onClick={() => handleStatusChange(user, UserStatus.ACTIVE)}
					>
						<Shield className="w-4 h-4 mr-2" />
						Activate Account
					</DropdownMenuItem>
				)}

				{user.status === "INACTIVE" && (
					<DropdownMenuItem
						className="text-green-600"
						onClick={() => handleStatusChange(user, UserStatus.ACTIVE)}
					>
						<Shield className="w-4 h-4 mr-2" />
						Activate Account
					</DropdownMenuItem>
				)}

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="text-red-600"
					onClick={() => handleDelete(user)}
				>
					<UserX className="w-4 h-4 mr-2" />
					Delete Account
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
