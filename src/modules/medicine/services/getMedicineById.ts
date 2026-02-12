import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { CacheTags } from "@/modules/shared/const";
import type { Medicine, SingleMedicineAPIResponse } from "../types";

export const getMedicineById = async (
	id: string,
): Promise<{ status: boolean; message: string; data: Medicine | null }> => {
	try {
		const cookieStore = await cookies();

		const res = await api.get<SingleMedicineAPIResponse>(`/medicines/${id}`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
			next: {
				tags: [CacheTags.Medicine],
			},
		});

		if (!res?.data?.data) {
			return {
				status: false,
				message: res.error || "Medicine not found",
				data: null,
			};
		}

		return {
			status: true,
			message: "Medicine fetched successfully",
			data: res.data.data,
		};
	} catch (error) {
		console.error("Error fetching medicine:", error);
		return {
			status: false,
			message: "Failed to fetch medicine",
			data: null,
		};
	}
};
