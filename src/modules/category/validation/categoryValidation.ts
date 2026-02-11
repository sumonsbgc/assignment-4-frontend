import * as z from "zod";

// Create Category Schema
export const createCategorySchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters long"),
	description: z.string(),
	image: z.string(),
	parentId: z.string(),
	order: z.number().int().min(0),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

// Update Category Schema
export const updateCategorySchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters long"),
	description: z.string(),
	image: z.string(),
	parentId: z.string(),
	order: z.number().int().min(0),
	isActive: z.boolean(),
});

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;

// Individual field schemas for field-level validation
export const nameSchema = z
	.string()
	.min(2, "Name must be at least 2 characters long");

export const slugSchema = z
	.string()
	.min(2, "Slug must be at least 2 characters long")
	.regex(
		/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
		"Slug must be lowercase and contain only letters, numbers, and hyphens",
	);

export const descriptionSchema = z.string();

export const imageSchema = z
	.string()
	.url("Must be a valid URL")
	.optional()
	.or(z.literal(""));

export const parentIdSchema = z.string().optional();

export const orderSchema = z.number().int().min(0);

export const isActiveSchema = z.boolean();
