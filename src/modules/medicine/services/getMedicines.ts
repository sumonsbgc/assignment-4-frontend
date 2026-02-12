import { api } from "@/api/Api";
import { CacheTags } from "@/modules/shared/const";
import { cookies } from "next/headers";
import type {
	MedicineAPIResponse,
	GetMedicinesResponse,
	MedicineFilters,
} from "../types";

export const getMedicines = async (
	options?: MedicineFilters,
): Promise<GetMedicinesResponse> => {
	try {
		const cookieStore = await cookies();

		const params = new URLSearchParams();

		if (options?.page !== undefined) {
			params.append("page", options.page.toString());
		}

		if (options?.limit !== undefined) {
			params.append("limit", options.limit.toString());
		}

		if (options?.search) {
			params.append("search", options.search);
		}

		if (options?.categoryId) {
			params.append("categoryId", options.categoryId);
		}

		if (options?.sellerId) {
			params.append("sellerId", options.sellerId);
		}

		if (options?.manufacturer) {
			params.append("manufacturer", options.manufacturer);
		}

		if (options?.minPrice !== undefined) {
			params.append("minPrice", options.minPrice.toString());
		}

		if (options?.maxPrice !== undefined) {
			params.append("maxPrice", options.maxPrice.toString());
		}

		if (options?.isActive !== undefined) {
			params.append("isActive", options.isActive.toString());
		}

		if (options?.isFeatured !== undefined) {
			params.append("isFeatured", options.isFeatured.toString());
		}

		if (options?.inStock !== undefined) {
			params.append("inStock", options.inStock.toString());
		}

		if (options?.sortBy) {
			params.append("sortBy", options.sortBy);
		}

		if (options?.sortOrder) {
			params.append("sortOrder", options.sortOrder);
		}

		const queryString = params.toString();
		const url = queryString ? `/medicines?${queryString}` : "/medicines";

		const res = await api.get<MedicineAPIResponse>(url, {
			headers: {
				Cookie: cookieStore.toString(),
			},
			next: {
				tags: [CacheTags.Medicines],
				revalidate: 60 * 60 * 24,
			},
		});

		if (!res?.data?.data) {
			return {
				status: false,
				message: res.error || "Failed to fetch medicines",
				medicines: [],
			};
		}

		const response: GetMedicinesResponse = {
			status: true,
			medicines: res.data.data,
			message: "Medicines fetched successfully",
		};

		if (res.data.pagination) {
			response.pagination = res.data.pagination;
		}

		return response;
	} catch (error) {
		console.error("Error fetching medicines:", error);
		return {
			status: false,
			message: "Failed to fetch medicines",
			medicines: [],
		};
	}
};
