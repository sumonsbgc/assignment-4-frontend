"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { CacheTags } from "@/modules/shared/const";
import type { GetUserReviewsResponse, UserReviewsAPIResponse } from "../types";

export async function getUserReviews(): Promise<GetUserReviewsResponse> {
	try {
		const cookieStore = await cookies();

		const res = await api.get<UserReviewsAPIResponse>(`/reviews/my-reviews`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
			next: {
				tags: [CacheTags.Reviews],
			},
		});

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to fetch your reviews",
				reviews: [],
			};
		}

		return {
			status: true,
			message: "Reviews fetched successfully",
			reviews: res.data?.data || [],
		};
	} catch (error) {
		console.error("Error fetching user reviews:", error);
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to fetch reviews",
			reviews: [],
		};
	}
}
