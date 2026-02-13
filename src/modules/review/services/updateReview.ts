"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type {
	UpdateReviewDto,
	UpdateReviewResponse,
	ReviewAPIResponse,
} from "../types";

export async function updateReview(
	reviewId: string,
	data: UpdateReviewDto,
): Promise<UpdateReviewResponse> {
	try {
		const cookieStore = await cookies();

		const res = await api.put<ReviewAPIResponse>(`/reviews/${reviewId}`, data, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to update review",
				data: null,
			};
		}

		updateTag(CacheTags.Reviews);

		return {
			status: true,
			message: "Review updated successfully",
			data: res.data?.data || null,
		};
	} catch (error) {
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to update review",
			data: null,
		};
	}
}
