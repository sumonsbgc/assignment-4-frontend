import { CategoriesResponse } from "../types";
import { api } from "@/api/Api";

export const getCategories = async (): Promise<CategoriesResponse> => {
	try {
		const response = await api.get<CategoriesResponse>("/categories");

		if (!response.data) {
			throw new Error("No data received from API");
		}

		return response.data;
	} catch (error) {
		console.error("Error fetching categories:", error);
		return {
			success: false,
			data: [],
		};
	}
};
