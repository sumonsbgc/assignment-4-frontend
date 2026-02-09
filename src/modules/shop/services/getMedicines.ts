import { api } from "@/api/Api";
import { CacheTags } from "@/modules/shared/const";
import { MedicineFilters, GetMedicinesResponse } from "../types";

export const getMedicines = async (
	filter: MedicineFilters = {},
): Promise<GetMedicinesResponse> => {
	try {
		const params = new URLSearchParams();

		Object.entries(filter).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				params.append(key, String(value));
			}
		});

		const url = params.toString() ? `/medicines?${params}` : "/medicines";

		const response = await api.get<GetMedicinesResponse>(url, {
			next: { revalidate: 60, tags: [CacheTags.Medicines] },
		});

		if (!response.data) {
			throw new Error("No data received from API");
		}

		const { data: medicines, success, pagination } = response.data;

		return {
			data: medicines,
			success,
			pagination,
		};
	} catch (error) {
		console.error("Error fetching medicines:", error);
		return {
			success: false,
			data: [],
			pagination: {
				page: 1,
				limit: 6,
				total: 0,
				totalPages: 0,
				hasMore: false,
			},
		};
	}
};
