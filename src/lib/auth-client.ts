import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
// import config from "./config";

export const auth = createAuthClient({
	baseURL: typeof window !== "undefined" ? window.location.origin : "",
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
