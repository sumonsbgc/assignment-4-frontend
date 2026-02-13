import { Suspense } from "react";
import { AdminDashboard, DashboardSkeleton } from "@/modules/dashboard";

export const metadata = {
	title: "Admin Dashboard - MediStore",
	description: "Platform overview and key metrics.",
};

export default function AdminDashboardPage() {
	return (
		<Suspense fallback={<DashboardSkeleton />}>
			<AdminDashboard />
		</Suspense>
	);
}
