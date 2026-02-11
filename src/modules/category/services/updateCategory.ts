"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type {
	UpdateCategoryBody,
	UpdateCategoryResponse,
	SingleCategoryAPIResponse,
} from "../types";

export const updateCategory = async (
	categoryId: string,
	categoryData: UpdateCategoryBody,
): Promise<UpdateCategoryResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.put<SingleCategoryAPIResponse>(
			`/categories/${categoryId}`,
			categoryData,
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		console.log(res, "API Response");

		if (!res.success || res.error || !res.data) {
			return {
				status: false,
				message: res.error || "Failed to update category",
				data: null,
			};
		}

		updateTag(CacheTags.Categories);

		return {
			status: true,
			message: "Category updated successfully",
			data: res.data.data,
		};
	} catch (error) {
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to update category",
			data: null,
		};
	}
};
