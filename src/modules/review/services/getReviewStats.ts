"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { CacheTags } from "@/modules/shared/const";
import type { GetReviewStatsResponse, ReviewStatsAPIResponse } from "../types";

export async function getReviewStats(
	medicineId: string,
): Promise<GetReviewStatsResponse> {
	try {
		const cookieStore = await cookies();

		const res = await api.get<ReviewStatsAPIResponse>(
			`/reviews/medicine/${medicineId}/stats`,
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
				next: {
					tags: [CacheTags.Reviews],
					revalidate: 60,
				},
			},
		);

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to fetch review stats",
				stats: null,
			};
		}

		return {
			status: true,
			message: "Review stats fetched successfully",
			stats: res.data?.data || null,
		};
	} catch (error) {
		console.error("Error fetching review stats:", error);
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to fetch review stats",
			stats: null,
		};
	}
}
