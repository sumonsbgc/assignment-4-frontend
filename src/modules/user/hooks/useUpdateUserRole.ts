"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { aark } from "aark-react-modalify";
import { updateUserRoleAction } from "../actions/user.actions";
import type { User } from "../types";
import type { Role } from "@/lib/roles";

export const useUpdateUserRole = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleRoleChange = (user: User, newRole: Role) => {
		if (user.role === newRole) return;

		startTransition(async () => {
			const result = await updateUserRoleAction(user.id, newRole);

			if (result.success) {
				aark.notification({
					title: "Role Updated",
					text: `User "${user.name}" role changed to ${newRole}`,
					type: "success",
				});
				router.refresh();
			} else {
				aark.notification({
					title: "Update Failed",
					text: "Unable to update user role. Please try again.",
					type: "error",
				});
			}
		});
	};

	return {
		handleRoleChange,
		isPending,
	};
};
