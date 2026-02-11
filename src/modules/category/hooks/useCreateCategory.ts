"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { aark } from "aark-react-modalify";
import { createCategorySchema } from "../validation/categoryValidation";
import { createCategory } from "../services/createCategory";
import { getSlug } from "@/lib/utils";

type UseCreateCategoryProps = {
	onSuccess?: () => void;
	redirectPath?: string;
};

export const useCreateCategory = ({
	onSuccess,
	redirectPath,
}: UseCreateCategoryProps = {}) => {
	const router = useRouter();
	const [message, setMessage] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);

	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
			image: "",
			parentId: "",
			order: 0,
		},
		validators: {
			onChange: createCategorySchema,
		},
		onSubmit: async ({ value }) => {
			setMessage(null);
			setIsError(false);

			// Clean up empty strings to undefined for optional fields
			const categoryData = {
				name: value.name,
				slug: getSlug(value.name),
				description: value.description || undefined,
				image: value.image || undefined,
				parentId: value.parentId || undefined,
				order: value.order || 0,
			};

			const response = await createCategory(categoryData);

			if (response.status && response.data) {
				aark.notification({
					title: "Category Created",
					text: `Category "${response.data.name}" has been created successfully`,
					type: "success",
				});

				form.reset();

				if (onSuccess) {
					onSuccess();
				}

				if (redirectPath) {
					router.push(redirectPath);
				} else {
					router.refresh();
				}
			} else {
				aark.notification({
					title: "Creation Failed",
					text: response.message,
					type: "error",
				});
				setIsError(true);
				setMessage(response.message);
			}
		},
	});

	return {
		form,
		message,
		isError,
	};
};
