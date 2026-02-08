import * as z from "zod";
import { Role } from "@/lib/roles";

export const loginSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// Individual field schemas for field-level validation
export const nameSchema = z
	.string()
	.min(2, "Name must be at least 2 characters long");
export const emailSchema = z.email("Invalid email address");
export const roleSchema = z.enum([Role.CUSTOMER, Role.SELLER]);
export const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters long");
export const confirmPasswordSchema = z
	.string()
	.min(8, "Confirm Password must be at least 8 characters long");

export const registerSchema = z
	.object({
		name: nameSchema,
		email: emailSchema,
		role: roleSchema,
		password: passwordSchema,
		confirmPassword: confirmPasswordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password & Confirm Password are not matching.",
		path: ["confirmPassword"],
	});

export type RegisterSchema = z.infer<typeof registerSchema>;
