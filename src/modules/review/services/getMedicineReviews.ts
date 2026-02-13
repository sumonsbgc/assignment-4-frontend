"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { CacheTags } from "@/modules/shared/const";
import type {
	GetMedicineReviewsResponse,
	ReviewListAPIResponse,
} from "../types";

export async function getMedicineReviews(
	medicineId: string,
	page: number = 1,
	limit: number = 10,
): Promise<GetMedicineReviewsResponse> {
	try {
		const cookieStore = await cookies();
		const params = new URLSearchParams({
			page: page.toString(),
			limit: limit.toString(),
		});

		const res = await api.get<ReviewListAPIResponse>(
			`/reviews/medicine/${medicineId}?${params.toString()}`,
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
				message: res.error || "Failed to fetch reviews",
				reviews: [],
				pagination: {
					page: 1,
					limit: 10,
					total: 0,
					totalPages: 0,
					hasMore: false,
				},
			};
		}

		return {
			status: true,
			message: "Reviews fetched successfully",
			reviews: res.data?.data || [],
			pagination: res.data?.pagination || {
				page: 1,
				limit: 10,
				total: 0,
				totalPages: 0,
				hasMore: false,
			},
		};
	} catch (error) {
		console.error("Error fetching medicine reviews:", error);
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to fetch reviews",
			reviews: [],
			pagination: {
				page: 1,
				limit: 10,
				total: 0,
				totalPages: 0,
				hasMore: false,
			},
		};
	}
}
