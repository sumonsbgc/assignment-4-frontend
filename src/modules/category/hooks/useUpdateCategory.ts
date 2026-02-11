"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { aark } from "aark-react-modalify";
import { updateCategorySchema } from "../validation/categoryValidation";
import { updateCategory } from "../services/updateCategory";
import type { Category } from "../types";
import { getSlug } from "@/lib/utils";

type UseUpdateCategoryProps = {
	category: Category;
	onSuccess?: () => void;
	redirectPath?: string;
};

export const useUpdateCategory = ({
	category,
	onSuccess,
	redirectPath,
}: UseUpdateCategoryProps) => {
	const router = useRouter();
	const [message, setMessage] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);

	const form = useForm({
		defaultValues: {
			name: category.name,
			// slug: category.slug,
			description: category.description || "",
			image: category.image || "",
			parentId: category.parentId || "",
			order: category.order,
			isActive: category.isActive,
		},
		validators: {
			onChange: updateCategorySchema,
		},
		onSubmit: async ({ value }) => {
			setMessage(null);
			setIsError(false);

			// Clean up empty strings to undefined for optional fields
			const categoryData = {
				name: value.name || undefined,
				slug: getSlug(value?.name) || undefined,
				description: value.description || undefined,
				image: value.image || undefined,
				parentId: value.parentId || undefined,
				order: value.order,
				isActive: value.isActive,
			};

			console.log(categoryData, "BODY");
      
			const response = await updateCategory(category.id, categoryData);
			console.log(response, "Response");
			if (response.status && response.data) {
				aark.notification({
					title: "Category Updated",
					text: `Category "${response.data.name}" has been updated successfully`,
					type: "success",
				});

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
					title: "Update Failed",
					text: response.message,
					type: "error",
				});
				setIsError(true);
				setMessage(response.message);
			}
		},
	});

	// Auto-generate slug from name
	const generateSlug = (name: string) => {
		return name
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, "")
			.replace(/[\s_-]+/g, "-")
			.replace(/^-+|-+$/g, "");
	};

	return {
		form,
		message,
		isError,
		generateSlug,
	};
};
