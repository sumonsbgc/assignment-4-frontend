"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { User } from "../types";
import { UserStatus } from "../types";
import { useUpdateUserStatus } from "../hooks/useUpdateUserStatus";
import { useUpdateUserRole } from "../hooks/useUpdateUserRole";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { Role, RoleLabels } from "@/lib/roles";
import dayjs from "dayjs";

type UserStatusActionsProps = {
	user: User;
};

export const UserStatusActions = ({ user }: UserStatusActionsProps) => {
	const { handleStatusChange, isPending: isStatusPending } =
		useUpdateUserStatus();
	const { handleRoleChange, isPending: isRolePending } = useUpdateUserRole();
	const { handleDelete, isPending: isDeletePending } = useDeleteUser();

	const isPending = isStatusPending || isDeletePending || isRolePending;

	return (
		<div className="space-y-6">
			{/* Account Info Card */}
			<Card>
				<CardHeader>
					<CardTitle>Account Info</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<p className="text-sm text-gray-600">Status</p>
						<p className="text-lg font-semibold capitalize">
							{user.status.toLowerCase()}
						</p>
					</div>
					<Separator />
					<div>
						<p className="text-sm text-gray-600">Email Verified</p>
						<p className="text-lg font-semibold">
							{user.emailVerified ? "Yes" : "No"}
						</p>
					</div>
					<Separator />
					<div>
						<p className="text-sm text-gray-600">Member Since</p>
						<p className="font-semibold">
							{dayjs(user.createdAt).format("MMMM D, YYYY")}
						</p>
					</div>
					<Separator />
					<div>
						<p className="text-sm text-gray-600">Last Updated</p>
						<p className="font-semibold">
							{dayjs(user.updatedAt).format("MMMM D, YYYY")}
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Role Management Card */}
			<Card>
				<CardHeader>
					<CardTitle>Role Management</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<p className="text-sm text-gray-600">Change user role</p>
					<Select
						defaultValue={user.role}
						disabled={isPending}
						onValueChange={(value) => handleRoleChange(user, value as Role)}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select role" />
						</SelectTrigger>
						<SelectContent>
							{Object.values(Role).map((role) => (
								<SelectItem key={role} value={role}>
									{RoleLabels[role]}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardContent>
			</Card>

			{/* Actions Card */}
			<Card>
				<CardHeader>
					<CardTitle>Actions</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					{user.status === "ACTIVE" ? (
						<Button
							className="w-full"
							variant="outline"
							disabled={isPending}
							onClick={() => handleStatusChange(user, UserStatus.SUSPENDED)}
						>
							Suspend Account
						</Button>
					) : (
						<Button
							className="w-full"
							variant="outline"
							disabled={isPending}
							onClick={() => handleStatusChange(user, UserStatus.ACTIVE)}
						>
							Activate Account
						</Button>
					)}
					<Button
						className="w-full"
						variant="destructive"
						disabled={isPending}
						onClick={() => handleDelete(user)}
					>
						Delete Account
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};
