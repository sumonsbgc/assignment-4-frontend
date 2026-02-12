import AdminUsers from "@/modules/user/AdminUsers";
import { UsersSkeleton } from "@/modules/user/components";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Users - Admin | MediStore",
	description: "Manage all platform users",
};

type AdminUsersPageProps = {
	searchParams: Promise<{
		role?: string;
		search?: string;
	}>;
};

export default async function AdminUsersPage({
	searchParams,
}: AdminUsersPageProps) {
	const params = await searchParams;

	return (
		<Suspense fallback={<UsersSkeleton />}>
			<AdminUsers searchParams={params} />
		</Suspense>
	);
}
