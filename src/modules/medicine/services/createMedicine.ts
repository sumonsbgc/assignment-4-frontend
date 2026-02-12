"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type {
	CreateMedicineBody,
	CreateMedicineResponse,
	SingleMedicineAPIResponse,
} from "../types";

export const createMedicine = async (
	medicineData: CreateMedicineBody,
): Promise<CreateMedicineResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.post<SingleMedicineAPIResponse>(
			"/medicines",
			medicineData,
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		console.log("API Response:", res);

		if (!res.success || res.error || !res.data?.data) {
			return {
				status: false,
				message: res.error || "Failed to create medicine",
				data: null,
			};
		}

		updateTag(CacheTags.Medicines);

		return {
			status: true,
			message: "Medicine created successfully",
			data: res.data.data,
		};
	} catch (error) {
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to create medicine",
			data: null,
		};
	}
};
