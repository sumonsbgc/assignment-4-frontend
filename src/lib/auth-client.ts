import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const auth = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
	basePath: "/api/auth",
	fetchOptions: {
		credentials: "include",
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
