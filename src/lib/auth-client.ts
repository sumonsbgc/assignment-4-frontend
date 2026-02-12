import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const auth = createAuthClient({
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
