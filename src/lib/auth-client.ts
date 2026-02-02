import { createAuthClient } from "better-auth/react";
import config from "./config";

export const auth = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: config.appBaseUrl.toString(),
});
