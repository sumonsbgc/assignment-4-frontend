"use server";

import { deleteCategory } from "../services/deleteCategory";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";

export async function deleteCategoryAction(categoryId: string) {
	try {
		const result = await deleteCategory(categoryId);

		if (result.status) {
			updateTag(CacheTags.Categories);
			updateTag(CacheTags.Medicines);

			return {
				success: true,
				message: result.message,
			};
		}

		return {
			success: false,
			message: result.message,
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Failed to delete category",
		};
	}
}
