import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

async function handler(req: NextRequest) {
	const backendUrl =
		process.env.BACKEND_URL ||
		process.env.NEXT_PUBLIC_BACKEND_URL ||
		"http://localhost:5000";

	const path = req.nextUrl.pathname;
	const search = req.nextUrl.search;
	const targetUrl = `${backendUrl}${path}${search}`;

	const headers = new Headers(req.headers);
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

		const responseHeaders = new Headers();

		// Forward all headers, especially Set-Cookie
		response.headers.forEach((value, key) => {
			responseHeaders.append(key, value);
		});

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: responseHeaders,
		});
	} catch (error) {
		console.error("[auth-proxy] Error proxying to:", targetUrl, error);
		return new Response(JSON.stringify({ error: "Auth proxy failed" }), {
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
