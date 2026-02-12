import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

function getBackendUrl() {
	const url =
		process.env.BACKEND_URL ||
		process.env.NEXT_PUBLIC_BACKEND_URL ||
		"http://localhost:5000";
	return url;
}

async function handler(req: NextRequest) {
	const backendUrl = getBackendUrl();
	const path = req.nextUrl.pathname;
	const search = req.nextUrl.search;
	const targetUrl = `${backendUrl}${path}${search}`;

	console.log("[auth-proxy] Proxying to:", targetUrl);

	const headers = new Headers(req.headers);
	// Remove host header so it's not forwarded to the backend
	headers.delete("host");

	try {
		const response = await fetch(targetUrl, {
			method: req.method,
			headers,
			body:
				req.method !== "GET" && req.method !== "HEAD"
					? await req.blob()
					: undefined,
		});

		const responseHeaders = new Headers(response.headers);

		console.log("[auth-proxy] Response status:", response.status);

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: responseHeaders,
		});
	} catch (error) {
		console.error("[auth-proxy] Error:", error);
		return new Response(JSON.stringify({ error: "Proxy failed", targetUrl }), {
			status: 502,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
