import { getUserById } from "@/modules/user/services/getUserById";
import { UserDetail } from "@/modules/user/components/UserDetail";
import { UserStatusActions } from "@/modules/user/components/UserStatusActions";
import { ProfileEditForm } from "@/modules/user/components/ProfileEditForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "User Details - Admin | MediStore",
	description: "View and manage user information",
};

export default async function AdminUserDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const { user } = await getUserById(id);

	if (!user) {
		notFound();
	}

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex items-center gap-4 mb-4">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/admin/users">
						<ArrowLeft className="w-4 h-4" />
					</Link>
				</Button>
				<div className="flex-1">
					<h1 className="text-3xl font-bold">User Details</h1>
					<p className="text-gray-600">View and manage user information</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-6">
					<UserDetail user={user} />
					<ProfileEditForm
						user={user}
						title="Edit User Profile"
						description="Update this user's personal information"
						adminMode
					/>
				</div>

				<div>
					<UserStatusActions user={user} />
				</div>
			</div>
		</div>
	);
}
