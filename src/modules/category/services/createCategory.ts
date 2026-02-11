"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type {
	CreateCategoryBody,
	CreateCategoryResponse,
	SingleCategoryAPIResponse,
} from "../types";

export const createCategory = async (
	categoryData: CreateCategoryBody,
): Promise<CreateCategoryResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.post<SingleCategoryAPIResponse>(
			"/categories",
			categoryData,
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		if (!res.success || res.error || !res.data?.data) {
			return {
				status: false,
				message: res.error || "Failed to create category",
				data: null,
			};
		}

		updateTag(CacheTags.Categories);

		return {
			status: true,
			message: "Category created successfully",
			data: res.data.data,
		};
	} catch (error) {
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to create category",
			data: null,
		};
	}
};
