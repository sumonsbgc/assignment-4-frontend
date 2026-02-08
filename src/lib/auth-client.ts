import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import config from "./config";

export const auth = createAuthClient({
	baseURL: config.appBaseUrl.toString(),
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
