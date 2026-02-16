"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type { DeleteCategoryResponse } from "../types";

export const deleteCategory = async (
	categoryId: string,
): Promise<DeleteCategoryResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.delete<{ success: boolean; message?: string }>(
			`/categories/${categoryId}`,
			undefined,
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to delete category",
			};
		}

		updateTag(CacheTags.Categories);

		return {
			status: true,
			message: "Category deleted successfully",
		};
	} catch (error) {
		console.error("Error deleting category:", error);
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to delete category",
		};
	}
};
