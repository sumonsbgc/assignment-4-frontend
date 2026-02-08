import { auth } from "./auth-client";
import { headers } from "next/headers";

export const getSession = async () => {
	try {
		const response = await auth.getSession({
			fetchOptions: {
				headers: await headers(),
			},
		});

		const { session, user } = response?.data ?? {};
		const isAuthenticated = !!session && !!user;
		return { session, user, isAuthenticated };
	} catch (error) {
		console.error("Failed to fetch session:", error);
		return { session: null, user: null, isAuthenticated: false };
	}
};

export const logOut = async () => {
	await auth.signOut();
	window.location.href = "/";
};
