"use client";

import { useTransition } from "react";
import { aark } from "aark-react-modalify";
import { deleteUserAction } from "../actions/user.actions";
import type { User } from "../types";
import { Button } from "@/components/ui/button";

export const useDeleteUser = () => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = (user: User) => {
		aark.fire(
			<DeleteConfirmModal
				userName={user.name}
				onConfirm={() => {
					startTransition(async () => {
						const result = await deleteUserAction(user.id);

						if (result.success) {
							aark.notification({
								title: "User Deleted",
								text: result.message,
								type: "success",
							});
							aark.close();
						} else {
							aark.notification({
								title: "Delete Failed",
								text: result.message,
								type: "error",
							});
						}
					});
				}}
				onCancel={() => aark.close()}
			/>,
			{
				showCloseIcon: false,
				preventEscClose: false,
				preventOverlayClose: true,
			},
		);
	};

	return {
		handleDelete,
		isPending,
	};
};

// ─── Confirmation Modal ─────────────────────────────────
type DeleteConfirmModalProps = {
	userName: string;
	onConfirm: () => void;
	onCancel: () => void;
};

const DeleteConfirmModal = ({
	userName,
	onConfirm,
	onCancel,
}: DeleteConfirmModalProps) => (
	<div className="p-6 space-y-4 max-w-md">
		<h3 className="text-lg font-semibold">Delete User</h3>
		<p className="text-muted-foreground">
			Are you sure you want to delete <strong>{userName}</strong>? This action
			cannot be undone and will remove all of their data.
		</p>
		<div className="flex justify-end gap-2">
			<Button variant="outline" onClick={onCancel}>
				Cancel
			</Button>
			<Button variant="destructive" onClick={onConfirm}>
				Delete
			</Button>
		</div>
	</div>
);
