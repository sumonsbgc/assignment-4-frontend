import { api } from "@/api/Api";
import { CacheTags } from "@/modules/shared/const";
import { cookies } from "next/headers";
import type {
	CategoryAPIResponse,
	GetCategoriesResponse,
	CategoryFilters,
} from "../types";

export const getCategories = async (
	options?: CategoryFilters,
): Promise<GetCategoriesResponse> => {
	try {
		const cookieStore = await cookies();

		const params = new URLSearchParams();

		if (options?.page !== undefined) {
			params.append("page", options.page.toString());
		}

		if (options?.limit !== undefined) {
			params.append("limit", options.limit.toString());
		}

		if (options?.isActive !== undefined) {
			params.append("isActive", options.isActive.toString());
		}

		if (options?.parentId !== undefined) {
			params.append("parentId", options.parentId || "null");
		}

		if (options?.search) {
			params.append("search", options.search);
		}

		const queryString = params.toString();
		const url = queryString ? `/categories?${queryString}` : "/categories";

		const res = await api.get<CategoryAPIResponse>(url, {
			headers: {
				Cookie: cookieStore.toString(),
			},
			next: {
				tags: [CacheTags.Categories],
				revalidate: 60 * 60 * 24, //
			},
		});

		if (!res?.data?.data) {
			return {
				status: false,
				message: res.error || "Failed to fetch categories",
				categories: [],
			};
		}

		const response: GetCategoriesResponse = {
			status: true,
			categories: res.data.data,
			message: "Categories fetched successfully",
		};

		if (res.data.pagination) {
			response.pagination = res.data.pagination;
		}

		return response;
	} catch (error) {
		console.error("Error fetching categories:", error);
		return {
			status: false,
			message: "Failed to fetch categories",
			categories: [],
		};
	}
};
