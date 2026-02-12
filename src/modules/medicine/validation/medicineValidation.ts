import * as z from "zod";

export const createMedicineSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters long"),
	description: z.string(),
	genericName: z.string(),
	manufacturer: z.string().min(1, "Manufacturer is required"),
	price: z.number().min(0.01, "Price must be greater than 0"),
	discountPrice: z.number().min(0, "Discount price must be 0 or more"),
	stockQuantity: z.number().int().min(0, "Stock must be 0 or more"),
	lowStockThreshold: z.number().int().min(0),
	unit: z.string(),
	imageUrl: z.string(),
	dosageForm: z.string(),
	strength: z.string(),
	packSize: z.string(),
	requiresPrescription: z.boolean(),
	expiryDate: z.string(),
	ingredients: z.string(),
	sideEffects: z.string(),
	warnings: z.string(),
	storage: z.string(),
	categoryId: z.string().min(1, "Category is required"),
});

export type CreateMedicineSchema = z.infer<typeof createMedicineSchema>;

export const updateMedicineSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters long"),
	description: z.string(),
	genericName: z.string(),
	manufacturer: z.string().min(1, "Manufacturer is required"),
	price: z.number().min(0.01, "Price must be greater than 0"),
	discountPrice: z.number().min(0, "Discount price must be 0 or more"),
	stockQuantity: z.number().int().min(0, "Stock must be 0 or more"),
	lowStockThreshold: z.number().int().min(0),
	unit: z.string(),
	imageUrl: z.string(),
	dosageForm: z.string(),
	strength: z.string(),
	packSize: z.string(),
	requiresPrescription: z.boolean(),
	expiryDate: z.string(),
	ingredients: z.string(),
	sideEffects: z.string(),
	warnings: z.string(),
	storage: z.string(),
	categoryId: z.string().min(1, "Category is required"),
	isActive: z.boolean(),
	isFeatured: z.boolean(),
});

export type UpdateMedicineSchema = z.infer<typeof updateMedicineSchema>;
