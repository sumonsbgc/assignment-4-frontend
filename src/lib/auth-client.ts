import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const auth = createAuthClient({
	baseURL:
		typeof window !== "undefined"
			? window.location.origin
			: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
	basePath: "/api/auth",
	fetchOptions: {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	},
	plugins: [
		inferAdditionalFields({
			user: {
				role: {
					type: "string",
				},
				phone: {
					type: "string",
					required: false,
				},
				status: {
					type: "string",
					required: false,
				},
			},
		}),
	],
});
