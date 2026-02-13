import { Suspense } from "react";
import { CustomerDashboard, DashboardSkeleton } from "@/modules/dashboard";

export const metadata = {
	title: "Dashboard - MediStore",
	description:
		"Manage your MediStore account, view orders, and track deliveries.",
};

export default function CustomerDashboardPage() {
	return (
		<Suspense fallback={<DashboardSkeleton />}>
			<CustomerDashboard />
		</Suspense>
	);
}
