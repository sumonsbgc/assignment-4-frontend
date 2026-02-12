"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { aark } from "aark-react-modalify";
import { updateUserStatusAction } from "../actions/user.actions";
import type { User, UserStatus } from "../types";

export const useUpdateUserStatus = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleStatusChange = (user: User, newStatus: UserStatus) => {
		const actionLabel =
			newStatus === "ACTIVE"
				? "activate"
				: newStatus === "SUSPENDED"
					? "suspend"
					: "deactivate";

		startTransition(async () => {
			const result = await updateUserStatusAction(user.id, newStatus);

			if (result.success) {
				aark.notification({
					title: "Status Updated",
					text: `User "${user.name}" has been ${actionLabel}d successfully`,
					type: "success",
				});
				router.refresh();
			} else {
				aark.notification({
					title: "Update Failed",
					text: result.message,
					type: "error",
				});
			}
		});
	};

	return {
		handleStatusChange,
		isPending,
	};
};
