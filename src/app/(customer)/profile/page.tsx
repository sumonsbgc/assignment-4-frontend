import { Suspense } from "react";
import { ProfilePage } from "@/modules/user/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "My Profile | MediStore",
	description: "Manage your account information",
};

export default function CustomerProfilePage() {
	return (
		<Suspense
			fallback={
				<div className="flex flex-1 flex-col gap-4 p-4">
					<div className="h-8 w-48 bg-muted animate-pulse rounded" />
					<div className="h-4 w-72 bg-muted animate-pulse rounded" />
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-4">
						<div className="h-64 bg-muted animate-pulse rounded-lg" />
						<div className="lg:col-span-3 h-96 bg-muted animate-pulse rounded-lg" />
					</div>
				</div>
			}
		>
			<ProfilePage
				title="My Profile"
				description="Manage your account information"
			/>
		</Suspense>
	);
}
