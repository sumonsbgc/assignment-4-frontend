"use server";

import { api } from "@/api/Api";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type {
	CreateReviewDto,
	CreateReviewResponse,
	ReviewAPIResponse,
} from "../types";

export async function createReview(
	data: CreateReviewDto,
): Promise<CreateReviewResponse> {
	try {
		const cookieStore = await cookies();

		const res = await api.post<ReviewAPIResponse>("/reviews", data, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		if (!res.success || res.error) {
			return {
				status: false,
				message: res.error || "Failed to create review",
				data: null,
			};
		}

		updateTag(CacheTags.Reviews);

		return {
			status: true,
			message: data.parentId
				? "Reply added successfully"
				: "Review created successfully",
			data: res.data?.data || null,
		};
	} catch (error) {
		return {
			status: false,
			message:
				error instanceof Error ? error.message : "Failed to create review",
			data: null,
		};
	}
}
