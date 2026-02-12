import { headers } from "next/headers";

const BACKEND_URL =
	process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export const getSession = async () => {
	try {
		const reqHeaders = await headers();
		const cookie = reqHeaders.get("cookie") || "";

		const response = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
			method: "GET",
			headers: {
				cookie,
			},
			credentials: "include",
		});

		if (!response.ok) {
			return { session: null, user: null, isAuthenticated: false };
		}

		const data = await response.json();
		const { session, user } = data ?? {};
		const isAuthenticated = !!session && !!user;
		return { session, user, isAuthenticated };
	} catch (error) {
		console.error("Failed to fetch session:", error);
		return { session: null, user: null, isAuthenticated: false };
	}
};

export const logOut = async () => {
	const { auth } = await import("./auth-client");
	await auth.signOut();
	window.location.href = "/";
};
