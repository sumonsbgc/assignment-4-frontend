"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { aark } from "aark-react-modalify";
import { z } from "zod/v4";
import {
	updateProfileAction,
	adminUpdateUserProfileAction,
} from "../actions/profile.actions";
import type { User } from "../types";

const profileSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	phone: z.string(),
	image: z.string(),
});

type UseUpdateProfileProps = {
	user: User;
	/** When true, uses admin PUT /users/:id instead of PUT /users/me */
	adminMode?: boolean;
	onSuccess?: () => void;
};

export const useUpdateProfile = ({
	user,
	adminMode = false,
	onSuccess,
}: UseUpdateProfileProps) => {
	const router = useRouter();
	const [isError, setIsError] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			name: user.name || "",
			email: user.email || "",
			phone: user.phone || "",
			image: user.image || "",
		},
		validators: {
			onChange: profileSchema,
		},
		onSubmit: async ({ value }) => {
			setMessage(null);
			setIsError(false);
			const profileData = {
				name: value.name,
				email: value.email,
				phone: value.phone || undefined,
				image: value.image || undefined,
			};

			const result = adminMode
				? await adminUpdateUserProfileAction(user.id, profileData)
				: await updateProfileAction(user.id, profileData);

			if (result.success) {
				setMessage("Profile updated successfully");
				aark.notification({
					title: "Profile Updated",
					text: "Your profile has been updated successfully",
					type: "success",
				});
				router.refresh();
				onSuccess?.();
			} else {
				setIsError(true);
				setMessage(result.message);
				aark.notification({
					title: "Update Failed",
					text: result.message,
					type: "error",
				});
			}
		},
	});

	return {
		form,
		message,
		isError,
	};
};
