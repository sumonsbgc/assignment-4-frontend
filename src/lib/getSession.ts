import { headers } from "next/headers";

export const getSession = async () => {
	const backendUrl =
		process.env.BACKEND_URL ||
		process.env.NEXT_PUBLIC_BACKEND_URL ||
		"http://localhost:5000";

	try {
		const reqHeaders = await headers();
		const cookie = reqHeaders.get("cookie") || "";

		const response = await fetch(`${backendUrl}/api/auth/get-session`, {
			method: "GET",
			headers: {
				cookie,
			},
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
