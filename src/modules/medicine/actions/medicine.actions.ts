"use server";

import { deleteMedicine } from "../services/deleteMedicine";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";

export async function deleteMedicineAction(medicineId: string) {
	try {
		const result = await deleteMedicine(medicineId);

		if (result.status) {
			updateTag(CacheTags.Medicines);

			return {
				success: true,
				message: result.message,
			};
		}

		return {
			success: false,
			message: result.message,
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Failed to delete medicine",
		};
	}
}
