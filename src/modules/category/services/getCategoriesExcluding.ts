import { api } from "@/api/Api";
import type { ICategory } from "@/models/Models";
import type { CategoryAPIResponse } from "../types";

/**
 * Fetch categories excluding a specific category (useful for preventing circular parent references)
 * Client-safe version that calls the API directly
 */
export const getCategoriesExcluding = async (
	excludeId: string,
): Promise<ICategory[]> => {
	try {
		const response = await api.get<CategoryAPIResponse>(
			`/categories?isActive=true`,
		);

		if (!response.data?.success || !response.data.data) {
			return [];
		}

		// Filter out the category we want to exclude
		return response.data.data.filter((cat) => cat.id !== excludeId);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
};
