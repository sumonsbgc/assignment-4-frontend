import * as z from "zod";

export const checkoutSchema = z.object({
	shippingAddress: z
		.string()
		.min(10, "Address must be at least 10 characters long"),
	city: z.string().min(2, "City is required"),
	state: z.string(),
	zipCode: z.string().min(3, "ZIP code is required"),
	country: z.string(),
	phone: z.string().min(10, "Valid phone number is required"),
	notes: z.string(),
	paymentMethod: z.string().min(1, "Payment method is required"),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;

// Individual field schemas for field-level validation
export const shippingAddressSchema = z
	.string()
	.min(10, "Address must be at least 10 characters long");
export const citySchema = z.string().min(2, "City is required");
export const stateSchema = z.string();
export const zipCodeSchema = z.string().min(3, "ZIP code is required");
export const countrySchema = z.string();
export const phoneSchema = z.string().min(10, "Valid phone number is required");
export const notesSchema = z.string();
export const paymentMethodSchema = z
	.string()
	.min(1, "Payment method is required");
