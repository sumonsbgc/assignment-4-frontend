"use client";

import { useTransition } from "react";
import { aark } from "aark-react-modalify";
import { deleteUserAction } from "../actions/user.actions";
import type { User } from "../types";
import { ConfirmModal } from "@/modules/shared/modals";

export const useDeleteUser = () => {
	const [isPending, startTransition] = useTransition();

	const handleDelete = (user: User) => {
		aark.fire(
			<ConfirmModal
				title="Delete User"
				description={
					<>
						Are you sure you want to delete <strong>{user.name}</strong>? This
						action cannot be undone and will remove all of their data.
					</>
				}
				confirmText="Delete"
				variant="danger"
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
