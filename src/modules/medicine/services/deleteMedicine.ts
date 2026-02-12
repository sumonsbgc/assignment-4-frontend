"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type { DeleteMedicineResponse } from "../types";

export const deleteMedicine = async (
	medicineId: string,
): Promise<DeleteMedicineResponse> => {
	try {
		const cookieStore = await cookies();
		const res = await api.delete<{ success: boolean; message?: string }>(
			`/medicines/${medicineId}`,
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
				message: res.error || "Failed to delete medicine",
			};
		}

		updateTag(CacheTags.Medicines);

		return {
			status: true,
			message: "Medicine deleted successfully",
		};
	} catch (error) {
		console.error("Error deleting medicine:", error);
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to delete medicine",
		};
	}
};
