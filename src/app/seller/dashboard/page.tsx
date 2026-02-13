import { Suspense } from "react";
import { SellerDashboard, DashboardSkeleton } from "@/modules/dashboard";

export const metadata = {
	title: "Seller Dashboard - MediStore",
	description: "Manage your store, track sales, and monitor inventory.",
};

export default function SellerDashboardPage() {
	return (
		<Suspense fallback={<DashboardSkeleton />}>
			<SellerDashboard />
		</Suspense>
	);
}
