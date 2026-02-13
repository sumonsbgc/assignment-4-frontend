"use server";

import { deleteReview } from "../services/deleteReview";
import { createReview } from "../services/createReview";
import { updateReview } from "../services/updateReview";
import { updateTag } from "next/cache";
import { CacheTags } from "@/modules/shared/const";
import type { CreateReviewDto, UpdateReviewDto } from "../types";

export async function deleteReviewAction(reviewId: string) {
	try {
		const result = await deleteReview(reviewId);

		if (result.status) {
			updateTag(CacheTags.Reviews);
			return { success: true, message: result.message };
		}

		return { success: false, message: result.message };
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Failed to delete review",
		};
	}
}

export async function createReviewAction(data: CreateReviewDto) {
	try {
		const result = await createReview(data);

		if (result.status) {
			updateTag(CacheTags.Reviews);
			return { success: true, message: result.message, data: result.data };
		}

		return { success: false, message: result.message, data: null };
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Failed to create review",
			data: null,
		};
	}
}

export async function updateReviewAction(
	reviewId: string,
	data: UpdateReviewDto,
) {
	try {
		const result = await updateReview(reviewId, data);

		if (result.status) {
			updateTag(CacheTags.Reviews);
			return { success: true, message: result.message, data: result.data };
		}

		return { success: false, message: result.message, data: null };
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Failed to update review",
			data: null,
		};
	}
}
