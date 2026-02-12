"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type {
	UpdateMedicineBody,
	UpdateMedicineResponse,
	SingleMedicineAPIResponse,
} from "../types";

export const updateMedicine = async (
	medicineId: string,
	medicineData: UpdateMedicineBody,
): Promise<UpdateMedicineResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.put<SingleMedicineAPIResponse>(
			`/medicines/${medicineId}`,
			medicineData,
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		);

		if (!res.success || res.error || !res.data) {
			return {
				status: false,
				message: res.error || "Failed to update medicine",
				data: null,
			};
		}

		updateTag(CacheTags.Medicines);
		updateTag(CacheTags.Medicine);

		return {
			status: true,
			message: "Medicine updated successfully",
			data: res.data.data,
		};
	} catch (error) {
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to update medicine",
			data: null,
		};
	}
};
