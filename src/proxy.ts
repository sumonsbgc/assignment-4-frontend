import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/getSession";
import { getDashboardByRole } from "@/lib/roles";
import {
	publicRoutes,
	customerRoutes,
	sellerRoutes,
	adminRoutes,
} from "@/routes/routes";

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const { session, user } = await getSession();
	const role = user?.role || "CUSTOMER";

	// Check if route is public
	const isPublicRoute = publicRoutes.some((route) =>
		matchRoute(pathname, route),
	);

	// Auth routes - redirect authenticated users to dashboard
	if ((pathname === "/login" || pathname === "/register") && session) {
		return NextResponse.redirect(
			new URL(getDashboardByRole(role), request.url),
		);
	}

	// Public routes - allow access
	if (isPublicRoute) {
		return NextResponse.next();
	}

	// Protected routes - require authentication
	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// Check role-based access
	const isAdminRoute = adminRoutes.some((route) => matchRoute(pathname, route));
	const isSellerRoute = sellerRoutes.some((route) =>
		matchRoute(pathname, route),
	);
	const isCustomerRoute = customerRoutes.some((route) =>
		matchRoute(pathname, route),
	);

	// Admin routes - require ADMIN role
	if (isAdminRoute && role !== "ADMIN") {
		return NextResponse.redirect(
			new URL(getDashboardByRole(role), request.url),
		);
	}

	// Seller routes - require SELLER role
	if (isSellerRoute && role !== "SELLER") {
		return NextResponse.redirect(
			new URL(getDashboardByRole(role), request.url),
		);
	}

	// Customer routes - require CUSTOMER role
	if (isCustomerRoute && role !== "CUSTOMER") {
		return NextResponse.redirect(
			new URL(getDashboardByRole(role), request.url),
		);
	}

	return NextResponse.next();
}

// Simple route matcher for dynamic routes like /shop/:id
function matchRoute(pathname: string, route: string): boolean {
	const routeParts = route.split("/");
	const pathParts = pathname.split("/");

	if (routeParts.length !== pathParts.length) {
		return false;
	}

	return routeParts.every((part, i) => {
		return part.startsWith(":") || part === pathParts[i];
	});
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
