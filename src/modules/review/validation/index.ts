import * as z from "zod";

export const createReviewSchema = z.object({
	medicineId: z.string().min(1, "Medicine is required"),
	rating: z
		.number()
		.min(1, "Rating must be at least 1")
		.max(5, "Rating cannot exceed 5"),
	comment: z
		.string()
		.min(10, "Review must be at least 10 characters long")
		.max(1000, "Review cannot exceed 1000 characters"),
});

export type CreateReviewSchema = z.infer<typeof createReviewSchema>;

export const replyReviewSchema = z.object({
	medicineId: z.string().min(1, "Medicine is required"),
	parentId: z.string().min(1, "Parent review is required"),
	comment: z
		.string()
		.min(3, "Reply must be at least 3 characters long")
		.max(500, "Reply cannot exceed 500 characters"),
});

export type ReplyReviewSchema = z.infer<typeof replyReviewSchema>;

export const updateReviewSchema = z.object({
	rating: z
		.number()
		.min(1, "Rating must be at least 1")
		.max(5, "Rating cannot exceed 5")
		.optional(),
	comment: z
		.string()
		.min(10, "Review must be at least 10 characters long")
		.max(1000, "Review cannot exceed 1000 characters")
		.optional(),
});

export type UpdateReviewSchema = z.infer<typeof updateReviewSchema>;
