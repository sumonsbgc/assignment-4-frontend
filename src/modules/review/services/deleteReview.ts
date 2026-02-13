"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type { DeleteReviewResponse } from "../types";

export async function deleteReview(
	reviewId: string,
): Promise<DeleteReviewResponse> {
	try {
		const cookieStore = await cookies();

		const res = await api.delete<{ success: boolean; message?: string }>(
			`/reviews/${reviewId}`,
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
				message: res.error || "Failed to delete review",
			};
		}

		updateTag(CacheTags.Reviews);

		return {
			status: true,
			message: "Review deleted successfully",
		};
	} catch (error) {
		console.error("Error deleting review:", error);
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to delete review",
		};
	}
}
