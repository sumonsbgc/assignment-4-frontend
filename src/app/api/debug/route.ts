import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	const backendUrl =
		process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "NOT_SET";

	let backendReachable = false;
	let backendResponse = "";

	try {
		const res = await fetch(`${backendUrl}/`, { method: "GET" });
		backendReachable = res.ok;
		backendResponse = await res.text();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		backendResponse = error.message;
	}

	return NextResponse.json({
		BACKEND_URL: process.env.BACKEND_URL || "NOT_SET",
		NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "NOT_SET",
		NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || "NOT_SET",
		resolved: backendUrl,
		backendReachable,
		backendResponse,
	});
}
