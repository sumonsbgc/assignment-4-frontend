import { NextRequest } from "next/server";

const BACKEND_URL =
	process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

async function handler(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const search = req.nextUrl.search;
	const targetUrl = `${BACKEND_URL}${path}${search}`;

	const headers = new Headers(req.headers);
	// Remove host header so it's not forwarded to the backend
	headers.delete("host");

	const response = await fetch(targetUrl, {
		method: req.method,
		headers,
		body:
			req.method !== "GET" && req.method !== "HEAD"
				? await req.blob()
				: undefined,
	});

	const responseHeaders = new Headers(response.headers);

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: responseHeaders,
	});
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
